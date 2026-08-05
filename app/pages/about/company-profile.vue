<template>
  <div>
    <PageHero
      title="Company Profile"
      description="ประวัติและภาพรวมบริษัท CX ENERTECH ผู้เชี่ยวชาญด้าน Solar Energy และ EV Charging Infrastructure"
      :crumbs='[{"label":"Home","to":"/"},{"label":"About","to":"/about"},{"label":"Company Profile"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ประวัติและภาพรวมบริษัท CX ENERTECH ผู้เชี่ยวชาญด้าน Solar Energy และ EV Charging Infrastructure</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Company Profile | CX ENERTECH',
  description: 'ประวัติและภาพรวมบริษัท CX ENERTECH ผู้เชี่ยวชาญด้าน Solar Energy และ EV Charging Infrastructure',
})
</script>
