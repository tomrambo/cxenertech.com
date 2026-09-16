import { translate, type LocaleCode } from '~/utils/i18n'

export const ARTICLE_CATEGORIES = [
  { key: 'ev', label: 'EV Charging' },
  { key: 'solar', label: 'Solar' },
  { key: 'aircon', label: 'แอร์' },
  { key: 'electrical', label: 'ไฟฟ้า' },
  { key: 'guide', label: 'คู่มือ' },
  { key: 'news', label: 'ข่าวสาร' },
] as const

export type Article = {
  id: number | string
  slug: string
  title: string
  excerpt: string
  content?: string
  coverImage?: string | null
  category?: string | null
  authorName?: string | null
  publishedAt?: string
  createdAt: string
  updatedAt?: string
  viewCount?: number
  relatedService?: { path: string; label: string }
  faqs?: { q: string; a: string }[]
  seo?: {
    title: string
    description: string
    image: string | null
    robots?: string
  }
}

export function normalizeArticleViewCount(value: unknown) {
  const count = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0
}

export function formatArticleViews(
  value: unknown,
  locale: string | null | undefined = 'th',
) {
  const loc: LocaleCode = locale === 'en' ? 'en' : 'th'
  const count = normalizeArticleViewCount(value)
  const formatted = new Intl.NumberFormat(loc === 'en' ? 'en-US' : 'th-TH').format(count)
  if (loc === 'en') return `${formatted} ${count === 1 ? 'view' : 'views'}`
  return `อ่านแล้ว ${formatted} ครั้ง`
}

export function articleCategoryLabel(
  key: string | null | undefined,
  locale: string | null | undefined = 'th',
) {
  if (!key) return ''
  const loc: LocaleCode = locale === 'en' ? 'en' : 'th'
  const translated = translate(loc, `articles.cat.${key}`)
  if (translated !== `articles.cat.${key}`) return translated
  return ARTICLE_CATEGORIES.find((c) => c.key === key)?.label ?? key
}

export function articleDate(article: Pick<Article, 'publishedAt' | 'createdAt'>) {
  return article.publishedAt || article.createdAt
}

export function formatArticleDate(
  value: string | undefined,
  locale: string | null | undefined = 'th',
) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const loc: LocaleCode = locale === 'en' ? 'en' : 'th'
  return date.toLocaleDateString(loc === 'en' ? 'en-US' : 'th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
