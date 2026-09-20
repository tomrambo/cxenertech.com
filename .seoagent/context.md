# Business Context

- **Name:** CX ENERTECH (บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด)
- **Type:** LOCAL
- **Audience:** เจ้าของบ้าน / อาคารพาณิชย์ / โรงงานและนิคมที่ต้องการลดค่าไฟหรือติดตั้งสถานีชาร์จ — ผู้มีอำนาจอนุมัติงบ (เจ้าของกิจการ นิติบุคคล วิศวกรโรงงาน) ไม่ใช่ผู้เลื่อนดูสินค้าทั่วไป
- **Industry:** Solar rooftop EPC, EV charging installation, smart energy
- **Location:** กรุงเทพมหานคร (ลาดพร้าว) และพื้นที่ให้บริการทั่วไทย โดยเฉพาะกรุงเทพ ปริมณฑล และนิคมตะวันออก — สำนักงาน เลขที่ 429/20 หมู่บ้านพรีเมี่ยมเพลส 9 ถนนสุคนธสวัสดิ์ แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
- **Description:** บริษัทรับติดตั้งโซล่าเซลล์ solar rooftop และ EV Station แบบสำรวจไซต์แล้วออกใบเสนอราคา ไม่ใช่ร้านค้าออนไลน์และไม่ใช่ผู้ให้กู้ แพ็กเกจบนเว็บเป็นราคาอ้างอิง จุดขายคือทีมติดตั้งเอง งานไฟฟ้าตามมาตรฐาน และการออกแบบถึงส่งมอบในที่เดียว รวมสินเชื่อผ่อนเป็นเจ้าของระบบ (จัดเอกสารผู้ขายให้ธนาคาร)

# Writing Instructions

- Write in Thai first (ภาษาที่ลูกค้าค้น). English is only for bilingual UI chrome or when a page already exists in EN — never switch a Thai intent page to English.
- Sound like a site engineer talking to a buyer: concrete (kW, เฟส, บิล 6–12 เดือน, MEA/PEA, มิเตอร์, หลังคา) not motivational clean-energy copy.
- Every article should end with a next step to a real page: แพ็กเกจ, จุดคืนทุน, ขอใบเสนอราคา, หรือ LINE — not a generic “contact us”.
- Numbers on the site are package references, not guaranteed payback. Say so. Never invent prices, tCO₂, or year-payback as facts.
- Prefer internal links to existing landings (`/solar/5kw`, `/solar/rooftop/factory`, `/ev-charging/packages`, `/contact/quotation`) over new overlapping URLs.
- New articles go in `app/utils/seo-calendar-articles.ts` matching the existing `CalendarArticle` shape (Thai HTML body, FAQs, `relatedService`).

# Reference URLs

- https://www.cxenertech.com
- https://www.cxenertech.com/solar/rooftop/packages
- https://www.cxenertech.com/solar/payback
- https://www.cxenertech.com/ev-charging/packages
- https://www.cxenertech.com/knowledge/articles
- https://www.cxenertech.com/contact/quotation

# Topics to Avoid

- Promising a specific payback year or kWh yield without a site survey
- Presenting CX ENERTECH as a lender, bank, or PPA financier that approves loans on the website
- “Invest in an EV station for passive income” packages — the site sells owner-operated stations, not investment products
- Competitor-bashing or unnamed “cheap installer” attacks
- Medical, political, or unrelated lifestyle content

# Content Tone

professional, direct, Thai B2B/B2C mixed — วิศวกรคุยกับลูกค้า ไม่ใช่โฆษณาเอเจนซี่

# Additional Notes

- Primary CTAs: ขอใบเสนอราคา, LINE @cxenertech, โทร +6699-624-6444, นัดสำรวจพื้นที่.
- Two pillars: Solar Energy and EV Charging, joined by Smart Energy Ecosystem.
- Existing knowledge articles already live at `/knowledge/articles/{slug}`; do not duplicate those slugs.
- Cloud briefs may arrive in English keywords — rewrite for Thai search intent before publishing.
