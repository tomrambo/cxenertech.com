/**
 * Charger sell/cost rate tables from official price sheets (อัปเดต 3/12/2568).
 * costByQty = ราคาต้นทุนตามจำนวนเครื่อง
 * sellPrice = ราคาที่แนะนำขาย
 */

export type QtyTier = '<3' | '3-10' | '10-30' | '>30'

export type ChargerPriceRate = {
  id: string
  skuCode: string
  series: string
  nameTh: string
  nameEn: string
  powerKw: number
  phase: '1P' | '3P'
  currentType: 'AC' | 'DC'
  /** Internal / wholesale cost by order quantity */
  costByQty: Record<QtyTier, number | null>
  /** Recommended retail sell price */
  sellPrice: number | null
  currency: 'THB'
  updatedAt: string
  sourceFile: string
  notes?: string
}

export const CHARGER_PRICE_RATES: ChargerPriceRate[] = [
  // DC S-Series
  {
    id: 'rate-dc-s-60',
    skuCode: 'CX-DC60-S',
    series: 'S-Series',
    nameTh: 'เครื่องชาร์จ DC S-Series 60 kW',
    nameEn: 'DC S-Series 60 kW Charger',
    powerKw: 60,
    phase: '3P',
    currentType: 'DC',
    costByQty: { '<3': 360000, '3-10': 350000, '10-30': 345000, '>30': 340000 },
    sellPrice: 468000,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ DC S-Series.pdf',
  },
  {
    id: 'rate-dc-s-120',
    skuCode: 'CX-DC120-S',
    series: 'S-Series',
    nameTh: 'เครื่องชาร์จ DC S-Series 120 kW',
    nameEn: 'DC S-Series 120 kW Charger',
    powerKw: 120,
    phase: '3P',
    currentType: 'DC',
    costByQty: { '<3': 520000, '3-10': 510000, '10-30': 500000, '>30': 480000 },
    sellPrice: 676000,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ DC S-Series.pdf',
  },
  // DC J-Series
  {
    id: 'rate-dc-j-60',
    skuCode: 'CX-DC60-J',
    series: 'J-Series',
    nameTh: 'เครื่องชาร์จ DC J-Series 60 kW',
    nameEn: 'DC J-Series 60 kW Charger',
    powerKw: 60,
    phase: '3P',
    currentType: 'DC',
    costByQty: { '<3': 280000, '3-10': 275000, '10-30': 270000, '>30': 260000 },
    sellPrice: 364000,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ DC J-Series.pdf',
  },
  {
    id: 'rate-dc-j-120',
    skuCode: 'CX-DC120-J',
    series: 'J-Series',
    nameTh: 'เครื่องชาร์จ DC J-Series 120 kW',
    nameEn: 'DC J-Series 120 kW Charger',
    powerKw: 120,
    phase: '3P',
    currentType: 'DC',
    costByQty: { '<3': 380000, '3-10': 370000, '10-30': 360000, '>30': 350000 },
    sellPrice: 494000,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ DC J-Series.pdf',
  },
  {
    id: 'rate-dc-j-180',
    skuCode: 'CX-DC180-J',
    series: 'J-Series',
    nameTh: 'เครื่องชาร์จ DC J-Series 180 kW',
    nameEn: 'DC J-Series 180 kW Charger',
    powerKw: 180,
    phase: '3P',
    currentType: 'DC',
    costByQty: { '<3': null, '3-10': null, '10-30': null, '>30': null },
    sellPrice: null,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ DC J-Series.pdf',
    notes: 'รออัปเดตราคาในตาราง J-Series',
  },
  {
    id: 'rate-dc-j-240',
    skuCode: 'CX-DC240-J',
    series: 'J-Series',
    nameTh: 'เครื่องชาร์จ DC J-Series 240 kW',
    nameEn: 'DC J-Series 240 kW Charger',
    powerKw: 240,
    phase: '3P',
    currentType: 'DC',
    costByQty: { '<3': null, '3-10': null, '10-30': null, '>30': null },
    sellPrice: null,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ DC J-Series.pdf',
    notes: 'รออัปเดตราคาในตาราง J-Series',
  },
  // AC
  {
    id: 'rate-ac-g-7',
    skuCode: 'CX-AC7-G',
    series: 'G-Series',
    nameTh: 'เครื่องชาร์จ AC G-Series 7 kW',
    nameEn: 'AC G-Series 7 kW Charger',
    powerKw: 7,
    phase: '1P',
    currentType: 'AC',
    costByQty: { '<3': 7500, '3-10': 7200, '10-30': 6800, '>30': 6500 },
    sellPrice: 13500,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ AC.pdf',
  },
  {
    id: 'rate-ac-k-7',
    skuCode: 'CX-AC7-K',
    series: 'K-Series',
    nameTh: 'เครื่องชาร์จ AC K-Series 7 kW',
    nameEn: 'AC K-Series 7 kW Charger',
    powerKw: 7,
    phase: '1P',
    currentType: 'AC',
    costByQty: { '<3': 8500, '3-10': 8000, '10-30': 7500, '>30': 7000 },
    sellPrice: 15300,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ AC.pdf',
  },
  {
    id: 'rate-ac-miniz-7',
    skuCode: 'CX-AC7-MINIZ',
    series: 'Mini Z-Series',
    nameTh: 'เครื่องชาร์จ AC Mini Z-Series 7 kW',
    nameEn: 'AC Mini Z-Series 7 kW Charger',
    powerKw: 7,
    phase: '1P',
    currentType: 'AC',
    costByQty: { '<3': 5500, '3-10': 5300, '10-30': 5200, '>30': 5000 },
    sellPrice: 9900,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ AC.pdf',
  },
  {
    id: 'rate-ac-e-22',
    skuCode: 'CX-AC22-E',
    series: 'E-Series',
    nameTh: 'เครื่องชาร์จ AC E-Series 22 kW',
    nameEn: 'AC E-Series 22 kW Charger',
    powerKw: 22,
    phase: '3P',
    currentType: 'AC',
    costByQty: { '<3': 15000, '3-10': 14500, '10-30': 14000, '>30': 13000 },
    sellPrice: 27000,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ AC.pdf',
  },
  {
    id: 'rate-ac-e-11',
    skuCode: 'CX-AC11-E',
    series: 'E-Series',
    nameTh: 'เครื่องชาร์จ AC E-Series 11 kW',
    nameEn: 'AC E-Series 11 kW Charger',
    powerKw: 11,
    phase: '3P',
    currentType: 'AC',
    costByQty: { '<3': 13000, '3-10': 12500, '10-30': 12000, '>30': 11500 },
    sellPrice: 23400,
    currency: 'THB',
    updatedAt: '2025-12-03',
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ AC.pdf',
  },
]

