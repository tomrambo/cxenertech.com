import { seoRedirectTarget } from '../../app/utils/seo-redirects'

export function isIndexableArticle(article: { slug: string; seo?: { robots?: string } }) {
  const directives = (article.seo?.robots || '').toLowerCase().split(/[\s,]+/)
  return Boolean(article.slug) &&
    !directives.some((rule) => rule === 'noindex' || rule === 'none') &&
    !seoRedirectTarget(`/knowledge/articles/${article.slug}`)
}

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
  })[char]!)
}
