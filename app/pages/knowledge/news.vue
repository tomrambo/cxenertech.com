<template>
  <div>
    <PageHero
      title="News"
      description="ข่าวสารและอัปเดตล่าสุดจาก CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Knowledge","to":"/knowledge"},{"label":"News"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ข่าวสารและอัปเดตล่าสุดจาก CX ENERTECH</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'News | CX ENERTECH',
  description: 'ข่าวสารและอัปเดตล่าสุดจาก CX ENERTECH',
})
</script>
