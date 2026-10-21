import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { resolveSeoHref, rewriteArticleLinks } from '../app/utils/seo-links.ts'
import { SEO_REDIRECTS } from '../app/utils/seo-redirects.ts'
import { SITE_STATIC_PATHS } from '../app/utils/sitemap-routes.ts'
import { buildArticleJsonLd, serializeJsonLd } from '../app/utils/structured-data.ts'
import { buildProductJsonLd, buildServiceJsonLd } from '../app/utils/product-jsonld.ts'
import { listWebsiteArticles, resolveWebsiteArticle } from '../server/utils/website-articles.ts'
import { getLocalArticleBySlug } from '../app/utils/local-articles.ts'
import { readLeadAttribution } from '../app/utils/lead-attribution.ts'
import { packageSlugForRate } from '../app/utils/price-rate-package.ts'
import { getArticleService } from '../app/utils/article-service.ts'
import { EV_SERVICE_AREAS } from '../app/utils/ev-service-areas.ts'
import { canonicalRedirect } from '../server/utils/canonical-url.ts'
import { escapeXml, isIndexableArticle } from '../server/utils/sitemap-entry.ts'
import { createApp, defineEventHandler, toPlainHandler, toWebHandler } from 'h3'
import canonicalMiddleware from '../server/middleware/canonical-host.ts'

function cmsArticle(slug: string) {
  return {
    id: 42, slug, title: 'CMS title', excerpt: 'CMS excerpt', content: '<p>CMS revised content</p>',
    coverImage: 'https://example.test/cms.jpg', category: 'news', authorName: 'CMS editor',
    publishedAt: '2026-09-20', createdAt: '2026-09-19', updatedAt: '2026-10-23', viewCount: 17,
    seo: { title: 'CMS SEO title', description: 'CMS SEO description', image: null, robots: 'noindex, nofollow' },
  }
}

test('untouched local fallback never overrides a CMS article or its indexing policy', () => {
  const remote = cmsArticle('solar-bess-rongngan-2569')
  const result = listWebsiteArticles(undefined, [remote]).find(item => item.slug === remote.slug)!
  assert.equal(result.content, remote.content)
  assert.equal(result.id, remote.id)
  assert.equal(result.authorName, remote.authorName)
  assert.equal(result.updatedAt, remote.updatedAt)
  assert.equal(result.seo?.robots, remote.seo.robots)
  assert.equal(isIndexableArticle(result), false)
})

test('maintained AEO copy keeps CMS identity, original publication and robots', () => {
  for (const slug of ['longthun-ev-station-khum-mai', 'dc-fast-charger-120-180-240kw', 'solar-khu-ev-charger-load', 'ppa-solar-rooftop-khue-arai']) {
    const remote = cmsArticle(slug)
    const local = getLocalArticleBySlug(slug)!
    const result = listWebsiteArticles(undefined, [remote]).find(item => item.slug === slug)!
    assert.equal(result.content, rewriteArticleLinks(local.content!))
    assert.deepEqual(result.directAnswer, local.directAnswer)
    assert.equal(result.id, remote.id)
    assert.equal(result.publishedAt, remote.publishedAt)
    assert.equal(result.createdAt, remote.createdAt)
    assert.equal(result.updatedAt, local.updatedAt)
    assert.equal(result.viewCount, remote.viewCount)
    assert.equal(result.coverImage, remote.coverImage)
    assert.equal(result.seo?.robots, remote.seo.robots)
    assert.equal(isIndexableArticle(result), false)
    assert.equal(buildArticleJsonLd(result, 'https://www.cxenertech.com').dateModified, '2026-10-21T17:00:00.000Z')
  }
})

