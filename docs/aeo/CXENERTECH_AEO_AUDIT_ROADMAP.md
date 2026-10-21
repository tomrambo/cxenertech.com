# CX ENERTECH — AEO / GEO / Technical SEO Audit & Implementation Backlog

> Website: https://www.cxenertech.com  
> Prepared: 2026-10-21  
> Purpose: ใช้ไล่ตรวจ repository + production และสร้าง GitHub issues สำหรับเพิ่มโอกาสที่ข้อมูล CX ENERTECH จะถูกค้นพบ ใช้ประกอบคำตอบ และอ้างอิงโดย Search/AI Answer Engines  
> Scope: Solar Rooftop, Solar EPC, EV Charging Station, Smart Energy และ Knowledge Center  
> Status: **Initial public-web review; NOT a completed technical audit.** รายการ checkbox ที่ยังไม่ติ๊กหมายถึง **ยังไม่ได้ยืนยัน** ไม่ได้หมายความว่าเว็บไซต์มีข้อบกพร่อง

> Implementation update 2026-10-22: แก้ local code ตามผลรีวิวแล้วบางส่วน รายละเอียดและรายการที่ยังรอข้อมูล/ผู้ตรวจทานอยู่ใน `AEO_AUDIT_RESULTS.md` หัวข้อ “Local implementation update” ยังไม่ได้ deploy และยังไม่ปิด Definition of Done ทั้งโครงการ

---

## 0. หลักการและเกณฑ์การทำงาน

**Goal:** เพิ่ม *qualified leads* จากช่องทาง Organic/AI ที่มีความเกี่ยวข้องกับการติดตั้ง Solar / EV Charging จริง โดยรักษาความถูกต้องของข้อมูลวิศวกรรม ความปลอดภัย และความน่าเชื่อถือของบริษัท

- SEO = ช่วยให้หน้าเว็บถูกค้นพบ/จัดทำดัชนีและมีประโยชน์ต่อผู้ค้นหา
- AEO = ทำให้เนื้อหาตอบคำถามผู้ใช้ได้ตรง ชัด และตรวจสอบได้
- GEO = สร้างความชัดเจนเรื่องแบรนด์และเนื้อหาที่มีโอกาสถูก AI นำไปใช้/กล่าวถึง/อ้างอิง
- **ไม่มีการรับประกัน citation, ranking หรือ AI recommendation** จากการเพิ่ม JSON-LD, FAQ, `llms.txt` หรือการอนุญาต bot ใด ๆ
- **Do not fabricate**: โครงการจริง, ลูกค้า, KPI ประหยัดไฟ, ROI, คำรับรอง, รีวิว, ราคา, กฎหมาย และใบอนุญาต
- ห้ามทำเนื้อหาอัตโนมัติปริมาณมากโดยไม่มีการตรวจโดยผู้เชี่ยวชาญ
- ทุกงานต้องผ่านการตรวจจริงและมีหลักฐาน (URL, screenshot, response header, report หรือ test output)

**Priority:** `P0` ปัญหาทำให้ discover/index/measurement ใช้ไม่ได้, `P1` โอกาสสูงต่อ Leads/Trust, `P2` การขยายผล, `P3` ทดลองเพิ่มเติม

**Status per ticket:** `NOT CHECKED` / `PASS` / `FAIL` / `BLOCKED` / `NOT APPLICABLE`.

## 1. Public Baseline: สิ่งที่พบ (ยังไม่ใช่ repo audit)

Public search พบหน้าเหล่านี้บนโดเมนจริง (ตรวจเจอผ่าน search engine แต่ยัง **ไม่ได้ยืนยัน source code / deployment / Google Search Console**):

| Page | URL | สิ่งที่ควรตรวจต่อ |
|---|---|---|
| Home | https://www.cxenertech.com/ | Company identity, service targeting, CTA |
| Projects | https://www.cxenertech.com/projects | โครงการเป็นของจริงหรือ demo/placeholder? หลักฐานและสิทธิ์เผยแพร่ |
| Knowledge | https://www.cxenertech.com/knowledge | Hub taxonomy และ internal link |
| Articles | https://www.cxenertech.com/knowledge/articles | Duplicate/cannibalization, metadata, original information |
| EV Knowledge | https://www.cxenertech.com/knowledge/ev | EV FAQ, source accuracy, service linking |
| Case studies | https://www.cxenertech.com/knowledge/case-studies | Evidence, dates, methodology, owner review |
| News | https://www.cxenertech.com/knowledge/news | Freshness, dated claims, cite regulatory sources |
| Article example | https://www.cxenertech.com/knowledge/articles/solar-khu-ev-charger-load | Byline, citations, examples, technical review |

