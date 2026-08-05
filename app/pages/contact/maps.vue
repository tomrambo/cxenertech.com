<template>
  <div>
    <PageHero
      title="Google Maps"
      description="ตำแหน่งสำนักงาน CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Contact","to":"/contact"},{"label":"Maps"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ตำแหน่งสำนักงาน CX ENERTECH</p>
          <div style="margin-top:1.5rem;aspect-ratio:16/9;background:var(--color-mist);display:flex;align-items:center;justify-content:center;color:var(--color-muted)">แผนที่ Google Maps — กรุงเทพมหานคร</div>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Google Maps | CX ENERTECH',
  description: 'ตำแหน่งสำนักงาน CX ENERTECH',
})
</script>
