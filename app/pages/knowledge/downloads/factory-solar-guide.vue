<template>
  <div>
    <PageHero
      title="คู่มือคำนวณขนาดไฟโซล่าเซลล์สำหรับโรงงาน"
      description="ดาวน์โหลดคู่มือฟรี แลกกับชื่อ เบอร์โทร และ Line ID — ใช้ประเมินขนาดระบบก่อนนัดสำรวจ ไม่ใช่ใบเสนอราคา"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'ดาวน์โหลด', to: '/knowledge/downloads' },
        { label: 'คู่มือโรงงาน' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            คู่มือสรุปวิธีอ่านบิล 12 เดือน จับขนาด kW คร่าว ๆ และเอกสารยื่น MEA/PEA
            ใช้เตรียมข้อมูลก่อนคุยวิศวกร ไม่ทดแทนการสำรวจหลังคา
          </p>
          <ul>
            <li>กรอบคิดขนาดระบบจากค่าไฟกลางวัน</li>
            <li>เช็กลิสต์เอกสารโรงงาน</li>
            <li>ลิงก์ไปหน้าแพ็กเกจและใบเสนอราคา</li>
          </ul>
          <h2>รับไฟล์ PDF</h2>
          <LeadMagnetForm />
        </div>
      </div>
    </section>
    <CtaBand
      title="พร้อมให้ทีมจัดเอกสารยื่นการไฟฟ้า?"
      description="ส่งบิลและผังหลังคา เพื่อสำรวจไซต์และออกแบบโซล่าเซลล์โรงงาน"
      primary-label="ขอใบเสนอราคา Solar"
      primary-to="/contact/quotation?type=solar"
      secondary-label="ขั้นตอนขออนุญาต"
      secondary-to="/knowledge/articles/kho-anuyat-tid-solar-rongngan-mea-pea"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'คู่มือคำนวณขนาดไฟโซล่าเซลล์โรงงาน | ดาวน์โหลดฟรี',
  description:
    'ดาวน์โหลดคู่มือคำนวณขนาดไฟโซล่าเซลล์สำหรับโรงงาน แลกชื่อ เบอร์โทร Line ID จาก CX ENERTECH',
  path: '/knowledge/downloads/factory-solar-guide',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
    { name: 'ดาวน์โหลด', path: '/knowledge/downloads' },
    { name: 'คู่มือโรงงาน', path: '/knowledge/downloads/factory-solar-guide' },
  ],
})
</script>
