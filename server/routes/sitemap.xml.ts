import { SITE_STATIC_PATHS } from '../../app/utils/sitemap-routes'
import { fetchCmmsSolarPackages } from '../utils/cmms-solar-packages'
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

function urlEntry(path: string, changefreq = 'weekly') {
  return `  <url><loc>${loc(path)}</loc><changefreq>${changefreq}</changefreq></url>`
}

export default defineEventHandler(async (event) => {
  const paths = new Set<string>(SITE_STATIC_PATHS)
  try {
    const { packages } = await fetchCmmsSolarPackages(event)
    for (const pkg of packages) {
      if (pkg.slug) paths.add(`/solar/rooftop/packages/${pkg.slug}`)
    }
  } catch {
    // static paths still publish even if the catalog is unavailable
  }
  try {
    const { articles } = await resolveWebsiteArticles(event)
    for (const article of articles) {
      if (article.slug) paths.add(`/knowledge/articles/${article.slug}`)
    }
  } catch {
    // keep static paths if CMMS articles are unavailable
  }
  for (const item of knowledgeCases) {
    paths.add(`/knowledge/case-studies/${item.slug}`)
  }

  const urls = [...paths].map((path) => urlEntry(path)).join('\n')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
})
