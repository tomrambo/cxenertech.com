export type SeoCrumb = { name: string; path: string }
export type SeoFaq = { q: string; a: string }

export function siteOrigin() {
  const config = useRuntimeConfig()
  return String(config.public.siteUrl || 'https://www.cxenertech.com').replace(/\/$/, '')
}

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${siteOrigin()}${path}`
}

export function usePageSeo(input: {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  robots?: string
  faq?: SeoFaq[]
  crumbs?: SeoCrumb[]
}) {
  const route = useRoute()
  const path = input.path ?? route.path
  const url = absoluteUrl(path)
  const title = /CX ENERTECH/i.test(input.title)
    ? input.title
    : `${input.title} | CX ENERTECH`
  const image = absoluteUrl(input.image || '/logo-on-dark.png')
  const robots = input.robots || 'index, follow'

  useSeoMeta({
    title,
    description: input.description,
    robots,
    ogTitle: title,
    ogDescription: input.description,
    ogType: input.type || 'website',
    ogUrl: url,
    ogImage: image,
    ogLocale: 'th_TH',
    ogSiteName: 'CX ENERTECH',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: input.description,
    twitterImage: image,
  })

  const graph: Record<string, unknown>[] = []
  if (input.crumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: input.crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    })
  }
  if (input.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: input.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: url }],
    script: graph.length
      ? [
          {
            key: 'ld-json',
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': graph,
            }),
          },
        ]
      : [],
  })
}
