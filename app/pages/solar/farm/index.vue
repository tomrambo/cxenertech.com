<template>
  <div>
    <PageHero
      title="Solar Farm"
      description="โครงการโซลาร์ฟาร์ม Ground Mount, Utility Scale และ Floating Solar"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"Solar Farm"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>โครงการโซลาร์ฟาร์ม Ground Mount, Utility Scale และ Floating Solar</p>
          
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
          <NuxtLink to="/solar/farm/ground-mount" class="sub-link">Ground Mount <span>→</span></NuxtLink>
          <NuxtLink to="/solar/farm/utility-scale" class="sub-link">Utility Scale <span>→</span></NuxtLink>
          <NuxtLink to="/solar/farm/floating" class="sub-link">Floating Solar <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar Farm | CX ENERTECH',
  description: 'โครงการโซลาร์ฟาร์ม Ground Mount, Utility Scale และ Floating Solar',
})
</script>
