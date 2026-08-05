<template>
  <div>
    <PageHero
      title="Knowledge Center"
      description="ข่าวสาร บทความ ความรู้ Solar/EV กรณีศึกษา FAQ และศูนย์ดาวน์โหลด"
      :crumbs='[{"label":"Home","to":"/"},{"label":"Knowledge Center"}]'
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>ข่าวสาร บทความ ความรู้ Solar/EV กรณีศึกษา FAQ และศูนย์ดาวน์โหลด</p>
          
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">สำรวจเพิ่มเติม</span>
          <h2 class="section-title">หัวข้อที่เกี่ยวข้อง</h2>
        </div>
        <div class="sub-links">
          <NuxtLink to="/knowledge/news" class="sub-link">News <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/articles" class="sub-link">Articles <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/solar" class="sub-link">Solar Knowledge <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/ev" class="sub-link">EV Knowledge <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/case-studies" class="sub-link">Case Studies <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/faq" class="sub-link">FAQ <span>→</span></NuxtLink>
          <NuxtLink to="/knowledge/downloads" class="sub-link">Download Center <span>→</span></NuxtLink>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Knowledge Center | CX ENERTECH',
  description: 'ข่าวสาร บทความ ความรู้ Solar/EV กรณีศึกษา FAQ และศูนย์ดาวน์โหลด',
})
</script>
