<template>
  <div>
    <PageHero
      title="FAQ"
      description="คำถามที่พบบ่อยเกี่ยวกับบริการ Solar และ EV Charging"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Knowledge","to":"/knowledge"},{"label":"FAQ"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>คำถามที่พบบ่อยเกี่ยวกับบริการ Solar และ EV Charging</p>
          <h3>Solar Rooftop ใช้เวลากี่วันในการติดตั้ง?</h3><p>ขึ้นอยู่กับขนาดโครงการ โดยทั่วไปบ้านพักอาศัยใช้เวลาประมาณ 1–3 วัน ส่วนโรงงานอาจใช้เวลาหลายสัปดาห์</p><h3>เครื่องชาร์จ EV ที่บ้านใช้ไฟบ้านได้หรือไม่?</h3><p>ได้ ทีมเราจะสำรวจและออกแบบระบบไฟฟ้าให้เหมาะสมกับโหลดและความปลอดภัย</p><h3>สามารถเชื่อม Solar กับ EV Charger ได้ไหม?</h3><p>ได้ — นี่คือหัวใจของ Smart Energy Ecosystem ของ CX ENERTECH</p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'FAQ | CX ENERTECH',
  description: 'คำถามที่พบบ่อยเกี่ยวกับบริการ Solar และ EV Charging',
})
</script>
