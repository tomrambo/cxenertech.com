<template>
  <div>
    <PageHero
      title="ขอสำรวจพื้นที่"
      description="นัดหมายทีม CX ENERTECH เพื่อสำรวจหลังคาหรือที่จอด ก่อนออกแบบระบบ Solar หรือ EV"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ติดต่อเรา', to: '/contact' },
        { label: 'ขอสำรวจพื้นที่' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            นัดสำรวจเพื่อวัดพื้นที่ ดูมิเตอร์ และเก็บข้อมูลก่อนออกใบเสนอราคาหรือชุดเอกสารสินเชื่อ
            เลือกช่องทางด้านล่างได้เลย
          </p>
        </div>
        <RequestChannels />
      </div>
    </section>
    <CtaBand
      title="พร้อมนัดสำรวจ?"
      description="ส่งข้อมูลไซต์ผ่านฟอร์ม หรือคุยทาง LINE / โทร เพื่อให้ทีมนัดวันเข้าพื้นที่"
      primary-label="ขอใบเสนอราคา"
      primary-to="/contact/quotation"
      secondary-label="ติดต่อเรา"
      secondary-to="/contact"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ขอสำรวจพื้นที่ติดตั้งโซล่าเซลล์และ EV',
  description: 'นัดทีม CX ENERTECH สำรวจหลังคาหรือที่จอด ก่อนออกแบบระบบโซล่าเซลล์หรือ EV Station ผ่านฟอร์ม LINE หรือโทร',
  path: '/contact/site-survey',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ติดต่อเรา', path: '/contact' },
    { name: 'ขอสำรวจพื้นที่', path: '/contact/site-survey' },
  ],
})
</script>
