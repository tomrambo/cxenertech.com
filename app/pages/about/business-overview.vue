<template>
  <div>
    <PageHero
      title="Business Overview"
      description="ธุรกิจหลักของ CX ENERTECH ครอบคลุม Solar Energy, EV Charging และ Smart Energy Management"
      :crumbs='[{"label":"Home","to":"/"},{"label":"About","to":"/about"},{"label":"Business Overview"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ธุรกิจหลักของ CX ENERTECH ครอบคลุม Solar Energy, EV Charging และ Smart Energy Management</p>
          
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
          <NuxtLink to="/solar" class="sub-link">Solar Energy <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging" class="sub-link">EV Charging <span>→</span></NuxtLink>
          <NuxtLink to="/smart-energy" class="sub-link">Smart Energy <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Business Overview | CX ENERTECH',
  description: 'ธุรกิจหลักของ CX ENERTECH ครอบคลุม Solar Energy, EV Charging และ Smart Energy Management',
})
</script>
