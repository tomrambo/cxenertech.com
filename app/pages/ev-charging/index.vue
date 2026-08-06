<template>
  <div class="ev">
    <PageHero
      title="EV Charging"
      description="จาก Home Charger ถึงสถานีชาร์จและแพลตฟอร์มบริหาร — โครงสร้างพื้นฐาน EV แบบครบวงจรโดย CX ENERTECH"
      :crumbs="[{ label: 'Home', to: '/' }, { label: 'EV Charging' }]"
    />

    <!-- Intro -->
    <section class="section">
      <div class="container intro">
        <div class="intro__copy">
          <span class="section-label">Overview</span>
          <h2 class="section-title">โซลูชันชาร์จรถไฟฟ้า ที่ออกแบบให้ใช้งานจริง</h2>
          <p class="section-lead">
            CX ENERTECH ให้บริการตั้งแต่เลือกเครื่องชาร์จ ออกแบบสถานี งาน EPC ไฟฟ้า
            จนถึงระบบบริหารจัดการและการลงทุนสถานีชาร์จ
            เพื่อให้ทุกโครงการชาร์จได้เสถียร ปลอดภัย และวัดผลได้
          </p>
          <ul class="intro__points">
            <li>ออกแบบตามโหลดไฟฟ้าและพฤติกรรมการใช้งานจริง</li>
            <li>ส่งมอบงาน EPC พร้อม commissioning ตามมาตรฐาน</li>
            <li>เชื่อมต่อ OCPP / Payment / Monitoring ในระบบเดียว</li>
            <li>มีแพ็กเกจสถานีและโมเดลลงทุนสำหรับธุรกิจ</li>
          </ul>
        </div>
        <aside class="intro__stats" aria-label="EV service highlights">
          <div v-for="s in stats" :key="s.label" class="stat">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </aside>
      </div>
    </section>

    <!-- Ecosystem infographic -->
    <section class="section eco">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Service Map</span>
          <h2 class="section-title">แผนที่บริการ EV Charging</h2>
          <p class="section-lead">
            เลือกจุดเริ่มตามประเภทไซต์ แล้วขยายสู่สถานี แพลตฟอร์ม และโมเดลลงทุนได้ต่อเนื่อง
          </p>
        </div>

        <div class="eco__map" role="list">
          <NuxtLink
            v-for="(node, i) in ecosystem"
            :key="node.to"
            :to="node.to"
            class="eco__node"
            :style="{ '--i': i }"
            role="listitem"
          >
            <span class="eco__index">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ node.title }}</h3>
            <p>{{ node.desc }}</p>
            <span class="eco__cta">ดูบริการ →</span>
          </NuxtLink>
        </div>

        <div class="eco__flow" aria-hidden="true">
          <div class="eco__flow-track">
            <span>สำรวจไซต์</span>
            <span>ออกแบบระบบ</span>
            <span>ติดตั้ง EPC</span>
            <span>Commission</span>
            <span>บริหาร &amp; ลงทุน</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Service pillars with richer copy -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Services</span>
          <h2 class="section-title">บริการหลักที่เราดูแลให้ครบ</h2>
          <p class="section-lead">
            แต่ละบริการออกแบบให้เชื่อมต่อกันได้ — จากเครื่องเดียวในบ้านจนถึงสถานีสาธารณะหลายหัวชาร์จ
          </p>
        </div>

        <div class="pillars">
          <article v-for="p in pillars" :key="p.title" class="pillar">
            <div class="pillar__head">
              <span class="pillar__tag">{{ p.tag }}</span>
              <h3>{{ p.title }}</h3>
            </div>
            <p class="pillar__lead">{{ p.lead }}</p>
            <ul class="pillar__list">
              <li v-for="item in p.items" :key="item">{{ item }}</li>
            </ul>
            <NuxtLink :to="p.to" class="pillar__link">{{ p.linkLabel }} →</NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Delivery process -->
    <section class="section process">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Delivery</span>
          <h2 class="section-title">ขั้นตอนส่งมอบงาน EV</h2>
          <p class="section-lead">
            กระบวนการมาตรฐานที่ทีมวิศวกรและทีมสถานีใช้จริง เพื่อลดความเสี่ยงด้านไฟฟ้าและความล่าช้า
          </p>
        </div>

        <ol class="steps">
          <li v-for="(step, i) in steps" :key="step.title" class="step">
            <span class="step__num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Audiences -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Who It's For</span>
          <h2 class="section-title">เหมาะกับใคร</h2>
        </div>
        <div class="audience">
          <div v-for="a in audiences" :key="a.title" class="audience__item">
            <h3>{{ a.title }}</h3>
            <p>{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Packages + Investment strip -->
    <section class="section offer">
      <div class="container offer__grid">
        <div class="offer__block">
          <span class="section-label">Packages</span>
          <h2>EV Station Packages</h2>
          <p>
            แพ็กเกจสถานีและเครื่อง DC สำเร็จรูป เปรียบเทียบกำลัง จุดชาร์จ และ CAPEX อ้างอิง
            ก่อนขอใบเสนอราคาตามไซต์จริง
          </p>
          <NuxtLink to="/ev-charging/packages" class="btn btn-primary">ดูแพ็กเกจสถานี</NuxtLink>
        </div>
        <div class="offer__block offer__block--alt">
          <span class="section-label">Investment</span>
          <h2>โอกาสลงทุนสถานีชาร์จ</h2>
          <p>
            ปรึกษาโมเดลรายได้ จุดคุ้มทุน และการแบ่งผลตอบแทน สำหรับนักลงทุนและเจ้าของพื้นที่
          </p>
          <NuxtLink to="/ev-charging/investment" class="btn btn-secondary">ดูโมเดลลงทุน</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Explore links -->
    <section class="section explore">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Explore</span>
          <h2 class="section-title">เข้าสู่บริการย่อย</h2>
        </div>
        <div class="sub-links">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="sub-link">
            {{ l.label }} <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="พร้อมเริ่มโครงการ EV Charging?"
      description="ปรึกษาทีม CX ENERTECH เพื่อออกแบบระบบชาร์จ เลือกแพ็กเกจ หรือวางแผนลงทุนสถานี"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="ดูโครงการ EV"
      secondary-to="/projects?category=ev"
    />
  </div>
</template>

<script setup lang="ts">
const stats = [
  { value: 'AC / DC', label: 'รองรับทุกประเภทเครื่องชาร์จ' },
  { value: 'EPC', label: 'ออกแบบ ติดตั้ง Commission ครบ' },
  { value: 'OCPP', label: 'เชื่อมต่อแพลตฟอร์มมาตรฐาน' },
  { value: 'ROI', label: 'วิเคราะห์ลงทุนและจุดคุ้มทุน' },
]

const ecosystem = [
  {
    title: 'Home',
    desc: 'ชาร์จบ้านและคอนโด ด้วย AC Charger ที่ติดตั้งปลอดภัย',
    to: '/ev-charging/home-charger',
  },
  {
    title: 'Commercial',
    desc: 'จุดชาร์จอาคาร โรงแรม ห้าง และโรงงาน ทั้ง AC และ DC Fast',
    to: '/ev-charging/commercial',
  },
  {
    title: 'Station EPC',
    desc: 'ออกแบบสถานี ระบบไฟฟ้า Transformer RMU/MDB จนเปิดใช้งาน',
    to: '/ev-charging/station',
  },
  {
    title: 'Platform',
    desc: 'บริหารเครื่องชาร์จ การชำระเงิน รายงาน และมอนิเตอร์ระยะไกล',
    to: '/ev-charging/management',
  },
  {
    title: 'Packages',
    desc: 'เลือกแพ็กเกจสถานีสำเร็จรูป แล้วปรับตามพื้นที่จริง',
    to: '/ev-charging/packages',
  },
  {
    title: 'Investment',
    desc: 'วางแผนลงทุนสถานีชาร์จ พร้อมสมมติฐานรายได้และ payback',
    to: '/ev-charging/investment',
  },
]

const pillars = [
  {
    tag: '01 · Residential',
    title: 'Home Charger',
    lead: 'ติดตั้งเครื่องชาร์จบ้านและที่พักอาศัยให้ใช้งานง่าย ปลอดภัย และพร้อมขยายในอนาคต',
    items: [
      'เลือก AC Charger ตามรุ่นรถและกำลังไฟบ้าน',
      'ออกแบบวงจร เบรกเกอร์ และจุดติดตั้ง',
      'ติดตั้งมาตรฐาน พร้อมทดสอบระบบ',
      'บริการบำรุงรักษาและซัพพอร์ตหลังติดตั้ง',
    ],
    to: '/ev-charging/home-charger',
    linkLabel: 'ดู Home Charger',
  },
  {
    tag: '02 · Business',
    title: 'Commercial Charger',
    lead: 'เพิ่มจุดบริการชาร์จในอาคารธุรกิจ เพื่อรองรับลูกค้า พนักงาน และยานพาหนะองค์กร',
    items: [
      'AC Wallbox และ DC Fast ตามทราฟฟิก',
      'วางผังจุดจอดและการจ่ายไฟ',
      'รองรับหลายยี่ห้อ EV และมาตรฐาน CCS2',
      'เชื่อมต่อระบบชำระเงินและรายงานการใช้งาน',
    ],
    to: '/ev-charging/commercial',
    linkLabel: 'ดู Commercial Charger',
  },
  {
    tag: '03 · Infrastructure',
    title: 'EV Charging Station',
    lead: 'สร้างสถานีชาร์จแบบครบวงจร ตั้งแต่ engineering ถึง commissioning',
    items: [
      'ออกแบบสถานีและโหลดไฟฟ้าทั้งระบบ',
      'Transformer / RMU / MDB และงานไฟฟ้า',
      'โครงสร้าง canopy จุดจอด ป้าย และ CCTV',
      'ทดสอบระบบก่อนเปิดให้บริการจริง',
    ],
    to: '/ev-charging/station',
    linkLabel: 'ดู Station EPC',
  },
  {
    tag: '04 · Software',
    title: 'Management Platform',
    lead: 'ควบคุมสถานีจากศูนย์กลาง ดูสถานะเครื่องชาร์จ รายได้ และประสิทธิภาพแบบเรียลไทม์',
    items: [
      'Charger management ผ่าน OCPP',
      'Payment / QR / RFID ตามโมเดลธุรกิจ',
      'Monitoring, alerting และรายงาน',
      'เชื่อมต่อ ERP และการบริหารหลายสาขา',
    ],
    to: '/ev-charging/management',
    linkLabel: 'ดู Management Platform',
  },
]

const steps = [
  {
    title: 'สำรวจและวิเคราะห์ไซต์',
    desc: 'ตรวจกำลังไฟ จุดจอด พฤติกรรมการใช้งาน และข้อจำกัดของพื้นที่ เพื่อกำหนดขนาดระบบที่เหมาะสม',
  },
  {
    title: 'ออกแบบวิศวกรรมและ BOQ',
    desc: 'จัดทำผังสถานี รายการอุปกรณ์ งานไฟฟ้า และประมาณการ เพื่อให้เห็นขอบเขตงานก่อนเริ่มก่อสร้าง',
  },
  {
    title: 'จัดหา ติดตั้ง และทดสอบ',
    desc: 'ติดตั้งเครื่องชาร์จ ระบบไฟฟ้า และงานโยธา พร้อมทดสอบความปลอดภัยและประสิทธิภาพ',
  },
  {
    title: 'Commissioning และส่งมอบ',
    desc: 'เปิดใช้งานจริง เชื่อมต่อแพลตฟอร์ม อบรมผู้ดูแล และส่งมอบคู่มือการใช้งาน',
  },
  {
    title: 'ดูแลต่อเนื่อง / ขยายสถานี',
    desc: 'มอนิเตอร์การใช้งาน วางแผนบำรุงรักษา และขยายหัวชาร์จหรือโมเดลลงทุนเมื่อทราฟฟิกเพิ่มขึ้น',
  },
]

const audiences = [
  {
    title: 'บ้านและที่พักอาศัย',
    desc: 'เจ้าของบ้าน คอนโด และหมู่บ้านจัดสรร ที่ต้องการชาร์จสะดวกทุกคืน',
  },
  {
    title: 'อาคารและธุรกิจ',
    desc: 'โรงแรม ห้าง สำนักงาน โรงงาน ที่อยากเพิ่มบริการและประสบการณ์ลูกค้า',
  },
  {
    title: 'ผู้พัฒนาสถานีชาร์จ',
    desc: 'เจ้าของพื้นที่และผู้ประกอบการที่ต้องการสร้างสถานีพร้อมระบบบริหาร',
  },
  {
    title: 'นักลงทุน EV Infrastructure',
    desc: 'ผู้ที่มองหาแพ็กเกจลงทุนสถานีชาร์จ พร้อมประมาณการรายได้และจุดคุ้มทุน',
  },
]

const links = [
  { label: 'Home Charger', to: '/ev-charging/home-charger' },
  { label: 'Commercial EV Charger', to: '/ev-charging/commercial' },
  { label: 'EV Charging Station', to: '/ev-charging/station' },
  { label: 'Management Platform', to: '/ev-charging/management' },
  { label: 'EV Charger Products', to: '/ev-charging/products' },
  { label: 'EV Station Packages', to: '/ev-charging/packages' },
  { label: 'EV Station Investment', to: '/ev-charging/investment' },
  { label: 'ขอใบเสนอราคา EV', to: '/ev-charging/quotation' },
]

useSeoMeta({
  title: 'EV Charging | CX ENERTECH',
  description:
    'โซลูชัน EV Charging ครบวงจร — Home Charger, Commercial, Station EPC, Management Platform, Packages และ Investment',
})
</script>

<style scoped>
.ev {
  background: var(--color-black);
  color: var(--color-white);
}

.intro {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 3rem;
  align-items: start;
}

.intro__points {
  margin-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.intro__points li {
  position: relative;
  padding-left: 1.25rem;
  color: var(--color-muted);
  line-height: 1.55;
}

.intro__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 8px;
  height: 8px;
  background: var(--color-lime);
}

.intro__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.stat {
  background: #111;
  padding: 1.35rem 1.2rem;
  min-height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.35rem;
}

.stat strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-lime);
  letter-spacing: 0.04em;
}

