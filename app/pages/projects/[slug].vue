<script setup lang="ts">
import { getProject } from '~/utils/projects'

const route = useRoute()
const project = computed(() => getProject(route.params.slug as string))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: `${project.value.title} | CX ENERTECH`,
  description: project.value.overview,
})
</script>

<template>
  <div v-if="project">
    <PageHero
      :title="project.title"
      :description="`${project.capacity} · ${project.location}`"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'Projects', to: '/projects' },
        { label: project.title },
      ]"
    />

    <section class="section">
      <div class="container detail">
        <div class="detail__main">
          <span class="section-label">{{ project.categoryLabel }}</span>
          <h2 class="section-title">Project Overview</h2>
          <p>{{ project.overview }}</p>

          <h3>Scope of Work</h3>
          <ul class="checklist">
            <li v-for="s in project.scope" :key="s">{{ s }}</li>
          </ul>

          <h3>Capacity</h3>
          <p class="capacity">{{ project.capacity }}</p>

          <h3>Technology</h3>
          <ul class="checklist">
            <li v-for="t in project.technology" :key="t">{{ t }}</li>
          </ul>

          <h3>Gallery</h3>
          <div class="gallery">
            <div class="gallery__item" :class="`gallery__item--${project.category}`" />
            <div class="gallery__item gallery__item--alt" />
            <div class="gallery__item" :class="`gallery__item--${project.category}`" />
          </div>

          <h3>Results</h3>
          <ul class="checklist">
            <li v-for="r in project.results" :key="r">{{ r }}</li>
          </ul>
        </div>

        <aside class="detail__aside">
          <div class="aside-box">
            <h4>สนใจโครงการคล้ายกัน?</h4>
            <p>ทีมเราพร้อมออกแบบโซลูชันให้เหมาะกับไซต์ของคุณ</p>
            <NuxtLink to="/contact/quotation" class="btn btn-primary">ขอใบเสนอราคา</NuxtLink>
            <NuxtLink to="/projects" class="aside-link">← กลับไปโครงการทั้งหมด</NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  align-items: start;
}

.detail__main h3 {
  font-size: 1.25rem;
  color: var(--color-white);
  margin: 2.25rem 0 0.85rem;
}

.detail__main > p {
  color: var(--color-muted);
  max-width: 40rem;
}

.capacity {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-teal);
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checklist li {
  padding-left: 1.25rem;
  position: relative;
  color: var(--color-muted);
}

.checklist li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 8px;
  height: 8px;
  background: var(--color-solar);
  border-radius: 1px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.gallery__item {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--color-forest-mid), var(--color-teal));
}

.gallery__item--solar {
  background: linear-gradient(135deg, #0a4a3a, #f0a20266);
}
.gallery__item--ev {
  background: linear-gradient(135deg, #0a3d48, #1aa6a0);
}
.gallery__item--epc {
  background: linear-gradient(135deg, #052e24, #0f5c48);
}
.gallery__item--alt {
  background: linear-gradient(135deg, var(--color-mist), var(--color-forest-light));
  opacity: 0.7;
}

.aside-box {
  background: var(--color-forest);
  color: var(--color-cream);
  padding: 1.75rem;
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}

.aside-box h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.aside-box p {
  font-size: 0.9rem;
  opacity: 0.75;
  margin-bottom: 1.25rem;
}

.aside-link {
  display: block;
  margin-top: 1rem;
  font-size: 0.85rem;
  opacity: 0.7;
}

.aside-link:hover {
  opacity: 1;
  color: var(--color-solar);
}

@media (max-width: 860px) {
  .detail {
    grid-template-columns: 1fr;
  }

  .aside-box {
    position: static;
  }

  .gallery {
    grid-template-columns: 1fr;
  }
}
</style>
