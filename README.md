# CX ENERTECH Website

Corporate website for **CX ENERTECH** — Smart Energy & EV Infrastructure.

Built with [Nuxt 4](https://nuxt.com).

## Positioning

> **POWERING A SUSTAINABLE FUTURE**  
> Smart Solar & EV Charging Solutions

Two pillars: **Solar Energy** and **EV Charging**, connected by **Smart Energy Ecosystem**.

## Main Navigation

`HOME | ABOUT | SOLAR | EV CHARGING | PROJECTS | KNOWLEDGE | CONTACT` + CTA **ขอใบเสนอราคา**

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate` | Static site generation |
| `NITRO_PRESET=cloudflare-pages npm run build` | Build สำหรับ Cloudflare Pages + Worker |

## Partner registration

หน้า `/partners/become-a-partner` ส่งใบสมัคร Sale Freelance ไปยัง CMMS

1. เบราว์เซอร์โพสต์ไปที่ `/api/partners/register` (Nitro / Cloudflare Worker)
2. Worker ส่งต่อไป `NUXT_CMMS_API_BASE_URL/api/public/partners/sale-freelance`
3. หลังบ้านดูรายการได้ที่ CMMS เมนู **Sale Freelance Partner**

ค่าที่ต้องตั้ง:

- `NUXT_CMMS_API_BASE_URL` — origin ของ bo-ev-cx-cmms
- `PARTNER_INGEST_SECRET` — ต้องตรงกับฝั่ง CMMS (ถ้าเปิดใช้)
- ถ้า generate แบบ static ไม่มี Worker ให้ตั้ง `NUXT_PUBLIC_PARTNER_REGISTER_URL` ชี้ public API ของ CMMS


## Sitemap (routes)

- `/` — Home
- `/about/*` — Company profile, vision, values, org, certifications
- `/solar/*` — Rooftop, Farm, EPC, BOS, Monitoring, Products
- `/ev-charging/*` — Home/Commercial chargers, Station EPC, Management Platform
- `/smart-energy/*` — Energy management & Solar+EV integration
- `/projects` — Project listing & detail
- `/products/*` — Solar & EV products
- `/knowledge/*` — News, articles, FAQ, downloads
- `/partners/*` — Technology, equipment, business partners
- `/career/*` — Life at CX, positions, resume
- `/contact/*` — Contact, quotation, site survey, LINE, maps
