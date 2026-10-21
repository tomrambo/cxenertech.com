---
audited_at: 2026-10-21
domain: cxenertech.com
origin: https://www.cxenertech.com
source_evidence: .seoagent/audit/evidence.md
findings_baseline: .seoagent/audit/findings.md
---

# Audit — cxenertech.com — 2026-10-21

Evidence: `.seoagent/audit/evidence.md` crawled https://www.cxenertech.com at 2026-10-21T06:44:36.011Z. `capture_complete: true`. 312/312 pages. `source_render: false`.

## Technical findings (from live crawl)

findings.md reports **0 confirmed technical findings**. Carried forward in full: there is no rollup issue to list. Indexable pages have canonical, meta description, a single H1, structured data, image alt, and server-rendered content. robots.txt is HTTP 200 with no Disallow and `Sitemap: https://www.cxenertech.com/sitemap.xml`. Sitemap has 307 URLs.

Excluded on purpose (findings.md):

- Canonical points elsewhere: `/solar/rooftop/packages?power=3`, `/solar/rooftop/packages?power=20`
- `noindex`: `/career`, `/partners`, `/partners/become-a-partner`

Already present on the live homepage and must not be recommended as additions: title, meta description, canonical, Open Graph, Twitter card, JSON-LD `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`. Article URLs already serve `BlogPosting` or `NewsArticle`. Package URLs already serve `Product`. `/flood-recovery` already serves `Service`. `/llms.txt` and `/.well-known/okf/index.md` returned 200 on 2026-10-21.

## AEO gaps (detail in repo root `AEO_AUDIT_RESULTS.md`)

These are outside the crawl rollup. Confidence is labeled in that file.

- Priority URLs are thin in evidence.md body-word counts: `/ev-charging/station/transformer` 68, `/knowledge/articles/dc-fast-charger-120-180-240kw` 98, `/knowledge/articles/longthun-ev-station-khum-mai` 74, `/knowledge/articles/solar-khu-ev-charger-load` 98, `/knowledge/articles/ppa-solar-rooftop-khue-arai` 79, `/projects/factory-rooftop-2mw` 63. Confirmed.
- Six project/case-study slugs are published as ผลงาน without an evidence status. Whether each job is real is UNKNOWN.
- GSC indexing, GA4 leads, CrUX, and Cloudflare WAF are UNKNOWN.
- Live `llms.txt` links use `https://cxenertech.com` while the canonical host is `https://www.cxenertech.com`. Confirmed by fetch.

Indexing coverage not verified (needs Search Console via `seoagent login`).