test('article detail uses the same ownership and robots rules as the listing', async (t) => {
  const globals = globalThis as unknown as Record<string, unknown>
  const originalConfig = globals.useRuntimeConfig
  const originalFetch = globals.$fetch
  t.after(() => {
    if (originalConfig === undefined) delete globals.useRuntimeConfig
    else globals.useRuntimeConfig = originalConfig
    if (originalFetch === undefined) delete globals.$fetch
    else globals.$fetch = originalFetch
  })
  globals.useRuntimeConfig = () => ({ cmmsApiBaseUrl: 'https://example.test' })
  for (const slug of ['solar-bess-rongngan-2569', 'dc-fast-charger-120-180-240kw']) {
    globals.$fetch = async () => ({ item: cmsArticle(slug) })
    const result = await resolveWebsiteArticle({} as never, slug)
    const listed = listWebsiteArticles(undefined, [cmsArticle(slug)]).find(item => item.slug === slug)!
    assert.equal(result.article?.content, listed.content)
    assert.equal(result.article?.seo?.robots, 'noindex, nofollow')
    assert.equal(result.source, slug === 'solar-bess-rongngan-2569' ? 'cmms' : 'local')
  }
})

test('first landing and UTM survive quotation navigation and a reload in the same tab', () => {
  const values = new Map<string, string>()
  const storage = { getItem: (key: string) => values.get(key) || null, setItem: (key: string, value: string) => { values.set(key, value) } }
  const landing = readLeadAttribution('https://www.cxenertech.com/solar/ppa?utm_source=campaign&utm_medium=cpc&utm_campaign=solar&email=private@example.test#form', storage)
  assert.deepEqual(landing, { landing_page: '/solar/ppa', utm_source: 'campaign', utm_medium: 'cpc', utm_campaign: 'solar' })
  assert.deepEqual(readLeadAttribution('https://www.cxenertech.com/contact/quotation?type=solar', storage), landing)
  assert.deepEqual(readLeadAttribution('https://www.cxenertech.com/contact/quotation?utm_source=internal', storage), landing)
  assert.equal(JSON.stringify([...values.values()]).includes('private'), false)
  assert.equal(readLeadAttribution('https://example.test/contact?utm_source=user%40example.test').utm_source, '')
})

test('corrupt or blocked browser storage does not break lead collection', () => {
  for (const storage of [
    { getItem: () => '{broken', setItem: () => {} },
    { getItem: () => { throw new Error('blocked') }, setItem: () => { throw new Error('blocked') } },
    { getItem: () => JSON.stringify({ landing_page: '//untrusted.test/?email=private' }), setItem: () => {} },
  ]) {
    assert.deepEqual(readLeadAttribution('https://example.test/ev-charging?utm_source=search', storage), {
      landing_page: '/ev-charging', utm_source: 'search', utm_medium: '', utm_campaign: '',
    })
  }
})

test('public host normalization preserves path/query and leaves previews accessible', () => {
  for (const host of ['cxenertech.com', 'www.cxenertech.com']) {
    assert.equal(canonicalRedirect(new URL(`http://${host}/solar/10kw?utm_source=test&power=10`)),
      'https://www.cxenertech.com/solar/10kw?utm_source=test&power=10')
  }
  assert.equal(canonicalRedirect(new URL('https://cxenertech.com/contact')), 'https://www.cxenertech.com/contact')
  for (const url of ['https://www.cxenertech.com/solar', 'http://localhost:3017/solar', 'https://preview.workers.dev/solar']) {
    assert.equal(canonicalRedirect(new URL(url)), null)
  }
})

test('all configured redirects lead directly to a destination, without chains or loops', () => {
  for (const [from, to] of Object.entries(SEO_REDIRECTS)) {
    assert.notEqual(from, to)
    assert.equal(SEO_REDIRECTS[to], undefined, `${from} creates a redirect chain`)
  }
  assert.equal(SEO_REDIRECTS['/booking/flood'], '/flood-recovery')
})

