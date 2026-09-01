<template>
  <div>
    <PageHero
      title="Solar + EV Integration — ชาร์จรถด้วยโซลาร์"
      description="ผสานโซล่าเซลล์กับสถานีชาร์จรถยนต์ไฟฟ้า เพื่อลดค่าไฟและใช้พลังงานสะอาด"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'Smart Energy', to: '/smart-energy' },
        { label: 'Solar + EV' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            พลังงานแสงอาทิตย์สำหรับสถานีชาร์จช่วยลดหน่วยที่ซื้อจากกริดช่วงกลางวัน
            รายละเอียดงานสถานีอยู่ที่
            <NuxtLink to="/ev-charging/solar">โซลาร์สำหรับ EV Station</NuxtLink>
            และงานหลังคาที่
            <NuxtLink to="/solar/rooftop">รับติดตั้งโซล่าเซลล์</NuxtLink>
          </p>
        </div>
      </div>
    </section>
    <CtaBand
      primary-label="ขอใบเสนอราคา"
      primary-to="/contact/quotation"
      secondary-label="โซลาร์สำหรับสถานีชาร์จ"
      secondary-to="/ev-charging/solar"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Solar + EV Integration | โซลาร์สำหรับสถานีชาร์จ',
  description:
    'ผสานโซล่าเซลล์กับ EV Station ชาร์จรถยนต์ไฟฟ้าด้วยพลังงานแสงอาทิตย์ โดย CX ENERTECH',
  path: '/smart-energy/solar-ev-integration',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'Smart Energy', path: '/smart-energy' },
    { name: 'Solar + EV', path: '/smart-energy/solar-ev-integration' },
  ],
})
</script>