**Observed content themes:** AC vs DC Charger, DC 120/180/240 kW, EV station ROI, Solar Rooftop ROI, PPA, MEA/PEA process, Solar + EV, Solar + BESS; หลายหัวข้อมีหน้าเดิมอยู่แล้ว **ห้ามรีบสร้าง slug ซ้ำ**. รายการโปรเจกต์ 2 MW / 4 × 120 kW / 1.5 MW ที่เว็บแสดง ต้องขอเจ้าของข้อมูลยืนยันก่อนใช้เป็นหลักฐานทางการตลาด

**Unknown / not verified:** `robots.txt`, `sitemap.xml`, canonical, index coverage, response code, rendered HTML, schema, Core Web Vitals, Cloudflare/WAF bot policies, Search Console, Analytics, actual citation frequency และ conversion performance.

---

## 2. Phase 0 — Audit Repo / Production (P0)

### AEO-001 Inventory & baseline
- [ ] ระบุ framework/version, SSR/SSG/CSR, hosting/CDN, CMS, data source, route generator
- [ ] Export public routes: canonical URL, page type, locale, status, indexability, last modified
- [ ] แยกหน้าบริการ / knowledge / article / project / quote / search/filter/pagination
- [ ] เก็บ baseline GSC ล่าสุด 3 เดือน: clicks, impressions, CTR, position, pages, queries; แยก branded/non-branded
- [ ] เก็บ GA4: organic sessions, form submit, call click, LINE click, quote requested, qualified lead
- [ ] จับ snapshot HTML และ metadata ของ home + top 10 service pages + top 10 articles
**Done when:** มี `audit/page-inventory.csv`, baseline report, และหลักฐานต่อรายการ

### AEO-002 Crawl/index controls
- [ ] `https://www.cxenertech.com/robots.txt` ตอบสถานะที่คาดหวังและไม่บล็อกหน้าเนื้อหาที่ต้องการ index
- [ ] `https://www.cxenertech.com/sitemap.xml` เปิดได้ เป็น XML ถูกต้อง URL canonical จริงเท่านั้น
- [ ] sitemap excludes: draft, search result, duplicate filter, auth pages, `noindex`, error/redirect URLs
- [ ] Googlebot เข้าถึง CSS/JS/assets สำคัญได้ และหน้าเนื้อหาไม่ได้ถูกบล็อกโดย WAF
- [ ] HTTP code บน canonical pages เป็น `200`; removed pages ใช้ 404/410; redirects ใช้ 301/308 เหมาะสม
- [ ] ไม่มี `noindex` / `X-Robots-Tag` ผิดหน้าบน production
- [ ] ตรวจ GSC Page Indexing และ URL Inspection ของหน้าหลัก โดย **อย่าถือว่า site: query คือ index audit**
- [ ] locale / trailing slash / www-nonwww / http-https ไม่มี canonical conflict
**Done when:** หน้าสำคัญ crawl/index eligible และมีรายการข้อยกเว้นพร้อมเหตุผล

### AEO-003 Server-rendered answer content
- [ ] `curl` HTML ของบทความ/บริการมี H1, เนื้อหาคำตอบ, links และ metadata จริง ไม่ใช่ JS shell ว่าง
- [ ] ข้อความสำคัญไม่ซ่อนหลัง user action หรือ API ที่ต้อง login
- [ ] ตรวจ hydration errors และ HTML แตกต่างสำหรับ user agents อย่างมีนัยสำคัญ
- [ ] ผ่าน mobile usability, accessibility ขั้นพื้นฐาน และ performance benchmark (วัดด้วย CrUX/PageSpeed)
**Done when:** crawler อ่านข้อความที่ผู้ใช้เห็นได้ และไม่มี rendering blocker

