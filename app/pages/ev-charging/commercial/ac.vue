<template>
  <div>
    <PageHero
      title="ติดตั้ง EV Charger AC สำหรับธุรกิจ"
      description="เครื่องชาร์จ AC สำหรับที่จอดออฟฟิศ ห้าง โรงแรม และอาคารพาณิชย์"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'สำหรับธุรกิจ', to: '/ev-charging/commercial' },
        { label: 'AC Charger' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            AC Charger เหมาะกับที่จอดนาน เช่น ออฟฟิศ ห้าง โรงแรม คอนโด
            ติดตั้งคู่กับ
            <NuxtLink to="/ev-charging/commercial/dc-fast">DC Fast</NuxtLink>
            ได้เมื่อมีทั้งลูกค้าจอดสั้นและจอดค้าง
          </p>
          <p>
            ดูแพ็กเกจ AC ได้ที่
            <NuxtLink to="/ev-charging/packages">แพ็กเกจ EV Station</NuxtLink>
          </p>
        </div>
      </div>
    </section>
    <CtaBand
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/contact/quotation?type=ev"
      secondary-label="EV สำหรับธุรกิจ"
      secondary-to="/ev-charging/commercial"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ติดตั้ง EV Charger AC | ชาร์จสำหรับธุรกิจ',
  description:
    'ติดตั้ง EV Charger AC สำหรับบริษัท ห้าง โรงแรม และอาคารพาณิชย์ โดย CX ENERTECH',
  path: '/ev-charging/commercial/ac',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'EV สำหรับธุรกิจ', path: '/ev-charging/commercial' },
    { name: 'AC Charger', path: '/ev-charging/commercial/ac' },
  ],
})
</script>
