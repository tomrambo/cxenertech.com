import { fetchCmmsArticleBySlug, fetchCmmsArticles, type CmmsArticle } from './cmms-posts'
import { getLocalArticleBySlug, listLocalArticles } from '../../app/utils/local-articles'
import type { Article } from '../../app/utils/articles'

function asArticle(item: Article | CmmsArticle): Article {
  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    coverImage: item.coverImage,
    category: item.category,
    authorName: item.authorName,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    seo: item.seo,
  }
}

function mergeArticles(cmms: Array<Article | CmmsArticle>, category?: string): Article[] {
  const bySlug = new Map<string, Article>()
  for (const item of listLocalArticles()) bySlug.set(item.slug, item)
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
    const articles = listLocalArticles(category)
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
  return { article: local, source: 'local' as const }
}
