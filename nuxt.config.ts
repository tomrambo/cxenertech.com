// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Exo 2', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'Montserrat', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'IBM Plex Sans Thai', provider: 'google', weights: [300, 400, 500, 600, 700] },
    ],
  },

  app: {
    head: {
      title: 'CX ENERTECH — Powering a Sustainable Future',
      htmlAttrs: { lang: 'th' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'CX ENERTECH CO., LTD. — Smart Energy & EV Infrastructure โซลูชันพลังงานสะอาดและโครงสร้างพื้นฐาน EV แบบครบวงจร',
        },
        { name: 'theme-color', content: '#0B0B0B' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
