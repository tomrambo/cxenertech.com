<script setup lang="ts">
import {
  articleCategoryLabel,
  articleDate,
  formatArticleDate,
  type Article,
} from '~/utils/articles'

const { t, locale } = useLocale()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, error } = await useFetch<{
  article: Article
  related: Article[]
}>(() => `/api/articles/${slug.value}`)

if (error.value || !data.value?.article) {
  throw createError({
    statusCode: error.value?.statusCode || 404,
    statusMessage: t('articles.notFound'),
  })
}

function hideBrokenImage(event: Event) {
  const el = event.target
  if (el instanceof HTMLImageElement) el.hidden = true
}

const article = computed(() => data.value!.article)
const related = computed(() => data.value?.related ?? [])
const coverBroken = ref(false)
watch(
  () => article.value.slug,
  () => {
    coverBroken.value = false
  },
)
const seoTitle = computed(() => article.value.seo?.title || article.value.title)
const seoDescription = computed(
  () => article.value.seo?.description || article.value.excerpt || article.value.title,
)

usePageSeo({
  title: seoTitle.value,
  description: seoDescription.value,
  path: `/knowledge/articles/${article.value.slug}`,
  image: article.value.seo?.image || article.value.coverImage || undefined,
  type: 'article',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ศูนย์ความรู้', path: '/knowledge' },
    { name: 'บทความ', path: '/knowledge/articles' },
    { name: article.value.title, path: `/knowledge/articles/${article.value.slug}` },
  ],
})
useSeoMeta({
  articlePublishedTime: () => articleDate(article.value) || undefined,
  articleModifiedTime: () => article.value.updatedAt || undefined,
  articleAuthor: () => article.value.authorName || 'CX ENERTECH',
  robots: () => article.value.seo?.robots || 'index, follow',
})
</script>

<template>
  <div v-if="article">
    <PageHero
      :title="article.title"
      :description="article.excerpt"
      :crumbs="[
        { label: t('common.home'), to: '/' },
        { label: t('nav.knowledge'), to: '/knowledge' },
        { label: t('articles.title'), to: '/knowledge/articles' },
        { label: article.title },
      ]"
    />

    <section class="section">
      <div class="container detail">
        <article class="detail__main">
          <div class="meta">
            <span v-if="article.category" class="meta__cat">
              {{ articleCategoryLabel(article.category, locale) }}
            </span>
            <time
              v-if="articleDate(article)"
              :datetime="articleDate(article)"
            >
              {{ formatArticleDate(articleDate(article), locale) }}
            </time>
            <span v-if="article.authorName">{{ article.authorName }}</span>
          </div>

          <div v-if="article.coverImage && !coverBroken" class="hero-visual">
            <img
              :src="article.coverImage"
              :alt="article.title"
              loading="lazy"
              width="1200"
              height="675"
              decoding="async"
              referrerpolicy="no-referrer"
              @error="coverBroken = true"
            />
          </div>

          <div
            v-if="article.content"
            class="prose"
            v-html="article.content"
          />
          <p v-else-if="article.excerpt" class="fallback">{{ article.excerpt }}</p>
        </article>

        <aside class="detail__aside">
          <div class="aside-box">
            <h2>{{ t('articles.related') }}</h2>
            <ul v-if="related.length" class="related">
              <li v-for="item in related" :key="item.slug">
                <NuxtLink :to="`/knowledge/articles/${item.slug}`" class="related__link">
                  <img
                    v-if="item.coverImage"
                    :src="item.coverImage"
                    alt=""
                    width="72"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    referrerpolicy="no-referrer"
                    @error="hideBrokenImage"
                  />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </li>
            </ul>
            <p v-else class="aside-empty">{{ t('articles.empty') }}</p>
            <NuxtLink to="/knowledge/articles" class="aside-link">{{ t('articles.back') }}</NuxtLink>
            <NuxtLink to="/contact/quotation" class="btn btn-primary aside-cta">
              {{ t('cta.quote') }}
            </NuxtLink>
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

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.1rem;
  font-size: 0.75rem;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-teal);
  margin-bottom: 1.25rem;
}

.hero-visual {
  margin: 0 0 1.75rem;
  overflow: hidden;
  background: #0e1a2b;
}

.hero-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.fallback {
  color: var(--color-muted);
  max-width: 40rem;
}

.prose {
  max-width: 42rem;
  color: var(--color-muted);
  font-size: 1.02rem;
  line-height: 1.8;
}

.prose :deep(p + p) {
  margin-top: 1rem;
}

.prose :deep(h2),
.prose :deep(h3),
.prose :deep(h4) {
  color: var(--color-white);
  margin: 2rem 0 0.75rem;
}

.prose :deep(h2) {
  font-size: 1.45rem;
}

.prose :deep(h3) {
  font-size: 1.2rem;
  color: var(--color-lime-soft);
}

.prose :deep(a) {
  color: var(--color-lime);
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.prose :deep(ul),
.prose :deep(ol) {
  margin: 1rem 0;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.prose :deep(ul) {
  list-style: disc;
}

.prose :deep(ol) {
  list-style: decimal;
}

.prose :deep(li) {
  color: var(--color-muted);
}

.prose :deep(img) {
  margin: 1.5rem 0;
  width: 100%;
  height: auto;
}

.prose :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 0.75rem 0 0.75rem 1rem;
  border-left: 3px solid var(--color-lime);
  color: var(--color-white);
}

.aside-box {
  background: var(--color-panel);
  border-top: 3px solid var(--color-lime);
  padding: 1.75rem;
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}

.aside-box h2 {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.related {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.related__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-white);
  font-weight: 600;
  line-height: 1.4;
}

.related__link img {
  width: 72px;
  height: 48px;
  object-fit: cover;
  flex-shrink: 0;
  background: #0e1a2b;
}

.related__link:hover {
  color: var(--color-lime);
}

.aside-empty,
.aside-link {
  display: block;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.aside-link {
  margin-top: 1.15rem;
}

.aside-link:hover {
  color: var(--color-lime);
}

.aside-cta {
  margin-top: 1.25rem;
  width: 100%;
}

@media (max-width: 860px) {
  .detail {
    grid-template-columns: 1fr;
  }

  .aside-box {
    position: static;
  }
}
</style>
