import {
  gaMeasurementId,
  gtmContainerId,
} from '~/utils/analytics-loader'
import type { CookieConsentPrefs } from '~/composables/useCookieConsent'

export { gaMeasurementId, gtmContainerId }

export function trackGtm(event: string, params: Record<string, unknown> = {}) {
  if (!import.meta.client) return
  const decided = useState('cx-cookie-decided', () => false)
  const prefs = useState<CookieConsentPrefs>('cx-cookie-prefs', () => ({
    necessary: true,
    analytics: false,
    marketing: false,
  }))
  if (!decided.value || !prefs.value.analytics) return
  if (gtmContainerId()) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
  }
  if (event !== 'page_view' && gaMeasurementId() && window.gtag) {
    window.gtag('event', event, params)
  }
}
