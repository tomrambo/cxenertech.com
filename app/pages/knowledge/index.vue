<template>
  <div>
    <PageHero
      :title="t('knowledge.title')"
      :description="t('knowledge.description')"
      :crumbs="[{ label: t('common.home'), to: '/' }, { label: t('knowledge.title') }]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>{{ t('knowledge.description') }}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">{{ t('knowledge.explore') }}</span>
          <h2 class="section-title">{{ t('knowledge.related') }}</h2>
        </div>
        <div class="sub-links">
          <NuxtLink to="/knowledge/news" class="sub-link">News <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/articles" class="sub-link">{{ t('articles.title') }} <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/solar" class="sub-link">ความรู้โซล่าเซลล์ <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/faq" class="sub-link">FAQ โซล่าเซลล์ <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/ev" class="sub-link">EV Knowledge <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/case-studies" class="sub-link">Case Studies <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/downloads" class="sub-link">Download Center <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()

usePageSeo({
  title: 'ศูนย์ความรู้โซล่าเซลล์และ EV',
  description:
    'ความรู้ติดตั้งโซล่าเซลล์ FAQ จุดคืนทุน PPA และ EV Charging จาก CX ENERTECH',
  path: '/knowledge',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
  ],
})
</script>