### AEO-004 Bot policy (review with Legal/Security)
- [ ] ระบุว่าองค์กรต้องการอนุญาต `Googlebot`, `Bingbot`, `OAI-SearchBot` และ bot อื่น ๆ ใดบ้าง
- [ ] แยกนโยบาย **search discovery** ออกจาก **model training**; ตรวจ documentation ล่าสุดของแต่ละผู้ให้บริการ
- [ ] ตรวจ Cloudflare bot fight mode, managed challenges, IP rules, rate limits, bot logs
- [ ] ไม่เปิด public access ให้ข้อมูลลูกค้า เอกสารภายใน หรือ API ลับเพื่อหวังผลด้าน AEO
- [ ] ถ้าปรับ robots.txt ให้มี Security/Legal approve ก่อน deploy
**Done when:** มี bot access policy และหลักฐานทดสอบ HTTP/server logs

### AEO-005 Canonical & metadata consistency
- [ ] ทุกหน้า indexable มี unique title, meta description, canonical, H1, Open Graph
- [ ] Dynamic article/project metadata ดึงจากข้อมูลจริง ไม่ hardcode เหมือนกันทุกหน้า
- [ ] `hreflang` เฉพาะหน้าที่มี localized equivalent จริง และ reciprocal/canonical ถูกต้อง
- [ ] `datePublished`/`dateModified` สัมพันธ์กับเนื้อหาและ UI จริง
- [ ] ไม่เปลี่ยนวันที่บทความเพียงเพื่อให้ดูใหม่
**Done when:** automated report ผ่าน 100% สำหรับ priority URLs

---

## 3. Phase 1 — Answer-ready Content Model (P1)

### AEO-101 Answer-first template
สำหรับ **service / guide / technical article**:
- [ ] H1 บอกหัวข้อชัดเจน ไม่ใส่ keyword ซ้ำเกินจำเป็น
- [ ] ใต้ H1 มี `Quick answer` 2–5 ประโยคตอบคำถามหลัก **พร้อมขอบเขต/เงื่อนไข**
- [ ] หัวข้อย่อยตรง user questions: ราคา, ขนาด, ROI, ขั้นตอน, ข้อจำกัด, ความปลอดภัย, เอกสาร
- [ ] ตารางเปรียบเทียบมีหน่วย (kW, kWh, kVA, บาท, ชั่วโมง) และสมมติฐานชัด
- [ ] อธิบายสูตร/อินพุต ROI; แยกตัวอย่างสมมติจากตัวเลขเสนอราคาจริง
- [ ] Internal link ไปยังบริการ, ผลงานที่ยืนยันแล้ว, quote form และเนื้อหาที่เกี่ยวข้อง
- [ ] ปุ่มขอประเมิน/เสนอราคาไม่บดบังเนื้อหา
**Done when:** บทความนำร่องอย่างน้อย 5 หน้ามี answer block, supporting evidence และ service CTA

### AEO-102 Evidence & editorial governance
- [ ] ระบุ author/editor/reviewer ตามบุคคลจริงและหน้าที่จริง (ถ้าอนุญาตให้เผยแพร่)
- [ ] ข้อมูลไฟฟ้า/หม้อแปลง/มาตรฐาน/ใบอนุญาตผ่าน technical review
- [ ] เรื่องกฎหมาย/MEA/PEA มีลิงก์ไปหน่วยงานและวันที่ตรวจสอบล่าสุด
- [ ] ราคาแพ็กเกจมีวันอัปเดต, ขอบเขตอุปกรณ์, งานไม่รวม, เงื่อนไขพื้นที่
- [ ] กรณีศึกษาแยก **actual measured result** vs estimate/model อย่างเห็นชัด
- [ ] กำหนด review cadence: ราคา/นโยบาย 30–90 วัน; evergreen 6–12 เดือน หรือเมื่อข้อกำหนดเปลี่ยน
- [ ] ตั้งสถานะ `draft -> technical_review -> legal/commercial_review -> published -> needs_update`
**Done when:** content release ต้องมีผู้รับรองและแหล่งข้อมูลทุก claim สำคัญ

