<script setup lang="ts">
import { getProject } from '~/utils/projects'
import { knowledgeCases } from '~/utils/knowledge'

const cases = knowledgeCases
  .map((item) => {
    const project = getProject(item.slug)
    return project ? { ...item, project } : null
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item))

usePageSeo({
  title: 'กรณีศึกษาโซล่าเซลล์และ EV Station',
  description:
    'กรณีศึกษาโครงการ Solar Rooftop โรงงาน คลังสินค้า สถานีชาร์จ DC และ EV Hub โดย CX ENERTECH',
  path: '/knowledge/case-studies',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ศูนย์ความรู้', path: '/knowledge' },
    { name: 'กรณีศึกษา', path: '/knowledge/case-studies' },
  ],
})
</script>

<template>
  <div>
    <PageHero
      title="กรณีศึกษา — โครงการ Solar และ EV ที่ส่งมอบจริง"
      description="บทเรียนจากโรงงาน คลังสินค้า สถานี DC Hub และโซลาร์บ้าน ที่ทีม CX ENERTECH ดูแลหน้างาน"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'กรณีศึกษา' },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            กรณีศึกษาด้านล่างย่อจากโครงการอ้างอิง ไม่ใช่การรับประกันผลของทุกไซต์
            ใช้ดูแนวทางออกแบบ แล้วให้ทีมสำรวจพื้นที่ของคุณ
          </p>
        </div>

        <div class="grid">
          <NuxtLink
            v-for="item in cases"
            :key="item.slug"
            :to="`/knowledge/case-studies/${item.slug}`"
            class="item"
          >
            <div class="item__visual">
              <img :src="item.project.image" :alt="item.project.title" loading="lazy" width="640" height="360" />
            </div>
            <div class="item__body">
              <span>{{ item.project.categoryLabel }} · {{ item.project.capacity }}</span>
              <h2>{{ item.project.title }}</h2>
              <p>{{ item.lesson }}</p>
              <span class="item__more">อ่านกรณีศึกษา →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="อยากได้แนวทางคล้ายโครงการเหล่านี้?"
      description="ส่งรายละเอียดไซต์ เพื่อให้ทีมประเมินว่าโมเดลไหนใกล้เคียงที่สุด"
      primary-to="/contact/quotation"
      secondary-label="ดูโครงการทั้งหมด"
      secondary-to="/projects"
    />
  </div>
</template>

<style scoped>
.content-block { margin-bottom: 2rem; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}
.item {
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  overflow: hidden;
}
.item__visual { height: 180px; overflow: hidden; background: #0e1a2b; }
.item__visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
.item__body { display: flex; flex-direction: column; gap: 0.5rem; padding: 1.25rem; flex: 1; }
.item__body span:first-child {
  font-size: 0.72rem;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-teal);
}
.item__body h2 { font-size: 1.12rem; color: var(--color-white); margin: 0; }
.item__body p { font-size: 0.9rem; color: var(--color-muted); flex: 1; }
.item__more { color: var(--color-lime); font-family: var(--font-display); font-size: 0.82rem; font-weight: 600; }
</style>
