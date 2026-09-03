<template>
  <div>
    <PageHero
      title="ร่วมงานกับ CX ENERTECH"
      description="รับสมัครทีมงานพลังงานสะอาดและ EV Infrastructure"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'ร่วมงาน' }]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ส่งประวัติมาที่อีเมลบริษัท หรือติดต่อผ่านหน้าติดต่อเรา หากมีตำแหน่งเปิดจะแจ้งกลับ</p>
          <p><NuxtLink class="btn btn-primary" to="/contact">ติดต่อฝ่ายบุคคล</NuxtLink></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ร่วมงานกับ CX ENERTECH',
  description: 'ร่วมงานติดตั้งโซล่าเซลล์และ EV Station กับ CX ENERTECH',
  path: '/career',
  robots: 'noindex, follow',
})
</script>