export function listChargerPriceRates(filters?: {
  currentType?: 'AC' | 'DC'
  series?: string
}) {
  let rows = [...CHARGER_PRICE_RATES]
  if (filters?.currentType) rows = rows.filter((r) => r.currentType === filters.currentType)
  if (filters?.series) rows = rows.filter((r) => r.series === filters.series)
  return rows
}

export function getChargerPriceRate(id: string) {
  return CHARGER_PRICE_RATES.find((r) => r.id === id) ?? null
}

export function getChargerPriceRateBySku(skuCode: string) {
  return CHARGER_PRICE_RATES.find((r) => r.skuCode === skuCode) ?? null
}

/** Pick cost for an order quantity */
export function costForQty(rate: ChargerPriceRate, qty: number): number | null {
  if (qty < 3) return rate.costByQty['<3']
  if (qty <= 10) return rate.costByQty['3-10']
  if (qty <= 30) return rate.costByQty['10-30']
  return rate.costByQty['>30']
}

export function marginPreview(rate: ChargerPriceRate, qty = 1) {
  const cost = costForQty(rate, qty)
  const sell = rate.sellPrice
  if (cost == null || sell == null) return null
  const margin = sell - cost
  return {
    cost,
    sell,
    margin,
    marginPct: sell > 0 ? margin / sell : 0,
  }
}
