import { seoRedirectTarget } from './seo-redirects'

/** Rewrite only our known retired URLs, preserving campaign queries and anchors. */
export function resolveSeoHref(href: string): string {
  if (!href.startsWith('/') && !/^https?:\/\//i.test(href)) return href
  let url: URL
  try {
    url = new URL(href, 'https://www.cxenertech.com')
  } catch {
    return href
  }
  if (!['www.cxenertech.com', 'cxenertech.com'].includes(url.hostname)) return href
  const target = seoRedirectTarget(url.pathname)
  return target ? `${target}${url.search}${url.hash}` : href
}

export function rewriteArticleLinks(content: string): string {
  return content.replace(/(<a\b[^>]*?\bhref\s*=\s*)(["'])(.*?)\2/gi,
    (_match, prefix: string, quote: string, href: string) =>
      `${prefix}${quote}${resolveSeoHref(href)}${quote}`,
  )
}
