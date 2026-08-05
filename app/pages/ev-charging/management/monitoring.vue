<template>
  <div>
    <PageHero
      title="EV Monitoring"
      description="ติดตามสถานะเครื่องชาร์จและการใช้งานแบบเรียลไทม์"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Management","to":"/ev-charging/management"},{"label":"Monitoring"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ติดตามสถานะเครื่องชาร์จและการใช้งานแบบเรียลไทม์</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Monitoring | CX ENERTECH',
  description: 'ติดตามสถานะเครื่องชาร์จและการใช้งานแบบเรียลไทม์',
})
</script>
