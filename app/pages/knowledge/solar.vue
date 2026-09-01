<template>
  <div>
    <PageHero
      title="ความรู้โซล่าเซลล์ — เลือกขนาด ราคา และจุดคืนทุน"
      description="สรุปเรื่องรับติดตั้งโซล่าเซลล์บ้าน โรงงาน Hybrid BESS และ PPA จากทีม CX ENERTECH"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'โซล่าเซลล์' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            หน้านี้รวบรวมคำถามที่ลูกค้าใช้ตัดสินใจติดตั้งโซล่าเซลล์ ตั้งแต่บ้าน 5–15 kW ไปจนถึงโรงงาน 100 kW–1 MW
            อ่านภาพรวมแล้วไปหน้าเจาะจงได้ทันที
          </p>
          <h2>เริ่มจากประเภทงาน</h2>
          <ul>
            <li><NuxtLink to="/solar/rooftop">รับติดตั้งโซล่าเซลล์ / Solar Rooftop</NuxtLink></li>
            <li><NuxtLink to="/solar/rooftop/residential">โซล่าเซลล์บ้าน</NuxtLink> — ขนาด <NuxtLink to="/solar/5kw">5 kW</NuxtLink>, <NuxtLink to="/solar/10kw">10 kW</NuxtLink>, <NuxtLink to="/solar/15kw">15 kW</NuxtLink></li>
            <li><NuxtLink to="/solar/rooftop/factory">โซล่าเซลล์โรงงาน</NuxtLink> — <NuxtLink to="/solar/factory/100kw">100 kW</NuxtLink>, <NuxtLink to="/solar/factory/200kw">200 kW</NuxtLink>, <NuxtLink to="/solar/factory/500kw">500 kW</NuxtLink>, <NuxtLink to="/solar/factory/1mw">1 MW</NuxtLink></li>
            <li><NuxtLink to="/solar/rooftop/warehouse">โซล่าเซลล์คลังสินค้า</NuxtLink></li>
            <li><NuxtLink to="/solar/rooftop/packages">แพ็กเกจและราคาติดตั้ง</NuxtLink></li>
          </ul>
          <h2>คุ้มไหม และจ่ายอย่างไร</h2>
          <ul>
            <li><NuxtLink to="/solar/payback">ติดโซล่าเซลล์คุ้มไหม / จุดคืนทุน</NuxtLink></li>
            <li><NuxtLink to="/solar/ppa">PPA — ติดโซล่าเซลล์ไม่ต้องลงทุนเอง</NuxtLink></li>
            <li><NuxtLink to="/solar/quotation">ขอใบเสนอราคาโซล่าเซลล์</NuxtLink></li>
          </ul>
          <h2>Hybrid และกักเก็บพลังงาน</h2>
          <ul>
            <li><NuxtLink to="/solar/hybrid">โซล่าเซลล์ hybrid</NuxtLink></li>
            <li><NuxtLink to="/solar/battery">โซล่าเซลล์พร้อมแบตเตอรี่</NuxtLink></li>
            <li><NuxtLink to="/solar/bess">Solar BESS โรงงาน</NuxtLink></li>
          </ul>
          <h2>อ่านต่อในศูนย์ความรู้</h2>
          <ul>
            <li><NuxtLink to="/knowledge/articles?category=solar">บทความโซล่าเซลล์</NuxtLink></li>
            <li><NuxtLink to="/knowledge/news">ข่าวสาร</NuxtLink></li>
            <li><NuxtLink to="/knowledge/case-studies">กรณีศึกษา</NuxtLink></li>
            <li><NuxtLink to="/knowledge/faq">FAQ</NuxtLink></li>
          </ul>
        </div>
      </div>
    </section>
    <CtaBand
      title="ต้องการให้ทีมช่วยเลือกขนาดระบบ?"
      description="ส่งบิลค่าไฟและรูปหลังคา เพื่อรับใบเสนอราคาติดตั้งโซล่าเซลล์"
      primary-label="ขอใบเสนอราคา Solar"
      primary-to="/contact/quotation?type=solar"
      secondary-label="ดูแพ็กเกจ"
      secondary-to="/solar/rooftop/packages"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ความรู้โซล่าเซลล์ | เลือกขนาด ราคา จุดคืนทุน',
  description:
    'ความรู้ติดตั้งโซล่าเซลล์บ้านและโรงงาน แพ็กเกจราคา Hybrid BESS PPA และจุดคืนทุน โดย CX ENERTECH',
  path: '/knowledge/solar',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
    { name: 'โซล่าเซลล์', path: '/knowledge/solar' },
  ],
})
</script>
