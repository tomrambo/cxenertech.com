/**
 * CX ENERTECH rooftop package seed
 *
 * Sell price follows the same tier as the quotation engine:
 *   ≤5 kW  → 32,000 บาท/kW
 *   ≤10 kW → 28,000 บาท/kW
 *   >10 kW → 25,000 บาท/kW
 * String = standard · Micro / Optimizer = premium (+15%)
 * 5 kW 3-phase adds 15,000 บาท (three-phase inverter)
 *
 * Yield / appliances / savings stay on the rooftop performance table
 * (~1,170 หน่วย/kWp/ปี). Prices are CX starting quotes, not PEA promo.
 */

export type SolarInverterOption = {
  available: boolean
  priceFrom: number | null
  inverterBrand: string | null
  panelBrand: string | null
  note?: string
}

export type SolarAppliances = {
  led18w: number
  tv55inch: number
  fridge15cu: number
  ac12000btu: number
}

export type SeedSolarPackage = {
  id: string
  slug: string
  slugAliases?: string[]
  code: string
  name: string
  nameTh: string
  productType: 'rooftop'
  sourceLabel: string
  tagline: string
  description: string
  powerKw: number
  phase: '1P' | '3P'
  areaM2: number
  yieldKwhYear: number
  appliances: SolarAppliances
  savingsMonthlyThb: number
  stringInverter: SolarInverterOption
  microInverter: SolarInverterOption
  includes: string[]
  features: string[]
  sortOrder: number
  image?: string | null
  effectiveFrom: string
}

const SOURCE_LABEL = 'CX ENERTECH · ราคาเริ่มต้นอ้างอิง 2569'
const EFFECTIVE_FROM = '2026-08-01'
const PREMIUM_MARKUP = 1.15
const PHASE_3P_ADDER_5KW = 15_000

const INCLUDES = [
  'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
  'โครงสร้างติดตั้งบนหลังคา',
  'งานไฟฟ้าและเชื่อมต่อระบบ',
  'ยื่นเอกสารและเชื่อมต่อการไฟฟ้า (PEA/MEA ตามพื้นที่)',
]

function roundThousand(n: number) {
  return Math.round(n / 1000) * 1000
}

/** CX standard (string) / premium (micro) starting price */
export function cxRooftopPrice(
  kw: number,
  tier: 'standard' | 'premium',
  phase: '1P' | '3P',
) {
  let base = kw <= 5 ? kw * 32_000 : kw <= 10 ? kw * 28_000 : kw * 25_000
  if (tier === 'premium') base *= PREMIUM_MARKUP
  if (phase === '3P' && kw === 5) base += PHASE_3P_ADDER_5KW
  return roundThousand(base)
}

