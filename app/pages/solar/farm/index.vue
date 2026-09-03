<template>
  <div>
    <PageHero
      title="โซลาร์ฟาร์ม — Ground Mount Utility Scale และลอยน้ำ"
      description="งานโซลาร์ภาคพื้นดิน ขนาดโรงไฟฟ้า และ floating solar สำหรับที่ดินและอ่างเก็บน้ำ"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'โซลาร์', to: '/solar' },
        { label: 'โซลาร์ฟาร์ม' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            โซลาร์ฟาร์มต่างจาก rooftop ตรงที่ใช้ที่ดินหรือผิวน้ำเป็นหลัก CX ENERTECH รับออกแบบและรับเหมาติดตั้ง
            ทั้งระบบยึดกับพื้น งาน utility scale และแผงลอยน้ำ โดยประเมินความเหมาะสมของดิน น้ำ ระยะสาย และการยื่นการไฟฟ้าในหน้าเดียว
          </p>
          <h2>Ground Mount</h2>
          <p>
            ระบบยึดกับพื้นเหมาะกับที่ว่างข้างโรงงาน ลานจอด หรือแปลงเกษตรที่ต้องการลดค่าไฟโดยไม่ใช้หลังคา
            งานนี้รวมโครงสร้างราง ฐานราก แนวเคเบิล และระยะห่างแถวแผงให้ผลิตได้ตามแบบ
          </p>
          <h2>Utility Scale</h2>
          <p>
            โครงการขนาดใหญ่ระดับเมกะวัตต์ต้องวางแผน EPC เต็มรูปแบบ ทั้งแปลงที่ดิน สถานีไฟฟ้าย่อย และตารางก่อสร้าง
            ไม่มีแพ็กเกจสำเร็จรูป ต้องสำรวจแปลงแล้วออกแบบเฉพาะไซต์
          </p>
          <h2>Floating Solar</h2>
          <p>
            แผงบนทุ่นลอยน้ำใช้ผิวอ่างหรือบ่อที่ไม่ใช้หลังคา ช่วยลดการระเหยและใช้พื้นที่น้ำที่ว่าง
            ต้องดูความลึก คลื่น วัสดุทุ่น และการยึดฝั่งก่อนล็อกขนาดระบบ
          </p>
        </div>
      </div>
    </section>
    <section class="section" style="background: #101010">
      <div class="container">
        <div class="section-header">
          <span class="section-label">งานที่เกี่ยวข้อง</span>
          <h2 class="section-title">ถ้ายังไม่ใช่ฟาร์ม</h2>
        </div>
        <div class="sub-links">
          <NuxtLink to="/solar/rooftop/factory" class="sub-link">โซล่าเซลล์โรงงาน <span>→</span></NuxtLink>
          <NuxtLink to="/solar/epc" class="sub-link">Solar EPC <span>→</span></NuxtLink>
          <NuxtLink to="/solar/ppa" class="sub-link">PPA ไม่ต้องลงทุน <span>→</span></NuxtLink>
          <NuxtLink to="/solar/quotation" class="sub-link">ขอใบเสนอราคา <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand
      title="มีแปลงที่ดินหรืออ่างเก็บน้ำ?"
      description="ส่งขนาดพื้นที่และพิกัดเพื่อประเมินว่า ground mount หรือ floating เหมาะกว่า"
      primary-label="ขอใบเสนอราคา Solar"
      primary-to="/solar/quotation"
    />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'โซลาร์ฟาร์ม | Ground Mount และ Floating Solar',
  description:
    'รับเหมาโซลาร์ฟาร์ม Ground Mount Utility Scale และแผงลอยน้ำ ประเมินที่ดิน น้ำ และการยื่นการไฟฟ้า โดย CX ENERTECH',
  path: '/solar/farm',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'โซลาร์', path: '/solar' },
    { name: 'โซลาร์ฟาร์ม', path: '/solar/farm' },
  ],
})
</script>
