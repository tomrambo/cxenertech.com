/**
 * Google Tag Manager — ติดตั้ง snippet ให้ Tag Assistant / GTM Preview ตรวจจับได้
 * และส่ง page_view ตอนเปลี่ยนหน้าใน SPA
 */
export default defineNuxtPlugin(() => {
  const id = gtmContainerId()
  if (!id) return

  useHead({
    script: [
      {
        key: 'gtm',
        innerHTML: `(function(w,d,s,l,i){if(w.__cxGtm)return;w.__cxGtm=1;w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`,
      },
    ],
    noscript: [
      {
        key: 'gtm-noscript',
        innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        tagPosition: 'bodyOpen',
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
    trackGtm('page_view', {
      page_path: to.fullPath,
      page_location: window.location.href,
      page_title: document.title,
    })
  })
})
