declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function gtmContainerId() {
  const id = String(useRuntimeConfig().public.gtmId || '').trim().toUpperCase()
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : ''
}

export function trackGtm(event: string, params: Record<string, unknown> = {}) {
  if (!import.meta.client || !gtmContainerId()) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
