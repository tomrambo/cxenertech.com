<template>
  <div class="home">
    <!-- Hero: one composition -->
    <section class="hero">
      <div class="hero__atmosphere" aria-hidden="true">
        <div class="hero__orb hero__orb--gold" />
        <div class="hero__orb hero__orb--lime" />
        <div class="hero__grid" />
        <div class="hero__particles" />
      </div>

      <div class="container-wide hero__inner">
        <div class="hero__copy">
          <div class="hero__brand animate-fade-up">
            <BrandLogo variant="light" :height="64" />
          </div>
          <h1 class="hero__title animate-fade-up animate-delay-1">
            Empowering a
            <em>Sustainable</em>
            Future
          </h1>
          <p class="hero__lead animate-fade-up animate-delay-2">
            Smart Energy &amp; Technology Solutions — โซลูชันพลังงานสะอาด
            และโครงสร้างพื้นฐาน EV แบบครบวงจร
          </p>
          <div class="hero__actions animate-fade-up animate-delay-3">
            <NuxtLink to="/solar" class="btn btn-primary">
              ดูบริการของเรา
              <span aria-hidden="true">→</span>
            </NuxtLink>
            <NuxtLink to="/contact/quotation" class="btn btn-secondary">ขอใบเสนอราคา</NuxtLink>
          </div>
        </div>

        <div class="hero__stage animate-fade-up animate-delay-2">
          <div class="hero__slash" aria-hidden="true" />
          <article
            v-for="(panel, i) in panels"
            :key="panel.key"
            class="slice"
            :class="[`slice--${panel.key}`, `slice--${i + 1}`]"
          >
            <div class="slice__media" :style="{ backgroundImage: `url(${panel.image})` }" />
            <div class="slice__shade" />
            <p class="slice__caption">
              <span class="slice__icon" :aria-hidden="true" />
              {{ panel.label }}
            </p>
          </article>
        </div>
      </div>

      <div class="hero__metrics">
        <div class="container-wide hero__metrics-row">
          <div v-for="s in stats" :key="s.label" class="metric">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section services">
      <div class="container">
        <div class="services__head">
          <div>
            <span class="section-label">What We Do</span>
            <h2 class="section-title">บริการของเรา</h2>
          </div>
          <p class="section-lead">
            จาก Solar Energy สู่ EV Charging และ Smart Energy Ecosystem
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
              <span class="service__cta">ดูรายละเอียด →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why + Mission -->
    <section class="belief">
      <div class="belief__why">
        <span class="section-label">Why CX ENERTECH</span>
        <h2 class="section-title">ทำไมต้องเลือกเรา</h2>
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
        <h2>ภารกิจของเรา</h2>
        <p>
          ส่งมอบโซลูชัน Smart Energy ที่เชื่อถือได้
          เพื่ออนาคตที่ยั่งยืนของธุรกิจและสังคม
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
            <h2 class="section-title">โครงการเด่น</h2>
          </div>
          <NuxtLink to="/projects" class="projects__all">ดูทั้งหมด →</NuxtLink>
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
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
  },
  {
    key: 'ev',
    label: 'EV CHARGING',
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    key: 'it',
    label: 'SMART ENERGY',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  },
]

const stats = [
  { value: '10+', label: 'Years' },
  { value: '500+', label: 'Projects' },
  { value: '300+', label: 'Clients' },
  { value: '20K+', label: 'tCO₂ Reduced' },
]

const services = [
  {
    to: '/solar',
    title: 'Solar Energy',
    desc: 'Design • EPC • Installation • O&M — จาก Rooftop ถึง Solar Farm',
    image:
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1100&q=80',
  },
  {
    to: '/ev-charging',
    title: 'EV Charging',
    desc: 'Home • Commercial • Station EPC • Management Platform',
    image:
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1100&q=80',
  },
  {
    to: '/smart-energy',
    title: 'Smart Energy',
    desc: 'เชื่อม Solar กับ EV สู่ Energy Management ที่ชาญฉลาด',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=80',
  },
]

const why = [
  { title: 'Expert Team', desc: 'วิศวกรและผู้เชี่ยวชาญด้านพลังงานและ EV Infrastructure' },
  { title: 'International Standards', desc: 'มาตรฐานความปลอดภัยและคุณภาพระดับสากล' },
  { title: 'End-to-End Delivery', desc: 'ออกแบบ ติดตั้ง Commissioning และ O&M ในที่เดียว' },
]

const projectTeasers = [
  {
    to: '/projects/factory-rooftop-2mw',
    title: 'โรงงานอุตสาหกรรม Solar Rooftop',
    category: 'Solar',
    detail: '2 MW',
    image: '/images/projects/project-factory-rooftop.jpg',
  },
  {
    to: '/projects/commercial-dc-station',
    title: 'สถานีชาร์จ DC Fast Charging',
    category: 'EV',
    detail: '4 × 120 kW',
    image: '/images/projects/project-dc-station.jpg',
  },
  {
    to: '/projects/warehouse-solar-epc',
    title: 'คลังสินค้า Solar EPC',
    category: 'EPC',
    detail: '1.5 MW',
    image: '/images/projects/project-warehouse-epc.jpg',
  },
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

/* ========== HERO ========== */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: calc(var(--header-h) + 2rem) 0 0;
  overflow: hidden;
  background: #07090d;
}

.hero__atmosphere {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}

