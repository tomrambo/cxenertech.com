<template>
  <div>
    <PageHero
      title="Home Charger Maintenance"
      description="บริการตรวจสอบและบำรุงรักษาเครื่องชาร์จ EV ที่บ้าน"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Home Charger","to":"/ev-charging/home-charger"},{"label":"Maintenance"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>บริการตรวจสอบและบำรุงรักษาเครื่องชาร์จ EV ที่บ้าน</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Home Charger Maintenance | CX ENERTECH',
  description: 'บริการตรวจสอบและบำรุงรักษาเครื่องชาร์จ EV ที่บ้าน',
})
</script>
