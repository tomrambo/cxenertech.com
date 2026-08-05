<template>
  <div>
    <PageHero
      title="EV Station EPC"
      description="บริการ EPC สถานีชาร์จ EV ครบวงจร Engineering–Procurement–Construction"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Station","to":"/ev-charging/station"},{"label":"EPC"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>บริการ EPC สถานีชาร์จ EV ครบวงจร Engineering–Procurement–Construction</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Station EPC | CX ENERTECH',
  description: 'บริการ EPC สถานีชาร์จ EV ครบวงจร Engineering–Procurement–Construction',
})
</script>
