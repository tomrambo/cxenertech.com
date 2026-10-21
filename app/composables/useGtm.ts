declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function gtmContainerId() {
  const id = String(useRuntimeConfig().public.gtmId || '').trim().toUpperCase()
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : ''
}

export function gaMeasurementId() {
  const id = String(useRuntimeConfig().public.gaId || '').trim().toUpperCase()
  return /^G-[A-Z0-9]+$/.test(id) ? id : ''
}

export function trackGtm(event: string, params: Record<string, unknown> = {}) {
  if (!import.meta.client) return
  const eventParams = { ...useNuxtApp().$leadAttribution, ...params }
  if (gtmContainerId()) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...eventParams })
  }
  if (event !== 'page_view' && gaMeasurementId() && window.gtag) {
    window.gtag('event', event, eventParams)
  }
}
