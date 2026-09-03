<script setup lang="ts">
import { filterProjects } from '~/utils/projects'

const route = useRoute()
const category = computed(() => (route.query.category as string) || 'all')
const list = computed(() => filterProjects(category.value))

const filters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'Solar', value: 'solar' },
  { label: 'EV Charging', value: 'ev' },
  { label: 'EPC', value: 'epc' },
]

usePageSeo({
  title: 'โครงการโซล่าเซลล์และ EV Station',
  description: 'ผลงานติดตั้งโซล่าเซลล์โรงงาน คลังสินค้า และสถานีชาร์จรถไฟฟ้า โดย CX ENERTECH',
  path: '/projects',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ผลงาน', path: '/projects' },
  ],
})
</script>

<template>
  <div>
    <PageHero
      title="ผลงานโครงการ"
      description="งานติดตั้งโซล่าเซลล์และ EV Station ที่ส่งมอบแล้ว ใช้ยืนยันว่าทีมลงหน้างานได้จริง"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'ผลงาน' }]"
    />

    <section class="section">
      <div class="container">
        <div class="filters">
          <NuxtLink
            v-for="f in filters"
            :key="f.value"
            :to="f.value === 'all' ? '/projects' : `/projects?category=${f.value}`"
            class="filter"
            :class="{ 'filter--active': category === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
        </div>

        <div class="grid">
          <NuxtLink
            v-for="p in list"
            :key="p.slug"
            :to="`/projects/${p.slug}`"
            class="item"
          >
            <div class="item__visual">
              <img :src="p.image" :alt="p.title" loading="lazy" width="640" height="360" />
            </div>
            <div class="item__body">
              <span class="item__cat">{{ p.categoryLabel }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.capacity }} · {{ p.location }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.filter {
  padding: 0.55rem 1.15rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-white);
  border: 1.5px solid var(--color-mist);
  background: var(--color-panel);
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.filter--active,
.filter:hover {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.item {
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
  transition: transform 0.5s var(--ease);
}

.item:hover .item__visual img {
  transform: scale(1.04);
}

.item__body {
  padding: 1.35rem;
}

.item__cat {
  font-size: 0.7rem;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-teal);
}

.item__body h3 {
  font-size: 1.1rem;
  color: var(--color-white);
  margin: 0.4rem 0 0.35rem;
}

.item__body p {
  font-size: 0.9rem;
  color: var(--color-muted);
}
</style>
