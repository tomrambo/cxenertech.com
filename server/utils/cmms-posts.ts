/**
 * Public articles from bo-cx-cmms `/api/public/posts`.
 */

import type { H3Event } from 'h3'
import {
  fallbackCoverPath,
  firstHtmlImage,
  rewriteArticleLinks,
  rewriteHtmlMedia,
  toSiteMediaUrl,
} from './cmms-media'

export type CmmsArticleSeo = {
  title: string
  description: string
  image: string | null
  robots?: string
}

export type CmmsArticle = {
  id: number | string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string | null
  category: string | null
  authorName: string | null
  publishedAt: string
  createdAt: string
  updatedAt?: string
  seo?: CmmsArticleSeo
}

export type CmmsArticleFilters = {
  category?: string
  limit?: number
}

type CmmsListResponse = {
  items?: unknown[]
  pagination?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

function cmmsBase(event: H3Event) {
  const config = useRuntimeConfig(event)
  return String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
}

function errorMessage(err: unknown, fallback: string) {
  if (err && typeof err === 'object') {
    const e = err as {
      statusCode?: number
      status?: number
      data?: { message?: string; statusMessage?: string }
      message?: string
      statusMessage?: string
    }
    return {
      statusCode: e.statusCode || e.status || 502,
      message:
        e.data?.message ||
        e.data?.statusMessage ||
        e.message ||
        e.statusMessage ||
        fallback,
    }
  }
  return { statusCode: 502, message: fallback }
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function firstImage(raw: Record<string, unknown>) {
  const candidates = [
    raw.coverImage,
    raw.cover_image,
    raw.image,
    raw.cover,
    raw.thumbnail,
    raw.ogImage,
  ]
  for (const candidate of candidates) {
    const value = asString(candidate)
    if (value) return value
  }
  return null
}

function sanitizeArticleHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(?:href|src)\s*=\s*["']\s*javascript:[^"']*["']/gi, '')
}

function normalizeSeo(
  raw: Record<string, unknown>,
  fallback: { title: string; excerpt: string; image: string | null },
): CmmsArticleSeo {
  const seo =
    raw.seo && typeof raw.seo === 'object'
      ? (raw.seo as Record<string, unknown>)
      : {}
  return {
    title: asString(seo.title) || fallback.title,
    description: asString(seo.description) || fallback.excerpt || fallback.title,
    image: asString(seo.image) || fallback.image,
    robots: asString(seo.robots) || undefined,
  }
}

function normalizeArticle(raw: unknown): CmmsArticle | null {
  if (!raw || typeof raw !== 'object') return null
  const row = raw as Record<string, unknown>
  const slug = asString(row.slug)
  const title = asString(row.title)
  if (!slug || !title) return null

  const contentRaw = sanitizeArticleHtml(
    asString(row.content) || asString(row.body) || asString(row.html),
  )
  const excerpt = asString(row.excerpt)
  const coverImage = toSiteMediaUrl(
    firstImage(row) || firstHtmlImage(contentRaw) || fallbackCoverPath(slug),
  )
  const content = rewriteArticleLinks(rewriteHtmlMedia(contentRaw))
  const createdAt = asString(row.createdAt) || asString(row.created_at)
  const publishedAt =
    asString(row.publishedAt) || asString(row.published_at) || createdAt

  return {
    id: typeof row.id === 'number' || typeof row.id === 'string' ? row.id : slug,
    slug,
    title,
    excerpt,
    content,
    coverImage,
    category: asString(row.category) || null,
    authorName: asString(row.authorName) || asString(row.author_name) || null,
    publishedAt,
    createdAt,
    updatedAt: asString(row.updatedAt) || asString(row.updated_at) || undefined,
    seo: normalizeSeo(row, { title, excerpt, image: coverImage }),
  }
}

function requireBase(event: H3Event) {
  const base = cmmsBase(event)
  if (!base) {
    throw createError({
      statusCode: 503,
      statusMessage: 'ยังไม่ได้ตั้งค่า CMMS API สำหรับบทความ',
    })
  }
  return base
}

export async function fetchCmmsArticles(
  event: H3Event,
  filters?: CmmsArticleFilters,
): Promise<{ articles: CmmsArticle[]; source: 'cmms'; total: number }> {
  const base = requireBase(event)
  const query: Record<string, string> = {
    limit: String(filters?.limit && filters.limit > 0 ? Math.min(100, filters.limit) : 100),
  }
  if (filters?.category) query.category = filters.category

  try {
    const res = await $fetch<CmmsListResponse | unknown[]>(`${base}/api/public/posts`, {
      query,
    })
    const items = Array.isArray(res)
      ? res
      : Array.isArray(res.items)
        ? res.items
        : []
    const articles = items
      .map(normalizeArticle)
      .filter((item): item is CmmsArticle => Boolean(item))
      .sort((a, b) => {
        const aTime = Date.parse(a.publishedAt || a.createdAt) || 0
        const bTime = Date.parse(b.publishedAt || b.createdAt) || 0
        return bTime - aTime
      })
    const total =
      !Array.isArray(res) && typeof res.pagination?.total === 'number'
        ? res.pagination.total
        : articles.length
    return { articles, source: 'cmms', total }
  } catch (err) {
    const parsed = errorMessage(err, 'CMMS articles unavailable')
    throw createError({
      statusCode: parsed.statusCode >= 400 ? parsed.statusCode : 502,
      statusMessage: `CMMS articles: ${parsed.message}`,
    })
  }
}

export async function fetchCmmsArticleBySlug(
  event: H3Event,
  slug: string,
): Promise<{ article: CmmsArticle | null; source: 'cmms' }> {
  const base = requireBase(event)

  try {
    const res = await $fetch<unknown>(
      `${base}/api/public/posts/${encodeURIComponent(slug)}`,
    )
    const payload =
      res && typeof res === 'object' && 'item' in res
        ? (res as { item?: unknown }).item
        : res
    return { article: normalizeArticle(payload), source: 'cmms' }
  } catch (err) {
    const parsed = errorMessage(err, 'CMMS article unavailable')
    if (parsed.statusCode === 404) {
      return { article: null, source: 'cmms' }
    }
    throw createError({
      statusCode: parsed.statusCode >= 400 ? parsed.statusCode : 502,
      statusMessage: `CMMS article: ${parsed.message}`,
    })
  }
}
