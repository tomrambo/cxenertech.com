<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero__bg" aria-hidden="true">
        <div class="hero__gradient" />
        <div class="hero__pattern" />
        <div class="hero__orb hero__orb--1" />
        <div class="hero__orb hero__orb--2" />
      </div>
      <div class="container-wide hero__content">
        <p class="hero__brand animate-fade-up">CX ENERTECH</p>
        <h1 class="hero__title animate-fade-up animate-delay-1">
          POWERING A<br />SUSTAINABLE FUTURE
        </h1>
        <p class="hero__subtitle animate-fade-up animate-delay-2">
          Smart Solar &amp; EV Charging Solutions
        </p>
        <p class="hero__desc animate-fade-up animate-delay-3">
          CX ENERTECH ให้บริการโซลูชันพลังงานสะอาดและโครงสร้างพื้นฐานสำหรับรถยนต์ไฟฟ้าแบบครบวงจร
          ตั้งแต่การออกแบบ จัดหา ติดตั้ง ระบบ EPC ไปจนถึงการบริหารจัดการและบำรุงรักษา
        </p>
        <div class="hero__cta animate-fade-up animate-delay-4">
          <NuxtLink to="/solar" class="btn btn-primary">ดูบริการของเรา</NuxtLink>
          <NuxtLink to="/contact/quotation" class="btn btn-secondary">ขอใบเสนอราคา</NuxtLink>
        </div>
      </div>
      <div class="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div class="hero__scroll-line" />
      </div>
    </section>

    <!-- Two Pillars -->
    <section class="section pillars">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Smart Energy &amp; EV Infrastructure</span>
          <h2 class="section-title">สองเสาหลักของ CX ENERTECH</h2>
          <p class="section-lead">
            เชื่อมโยงพลังงานแสงอาทิตย์และโครงสร้างพื้นฐาน EV สู่อนาคตที่ยั่งยืน
          </p>
        </div>
        <div class="pillars__grid">
          <NuxtLink to="/solar" class="pillar pillar--solar">
            <div class="pillar__visual" aria-hidden="true">
              <svg viewBox="0 0 120 80" fill="none">
                <rect x="20" y="35" width="80" height="28" rx="2" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
                <path d="M30 35V28M45 35V22M60 35V25M75 35V20M90 35V28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <circle cx="95" cy="18" r="10" stroke="#F0A202" stroke-width="2" fill="none" />
                <path d="M95 12V18L99 20" stroke="#F0A202" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </div>
            <h3>SOLAR ENERGY</h3>
            <p class="pillar__meta">Design • EPC • Installation • O&amp;M</p>
            <p>
              ครอบคลุมตั้งแต่ Solar Rooftop ไปจนถึง Solar Farm และระบบ BOS
              พร้อม Energy Monitoring
            </p>
            <span class="pillar__link">สำรวจบริการ Solar →</span>
          </NuxtLink>
          <NuxtLink to="/ev-charging" class="pillar pillar--ev">
            <div class="pillar__visual" aria-hidden="true">
              <svg viewBox="0 0 120 80" fill="none">
                <rect x="35" y="20" width="50" height="45" rx="4" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
                <path d="M55 32L48 44H58L52 58" stroke="#1AA6A0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="60" cy="68" r="3" fill="#1AA6A0" />
              </svg>
            </div>
            <h3>EV CHARGING</h3>
            <p class="pillar__meta">Charger • Station • EPC • Management</p>
            <p>
              ตั้งแต่ Home Charger → Commercial → DC Fast Charging → EV Station
              พร้อมแพลตฟอร์มบริหารจัดการ
            </p>
            <span class="pillar__link">สำรวจบริการ EV →</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Smart Energy Ecosystem -->
    <section class="section ecosystem">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Smart Energy Ecosystem</span>
          <h2 class="section-title">เชื่อม Solar กับ EV สู่อนาคตที่ยั่งยืน</h2>
        </div>
        <div class="eco-flow">
          <div class="eco-node eco-node--top">
            <strong>CX ENERTECH</strong>
            <span>SMART ENERGY ECOSYSTEM</span>
          </div>
          <div class="eco-branches">
            <NuxtLink to="/solar" class="eco-branch">
              <strong>SOLAR ENERGY</strong>
              <ul>
                <li>Solar Rooftop</li>
                <li>Solar Farm</li>
                <li>Solar EPC</li>
                <li>O&amp;M</li>
              </ul>
            </NuxtLink>
            <NuxtLink to="/ev-charging" class="eco-branch">
              <strong>EV CHARGING</strong>
              <ul>
                <li>AC Charger</li>
                <li>DC Charger</li>
                <li>EV Station</li>
                <li>EV EPC</li>
              </ul>
            </NuxtLink>
          </div>
          <div class="eco-node eco-node--mid">
            <NuxtLink to="/smart-energy">ENERGY MANAGEMENT</NuxtLink>
          </div>
          <div class="eco-node eco-node--bot">SUSTAINABLE FUTURE</div>
        </div>
      </div>
    </section>

    <!-- Key Projects -->
    <section class="section projects-teaser">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Key Projects</span>
          <h2 class="section-title">โครงการที่ผ่านมา</h2>
          <p class="section-lead">ผลงาน Solar และ EV Charging จากทีม CX ENERTECH</p>
        </div>
        <div class="project-grid">
          <NuxtLink
            v-for="project in projects"
            :key="project.slug"
            :to="`/projects/${project.slug}`"
            class="project-card"
          >
            <div class="project-card__visual" :class="`project-card__visual--${project.type}`" />
            <div class="project-card__body">
              <span class="project-card__type">{{ project.category }}</span>
              <h3>{{ project.title }}</h3>
              <p>{{ project.capacity }}</p>
            </div>
          </NuxtLink>
        </div>
        <div class="projects-teaser__more">
          <NuxtLink to="/projects" class="btn btn-outline-dark">ดูโครงการทั้งหมด</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why CX -->
    <section class="section why">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Why CX ENERTECH</span>
          <h2 class="section-title">ทำไมต้องเลือกเรา</h2>
        </div>
        <div class="why__grid">
          <div v-for="item in whyItems" :key="item.title" class="why__item">
            <span class="why__num">{{ item.num }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="section partners-strip">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Partners &amp; Certifications</span>
          <h2 class="section-title">พันธมิตรและมาตรฐาน</h2>
        </div>
        <div class="partner-logos">
          <div v-for="p in partners" :key="p" class="partner-logo">{{ p }}</div>
        </div>
        <div class="partners-strip__link">
          <NuxtLink to="/partners">ดูพันธมิตรทั้งหมด →</NuxtLink>
          <NuxtLink to="/about/certifications">ดูใบรับรอง →</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="ขอใบเสนอราคาวันนี้"
      description="ปรึกษาทีมผู้เชี่ยวชาญด้าน Solar และ EV Charging เพื่อออกแบบโซลูชันที่เหมาะสมกับคุณ"
      primary-label="ขอใบเสนอราคา"
      primary-to="/contact/quotation"
      secondary-label="ขอสำรวจพื้นที่"
      secondary-to="/contact/site-survey"
    />
  </div>
</template>

<script setup lang="ts">
const projects = [
  { slug: 'factory-rooftop-2mw', title: 'โรงงานอุตสาหกรรม Solar Rooftop', category: 'Solar', capacity: '2 MW', type: 'solar' },
  { slug: 'commercial-dc-station', title: 'สถานีชาร์จ DC Fast Charging', category: 'EV Charging', capacity: '4 × 120 kW', type: 'ev' },
  { slug: 'warehouse-solar-epc', title: 'คลังสินค้า Solar EPC', category: 'Solar EPC', capacity: '1.5 MW', type: 'epc' },
  { slug: 'mall-ev-hub', title: 'EV Charging Hub ห้างสรรพสินค้า', category: 'EV Station', capacity: '12 จุดชาร์จ', type: 'ev' },
]

const whyItems = [
  { num: '01', title: 'ครบวงจร EPC', desc: 'ออกแบบ จัดหา ติดตั้ง Commissioning และ O&M ในที่เดียว' },
  { num: '02', title: 'Solar + EV Integration', desc: 'เชื่อมระบบโซลาร์กับสถานีชาร์จ EV เพื่อใช้พลังงานอย่างมีประสิทธิภาพ' },
  { num: '03', title: 'มาตรฐานวิศวกรรม', desc: 'ทีมวิศวกรมืออาชีพ พร้อมระบบไฟฟ้า BOS และมาตรฐานความปลอดภัย' },
  { num: '04', title: 'แพลตฟอร์มบริหารจัดการ', desc: 'Monitoring, Payment และ Reporting สำหรับ Solar และ EV' },
]

const partners = ['Huawei', 'Sungrow', 'Jinko', 'Trina', 'ABB', 'Schneider', 'Delta', 'PEA']

useSeoMeta({
  title: 'CX ENERTECH — Powering a Sustainable Future',
  description:
    'Smart Solar & EV Charging Solutions — โซลูชันพลังงานสะอาดและโครงสร้างพื้นฐาน EV แบบครบวงจร',
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  background: var(--color-forest);
  color: var(--color-cream);
  overflow: hidden;
  padding: calc(var(--header-h) + 2rem) 0 4rem;
}

.hero__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, #031f18 0%, #052e24 40%, #0a3d38 70%, #0a2a32 100%),
    linear-gradient(90deg, transparent 50%, rgba(26, 166, 160, 0.08) 100%);
}

.hero__pattern {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image:
    linear-gradient(rgba(245, 247, 244, 0.4) 1px, transparent 1px),
    linear-gradient(90deg, rgba(245, 247, 244, 0.4) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 70% 60% at 70% 40%, black, transparent);
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.hero__orb--1 {
  width: 50vw;
  height: 50vw;
  max-width: 600px;
  max-height: 600px;
  background: rgba(240, 162, 2, 0.18);
  top: -10%;
  right: -5%;
  animation: orbFloat 12s ease-in-out infinite;
}

.hero__orb--2 {
  width: 40vw;
  height: 40vw;
  max-width: 480px;
  max-height: 480px;
  background: rgba(26, 166, 160, 0.22);
  bottom: -15%;
  left: 10%;
  animation: orbFloat 15s ease-in-out infinite reverse;
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-20px, 30px) scale(1.08);
  }
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 820px;
}

