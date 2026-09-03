<template>
  <div>
    <PageHero
      title="เครื่องชาร์จ EV บ้าน — ติดตั้ง AC Home Charger"
      description="รับติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้าที่บ้าน พร้อมตรวจมิเตอร์ สายไฟ และสอนใช้งาน"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'Home Charger' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            Home Charger คือเครื่องชาร์จ AC สำหรับที่จอดบ้าน ไม่ใช่สถานี DC Fast สาธารณะ
            CX ENERTECH ดูมิเตอร์เฟส ความจุสาย และตำแหน่งจอดก่อนเลือกกำลังชาร์จ เพื่อไม่ให้ตัดไฟบ้านตอนชาร์จคู่กับแอร์
          </p>
          <h2>AC Charger ที่บ้าน</h2>
          <p>
            เครื่อง AC 7–22 kW เหมาะกับชาร์จข้ามคืน ราคาและงานไฟฟ้าต่ำกว่าสถานี DC
            ถ้าต้องการจุดชาร์จหลายคันหรือเปิดให้ลูกค้าใช้ ดูหน้าสถานีชาร์จธุรกิจแทน
          </p>
          <h2>งานติดตั้ง</h2>
          <p>
            ติดตั้งรวมเดินสาย เบรกเกอร์ จุดยึดผนังหรือเสา และทดสอบชาร์จจริงกับรถ
            บ้านบางหลังต้องขยายมิเตอร์หรือย้ายจุดจอดก่อนติดเครื่อง
          </p>
          <h2>บำรุงรักษา</h2>
          <p>
            ตรวจข้อต่อ สายชาร์จ และแอปคิดเงินตามรอบ ถ้าเครื่องใช้ร่วมกับโซลาร์กลางวัน ดูหน้า Solar + EV ด้วย
          </p>
        </div>
      </div>
    </section>
    <section class="section" style="background: #101010">
      <div class="container">
        <div class="sub-links">
          <NuxtLink to="/ev-charging/packages" class="sub-link">แพ็กเกจเครื่องชาร์จ <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/station" class="sub-link">รับติดตั้ง EV Station <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/commercial" class="sub-link">ชาร์จสำหรับธุรกิจ <span>→</span></NuxtLink>
          <NuxtLink to="/ev-charging/quotation" class="sub-link">ขอใบเสนอราคา <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand
      title="ต้องการติดตั้งที่จอดบ้าน?"
      description="ส่งรูปมิเตอร์และที่จอด เพื่อรับใบเสนอราคา Home Charger"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ติดตั้งเครื่องชาร์จ EV บ้าน | Home Charger AC',
  description:
    'รับติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้าที่บ้าน AC Home Charger ตรวจมิเตอร์ สายไฟ และสอนใช้งาน โดย CX ENERTECH',
  path: '/ev-charging/home-charger',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'EV Charging', path: '/ev-charging' },
    { name: 'Home Charger', path: '/ev-charging/home-charger' },
  ],
})
</script>
