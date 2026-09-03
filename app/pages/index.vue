<template>
  <div class="home">
    <!-- Hero: cinematic full-bleed -->
    <section class="hero">
      <div class="hero__bg" aria-hidden="true">
        <img
          src="/images/hero-campus.jpg"
          alt=""
          width="1920"
          height="1280"
          fetchpriority="high"
        />
      </div>
      <div class="hero__shade" aria-hidden="true" />

      <div class="container-wide hero__inner">
        <div class="hero__copy">
          <p class="hero__kicker animate-fade-up">{{ t('home.kicker') }}</p>
          <h1 class="hero__title animate-fade-up animate-delay-1">
            {{ t('home.titleBefore') }}<em>{{ t('home.titleAccent') }}</em>{{ t('home.titleAfter') }}
          </h1>
          <p class="hero__lead animate-fade-up animate-delay-2">
            {{ t('home.lead') }}
          </p>
          <div class="hero__actions animate-fade-up animate-delay-3">
            <NuxtLink to="/solar/rooftop" class="btn btn-primary">
              {{ t('home.seeServices') }}
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/contact/quotation" class="btn btn-secondary">{{ t('home.quote') }}</NuxtLink>
          </div>
        </div>

        <dl class="hero__stats animate-fade-up animate-delay-3">
          <div v-for="s in stats" :key="s.label" class="metric">
            <dt>{{ s.label }}</dt>
            <dd>{{ s.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Services -->
    <section class="section services">
      <div class="container">
        <div class="services__head">
          <div>
            <span class="section-label">{{ t('home.whatWeDo') }}</span>
            <h2 class="section-title">{{ t('home.servicesTitle') }}</h2>
          </div>
          <p class="section-lead">
            {{ t('home.servicesLead') }}
          </p>
        </div>

        <div class="services__list">
          <NuxtLink
            v-for="(svc, i) in services"
            :key="svc.to"
            :to="svc.to"
            class="service"
          >
            <div class="service__media" :style="{ backgroundImage: `url(${svc.image})` }" />
            <div class="service__content">
              <span class="service__index">0{{ i + 1 }}</span>
              <h3>{{ svc.title }}</h3>
              <p>{{ svc.desc }}</p>
              <span class="service__cta">{{ t('common.details') }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="section intent">
      <div class="container">
        <div class="services__head">
          <div>
            <span class="section-label">ค้นหาบริการ</span>
            <h2 class="section-title">งานติดตั้งที่ลูกค้าค้นหา</h2>
          </div>
          <p class="section-lead">
            หนึ่งหน้าต่อหนึ่งเจตนาค้น — เลือกหน้าตามงานที่ต้องการ ไม่ใช่เมนูบริษัท
          </p>
        </div>
        <div class="intent__grid">
          <NuxtLink v-for="item in searchIntents" :key="item.to" :to="item.to" class="intent__card">
            <strong>{{ item.label }}</strong>
            <span>{{ item.hint }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="solar-pkg">
      <div class="container-wide solar-pkg__inner">
        <div class="solar-pkg__copy">
          <span class="section-label">Solar Packages</span>
          <h2 class="section-title">{{ t('home.solarPkgTitle') }}</h2>
          <p class="section-lead">
            {{ t('home.solarPkgLead') }}
          </p>
          <div class="solar-pkg__actions">
            <NuxtLink to="/solar/rooftop/packages" class="btn btn-primary">
              {{ t('home.seeSolarPkg') }}
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/solar/quotation" class="btn btn-secondary">{{ t('home.quoteSolar') }}</NuxtLink>
          </div>
        </div>

        <div class="solar-pkg__sizes" :aria-label="t('home.solarSizesLabel')">
          <NuxtLink
            v-for="size in solarSizes"
            :key="size.kw"
            :to="[5, 10, 15].includes(size.kw) ? `/solar/${size.kw}kw` : `/solar/rooftop/packages?power=${size.kw}`"
            class="solar-size"
          >
            <strong>{{ size.kw }} <span>kW</span></strong>
            <em>{{ size.label }}</em>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- EV Station Packages banner -->
    <section class="pkg-banner">
      <div
        class="pkg-banner__media"
        style="background-image: url('/images/projects/project-dc-station.jpg')"
        aria-hidden="true"
      />
      <div class="pkg-banner__shade" aria-hidden="true" />
      <div class="container-wide pkg-banner__inner">
        <div class="pkg-banner__copy">
          <span class="pkg-banner__label">CX Charge Packages</span>
          <h2>CX Station &amp; CX DC</h2>
          <p>
            {{ t('home.evPkgLead') }}
          </p>
          <NuxtLink to="/ev-charging/packages" class="btn btn-primary">
            {{ t('home.seeCxPkg') }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why + Mission -->
    <section class="belief">
      <div class="belief__why">
        <span class="section-label">Why CX ENERTECH</span>
        <h2 class="section-title">{{ t('home.whyTitle') }}</h2>
        <ul class="belief__list">
          <li v-for="item in why" :key="item.title">
            <span class="belief__mark" aria-hidden="true" />
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="belief__mission">
        <span class="belief__mission-label">Our Mission</span>
        <h2>{{ t('home.missionTitle') }}</h2>
        <p>
          {{ t('home.missionBody') }}
        </p>
        <NuxtLink to="/about/vision-mission" class="btn belief__btn">
          Vision &amp; Mission
        </NuxtLink>
      </div>
    </section>

    <!-- Projects teaser -->
    <section class="section projects">
      <div class="container">
        <div class="projects__head">
          <div>
            <span class="section-label">Selected Work</span>
            <h2 class="section-title">{{ t('home.featured') }}</h2>
          </div>
          <NuxtLink to="/projects" class="projects__all">{{ t('home.seeAll') }}</NuxtLink>
        </div>
        <div class="projects__grid">
          <NuxtLink
            v-for="p in projectTeasers"
            :key="p.to"
            :to="p.to"
            class="project"
          >
            <div class="project__visual">
              <img :src="p.image" :alt="p.title" loading="lazy" width="640" height="360" />
            </div>
            <div class="project__meta">
              <span>{{ p.category }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.detail }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      :title="t('home.ctaTitle')"
      :description="t('home.ctaDescription')"
      :primary-label="t('cta.quote')"
      primary-to="/contact/quotation"
      :secondary-label="t('cta.contact')"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()

const stats = computed(() => [
  { value: '10+', label: t('home.statYears') },
  { value: '500+', label: t('home.statProjects') },
  { value: '300+', label: t('home.statClients') },
  { value: '20K+', label: t('home.statCo2') },
])

const services = computed(() => [
  {
    to: '/solar/rooftop',
    title: 'รับติดตั้งโซล่าเซลล์',
    desc: t('home.svcSolarDesc'),
    image: '/images/projects/project-factory-rooftop.jpg',
  },
  {
    to: '/ev-charging/station',
    title: 'รับติดตั้ง EV Station',
    desc: t('home.svcEvDesc'),
    image: '/images/projects/project-dc-station.jpg',
  },
  {
    to: '/smart-energy',
    title: 'Smart Energy',
    desc: t('home.svcSmartDesc'),
    image: '/images/projects/project-warehouse-epc.jpg',
  },
])

const solarSizes = computed(() => [
  { kw: 3, label: t('home.sizeStarter') },
  { kw: 5, label: t('home.sizeSmall') },
  { kw: 10, label: t('home.sizeLarge') },
  { kw: 15, label: t('home.sizeSme') },
  { kw: 20, label: t('home.sizeCommercial') },
])

const searchIntents = [
  { label: 'รับติดตั้งโซล่าเซลล์', hint: 'บ้าน อาคาร โรงงาน', to: '/solar/rooftop' },
  { label: 'ราคาติดตั้งโซล่าเซลล์', hint: 'แพ็กเกจ On-grid / Hybrid', to: '/solar/rooftop/packages' },
  { label: 'โซล่าเซลล์โรงงาน', hint: 'EPC 100 kW–1 MW', to: '/solar/rooftop/factory' },
  { label: 'รับติดตั้ง EV Station', hint: 'สถานีชาร์จรถไฟฟ้า', to: '/ev-charging/station' },
  { label: 'ราคา EV Station', hint: 'แพ็กเกจ CX Charge', to: '/ev-charging/packages' },
  { label: 'ขอใบเสนอราคา', hint: 'สำรวจไซต์แล้วออกข้อเสนอ', to: '/contact/quotation' },
]

const why = computed(() => [
  { title: 'ทีมติดตั้งเอง', desc: t('home.whyExpert') },
  { title: 'มาตรฐานงานไฟฟ้า', desc: t('home.whyStandards') },
  { title: 'ออกแบบถึงส่งมอบ', desc: t('home.whyE2e') },
])

const projectTeasers = computed(() => [
  {
    to: '/projects/factory-rooftop-2mw',
    title: t('home.projFactory'),
    category: 'Solar',
    detail: '2 MW',
    image: '/images/projects/project-factory-rooftop.jpg',
  },
  {
    to: '/projects/commercial-dc-station',
    title: t('home.projDc'),
    category: 'EV',
    detail: '4 × 120 kW',
    image: '/images/projects/project-dc-station.jpg',
  },
  {
    to: '/projects/warehouse-solar-epc',
    title: t('home.projWarehouse'),
    category: 'EPC',
    detail: '1.5 MW',
    image: '/images/projects/project-warehouse-epc.jpg',
  },
])

usePageSeo({
  title: 'CX ENERTECH | รับติดตั้งโซล่าเซลล์ และ EV Charging',
  description:
    'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด รับติดตั้งโซล่าเซลล์ solar rooftop บ้านถึงโรงงาน พร้อมแพ็กเกจราคา จุดคืนทุน PPA และ EV Charging ครบวงจร',
  path: '/',
  faq: [
    {
      q: 'CX ENERTECH รับติดตั้งโซล่าเซลล์ไหม?',
      a: 'รับติดตั้งโซล่าเซลล์แบบรับเหมาครบวงจร ทั้งบ้าน อาคาร และโรงงาน ดูแพ็กเกจที่ /solar/rooftop/packages แล้วขอใบเสนอราคาตามหลังคาจริง',
    },
    {
      q: 'รับติดตั้ง EV Station ด้วยหรือไม่?',
      a: 'รับสร้างและติดตั้งสถานีชาร์จรถยนต์ไฟฟ้า DC/AC งาน EPC หม้อแปลง และแพลตฟอร์มคิดเงิน รายละเอียดอยู่ที่หน้า รับติดตั้ง EV Station',
    },
    {
      q: 'ดูราคาติดตั้งได้ที่ไหน?',
      a: 'ราคาโซล่าเซลล์อยู่ที่แพ็กเกจโซลาร์ ราคา EV Station อยู่ที่แพ็กเกจ CX Charge ตัวเลขบนเว็บเป็นราคาอ้างอิง ใบเสนอราคาจริงต้องสำรวจไซต์',
    },
  ],
  crumbs: [{ name: 'หน้าแรก', path: '/' }],
})
</script>

<style scoped>
.home {
  background: var(--color-black);
  color: var(--color-white);
}

/* ========== HERO ========== */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  background: #060708;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 68% 42%;
  transform: scale(1.08);
  animation: heroKenBurns 32s ease-out forwards;
}

@keyframes heroKenBurns {
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__bg img {
    animation: none;
    transform: none;
  }
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(6, 7, 8, 0.72) 0%,
      rgba(6, 7, 8, 0.42) 36%,
      rgba(6, 7, 8, 0.12) 62%,
      rgba(6, 7, 8, 0.08) 100%
    ),
    linear-gradient(
      180deg,
      rgba(6, 7, 8, 0.55) 0%,
      rgba(6, 7, 8, 0.12) 28%,
      rgba(6, 7, 8, 0.18) 62%,
      rgba(6, 7, 8, 0.72) 100%
    );
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding-top: calc(var(--header-h) + 1rem);
  padding-bottom: clamp(6.5rem, 14vh, 8.5rem);
}

.hero__copy {
  min-width: 0;
  max-width: min(40rem, 100%);
  margin-left: clamp(0rem, 18vw, 14rem);
  transform: translateY(clamp(-3.5rem, -8vh, -1.25rem));
}

.hero__kicker {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-gold);
  max-width: 100%;
}

.hero__kicker::before {
  content: '';
  width: 2.25rem;
  height: 1px;
  background: var(--color-gold);
}

.hero__title {
  font-size: clamp(2.45rem, 5.2vw, 4.15rem);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
  max-width: 11em;
  margin-bottom: 1.35rem;
  text-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
}

.hero__title em {
  font-style: normal;
  color: var(--color-lime);
}

.hero__lead {
  color: rgba(255, 255, 255, 0.78);
  font-size: clamp(0.98rem, 1.35vw, 1.08rem);
  max-width: 32rem;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.hero__actions .btn {
  flex: 0 1 auto;
  white-space: nowrap;
}

.hero .btn-secondary {
  background: rgba(8, 8, 8, 0.28);
  backdrop-filter: blur(10px);
  border-color: rgba(255, 255, 255, 0.55);
}

.hero__stats {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(1.5rem, 4.5vh, 2.75rem);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem 0.5rem;
  max-width: 36rem;
  margin-left: clamp(0rem, 9vw, 7rem);
  padding-top: 1.5rem;
  border-top: 1px solid rgba(212, 175, 55, 0.28);
}

.metric {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.3rem;
}

.metric dt {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  margin-bottom: 0;
}

.metric dd {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  font-weight: 600;
  color: var(--color-gold-light);
  line-height: 1.1;
}

/* ========== SERVICES ========== */
.services {
  background: #0b0b0b;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.services__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.25rem;
  align-items: end;
  margin-bottom: 2.75rem;
}

.services__head .section-lead {
  margin: 0;
  max-width: 26rem;
}

.services__list {
  display: grid;
  gap: 1rem;
}

.service {
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) 1.2fr;
  min-height: 210px;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: border-color 0.35s, transform 0.4s var(--ease);
}

.service:hover {
  border-color: rgba(212, 255, 0, 0.35);
  transform: translateX(4px);
}

.service__media {
  background-size: cover;
  background-position: center;
  min-height: 210px;
  transition: transform 0.7s var(--ease);
}

.service:hover .service__media {
  transform: scale(1.04);
}

.service__content {
  padding: clamp(1.5rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.service__index {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-gold);
  margin-bottom: 0.65rem;
}

.service__content h3 {
  font-size: clamp(1.35rem, 2.2vw, 1.7rem);
  margin-bottom: 0.55rem;
}

.service__content p {
  color: var(--color-muted);
  max-width: 36rem;
  margin-bottom: 1.15rem;
}

.service__cta {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--color-lime);
}

.intent {
  background: #101010;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.intent__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.intent__card {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.15rem 1.25rem;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.intent__card:hover {
  border-color: rgba(212, 255, 0, 0.35);
}

.intent__card strong {
  font-family: var(--font-display);
  color: var(--color-white);
  font-size: 1.02rem;
}

.intent__card span {
  color: var(--color-muted);
  font-size: 0.88rem;
}

@media (max-width: 800px) {
  .intent__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .intent__grid {
    grid-template-columns: 1fr;
  }
}

/* ========== SOLAR PACKAGES ========== */
.solar-pkg {
  position: relative;
  padding-block: clamp(3.5rem, 7vw, 5.5rem);
  background:
    radial-gradient(ellipse 50% 80% at 90% 20%, rgba(212, 175, 55, 0.12), transparent 55%),
    linear-gradient(160deg, #10141c 0%, #0b0b0b 55%, #0e1218 100%);
  border-block: 1px solid rgba(212, 175, 55, 0.14);
}

.solar-pkg__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
}

.solar-pkg__copy .section-lead {
  margin-top: 0.35rem;
  margin-bottom: 1.75rem;
}

.solar-pkg__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.solar-pkg__sizes {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.65rem;
}

.solar-size {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  min-height: 108px;
  padding: 1rem 0.75rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.3s, transform 0.35s var(--ease), background 0.3s;
}

.solar-size:hover {
  border-color: rgba(212, 175, 55, 0.55);
  background: rgba(212, 175, 55, 0.08);
  transform: translateY(-3px);
}

.solar-size strong {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  font-weight: 800;
  color: var(--color-gold);
  line-height: 1;
}

.solar-size strong span {
  font-size: 0.7em;
  letter-spacing: 0.04em;
}

.solar-size em {
  font-style: normal;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.58);
}

/* ========== EV PACKAGES BANNER ========== */
.pkg-banner {
  position: relative;
  min-height: clamp(320px, 42vw, 460px);
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

.pkg-banner__media,
.pkg-banner__shade {
  position: absolute;
  inset: 0;
}

.pkg-banner__media {
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
  transition: transform 8s var(--ease);
}

.pkg-banner:hover .pkg-banner__media {
  transform: scale(1.06);
}

.pkg-banner__shade {
  background:
    linear-gradient(105deg, rgba(8, 8, 8, 0.92) 0%, rgba(8, 8, 8, 0.72) 42%, rgba(8, 8, 8, 0.35) 100%),
    linear-gradient(0deg, rgba(11, 11, 11, 0.45), transparent 55%);
}

.pkg-banner__inner {
  position: relative;
  z-index: 1;
  padding-block: clamp(3.5rem, 7vw, 5.5rem);
}

.pkg-banner__copy {
  max-width: 34rem;
}

.pkg-banner__label {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 0.85rem;
}

.pkg-banner__copy h2 {
  font-size: clamp(2rem, 4.5vw, 3.1rem);
  color: var(--color-white);
  margin-bottom: 0.85rem;
  line-height: 1.1;
}

.pkg-banner__copy p {
  color: rgba(255, 255, 255, 0.78);
  font-size: 1.05rem;
  line-height: 1.65;
  margin-bottom: 1.75rem;
}

/* ========== BELIEF ========== */
.belief {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  min-height: 460px;
}

.belief__why {
  padding: clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 5vw, 4.5rem);
  background: #101010;
}

.belief__list {
  margin-top: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 440px;
}

.belief__list li {
  display: flex;
  gap: 1rem;
}

.belief__mark {
  width: 12px;
  height: 12px;
  margin-top: 0.45rem;
  background: var(--color-lime);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(212, 255, 0, 0.35);
}

.belief__list strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
}