.hero__brand {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  letter-spacing: 0.18em;
  color: var(--color-solar);
  margin-bottom: 1.25rem;
}

.hero__title {
  font-size: clamp(2.4rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}

.hero__subtitle {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 600;
  color: var(--color-teal-bright);
  letter-spacing: 0.02em;
  margin-bottom: 1.5rem;
}

.hero__desc {
  font-size: 1.05rem;
  opacity: 0.8;
  max-width: 34rem;
  line-height: 1.75;
  margin-bottom: 2.25rem;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.hero__scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.45;
  z-index: 1;
}

.hero__scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-cream), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scaleY(0.7);
  }
  50% {
    opacity: 1;
    transform: scaleY(1);
  }
}

/* Pillars */
.pillars__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.pillar {
  display: block;
  padding: 2.5rem 2rem;
  background: var(--color-white);
  border-top: 3px solid transparent;
  transition: transform 0.4s var(--ease), box-shadow 0.4s, border-color 0.3s;
}

.pillar:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(5, 46, 36, 0.1);
}

.pillar--solar:hover {
  border-top-color: var(--color-solar);
}

.pillar--ev:hover {
  border-top-color: var(--color-teal);
}

.pillar__visual {
  color: var(--color-forest);
  margin-bottom: 1.25rem;
  width: 120px;
}

