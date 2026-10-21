export type LeadAttribution = {
  landing_page: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
}

type AttributionStorage = Pick<Storage, 'getItem' | 'setItem'>
const STORAGE_KEY = 'cx:lead-attribution:v1'

// Campaign labels only: do not forward arbitrary query strings, email addresses or URLs.
function campaignLabel(value: unknown): string {
  return typeof value === 'string' && /^[\p{L}\p{N} _.-]{1,100}$/u.test(value)
    ? value
    : ''
}

/** First landing in this tab; retained through SPA navigation and reloads. */
export function readLeadAttribution(entryUrl: string, storage?: AttributionStorage): LeadAttribution {
  const url = new URL(entryUrl)
  const current: LeadAttribution = {
    landing_page: url.pathname,
    utm_source: campaignLabel(url.searchParams.get('utm_source')),
    utm_medium: campaignLabel(url.searchParams.get('utm_medium')),
    utm_campaign: campaignLabel(url.searchParams.get('utm_campaign')),
  }
  try {
    const saved = JSON.parse(storage?.getItem(STORAGE_KEY) || 'null')
    if (saved && typeof saved.landing_page === 'string'
      && saved.landing_page.startsWith('/') && !saved.landing_page.startsWith('//')
      && !/[?#\\]/.test(saved.landing_page)) {
      return {
        landing_page: saved.landing_page,
        utm_source: campaignLabel(saved.utm_source),
        utm_medium: campaignLabel(saved.utm_medium),
        utm_campaign: campaignLabel(saved.utm_campaign),
      }
    }
  } catch {
    // Storage may be unavailable or contain an old/invalid record.
  }
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(current))
  } catch {
    // The plugin still retains the result for this page's SPA navigation.
  }
  return current
}
