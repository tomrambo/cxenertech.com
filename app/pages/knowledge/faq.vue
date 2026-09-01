<template>
  <div>
    <PageHero
      title="คำถามที่พบบ่อยเรื่องโซล่าเซลล์และ EV"
      description="ติดโซล่าเซลล์คุ้มไหม ใช้เวลากี่วัน ยื่นการไฟฟ้าอย่างไร — คำตอบจากทีม CX ENERTECH"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'FAQ' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <h2>โซล่าเซลล์</h2>
          <h3>รับติดตั้งโซล่าเซลล์ใช้เวลากี่วัน?</h3>
          <p>บ้านพักอาศัยโดยทั่วไปติดตั้ง 1–3 วัน โรงงานขึ้นกับขนาดระบบและงานโครงสร้าง อาจใช้เวลาหลายสัปดาห์รวมออกแบบและยื่นการไฟฟ้า</p>
          <h3>ติดโซล่าเซลล์คุ้มไหม คืนทุนกี่ปี?</h3>
          <p>
            ขึ้นกับค่าไฟต่อหน่วยและการใช้ไฟกลางวัน ดูประมาณการจาก
            <NuxtLink to="/solar/payback">หน้าจุดคืนทุนโซล่าเซลล์</NuxtLink>
            แล้วให้ทีมคำนวณจากบิลจริง
          </p>
          <h3>ราคาติดตั้งโซล่าเซลล์ดูได้ที่ไหน?</h3>
          <p>
            ราคาเริ่มต้นอยู่ที่
            <NuxtLink to="/solar/rooftop/packages">แพ็กเกจโซล่าเซลล์</NuxtLink>
            ไม่รวมงานเสริมหน้างาน ใบเสนอราคาจริงขอได้ที่
            <NuxtLink to="/solar/quotation">ขอใบเสนอราคาโซล่าเซลล์</NuxtLink>
          </p>
          <h3>โรงงานควรติดขนาดเท่าไร?</h3>
          <p>
            ดูบิล 12 เดือนและพื้นที่หลังคา ขนาดที่ค้นบ่อยคือ
            <NuxtLink to="/solar/factory/100kw">100 kW</NuxtLink>,
            <NuxtLink to="/solar/factory/200kw">200 kW</NuxtLink>,
            <NuxtLink to="/solar/factory/500kw">500 kW</NuxtLink>
            และ
            <NuxtLink to="/solar/factory/1mw">1 MW</NuxtLink>
          </p>
          <h3>ติดโซล่าเซลล์ไม่ต้องลงทุนเองได้ไหม?</h3>
          <p>
            โมเดล
            <NuxtLink to="/solar/ppa">PPA solar rooftop</NuxtLink>
            เหมาะกับโรงงานและอาคารใหญ่ ผู้ให้บริการลงทุนระบบให้ คุณจ่ายตามหน่วยที่ผลิต
          </p>
          <h2>EV Charging</h2>
          <h3>เครื่องชาร์จ EV ที่บ้านใช้ไฟบ้านได้หรือไม่?</h3>
          <p>ได้ ทีมเราจะสำรวจและออกแบบระบบไฟฟ้าให้เหมาะสมกับโหลดและความปลอดภัย</p>
          <h3>สามารถเชื่อม Solar กับ EV Charger ได้ไหม?</h3>
          <p>ได้ — นี่คือหัวใจของ Smart Energy Ecosystem ของ CX ENERTECH</p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'FAQ โซล่าเซลล์ | ติดโซล่าเซลล์คุ้มไหม',
  description:
    'คำถามที่พบบ่อย รับติดตั้งโซล่าเซลล์ ราคา จุดคืนทุน PPA และเชื่อม EV Charger โดย CX ENERTECH',
  path: '/knowledge/faq',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
    { name: 'FAQ', path: '/knowledge/faq' },
  ],
})
</script>
