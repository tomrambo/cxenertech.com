<script setup lang="ts">
import { getEvLanding, type EvLanding } from '~/utils/ev-landings'

const props = defineProps<{
  id: string
  landing?: EvLanding
}>()

const landing = computed(() => props.landing ?? getEvLanding(props.id))

usePageSeo({
  title: landing.value.seoTitle,
  description: landing.value.seoDescription,
  path: landing.value.path,
  faq: landing.value.faqs,
  crumbs: landing.value.crumbs,
})
</script>

<template>
  <div>
    <PageHero
      :title="landing.heroTitle"
      :description="landing.heroDescription"
      :crumbs="landing.crumbs.map((c) => ({ label: c.name, to: c.path === landing.path ? undefined : c.path }))"
    />

    <section class="section">
      <div class="container">
        <div class="content-block">
          <p v-for="(p, i) in landing.intro" :key="i">{{ p }}</p>

          <template v-for="sec in landing.sections" :key="sec.heading">
            <h2>{{ sec.heading }}</h2>
            <p v-for="(p, i) in sec.paragraphs" :key="i">{{ p }}</p>
            <ul v-if="sec.bullets?.length">
              <li v-for="item in sec.bullets" :key="item">{{ item }}</li>
            </ul>
          </template>
        </div>

        <div v-if="landing.features?.length" class="feature-grid" style="margin-top: 2.5rem">
          <div v-for="f in landing.features" :key="f.title" class="feature-item">
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <slot />

    <section v-if="landing.faqs.length" class="section">
      <div class="container">
        <div class="content-block">
          <h2>คำถามที่พบบ่อย</h2>
          <div class="seo-faq">
            <details v-for="item in landing.faqs" :key="item.q">
              <summary>{{ item.q }}</summary>
              <p>{{ item.a }}</p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: #101010">
      <div class="container">
        <div class="section-header">
          <span class="section-label">สำรวจเพิ่มเติม</span>
          <h2 class="section-title">หน้าที่เกี่ยวข้อง</h2>
        </div>
        <div class="sub-links">
          <NuxtLink v-for="l in landing.related" :key="l.to" :to="l.to" class="sub-link">
            {{ l.label }} <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      :title="landing.ctaTitle || 'ขอใบเสนอราคา EV Station'"
      :description="landing.ctaDescription || 'ทีม CX ENERTECH ประเมินทำเล โหลดไฟฟ้า และงบลงทุนสถานีชาร์จให้'"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/contact/quotation?type=ev"
      secondary-label="ดูแพ็กเกจสถานี"
      secondary-to="/ev-charging/packages"
    />
  </div>
</template>

<style scoped>
.seo-faq details {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 0;
}
.seo-faq summary {
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-white);
}
.seo-faq details p {
  margin-top: 0.65rem;
}
</style>
