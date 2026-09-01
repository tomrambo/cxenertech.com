<script setup lang="ts">
import { formatThb } from '~/utils/solar-format'
import { getSolarLanding, type SolarLanding } from '~/utils/solar-landings'
import type { SolarWebsitePackage } from '~/utils/solar-packages'

const props = defineProps<{
  id: string
  landing?: SolarLanding
}>()

const landing = computed(() => props.landing ?? getSolarLanding(props.id))

usePageSeo({
  title: landing.value.seoTitle,
  description: landing.value.seoDescription,
  path: landing.value.path,
  faq: landing.value.faqs,
  crumbs: landing.value.crumbs,
})

const packagesQuery = computed(() => landing.value.packagesQuery)
const { data } = await useFetch<{ packages: SolarWebsitePackage[] }>('/api/solar/packages', {
  query: computed(() => packagesQuery.value ?? {}),
  immediate: Boolean(packagesQuery.value),
})
const packages = computed(() => (packagesQuery.value ? data.value?.packages ?? [] : []))
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

    <section v-if="packages.length" class="section" style="background: #101010">
      <div class="container">
        <div class="section-header">
          <span class="section-label">แพ็กเกจจากฐานข้อมูล</span>
          <h2 class="section-title">ราคาเริ่มต้นที่เลือกได้ทันที</h2>
        </div>
        <div class="pkg-list">
          <article v-for="pkg in packages" :key="pkg.id" class="pkg-card">
            <p class="pkg-card__code">{{ pkg.code }}</p>
            <h3>{{ pkg.name_th }}</h3>
            <p>{{ pkg.tagline }}</p>
            <p class="pkg-card__price">{{ formatThb(pkg.price_from) }}</p>
            <NuxtLink :to="`/solar/rooftop/packages/${pkg.slug}`" class="btn btn-primary">รายละเอียด</NuxtLink>
          </article>
        </div>
      </div>
    </section>

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
      :title="landing.ctaTitle || 'ขอใบเสนอราคาโซล่าเซลล์'"
      :description="landing.ctaDescription || 'ทีม CX ENERTECH ออกแบบระบบตามหลังคาและมิเตอร์ของคุณ'"
      primary-label="ขอใบเสนอราคา Solar"
      primary-to="/contact/quotation?type=solar"
      secondary-label="ดูแพ็กเกจ"
      secondary-to="/solar/rooftop/packages"
    />
  </div>
</template>

<style scoped>
.pkg-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}
.pkg-card {
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.pkg-card h3 {
  font-size: 1.05rem;
  color: var(--color-white);
}
.pkg-card p {
  color: var(--color-muted);
  font-size: 0.88rem;
}
.pkg-card__code {
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
}
.pkg-card__price {
  color: var(--color-gold) !important;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem !important;
}
.pkg-card .btn {
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  align-self: flex-start;
}
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