.pillar h3 {
  font-size: 1.5rem;
  color: var(--color-forest);
  margin-bottom: 0.4rem;
}

.pillar__meta {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-teal);
  margin-bottom: 1rem;
}

.pillar p {
  color: var(--color-muted);
  font-size: 0.95rem;
  margin-bottom: 1.25rem;
}

.pillar__link {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--color-forest);
}

/* Ecosystem */
.ecosystem {
  background: var(--color-forest);
  color: var(--color-cream);
}

.ecosystem .section-label {
  color: var(--color-solar);
}

.ecosystem .section-title {
  color: var(--color-cream);
}

.eco-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  max-width: 700px;
  margin-inline: auto;
}

.eco-node {
  text-align: center;
  padding: 1.25rem 2rem;
  position: relative;
}

.eco-node--top strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  letter-spacing: 0.08em;
}

.eco-node--top span {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: var(--color-teal-bright);
  margin-top: 0.35rem;
  font-family: var(--font-display);
  font-weight: 600;
}

.eco-node--top::after,
.eco-node--mid::before,
.eco-node--mid::after,
.eco-branches::before,
.eco-branches::after {
  content: '';
  display: block;
  width: 1px;
  height: 28px;
  background: rgba(245, 247, 244, 0.3);
  margin: 0.5rem auto;
}