.belief__list p {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.belief__mission {
  padding: clamp(3.5rem, 7vw, 5.5rem) clamp(1.5rem, 4vw, 3.5rem);
  background:
    linear-gradient(145deg, rgba(212, 255, 0, 0.94), rgba(184, 219, 0, 0.9)),
    url('/images/projects/project-factory-rooftop.jpg')
      center / cover;
  color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.belief__mission::before {
  content: '';
  position: absolute;
  width: 220px;
  height: 220px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 50%;
  right: -60px;
  top: -60px;
}

.belief__mission-label {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
  opacity: 0.7;
}

.belief__mission h2 {
  font-size: clamp(1.9rem, 3.2vw, 2.6rem);
  margin-bottom: 1rem;
}

.belief__mission p {
  max-width: 26rem;
  line-height: 1.7;
  font-weight: 500;
  margin-bottom: 1.75rem;
}

.belief__btn {
  align-self: flex-start;
  background: #111;
  color: var(--color-lime);
  border-radius: var(--radius-pill);
}

.belief__btn:hover {
  background: #000;
  color: #fff;
  transform: translateY(-2px);
}

/* ========== PROJECTS ========== */
.projects {
  background: #0b0b0b;
}

.projects__head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.projects__all {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-lime);
  white-space: nowrap;
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.project {
  display: block;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  transition: transform 0.4s var(--ease), border-color 0.35s;
}

.project:hover {
  transform: translateY(-5px);
  border-color: rgba(212, 255, 0, 0.3);
}

.project__visual {
  height: 160px;
  overflow: hidden;
  background: #0e1a2b;
}

.project__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s var(--ease);
}

.project:hover .project__visual img {
  transform: scale(1.04);
}

.project__meta {
  padding: 1.35rem 1.4rem 1.5rem;
}

.project__meta span {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-lime);
}

