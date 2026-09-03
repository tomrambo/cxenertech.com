<template>
  <div>
    <PageHero
      title="พันธมิตรขายโซล่าเซลล์และ EV Station"
      description="เปิดรับเซลล์อิสระที่อยากขายงานติดตั้ง โดยมีทีมสำรวจและติดตั้งซัพพอร์ตให้"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'พันธมิตร' }]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            หน้านี้สำหรับคนที่อยากขายโซลูชัน Solar และ EV Charging ร่วมกับ CX ENERTECH
            ไม่ใช่หน้าให้ลูกค้าค้นหาเพื่อติดตั้ง — ลูกค้าที่ต้องการติดตั้งไปที่แพ็กเกจหรือใบเสนอราคา
          </p>
          <p>
            <NuxtLink class="btn btn-primary" to="/partners/become-a-partner">
              สมัครเป็น Partner
            </NuxtLink>
          </p>
        </div>
      </div>
    </section>
    <CtaBand
      title="ลูกค้าต้องการติดตั้ง ไม่ใช่สมัครเซลล์?"
      description="ดูแพ็กเกจราคา หรือส่งรายละเอียดไซต์เพื่อรับใบเสนอราคา"
      primary-label="ขอใบเสนอราคา"
      primary-to="/contact/quotation"
      secondary-label="แพ็กเกจโซล่าเซลล์"
      secondary-to="/solar/rooftop/packages"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'พันธมิตรขายโซล่าเซลล์และ EV',
  description: 'สมัครเซลล์อิสระขายงานติดตั้งโซล่าเซลล์และ EV Station กับทีม CX ENERTECH',
  path: '/partners',
  robots: 'noindex, follow',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'พันธมิตร', path: '/partners' },
  ],
})
</script>
