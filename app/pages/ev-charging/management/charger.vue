<template>
  <div>
    <PageHero
      title="Charger Management"
      description="บริหารจัดการเครื่องชาร์จหลายจุดจากศูนย์กลาง ควบคุมสถานะและตั้งค่าได้แบบเรียลไทม์"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Management","to":"/ev-charging/management"},{"label":"Charger Management"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>บริหารจัดการเครื่องชาร์จหลายจุดจากศูนย์กลาง ควบคุมสถานะและตั้งค่าได้แบบเรียลไทม์</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Charger Management | CX ENERTECH',
  description: 'บริหารจัดการเครื่องชาร์จหลายจุดจากศูนย์กลาง ควบคุมสถานะและตั้งค่าได้แบบเรียลไทม์',
})
</script>
