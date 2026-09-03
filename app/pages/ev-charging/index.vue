<template>
  <div class="ev">
    <!-- Full-bleed product hero -->
    <section class="hero">
      <div
        class="hero__media"
        style="background-image: url('/images/projects/project-dc-station.jpg')"
        aria-hidden="true"
      />
      <div class="hero__shade" aria-hidden="true" />
      <div class="hero__grain" aria-hidden="true" />

      <div class="container hero__inner">
        <p class="hero__brand animate-fade-up">CX ENERTECH · EV Charging</p>
        <h1 class="hero__title animate-fade-up animate-delay-1">
          EV Charging
          <em>เครื่องชาร์จและสถานีชาร์จรถไฟฟ้า</em>
        </h1>
        <p class="hero__lead animate-fade-up animate-delay-2">
          เลือกเครื่องชาร์จ DC/AC แพ็กเกจสถานี หรืองานรับติดตั้ง EV Station แบบ EPC
          — แต่ละเจตนาค้นมีหน้าที่เป็นของตัวเอง
        </p>
        <div class="hero__actions animate-fade-up animate-delay-3">
          <NuxtLink to="/ev-charging/station" class="btn btn-primary">
            รับติดตั้ง EV Station
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink to="/ev-charging/packages" class="btn btn-secondary">ดูแพ็กเกจราคา</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Product series (tabs) -->
    <section class="series">
      <div class="container">
        <div class="series__head">
          <span class="section-label">Our Products</span>
          <h2 class="section-title">เลือกซีรีส์ที่เหมาะกับไซต์ของคุณ</h2>
        </div>

        <div class="series__tabs" role="tablist" aria-label="EV product series">
          <button
            v-for="s in series"
            :key="s.id"
            type="button"
            role="tab"
            class="series__tab"
            :class="{ 'series__tab--active': activeSeries === s.id }"
            :aria-selected="activeSeries === s.id"
            @click="activeSeries = s.id"
          >
            {{ s.label }}
          </button>
        </div>

        <div
          v-for="s in series"
          v-show="activeSeries === s.id"
          :key="s.id"
          class="series__panel"
          role="tabpanel"
        >
          <div class="series__copy">
            <p class="series__kicker">{{ s.kicker }}</p>
            <h3>{{ s.title }}</h3>
            <p class="series__power">{{ s.power }}</p>
            <p class="series__desc">{{ s.desc }}</p>
            <ul class="series__points">
              <li v-for="point in s.points" :key="point">{{ point }}</li>
            </ul>
            <div class="series__actions">
              <NuxtLink :to="s.to" class="btn btn-primary">{{ s.cta }}</NuxtLink>
              <NuxtLink to="/ev-charging/quotation" class="btn btn-secondary">ขอใบเสนอราคา</NuxtLink>
            </div>
          </div>
          <div class="series__visual">
            <img
              :src="s.image"
              :alt="s.title"
              width="900"
              height="720"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- System modules -->
    <section class="modules">
      <div class="container">
        <div class="modules__head">
          <span class="section-label">System</span>
          <h2 class="section-title">องค์ประกอบสถานีชาร์จ CX</h2>
          <p class="section-lead">
            ฮาร์ดแวร์ ระบบไฟฟ้า และซอฟต์แวร์ทำงานร่วมกัน — ไม่ใช่แค่ขายเครื่อง
          </p>
        </div>

        <div class="modules__grid">
          <article v-for="(m, i) in modules" :key="m.title" class="module" :style="{ '--i': i }">
            <span class="module__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ m.title }}</h3>
            <ul>
              <li v-for="item in m.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Project reference -->
    <section class="refs">
      <div class="container refs__inner">
        <div class="refs__copy">
          <span class="section-label">Project Reference</span>
          <h2 class="section-title">ดูแลครบตั้งแต่ติดตั้งถึงบริหารสถานี</h2>
          <p>
            จำหน่าย · ออกแบบ EPC · ทดสอบ · บำรุงรักษา · แพลตฟอร์มบริหาร —
            One-stop สำหรับโครงสร้างพื้นฐาน EV ที่วัดผลได้
          </p>
          <p class="refs__note">
            รองรับ OCPP และการเชื่อมต่อระบบชำระเงิน / มอนิเตอร์ทุกแพลตฟอร์มมาตรฐาน
          </p>
          <NuxtLink to="/projects?category=ev" class="btn btn-primary">
            ดูโครงการ EV
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <div class="refs__gallery" aria-label="ตัวอย่างโครงการ EV">
          <figure
            v-for="(g, i) in gallery"
            :key="g.src"
            class="refs__shot"
            :class="`refs__shot--${i + 1}`"
          >
            <img :src="g.src" :alt="g.alt" loading="lazy" width="800" height="600" />
            <figcaption>{{ g.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="offer">
      <div class="container offer__inner">
        <div>
          <span class="section-label">EV Station</span>
          <h2 class="section-title">บริการสถานีชาร์จรถยนต์ไฟฟ้า</h2>
          <p>
            รับสร้าง รับติดตั้ง ดูราคา ลงทุน และงาน Turnkey ตามทำเลทั่วประเทศ
          </p>
        </div>
        <div class="offer__actions">
          <NuxtLink to="/ev-charging/station" class="btn btn-primary">รับติดตั้ง EV Station</NuxtLink>
          <NuxtLink to="/ev-charging/cost" class="btn btn-secondary">ราคา / ต้นทุน</NuxtLink>
        </div>
      </div>
    </section>

    <section class="section" style="background: #101010">
      <div class="container">
        <div class="sub-links">
          <NuxtLink to="/ev-charging/station" class="sub-link">รับติดตั้ง EV Station <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/cost" class="sub-link">ราคา EV Station <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/investment" class="sub-link">ลงทุน / ROI <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station/epc" class="sub-link">Turnkey EPC <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/commercial" class="sub-link">สำหรับธุรกิจ <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/120kw" class="sub-link">DC 120 kW <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/180kw" class="sub-link">DC 180 kW <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/240kw" class="sub-link">DC 240 kW <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/thailand" class="sub-link">ติดตั้งทั่วประเทศ <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/quotation" class="sub-link">ขอใบเสนอราคา <span>→</span></NuxtLink>
        </div>
      </div>
    </section>

    <!-- Packages strip -->
    <section class="offer">
      <div class="container offer__inner">
        <div>
          <span class="section-label">CX Charge Packages</span>
          <h2 class="section-title">CX Station · CX DC · CX AC</h2>
          <p>
            เปรียบเทียบกำลัง จุดชาร์จ และจุดคืนทุนอ้างอิงก่อนขอใบเสนอราคา
          </p>
        </div>
        <div class="offer__actions">
          <NuxtLink to="/ev-charging/packages" class="btn btn-primary">ดูแพ็กเกจ</NuxtLink>
          <NuxtLink to="/ev-charging/packages/payback" class="btn btn-secondary">จุดคืนทุน</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="พร้อมเริ่มโครงการ EV Charging?"
      description="ปรึกษาทีม CX ENERTECH เพื่อออกแบบระบบชาร์จ เลือกแพ็กเกจ หรือวางแผนลงทุนสถานี"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="ดู Home Charger"
      secondary-to="/ev-charging/home-charger"
    />
  </div>
</template>

<script setup lang="ts">
const series = [
  {
    id: 'dc',
    label: 'DC Fast',
    kicker: 'CX DC Series',
    title: 'DC Fast Charger',
    power: '60 – 240 kW+',
    desc: 'ชาร์จเร็วสำหรับสถานีสาธารณะ ห้าง โรงแรม และ depot — รองรับ CCS2 และการจัดสรรกำลังแบบสมาร์ท',
    points: [
      'ตู้ DC S / J และสถานีหลายหัวชาร์จ',
      'ออกแบบโหลดไฟและ footprint ตามไซต์',
      'เชื่อม OCPP / Payment / Monitoring',
    ],
    image: '/images/packages/cx-dc-120.jpg',
    to: '/ev-charging/commercial/dc-fast',
    cta: 'ดู DC Fast',
  },
  {
    id: 'ac',
    label: 'AC Charger',
    kicker: 'CX AC Series',
    title: 'AC EV Charger',
    power: '7 – 22 kW',
    desc: 'ชาร์จบ้าน ที่พักอาศัย และจุดจอดปลายทาง — ติดตั้งปลอดภัย ใช้งานง่าย พร้อมขยายในอนาคต',
    points: [
      'Wallbox / Pedestal ตามพื้นที่',
      'ออกแบบวงจรและเบรกเกอร์ตามโหลดบ้าน',
      'รองรับหลายรุ่นรถและมาตรฐาน Type 2',
    ],
    image: '/images/packages/cx-ac-g7.jpg',
    to: '/ev-charging/home-charger',
    cta: 'ดู Home / AC',
  },
  {
    id: 'station',
    label: 'Station EPC',
    kicker: 'CX Station',
    title: 'สถานีชาร์จครบวงจร',
    power: 'S4 · S10 · Hub',
    desc: 'จาก engineering ถึง commissioning — Transformer, RMU/MDB, canopy และจุดจอดในระบบเดียว',
    points: [
      'ออกแบบสถานีและระบบไฟฟ้าทั้งไซต์',
      'แพ็กเกจลงทุน SME และ Turnkey Hub',
      'ทดสอบก่อนเปิดให้บริการจริง',
    ],
    image: '/images/packages/cx-station-s4.jpg',
    to: '/ev-charging/station',
    cta: 'ดู Station EPC',
  },
  {
    id: 'platform',
    label: 'Platform',
    kicker: 'Management',
    title: 'EV Management Platform',
    power: 'OCPP · Payment · Monitor',
    desc: 'ควบคุมสถานีจากศูนย์กลาง ดูสถานะเครื่องชาร์จ รายได้ และประสิทธิภาพแบบเรียลไทม์',
    points: [
      'Charger management ผ่าน OCPP',
      'QR / RFID และการรายงาน',
      'เชื่อมต่อหลายสาขาและ ERP',
    ],
    image: '/images/projects/project-mall-ev-hub.jpg',
    to: '/ev-charging/management',
    cta: 'ดู Platform',
  },
] as const

const activeSeries = ref<(typeof series)[number]['id']>('dc')

const modules = [
  {
    title: 'Power & Charger',
    items: [
      'แปลงและจ่ายไฟ AC/DC ตามโปรไฟล์การชาร์จ',
      'ควบคุมเซสชันและความปลอดภัยของหัวจ่าย',
      'มิเตอร์และการคิดเงินตามการใช้งานจริง',
    ],
  },
  {
    title: 'Electrical EPC',
    items: [
      'ออกแบบโหลด Transformer / RMU / MDB',
      'งานติดตั้งมาตรฐานและ commissioning',
      'โครงสร้างจุดจอด canopy ป้าย และ CCTV',
    ],
  },
  {
    title: 'Digital Platform',
    items: [
      'มอนิเตอร์และแจ้งเตือนระยะไกล',
      'ชำระเงินและรายงานรายได้',
      'บริหารหลายสถานีบนแดชบอร์ดเดียว',
    ],
  },
]

const gallery = [
  {
    src: '/images/projects/project-dc-station.jpg',
    alt: 'สถานีชาร์จ DC',
    caption: 'DC Station',
  },
  {
    src: '/images/projects/project-mall-ev-hub.jpg',
    alt: 'EV Hub ในห้าง',
    caption: 'Mall EV Hub',
  },
  {
    src: '/images/projects/project-fleet-depot.jpg',
    alt: 'จุดชาร์จฟลีต',
    caption: 'Fleet Depot',
  },
]

usePageSeo({
  title: 'EV Charging | เครื่องชาร์จและสถานีชาร์จรถไฟฟ้า',
  description:
    'รวมบริการ EV Charging ของ CX ENERTECH: รับติดตั้ง EV Station แพ็กเกจราคา DC Fast และจุดคืนทุน แยกหน้าตามเจตนาค้น',
  path: '/ev-charging',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'EV Charging', path: '/ev-charging' },
  ],
})
</script>

