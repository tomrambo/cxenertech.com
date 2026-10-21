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
    contentSource: 'contentSource' in item ? item.contentSource : undefined,
    viewCount:
      item.viewCount === undefined
        ? undefined
        : normalizeArticleViewCount(item.viewCount),
    relatedService: service
      ? { path: service.path, label: service.label }
      : 'relatedService' in item
        ? item.relatedService
        : undefined,
    faqs: 'faqs' in item ? item.faqs : undefined,
    directAnswer: 'directAnswer' in item ? item.directAnswer : undefined,
    assumptions: 'assumptions' in item ? item.assumptions : undefined,
    sources: 'sources' in item ? item.sources : undefined,
    reviewerName: 'reviewerName' in item ? item.reviewerName : undefined,
    reviewedAt: 'reviewedAt' in item ? item.reviewedAt : undefined,
    reviewStatus: 'reviewStatus' in item ? item.reviewStatus : undefined,
    seo: service ? {
      ...item.seo,
      title: service.title,
      description: service.description,
      image: item.seo?.image || item.coverImage || null,
    } : item.seo,
  }
}

function maintainedArticle(local: Article, remote: Article | CmmsArticle): Article {
  if (local.contentSource !== 'local') return asArticle(remote)
  return asArticle({
    ...remote,
    contentSource: 'local',
    slug: local.slug,
    title: local.title,
    excerpt: local.excerpt,
    content: local.content || remote.content,
    category: local.category ?? remote.category,
    authorName: local.authorName || remote.authorName,
    publishedAt: remote.publishedAt || local.publishedAt,
    createdAt: remote.createdAt || local.createdAt,
    updatedAt: local.updatedAt,
    coverImage: remote.coverImage || local.coverImage,
    viewCount: remote.viewCount,
    faqs: local.faqs,
    directAnswer: local.directAnswer,
    assumptions: local.assumptions,
    sources: local.sources,
    reviewerName: local.reviewerName,
    reviewedAt: local.reviewedAt,
    reviewStatus: local.reviewStatus,
    relatedService: local.relatedService,
    seo: {
      title: local.seo?.title || local.title,
      description: local.seo?.description || local.excerpt,
      image: remote.seo?.image || remote.coverImage || local.seo?.image || local.coverImage || null,
      robots: [local.seo?.robots, remote.seo?.robots].filter(Boolean).join(', ') || undefined,
    },
  })
}

function mergeArticles(cmms: Array<Article | CmmsArticle>, category?: string): Article[] {
  const bySlug = new Map<string, Article>()
  for (const item of listLocalArticles()) bySlug.set(item.slug, asArticle(item))
  for (const item of cmms) {
    const local = bySlug.get(item.slug)
    bySlug.set(item.slug, local ? maintainedArticle(local, item) : asArticle(item))
  }
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
  const local = getLocalArticleBySlug(slug)
  try {
    const fetched = await fetchCmmsArticleBySlug(event, slug)
    if (fetched.article) {
      const article = local ? maintainedArticle(asArticle(local), fetched.article) : asArticle(fetched.article)
      return { article, source: local?.contentSource === 'local' ? 'local' as const : 'cmms' as const }
    }
  } catch {
    // fall through to local
  }
  return { article: local ? asArticle(local) : null, source: 'local' as const }
}
