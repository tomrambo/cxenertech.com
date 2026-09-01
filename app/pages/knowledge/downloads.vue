<template>
  <div>
    <PageHero
      title="ดาวน์โหลดเอกสาร Solar และ EV"
      description="โบรชัวร์ โปรไฟล์บริษัท และหน้าสรุปแพ็กเกจที่ใช้ประกอบการตัดสินใจ"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'ดาวน์โหลด' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            เอกสารบริษัทและหน้าสรุปผลิตภัณฑ์อยู่ด้านล่าง หากต้องการสเปกตามไซต์
            ใช้ใบเสนอราคาจะตรงกว่าไฟล์ทั่วไป
          </p>
          <h2>เอกสารบริษัท</h2>
          <ul>
            <li><NuxtLink to="/about/download">Company Profile / ดาวน์โหลดโปรไฟล์</NuxtLink></li>
          </ul>
          <h2>หน้าสรุปที่ใช้ประกอบการลงทุน</h2>
          <ul>
            <li><NuxtLink to="/solar/rooftop/packages">แพ็กเกจโซล่าเซลล์</NuxtLink></li>
            <li><NuxtLink to="/ev-charging/packages">แพ็กเกจ EV Station</NuxtLink></li>
            <li><NuxtLink to="/ev-charging/packages/price-rates">เรทเครื่องชาร์จ</NuxtLink></li>
            <li><NuxtLink to="/knowledge/articles">บทความความรู้</NuxtLink></li>
          </ul>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ดาวน์โหลดเอกสารโซล่าเซลล์และ EV Station',
  description: 'ดาวน์โหลดโปรไฟล์บริษัทและหน้าสรุปแพ็กเกจโซล่าเซลล์ EV Station จาก CX ENERTECH',
  path: '/knowledge/downloads',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
    { name: 'ดาวน์โหลด', path: '/knowledge/downloads' },
  ],
})
</script>
