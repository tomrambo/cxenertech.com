<template>
  <div>
    <PageHero
      title="Energy Management"
      description="บริหารจัดการพลังงานแบบรวมศูนย์ เชื่อมข้อมูล Solar และ EV เพื่อใช้พลังงานอย่างชาญฉลาด"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Smart Energy","to":"/smart-energy"},{"label":"Energy Management"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>บริหารจัดการพลังงานแบบรวมศูนย์ เชื่อมข้อมูล Solar และ EV เพื่อใช้พลังงานอย่างชาญฉลาด</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Energy Management | CX ENERTECH',
  description: 'บริหารจัดการพลังงานแบบรวมศูนย์ เชื่อมข้อมูล Solar และ EV เพื่อใช้พลังงานอย่างชาญฉลาด',
})
</script>
