import { SITE_STATIC_PATHS } from '../../app/utils/sitemap-routes'
import { SEO_REDIRECTS } from '../../app/utils/seo-redirects'
import { fetchCmmsSolarPackages } from '../utils/cmms-solar-packages'
import { fetchCmmsChargePackages } from '../utils/cmms-charge-packages'
import { resolveWebsiteArticles } from '../utils/website-articles'
import { knowledgeCases } from '../../app/utils/knowledge'

function origin() {
  const config = useRuntimeConfig()
  return String(config.public.siteUrl || 'https://www.cxenertech.com').replace(/\/$/, '')
}

function loc(path: string) {
  if (path === '/') return `${origin()}/`
  return `${origin()}${path}`
}

/** วันที่โครง SEO ล่าสุด — lastmod จริง ไม่ใส่วันที่วันนี้ทุกครั้ง เพราะ Google จะเลิกเชื่อ */
const SITE_CONTENT_UPDATED = '2026-09-03'

function isoDate(value: string | undefined) {
  if (!value) return SITE_CONTENT_UPDATED
  const parsed = Date.parse(value)
  if (!Number.isFinite(parsed)) return SITE_CONTENT_UPDATED
  return new Date(parsed).toISOString().slice(0, 10)
}

function urlEntry(path: string, lastmod = SITE_CONTENT_UPDATED) {
  return `  <url><loc>${loc(path)}</loc><lastmod>${lastmod}</lastmod></url>`
}

export default defineEventHandler(async (event) => {
  const lastmodByPath = new Map<string, string>()
  const paths = new Set<string>(SITE_STATIC_PATHS.filter((path) => !SEO_REDIRECTS[path]))
  try {
    const { packages } = await fetchCmmsSolarPackages(event)
    for (const pkg of packages) {
      if (!pkg.slug) continue
      const path = `/solar/rooftop/packages/${pkg.slug}`
      paths.add(path)
      lastmodByPath.set(path, isoDate(pkg.effective_from))
    }
  } catch {
    // static paths still publish even if the catalog is unavailable
  }
  try {
    const { packages } = await fetchCmmsChargePackages(event)
    for (const pkg of packages) {
      if (!pkg.slug) continue
      const path = `/ev-charging/packages/${pkg.slug}`
      paths.add(path)
    }
  } catch {
    // keep static paths if EV catalog is unavailable
  }
  try {
    const { articles } = await resolveWebsiteArticles(event)
    for (const article of articles) {
      if (!article.slug) continue
      const path = `/knowledge/articles/${article.slug}`
      paths.add(path)
      lastmodByPath.set(path, isoDate(article.updatedAt || article.publishedAt || article.createdAt))
    }
  } catch {
    // keep static paths if CMMS articles are unavailable
  }
  for (const item of knowledgeCases) {
    paths.add(`/knowledge/case-studies/${item.slug}`)
  }

  const urls = [...paths]
    .map((path) => urlEntry(path, lastmodByPath.get(path) || SITE_CONTENT_UPDATED))
    .join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=300, must-revalidate')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
