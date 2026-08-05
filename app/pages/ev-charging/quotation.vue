<template>
  <div>
    <PageHero
      title="ขอใบเสนอราคา EV"
      description="ขอใบเสนอราคาระบบชาร์จ EV จากทีม CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV Charging","to":"/ev-charging"},{"label":"Quotation"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ขอใบเสนอราคาระบบชาร์จ EV จากทีม CX ENERTECH</p>
          <p><NuxtLink class="btn btn-primary" to="/contact/quotation?type=ev">ไปที่แบบฟอร์มขอใบเสนอราคา</NuxtLink></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ขอใบเสนอราคา EV | CX ENERTECH',
  description: 'ขอใบเสนอราคาระบบชาร์จ EV จากทีม CX ENERTECH',
})
</script>
