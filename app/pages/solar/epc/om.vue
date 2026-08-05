<template>
  <div>
    <PageHero
      title="Solar O&M"
      description="บริการ Operation & Maintenance เพื่อรักษากำลังผลิตและยืดอายุระบบ"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"EPC","to":"/solar/epc"},{"label":"O&M"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>บริการ Operation & Maintenance เพื่อรักษากำลังผลิตและยืดอายุระบบ</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar O&M | CX ENERTECH',
  description: 'บริการ Operation & Maintenance เพื่อรักษากำลังผลิตและยืดอายุระบบ',
})
</script>