test('HTTP middleware returns permanent redirects and respects HTTPS behind Cloudflare', async () => {
  const app = createApp().use(canonicalMiddleware).use(defineEventHandler(() => 'ok'))
  const handler = toWebHandler(app)
  const response = await handler(new Request('http://www.cxenertech.com/solar?x=1&y=2'))
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://www.cxenertech.com/solar?x=1&y=2')
  const post = await handler(new Request('http://www.cxenertech.com/redirect-check?x=1', { method: 'POST' }))
  assert.equal(post.status, 308)
  assert.equal(post.headers.get('location'), 'https://www.cxenertech.com/redirect-check?x=1')
  const https = await handler(new Request('https://www.cxenertech.com/solar'))
  assert.equal(https.status, 200)
  const proxy = await toPlainHandler(app)({ path: '/solar', headers: { host: 'www.cxenertech.com', 'x-forwarded-proto': 'https' } })
  assert.equal(proxy.status, 200)
  const worker = await handler(new Request('http://internal/solar'), {
    _platform: { cloudflare: { request: new Request('https://www.cxenertech.com/solar') } },
  })
  assert.equal(worker.status, 200)
  const spoofedHost = await handler(new Request('http://localhost:3017/solar', { headers: { 'x-forwarded-host': 'cxenertech.com' } }))
  assert.equal(spoofedHost.status, 200)
})

test('retired CMS links are repaired without touching external URLs or dropping attribution', () => {
  assert.equal(resolveSeoHref('/knowledge/articles/raka-tidtang-sola-cell?from=guide#price'),
    '/solar/rooftop/packages?from=guide#price')
  assert.equal(resolveSeoHref('https://cxenertech.com/knowledge/articles/kho-bai-sanoe-raka-sola-cell'), '/solar/quotation')
  for (const href of ['https://other.test/knowledge/articles/raka-tidtang-sola-cell', '//other.test/solar/products', 'mailto:hello@example.com', '#price']) {
    assert.equal(resolveSeoHref(href), href)
  }
  const html = '<p><a class="more" href="/knowledge/articles/solar-epc-rongngan?x=1&amp;y=2">EPC</a></p>'
  const rewritten = rewriteArticleLinks(html)
  assert.equal(rewritten, '<p><a class="more" href="/solar/epc?x=1&amp;y=2">EPC</a></p>')
  assert.equal(rewriteArticleLinks(rewritten), rewritten)
})

test('equipment rate links match published SKU/rate IDs, never a similarly powered model', () => {
  const catalog = [
    { code: 'CX-DC120-J', slug: 'cx-dc-120-j', price_rate_id: 'rate-dc-j-120', product_type: 'equipment' },
    { code: 'CX-DC180', slug: 'cx-dc-180', price_rate_id: 'rate-dc-j-180', product_type: 'equipment' },
    { code: 'CX-DC60-S', slug: 'cx-dc-60', price_rate_id: 'rate-dc-s-60', product_type: 'equipment', active: false },
  ]
  assert.equal(packageSlugForRate({ id: 'rate-dc-s-120', skuCode: 'CX-DC120-S' }, catalog), null)
  assert.equal(packageSlugForRate({ id: 'rate-dc-j-120', skuCode: 'CX-DC120-J' }, catalog), 'cx-dc-120-j')
  assert.equal(packageSlugForRate({ id: 'rate-dc-j-180', skuCode: 'CX-DC180-J' }, catalog), 'cx-dc-180')
  assert.equal(packageSlugForRate({ id: 'rate-dc-s-60', skuCode: 'CX-DC60-S' }, catalog), null)
  assert.equal(packageSlugForRate({ id: 'rate-dc-j-120', skuCode: 'CX-DC120-J' }, []), null)
})

test('article schema identifies the visible article, author, dates and existing image', () => {
  const article = {
    id: 1, slug: 'solar-guide', title: 'คู่มือโซลาร์', excerpt: 'เนื้อหาสรุป',
    createdAt: '2026-09-01T09:00:00+07:00', updatedAt: 'invalid',
    coverImage: '/images/solar.jpg', authorName: 'ทีม CX ENERTECH', category: 'solar',
  }
  const schema = buildArticleJsonLd(article, 'https://www.cxenertech.com/')
  assert.equal(schema['@type'], 'BlogPosting')
  assert.equal(schema.headline, article.title)
  assert.deepEqual(schema.image, ['https://www.cxenertech.com/images/solar.jpg'])
  assert.equal(schema.datePublished, '2026-09-01T02:00:00.000Z')
  assert.equal(schema.dateModified, undefined)
  assert.equal(schema.author['@type'], 'Organization')
  assert.deepEqual(schema.publisher, {
    '@type': 'Organization',
    name: 'CX ENERTECH',
    url: 'https://www.cxenertech.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.cxenertech.com/logo-on-dark.png',
    },
  })
  const news = buildArticleJsonLd({ ...article, category: 'news', authorName: 'ผู้เขียน', coverImage: null }, 'https://www.cxenertech.com')
  assert.equal(news['@type'], 'NewsArticle')
  assert.equal(news.author['@type'], 'Person')
  assert.equal(news.image, undefined)
})

