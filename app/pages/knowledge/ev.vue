<template>
  <div>
    <PageHero
      title="EV Knowledge"
      description="ความรู้เกี่ยวกับเครื่องชาร์จ EV สถานีชาร์จ และเทคโนโลยีที่เกี่ยวข้อง"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Knowledge","to":"/knowledge"},{"label":"EV Knowledge"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ความรู้เกี่ยวกับเครื่องชาร์จ EV สถานีชาร์จ และเทคโนโลยีที่เกี่ยวข้อง</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Knowledge | CX ENERTECH',
  description: 'ความรู้เกี่ยวกับเครื่องชาร์จ EV สถานีชาร์จ และเทคโนโลยีที่เกี่ยวข้อง',
})
</script>
