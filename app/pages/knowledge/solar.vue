<template>
  <div>
    <PageHero
      title="Solar Knowledge"
      description="ความรู้เกี่ยวกับระบบโซลาร์ การออกแบบ การติดตั้ง และการดูแลรักษา"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Knowledge","to":"/knowledge"},{"label":"Solar Knowledge"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ความรู้เกี่ยวกับระบบโซลาร์ การออกแบบ การติดตั้ง และการดูแลรักษา</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar Knowledge | CX ENERTECH',
  description: 'ความรู้เกี่ยวกับระบบโซลาร์ การออกแบบ การติดตั้ง และการดูแลรักษา',
})
</script>