test('JSON-LD cannot terminate its script tag through a CMS title', () => {
  const title = '</script><script>alert(1)</script>'
  const encoded = serializeJsonLd({ headline: title })
  assert.equal(encoded.includes('<'), false)
  assert.equal(JSON.parse(encoded).headline, title)
})

test('Product markup does not invent stock, delivery, returns or price expiry', () => {
  const input = { name: 'Solar', description: 'แพ็กเกจ', sku: 'SOL-1', image: 'https://example.test/solar.jpg', url: 'https://example.test/solar', price: 120000, priceIsExact: true }
  const result = buildProductJsonLd(input)
  const offer = result.offers as Record<string, unknown>
  assert.equal(offer.price, '120000.00')
  assert.equal(offer.priceSpecification, undefined)
  assert.equal(buildProductJsonLd({ ...input, priceIsExact: false }).offers, undefined)
  const { priceIsExact, ...referencePrice } = input
  assert.equal(buildProductJsonLd(referencePrice).offers, undefined)
  const service = buildServiceJsonLd(input)
  assert.equal(service['@type'], 'Service')
  assert.deepEqual(service.provider, { '@id': 'https://example.test/#business' })
  assert.equal('offers' in service, false)
  for (const field of ['availability', 'shippingDetails', 'hasMerchantReturnPolicy', 'priceValidUntil']) assert.equal(offer[field], undefined)
  assert.equal(buildProductJsonLd({ ...input, price: null }).offers, undefined)
  assert.equal((buildProductJsonLd({ ...input, priceValidUntil: '2027-01-31' }).offers as Record<string, unknown>).priceValidUntil, '2027-01-31')
})

test('sitemap excludes non-indexable/retired articles and escapes XML', () => {
  assert.equal(isIndexableArticle({ slug: 'current-article' }), true)
  for (const robots of ['noindex, follow', 'NONE', 'max-snippet:-1, NOINDEX']) {
    assert.equal(isIndexableArticle({ slug: 'hidden', seo: { robots } }), false)
  }
  assert.equal(isIndexableArticle({ slug: 'raka-tidtang-sola-cell' }), false)
  assert.equal(isIndexableArticle({ slug: '' }), false)
  assert.equal(escapeXml('https://example.test/a?a=1&b=<tag>'), 'https://example.test/a?a=1&amp;b=&lt;tag&gt;')
})

test('homepage source stays indexable and the sitemap omits redirect sources', () => {
  const home = readFileSync(new URL('../app/pages/index.vue', import.meta.url), 'utf8')
  assert.equal(/noindex/i.test(home), false)
  for (const path of SITE_STATIC_PATHS) {
    assert.equal(SEO_REDIRECTS[path], undefined, path)
  }
})

test('llms.txt points at the canonical www host', () => {
  const llms = readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8')
  assert.equal(llms.includes('https://cxenertech.com'), false)
  assert.equal(llms.includes('https://www.cxenertech.com/'), true)
})

test('each supported area has distinct survey checks and a guide-to-service link', () => {
  assert.equal(EV_SERVICE_AREAS.length, 18)
  const questions = new Set<string>()
  for (const area of EV_SERVICE_AREAS) {
    assert.equal(area.checks.length, 3)
    for (const question of area.checks) {
      assert.equal(questions.has(question), false)
      questions.add(question)
    }
    assert.equal(getArticleService(`tidtang-ev-station-${area.slug}`)?.path, `/ev-charging/thailand/${area.slug}`)
  }
  assert.equal(getArticleService('ev-station-120kw')?.path, '/ev-charging/120kw')
  assert.equal(getArticleService('unrelated-article'), undefined)
})
