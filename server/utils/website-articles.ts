import { fetchCmmsArticleBySlug, fetchCmmsArticles, type CmmsArticle } from './cmms-posts'
import { getLocalArticleBySlug, listLocalArticles } from '../../app/utils/local-articles'
import type { Article } from '../../app/utils/articles'
import { normalizeArticleViewCount } from '../../app/utils/articles'
import { rewriteArticleLinks } from '../../app/utils/seo-links'
import { getArticleService } from '../../app/utils/article-service'

function asArticle(item: Article | CmmsArticle): Article {
  const service = getArticleService(item.slug)
  const content = item.content ? rewriteArticleLinks(item.content) : item.content
  const revised = content !== item.content || Boolean(service)
  const updatedAt = revised && (!item.updatedAt || Date.parse(item.updatedAt) < Date.parse('2026-09-12'))
    ? '2026-09-12T00:00:00+07:00'
    : item.updatedAt
  return {
    id: item.id,
    slug: item.slug,
    title: service?.title || item.title,
    excerpt: service?.description || item.excerpt,
    content,
    coverImage: item.coverImage,
    category: item.category,
    authorName: item.authorName,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    updatedAt,
    viewCount:
      item.viewCount === undefined
        ? undefined
        : normalizeArticleViewCount(item.viewCount),
    relatedService: service ? { path: service.path, label: service.label } : undefined,
    seo: service ? {
      ...item.seo,
      title: service.title,
      description: service.description,
      image: item.seo?.image || item.coverImage || null,
    } : item.seo,
  }
}

function mergeArticles(cmms: Array<Article | CmmsArticle>, category?: string): Article[] {
  const bySlug = new Map<string, Article>()
  for (const item of listLocalArticles()) bySlug.set(item.slug, asArticle(item))
  for (const item of cmms) bySlug.set(item.slug, asArticle(item))
  const merged = [...bySlug.values()].sort((a, b) => {
    const aTime = Date.parse(a.publishedAt || a.createdAt) || 0
    const bTime = Date.parse(b.publishedAt || b.createdAt) || 0
    return bTime - aTime
  })
  return category ? merged.filter((item) => item.category === category) : merged
}

export function listWebsiteArticles(category?: string, cmms: CmmsArticle[] = []) {
  return mergeArticles(cmms, category)
}

export async function resolveWebsiteArticles(event: Parameters<typeof fetchCmmsArticles>[0], category?: string) {
  try {
    const fetched = await fetchCmmsArticles(event, { category: undefined })
    const articles = mergeArticles(fetched.articles, category)
    return { articles, source: fetched.source as 'cmms' | 'local', total: articles.length }
  } catch {
    const articles = listLocalArticles(category).map(asArticle)
    return { articles, source: 'local' as const, total: articles.length }
  }
}

export async function resolveWebsiteArticle(
  event: Parameters<typeof fetchCmmsArticleBySlug>[0],
  slug: string,
) {
  try {
    const fetched = await fetchCmmsArticleBySlug(event, slug)
    if (fetched.article) return { article: asArticle(fetched.article), source: 'cmms' as const }
  } catch {
    // fall through to local
  }
  const local = getLocalArticleBySlug(slug)
  return { article: local ? asArticle(local) : null, source: 'local' as const }
}
