<script setup lang="ts">
import {
  articleCategoryLabel,
  articleDate,
  formatArticleDate,
  formatArticleViews,
  normalizeArticleViewCount,
  type Article,
} from '~/utils/articles'
import { buildArticleJsonLd, serializeJsonLd } from '~/utils/structured-data'

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
const service = computed(() => article.value.relatedService)
const related = computed(() => data.value?.related ?? [])
const hasPublicViewCount = computed(() => article.value.viewCount !== undefined)
const displayedViewCount = ref(normalizeArticleViewCount(article.value.viewCount))
const coverBroken = ref(false)
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
  faq: article.value.faqs,
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
const articleOrigin = siteOrigin()
useHead(() => ({
  script: [{
    key: 'ld-article',
    type: 'application/ld+json',
    innerHTML: serializeJsonLd(buildArticleJsonLd(article.value, articleOrigin)),
  }],
}))

const READER_KEY = 'cx-article-reader'
const READER_RE = /^[a-zA-Z0-9_-]{8,80}$/

function articleReaderId() {
  if (typeof window === 'undefined' || !window.localStorage) return ''
  try {
    const existing = window.localStorage.getItem(READER_KEY)?.trim()
    if (existing && READER_RE.test(existing)) return existing
    const next =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `r${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`
    window.localStorage.setItem(READER_KEY, next)
    return next
  } catch {
    return ''
  }
}

let trackedSlug = ''

async function trackArticleView() {
  const current = article.value.slug
  if (!current || trackedSlug === current) return
  trackedSlug = current
  trackGtm('article_view', {
    article_slug: current,
    article_title: article.value.title,
    article_category: article.value.category || 'uncategorized',
  })
  if (!hasPublicViewCount.value) return
  const visitorId = articleReaderId()
  if (!visitorId) return
  try {
    const result = await $fetch<{ viewCount: number; counted: boolean }>(
      `/api/articles/${encodeURIComponent(current)}/view`,
      {
        method: 'POST',
        body: { visitorId },
      },
    )
    if (article.value.slug === current) {
      displayedViewCount.value = normalizeArticleViewCount(result.viewCount)
    }
  } catch {
    // Keep the last known count when the analytics service is unavailable.
  }
}

watch(
  () => article.value.slug,
  (current, previous) => {
    coverBroken.value = false
    displayedViewCount.value = normalizeArticleViewCount(article.value.viewCount)
    if (current !== previous && import.meta.client) void trackArticleView()
  },
)

onMounted(() => {
  void trackArticleView()
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
            <span v-if="hasPublicViewCount" class="meta__views" aria-live="polite">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.2 12s3.5-6 9.8-6 9.8 6 9.8 6-3.5 6-9.8 6-9.8-6-9.8-6Z" />
                <circle cx="12" cy="12" r="2.7" />
              </svg>
              {{ formatArticleViews(displayedViewCount, locale) }}
            </span>
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

          <p v-if="service" class="service-link">
            ต้องการประเมินไซต์หรือขอใบเสนอราคา?
            <NuxtLink :to="service.path">{{ service.label }}</NuxtLink>
          </p>

          <div
            v-if="article.content"
            class="prose"
            v-html="article.content"
          />
          <p v-else-if="article.excerpt" class="fallback">{{ article.excerpt }}</p>
          <div v-if="article.faqs?.length" class="seo-faq">
            <h2>คำถามที่พบบ่อย</h2>
            <details v-for="item in article.faqs" :key="item.q">
              <summary>{{ item.q }}</summary>
              <p>{{ item.a }}</p>
            </details>
          </div>
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

.meta__views {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.meta__views svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
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

.service-link {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 3px solid var(--color-lime);
  background: var(--color-panel);
  color: var(--color-muted);
}

.service-link a {
  color: var(--color-lime);
  text-decoration: underline;
  text-underline-offset: 0.2em;
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

.prose :deep(table) {
  width: 100%;
  margin: 1.25rem 0 1.75rem;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.prose :deep(th),
.prose :deep(td) {
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.65rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.prose :deep(th) {
  color: var(--color-white);
  background: rgba(212, 255, 0, 0.08);
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
}

.prose :deep(td) {
  color: var(--color-muted);
}

.seo-faq {
  max-width: 42rem;
  margin-top: 2.5rem;
}

.seo-faq h2 {
  color: var(--color-white);
  font-size: 1.45rem;
  margin-bottom: 0.75rem;
}

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
  color: var(--color-muted);
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