.stat span {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.4;
}

/* Ecosystem map */
.eco {
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212, 255, 0, 0.06), transparent 60%),
    #0d0d0d;
  overflow: hidden;
}

.eco__map {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.eco__node {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.5rem 1.35rem 1.35rem;
  background: rgba(21, 21, 21, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-top: 2px solid transparent;
  min-height: 210px;
  transition: border-color 0.3s, transform 0.4s var(--ease), background 0.3s;
  animation: rise 0.7s var(--ease) both;
  animation-delay: calc(var(--i) * 70ms);
}

.eco__node:hover {
  border-color: rgba(212, 255, 0, 0.35);
  border-top-color: var(--color-lime);
  transform: translateY(-4px);
  background: #151515;
}

.eco__index {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-gold);
}

.eco__node h3 {
  font-size: 1.25rem;
  color: var(--color-white);
}

.eco__node p {
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.55;
  flex: 1;
}

.eco__cta {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--color-lime);
}

.eco__flow {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.eco__flow-track {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem 0;
  align-items: center;
  justify-content: space-between;
}

.eco__flow-track span {
  position: relative;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  padding-right: 2rem;
}

.eco__flow-track span:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0.5rem;
  top: 50%;
  width: 1.1rem;
  height: 1px;
  background: var(--color-lime);
  opacity: 0.55;
}

