<template>
  <div>
    <PageHero
      title="ขอสำรวจพื้นที่"
      description="นัดหมายทีม CX ENERTECH เพื่อสำรวจพื้นที่ก่อนออกแบบระบบ Solar หรือ EV"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Contact","to":"/contact"},{"label":"Site Survey"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>นัดหมายทีม CX ENERTECH เพื่อสำรวจพื้นที่ก่อนออกแบบระบบ Solar หรือ EV</p>
          <p><NuxtLink class="btn btn-primary" to="/contact">กรอกแบบฟอร์มติดต่อ</NuxtLink></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ขอสำรวจพื้นที่ | CX ENERTECH',
  description: 'นัดหมายทีม CX ENERTECH เพื่อสำรวจพื้นที่ก่อนออกแบบระบบ Solar หรือ EV',
})
</script>
