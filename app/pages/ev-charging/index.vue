<template>
  <div>
    <PageHero
      title="EV Charging"
      description="Charger • Station • EPC • Management — โครงสร้างพื้นฐานชาร์จรถยนต์ไฟฟ้าแบบครบวงจร"
      :crumbs="[{ label: 'Home', to: '/' }, { label: 'EV Charging' }]"
    />

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Overview</span>
          <h2 class="section-title">จาก Home Charger ถึง EV Station</h2>
          <p class="section-lead">
            CX ENERTECH ให้บริการเครื่องชาร์จ สถานีชาร์จ ระบบ EPC และแพลตฟอร์มบริหารจัดการ
            สำหรับบ้าน ธุรกิจ และนักลงทุนสถานีชาร์จ
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
          <h2 class="section-title">บริการ EV Charging</h2>
        </div>
        <div class="sub-links">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="sub-link">
            {{ l.label }} <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="ขอใบเสนอราคา EV"
      description="ปรึกษาทีมผู้เชี่ยวชาญเพื่อออกแบบระบบชาร์จที่เหมาะกับธุรกิจของคุณ"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="ดูโครงการ EV"
      secondary-to="/projects?category=ev"
    />
  </div>
</template>

<script setup lang="ts">
const features = [
  { title: 'Home Charger', desc: 'AC Charger พร้อมติดตั้งและบำรุงรักษาสำหรับบ้าน' },
  { title: 'Commercial Charger', desc: 'AC และ DC Fast สำหรับอาคารและธุรกิจ' },
  { title: 'EV Charging Station', desc: 'Design, EPC, Electrical, Transformer, RMU/MDB' },
  { title: 'Management Platform', desc: 'Charger, Payment, Monitoring, Reporting, ERP' },
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
  description: 'Charger • Station • EPC • Management — โครงสร้างพื้นฐาน EV ครบวงจร',
})
</script>
