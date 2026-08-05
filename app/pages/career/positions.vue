<template>
  <div>
    <PageHero
      title="Open Positions"
      description="ตำแหน่งงานที่เปิดรับสมัคร — วิศวกรโซลาร์ EV ขาย และสนับสนุนโครงการ"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Career","to":"/career"},{"label":"Open Positions"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ตำแหน่งงานที่เปิดรับสมัคร — วิศวกรโซลาร์ EV ขาย และสนับสนุนโครงการ</p>
          <h3>Solar Project Engineer</h3><p>ออกแบบและบริหารโครงการโซลาร์</p><h3>EV Infrastructure Engineer</h3><p>ออกแบบและติดตั้งสถานีชาร์จ EV</p><h3>Sales Executive — Energy Solutions</h3><p>ดูแลลูกค้าและนำเสนอโซลูชัน</p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Open Positions | CX ENERTECH',
  description: 'ตำแหน่งงานที่เปิดรับสมัคร — วิศวกรโซลาร์ EV ขาย และสนับสนุนโครงการ',
})
</script>
