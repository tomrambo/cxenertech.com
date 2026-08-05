<template>
  <div>
    <PageHero
      title="Commercial EV Charger"
      description="เครื่องชาร์จสำหรับธุรกิจ อาคารพาณิชย์ และที่จอดรถองค์กร — AC และ DC Fast"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV Charging","to":"/ev-charging"},{"label":"Commercial"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>เครื่องชาร์จสำหรับธุรกิจ อาคารพาณิชย์ และที่จอดรถองค์กร — AC และ DC Fast</p>
          
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
          <NuxtLink to="/ev-charging/commercial/ac" class="sub-link">AC Charger <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/commercial/dc-fast" class="sub-link">DC Fast Charger <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Commercial EV Charger | CX ENERTECH',
  description: 'เครื่องชาร์จสำหรับธุรกิจ อาคารพาณิชย์ และที่จอดรถองค์กร — AC และ DC Fast',
})
</script>
