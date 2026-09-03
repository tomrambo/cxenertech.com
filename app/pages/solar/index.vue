<template>
  <div>
    <PageHero
      title="โซลาร์ครบวงจร — Rooftop EPC PPA และระบบกักเก็บพลังงาน"
      description="เลือกงานติดตั้งโซล่าเซลล์ ดูแพ็กเกจราคา จุดคืนทุน หรือโมเดล PPA ไม่ต้องลงทุนเอง"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'โซลาร์' }]"
    />

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Overview</span>
          <h2 class="section-title">พลังงานแสงอาทิตย์ครบวงจร</h2>
          <p class="section-lead">
            CX ENERTECH ให้บริการออกแบบ จัดหา ติดตั้ง และดูแลระบบโซลาร์สำหรับทุกขนาดโครงการ
            พร้อมระบบ BOS และ Energy Monitoring
          </p>
        </div>
        <div class="feature-grid">
          <div v-for="f in features" :key="f.title" class="feature-item">
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: #101010">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Services</span>
          <h2 class="section-title">บริการโซลาร์แยกตามเจตนาค้น</h2>
        </div>
        <div class="sub-links">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="sub-link">
            {{ l.label }} <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="ขอใบเสนอราคา Solar"
      description="ปรึกษาทีมวิศวกรเพื่อออกแบบระบบโซลาร์ที่เหมาะสมกับไซต์ของคุณ"
      primary-label="ขอใบเสนอราคา Solar"
      primary-to="/solar/quotation"
      secondary-label="ดูโครงการ Solar"
      secondary-to="/projects?category=solar"
    />
  </div>
</template>

<script setup lang="ts">
const features = [
          { title: 'แพ็กเกจโซลาร์', desc: 'On-grid / Hybrid / Off-grid พร้อมราคาเริ่มต้นจากฐานข้อมูล' },
          { title: 'Solar Rooftop', desc: 'รับติดตั้งโซล่าเซลล์บ้าน อาคาร โรงงาน และคลังสินค้า' },
          { title: 'จุดคืนทุนและ PPA', desc: 'ดูว่าติดโซล่าเซลล์คุ้มไหม หรือเลือกโมเดลไม่ต้องลงทุนเอง' },
          { title: 'Solar EPC', desc: 'ออกแบบ จัดซื้อ ติดตั้ง ทดสอบ และ O&M จบในที่เดียว' },
]

const links = [
  { label: 'รับติดตั้งโซล่าเซลล์', to: '/solar/rooftop' },
  { label: 'แพ็กเกจและราคา', to: '/solar/rooftop/packages' },
  { label: 'โซล่าเซลล์บ้าน', to: '/solar/rooftop/residential' },
  { label: 'โซล่าเซลล์โรงงาน', to: '/solar/rooftop/factory' },
  { label: 'โซล่าเซลล์ 5 / 10 / 15 kW', to: '/solar/5kw' },
  { label: 'จุดคืนทุน / คุ้มไหม', to: '/solar/payback' },
  { label: 'Hybrid + แบตเตอรี่', to: '/solar/hybrid' },
  { label: 'Solar BESS', to: '/solar/bess' },
  { label: 'PPA ไม่ต้องลงทุน', to: '/solar/ppa' },
  { label: 'Solar EPC', to: '/solar/epc' },
  { label: 'Solar Farm', to: '/solar/farm' },
  { label: 'ขอใบเสนอราคาโซล่าเซลล์', to: '/solar/quotation' },
]

usePageSeo({
  title: 'โซลาร์ครบวงจร | Solar Rooftop EPC PPA',
  description:
    'บริการโซลาร์ของ CX ENERTECH แยกหน้าชัดเจน: รับติดตั้งโซล่าเซลล์ แพ็กเกจราคา โรงงาน จุดคืนทุน PPA และ EPC',
  path: '/solar',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'โซลาร์', path: '/solar' },
  ],
})
</script>
