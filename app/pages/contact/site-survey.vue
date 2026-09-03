<template>
  <div>
    <PageHero
      title="ขอสำรวจพื้นที่"
      description="นัดหมายทีม CX ENERTECH เพื่อสำรวจพื้นที่ก่อนออกแบบระบบ Solar หรือ EV"
      :crumbs='[{"label":"หน้าแรก","to":"/"},{"label":"ติดต่อเรา","to":"/contact"},{"label":"ขอสำรวจพื้นที่"}]'
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
usePageSeo({
  title: 'ขอสำรวจพื้นที่ติดตั้งโซล่าเซลล์และ EV',
  description: 'นัดทีม CX ENERTECH สำรวจหลังคาหรือที่จอด ก่อนออกแบบระบบโซล่าเซลล์หรือ EV Station',
  path: '/contact/site-survey',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ติดต่อเรา', path: '/contact' },
    { name: 'ขอสำรวจพื้นที่', path: '/contact/site-survey' },
  ],
})
</script>
