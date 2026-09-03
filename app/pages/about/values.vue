<template>
  <div>
    <PageHero
      title="ค่านิยมองค์กร"
      description="ค่านิยมที่ทีมติดตั้งโซล่าเซลล์และ EV Station ของ CX ENERTECH ใช้กับงานหน้างาน"
      :crumbs='[{"label":"หน้าแรก","to":"/"},{"label":"เกี่ยวกับเรา","to":"/about"},{"label":"ค่านิยม"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ค่านิยมองค์กรที่ขับเคลื่อนทีม CX ENERTECH ในทุกโครงการ</p>
          <h3>Integrity</h3><p>ซื่อสัตย์ โปร่งใส และรับผิดชอบต่อลูกค้าและสังคม</p><h3>Excellence</h3><p>มุ่งมั่นคุณภาพงานวิศวกรรมในทุกรายละเอียด</p><h3>Sustainability</h3><p>ยึดถือความยั่งยืนเป็นหัวใจของทุกโซลูชัน</p><h3>Innovation</h3><p>พัฒนาและผสานเทคโนโลยี Smart Energy อย่างต่อเนื่อง</p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ค่านิยมองค์กร | CX ENERTECH',
  description: 'ค่านิยมทีมติดตั้งโซล่าเซลล์และ EV Station ของบริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด',
  path: '/about/values',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
    { name: 'ค่านิยม', path: '/about/values' },
  ],
})
</script>
