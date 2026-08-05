<template>
  <div>
    <PageHero
      title="ดาวน์โหลด Company Profile"
      description="ดาวน์โหลดเอกสารแนะนำบริษัท CX ENERTECH (PDF)"
      :crumbs='[{"label":"Home","to":"/"},{"label":"About","to":"/about"},{"label":"Download"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ดาวน์โหลดเอกสารแนะนำบริษัท CX ENERTECH (PDF)</p>
          <p><a class="btn btn-primary" href="/contact">ติดต่อเพื่อรับ Company Profile</a></p>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'ดาวน์โหลด Company Profile | CX ENERTECH',
  description: 'ดาวน์โหลดเอกสารแนะนำบริษัท CX ENERTECH (PDF)',
})
</script>
