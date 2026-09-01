<script setup lang="ts">
import { articleDate, formatArticleDate, type Article } from '~/utils/articles'

const { data, pending, error } = await useFetch<{ articles: Article[] }>('/api/articles', {
  query: { category: 'news' },
})
const news = computed(() => data.value?.articles ?? [])

usePageSeo({
  title: 'ข่าวสารโซล่าเซลล์และ EV Station',
  description:
    'ข่าวสาร CX ENERTECH อัปเดตแพ็กเกจโซลาร์ แนวโน้ม EV Station และมาตรฐานติดตั้งสถานีชาร์จ',
  path: '/knowledge/news',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ศูนย์ความรู้', path: '/knowledge' },
    { name: 'ข่าวสาร', path: '/knowledge/news' },
  ],
})
</script>

<template>
  <div>
    <PageHero
      title="ข่าวสาร — อัปเดต Solar และ EV Station"
      description="เรื่องที่กำลังเกิดขึ้นในงานติดตั้งโซล่าเซลล์และสถานีชาร์จรถยนต์ไฟฟ้า"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ความรู้', to: '/knowledge' },
        { label: 'ข่าวสาร' },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="content-block">
          <p>
            ข่าวสารของ CX ENERTECH เน้นเรื่องที่ใช้ตัดสินใจลงทุน ไม่ใช่โฆษณาว่าง
            อ่านรายละเอียดเต็มในบทความ หรือไปต่อที่ความรู้ Solar / EV
          </p>
        </div>

        <p v-if="pending" class="state">กำลังโหลดข่าวสาร…</p>
        <p v-else-if="error" class="state">โหลดไม่สำเร็จ ลองรีเฟรชอีกครั้ง</p>
        <p v-else-if="!news.length" class="state">
          ยังไม่มีข่าวสารในขณะนี้ —
          <NuxtLink to="/knowledge/articles">อ่านบทความความรู้</NuxtLink>
        </p>
        <div v-else class="grid">
          <NuxtLink v-for="item in news" :key="item.slug" :to="`/knowledge/articles/${item.slug}`" class="item">
            <div v-if="item.coverImage" class="item__visual">
              <img :src="item.coverImage" :alt="item.title" loading="lazy" width="640" height="360" />
            </div>
            <div class="item__body">
              <time v-if="articleDate(item)" :datetime="articleDate(item)">
                {{ formatArticleDate(articleDate(item), 'th') }}
              </time>
              <h2>{{ item.title }}</h2>
              <p>{{ item.excerpt }}</p>
              <span class="item__more">อ่านข่าว →</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="อยากคุยรายละเอียดโครงการ?"
      description="ทีม CX ENERTECH พร้อมออกแบบโซลาร์และ EV Station ตามไซต์ของคุณ"
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
.item__body time {
  font-size: 0.72rem;
  font-family: var(--font-display);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-teal);
}
.item__body h2 { font-size: 1.12rem; color: var(--color-white); margin: 0; }
.item__body p { font-size: 0.9rem; color: var(--color-muted); flex: 1; }
.item__more { color: var(--color-lime); font-family: var(--font-display); font-size: 0.82rem; font-weight: 600; }
.state { color: var(--color-muted); }
</style>