<style scoped>
.ev {
  background: var(--color-black);
  color: var(--color-white);
}

/* —— Hero —— */
.hero {
  position: relative;
  min-height: min(92vh, 900px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  isolation: isolate;
}

.hero__media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 40%;
  transform: scale(1.04);
  animation: hero-zoom 18s var(--ease) both;
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(11, 11, 11, 0.92) 0%, rgba(11, 11, 11, 0.55) 48%, rgba(11, 11, 11, 0.25) 100%),
    linear-gradient(180deg, rgba(11, 11, 11, 0.35) 0%, rgba(11, 11, 11, 0.88) 100%);
}

.hero__grain {
  position: absolute;
  inset: 0;
  opacity: 0.18;
  background-image: radial-gradient(rgba(212, 255, 0, 0.12) 0.6px, transparent 0.6px);
  background-size: 3px 3px;
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 1;
  padding-block: clamp(5rem, 12vh, 8rem) clamp(3.5rem, 8vh, 5.5rem);
  max-width: 42rem;
}

.hero__brand {
  font-family: var(--font-display);
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 1rem;
}

.hero__title {
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1.05;
  margin-bottom: 1.1rem;
  color: var(--color-white);
}

.hero__title em {
  font-style: normal;
  color: var(--color-gold);
}

.hero__lead {
  font-size: clamp(1rem, 1.6vw, 1.15rem);
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
  margin-bottom: 1.75rem;
  max-width: 34rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@keyframes hero-zoom {
  from {
    transform: scale(1.12);
  }
  to {
    transform: scale(1.04);
  }
}

/* —— Series —— */
.series {
  padding: var(--space-section) 0;
  background:
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(212, 255, 0, 0.05), transparent 55%),
    #0d0d0d;
}

