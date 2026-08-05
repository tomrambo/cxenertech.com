<template>
  <div>
    <PageHero
      title="Energy Monitoring"
      description="ระบบติดตามการใช้และผลิตพลังงานแบบเรียลไทม์"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Smart Energy","to":"/smart-energy"},{"label":"Energy Monitoring"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ระบบติดตามการใช้และผลิตพลังงานแบบเรียลไทม์</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Energy Monitoring | CX ENERTECH',
  description: 'ระบบติดตามการใช้และผลิตพลังงานแบบเรียลไทม์',
})
</script>