.hero__orb--gold {
  width: min(48vw, 520px);
  height: min(48vw, 520px);
  right: -8%;
  top: -12%;
  background: rgba(197, 160, 89, 0.18);
  animation: floatOrb 14s ease-in-out infinite;
}

.hero__orb--lime {
  width: min(40vw, 420px);
  height: min(40vw, 420px);
  left: -10%;
  bottom: 10%;
  background: rgba(212, 255, 0, 0.08);
  animation: floatOrb 18s ease-in-out infinite reverse;
}

.hero__grid {
  position: absolute;
  inset: 0;
  opacity: 0.045;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.7) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 70% 60% at 60% 40%, black, transparent);
}

.hero__particles {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 22%, rgba(212, 175, 55, 0.8), transparent),
    radial-gradient(1.5px 1.5px at 78% 28%, rgba(212, 255, 0, 0.45), transparent),
    radial-gradient(1px 1px at 40% 70%, rgba(212, 175, 55, 0.55), transparent),
    radial-gradient(1.5px 1.5px at 88% 68%, rgba(212, 255, 0, 0.35), transparent);
  animation: particleDrift 16s ease-in-out infinite;
}

@keyframes floatOrb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-18px, 22px) scale(1.06);
  }
}

@keyframes particleDrift {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-14px);
    opacity: 1;
  }
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  width: 100%;
  padding-bottom: 2rem;
  padding-left: 50px;
  padding-right: 50px;
}

.hero__brand {
  margin-bottom: 1.75rem;
}

.hero__title {
  font-size: clamp(2.4rem, 5.8vw, 4.2rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  max-width: 11ch;
  margin-bottom: 1.35rem;
}

.hero__title em {
  font-style: normal;
  color: var(--color-lime);
  display: inline;
}

.hero__lead {
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(1rem, 1.6vw, 1.1rem);
  max-width: 32rem;
  line-height: 1.75;
  margin-bottom: 2rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

/* Diagonal stage */
.hero__stage {
  position: relative;
  height: min(62vh, 540px);
  display: grid;
  grid-template-columns: 1.05fr 1fr 1.05fr;
  gap: 0;
  margin-right: -1rem;
}

.hero__slash {
  position: absolute;
  inset: -8% 8%;
  border-top: 1px solid rgba(212, 175, 55, 0.35);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  transform: skewX(-12deg);
  pointer-events: none;
  z-index: 0;
}

.slice {
  position: relative;
  overflow: hidden;
  clip-path: polygon(16% 0, 100% 0, 84% 100%, 0 100%);
  min-height: 100%;
  transition: transform 0.5s var(--ease), filter 0.5s;
  z-index: 1;
}

.slice--1 {
  transform: translateY(18px) scale(0.96);
  z-index: 1;
}
.slice--2 {
  transform: translateY(-6px) scale(1.02);
  z-index: 3;
}
.slice--3 {
  transform: translateY(24px) scale(0.96);
  z-index: 2;
}

.slice:hover {
  filter: brightness(1.1);
  z-index: 4;
}

.slice__media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.1);
  transition: transform 0.8s var(--ease);
}

.slice:hover .slice__media {
  transform: scale(1.16);
}

.slice__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(185deg, rgba(7, 9, 13, 0.05), rgba(7, 9, 13, 0.72));
}

.slice__caption {
  position: absolute;
  left: 20%;
  right: 10%;
  bottom: 1.35rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
}

.slice__icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-lime);
  box-shadow: 0 0 14px rgba(212, 255, 0, 0.55);
  flex-shrink: 0;
}

.slice--ev .slice__icon {
  background: #8dff57;
}
.slice--it .slice__icon {
  background: #5cbcff;
}

/* Metrics bar attached to hero */
.hero__metrics {
  position: relative;
  z-index: 2;
  margin-top: auto;
  border-top: 1px solid rgba(212, 255, 0, 0.14);
  background: rgba(10, 12, 16, 0.82);
  backdrop-filter: blur(10px);
}

.hero__metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 1.35rem 0;
}

.metric {
  text-align: center;
  padding: 0.35rem 0.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.metric:last-child {
  border-right: none;
}

.metric strong {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.9rem);
  font-weight: 800;
  color: var(--color-lime);
  line-height: 1.1;
  margin-bottom: 0.2rem;
}

.metric span {
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
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
    url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70')
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
    grid-template-columns: 1fr;
    padding-bottom: 1.5rem;
    padding-left: 10px;
    padding-right: 10px;
  }

  .hero__title {
    max-width: 14ch;
  }

  .hero__stage {
    height: 300px;
    margin-right: 0;
    order: -1;
  }

  .slice--1,
  .slice--2,
  .slice--3 {
    transform: none;
  }
}

@media (max-width: 900px) {
  .belief,
  .projects__grid {
    grid-template-columns: 1fr;
  }

  .service {
    grid-template-columns: 1fr;
  }

  .service__media {
    min-height: 180px;
  }

  .hero__metrics-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .metric:nth-child(2) {
    border-right: none;
  }

  .metric:nth-child(1),
  .metric:nth-child(2) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding-bottom: 0.85rem;
    margin-bottom: 0.35rem;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: calc(var(--header-h) + 1.25rem);
  }

  .hero__stage {
    height: 220px;
  }

  .slice {
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
  }

  .slice__caption {
    font-size: 0.58rem;
    left: 14%;
    bottom: 0.85rem;
  }

  .projects__head {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
