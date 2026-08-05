<template>
  <div>
    <PageHero
      title="EV Payment"
      description="ระบบชำระเงินสำหรับสถานีชาร์จ EV รองรับหลายช่องทาง"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Management","to":"/ev-charging/management"},{"label":"Payment"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ระบบชำระเงินสำหรับสถานีชาร์จ EV รองรับหลายช่องทาง</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Payment | CX ENERTECH',
  description: 'ระบบชำระเงินสำหรับสถานีชาร์จ EV รองรับหลายช่องทาง',
})
</script>
