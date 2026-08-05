// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [
      { name: 'Syne', provider: 'google', weights: [500, 600, 700, 800] },
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
            'CX ENERTECH ให้บริการโซลูชันพลังงานสะอาดและโครงสร้างพื้นฐานสำหรับรถยนต์ไฟฟ้าแบบครบวงจร — Solar Energy & EV Charging',
        },
        { name: 'theme-color', content: '#052E24' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
