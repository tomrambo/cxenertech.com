<script setup lang="ts">
import { getKnowledgeCase, knowledgeCases } from '~/utils/knowledge'

const route = useRoute()
const item = getKnowledgeCase(String(route.params.slug || ''))
if (!item) {
  throw createError({ statusCode: 404, statusMessage: 'ไม่พบกรณีศึกษา' })
}

const related = knowledgeCases
  .filter((c) => c.slug !== item.slug)
  .map((c) => getKnowledgeCase(c.slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))
  .slice(0, 3)

usePageSeo({
  title: `กรณีศึกษา: ${item.project.title}`,
  description: item.lesson,
  path: `/knowledge/case-studies/${item.slug}`,
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ศูนย์ความรู้', path: '/knowledge' },
    { name: 'กรณีศึกษา', path: '/knowledge/case-studies' },
    { name: item.project.title, path: `/knowledge/case-studies/${item.slug}` },
  ],
})
</script>

<template>
  <div>
    <PageHero
      :title="item.project.title"
      :description="`${item.project.capacity} · ${item.project.location}`"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'กรณีศึกษา', to: '/knowledge/case-studies' },
        { label: item.project.title },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="content-block">
          <p><strong>บทเรียน:</strong> {{ item.lesson }}</p>
          <h2>โจทย์ของไซต์</h2>
          <p>{{ item.challenge }}</p>
          <p>{{ item.project.overview }}</p>
          <h2>แนวทางที่ทำ</h2>
          <ul>
            <li v-for="step in item.approach" :key="step">{{ step }}</li>
          </ul>
          <h2>ผลที่วัดได้</h2>
          <ul>
            <li v-for="r in item.project.results" :key="r">{{ r }}</li>
          </ul>
          <p>
            รายละเอียดโครงการเต็มอยู่ที่
            <NuxtLink :to="`/projects/${item.slug}`">หน้าโครงการ</NuxtLink>
            หากโจทย์ใกล้เคียง เริ่มจาก
            <NuxtLink :to="item.quoteCta.to">{{ item.quoteCta.label }}</NuxtLink>
          </p>
        </div>

        <div class="sub-links" style="margin-top: 2rem">
          <NuxtLink
            v-for="c in related"
            :key="c.slug"
            :to="`/knowledge/case-studies/${c.slug}`"
            class="sub-link"
          >
            {{ c.project.title }} <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="สนใจงานลักษณะเดียวกัน?"
      :description="`ส่งรายละเอียดไซต์ เพื่อประเมินงานคล้าย ${item.project.title}`"
      primary-to="/contact/quotation"
      secondary-label="กรณีศึกษาทั้งหมด"
      secondary-to="/knowledge/case-studies"
    />
  </div>
</template>