/* Pillars */
.pillars {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
}

.pillar {
  padding: 1.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pillar__tag {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 0.65rem;
}

.pillar__head h3 {
  font-size: 1.45rem;
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.pillar__lead {
  color: var(--color-silver);
  line-height: 1.65;
  margin-bottom: 1.1rem;
  max-width: 36rem;
}

.pillar__list {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1.25rem;
}

.pillar__list li {
  position: relative;
  padding-left: 1.1rem;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.pillar__list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  background: var(--color-gold);
}

.pillar__link {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-lime);
}

.pillar__link:hover {
  color: var(--color-lime-soft);
}

/* Process */
.process {
  background: #101010;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 0;
  counter-reset: none;
}

.step {
  display: grid;
  grid-template-columns: 4.5rem 1fr;
  gap: 1.25rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.step:last-child {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.step__num {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: 0.06em;
  padding-top: 0.15rem;
}

.step h3 {
  font-size: 1.15rem;
  color: var(--color-white);
  margin-bottom: 0.4rem;
}

.step p {
  color: var(--color-muted);
  max-width: 44rem;
  line-height: 1.65;
}

/* Audience */
.audience {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.audience__item {
  padding-top: 1.25rem;
  border-top: 2px solid var(--color-lime);
}

.audience__item h3 {
  font-size: 1.05rem;
  margin-bottom: 0.55rem;
}

.audience__item p {
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

/* Offer strip */
.offer {
  background:
    linear-gradient(120deg, rgba(14, 26, 43, 0.9), rgba(11, 11, 11, 0.95)),
    #0e1a2b;
}

.offer__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.offer__block h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin: 0.35rem 0 0.85rem;
}

.offer__block p {
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 1.5rem;
  max-width: 28rem;
}

.offer__block--alt {
  padding-left: 2rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.explore {
  background: #0b0b0b;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 960px) {
  .intro,
  .eco__map,
  .pillars,
  .audience,
  .offer__grid {
    grid-template-columns: 1fr;
  }

  .offer__block--alt {
    padding-left: 0;
    border-left: none;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .eco__map {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .eco__map,
  .intro__stats {
    grid-template-columns: 1fr;
  }

  .step {
    grid-template-columns: 3rem 1fr;
  }

  .eco__flow-track {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .eco__flow-track span {
    padding-right: 0;
  }

  .eco__flow-track span:not(:last-child)::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eco__node {
    animation: none;
  }
}
</style>