.series__head {
  margin-bottom: 1.75rem;
}

.series__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.75rem;
}

.series__tab {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 0.65rem 1rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -0.75rem;
  transition: color 0.25s, border-color 0.25s;
}

.series__tab:hover {
  color: var(--color-white);
}

.series__tab--active {
  color: var(--color-lime);
  border-bottom-color: var(--color-lime);
}

.series__panel {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  animation: panel-in 0.45s var(--ease) both;
}

.series__kicker {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.65rem;
}

.series__copy h3 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  margin-bottom: 0.45rem;
}

.series__power {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-lime);
  margin-bottom: 1rem;
}

.series__desc {
  color: var(--color-silver);
  line-height: 1.65;
  margin-bottom: 1.25rem;
  max-width: 34rem;
}

.series__points {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.75rem;
}

.series__points li {
  position: relative;
  padding-left: 1.15rem;
  color: var(--color-muted);
  line-height: 1.5;
}

.series__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 7px;
  height: 7px;
  background: var(--color-lime);
}

.series__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.series__visual {
  position: relative;
  min-height: 320px;
  background:
    linear-gradient(145deg, rgba(212, 255, 0, 0.06), transparent 40%),
    #111;
  overflow: hidden;
}

.series__visual img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: contain;
  object-position: center;
  padding: 1.5rem;
  transition: transform 0.6s var(--ease);
}

