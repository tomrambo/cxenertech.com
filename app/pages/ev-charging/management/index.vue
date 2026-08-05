<template>
  <div>
    <PageHero
      title="EV Charging Management Platform"
      description="แพลตฟอร์มบริหารจัดการสถานีชาร์จ — Charger, Payment, Monitoring, Reporting, ERP"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV Charging","to":"/ev-charging"},{"label":"Management Platform"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>แพลตฟอร์มบริหารจัดการสถานีชาร์จ — Charger, Payment, Monitoring, Reporting, ERP</p>
          
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
          <NuxtLink to="/ev-charging/management/charger" class="sub-link">Charger Management <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/management/payment" class="sub-link">Payment <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/management/monitoring" class="sub-link">Monitoring <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/management/reporting" class="sub-link">Reporting <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/management/erp" class="sub-link">ERP Integration <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Charging Management Platform | CX ENERTECH',
  description: 'แพลตฟอร์มบริหารจัดการสถานีชาร์จ — Charger, Payment, Monitoring, Reporting, ERP',
})
</script>
