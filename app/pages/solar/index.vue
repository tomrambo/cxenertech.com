<template>
  <div>
    <PageHero
      title="Solar Energy"
      description="Design • EPC • Installation • O&M — โซลูชันโซลาร์ครบวงจร ตั้งแต่ Rooftop ถึง Solar Farm"
      :crumbs="[{ label: 'Home', to: '/' }, { label: 'Solar Energy' }]"
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
          <h2 class="section-title">บริการ Solar ของเรา</h2>
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
  { title: 'Solar Rooftop', desc: 'บ้าน อาคารพาณิชย์ โรงงาน และคลังสินค้า' },
  { title: 'Solar Farm', desc: 'Ground Mount, Utility Scale และ Floating Solar' },
  { title: 'Solar EPC', desc: 'Engineering, Procurement, Construction, Commissioning, O&M' },
  { title: 'BOS & Monitoring', desc: 'ระบบไฟฟ้า Balance of System และติดตามผลผลิต' },
]

const links = [
  { label: 'Solar Rooftop', to: '/solar/rooftop' },
  { label: 'Solar Farm', to: '/solar/farm' },
  { label: 'Solar EPC', to: '/solar/epc' },
  { label: 'BOS / Electrical System', to: '/solar/bos' },
  { label: 'Energy Monitoring', to: '/solar/energy-monitoring' },
  { label: 'Solar Products', to: '/solar/products' },
  { label: 'ขอใบเสนอราคา Solar', to: '/solar/quotation' },
]

useSeoMeta({
  title: 'Solar Energy | CX ENERTECH',
  description: 'Design • EPC • Installation • O&M — โซลูชันโซลาร์ครบวงจร',
})
</script>
