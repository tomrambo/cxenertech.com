<template>
  <div>
    <PageHero
      title="Download Center"
      description="ดาวน์โหลดเอกสาร โบรชัวร์ และข้อมูลผลิตภัณฑ์"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Knowledge","to":"/knowledge"},{"label":"Downloads"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ดาวน์โหลดเอกสาร โบรชัวร์ และข้อมูลผลิตภัณฑ์</p>
          
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
          <NuxtLink to="/about/download" class="sub-link">Company Profile <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Download Center | CX ENERTECH',
  description: 'ดาวน์โหลดเอกสาร โบรชัวร์ และข้อมูลผลิตภัณฑ์',
})
</script>
