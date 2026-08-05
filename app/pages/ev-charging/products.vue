<template>
  <div>
    <PageHero
      title="EV Charger Products"
      description="ผลิตภัณฑ์เครื่องชาร์จ EV และอุปกรณ์ที่เกี่ยวข้อง"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV Charging","to":"/ev-charging"},{"label":"Products"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ผลิตภัณฑ์เครื่องชาร์จ EV และอุปกรณ์ที่เกี่ยวข้อง</p>
          
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
          <NuxtLink to="/products/ac-ev-charger" class="sub-link">AC EV Charger <span>→</span></NuxtLink>
          <NuxtLink to="/products/dc-fast-charger" class="sub-link">DC Fast Charger <span>→</span></NuxtLink>
          <NuxtLink to="/products/ev-accessories" class="sub-link">EV Accessories <span>→</span></NuxtLink>
          <NuxtLink to="/products/charging-equipment" class="sub-link">Charging Equipment <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Charger Products | CX ENERTECH',
  description: 'ผลิตภัณฑ์เครื่องชาร์จ EV และอุปกรณ์ที่เกี่ยวข้อง',
})
</script>
