<template>
  <div class="app-shell">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { contactInfo } from '~/utils/nav'

const { locale } = useLocale()
const origin = siteOrigin()

useHead(() => ({
  htmlAttrs: { lang: locale.value || 'th' },
  script: [
    {
      key: 'ld-org',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${origin}/#business`,
        name: contactInfo.legalTh,
        alternateName: contactInfo.legalEn,
        description:
          'รับติดตั้งโซล่าเซลล์ solar rooftop และ EV Station ครบวงจร บ้านถึงโรงงาน',
        url: origin,
        logo: `${origin}/logo-on-dark.png`,
        email: contactInfo.email,
        telephone: contactInfo.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contactInfo.address,
          addressLocality: 'ลาดพร้าว',
          addressRegion: 'กรุงเทพมหานคร',
          postalCode: '10230',
          addressCountry: 'TH',
        },
        areaServed: 'TH',
        knowsAbout: ['รับติดตั้งโซล่าเซลล์', 'Solar Rooftop', 'EV Station', 'DC Fast Charger'],
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'รับติดตั้งโซล่าเซลล์',
              url: `${origin}/solar/rooftop`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'รับติดตั้ง EV Station',
              url: `${origin}/ev-charging/station`,
            },
          },
        ],
      }),
    },
  ],
}))
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