.eco-branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  position: relative;
}

.eco-branches::before {
  position: absolute;
  top: -28px;
  left: 50%;
  height: 28px;
  margin: 0;
}

.eco-branch {
  background: rgba(245, 247, 244, 0.05);
  border: 1px solid rgba(245, 247, 244, 0.12);
  padding: 1.5rem;
  transition: background 0.3s, border-color 0.3s;
}

.eco-branch:hover {
  background: rgba(245, 247, 244, 0.1);
  border-color: var(--color-teal);
}

.eco-branch strong {
  display: block;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  margin-bottom: 0.85rem;
  color: var(--color-solar);
}

.eco-branch ul {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.eco-branch li {
  font-size: 0.9rem;
  opacity: 0.75;
}

.eco-node--mid a {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 0.95rem;
  color: var(--color-teal-bright);
  border-bottom: 1px solid rgba(26, 166, 160, 0.4);
  padding-bottom: 0.2rem;
  transition: color 0.25s;
}

.eco-node--mid a:hover {
  color: var(--color-solar);
}

.eco-node--bot {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.12em;
  font-size: 0.85rem;
  color: var(--color-solar);
}

/* Projects */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.project-card {
  display: block;
  background: var(--color-white);
  overflow: hidden;
  transition: transform 0.4s var(--ease), box-shadow 0.4s;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(5, 46, 36, 0.1);
}

.project-card__visual {
  height: 160px;
  background: linear-gradient(135deg, var(--color-forest-mid), var(--color-forest));
}

.project-card__visual--solar {
  background: linear-gradient(135deg, #0a4a3a, #1a6b4a 40%, #f0a20244);
}

.project-card__visual--ev {
  background: linear-gradient(135deg, #0a3d48, #1aa6a0 60%, #052e24);
}

.project-card__visual--epc {
  background: linear-gradient(135deg, #052e24, #0f5c48 50%, #1aa6a044);
}

.project-card__body {
  padding: 1.5rem;
}

.project-card__type {
  font-size: 0.7rem;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-teal);
}

.project-card__body h3 {
  font-size: 1.15rem;
  color: var(--color-forest);
  margin: 0.4rem 0 0.35rem;
}

.project-card__body p {
  font-size: 0.9rem;
  color: var(--color-muted);
}

.projects-teaser__more {
  margin-top: 2.5rem;
  text-align: center;
}

/* Why */
.why {
  background: var(--color-mist);
}

.why__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.why__num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2rem;
  color: var(--color-teal);
  opacity: 0.5;
  display: block;
  margin-bottom: 0.75rem;
}

.why__item h3 {
  font-size: 1.1rem;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
}

.why__item p {
  font-size: 0.9rem;
  color: var(--color-muted);
}

/* Partners */
.partner-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.partner-logo {
  padding: 1rem 1.75rem;
  background: var(--color-white);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-forest-mid);
  letter-spacing: 0.04em;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.partner-logo:hover {
  opacity: 1;
}

.partners-strip__link {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--color-forest);
}

.partners-strip__link a:hover {
  color: var(--color-teal);
}

@media (max-width: 900px) {
  .pillars__grid,
  .project-grid {
    grid-template-columns: 1fr;
  }

  .why__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .why__grid {
    grid-template-columns: 1fr;
  }

  .eco-branches {
    grid-template-columns: 1fr;
  }

  .hero__scroll {
    display: none;
  }
}
</style>