export const SOLAR_PACKAGE_SEED: SeedSolarPackage[] = [
  {
    id: 'pkg-cx-rt-3',
    slug: 'cx-rt-3kw',
    slugAliases: ['pea-solar-3kw'],
    code: 'CX-RT-3',
    name: 'CX Rooftop 3 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 3 kW',
    productType: 'rooftop',
    sourceLabel: SOURCE_LABEL,
    tagline: '3 kW · 1 เฟส · พื้นที่ 18 ตร.ม. · เริ่มต้นสำหรับบ้าน',
    description:
      'แพ็กเกจโซลาร์หลังคาขนาดเล็ก เหมาะกับบ้านที่ใช้ไฟไม่มาก รองรับเฉพาะ Micro Inverter / Power Optimizer',
    powerKw: 3,
    phase: '1P',
    areaM2: 18,
    yieldKwhYear: 3510,
    appliances: { led18w: 15, tv55inch: 1, fridge15cu: 1, ac12000btu: 1 },
    savingsMonthlyThb: 1500,
    stringInverter: {
      available: false,
      priceFrom: null,
      inverterBrand: null,
      panelBrand: null,
      note: 'ไม่มีตัวเลือก String Inverter สำหรับขนาด 3 kW',
    },
    microInverter: {
      available: true,
      priceFrom: cxRooftopPrice(3, 'premium', '1P'),
      inverterBrand: 'Deye',
      panelBrand: 'JA SOLAR',
    },
    includes: [...INCLUDES],
    features: [
      'เหมาะกับบ้านขนาดเล็ก',
      'Micro Inverter / Power Optimizer',
      'ประมาณการผลิต ~3,510 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~1,500 บาท/เดือน',
    ],
    sortOrder: 10,
    image: '/images/projects/project-residential-solar.jpg',
    effectiveFrom: EFFECTIVE_FROM,
  },
  {
    id: 'pkg-cx-rt-5-1p',
    slug: 'cx-rt-5kw-1p',
    slugAliases: ['pea-solar-5kw-1p'],
    code: 'CX-RT-5-1P',
    name: 'CX Rooftop 5 kW (1-Phase)',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 5 kW (1 เฟส)',
    productType: 'rooftop',
    sourceLabel: SOURCE_LABEL,
    tagline: '5 kW · 1 เฟส · พื้นที่ 30 ตร.ม. · บ้านและอาคารเล็ก',
    description:
      'แพ็กเกจ 5 kW ระบบ 1 เฟส เลือกได้ทั้ง String และ Micro Inverter — ขนาดยอดนิยมสำหรับบ้าน',
    powerKw: 5,
    phase: '1P',
    areaM2: 30,
    yieldKwhYear: 5840,
    appliances: { led18w: 20, tv55inch: 4, fridge15cu: 1, ac12000btu: 2 },
    savingsMonthlyThb: 2500,
    stringInverter: {
      available: true,
      priceFrom: cxRooftopPrice(5, 'standard', '1P'),
      inverterBrand: 'Deye',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: cxRooftopPrice(5, 'premium', '1P'),
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    includes: [...INCLUDES],
    features: [
      'เลือก String หรือ Micro Inverter ได้',
      'ประมาณการผลิต ~5,840 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~2,500 บาท/เดือน',
      'รองรับแอร์ 12,000 BTU ได้ประมาณ 2 เครื่อง',
    ],
    sortOrder: 20,
    image: '/images/projects/project-residential-solar.jpg',
    effectiveFrom: EFFECTIVE_FROM,
  },
  {
    id: 'pkg-cx-rt-5-3p',
    slug: 'cx-rt-5kw-3p',
    slugAliases: ['pea-solar-5kw-3p'],
    code: 'CX-RT-5-3P',
    name: 'CX Rooftop 5 kW (3-Phase)',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 5 kW (3 เฟส)',
    productType: 'rooftop',
    sourceLabel: SOURCE_LABEL,
    tagline: '5 kW · 3 เฟส · พื้นที่ 30 ตร.ม. · อาคารที่ใช้ไฟ 3 เฟส',
    description:
      'แพ็กเกจ 5 kW ระบบ 3 เฟส สำหรับอาคารที่มิเตอร์เป็นสามเฟส — อินเวอร์เตอร์ 3 เฟสคิดเพิ่มจากชุด 1 เฟส',
    powerKw: 5,
    phase: '3P',
    areaM2: 30,
    yieldKwhYear: 5840,
    appliances: { led18w: 20, tv55inch: 4, fridge15cu: 1, ac12000btu: 2 },
    savingsMonthlyThb: 2500,
    stringInverter: {
      available: true,
      priceFrom: cxRooftopPrice(5, 'standard', '3P'),
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: cxRooftopPrice(5, 'premium', '3P'),
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [...INCLUDES],
    features: [
      'ระบบ 3 เฟส',
      'ราคาสูงกว่าชุด 1 เฟสตามต้นทุนอินเวอร์เตอร์',
      'ประมาณการผลิต ~5,840 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~2,500 บาท/เดือน',
    ],
    sortOrder: 30,
    image: '/images/projects/project-residential-solar.jpg',
    effectiveFrom: EFFECTIVE_FROM,
  },
  {
    id: 'pkg-cx-rt-10',
    slug: 'cx-rt-10kw',
    slugAliases: ['pea-solar-10kw'],
    code: 'CX-RT-10',
    name: 'CX Rooftop 10 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 10 kW',
    productType: 'rooftop',
    sourceLabel: SOURCE_LABEL,
    tagline: '10 kW · 3 เฟส · พื้นที่ 60 ตร.ม. · บ้านใหญ่ / อาคารพาณิชย์เล็ก',
    description:
      'แพ็กเกจ 10 kW สำหรับบ้านขนาดใหญ่หรืออาคารพาณิชย์ขนาดเล็ก — ราคาต่อ kW ต่ำกว่าชุดบ้านเล็ก',
    powerKw: 10,
    phase: '3P',
    areaM2: 60,
    yieldKwhYear: 11680,
    appliances: { led18w: 25, tv55inch: 8, fridge15cu: 3, ac12000btu: 3 },
    savingsMonthlyThb: 5000,
    stringInverter: {
      available: true,
      priceFrom: cxRooftopPrice(10, 'standard', '3P'),
      inverterBrand: 'Deye',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: cxRooftopPrice(10, 'premium', '3P'),
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [...INCLUDES],
    features: [
      'กำลังผลิตสูงขึ้นชัดเจน',
      'ประมาณการผลิต ~11,680 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~5,000 บาท/เดือน',
      'รองรับแอร์ได้ประมาณ 3 เครื่อง',
    ],
    sortOrder: 40,
    image: '/images/projects/project-factory-rooftop.jpg',
    effectiveFrom: EFFECTIVE_FROM,
  },
  {
    id: 'pkg-cx-rt-15',
    slug: 'cx-rt-15kw',
    slugAliases: ['pea-solar-15kw'],
    code: 'CX-RT-15',
    name: 'CX Rooftop 15 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 15 kW',
    productType: 'rooftop',
    sourceLabel: SOURCE_LABEL,
    tagline: '15 kW · 3 เฟส · พื้นที่ 90 ตร.ม. · อาคารพาณิชย์',
    description:
      'แพ็กเกจ 15 kW สำหรับอาคารพาณิชย์และบ้านที่ใช้ไฟสูง',
    powerKw: 15,
    phase: '3P',
    areaM2: 90,
    yieldKwhYear: 17520,
    appliances: { led18w: 35, tv55inch: 10, fridge15cu: 5, ac12000btu: 5 },
    savingsMonthlyThb: 7500,
    stringInverter: {
      available: true,
      priceFrom: cxRooftopPrice(15, 'standard', '3P'),
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: cxRooftopPrice(15, 'premium', '3P'),
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [...INCLUDES],
    features: [
      'สเกลอาคารพาณิชย์',
      'ประมาณการผลิต ~17,520 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~7,500 บาท/เดือน',
      'Micro เป็นขั้นพรีเมียมจากชุด String',
    ],
    sortOrder: 50,
    image: '/images/projects/project-factory-rooftop.jpg',
    effectiveFrom: EFFECTIVE_FROM,
  },
  {
    id: 'pkg-cx-rt-20',
    slug: 'cx-rt-20kw',
    slugAliases: ['pea-solar-20kw'],
    code: 'CX-RT-20',
    name: 'CX Rooftop 20 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 20 kW',
    productType: 'rooftop',
    sourceLabel: SOURCE_LABEL,
    tagline: '20 kW · 3 เฟส · พื้นที่ 120 ตร.ม. · แพ็กเกจใหญ่สุดในไลน์บ้าน/SME',
    description:
      'แพ็กเกจขนาดใหญ่สุดในไลน์รูฟท็อป CX สำหรับอาคารที่ใช้ไฟสูง',
    powerKw: 20,
    phase: '3P',
    areaM2: 120,
    yieldKwhYear: 23360,
    appliances: { led18w: 40, tv55inch: 18, fridge15cu: 6, ac12000btu: 7 },
    savingsMonthlyThb: 10000,
    stringInverter: {
      available: true,
      priceFrom: cxRooftopPrice(20, 'standard', '3P'),
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: cxRooftopPrice(20, 'premium', '3P'),
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [...INCLUDES],
    features: [
      'กำลังสูงสุดในไลน์ CX Rooftop',
      'ประมาณการผลิต ~23,360 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~10,000 บาท/เดือน',
      'รองรับแอร์ได้ประมาณ 7 เครื่อง',
    ],
    sortOrder: 60,
    image: '/images/projects/project-factory-rooftop.jpg',
    effectiveFrom: EFFECTIVE_FROM,
  },
]
