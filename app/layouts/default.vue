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
        '@type': 'Organization',
        name: contactInfo.legalEn,
        alternateName: contactInfo.legalTh,
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
