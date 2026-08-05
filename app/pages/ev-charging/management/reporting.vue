<template>
  <div>
    <PageHero
      title="EV Reporting"
      description="รายงานการใช้งาน พลังงาน และรายได้จากสถานีชาร์จ EV"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Management","to":"/ev-charging/management"},{"label":"Reporting"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>รายงานการใช้งาน พลังงาน และรายได้จากสถานีชาร์จ EV</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Reporting | CX ENERTECH',
  description: 'รายงานการใช้งาน พลังงาน และรายได้จากสถานีชาร์จ EV',
})
</script>
