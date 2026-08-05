<template>
  <div>
    <PageHero
      title="ขอใบเสนอราคา Solar"
      description="กรอกข้อมูลเพื่อรับใบเสนอราคาระบบโซลาร์จากทีม CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Solar","to":"/solar"},{"label":"Quotation"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>กรอกข้อมูลเพื่อรับใบเสนอราคาระบบโซลาร์จากทีม CX ENERTECH</p>
          <p><NuxtLink class="btn btn-primary" to="/contact/quotation?type=solar">ไปที่แบบฟอร์มขอใบเสนอราคา</NuxtLink></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ขอใบเสนอราคา Solar | CX ENERTECH',
  description: 'กรอกข้อมูลเพื่อรับใบเสนอราคาระบบโซลาร์จากทีม CX ENERTECH',
})
</script>
