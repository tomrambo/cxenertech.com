<template>
  <div>
    <PageHero
      title="Partners"
      description="พันธมิตรด้านเทคโนโลยี อุปกรณ์ และธุรกิจของ CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Partners"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>พันธมิตรด้านเทคโนโลยี อุปกรณ์ และธุรกิจของ CX ENERTECH</p>
          
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
          <NuxtLink to="/partners/technology" class="sub-link">Technology Partners <span>→</span></NuxtLink>
          <NuxtLink to="/partners/equipment" class="sub-link">Equipment Partners <span>→</span></NuxtLink>
          <NuxtLink to="/partners/business" class="sub-link">Business Partners <span>→</span></NuxtLink>
          <NuxtLink to="/partners/become-a-partner" class="sub-link">Become a Partner <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Partners | CX ENERTECH',
  description: 'พันธมิตรด้านเทคโนโลยี อุปกรณ์ และธุรกิจของ CX ENERTECH',
})
</script>
