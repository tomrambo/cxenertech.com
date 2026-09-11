import type { Article } from './articles'

/** Prevent CMS strings from closing an inline JSON-LD script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

function isoDate(value?: string) {
  if (!value || !Number.isFinite(Date.parse(value))) return undefined
  return new Date(value).toISOString()
}

export function buildArticleJsonLd(article: Article, origin: string) {
  const base = origin.replace(/\/$/, '')
  const url = `${base}/knowledge/articles/${encodeURIComponent(article.slug)}`
  const cover = article.seo?.image || article.coverImage
  const image = cover ? new URL(cover, `${base}/`).href : undefined
  return {
    '@context': 'https://schema.org',
    '@type': article.category === 'news' ? 'NewsArticle' : 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: article.title,
    description: article.seo?.description || article.excerpt,
    ...(image ? { image: [image] } : {}),
    datePublished: isoDate(article.publishedAt || article.createdAt),
    dateModified: isoDate(article.updatedAt),
    author: article.authorName
      ? {
          '@type': /CX ENERTECH/i.test(article.authorName) ? 'Organization' : 'Person',
          name: article.authorName,
          ...(/CX ENERTECH/i.test(article.authorName) ? { url: `${base}/about` } : {}),
        }
      : { '@type': 'Organization', name: 'CX ENERTECH', url: `${base}/about` },
    publisher: { '@type': 'Organization', name: 'CX ENERTECH', url: base },
  }
}