### AEO-103 Case study integrity audit (สูงมาก)
- [ ] ตรวจทุกรายการใน `/projects` และ `/knowledge/case-studies` ว่าเป็นงาน CX ENERTECH จริงหรือ example
- [ ] มีหลักฐาน: ใบส่งมอบ/ภาพจริง/ระบบติดตั้ง/ขอบเขตงาน/จังหวัด/เดือนปี (เฉพาะที่เผยแพร่ได้)
- [ ] รับ consent ลูกค้าก่อนใช้ชื่อ โลโก้ ภาพสถานที่ และตัวเลขเป็น public marketing
- [ ] หากเป็นตัวอย่างจำลอง ต้องระบุ **illustrative scenario** ไม่ใช้คำว่า "ส่งมอบจริง"
- [ ] หน้าแต่ละโครงการมี problem → constraints → engineering decision → execution → outcome → caveats
- [ ] อย่าใส่ testimonial หรือ aggregateRating สมมติ
**Done when:** ทุก case study มี `verified evidence / illustrative / unpublished` สถานะชัดเจน

### AEO-104 Company entity/trust
- [ ] ตรวจชื่อไทย/อังกฤษและชื่อจดทะเบียนให้ใช้สม่ำเสมอ
- [ ] ใส่ข้อมูลติดต่อบริษัทจริง ที่ตั้งพื้นที่บริการ และช่องทางติดต่อที่ตรวจสอบได้
- [ ] ตรวจเอกสารรับรอง ใบประกอบวิชาชีพ และชื่อผู้เชี่ยวชาญเฉพาะที่มีจริงและได้รับอนุญาต
- [ ] `sameAs` ลิงก์เฉพาะ official social/company profiles ที่บริษัทควบคุม
- [ ] About, Contact, Privacy, Terms และ Cookie notices สอดคล้องกับกระบวนการเก็บ Leads
**Done when:** ผู้ใช้และระบบสามารถยืนยัน identity บริษัทจากหลายจุดที่สอดคล้องกัน

---

## 4. Phase 2 — Structured Data (P1)

> JSON-LD ช่วยตีความเนื้อหาและอาจรองรับ search features บางชนิด แต่ไม่ใช่คำสั่งบังคับให้ AI อ้างอิง ข้อมูลใน JSON-LD ต้องตรงกับข้อมูลที่มองเห็นได้เสมอ

- [ ] Home / About: `Organization` (`name`, `url`, `logo`, `contactPoint` ที่ยืนยันได้, `sameAs` ที่เป็นทางการ)
- [ ] หากมีสาขาหรือสถานประกอบการที่ตรวจสอบได้: พิจารณา `LocalBusiness` ตามข้อเท็จจริง
- [ ] Service pages: `Service` + `provider` (ช่วยอธิบายบริการ; **ไม่ใช่ Google rich-result guarantee**)
- [ ] Articles: `Article` หรือ `BlogPosting` + author + date + mainEntityOfPage + image ที่มีจริง
- [ ] Breadcrumbs: `BreadcrumbList` สำหรับ navigation จริง
- [ ] FAQ: ใช้ HTML Q&A ที่เห็นได้; `FAQPage` ใช้เมื่อเหมาะสม และอย่าคาดหวัง Google FAQ rich results สำหรับเว็บไซต์ธุรกิจทั่วไป
- [ ] Product/Offer: ใช้เฉพาะหน้าอุปกรณ์/ข้อเสนอที่เข้าเกณฑ์และราคา/availability จริง อย่าใส่กับงาน EPC custom quote อย่างผิดความหมาย
- [ ] ไม่ใส่ Review/Rating สร้างเอง
- [ ] Test ด้วย Schema Markup Validator + Google Rich Results Test และตรวจ rendered HTML
**Done when:** schema ไม่มีข้อผิดพลาดที่มีนัยสำคัญ และสัมพันธ์กับ visible content

### Suggested code organization (if Next.js; verify framework first)

```text
src/
  lib/seo/
    metadata.ts
    canonical.ts
    jsonld.ts
    schemas/
      organization.ts
      article.ts
      service.ts
      breadcrumb.ts
  components/seo/
    JsonLd.tsx
    AnswerSummary.tsx
    EditorialMeta.tsx
    SourceReferences.tsx
  content/
    models/
      service.ts
      article.ts
      case-study.ts
```

**Example model for engineering content** (pseudo-TypeScript; adapt to current CMS):

