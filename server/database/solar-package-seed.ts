/**
 * PEA SOLAR rooftop package seed
 * Source: PACKAGE PEA SOLAR price table (ปรับราคาใหม่)
 * Effective: 24 มีนาคม 2569 (2026-03-24) onwards per PEA conditions
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

export const SOLAR_PACKAGE_SEED: SeedSolarPackage[] = [
  {
    id: 'pkg-pea-solar-3',
    slug: 'pea-solar-3kw',
    code: 'PEA-SOLAR-3',
    name: 'PEA Solar 3 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 3 kW',
    productType: 'rooftop',
    sourceLabel: 'PACKAGE PEA SOLAR · ปรับราคาใหม่',
    tagline: '3 kW · 1 เฟส · พื้นที่ 18 ตร.ม. · เริ่มต้นสำหรับบ้าน',
    description:
      'PEA Solar rooftop package 3 kW single-phase — แพ็กเกจโซลาร์หลังคาขนาดเล็ก เหมาะกับบ้านที่ใช้ไฟไม่มาก รองรับเฉพาะ Micro Inverter / Power Optimizer',
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
      priceFrom: 118500,
      inverterBrand: 'Deye',
      panelBrand: 'JA SOLAR',
    },
    includes: [
      'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
      'โครงสร้างติดตั้งบนหลังคา',
      'งานไฟฟ้าและเชื่อมต่อระบบ',
      'ทดสอบและส่งมอบตามเงื่อนไข กฟภ.',
    ],
    features: [
      'เหมาะกับบ้านขนาดเล็ก',
      'Micro Inverter / Power Optimizer',
      'ประมาณการผลิต ~3,510 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~1,500 บาท/เดือน',
    ],
    sortOrder: 10,
    image: '/images/solar/pea-solar-price-table.png',
    effectiveFrom: '2026-03-24',
  },
  {
    id: 'pkg-pea-solar-5-1p',
    slug: 'pea-solar-5kw-1p',
    code: 'PEA-SOLAR-5-1P',
    name: 'PEA Solar 5 kW (1-Phase)',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 5 kW (1 เฟส)',
    productType: 'rooftop',
    sourceLabel: 'PACKAGE PEA SOLAR · ปรับราคาใหม่',
    tagline: '5 kW · 1 เฟส · พื้นที่ 30 ตร.ม. · บ้านและอาคารเล็ก',
    description:
      'PEA Solar 5 kW single-phase rooftop — แพ็กเกจ 5 kW ระบบ 1 เฟส เลือกได้ทั้ง String และ Micro Inverter',
    powerKw: 5,
    phase: '1P',
    areaM2: 30,
    yieldKwhYear: 5840,
    appliances: { led18w: 20, tv55inch: 4, fridge15cu: 1, ac12000btu: 2 },
    savingsMonthlyThb: 2500,
    stringInverter: {
      available: true,
      priceFrom: 139000,
      inverterBrand: 'Deye',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: 160500,
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    includes: [
      'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
      'โครงสร้างติดตั้งบนหลังคา',
      'งานไฟฟ้าและเชื่อมต่อระบบ',
      'ทดสอบและส่งมอบตามเงื่อนไข กฟภ.',
    ],
    features: [
      'เลือก String หรือ Micro Inverter ได้',
      'ประมาณการผลิต ~5,840 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~2,500 บาท/เดือน',
      'รองรับแอร์ 12,000 BTU ได้ประมาณ 2 เครื่อง',
    ],
    sortOrder: 20,
    image: '/images/solar/pea-solar-price-table.png',
    effectiveFrom: '2026-03-24',
  },
  {
    id: 'pkg-pea-solar-5-3p',
    slug: 'pea-solar-5kw-3p',
    code: 'PEA-SOLAR-5-3P',
    name: 'PEA Solar 5 kW (3-Phase)',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 5 kW (3 เฟส)',
    productType: 'rooftop',
    sourceLabel: 'PACKAGE PEA SOLAR · ปรับราคาใหม่',
    tagline: '5 kW · 3 เฟส · พื้นที่ 30 ตร.ม. · อาคารที่ใช้ไฟ 3 เฟส',
    description:
      'PEA Solar 5 kW three-phase rooftop — แพ็กเกจ 5 kW ระบบ 3 เฟส สำหรับอาคารที่มิเตอร์เป็นสามเฟส',
    powerKw: 5,
    phase: '3P',
    areaM2: 30,
    yieldKwhYear: 5840,
    appliances: { led18w: 20, tv55inch: 4, fridge15cu: 1, ac12000btu: 2 },
    savingsMonthlyThb: 2500,
    stringInverter: {
      available: true,
      priceFrom: 163900,
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: 155000,
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [
      'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
      'โครงสร้างติดตั้งบนหลังคา',
      'งานไฟฟ้าและเชื่อมต่อระบบ',
      'ทดสอบและส่งมอบตามเงื่อนไข กฟภ.',
    ],
    features: [
      'ระบบ 3 เฟส',
      'Micro เริ่มถูกกว่า String ในขนาดนี้',
      'ประมาณการผลิต ~5,840 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~2,500 บาท/เดือน',
    ],
    sortOrder: 30,
    image: '/images/solar/pea-solar-price-table.png',
    effectiveFrom: '2026-03-24',
  },
  {
    id: 'pkg-pea-solar-10',
    slug: 'pea-solar-10kw',
    code: 'PEA-SOLAR-10',
    name: 'PEA Solar 10 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 10 kW',
    productType: 'rooftop',
    sourceLabel: 'PACKAGE PEA SOLAR · ปรับราคาใหม่',
    tagline: '10 kW · 3 เฟส · พื้นที่ 60 ตร.ม. · บ้านใหญ่ / อาคารพาณิชย์เล็ก',
    description:
      'PEA Solar 10 kW three-phase rooftop — แพ็กเกจ 10 kW สำหรับบ้านขนาดใหญ่หรืออาคารพาณิชย์ขนาดเล็ก',
    powerKw: 10,
    phase: '3P',
    areaM2: 60,
    yieldKwhYear: 11680,
    appliances: { led18w: 25, tv55inch: 8, fridge15cu: 3, ac12000btu: 3 },
    savingsMonthlyThb: 5000,
    stringInverter: {
      available: true,
      priceFrom: 214400,
      inverterBrand: 'Deye',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: 239200,
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [
      'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
      'โครงสร้างติดตั้งบนหลังคา',
      'งานไฟฟ้าและเชื่อมต่อระบบ',
      'ทดสอบและส่งมอบตามเงื่อนไข กฟภ.',
    ],
    features: [
      'กำลังผลิตสูงขึ้นชัดเจน',
      'ประมาณการผลิต ~11,680 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~5,000 บาท/เดือน',
      'รองรับแอร์ได้ประมาณ 3 เครื่อง',
    ],
    sortOrder: 40,
    image: '/images/solar/pea-solar-price-table.png',
    effectiveFrom: '2026-03-24',
  },
  {
    id: 'pkg-pea-solar-15',
    slug: 'pea-solar-15kw',
    code: 'PEA-SOLAR-15',
    name: 'PEA Solar 15 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 15 kW',
    productType: 'rooftop',
    sourceLabel: 'PACKAGE PEA SOLAR · ปรับราคาใหม่',
    tagline: '15 kW · 3 เฟส · พื้นที่ 90 ตร.ม. · อาคารพาณิชย์',
    description:
      'PEA Solar 15 kW three-phase rooftop — แพ็กเกจ 15 kW สำหรับอาคารพาณิชย์และบ้านที่ใช้ไฟสูง',
    powerKw: 15,
    phase: '3P',
    areaM2: 90,
    yieldKwhYear: 17520,
    appliances: { led18w: 35, tv55inch: 10, fridge15cu: 5, ac12000btu: 5 },
    savingsMonthlyThb: 7500,
    stringInverter: {
      available: true,
      priceFrom: 316500,
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: 319400,
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [
      'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
      'โครงสร้างติดตั้งบนหลังคา',
      'งานไฟฟ้าและเชื่อมต่อระบบ',
      'ทดสอบและส่งมอบตามเงื่อนไข กฟภ.',
    ],
    features: [
      'สเกลอาคารพาณิชย์',
      'ประมาณการผลิต ~17,520 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~7,500 บาท/เดือน',
      'String และ Micro ราคาใกล้เคียงกัน',
    ],
    sortOrder: 50,
    image: '/images/solar/pea-solar-price-table.png',
    effectiveFrom: '2026-03-24',
  },
  {
    id: 'pkg-pea-solar-20',
    slug: 'pea-solar-20kw',
    code: 'PEA-SOLAR-20',
    name: 'PEA Solar 20 kW',
    nameTh: 'แพ็กเกจโซลาร์รูฟท็อป 20 kW',
    productType: 'rooftop',
    sourceLabel: 'PACKAGE PEA SOLAR · ปรับราคาใหม่',
    tagline: '20 kW · 3 เฟส · พื้นที่ 120 ตร.ม. · แพ็กเกจใหญ่สุดในตาราง',
    description:
      'PEA Solar 20 kW three-phase rooftop — แพ็กเกจขนาดใหญ่สุดในตาราง PEA Solar สำหรับอาคารที่ใช้ไฟสูง',
    powerKw: 20,
    phase: '3P',
    areaM2: 120,
    yieldKwhYear: 23360,
    appliances: { led18w: 40, tv55inch: 18, fridge15cu: 6, ac12000btu: 7 },
    savingsMonthlyThb: 10000,
    stringInverter: {
      available: true,
      priceFrom: 388200,
      inverterBrand: 'HUAWEI',
      panelBrand: 'JinkoSolar',
    },
    microInverter: {
      available: true,
      priceFrom: 408400,
      inverterBrand: 'Hoymiles',
      panelBrand: 'JinkoSolar',
    },
    includes: [
      'แผงโซลาร์และอินเวอร์เตอร์ตามแพ็กเกจ',
      'โครงสร้างติดตั้งบนหลังคา',
      'งานไฟฟ้าและเชื่อมต่อระบบ',
      'ทดสอบและส่งมอบตามเงื่อนไข กฟภ.',
    ],
    features: [
      'กำลังสูงสุดในไลน์ PEA Solar ตารางนี้',
      'ประมาณการผลิต ~23,360 หน่วย/ปี',
      'ลดค่าไฟเฉลี่ย ~10,000 บาท/เดือน',
      'รองรับแอร์ได้ประมาณ 7 เครื่อง',
    ],
    sortOrder: 60,
    image: '/images/solar/pea-solar-price-table.png',
    effectiveFrom: '2026-03-24',
  },
]
