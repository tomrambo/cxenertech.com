---
domain: cxenertech.com
live_url: https://www.cxenertech.com
site_type: content
language: th
initialized_at: "2026-09-20T07:14:53.249Z"
seoagent_version: 1.101.1
skill_version: 1.101.1
install_id: e94f1c33-d943-4404-b281-b4d7574805f8
public_dir: public
cms: none
blog_path: /knowledge/articles
content_dir: app/utils
skill_hash: 13ed5ace65b04bcb5b1a16fa9966698271412f2b8a4bd09ec8c59187788d6aac
publishing:
  strategy: other
  blog_path: /knowledge/articles
  content_dir: app/utils
  setup_status: done
  notes: "Knowledge articles render from CMMS (/api/articles/:slug) plus repo fallbacks in app/utils/local-articles.ts and app/utils/seo-calendar-articles.ts. New SEO articles belong in seo-calendar-articles.ts using the existing CalendarArticle shape, then deploy with the site. Do not INSERT into the production CMMS database."
---
# SEOAgent Project — cxenertech.com

Corporate / lead-gen site for CX ENERTECH (บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด): solar rooftop and EV charging installation in Thailand. Homepage, packages, and knowledge hub are public with no auth/cart — `site_type: content`. Primary language is Thai (`html lang=th`). Live origin is https://www.cxenertech.com (CNAME `www.cxenertech.com`, git remote `tomrambo/cxenertech.com`).

Initialized 2026-09-20T07:14:53.249Z with seoagent 1.101.1.