.project__meta h3 {
  font-size: 1.1rem;
  margin: 0.4rem 0 0.35rem;
}

.project__meta p {
  color: var(--color-muted);
  font-size: 0.9rem;
}

/* ========== RESPONSIVE ========== */
@media (max-width: 1100px) {
  .hero__inner {
    justify-content: space-between;
    padding-top: calc(var(--header-h) + 1.5rem);
    padding-bottom: 2rem;
  }

  .hero__copy {
    margin-left: 0;
    transform: none;
    max-width: 36rem;
  }

  .hero__stats {
    position: static;
    margin-left: 0;
    margin-top: 2rem;
    max-width: 36rem;
  }

  .hero__title {
    max-width: none;
    font-size: clamp(2.1rem, 5vw, 3.4rem);
  }

  .hero__bg img {
    object-position: 55% 48%;
  }

  .hero__shade {
    background:
      linear-gradient(
        180deg,
        rgba(6, 7, 8, 0.55) 0%,
        rgba(6, 7, 8, 0.22) 28%,
        rgba(6, 7, 8, 0.28) 58%,
        rgba(6, 7, 8, 0.78) 100%
      );
  }
}

@media (max-width: 900px) {
  .belief,
  .projects__grid,
  .solar-pkg__inner {
    grid-template-columns: 1fr;
  }

  .solar-pkg__sizes {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .service {
    grid-template-columns: 1fr;
  }

  .service__media {
    min-height: 180px;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 100dvh;
  }

  .hero__inner {
    justify-content: flex-start;
    gap: 1.75rem;
    min-width: 0;
    padding-top: calc(var(--header-h) + 1.25rem);
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));
  }

  .hero__copy {
    width: 100%;
  }

  .hero__kicker {
    font-size: 0.64rem;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    gap: 0.55rem;
  }

  .hero__kicker::before {
    width: 1.5rem;
  }

  .hero__title {
    font-size: clamp(1.85rem, 8.2vw, 2.35rem);
    line-height: 1.2;
    margin-bottom: 0.9rem;
    max-width: 100%;
  }

  .hero__lead {
    font-size: 0.95rem;
    line-height: 1.65;
    margin-bottom: 1.35rem;
    max-width: 100%;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    max-width: 100%;
  }

  .hero__actions .btn {
    width: 100%;
    padding: 0.82rem 1.25rem;
    white-space: normal;
  }

  .hero__stats {
    /* margin-top: auto; */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem 1.25rem;
    max-width: none;
    padding: 1rem 0 0;
  }

  .metric dd {
    font-size: 1.2rem;
  }

  .hero__bg img {
    animation: none;
    transform: none;
    object-position: 62% 50%;
  }
}

@media (max-width: 640px) {
  .projects__head {
    flex-direction: column;
    align-items: flex-start;
  }

  .solar-pkg__sizes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .hero__inner {
    padding-top: calc(var(--header-h) + 1rem);
    padding-bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px));
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .hero__title {
    font-size: 1.7rem;
  }
}
</style>
