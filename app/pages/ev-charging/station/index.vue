<template>
  <div>
    <PageHero
      title="EV Charging Station"
      description="ออกแบบ ก่อสร้าง และส่งมอบสถานีชาร์จ EV ครบวงจร — จาก Design ถึง Commissioning"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV Charging","to":"/ev-charging"},{"label":"EV Station"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ออกแบบ ก่อสร้าง และส่งมอบสถานีชาร์จ EV ครบวงจร — จาก Design ถึง Commissioning</p>
          
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
          <NuxtLink to="/ev-charging/station/design" class="sub-link">Station Design <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station/epc" class="sub-link">EPC <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station/electrical" class="sub-link">Electrical System <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station/transformer" class="sub-link">Transformer <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station/rmu-mdb" class="sub-link">RMU / MDB <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station/commissioning" class="sub-link">Commissioning <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Charging Station | CX ENERTECH',
  description: 'ออกแบบ ก่อสร้าง และส่งมอบสถานีชาร์จ EV ครบวงจร — จาก Design ถึง Commissioning',
})
</script>
