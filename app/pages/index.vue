<template>
  <div class="home">
    <!-- Cover / Hero -->
    <section class="cover">
      <div class="cover__glow" aria-hidden="true" />
      <div class="cover__particles" aria-hidden="true" />

      <div class="container-wide cover__grid">
        <div class="cover__copy">
          <p class="cover__eyebrow animate-fade-up">CX ENERTECH CO., LTD.</p>
          <h1 class="cover__title animate-fade-up animate-delay-1">
            Empowering a
            <span class="accent">Sustainable</span>
            Future with Smart Energy &amp; Technology
          </h1>
          <p class="cover__desc animate-fade-up animate-delay-2">
            ผู้นำด้านโซลูชันพลังงานสะอาด โครงสร้างพื้นฐาน EV Charging
            และเทคโนโลยีดิจิทัลแบบครบวงจร — ตั้งแต่ Solar Energy ถึง Smart Charging
          </p>
          <div class="cover__cta animate-fade-up animate-delay-3">
            <NuxtLink to="/solar" class="btn btn-primary">
              ดูบริการของเรา
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-secondary">เกี่ยวกับเรา</NuxtLink>
          </div>
        </div>

        <div class="cover__visual animate-fade-up animate-delay-2" aria-hidden="true">
          <div
            v-for="panel in panels"
            :key="panel.label"
            class="panel"
            :class="`panel--${panel.key}`"
          >
            <div class="panel__media" :style="{ backgroundImage: `url(${panel.image})` }" />
            <div class="panel__overlay" />
            <div class="panel__badge">
              <span class="panel__dot" />
              {{ panel.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats">
      <div class="container-wide stats__row">
        <div v-for="s in stats" :key="s.label" class="stat">
          <span class="stat__icon" aria-hidden="true">◆</span>
          <strong>{{ s.value }}</strong>
          <span>{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section class="section services">
      <div class="container">
        <div class="section-header">
          <span class="section-label">What We Do</span>
          <h2 class="section-title">บริการของเรา</h2>
          <p class="section-lead">
            โซลูชันครบวงจรด้านพลังงานสะอาด โครงสร้างพื้นฐาน EV และเทคโนโลยี
          </p>
        </div>
        <div class="services__grid">
          <NuxtLink
            v-for="svc in services"
            :key="svc.to"
            :to="svc.to"
            class="service-card"
          >
            <div class="service-card__img" :style="{ backgroundImage: `url(${svc.image})` }" />
            <div class="service-card__body">
              <h3>{{ svc.title }}</h3>
              <p>{{ svc.desc }}</p>
              <span class="service-card__link">ดูรายละเอียด →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why + Mission -->
    <section class="split">
      <div class="split__why">
        <span class="section-label">Why Choose Us</span>
        <h2 class="section-title">ทำไมต้อง CX ENERTECH</h2>
        <ul class="why-list">
          <li v-for="item in why" :key="item.title">
            <span class="why-list__icon" aria-hidden="true">✓</span>
            <div>
              <strong>{{ item.title }}</strong>
              <p>{{ item.desc }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="split__mission">
        <span class="mission-label">Our Mission</span>
        <h2>ภารกิจของเรา</h2>
        <p>
          Empowering a Sustainable Future with Smart Energy &amp; Technology Solutions
          — ส่งมอบโซลูชันที่เชื่อถือได้ เพื่ออนาคตที่ยั่งยืนของธุรกิจและสังคม
        </p>
        <NuxtLink to="/about/vision-mission" class="btn btn-secondary mission-btn">
          Vision &amp; Mission
        </NuxtLink>
      </div>
    </section>

    <!-- Pillars quick links -->
    <section class="section pillars">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Business Pillars</span>
          <h2 class="section-title">สามเสาหลักธุรกิจ</h2>
        </div>
        <div class="pillars__row">
          <NuxtLink to="/solar" class="pillar-link">
            <strong>SOLAR ENERGY</strong>
            <span>Clean Energy for a Better Tomorrow</span>
          </NuxtLink>
          <NuxtLink to="/ev-charging" class="pillar-link">
            <strong>EV CHARGING</strong>
            <span>Smart Charging for Every Journey</span>
          </NuxtLink>
          <NuxtLink to="/smart-energy" class="pillar-link">
            <strong>SMART ENERGY</strong>
            <span>Technology Solutions Driving Your Business</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="พร้อมเริ่มต้นโครงการของคุณ?"
      description="ปรึกษาทีม CX ENERTECH เพื่อออกแบบโซลูชัน Solar, EV Charging และ Smart Energy"
      primary-label="ขอใบเสนอราคา"
      primary-to="/contact/quotation"
      secondary-label="ติดต่อเรา"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup lang="ts">
const panels = [
  {
    key: 'solar',
    label: 'SOLAR ENERGY',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80',
  },
  {
    key: 'ev',
    label: 'EV CHARGER',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    key: 'it',
    label: 'IT SOLUTIONS',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
  },
]

const stats = [
  { value: '10+', label: 'Years of experience' },
  { value: '500+', label: 'Completed projects' },
  { value: '300+', label: 'Trusted clients' },
  { value: '20,000+', label: 'Tons of CO₂ reduced' },
  { value: 'ISO', label: 'International Standards' },
]

const services = [
  {
    to: '/solar',
    title: 'Solar Energy Solutions',
    desc: 'ออกแบบ ติดตั้ง และดูแลระบบโซลาร์ครบวงจร ตั้งแต่ Rooftop ถึง Solar Farm',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
  },
  {
    to: '/ev-charging',
    title: 'EV Charging Solutions',
    desc: 'Home Charger, Commercial และ EV Station พร้อมระบบบริหารจัดการ',
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
  },
  {
    to: '/smart-energy',
    title: 'Smart Energy & Technology',
    desc: 'เชื่อม Solar กับ EV สู่ Energy Management และโซลูชันเทคโนโลยี',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  },
]

const why = [
  { title: 'Expert Team', desc: 'ทีมวิศวกรและผู้เชี่ยวชาญด้านพลังงานและ EV Infrastructure' },
  { title: 'International Standards', desc: 'มาตรฐานความปลอดภัยและคุณภาพระดับสากล' },
  { title: 'Modern Technology', desc: 'เทคโนโลยี Monitoring, Management และ Integration' },
]

useSeoMeta({
  title: 'CX ENERTECH — Empowering a Sustainable Future',
  description:
    'Smart Energy & Technology Solutions — Solar Energy, EV Charging และโซลูชันเทคโนโลยีครบวงจร',
})
</script>

<style scoped>
.home {
  background: var(--color-black);
  color: var(--color-white);
}

/* ===== COVER ===== */
.cover {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  padding: calc(var(--header-h) + 2.5rem) 0 3rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  background:
    radial-gradient(ellipse 50% 60% at 15% 20%, rgba(212, 255, 0, 0.06), transparent 60%),
    radial-gradient(ellipse 40% 50% at 90% 80%, rgba(212, 175, 55, 0.08), transparent 55%),
    linear-gradient(160deg, #0b0b0b 0%, #10141c 45%, #0b0b0b 100%);
}

.cover__glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(212, 255, 0, 0.03) 100%);
  pointer-events: none;
}

.cover__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 10% 20%, rgba(212, 175, 55, 0.7), transparent),
    radial-gradient(1.5px 1.5px at 30% 70%, rgba(212, 255, 0, 0.45), transparent),
    radial-gradient(1px 1px at 70% 30%, rgba(212, 175, 55, 0.55), transparent),
    radial-gradient(1.5px 1.5px at 85% 60%, rgba(212, 255, 0, 0.4), transparent),
    radial-gradient(1px 1px at 50% 85%, rgba(212, 175, 55, 0.5), transparent);
  opacity: 0.7;
  animation: particleDrift 18s linear infinite;
}

@keyframes particleDrift {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
  100% {
    transform: translateY(0);
  }
}

.cover__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 2.5rem;
  align-items: center;
  width: 100%;
}

