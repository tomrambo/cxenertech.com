// https://nuxt.com/docs/api/configuration/nuxt-config
import { SEO_REDIRECTS } from './app/utils/seo-redirects'

const seoRedirectRules = Object.fromEntries(
  Object.entries(SEO_REDIRECTS).map(([from, to]) => [
    from,
    { redirect: { to, statusCode: 301 as const } },
  ]),
)

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
      title: 'CX ENERTECH | รับติดตั้งโซล่าเซลล์ และ EV Charging',
      htmlAttrs: { lang: 'th' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด รับติดตั้งโซล่าเซลล์ solar rooftop และ EV Station ดูแพ็กเกจราคา จุดคืนทุน และขอใบเสนอราคา',
        },
        { name: 'theme-color', content: '#0B0B0B' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  runtimeConfig: {
    /** origin ของ bo-cx-cmms — ใช้ดึง charge packages, solar packages, บทความ และรูปจาก DB */
    cmmsApiBaseUrl:
      process.env.NUXT_CMMS_API_BASE_URL || 'https://bo-cx-cmms.conceptx.co.th',
    partnerIngestSecret: process.env.PARTNER_INGEST_SECRET || '',
    public: {
      /** ว่าง = ใช้ /api/partners/register (Nitro / Cloudflare Worker) */
      partnerRegisterUrl: process.env.NUXT_PUBLIC_PARTNER_REGISTER_URL || '',
      /** ว่าง = ใช้ /api/contact/quotation (Nitro / Cloudflare Worker) */
      quoteRequestUrl: process.env.NUXT_PUBLIC_QUOTE_REQUEST_URL || '',
      /** Google Tag Manager — Tag Assistant container */
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || 'GTM-5MKFVS3N',
      /** Google Analytics 4 (gtag.js) */
      gaId: process.env.NUXT_PUBLIC_GA_ID || 'G-F07KKEFMP8',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.cxenertech.com',
    },
  },

  nitro: {
    preset:
      process.env.NITRO_PRESET ||
      (process.env.CF_PAGES ? 'cloudflare-pages' : undefined),
    cloudflare: {
      nodeCompat: true,
      // Avoid a generated wrangler.json that binds ASSETS (reserved on Pages).
      deployConfig: false,
    },
    routeRules: {
      ...seoRedirectRules,
      '/blog': { redirect: { to: '/knowledge/articles', statusCode: 301 } },
      '/blog/**': { redirect: { to: '/knowledge/articles/**', statusCode: 301 } },
      '/api/partners/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      },
      '/api/contact/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Methods': 'POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      },
    },
  },
})
