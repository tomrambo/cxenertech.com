<template>
  <div>
    <PageHero
      title="วิสัยทัศน์และพันธกิจ"
      description="มุ่งติดตั้งโซล่าเซลล์และ EV Station ให้ธุรกิจไทยใช้พลังงานสะอาดได้จริง"
      :crumbs='[{"label":"หน้าแรก","to":"/"},{"label":"เกี่ยวกับเรา","to":"/about"},{"label":"วิสัยทัศน์และพันธกิจ"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>วิสัยทัศน์: เป็นผู้นำด้าน Smart Energy & EV Infrastructure ในภูมิภาค — พันธกิจ: ส่งมอบโซลูชันพลังงานสะอาดที่เชื่อถือได้ครบวงจร</p>
          <h2>Vision</h2><p>Powering the future with smart energy — สร้างระบบนิเวศพลังงานที่ยั่งยืนสำหรับธุรกิจและชุมชน</p><h2>Mission</h2><p>ออกแบบ ติดตั้ง และบริหารจัดการระบบ Solar และ EV Charging ด้วยมาตรฐานวิศวกรรมสูงสุด</p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'วิสัยทัศน์และพันธกิจ | CX ENERTECH',
  description: 'วิสัยทัศน์และพันธกิจของบริษัทติดตั้งโซล่าเซลล์และ EV Station CX ENERTECH',
  path: '/about/vision-mission',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
    { name: 'วิสัยทัศน์และพันธกิจ', path: '/about/vision-mission' },
  ],
})
</script>
