<template>
  <div>
    <PageHero
      title="Solar Products"
      description="ผลิตภัณฑ์โซลาร์: แผง อินเวอร์เตอร์ และอุปกรณ์ที่เกี่ยวข้อง"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"Products"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ผลิตภัณฑ์โซลาร์: แผง อินเวอร์เตอร์ และอุปกรณ์ที่เกี่ยวข้อง</p>
          
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
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar Products | CX ENERTECH',
  description: 'ผลิตภัณฑ์โซลาร์: แผง อินเวอร์เตอร์ และอุปกรณ์ที่เกี่ยวข้อง',
})
</script>
