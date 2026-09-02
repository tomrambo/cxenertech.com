<template>
  <div>
    <PageHero
      title="Submit Resume"
      description="ส่งเรซูเม่เพื่อสมัครงานกับ CX ENERTECH"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Career","to":"/career"},{"label":"Submit Resume"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ส่งเรซูเม่เพื่อสมัครงานกับ CX ENERTECH</p>
          <p>ส่งเรซูเม่มาที่ <a href="mailto:careerscxenertech.com">careerscxenertech.com</a> หรือใช้แบบฟอร์มติดต่อ</p><p><NuxtLink class="btn btn-primary" to="/contact">ไปที่หน้าติดต่อ</NuxtLink></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Submit Resume | CX ENERTECH',
  description: 'ส่งเรซูเม่เพื่อสมัครงานกับ CX ENERTECH',
})
</script>
