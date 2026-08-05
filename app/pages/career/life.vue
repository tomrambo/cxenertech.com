<template>
  <div>
    <PageHero
      title="Life at CX ENERTECH"
      description="วัฒนธรรมองค์กรและชีวิตการทำงานที่ CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Career","to":"/career"},{"label":"Life at CX"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>วัฒนธรรมองค์กรและชีวิตการทำงานที่ CX ENERTECH</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Life at CX ENERTECH | CX ENERTECH',
  description: 'วัฒนธรรมองค์กรและชีวิตการทำงานที่ CX ENERTECH',
})
</script>
