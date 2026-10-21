# CX ENERTECH — AEO / GEO audit results

Audited: 2026-10-21  
Site: https://www.cxenertech.com  
Scope of the 2026-10-21 baseline: repository plus live origin; application code was unchanged during that audit. Subsequent local fixes are recorded below.  
Checklist: `CXENERTECH_AEO_AUDIT_ROADMAP.md`

Live evidence: `.seoagent/audit/evidence.md` (crawled https://www.cxenertech.com at 2026-10-21T06:44:36.011Z, `capture_complete: true`, 312/312 pages). Machine findings: `.seoagent/audit/findings.md` — **0 confirmed technical findings**. Indexing coverage in Google Search Console, GA4, CrUX, and Cloudflare WAF logs were not available in this session and stay **UNKNOWN**.

Status words: `PASS` verified, `FAIL` requirement not met, `PARTIAL` some of the requirement is met, `NOT APPLICABLE`, `UNKNOWN` not verified.

## Local implementation update — 2026-10-22 (not deployed)

The scoreboard below remains the **2026-10-21 production baseline**, not a claim about deployed fixes. Confirmed repository changes:

- **CMS ownership/indexing:** only four explicitly opted-in AEO articles (`contentSource: 'local'`) override remote copy. Other matching articles retain CMS copy. Both list and detail preserve CMS robots, IDs, original publication dates, images and views; locally maintained text uses its actual local modification date. Evidence: `server/utils/website-articles.ts`, regression tests in `tests/seo.test.ts`.
- **Attribution/events:** first landing pathname and allowlisted UTM labels persist in sessionStorage for the tab; blocked storage falls back to the in-memory plugin value. Quotation success emits both `generate_lead` and `quote_submit`; phone/LINE clicks retain their existing events. `consultation_request` means an explicit phone/LINE/form contact click from the site-survey page, not an accepted appointment or qualified lead. Evidence: `app/utils/lead-attribution.ts`, `app/plugins/lead-attribution.client.ts`, `useGtm.ts`, quotation and contact components.
- **Package schema:** custom solar installations and EV service/investment packages use `Service`. Equipment retains `Product`, without inventing an Offer from its recommended/reference price. The builder emits an Offer only when `priceIsExact` is explicitly true. No current catalog caller asserts that flag. Therefore equipment pages are not claimed to qualify for Google Product rich results. Evidence: `app/utils/product-jsonld.ts` and both package detail templates.
- **Content quality:** corrected total cabinet output versus per-connector sharing and AC input load. Added clearly illustrative kVA, simple-payback and hourly Solar+EV calculations. Added source links and source access dates for the power-sharing and kVA explanations. Five pilot pages expose editorial review status; no reviewer or approval was invented. Evidence: `local-articles.ts`, `ev-landings.ts`, `EditorialMeta.vue`.
- **Content map:** added primary keywords and repaired the three Solar+EV supporting links to the mapped article. Ownership assignments and a full cross-cluster link review remain pending. Evidence: `audit/content-map.csv`, `solar-ev-integration.vue`, `ev-landings.ts`, `local-articles.ts`.
- **CI:** added a separate pull-request workflow running SEO tests and the production build, without deployment credentials. Branch protection must require `SEO checks / check` to make it a merge gate. Evidence: `.github/workflows/seo-checks.yml`.

Validation: 17 SEO regression tests passed; Cloudflare production build passed; five local pilot routes returned HTTP 200 with one H1, server-rendered answer/editorial text and parseable JSON-LD. Browser smoke test navigated from `/solar/ppa` to quotation and submitted successfully to a localhost mock CMMS endpoint. No production lead was created. Real GA4 DebugView and CRM attribution/qualified-lead reconciliation remain unverified.

### Remaining work and release checks

- **AEO-001–004:** obtain GSC/GA4 baselines, URL Inspection and Cloudflare bot/WAF evidence; confirm bot policy with the owner.
- **AEO-101/102:** a real technical/commercial reviewer must approve engineering, price and ROI claims. The five pilot pages are marked pending. The remaining thin BESS/home-sizing/project pages and full editorial publishing workflow are not completed by this patch.
- **AEO-103:** the owner must classify each case study and provide publishable evidence/consent. No project was automatically labeled verified or illustrative.
- **AEO-104:** the inline quotation notice is not a complete privacy/terms/cookie policy or consent implementation. These require the company's actual handling/retention details.
- **AEO-106:** assign owners, validate the chosen targets against GSC and finish all supporting links before consolidation. No redirects were added from an unverified content map.
- **AEO-201:** use a single primary conversion in GA4 for a successful quote (`generate_lead` or `quote_submit`) to avoid double-counting the two aliases. Configure GTM/GA4 events and reconcile actual CRM lead IDs/statuses. No unverified extra fields were added to the CMMS request contract.
- **AEO-202/301/303:** repeatable 30-prompt benchmark, validated interactive ROI calculator and external authority work remain separate backlog items; the static ROI example is not a replacement calculator.
- **AEO-302:** configure required PR checks in repository branch protection and validate rendered production pages after deployment.

SEOAgent CLI was unavailable on PATH in this session; sync/verification/summary were not completed. Local inbox contains only its README with no queued actions. These source-render checks do not refresh the production crawl.

## Scoreboard

| ID | Status | Why |
|---|---|---|
| AEO-001 Inventory | PARTIAL | Framework, routes, and a live 312-page crawl exist. No `audit/page-inventory.csv`, no 3-month GSC export, no GA4 lead baseline. |
| AEO-002 Crawl/index | PARTIAL | Live `robots.txt` and `sitemap.xml` are healthy. GSC URL Inspection, port-80 redirect, and WAF asset access are UNKNOWN. |
| AEO-003 Server HTML | PASS | Crawled pages return 200 with server-rendered titles, H1s, and body text. Core Web Vitals and a formal accessibility audit are UNKNOWN. |
| AEO-004 Bot policy | PARTIAL | Live robots allows `*` plus `GPTBot`, `OAI-SearchBot`, and `ChatGPT-User`. Training vs search is not separated. Legal/Security approval and Cloudflare bot logs are UNKNOWN. |
| AEO-005 Metadata | PASS | Every crawled indexable page has a unique title, meta description, self canonical, one H1, Open Graph, and Twitter tags. `hreflang` is NOT APPLICABLE (no locale URLs). Article `dateModified` accuracy is PARTIAL. |
| AEO-101 Answer-first | FAIL | Landing and article patterns exist. Priority intents still lack a scoped answer block, and several target URLs are under 150 body words. |
| AEO-102 Editorial governance | FAIL | No author/reviewer workflow, source list, or `draft → review → published` status on the content model. |
| AEO-103 Case studies | FAIL | Six projects are published as ผลงาน with qualitative “results”. No `verified / illustrative / unpublished` field. Whether each job is real is UNKNOWN until the owner confirms it. |
| AEO-104 Company identity | PARTIAL | Legal name, Ladprao address, phone, LINE, and logo match across visible HTML and `LocalBusiness` JSON-LD. No privacy or terms route. `sameAs` is only the LINE URL. Licenses are UNKNOWN. |
| AEO-105 JSON-LD | PARTIAL | `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, `BlogPosting` / `NewsArticle`, and catalog `Product` are live. Service pages other than `/flood-recovery` have no page-level `Service`. Package `Offer` omits availability and uses the starting price as `price`. |
| AEO-106 Content map | FAIL | Overlapping URLs exist for price, ROI, AC/DC, hotel, PPA, and the same six project slugs. No content map. Ranking cannibalization is UNKNOWN without GSC. |
| AEO-201 Analytics | PARTIAL | GTM `GTM-5MKFVS3N` and GA4 `G-F07KKEFMP8` are in the live Nuxt payload. Events are `generate_lead`, `contact_channel`, `view_item`, `article_view`, `page_view`. The named lead events, CRM qualified-lead definition, and channel dashboard are absent. |
| AEO-202 Citation benchmark | FAIL | No 30-prompt harness or stored runs in the repo. |
| AEO-301 ROI calculator | PARTIAL | `/solar/payback` divides package `price_from` by `savings_monthly_thb` and labels it as a reference. `app/utils/ev-finance.ts` is not imported by any page. |
| AEO-302 CI checks | FAIL | `tests/seo.test.ts` exists. Neither GitHub workflow runs it. |
| AEO-303 External authority | UNKNOWN | No partnership or citation program was audited off-site. |

## Architecture inspected

Nuxt `^4.5.1`, Vue 3, Nitro on Cloudflare Pages (`package.json` script `nuxt build --preset cloudflare-pages`, `wrangler.toml`, `.github/workflows/cloudflare-pages.yml`). Rendering is server-side: `nuxt.config.ts` does not set `ssr: false`, and the crawl marked canonicals as server-rendered. There is no headless page shell.

Content sources:

- Service copy: `app/utils/solar-landings.ts`, `app/utils/ev-landings.ts`, rendered by `app/components/SolarLanding.vue` and `app/components/EvLanding.vue`.
- Articles: CMMS `NUXT_CMMS_API_BASE_URL` (default `https://bo-cx-cmms.conceptx.co.th`) merged in `server/utils/website-articles.ts`. CMMS rows overwrite the same slug from `app/utils/local-articles.ts` and `app/utils/seo-calendar-articles.ts`.
- Projects and case studies: `app/utils/projects.ts` and `app/utils/knowledge.ts`. The six slugs are duplicated at `/projects/{slug}` and `/knowledge/case-studies/{slug}`.
- Quotes: `server/api/contact/quotation.post.ts` POSTs to `{cmms}/api/public/quote-leads`.
- Locale: `app/composables/useLocale.ts` plus `LangSwitch.vue` is a cookie/UI toggle. `nuxt.config.ts` sets `html lang="th"`. There are no `/en/...` routes.

Public route families already in `app/utils/sitemap-routes.ts`: home, about, solar (including factory sizes, PPA, BESS, payback), EV (packages, 120/180/240 kW, station, approvals, transformer, Thailand locations), smart energy, projects, knowledge, contact/quotation. Retired URLs 301 in `app/utils/seo-redirects.ts` and `nuxt.config.ts` (`/blog` → `/knowledge/articles`). Career and partner forms are `noindex` and are not in the static sitemap.

## 1. Implemented features with evidence

**Crawl and host canonicalization.** Live `robots.txt` is HTTP 200, has no `Disallow`, and declares `Sitemap: https://www.cxenertech.com/sitemap.xml` (evidence.md § robots.txt). Live sitemap has 307 URLs and 90 article posts. `https://cxenertech.com/` returned one redirect to `https://www.cxenertech.com/` and HTTP 200. `https://www.cxenertech.com/blog` and `https://www.cxenertech.com/solar/epc/engineering` each redirected once to the canonical destination and returned 200. Repo rule: `server/utils/canonical-url.ts` sends `cxenertech.com` and `http` on the public hosts to `https://www.cxenertech.com` with 301 for GET/HEAD and 308 otherwise (`server/middleware/canonical-host.ts`). `tests/seo.test.ts` locks that behavior and rejects redirect chains.

**Indexable pages already have head metadata and one H1.** findings.md: every indexable crawled page passed canonical, meta description, single H1, structured data, image alt, and server-rendered content. Homepage evidence: title `CX ENERTECH | รับติดตั้งโซล่าเซลล์ และ EV Charging`, H1 `รับติดตั้ง โซล่าเซลล์ และ EV Charging`, canonical `https://www.cxenertech.com/`, JSON-LD `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, Open Graph and Twitter tags, 365 body words. Implementation: `app/composables/usePageSeo.ts` plus per-page titles. Global title/description fallback is in `nuxt.config.ts` `app.head`.

**Intentional exclusions.** findings.md lists three `noindex` pages (`/career`, `/partners`, `/partners/become-a-partner`) and two filter URLs whose canonical points elsewhere (`/solar/rooftop/packages?power=3` and `?power=20`). Sitemap URL count is 307 against 312 crawled pages; those five are the difference, so the sitemap is not advertising them. `server/utils/sitemap-entry.ts` drops articles whose robots directive is `noindex` or `none`, and `server/routes/sitemap.xml.ts` drops paths listed in `SEO_REDIRECTS`.

**Server-rendered answers where the copy is long enough.** Priority articles that already carry a direct answer in HTML:

| URL | Body words | JSON-LD |
|---|---|---|
| `/knowledge/articles/solar-khuen-thun-kee-pee-2569` | 393 | `FAQPage`, `BlogPosting` |
| `/knowledge/articles/ac-vs-dc-charger-thurakit-2569` | 363 | `FAQPage`, `BlogPosting` |
| `/knowledge/articles/tidtang-ev-charger-rongraem-2569` | 360 | `FAQPage`, `BlogPosting` |
| `/knowledge/articles/kho-anuyat-tid-solar-rongngan-mea-pea` | 293 | `FAQPage`, `BlogPosting` |

`app/utils/seo-calendar-articles.ts` for the payback article opens with the question, states that the figure is not a guaranteed return, and includes a table with site type, inputs, and a payback range. FAQs render as visible `<details>` in `app/pages/knowledge/articles/[slug].vue` and `SolarLanding.vue`, and the same Q&A is passed into `FAQPage` through `usePageSeo`.

**Entity and trust signals that are consistent.** Live HTML on the fetched project page includes `LocalBusiness` with `name` `บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด`, `email` `phachirawat.cx@gmail.com`, `telephone` `+6699-624-6444`, postal address ending `10230` / `TH`, `logo` `https://www.cxenertech.com/logo-on-dark.png`, and `sameAs` `https://line.me/R/ti/p/@cxenertech`. The same phone, email, and LINE URL are visible in the footer. Source of those fields: `app/layouts/default.vue` and `app/utils/nav.ts` `contactInfo`. `LocalBusiness` is the organization entity (it is the type the live homepage already serves). Do not add a second `Organization` node.

**Article and catalog schema that already matches visible pages.** Article routes emit `BlogPosting` or `NewsArticle` via `app/utils/structured-data.ts` (`mainEntityOfPage`, headline, dates, author, publisher logo). Package routes emit `Product` (`app/utils/product-jsonld.ts`) on the solar and EV package URLs listed in findings.md. `/flood-recovery` also emits `Service`. No `aggregateRating` or `Review` type exists under `app/pages`.

**AI discovery files are already published.** `https://www.cxenertech.com/llms.txt` returned HTTP 200 `text/plain` and an H1. `https://www.cxenertech.com/.well-known/okf/index.md` returned HTTP 200 `text/markdown` with frontmatter `type: Organization` and `resource: https://www.cxenertech.com`. Repo copies: `public/llms.txt` and `public/.well-known/okf/`.

**Lead path and measurement that already exist.** Quotation submit calls `trackGtm('generate_lead', { lead_type, service_type, package_code, duplicate })` in `app/pages/contact/quotation.vue` and does not put email or phone on that event. The POST body goes to CMMS, including `pagePath` and `entryKind`. Phone and LINE clicks call `trackGtm('contact_channel', { channel, location })` from `app/components/ContactDock.vue` and `app/components/RequestChannels.vue`. Package views emit `view_item`. GTM and GA IDs in the live payload match `nuxt.config.ts` `runtimeConfig.public`.

**Solar reference payback table.** `app/pages/solar/payback.vue` computes `price_from / savings_monthly_thb / 12` and the visible lead says the figure is a package reference, not every site’s result.

**Internal link and redirect maintenance.** `app/utils/seo-links.ts` rewrites retired article hrefs. `app/utils/article-service.ts` attaches a related service link. Landings expose a related-link list and a quotation CTA that does not replace the body (`CtaBand` sits after the copy).

## 2. Missing or incomplete features

**GSC, GA4, CrUX, and WAF baselines (AEO-001, AEO-002, AEO-003).** No Search Console export, no GA4 organic/lead report, no PageSpeed/CrUX run, and no Cloudflare bot-fight or challenge log were available. `seoagent` is not on PATH; indexing verdicts were not pulled. Port 80 from this machine failed before an HTTP status (`curl` exit 56 on `http://www.cxenertech.com/` and `http://cxenertech.com/`). Whether Cloudflare 301s port 80 is UNKNOWN. The Nitro middleware would 301 once a request reaches the app.

**Answer block on the pages that match the roadmap questions (AEO-101).** These live body-word counts are below a useful answer:

| Intent | URL | Body words |
|---|---|---|
| DC 120/180/240 kW choice | `/knowledge/articles/dc-fast-charger-120-180-240kw` | 98 |
| Transformer for 120 kW | `/ev-charging/station/transformer` | 68 |
| EV station payback | `/knowledge/articles/longthun-ev-station-khum-mai` | 74 |
| Solar + EV load | `/knowledge/articles/solar-khu-ev-charger-load` | 98 |
| PPA vs buy | `/knowledge/articles/ppa-solar-rooftop-khue-arai` | 79 |
| BESS peak | `/knowledge/articles/solar-bess-rongngan-2569` | 70 |
| Home 5/10/15 kW | `/knowledge/articles/lueak-khanad-solar-ban-5-10-15kw` | 125 |
| 2 MW project | `/projects/factory-rooftop-2mw` | 63 |

The transformer landing intro says size depends on diversity and expansion and that the team will calculate it. It has no kVA worked example, no units table, and one FAQ (`app/utils/ev-landings.ts` `transformer`). There is no `directAnswer`, `assumptions`, or `sources` field on `SolarLanding`, `EvLanding`, or `Article`.

**Editorial workflow (AEO-102).** `Article` in `app/utils/articles.ts` has `authorName` and dates. It has no `reviewerId`, `sources[]`, `status`, or `materiallyUpdatedAt`. Regulation pages do not carry an “accessed on” date or a link slot that the template requires. Package pages show `price_from` without a visible “price updated on”, exclusion list, or area condition in the JSON-LD. Review cadence is not encoded.

**Case-study status (AEO-103).** `Project` has `overview`, `scope`, `results` and no evidence status. `/knowledge/case-studies/[slug]` renders a heading `ผลที่วัดได้` from `project.results`, including phrases such as `ส่งมอบตามกำหนดเวลา`, `เปิดให้บริการเต็มรูปแบบ`, and `COD สำเร็จตามแผน` (`app/utils/projects.ts`). Live title for the 2 MW URL is `โรงงานอุตสาหกรรม Solar Rooftop | ผลงาน CX ENERTECH` and the meta description repeats the overview. Owner confirmation of delivery evidence, customer consent, and measured vs estimated numbers is UNKNOWN. The template does not say `illustrative scenario`.

**Legal pages and `sameAs` (AEO-104).** No `app/pages/**/privacy*` or `terms*` route exists. The sampled project and article HTML responses contain GTM and the contact block and do not contain a cookie-policy string. `sameAs` on the live `LocalBusiness` is only the LINE deep link. Company registration documents and named professional licenses were not found on an indexable certifications URL (`/about/certifications` 301s to `/about` via `SEO_REDIRECTS`). Whether those documents exist off-site is UNKNOWN.

**Page-level `Service` schema (AEO-105).** Evidence `@type` lists show `Service` on `/flood-recovery` only. Solar, EV, and smart-energy landings rely on the sitewide `LocalBusiness` `makesOffer` pair (solar rooftop and EV station) inside `app/layouts/default.vue`. That describes the company, not the individual service URL.

**One canonical URL per intent (AEO-106).** Examples that already exist and should not gain another slug:

- EV price: `/ev-charging/cost`, `/ev-charging/packages`, `/ev-charging/packages/price-rates`, plus articles `ev-station-raka`, `ev-station-investment-cost`, `longtun-ev-station`.
- EV payback: `/ev-charging/investment`, `/ev-charging/packages/payback`, plus `longthun-ev-station-khum-mai`, `ev-station-payback`, `ev-station-roi`, `invest-ev-station-worth-2569`.
- AC vs DC: `/ev-charging/commercial/ac`, `/ev-charging/commercial/dc-fast`, plus `ac-vs-dc-charger-thurakit-2569` and `ev-station-ac-vs-dc-fast-charge`.
- Hotel charger: `tidtang-ev-charger-rongraem-2569` and `ev-station-hotel`.
- Solar payback: `/solar/payback` plus `solar-khuen-thun-kee-pee-2569`, `tid-solar-cell-khum-mai-2569`, `install-solar-rooftop-worth-2569`.
- PPA: `/solar/ppa` and `ppa-solar-rooftop-khue-arai`.
- Solar + EV: `/ev-charging/solar`, `/smart-energy/solar-ev-integration`, `solar-khu-ev-charger-load`, `solar-samrap-ev-station`.
- Each project slug also has a case-study URL.

Which URL Google treats as canonical for each query is UNKNOWN until Search Console query/page data is exported.

**Lead analytics (AEO-201).** Missing event names from the roadmap: `quote_form_view`, `quote_submit` (the live name is `generate_lead`), `call_click` / `line_click` (the live name is `contact_channel`), `consultation_request`. `trackGtm` does not attach `landing_page`, `utm_source`, or `utm_medium`. No dashboard splits Search organic, identifiable AI referrers, direct, and unknown. Qualified-lead status inside CMMS is UNKNOWN. Cookie/consent mode is not implemented in the tracked plugins (`app/plugins/gtag.ts` calls `gtag('config', id)` in the initial HTML; `app/plugins/gtm.ts` injects GTM the same way).

**Citation harness and CI (AEO-202, AEO-302).** No prompt set, engine log, or monthly comparison file. `npm run test:seo` is not a step in `.github/workflows/cloudflare-pages.yml` or `.github/workflows/nuxtjs.yml`. The GitHub Pages workflow still runs `nuxt generate` and is a second deploy path beside Cloudflare Pages.

**Bot policy record (AEO-004).** `public/robots.txt` allows every agent, and names three OpenAI crawlers with `Allow`. `Google-Extended`, `Bingbot`, `ClaudeBot`, and `PerplexityBot` are not named; they fall under `User-Agent: *` / `Allow: /`. A written decision that separates search discovery from model training, plus Security/Legal sign-off, is not in the repo.

**`llms.txt` host (GEO).** The live file’s page links use `https://cxenertech.com/...` (apex). The canonical host is `https://www.cxenertech.com`. Apex HTTPS already 301s to www, so the map sends crawlers through a redirect. OKF `resource` correctly uses www.

**Dates.** `server/routes/sitemap.xml.ts` falls back to `SITE_CONTENT_UPDATED = '2026-09-17'` for static paths that have no per-page date. `server/utils/website-articles.ts` sets `updatedAt` to `2026-09-12T00:00:00+07:00` when a link rewrite or service mapping is applied and the stored `updatedAt` is older. Live `dateModified` values inside JSON-LD were not extracted page by page, so the production effect of that fallback is Likely, not field-checked on every article.

**EV finance module.** `app/utils/ev-finance.ts` calculates contribution per kWh, fees, and payback from explicit assumptions. No `.vue` page imports it, so visitors cannot see that formula.

## 3. Incorrect implementations

**Portfolio pages assert delivery without a verification state.** Titles use `ผลงาน`, case studies use `ผลที่วัดได้`, and result lines use delivery language (`ส่งมอบตามกำหนดเวลา`, `COD สำเร็จตามแผน`). The roadmap requires each item to be marked verified, illustrative, or unpublished. The data model cannot express that, so the public wording is ahead of the evidence file. Do not invent project proof, and do not delete the pages in this audit.

**`Offer.price` is the starting price.** `buildProductJsonLd` writes `price_from` into `Offer.price` and omits `availability`, `priceValidUntil` (unless a caller passes one; the solar package page does not), and a note that the figure is “ราคาเริ่มต้น”. The payback page itself calls the same number a reference. A product rich result can read that as the price, which is stronger than the on-page wording. Confirmed in `app/utils/product-jsonld.ts` and `app/pages/solar/rooftop/packages/[slug].vue`. The crawl confirms `Product` is present; the Offer field list was taken from this builder, which is what those routes render.

**`llms.txt` publishes the non-canonical host.** Confirmed by fetching `https://www.cxenertech.com/llms.txt` on 2026-10-21. First links are `https://cxenertech.com/` and `https://cxenertech.com/about`.

**Article freshness can move for a link rewrite.** The fixed `2026-09-12` stamp in `website-articles.ts` is not the CMMS edit time. The roadmap forbids changing a date only so a page looks new. This stamp is tied to a link rewrite, which is a real edit, but every rewritten article shares one clock time.

**Analytics loads without a consent gate.** `gtag.ts` and `gtm.ts` inject Google tags in `useHead` for every page. The live project HTML contains `GTM-5MKFVS3N` and `gaId` `G-F07KKEFMP8` in the Nuxt payload. There is no privacy or cookie route to disclose that.

**GitHub Pages workflow does not match production.** Production is Cloudflare Pages (`cloudflare-pages.yml`, `npm run build`). `nuxtjs.yml` still builds with `nuxt generate` and deploys to GitHub Pages. That can publish a second origin. Whether that origin is public is UNKNOWN from this audit.

## 4. Priority-ranked tasks

Do these in order. Do not open new article slugs while an intent already has a URL.

| Pri | Task | Outcome |
|---|---|---|
| P0 | Export GSC (3 months: clicks, impressions, CTR, position, pages, queries; brand vs non-brand) and GA4 (organic sessions, `generate_lead`, `contact_channel`). Save under `audit/` with an owner. | AEO-001 measurement baseline. Turns AEO-106 overlap from Likely into a page to keep. |
| P0 | URL Inspection in GSC for `/`, `/solar/rooftop`, `/ev-charging`, `/ev-charging/cost`, `/solar/payback`, `/knowledge/articles`, and the six project URLs. Record coverage state. Confirm port 80 and that Googlebot receives CSS/JS (Cloudflare security events). | Closes AEO-002 unknowns. |
| P0 | Write the bot policy: keep Googlebot and Bingbot allowed; decide `Google-Extended` and training crawlers separately from `OAI-SearchBot`. Get Security/Legal sign-off before any robots change. | AEO-004. |
| P1 | Owner marks each of the six projects `verified`, `illustrative`, or `unpublished`. Until then, the template states that figures are scenario language where evidence is missing. | AEO-103. Highest trust risk on an indexable URL. |
| P1 | Add one content map row per roadmap question: primary question, single canonical URL, supporting URLs, CTA, owner. Pick the stronger existing URL (usually the service page when the article is under ~150 words). | AEO-106. |
| P1 | Expand the eight thin URLs in section 2 on their current slugs: 2–5 sentence answer under the H1, units, assumptions, source or “survey required”, link to quote. | AEO-101. |
| P1 | Add `sources`, `reviewer`, and `status` to the article/landing model and show them on MEA/PEA, price, and ROI pages. | AEO-102. |
| P1 | Map existing events to the lead spec without renaming blindly: fire `quote_form_view` on quotation mount, keep `generate_lead` and also send `quote_submit`, add `landing_page` and UTM. Define qualified lead in CMMS. Add a short privacy notice before expanding tags. | AEO-201 and AEO-104. |
| P1 | Point `llms.txt` links at `https://www.cxenertech.com`. Regenerate from the sitemap rather than hand-editing the whole file. | GEO host consistency. |
| P2 | Add page-level `Service` JSON-LD on the canonical service URL only, copying visible name and description. Leave `LocalBusiness` as the entity. | AEO-105. |
| P2 | On package `Offer`, either omit `price` or mark it as a starting price and add real availability only when the catalog has it. | Stops starting prices being read as offers. |
| P2 | Surface the solar payback formula inputs (what `savings_monthly_thb` assumes) and wire `ev-finance.ts` only after commercial sign-off. | AEO-301. |
| P2 | Run `npm run test:seo` in the Cloudflare workflow: canonical redirect, sitemap exclusions, no accidental `noindex`, JSON-LD parses. Do not fail the build on optional rich-result types. | AEO-302. |
| P3 | 30-prompt citation log (Thai and English), monthly, with brand mentioned, cited URL, and accuracy. | AEO-202. Not a ranking promise. |

## 5. Exact files requiring modification

Change these when implementation starts. Do not add a parallel `src/lib/seo` tree; the site is Nuxt and the helpers below already exist.

| File | Change |
|---|---|
| `app/utils/projects.ts` | Add `evidenceStatus: 'verified' \| 'illustrative' \| 'unpublished'` and optional evidence notes. Default new items to `unpublished` until the owner fills them. |
| `app/utils/knowledge.ts` | Same status on `KnowledgeCase`. Hide or relabel `ผลที่วัดได้` when status is not `verified`. |
| `app/pages/projects/[slug].vue` | Render the status in the hero. Unpublished slugs should 404 or `noindex` after the owner decides. |
| `app/pages/knowledge/case-studies/[slug].vue` | Same status line. Keep the link to `/projects/{slug}` so the two URLs do not diverge. |
| `app/pages/projects/index.vue`, `app/pages/knowledge/case-studies/index.vue` | List only the status the owner allows in the sitemap. |
| `server/routes/sitemap.xml.ts` | Omit `unpublished` projects and case studies. |
| `app/utils/articles.ts` | Add optional `sources`, `reviewerName`, `status`, `assumptions`. |
| `app/utils/seo-calendar-articles.ts` | Fill those fields on the thin priority slugs already in this file. Do not add slugs that duplicate section 2. |
| `app/utils/ev-landings.ts` | Expand `transformer`, and only the EV landings the content map names as canonical. |
| `app/utils/solar-landings.ts` | Expand the canonical solar landings the map names (`payback`, `ppa`, factory sizing). |
| `app/pages/knowledge/articles/[slug].vue` | Render a short answer under `PageHero` when `assumptions` or a lead paragraph exists, and list sources. |
| `app/components/SolarLanding.vue`, `app/components/EvLanding.vue` | Render the same answer block from landing data so service pages and articles share one pattern. |
| `app/composables/usePageSeo.ts` | Add optional `Service` JSON-LD built from the visible H1 and description. Keep breadcrumb and FAQ behavior. |
| `app/utils/product-jsonld.ts` | Stop presenting `price_from` as an unqualified `Offer.price`, or add a starting-price qualifier the visible page already uses. |
| `app/pages/solar/rooftop/packages/[slug].vue`, `app/pages/ev-charging/packages/[slug].vue` | Pass only catalog facts that are visible. Show the price date and exclusions beside the price. |
| `app/pages/contact/quotation.vue` | `quote_form_view` on view; include `landing_page` and UTM on `generate_lead`. |
| `app/components/ContactDock.vue`, `app/components/RequestChannels.vue` | Keep `contact_channel`; add the specific `call_click` / `line_click` names if the dashboard needs them. |
| `app/plugins/gtag.ts`, `app/plugins/gtm.ts` | Load tags in line with the privacy notice the owner approves. |
| `public/llms.txt` | Replace `https://cxenertech.com` with `https://www.cxenertech.com`. |
| `server/utils/website-articles.ts` | Keep `updatedAt` from CMMS when the only change is an automatic link rewrite, or store the rewrite date separately from `dateModified`. |
| `.github/workflows/cloudflare-pages.yml` | Add `npm run test:seo`. Leave `nuxtjs.yml` untouched until the owner confirms GitHub Pages is unused. |
| New `audit/content-map.csv` | One row per intent. Not a new public route. |
| New privacy copy, only if Legal supplies it | A small route such as `app/pages/privacy.vue`, linked from the footer. Do not draft legal text without counsel. |

Files that already do their job and should stay: `app/composables/usePageSeo.ts` (canonical, OG, Twitter, breadcrumbs, FAQ), `app/layouts/default.vue` (`LocalBusiness` + `WebSite`), `server/middleware/canonical-host.ts`, `app/utils/seo-redirects.ts`, `public/robots.txt` until the bot-policy decision, `public/.well-known/okf/**`.

## 6. Recommended implementation approach

Keep the current Nuxt rendering, CMMS merge, and landing dictionaries. The crawl already sees unique titles, canonicals, and JSON-LD, so a metadata rewrite would spend the lead-generation effort on a layer that passes.

1. **Measure before consolidating.** Export GSC and GA4 first. For each overlapping cluster in section 2, keep the URL with impressions or the URL that already has the longer server-rendered answer (`solar-khuen-thun-kee-pee-2569` at 393 words, `ac-vs-dc-charger-thurakit-2569` at 363, `tidtang-ev-charger-rongraem-2569` at 360, `kho-anuyat-tid-solar-rongngan-mea-pea` at 293). Point the thin twin at that URL with the existing 301 helper only after the export shows the thin URL is not the one Google ranks.
2. **Edit copy on the current slug.** Add the answer, units, and caveat in `solar-landings.ts`, `ev-landings.ts`, or `seo-calendar-articles.ts`. CMMS overwrites a local article with the same slug (`website-articles.ts`). If a short CMMS body is what production serves, update that CMMS record or stop the overwrite for that slug. Do not INSERT new production rows as a side effect of SEO work.
3. **Gate project claims on a status field.** Ship the field and the visible label before any new project copy. If the owner cannot verify a job in this pass, set `illustrative` and replace delivery verbs with scenario language. Leave `verified` empty until they attach what may be published.
4. **Schema follows the visible text.** Add `Service` only on the canonical service page, using the H1 and the new answer paragraph. Keep one `LocalBusiness` in the layout. Adjust `Product`/`Offer` so the JSON-LD price wording matches “ราคาเริ่มต้น”. Do not add review markup.
5. **Events, then dashboard.** Extend `trackGtm` at the existing call sites. Reconcile `generate_lead` with CMMS `quote-leads` by id, and define qualified as a CMMS/sales status. Keep email and phone off the analytics payload.
6. **Regression tests, not a new framework.** Extend `tests/seo.test.ts` for: unpublished projects absent from the sitemap, `llms.txt` host, `Offer` not using a bare starting price, and the answer block present on the eight priority URLs (string fixture or rendered HTML). Run that test in the Cloudflare workflow.

`hreflang` stays unused while English is a client toggle and the indexable body is Thai.

## 7. Acceptance criteria and verification steps

**AEO-001.** `audit/page-inventory.csv` lists canonical URL, type (service, article, project, quote, filter), locale (`th`), indexability, and last modified for every sitemap URL. GSC and GA4 extracts cover the latest 90 days and name an owner.  
Verify: row count matches a fresh `sitemap.xml` URL count. UNKNOWN items stay blank rather than zero.

**AEO-002.** Homepage, `/solar/rooftop`, `/ev-charging`, `/knowledge/articles`, `/projects`, and `/contact/quotation` are eligible to crawl, or the exception is written down. `robots.txt` still has no `Disallow` on those paths. Sitemap URLs return 200 and are not `noindex`.  
Verify: repeat `seoagent crawl --url https://www.cxenertech.com`. findings.md stays at no accidental `noindex`. GSC URL Inspection screenshots stored next to the CSV. Re-test `http://www.cxenertech.com/` from a network that can open port 80.

**AEO-003.** `curl` of the eight thin URLs shows the new answer text in the HTML body, not only after hydration.  
Verify: evidence.md body-word count for each of those URLs is above 300, one H1, HTTP 200. PageSpeed/CrUX recorded separately; a missing CrUX row stays UNKNOWN.

**AEO-004.** A short policy names allowed search bots and the training opt-out decision. robots.txt matches that policy.  
Verify: fetch `/robots.txt` and compare to the signed policy. Cloudflare security sample shows Googlebot HTML 200 for `/` and one article.

**AEO-005.** Priority URLs keep unique title, description, canonical, H1, and Open Graph. Article `dateModified` equals the editorial date, not the link-rewrite fallback.  
Verify: `npm run test:seo` plus the crawl rollup (missing canonical, missing description, multiple H1 all empty).

**AEO-101.** At least five existing priority URLs show a 2–5 sentence answer under the H1 with scope, a table or list that uses units, and a quotation link. Suggested first five: `/ev-charging/station/transformer`, `/knowledge/articles/dc-fast-charger-120-180-240kw`, `/knowledge/articles/longthun-ev-station-khum-mai`, `/knowledge/articles/ppa-solar-rooftop-khue-arai`, `/knowledge/articles/solar-khu-ev-charger-load`.  
Verify: those strings appear in `curl` HTML. CTA remains below the answer (`CtaBand` order unchanged).

**AEO-102.** MEA/PEA and price/ROI pages show reviewer or “updated by CX ENERTECH” plus a source URL and access date for regulatory claims.  
Verify: view-source contains the source URL. Status cannot be `published` in the model without a source when the page cites MEA, PEA, or a price.

**AEO-103.** Every project and case study in the sitemap has `verified` or `illustrative` visible in the HTML. `unpublished` returns 404 or `noindex` and is absent from the sitemap.  
Verify: crawl the six slugs. Search the HTML for the status word. No new testimonial or `aggregateRating`.

**AEO-104.** Footer contact still matches `LocalBusiness` name, phone, email, address, and logo. Privacy notice exists only after Legal provides it. `sameAs` gains a profile only if the company controls that profile.  
Verify: fetch `/` and compare JSON-LD `telephone`, `email`, and `address` to the footer. LINE remains a visible contact even if it is removed from `sameAs`.

**AEO-105.** Canonical service pages include `Service` whose `name` equals the H1. Package JSON-LD matches the visible price wording. Schema Markup Validator reports no errors that contradict visible content. Rich-result eligibility for FAQ is not a pass/fail.  
Verify: evidence.md `@type` list for the chosen service URL includes `Service` and still includes `LocalBusiness`. Validator screenshot stored in `audit/`.

**AEO-106.** `audit/content-map.csv` has one canonical URL per roadmap question in clusters A–C. Supporting URLs link to it. No new slug is added for those questions.  
Verify: diff `sitemap.xml` against the previous 307 URLs and explain every addition. GSC query report, when attached, shows the chosen URL as the landing page for that query or records an exception.

**AEO-201.** A test quotation produces `quote_form_view` and `generate_lead` / `quote_submit` in GA4 DebugView and a CMMS lead id, with UTM and landing page, and without email or phone in the hit. A phone click and a LINE click produce channel events.  
Verify: one test lead in GA4 and one in CMMS, side by side. Dashboard labels direct traffic as direct.

**AEO-202.** Thirty prompts, Thai and English, stored with date, engine, brand mentioned, cited URL, and a human accuracy flag.  
Verify: second monthly run uses the same prompt text and adds a comparison file.

**AEO-301.** Solar table still states it is `price_from / monthly savings`. Any EV calculator on a page uses `ev-finance.ts` inputs that the visitor can read, with the existing warning strings.  
Verify: a fixture in `tests/seo.test.ts` for a known capex and kWh. Commercial owner signs the page before it is indexed.

**AEO-302.** A pull request that sets the homepage to `noindex` or drops it from the sitemap fails CI. A page that omits `FAQPage` does not fail CI.  
Verify: a dry-run log of `npm run test:seo` on the Cloudflare workflow.

## What this audit did not claim

- No citation, ranking, or AI-recommendation outcome is implied by the current JSON-LD, FAQ blocks, `llms.txt`, or bot allows.
- The six projects were not classified as fake. They are unclassified.
- Search Console index coverage, GA4 conversion rates, Core Web Vitals, and Cloudflare challenge behavior are UNKNOWN.
- Port 80 redirect behavior is UNKNOWN from this network.
