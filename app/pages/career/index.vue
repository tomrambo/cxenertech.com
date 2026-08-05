<template>
  <div>
    <PageHero
      title="Career"
      description="ร่วมงานกับ CX ENERTECH — สร้างอนาคตพลังงานสะอาดไปด้วยกัน"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Career"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ร่วมงานกับ CX ENERTECH — สร้างอนาคตพลังงานสะอาดไปด้วยกัน</p>
          
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
          <NuxtLink to="/career/life" class="sub-link">Life at CX ENERTECH <span>→</span></NuxtLink>
          <NuxtLink to="/career/positions" class="sub-link">Open Positions <span>→</span></NuxtLink>
          <NuxtLink to="/career/submit-resume" class="sub-link">Submit Resume <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Career | CX ENERTECH',
  description: 'ร่วมงานกับ CX ENERTECH — สร้างอนาคตพลังงานสะอาดไปด้วยกัน',
})
</script>
