import {
  injectConsentDefaults,
  loadGtagIfNeeded,
  loadGtmIfNeeded,
} from '~/utils/analytics-loader'

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  injectConsentDefaults()

  const { hydrate, allowAnalytics, allowMarketing, decided, prefs } = useCookieConsent()
  hydrate()

  if (decided.value && (allowAnalytics() || allowMarketing())) {
    loadGtmIfNeeded()
    if (allowAnalytics()) loadGtagIfNeeded()
  }

  const router = useRouter()
  let initial = true
  router.afterEach((to) => {
    if (initial) {
      initial = false
      return
    }
    if (!prefs.value.analytics) return
    trackGtm('page_view', {
      page_path: to.fullPath,
      page_location: window.location.href,
      page_title: document.title,
    })
    window.gtag?.('event', 'page_view', {
      page_path: to.fullPath,
      page_location: window.location.href,
      page_title: document.title,
    })
  })
})
