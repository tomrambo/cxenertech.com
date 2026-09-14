import { syncAnalyticsLoaders } from '~/utils/analytics-loader'

export type CookieCategory = 'necessary' | 'analytics' | 'marketing'

export type CookieConsentPrefs = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export type CookieConsentRecord = {
  v: 1
  decided: boolean
  prefs: CookieConsentPrefs
  updatedAt: string
}

const STORAGE_KEY = 'cx-cookie-consent'
const CONSENT_VERSION = 1 as const

const defaultPrefs = (): CookieConsentPrefs => ({
  necessary: true,
  analytics: false,
  marketing: false,
})

function parseRecord(raw: unknown): CookieConsentRecord | null {
  if (!raw || typeof raw !== 'object') return null
  const data = raw as Partial<CookieConsentRecord>
  if (data.v !== CONSENT_VERSION || typeof data.decided !== 'boolean') return null
  if (!data.prefs || typeof data.prefs !== 'object') return null
  return {
    v: CONSENT_VERSION,
    decided: data.decided,
    prefs: {
      necessary: true,
      analytics: Boolean(data.prefs.analytics),
      marketing: Boolean(data.prefs.marketing),
    },
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
  }
}

function readStored(): CookieConsentRecord | null {
  if (!import.meta.client) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return parseRecord(JSON.parse(raw))
  } catch {
    return null
  }
}

function writeStored(record: CookieConsentRecord) {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

function applyConsentMode(prefs: CookieConsentPrefs) {
  if (!import.meta.client) return
  window.dataLayer = window.dataLayer || []
  const payload = {
    event: 'cx_consent_update',
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.marketing ? 'granted' : 'denied',
    ad_user_data: prefs.marketing ? 'granted' : 'denied',
    ad_personalization: prefs.marketing ? 'granted' : 'denied',
  }
  window.dataLayer.push(payload)
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    })
  }
}

export function useCookieConsent() {
  const decided = useState('cx-cookie-decided', () => false)
  const open = useState('cx-cookie-open', () => false)
  const hydrated = useState('cx-cookie-hydrated', () => false)
  const prefs = useState<CookieConsentPrefs>('cx-cookie-prefs', defaultPrefs)
  const draft = useState<CookieConsentPrefs>('cx-cookie-draft', defaultPrefs)

  function hydrate() {
    if (!import.meta.client || hydrated.value) return
    const stored = readStored()
    if (stored) {
      decided.value = stored.decided
      prefs.value = { ...stored.prefs, necessary: true }
      draft.value = { ...stored.prefs, necessary: true }
      open.value = !stored.decided
      applyConsentMode(prefs.value)
      if (stored.decided) {
        syncAnalyticsLoaders(prefs.value.analytics, prefs.value.marketing)
      }
    } else {
      decided.value = false
      open.value = true
      prefs.value = defaultPrefs()
      draft.value = defaultPrefs()
    }
    hydrated.value = true
  }

  function persist(next: CookieConsentPrefs) {
    const record: CookieConsentRecord = {
      v: CONSENT_VERSION,
      decided: true,
      prefs: { ...next, necessary: true },
      updatedAt: new Date().toISOString(),
    }
    prefs.value = record.prefs
    draft.value = { ...record.prefs }
    decided.value = true
    open.value = false
    writeStored(record)
    applyConsentMode(record.prefs)
    syncAnalyticsLoaders(record.prefs.analytics, record.prefs.marketing)
  }

  function acceptAll() {
    persist({ necessary: true, analytics: true, marketing: true })
  }

  function rejectOptional() {
    persist({ necessary: true, analytics: false, marketing: false })
  }

  function saveDraft() {
    persist({ ...draft.value, necessary: true })
  }

  function openSettings() {
    draft.value = { ...prefs.value, necessary: true }
    open.value = true
  }

  function closePanel() {
    if (!decided.value) return
    draft.value = { ...prefs.value, necessary: true }
    open.value = false
  }

  function allowAnalytics() {
    return decided.value && prefs.value.analytics
  }

  function allowMarketing() {
    return decided.value && prefs.value.marketing
  }

  return {
    decided,
    open,
    hydrated,
    prefs,
    draft,
    hydrate,
    acceptAll,
    rejectOptional,
    saveDraft,
    openSettings,
    closePanel,
    allowAnalytics,
    allowMarketing,
  }
}
