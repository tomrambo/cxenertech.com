<template>
  <div>
    <PageHero
      title="Our Values"
      description="ค่านิยมองค์กรที่ขับเคลื่อนทีม CX ENERTECH ในทุกโครงการ"
      :crumbs='[{"label":"Home","to":"/"},{"label":"About","to":"/about"},{"label":"Our Values"}]'
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
useSeoMeta({
  title: 'Our Values | CX ENERTECH',
  description: 'ค่านิยมองค์กรที่ขับเคลื่อนทีม CX ENERTECH ในทุกโครงการ',
})
</script>
