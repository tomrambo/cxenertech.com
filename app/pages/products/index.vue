<template>
  <div>
    <PageHero
      title="ผลิตภัณฑ์โซล่าเซลล์และเครื่องชาร์จ EV"
      description="เลือกจากแพ็กเกจติดตั้ง ไม่แยกหน้าสินค้าบาง ๆ ที่แย่งคีย์เวิร์ดกับแคตตาล็อก"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'ผลิตภัณฑ์' }]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            สินค้าที่ลูกค้าค้นหาบน Google ของ CX ENERTECH คือแพ็กเกจพร้อมติดตั้ง ไม่ใช่แผงหรือเครื่องชาร์จเปล่า
            แผง อินเวอร์เตอร์ และ DC Fast Charger รวมอยู่ในหน้าแพ็กเกจที่มีราคาและจุดคืนทุนแล้ว
          </p>
        </div>
        <div class="sub-links" style="margin-top: 2rem">
          <NuxtLink to="/solar/rooftop/packages" class="sub-link">แพ็กเกจโซล่าเซลล์ แผงและอินเวอร์เตอร์ <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/packages" class="sub-link">แพ็กเกจ EV Station และเครื่องชาร์จ <span>→</span></NuxtLink>
          <NuxtLink to="/solar/rooftop" class="sub-link">รับติดตั้งโซล่าเซลล์ <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station" class="sub-link">รับติดตั้ง EV Station <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ผลิตภัณฑ์โซล่าเซลล์และ EV Charger',
  description:
    'ดูแผงโซลาร์ อินเวอร์เตอร์ และเครื่องชาร์จ EV ผ่านแพ็กเกจติดตั้งของ CX ENERTECH ไม่แยกหน้าสินค้าเปล่า',
  path: '/products',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ผลิตภัณฑ์', path: '/products' },
  ],
})
</script>