.series__panel:hover .series__visual img {
  transform: scale(1.03);
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* —— Modules —— */
.modules {
  padding: var(--space-section) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.modules__head {
  margin-bottom: 2.5rem;
  max-width: 40rem;
}

.modules__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.module {
  padding: 1.75rem 1.5rem 1.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: panel-in 0.6s var(--ease) both;
  animation-delay: calc(var(--i) * 80ms);
}

.module:not(:last-child) {
  padding-right: 1.75rem;
  margin-right: 1.75rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.module__index {
  display: block;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-gold);
  margin-bottom: 0.85rem;
}

.module h3 {
  font-size: 1.35rem;
  margin-bottom: 1rem;
}

.module ul {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.module li {
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.55;
  padding-left: 0.85rem;
  border-left: 2px solid rgba(212, 255, 0, 0.35);
}

/* —— References —— */
.refs {
  padding: var(--space-section) 0;
  background: #0a0a0a;
}

.refs__inner {
  display: grid;
  grid-template-columns: 0.95fr 1.15fr;
  gap: clamp(1.75rem, 4vw, 3rem);
  align-items: center;
}

.refs__copy p {
  color: var(--color-silver);
  line-height: 1.65;
  margin: 1rem 0 0;
  max-width: 34rem;
}

.refs__note {
  color: var(--color-muted) !important;
  margin-bottom: 1.75rem !important;
}

.refs__gallery {
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.75rem;
  min-height: 420px;
}

.refs__shot {
  position: relative;
  overflow: hidden;
  margin: 0;
  background: #111;
}

.refs__shot--1 {
  grid-row: 1 / span 2;
}

.refs__shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.7s var(--ease);
}

.refs__shot:hover img {
  transform: scale(1.04);
}

.refs__shot figcaption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.85rem 1rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-white);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
}

/* —— Offer —— */
.offer {
  padding: 3.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(90deg, rgba(212, 175, 55, 0.08), transparent 40%),
    var(--color-panel);
}

.offer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.5rem 2rem;
  align-items: flex-end;
}

.offer__inner p {
  color: var(--color-muted);
  margin-top: 0.65rem;
  max-width: 36rem;
}

.offer__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 960px) {
  .series__panel,
  .refs__inner,
  .modules__grid {
    grid-template-columns: 1fr;
  }

  .module:not(:last-child) {
    margin-right: 0;
    padding-right: 0;
    border-right: 0;
  }

  .refs__gallery {
    min-height: 360px;
  }
}

@media (max-width: 640px) {
  .hero {
    min-height: 78vh;
  }

  .hero__inner {
    max-width: none;
  }

  .series__visual img {
    min-height: 260px;
    padding: 1rem;
  }

  .refs__gallery {
    grid-template-columns: 1fr;
    grid-template-rows: none;
  }

  .refs__shot--1 {
    grid-row: auto;
    min-height: 220px;
  }

  .refs__shot {
    min-height: 180px;
  }
}
</style>
