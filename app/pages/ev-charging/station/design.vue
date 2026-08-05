<template>
  <div>
    <PageHero
      title="EV Station Design"
      description="ออกแบบสถานีชาร์จ EV ให้เหมาะสมกับพื้นที่ โหลดไฟฟ้า และประสบการณ์ผู้ใช้"
      :crumbs='[{"label":"Home","to":"/"},{"label":"EV","to":"/ev-charging"},{"label":"Station","to":"/ev-charging/station"},{"label":"Design"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ออกแบบสถานีชาร์จ EV ให้เหมาะสมกับพื้นที่ โหลดไฟฟ้า และประสบการณ์ผู้ใช้</p>
          
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'EV Station Design | CX ENERTECH',
  description: 'ออกแบบสถานีชาร์จ EV ให้เหมาะสมกับพื้นที่ โหลดไฟฟ้า และประสบการณ์ผู้ใช้',
})
</script>
