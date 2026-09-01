/**
 * Google tag (gtag.js) — GA4 measurement ID
 * ส่ง page_view ตอนโหลดครั้งแรกผ่าน gtag('config') และตอนเปลี่ยนหน้าใน SPA
 */
export default defineNuxtPlugin(() => {
  const id = gaMeasurementId()
  if (!id) return

  useHead({
    script: [
      {
        key: 'gtag-js',
        src: `https://www.googletagmanager.com/gtag/js?id=${id}`,
        async: true,
        tagPriority: 20,
      },
      {
        key: 'gtag-init',
        tagPriority: 21,
        innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${id}');`,
      },
    ],
  })

  if (!import.meta.client) return

  const router = useRouter()
  let initial = true
  router.afterEach((to) => {
    if (initial) {
      initial = false
      return
    }
    window.gtag?.('event', 'page_view', {
      page_path: to.fullPath,
      page_location: window.location.href,
      page_title: document.title,
    })
  })
})
