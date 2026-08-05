<template>
  <div>
    <PageHero
      title="LINE OA"
      description="ติดต่อ CX ENERTECH ผ่าน LINE Official Account: @cxenertech"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Contact","to":"/contact"},{"label":"LINE OA"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ติดต่อ CX ENERTECH ผ่าน LINE Official Account: @cxenertech</p>
          <p class="section-lead">เพิ่มเพื่อน LINE: <strong>@cxenertech</strong></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'LINE OA | CX ENERTECH',
  description: 'ติดต่อ CX ENERTECH ผ่าน LINE Official Account: @cxenertech',
})
</script>
