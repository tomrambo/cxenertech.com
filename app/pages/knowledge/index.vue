<template>
  <div>
    <PageHero
      title="ศูนย์ความรู้ Solar และ EV Station"
      description="ข่าวสาร บทความ ความรู้โซล่าเซลล์ ความรู้สถานีชาร์จ กรณีศึกษา และ FAQ จากทีม CX ENERTECH"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'ศูนย์ความรู้' }]"
    />

    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            ศูนย์ความรู้รวบรวมเนื้อหาที่ลูกค้าใช้ตัดสินใจติดตั้งโซล่าเซลล์และสร้าง EV Station
            ตั้งแต่ข่าวอัปเดต บทความเจาะจง กรณีศึกษาหน้างาน ไปจนถึงคำถามที่พบบ่อย
            เอกสารบริษัทอยู่ที่
            <NuxtLink to="/knowledge/downloads">หน้าดาวน์โหลด</NuxtLink>
          </p>
        </div>

        <div class="grid">
          <NuxtLink v-for="topic in knowledgeTopics" :key="topic.to" :to="topic.to" class="item">
            <div class="item__visual">
              <img :src="topic.image" :alt="topic.title" loading="lazy" width="640" height="360" />
            </div>
            <div class="item__body">
              <h2>{{ topic.title }}</h2>
              <p>{{ topic.desc }}</p>
              <span class="item__more">อ่านต่อ →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="ต้องการคำปรึกษาจากทีมวิศวกร?"
      description="ส่งบิลค่าไฟ ผังหลังคา หรือผังที่จอด เพื่อรับใบเสนอราคา Solar หรือ EV Station"
      primary-label="ขอใบเสนอราคา"
      primary-to="/contact/quotation"
      secondary-label="ดูโครงการ"
      secondary-to="/projects"
    />
  </div>
</template>

<script setup lang="ts">
import { knowledgeTopics } from '~/utils/knowledge'

usePageSeo({
  title: 'ศูนย์ความรู้โซล่าเซลล์และ EV Station',
  description:
    'ข่าวสาร บทความ ความรู้ Solar/EV กรณีศึกษาและ FAQ ติดตั้งโซล่าเซลล์และสถานีชาร์จรถไฟฟ้า โดย CX ENERTECH',
  path: '/knowledge',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ศูนย์ความรู้', path: '/knowledge' },
  ],
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
  margin-top: 2.5rem;
}
.item {
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  overflow: hidden;
  transition: transform 0.35s var(--ease), box-shadow 0.35s;
}
.item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(5, 46, 36, 0.1);
}
.item__visual {
  height: 160px;
  overflow: hidden;
  background: #0e1a2b;
}
.item__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.item__body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.25rem;
  flex: 1;
}
.item__body h2 {
  font-size: 1.2rem;
  color: var(--color-white);
  margin: 0;
}
.item__body p {
  font-size: 0.92rem;
  color: var(--color-muted);
  flex: 1;
}
.item__more {
  margin-top: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-lime);
}
</style>
