<template>
  <div>
    <PageHero
      title="คำถามที่พบบ่อยเรื่องโซล่าเซลล์และ EV Station"
      description="ติดโซล่าเซลล์คุ้มไหม สร้างสถานีชาร์จต้องขออนุญาตอะไร — คำตอบจากทีม CX ENERTECH"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'FAQ' },
      ]"
    />
    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            FAQ นี้สรุปคำถามที่ลูกค้าใช้ตัดสินใจบ่อย หากต้องการรายละเอียดตามไซต์
            ไปต่อที่ความรู้ Solar / EV หรือขอใบเสนอราคา
          </p>
          <template v-for="group in knowledgeFaqGroups" :key="group.title">
            <h2>{{ group.title }}</h2>
            <div class="seo-faq">
              <details v-for="item in group.items" :key="item.q">
                <summary>{{ item.q }}</summary>
                <p>{{ item.a }}</p>
              </details>
            </div>
          </template>
          <h2>อ่านต่อ</h2>
          <ul>
            <li><NuxtLink to="/knowledge/solar">ความรู้โซล่าเซลล์</NuxtLink></li>
            <li><NuxtLink to="/knowledge/ev">ความรู้ EV Station</NuxtLink></li>
            <li><NuxtLink to="/solar/payback">จุดคืนทุนโซล่าเซลล์</NuxtLink></li>
            <li><NuxtLink to="/ev-charging/investment">ลงทุน EV Station</NuxtLink></li>
            <li><NuxtLink to="/knowledge/articles">บทความทั้งหมด</NuxtLink></li>
          </ul>
        </div>
      </div>
    </section>
    <CtaBand />
  </div>
</template>

<script setup lang="ts">
import { knowledgeFaqGroups, knowledgeFaqs } from '~/utils/knowledge'

usePageSeo({
  title: 'FAQ โซล่าเซลล์และ EV Station',
  description:
    'คำถามที่พบบ่อย รับติดตั้งโซล่าเซลล์ ราคา EV Station จุดคืนทุน และขออนุญาตสถานีชาร์จ โดย CX ENERTECH',
  path: '/knowledge/faq',
  faq: knowledgeFaqs,
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ความรู้', path: '/knowledge' },
    { name: 'FAQ', path: '/knowledge/faq' },
  ],
})
</script>

<style scoped>
.seo-faq details {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 1rem 0;
}
.seo-faq summary {
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-white);
}
.seo-faq details p {
  margin-top: 0.65rem;
}
</style>
