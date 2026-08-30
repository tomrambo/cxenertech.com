<script setup lang="ts">
import {
  ARTICLE_CATEGORIES,
  articleCategoryLabel,
  articleDate,
  formatArticleDate,
  type Article,
} from '~/utils/articles'

const route = useRoute()
const category = computed(() => {
  const value = typeof route.query.category === 'string' ? route.query.category.trim() : ''
  return ARTICLE_CATEGORIES.some((c) => c.key === value) ? value : ''
})

const { data, pending, error } = await useFetch<{ articles: Article[] }>(
  '/api/articles',
  {
    query: computed(() => (category.value ? { category: category.value } : {})),
    watch: [category],
  },
)

const articles = computed(() => data.value?.articles ?? [])
const failedCovers = reactive(new Set<string>())

function markCoverFailed(slug: string) {
  failedCovers.add(slug)
}

const showFilters = computed(
  () => Boolean(category.value) || articles.value.some((a) => a.category),
)

function categoryLink(value: string) {
  return value ? `/knowledge/articles?category=${value}` : '/knowledge/articles'
}

const { t, locale } = useLocale()

useSeoMeta({
  title: () => t('articles.seoTitle'),
  description: () => t('articles.seoDescription'),
})
</script>

<template>
  <div>
    <PageHero
      :title="t('articles.title')"
      :description="t('articles.description')"
      :crumbs="[
        { label: t('common.home'), to: '/' },
        { label: t('nav.knowledge'), to: '/knowledge' },
        { label: t('articles.title') },
      ]"
    />

    <section class="section">
      <div class="container">
        <div v-if="showFilters" class="filters">
          <NuxtLink
            to="/knowledge/articles"
            class="filter"
            :class="{ 'filter--active': !category }"
          >
            {{ t('articles.all') }}
          </NuxtLink>
          <NuxtLink
            v-for="f in ARTICLE_CATEGORIES"
            :key="f.key"
            :to="categoryLink(f.key)"
            class="filter"
            :class="{ 'filter--active': category === f.key }"
          >
            {{ articleCategoryLabel(f.key, locale) }}
          </NuxtLink>
        </div>

        <div v-if="pending" class="skel-grid" aria-hidden="true">
          <div v-for="n in 3" :key="n" class="skel" />
        </div>

        <p v-else-if="error" class="state state--error">
          {{ t('articles.loadError') }}
        </p>

        <div v-else-if="articles.length" class="grid">
          <NuxtLink
            v-for="article in articles"
            :key="article.slug"
            :to="`/knowledge/articles/${article.slug}`"
            class="item"
          >
            <div
              v-if="article.coverImage && !failedCovers.has(article.slug)"
              class="item__visual"
            >
              <img
                :src="article.coverImage"
                :alt="article.title"
                loading="lazy"
                width="640"
                height="360"
                decoding="async"
                referrerpolicy="no-referrer"
                @error="markCoverFailed(article.slug)"
              />
            </div>
            <div class="item__body">
              <div class="item__meta">
                <span v-if="article.category" class="item__cat">
                  {{ articleCategoryLabel(article.category, locale) }}
                </span>
                <time
                  v-if="articleDate(article)"
                  class="item__date"
                  :datetime="articleDate(article)"
                >
                  {{ formatArticleDate(articleDate(article), locale) }}
                </time>
              </div>
              <h2>{{ article.title }}</h2>
              <p v-if="article.excerpt">{{ article.excerpt }}</p>
              <span class="item__more">{{ t('common.readMore') }}</span>
            </div>
          </NuxtLink>
        </div>

        <p v-else class="state">{{ t('articles.empty') }}</p>
      </div>
    </section>

    <CtaBand
      :title="t('articles.ctaTitle')"
      :description="t('articles.ctaDescription')"
    />
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

.skel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.skel {
  min-height: 220px;
  background: linear-gradient(
    90deg,
    var(--color-panel) 0%,
    var(--color-panel-2) 50%,
    var(--color-panel) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s ease-in-out infinite;
}

@keyframes shimmer {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: -100% 0;
  }
}

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
  transition: transform 0.35s var(--ease), box-shadow 0.35s;
}

.item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(5, 46, 36, 0.1);
}

.item__visual {
  height: 200px;
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.35rem;
  flex: 1;
}

.item__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.item__cat,
.item__date {
  font-size: 0.7rem;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-teal);
}

.item__body h2 {
  font-size: 1.15rem;
  color: var(--color-white);
  margin: 0;
}

.item__body p {
  font-size: 0.92rem;
  color: var(--color-muted);
  flex: 1;
}

.item__more {
  margin-top: 0.5rem;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-lime);
}

.state {
  color: var(--color-muted);
}

.state--error {
  color: var(--color-gold);
}
</style>
