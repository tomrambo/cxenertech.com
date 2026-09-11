import assert from 'node:assert/strict'
import { test } from 'node:test'
import { resolveSeoHref, rewriteArticleLinks } from '../app/utils/seo-links.ts'
import { SEO_REDIRECTS } from '../app/utils/seo-redirects.ts'
import { buildArticleJsonLd, serializeJsonLd } from '../app/utils/structured-data.ts'
import { buildProductJsonLd } from '../app/utils/product-jsonld.ts'
import { packageSlugForRate } from '../app/utils/price-rate-package.ts'
import { getArticleService } from '../app/utils/article-service.ts'
import { EV_SERVICE_AREAS } from '../app/utils/ev-service-areas.ts'
import { canonicalRedirect } from '../server/utils/canonical-url.ts'
import { escapeXml, isIndexableArticle } from '../server/utils/sitemap-entry.ts'
import { createApp, defineEventHandler, toPlainHandler, toWebHandler } from 'h3'
import canonicalMiddleware from '../server/middleware/canonical-host.ts'

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
  const input = { name: 'Solar', description: 'แพ็กเกจ', sku: 'SOL-1', image: 'https://example.test/solar.jpg', url: 'https://example.test/solar', price: 120000 }
  const result = buildProductJsonLd(input)
  const offer = result.offers as Record<string, unknown>
  assert.equal(offer.price, '120000.00')
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