.cover__eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--color-gold);
  margin-bottom: 1.25rem;
}

.cover__title {
  font-size: clamp(2.1rem, 5.2vw, 3.6rem);
  font-weight: 800;
  line-height: 1.12;
  margin-bottom: 1.25rem;
  max-width: 16ch;
}

.cover__title .accent {
  color: var(--color-lime);
}

.cover__desc {
  color: rgba(255, 255, 255, 0.72);
  font-size: 1.05rem;
  max-width: 34rem;
  margin-bottom: 2rem;
  line-height: 1.75;
}

.cover__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

/* Diagonal panels */
.cover__visual {
  position: relative;
  height: min(68vh, 560px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.65rem;
  padding: 0.5rem 0;
}

.panel {
  position: relative;
  overflow: hidden;
  clip-path: polygon(18% 0, 100% 0, 82% 100%, 0 100%);
  min-height: 100%;
  transition: transform 0.45s var(--ease), filter 0.45s;
}

.panel:nth-child(1) {
  transform: translateY(12px);
}
.panel:nth-child(2) {
  transform: translateY(-8px);
}
.panel:nth-child(3) {
  transform: translateY(18px);
}

.panel:hover {
  filter: brightness(1.12);
  z-index: 2;
}

.panel__media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.08);
  transition: transform 0.7s var(--ease);
}

