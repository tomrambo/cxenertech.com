<template>
  <div>
    <PageHero
      title="Solar Rooftop"
      description="ระบบโซลาร์รูฟท็อปสำหรับบ้าน อาคารพาณิชย์ โรงงาน และคลังสินค้า"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"Solar Rooftop"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ระบบโซลาร์รูฟท็อปสำหรับบ้าน อาคารพาณิชย์ โรงงาน และคลังสินค้า</p>
          <p>
            ดูแพ็กเกจราคา
            <NuxtLink to="/solar/rooftop/packages">PEA Solar Packages</NuxtLink>
            ตามตารางราคา กฟภ. (3–20 kW)
          </p>
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
          <NuxtLink to="/solar/rooftop/packages" class="sub-link">Solar Packages <span>→</span></NuxtLink>
          <NuxtLink to="/solar/rooftop/residential" class="sub-link">Residential <span>→</span></NuxtLink>
          <NuxtLink to="/solar/rooftop/commercial" class="sub-link">Commercial <span>→</span></NuxtLink>
          <NuxtLink to="/solar/rooftop/factory" class="sub-link">Factory <span>→</span></NuxtLink>
          <NuxtLink to="/solar/rooftop/warehouse" class="sub-link">Warehouse <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Solar Rooftop | CX ENERTECH',
  description: 'ระบบโซลาร์รูฟท็อปสำหรับบ้าน อาคารพาณิชย์ โรงงาน และคลังสินค้า',
})
</script>
