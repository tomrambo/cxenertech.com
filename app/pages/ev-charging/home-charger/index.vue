<template>
  <div>
    <PageHero
      title="Home Charger"
      description="เครื่องชาร์จ EV สำหรับบ้านพักอาศัย พร้อมติดตั้งและบำรุงรักษา"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV Charging","to":"/ev-charging"},{"label":"Home Charger"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>เครื่องชาร์จ EV สำหรับบ้านพักอาศัย พร้อมติดตั้งและบำรุงรักษา</p>
          
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">สำรวจเพิ่มเติม</span>
          <h2 class="section-title">หัวข้อที่เกี่ยวข้อง</h2>
        </div>
        <div class="sub-links">
          <NuxtLink to="/ev-charging/home-charger/ac" class="sub-link">AC Charger <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/home-charger/installation" class="sub-link">Installation <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/home-charger/maintenance" class="sub-link">Maintenance <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Home Charger | CX ENERTECH',
  description: 'เครื่องชาร์จ EV สำหรับบ้านพักอาศัย พร้อมติดตั้งและบำรุงรักษา',
})
</script>
