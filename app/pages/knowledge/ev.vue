<template>
  <div>
    <PageHero
      title="ความรู้ EV Station — สร้างสถานีชาร์จต้องรู้อะไร"
      description="ขออนุญาต หม้อแปลง จุดคืนทุน และงบลงทุนสถานีชาร์จรถยนต์ไฟฟ้า จากทีม CX ENERTECH"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'EV Station' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            รวมคำถามก่อนสร้าง EV Station ทั้งขออนุญาต ขนาดหม้อแปลง จุดคืนทุน และงบลงทุน
            อ่านภาพรวมแล้วไปหน้าเจาะจงได้ทันที
          </p>
          <h2>สร้าง EV Station ต้องขออนุญาตอะไร</h2>
          <p>
            โดยทั่วไปเกี่ยวกับการไฟฟ้า (PEA/MEA) แบบก่อสร้าง และมาตรฐานติดตั้ง EV Charger
            รายละเอียดอยู่ที่
            <NuxtLink to="/ev-charging/station/approvals">หน้าขออนุญาต EV Station</NuxtLink>
          </p>
          <h2>ต้องใช้หม้อแปลงขนาดเท่าไหร่สำหรับ EV Charger</h2>
          <p>
            ขึ้นกับกำลังเครื่องและจำนวนหัวชาร์จ ขนาดที่ค้นบ่อยคือ
            <NuxtLink to="/ev-charging/120kw">120 kW</NuxtLink>,
            <NuxtLink to="/ev-charging/180kw">180 kW</NuxtLink>
            และ
            <NuxtLink to="/ev-charging/240kw">240 kW</NuxtLink>
            ดูหลักการที่
            <NuxtLink to="/ev-charging/station/transformer">หน้าหม้อแปลง EV Station</NuxtLink>
          </p>
          <h2>สถานีชาร์จรถไฟฟ้าคืนทุนกี่ปี / กำไรเท่าไหร่</h2>
          <p>
            ขึ้นกับทำเล ค่าไฟ และจำนวนครั้งชาร์จ ดูกรอบที่
            <NuxtLink to="/ev-charging/investment">ลงทุน EV Station</NuxtLink>
            และตาราง
            <NuxtLink to="/ev-charging/packages/payback">จุดคืนทุนแพ็กเกจ</NuxtLink>
          </p>
          <h2>ลงทุน EV Station ต้องใช้เงินเท่าไหร่</h2>
          <p>
            งบรวมเครื่องชาร์จ งานไฟฟ้า โครงสร้าง และแพลตฟอร์ม สรุปที่
            <NuxtLink to="/ev-charging/cost">ราคา EV Station</NuxtLink>
            แล้วขอ
            <NuxtLink to="/ev-charging/quotation">ใบเสนอราคาตามไซต์</NuxtLink>
          </p>
          <h2>เริ่มติดตั้ง</h2>
          <ul>
            <li><NuxtLink to="/ev-charging/station">รับติดตั้ง EV Station</NuxtLink></li>
            <li><NuxtLink to="/ev-charging/station/epc">Turnkey EPC</NuxtLink></li>
            <li><NuxtLink to="/ev-charging/commercial">สถานีชาร์จสำหรับธุรกิจ</NuxtLink></li>
            <li><NuxtLink to="/ev-charging/thailand">ติดตั้งทั่วประเทศ</NuxtLink></li>
            <li><NuxtLink to="/knowledge/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/knowledge/articles?category=ev">บทความ EV Station</NuxtLink></li>
            <li><NuxtLink to="/knowledge/case-studies">กรณีศึกษา</NuxtLink></li>
            <li><NuxtLink to="/knowledge/news">ข่าวสาร</NuxtLink></li>
          </ul>
        </div>
      </div>
    </section>
    <CtaBand
      title="ต้องการให้ทีมช่วยประเมินสถานีชาร์จ?"
      description="ส่งผังที่จอดและข้อมูลมิเตอร์ เพื่อรับใบเสนอราคา EV Station"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/contact/quotation?type=ev"
      secondary-label="ดูแพ็กเกจ"
      secondary-to="/ev-charging/packages"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ความรู้ EV Station | ขออนุญาต หม้อแปลง จุดคืนทุน',
  description:
    'ความรู้สร้าง EV Station ขออนุญาต หม้อแปลงคืนทุน กำไร และงบลงทุนสถานีชาร์จรถไฟฟ้า โดย CX ENERTECH',
  path: '/knowledge/ev',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
    { name: 'EV Station', path: '/knowledge/ev' },
  ],
})
</script>