```ts
type TechnicalArticle = {
  slug: string;
  title: string;
  primaryQuestion: string;
  directAnswer: string;
  audience: 'homeowner' | 'business' | 'engineer';
  assumptions?: string[];
  sources: Array<{ title: string; url: string; accessedAt: string }>;
  authorId: string;
  reviewerId?: string;
  publishedAt: string;
  materiallyUpdatedAt?: string;
  relatedServiceSlugs: string[];
  status: 'draft' | 'review' | 'published';
};
```

**Example Organization JSON-LD**: ข้อมูลที่ยังไม่ยืนยัน **ต้องแทนค่าก่อนเผยแพร่**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CX ENERTECH",
  "url": "https://www.cxenertech.com/",
  "logo": "https://www.cxenertech.com/REPLACE_WITH_REAL_LOGO_URL",
  "sameAs": []
}
```

---

## 5. Content Architecture: อย่าสร้างบทความซ้ำ

### Cluster A — EV Station (commercial priority)

| User question | Target content / action | Intent | Priority |
|---|---|---|---|
| สร้างสถานีชาร์จ EV ราคาเท่าไหร่ | Audit existing EV service/price pages; เพิ่มราคาแบบมี assumptions | Transactional | P1 |
| DC 120/180/240 kW เลือกอย่างไร | Upgrade existing comparison article | Comparison | P1 |
| เครื่องชาร์จ 120 kW ต้องใช้หม้อแปลงขนาดใด | Guide with engineering reviewer, diversity factor, site constraints | Technical | P1 |
| โรงแรมควรติด AC หรือ DC | Improve existing hotel/business guide | Commercial | P1 |
| เปิด EV Station คืนทุนกี่ปี | Improve existing ROI article; calculator with verifiable assumptions | Commercial | P1 |
| เตรียมเอกสารอะไรกับ MEA/PEA | Maintain regulation-focused guide with authoritative sources | Compliance | P1 |

### Cluster B — Solar Rooftop/EPC

| User question | Target content / action | Intent | Priority |
|---|---|---|---|
| โรงงานค่าไฟ X บาท ติดโซลาร์กี่ kW | B2B sizing explainer + estimation disclaimer | Commercial | P1 |
| Solar EPC vs PPA ต่างกันอย่างไร | Improve existing PPA and EPC pages, add table | Comparison | P1 |
| ติดโซลาร์โรงงานขออนุญาตอะไร | Existing MEA/PEA guide; versioned update | Compliance | P1 |
| คืนทุนกี่ปี | Improve existing ROI page; methodology and sensitivity | Commercial | P1 |
| 5/10/15 kW เลือกขนาดอย่างไร | Improve existing home solar comparison | Comparison | P2 |

### Cluster C — Solar + EV + BESS

| User question | Target content / action | Intent | Priority |
|---|---|---|---|
| Solar ช่วยลดต้นทุน EV Charging อย่างไร | Improve existing Solar+EV article; hourly-load example | Technical | P1 |
| BESS ลด peak demand อย่างไร | Practical load/peak example with caveats | Technical | P2 |
| Multi-charger ต้องบริหารโหลดอย่างไร | Load management + transformer utilization technical guide | Technical | P2 |

### Content ownership rules
- [ ] แต่ละ intent มี canonical target เพียงหนึ่งหน้า (ยกเว้นความแตกต่างของ audience จริง)
- [ ] ทำ **content map**: primary keyword, primary question, canonical page, supporting pages, CTA, owner
- [ ] ตรวจ article vs service page ว่า keyword เดียวกันแข่งขันกันหรือไม่
- [ ] เสริม internal links แบบเกี่ยวข้องจริง ไม่ใช้ sitewide keyword-stuffed links
- [ ] จัดการ noindex/archive/redirect สำหรับ duplicate หรือ thin pages ที่ตรวจยืนยันแล้ว

---

## 6. AI Visibility & Measurement (P1)

### AEO-201 Set up conversion analytics
- [ ] Define `quote_form_view`, `quote_submit`, `call_click`, `line_click`, `consultation_request`
- [ ] Define qualified lead / sales accepted lead จาก CRM ไม่ใช้ทุก form submit เป็น lead คุณภาพ
- [ ] Track `landing_page`, `service_interest`, `utm_source`, `utm_medium`, consent-compliant referrer
- [ ] GA4 + CRM reconciliation; หลีกเลี่ยงส่ง PII ไป analytics โดยไม่ได้รับอนุญาต
- [ ] Dashboard แยก Search Organic / Referrals ที่ระบุ AI ได้ / Direct / Unknown (ห้ามจัด Direct เป็น AI ทั้งหมด)

### AEO-202 Repeatable AI citation benchmark
- [ ] สร้าง prompt set อย่างน้อย 30 ข้อ ครอบคลุม EV, Solar, Engineering, ROI, Commercial
- [ ] เก็บภาษาไทย/อังกฤษ, location qualifier, prompt exact text, timestamp, engine/version (ถ้าทราบ)
- [ ] บันทึก brand mentioned? cited URL? cited competitor? answer accuracy? ไม่ทราบ/ไม่มี citation?
- [ ] ระวัง personalization, location, account, freshness, randomness ของผลลัพธ์
- [ ] ทดสอบรอบเดือนด้วย workflow เดิมและรายงานอัตราการพบแหล่งอ้างอิง (ไม่เรียกว่า ranking guarantee)
- [ ] ตรวจว่า cited URL รองรับ intent และนำไปสู่ conversion ได้จริง

### Sample question set
1. บริษัทติดตั้ง EV Charging Station พร้อมงานไฟฟ้าในไทยมีเจ้าไหนบ้าง?
2. สร้างสถานีชาร์จ DC Fast Charging ต้องเตรียมอะไร?
3. โรงแรมจะติด EV Charger ควรใช้ AC หรือ DC?
4. ต้องใช้หม้อแปลงขนาดเท่าไรสำหรับ DC Fast Charger 120 kW?
5. ลงทุนสถานีชาร์จรถ EV คืนทุนกี่ปี?
6. มีบริษัทรับติดตั้ง Solar Rooftop โรงงานพร้อม EPC หรือไม่?
7. ค่าไฟโรงงานสูงควรติด Solar Rooftop ขนาดเท่าไหร่?
8. PPA กับซื้อระบบ Solar EPC ต่างกันอย่างไร?
9. ติดโซลาร์ร่วมกับสถานีชาร์จ EV ลดค่าไฟได้จริงไหม?
10. Solar + BESS เหมาะกับโรงงานแบบใด?

**Dashboard fields:** date, engine, prompt_id, intent, brand_mentioned (boolean), cited_domain, cited_url, citation_type, answer_correctness, competitor_mentions, source_landing_page, human_reviewed.

**Baseline KPIs:** organic qualified leads, non-branded impressions/clicks, indexed priority pages, quote form CVR, AI referral leads (when attributable), monthly citation coverage, technical content review completeness.

---

## 7. Engineering Implementation Tickets

| Ticket | Priority | Effort* | Acceptance criteria |
|---|---|---|---|
| AEO-001 Page inventory/baseline | P0 | S | CSV + GSC/GA4 baseline + owner |
| AEO-002 Crawl/index audit | P0 | M | Key pages eligible, no critical blockers |
| AEO-003 SSR/HTML audit | P0 | S | Answer text in fetched HTML |
| AEO-004 Bot/WAF policy | P0 | M | Documented policy + verified responses |
| AEO-005 Metadata/canonical audit | P0 | M | Priority routes pass automated checks |
| AEO-101 Answer-first components | P1 | M | 5 priority pages upgraded |
| AEO-102 Editorial/technical review | P1 | M | Reviewer workflow and sources |
| AEO-103 Verify all case studies | P1 | L | All projects marked verified/illustrative/removed |
| AEO-104 Company identity | P1 | S | Verified contact and consistent company metadata |
| AEO-105 Typed JSON-LD generation | P1 | M | Valid schemas per page type |
| AEO-106 Content map & dedupe | P1 | M | One mapped canonical per intent |
| AEO-201 GA4/CRM events | P1 | M | Test lead events in analytics + CRM |
| AEO-202 AI benchmark harness | P1 | M | 30 prompts, versioned results, monthly comparison |
| AEO-301 Technical ROI calculator | P2 | L | Transparent formulas, caveats, signed off |
| AEO-302 CI checks | P2 | M | Fail PR on critical SEO regressions |
| AEO-303 External authority | P2 | L | Genuine citations/partnerships/case references only |

*Effort: `S/M/L` relative sizing only; estimate after repo review.

## 8. Proposed GitHub Issue Template

```md
## [AEO-ID] Title
Priority: P0/P1/P2/P3
Area: Technical / Content / Trust / Analytics
Owner: TBD
Status: NOT CHECKED

