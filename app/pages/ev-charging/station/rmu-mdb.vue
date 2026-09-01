<template>
  <div>
    <PageHero
      title="RMU / MDB สำหรับ EV Station"
      description="ตู้ MDB และ RMU สำหรับสถานีชาร์จรถยนต์ไฟฟ้า รองรับโหลด DC Fast หลายหัว"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'EV Station', to: '/ev-charging/station' },
        { label: 'RMU / MDB' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            ตู้ MDB สำหรับ EV Station กระจายโหลดจากหม้อแปลงหรือมิเตอร์ไปยังแต่ละเครื่องชาร์จ
            ส่วน RMU ใช้เมื่อต้องต่อระบบไฟฟ้าแรงสูงหรือขยายเขตให้สถานีขนาดใหญ่
          </p>
          <p>
            ออกแบบคู่กับ
            <NuxtLink to="/ev-charging/station/electrical">ระบบไฟฟ้า EV Station</NuxtLink>
            และ
            <NuxtLink to="/ev-charging/station/transformer">หม้อแปลง</NuxtLink>
          </p>
        </div>
      </div>
    </section>
    <CtaBand
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/contact/quotation?type=ev"
      secondary-label="ระบบไฟฟ้าสถานี"
      secondary-to="/ev-charging/station/electrical"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ตู้ MDB สำหรับ EV Station | RMU สถานีชาร์จ',
  description:
    'ตู้ MDB และ RMU สำหรับ EV Station รองรับโหลดเครื่องชาร์จ DC และงานขยายเขตไฟฟ้า โดย CX ENERTECH',
  path: '/ev-charging/station/rmu-mdb',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'EV Station', path: '/ev-charging/station' },
    { name: 'RMU / MDB', path: '/ev-charging/station/rmu-mdb' },
  ],
})
</script>
