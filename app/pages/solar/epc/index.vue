<template>
  <div>
    <PageHero
      title="Solar EPC"
      description="บริการ Engineering, Procurement, Construction, Commissioning และ O&M"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"Solar EPC"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>บริการ Engineering, Procurement, Construction, Commissioning และ O&M</p>
          
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">สำรวจเพิ่มเติม</span>
          <h2 class="section-title">หัวข้อที่เกี่ยวข้อง</h2>
        </div>
        <div class="sub-links">
          <NuxtLink to="/solar/epc/engineering" class="sub-link">Engineering <span>→</span></NuxtLink>
          <NuxtLink to="/solar/epc/procurement" class="sub-link">Procurement <span>→</span></NuxtLink>
          <NuxtLink to="/solar/epc/construction" class="sub-link">Construction <span>→</span></NuxtLink>
          <NuxtLink to="/solar/epc/commissioning" class="sub-link">Commissioning <span>→</span></NuxtLink>
          <NuxtLink to="/solar/epc/om" class="sub-link">O&M <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar EPC | CX ENERTECH',
  description: 'บริการ Engineering, Procurement, Construction, Commissioning และ O&M',
})
</script>