### What we observed
[Evidence URL / GSC export / source path / screenshot]

### Problem / opportunity
[Specific search intent or technical impact]

### Tasks
- [ ] Inspect existing implementation
- [ ] Implement smallest appropriate fix
- [ ] Add tests and documentation

### Acceptance criteria
- [ ] Verifiable behavior specified here
- [ ] No regression to canonical/indexing/conversion

### QA evidence
- Production URL:
- Test report:
- Reviewer:
```

## 9. Quick-check commands (read-only; adapt to shell)

```bash
# HTTP and redirects
curl -IL https://www.cxenertech.com/
curl -IL https://www.cxenertech.com/knowledge
curl -IL https://www.cxenertech.com/projects

# Crawl-related files (do not assume these exist until verified)
curl -i https://www.cxenertech.com/robots.txt
curl -i https://www.cxenertech.com/sitemap.xml

# Check HTML delivered to a non-JS client
curl -L -s https://www.cxenertech.com/knowledge/articles | head -c 5000

# Basic textual signals (not a replacement for rendered-page + GSC inspection)
curl -Ls https://www.cxenertech.com/ | grep -Eio '<title>[^<]+|rel="canonical"[^>]*|application/ld\+json' | head
```

**Suggested automated QA:** Playwright route smoke tests; sitemap diff; JSON-LD parse/validate; check canonical 200; no accidental noindex; unique H1/title; broken internal links; production vs preview consistency. CI checks must not fail due to optional rich-result types Google does not support.

## 10. 30 / 60 / 90-day execution plan

| Window | Output | Gate |
|---|---|---|
| Day 1–14 | Repo + production audit, GSC/GA4 baseline, fix P0 indexing blockers | All high-value URLs crawlable or blockers documented |
| Day 15–30 | Verified identity + case studies + structured data + content model | No unsupported claims on priority pages |
| Day 31–60 | 5–10 improved pages using *existing slugs*, stronger answer blocks, source references, internal links | Technical and editorial review passed |
| Day 61–90 | AI question benchmark, lead attribution, ROI prototype if validated, regression CI | Monthly benchmark + qualified leads dashboard |

## 11. Definition of Done for the full AEO initiative

- [ ] ทุก priority page มีเจ้าของ URL และ primary question ระบุใน content map
- [ ] ไม่มี P0 indexing/crawling blocker เปิดค้างโดยไม่มีข้อยกเว้นรับรอง
- [ ] หน้า commercial และ technical หลักมี answer-first content ที่ตรวจสอบโดยคนจริง
- [ ] Project/case-study claims ผ่านการตรวจสอบความจริงหรือระบุเป็นตัวอย่างอย่างชัดเจน
- [ ] Metadata/canonical/schema ตรวจผ่านตามประเภทหน้าและข้อกำหนดจริง
- [ ] มี conversion events เชื่อมถึงคุณภาพ lead
- [ ] มี AI citation experiment ที่ทำซ้ำได้พร้อมบันทึกความแปรปรวน
- [ ] มี owner, review cadence, change log และ regression test

---

## 12. Official references & reviewed site pages

- CX ENERTECH homepage: https://www.cxenertech.com/
- Knowledge Center: https://www.cxenertech.com/knowledge
- Articles: https://www.cxenertech.com/knowledge/articles
- Projects: https://www.cxenertech.com/projects
- Case Studies: https://www.cxenertech.com/knowledge/case-studies
- Google Search Central — AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google — Structured data introduction: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google — Structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google — Rich Results Test: https://search.google.com/test/rich-results
- Schema.org validator: https://validator.schema.org/
- Google Search Console: https://search.google.com/search-console
- Google PageSpeed Insights: https://pagespeed.web.dev/

**Next action:** ส่งไฟล์นี้ให้ Coding Agent ตรวจ repository และ production แบบ **read-only ก่อน** จากนั้นให้ออก `AEO_AUDIT_RESULTS.md` (PASS/FAIL/UNKNOWN + evidence) และ GitHub issue backlog โดย **ห้ามแก้ code หรือ publish content จนกว่าจะรีวิวผล audit**.
