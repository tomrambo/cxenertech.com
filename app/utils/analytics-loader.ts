declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let gtmLoaded = false
let gtagLoaded = false

export function gtmContainerId() {
  const id = String(useRuntimeConfig().public.gtmId || '').trim().toUpperCase()
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : ''
}

export function gaMeasurementId() {
  const id = String(useRuntimeConfig().public.gaId || '').trim().toUpperCase()
  return /^G-[A-Z0-9]+$/.test(id) ? id : ''
}

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || []
}

export function injectConsentDefaults() {
  if (!import.meta.client) return
  ensureDataLayer()
  window.dataLayer!.push({
    event: 'cx_consent_default',
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500,
  })
}

export function loadGtmIfNeeded() {
  if (!import.meta.client || gtmLoaded) return
  const id = gtmContainerId()
  if (!id) return
  gtmLoaded = true
  ensureDataLayer()
  window.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  document.head.appendChild(script)
}

export function loadGtagIfNeeded() {
  if (!import.meta.client || gtagLoaded) return
  const id = gaMeasurementId()
  if (!id) return
  gtagLoaded = true
  ensureDataLayer()
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
  }
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)
  window.gtag('js', new Date())
  window.gtag('config', id)
}

export function syncAnalyticsLoaders(analytics: boolean, marketing: boolean) {
  if (!import.meta.client) return
  if (analytics || marketing) {
    loadGtmIfNeeded()
    if (analytics) loadGtagIfNeeded()
  }
}
