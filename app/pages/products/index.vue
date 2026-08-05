<template>
  <div>
    <PageHero
      title="Products"
      description="ผลิตภัณฑ์ Solar และ EV Charging จากพันธมิตรเทคโนโลยีชั้นนำ"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Products"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ผลิตภัณฑ์ Solar และ EV Charging จากพันธมิตรเทคโนโลยีชั้นนำ</p>
          
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
          <NuxtLink to="/products/solar-panels" class="sub-link">Solar Panels <span>→</span></NuxtLink>
          <NuxtLink to="/products/solar-inverter" class="sub-link">Solar Inverter <span>→</span></NuxtLink>
          <NuxtLink to="/products/solar-equipment" class="sub-link">Solar Equipment <span>→</span></NuxtLink>
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
  title: 'Products | CX ENERTECH',
  description: 'ผลิตภัณฑ์ Solar และ EV Charging จากพันธมิตรเทคโนโลยีชั้นนำ',
})
</script>