.panel:hover .panel__media {
  transform: scale(1.14);
}

.panel__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.55));
}

.panel__badge {
  position: absolute;
  left: 22%;
  right: 12%;
  bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--color-white);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
}

.panel__dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--color-lime);
  box-shadow: 0 0 16px rgba(212, 255, 0, 0.55);
  flex-shrink: 0;
}

.panel--solar .panel__dot {
  background: var(--color-lime);
}
.panel--ev .panel__dot {
  background: #7dff4d;
}
.panel--it .panel__dot {
  background: #4db8ff;
}

/* ===== STATS ===== */
.stats {
  background: #101010;
  border-block: 1px solid rgba(212, 255, 0, 0.12);
  padding: 1.75rem 0;
}

.stats__row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.stat {
  text-align: center;
  padding: 0.5rem;
}

.stat__icon {
  display: block;
  color: var(--color-lime);
  font-size: 0.65rem;
  margin-bottom: 0.35rem;
  opacity: 0.8;
}

.stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
  font-weight: 800;
  color: var(--color-white);
  margin-bottom: 0.2rem;
}

.stat span {
  font-size: 0.75rem;
  color: var(--color-muted);
  letter-spacing: 0.02em;
}

/* ===== SERVICES ===== */
.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.service-card {
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transition: border-color 0.35s, transform 0.35s var(--ease), box-shadow 0.35s;
}

.service-card:hover {
  border-color: rgba(212, 255, 0, 0.45);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

.service-card__img {
  height: 180px;
  background-size: cover;
  background-position: center;
}

.service-card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.service-card__body h3 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.service-card__body p {
  color: var(--color-muted);
  font-size: 0.92rem;
  flex: 1;
  margin-bottom: 1.25rem;
}

.service-card__link {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-lime);
}

/* ===== SPLIT ===== */
.split {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  min-height: 420px;
}

.split__why {
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem);
  background: #101010;
}

.why-list {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  margin-top: 2rem;
  max-width: 420px;
}

.why-list li {
  display: flex;
  gap: 0.85rem;
}

.why-list__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(212, 255, 0, 0.15);
  color: var(--color-lime);
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 0.15rem;
}

.why-list strong {
  display: block;
  font-family: var(--font-display);
  margin-bottom: 0.2rem;
}

.why-list p {
  color: var(--color-muted);
  font-size: 0.9rem;
}

.split__mission {
  padding: clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 3.5rem);
  background:
    linear-gradient(135deg, rgba(212, 255, 0, 0.92), rgba(184, 219, 0, 0.95)),
    url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=70')
      center / cover;
  color: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mission-label {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  opacity: 0.75;
}

.split__mission h2 {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  margin-bottom: 1rem;
}

.split__mission p {
  max-width: 28rem;
  line-height: 1.7;
  margin-bottom: 1.75rem;
  font-weight: 500;
}

.mission-btn {
  align-self: flex-start;
  border-color: rgba(0, 0, 0, 0.35);
  color: #111;
}

.mission-btn:hover {
  background: #111;
  color: var(--color-lime);
  border-color: #111;
}

/* ===== PILLARS ===== */
.pillars__row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.pillar-link {
  padding: 1.75rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(160deg, #151515, #101010);
  transition: border-color 0.3s, transform 0.35s var(--ease);
}

.pillar-link:hover {
  border-color: var(--color-lime);
  transform: translateY(-3px);
}

.pillar-link strong {
  display: block;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  font-size: 0.95rem;
  color: var(--color-lime);
  margin-bottom: 0.45rem;
}

.pillar-link span {
  color: var(--color-muted);
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .cover__grid {
    grid-template-columns: 1fr;
  }

  .cover__visual {
    height: 280px;
    order: -1;
  }

  .cover__title {
    max-width: none;
  }

  .stats__row {
    grid-template-columns: repeat(3, 1fr);
  }

  .services__grid,
  .pillars__row {
    grid-template-columns: 1fr;
  }

  .split {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stats__row {
    grid-template-columns: 1fr 1fr;
  }

  .panel {
    clip-path: polygon(12% 0, 100% 0, 88% 100%, 0 100%);
  }

  .panel__badge {
    font-size: 0.55rem;
    left: 16%;
  }

  .panel__dot {
    width: 14px;
    height: 14px;
  }
}
</style>
