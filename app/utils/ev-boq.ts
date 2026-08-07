/**
 * EV Charging — BOQ (Bill of Quantities) + Quotation schema
 */

import {
  type Money,
  type StationConfig,
  getChargerSku,
  stationTotals,
  chargerLineUnitPrice,
} from './ev-packages'

export type BoqCategoryCode =
  | 'A_EQUIPMENT'
  | 'B_ELECTRICAL'
  | 'C_CIVIL'
  | 'D_SYSTEMS'
  | 'E_SOFTWARE'
  | 'F_EPC_SERVICES'
  | 'G_CONTINGENCY'

export type BoqUnit =
  | 'set'
  | 'unit'
  | 'gun'
  | 'bay'
  | 'm2'
  | 'm'
  | 'lot'
  | 'month'
  | 'kva'

export type BoqLine = {
  id: string
  category: BoqCategoryCode
  code: string
  description: string
  unit: BoqUnit
  qty: number
  /** Internal cost per unit */
  unitCost: Money
  /** Customer sell price per unit */
  unitPrice: Money
  /** false = locked formula line still editable via override flags */
  editable: boolean
  /** CAPEX vs recurring OPEX (software monthly etc.) */
  capex: boolean
  notes?: string
}

export type BoqTemplateLine = Omit<BoqLine, 'id' | 'qty'> & {
  /** How to derive qty from station totals */
  qtyRule:
    | { type: 'fixed'; value: number }
    | { type: 'chargerQty' }
    | { type: 'nozzleCount' }
    | { type: 'parkingBays' }
    | { type: 'footprintM2' }
    | { type: 'fromTransformerKva'; factor?: number }
    | { type: 'pctOfCategories'; categories: BoqCategoryCode[]; pct: number }
}

export type BoqTemplate = {
  id: string
  name: string
  presetCode: string | null
  lines: BoqTemplateLine[]
}

export type PricingRule = {
  contingencyPct: number
  vatPct: number
  /** Extra EPC % on categories A–D if not already in template lines */
  epcServicePct: number
  discountAmount: Money
}

export const DEFAULT_PRICING: PricingRule = {
  contingencyPct: 0.05,
  vatPct: 0.07,
  epcServicePct: 0,
  discountAmount: 0,
}

export type BoqSummary = {
  lines: BoqLine[]
  byCategory: Record<BoqCategoryCode, Money>
  equipmentSub: Money
  epcSub: Money
  softwareCapex: Money
  softwareOpexMonthly: Money
  subtotal: Money
  contingency: Money
  discountAmount: Money
  beforeVat: Money
  vat: Money
  grandTotal: Money
  /** Internal — not for customer PDF */
  totalCost: Money
  grossMargin: Money
  grossMarginPct: number
}

export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'expired' | 'revised'

export type QuotationCustomer = {
  name: string
  company: string
  email: string
  phone: string
  taxId?: string
  address?: string
}

export type Quotation = {
  id: string
  number: string
  revision: number
  status: QuotationStatus
  createdAt: string
  validUntil: string
  projectName: string
  customer: QuotationCustomer
  station: StationConfig
  lines: BoqLine[]
  pricing: PricingRule
  summary: BoqSummary
  leadTimeWeeks: number
  paymentTerms: string
  exclusions: string[]
  notes: string
}

export const BOQ_CATEGORY_LABELS: Record<BoqCategoryCode, string> = {
  A_EQUIPMENT: 'A. Charging Equipment',
  B_ELECTRICAL: 'B. Electrical HV/LV',
  C_CIVIL: 'C. Civil & Structure',
  D_SYSTEMS: 'D. Low Current Systems',
  E_SOFTWARE: 'E. Software & Platform',
  F_EPC_SERVICES: 'F. EPC Services',
  G_CONTINGENCY: 'G. Contingency & Margin',
}

const emptyCategoryTotals = (): Record<BoqCategoryCode, Money> => ({
  A_EQUIPMENT: 0,
  B_ELECTRICAL: 0,
  C_CIVIL: 0,
  D_SYSTEMS: 0,
  E_SOFTWARE: 0,
  F_EPC_SERVICES: 0,
  G_CONTINGENCY: 0,
})

function lineId(code: string) {
  return `boq-${code}-${Math.random().toString(36).slice(2, 8)}`
}

/** Shared EPC lines used across hub templates */
function baseEpcLines(scale: 'S' | 'M' | 'L'): BoqTemplateLine[] {
  const canopyM2 = scale === 'S' ? 78 : scale === 'M' ? 225 : 192
  const cctv = 4
  const civilBay = scale === 'S' ? 4 : scale === 'M' ? 10 : 4

  return [
    {
      category: 'B_ELECTRICAL',
      code: 'EL-TR',
      description: 'Transformer + ติดตั้ง',
      unit: 'kva',
      unitCost: 1800,
      unitPrice: 2500,
      editable: true,
      capex: true,
      qtyRule: { type: 'fromTransformerKva' },
    },
    {
      category: 'B_ELECTRICAL',
      code: 'EL-MDB',
      description: 'MDB / LV board / feeder / earthing / SPD',
      unit: 'set',
      unitCost: scale === 'S' ? 180000 : scale === 'M' ? 420000 : 380000,
      unitPrice: scale === 'S' ? 260000 : scale === 'M' ? 580000 : 520000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'C_CIVIL',
      code: 'CV-CANOPY',
      description: 'โครงสร้างหลังคา / canopy',
      unit: 'm2',
      unitCost: 3500,
      unitPrice: 5200,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: canopyM2 },
    },
    {
      category: 'C_CIVIL',
      code: 'CV-BAY',
      description: 'งานจุดจอด EV (พื้น / ตีเส้น / ป้ายช่อง)',
      unit: 'bay',
      unitCost: 18000,
      unitPrice: 28000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: civilBay },
    },
    {
      category: 'C_CIVIL',
      code: 'CV-LAND',
      description: 'ปรับพื้นที่ / landscaping เบื้องต้น',
      unit: 'lot',
      unitCost: scale === 'S' ? 40000 : 80000,
      unitPrice: scale === 'S' ? 65000 : 120000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'D_SYSTEMS',
      code: 'SY-CCTV',
      description: `CCTV ${cctv} กล้อง + NVR`,
      unit: 'set',
      unitCost: 45000,
      unitPrice: 72000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'D_SYSTEMS',
      code: 'SY-NET',
      description: 'ระบบสื่อสาร / Internet / rack',
      unit: 'set',
      unitCost: 15000,
      unitPrice: 25000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'D_SYSTEMS',
      code: 'SY-SIGN',
      description: 'ป้ายสถานี / branding signage',
      unit: 'set',
      unitCost: 20000,
      unitPrice: 35000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'E_SOFTWARE',
      code: 'SW-CMS',
      description: 'OCPP CMS setup + payment gateway onboarding',
      unit: 'lot',
      unitCost: 30000,
      unitPrice: 50000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'E_SOFTWARE',
      code: 'SW-NET-M',
      description: 'Internet / SIM ประจำเดือน (OPEX)',
      unit: 'month',
      unitCost: 1500,
      unitPrice: 3000,
      editable: true,
      capex: false,
      qtyRule: { type: 'fixed', value: 1 },
      notes: 'คิดแยกจาก CAPEX ใบเสนอราคา',
    },
    {
      category: 'F_EPC_SERVICES',
      code: 'EP-DESIGN',
      description: 'Survey + Engineering design',
      unit: 'lot',
      unitCost: scale === 'S' ? 40000 : 90000,
      unitPrice: scale === 'S' ? 70000 : 150000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
    {
      category: 'F_EPC_SERVICES',
      code: 'EP-INSTALL',
      description: 'ติดตั้ง ทดสอบ Commissioning + training',
      unit: 'lot',
      unitCost: scale === 'S' ? 120000 : scale === 'M' ? 280000 : 220000,
      unitPrice: scale === 'S' ? 180000 : scale === 'M' ? 420000 : 350000,
      editable: true,
      capex: true,
      qtyRule: { type: 'fixed', value: 1 },
    },
  ]
}

export const boqTemplates: BoqTemplate[] = [
  {
    id: 'boq-cx-s4',
    name: 'BOQ CX Station S4',
    presetCode: 'CX-S4',
    lines: baseEpcLines('S'),
  },
  {
    id: 'boq-cx-s10',
    name: 'BOQ CX Station S10',
    presetCode: 'CX-S10',
    lines: baseEpcLines('M'),
  },
  {
    id: 'boq-cx-hub',
    name: 'BOQ CX Station Hub',
    presetCode: 'CX-HUB',
    lines: baseEpcLines('L'),
  },
]

export function getBoqTemplate(id: string) {
  return boqTemplates.find((t) => t.id === id)
}

export function getBoqTemplateByPreset(presetCode: string) {
  return boqTemplates.find((t) => t.presetCode === presetCode)
}

function resolveQty(
  rule: BoqTemplateLine['qtyRule'],
  station: StationConfig,
  totals: ReturnType<typeof stationTotals>,
): number {
  switch (rule.type) {
    case 'fixed':
      return rule.value
    case 'chargerQty':
      return totals.chargerQty
    case 'nozzleCount':
      return totals.nozzleCount
    case 'parkingBays':
      return totals.parkingBays
    case 'footprintM2':
      return station.footprint
        ? station.footprint.widthM * station.footprint.depthM
        : 0
    case 'fromTransformerKva':
      return totals.transformer.maxKva * (rule.factor ?? 1)
    case 'pctOfCategories':
      return 1
    default:
      return 0
  }
}

/** Build equipment BOQ lines from station charger configs */
export function buildEquipmentLines(station: StationConfig): BoqLine[] {
  return station.chargers.flatMap((cfg) => {
    const sku = getChargerSku(cfg.skuId)
    if (!sku) return []
    const unitPrice = chargerLineUnitPrice(cfg, sku)
    const optCost = cfg.selectedOptionIds.reduce((sum, id) => {
      const opt = sku.optionAdders.find((o) => o.id === id)
      return sum + (opt?.cost ?? 0)
    }, 0)
    return [
      {
        id: lineId(sku.code),
        category: 'A_EQUIPMENT' as const,
        code: sku.code,
        description: `${sku.name} (${cfg.powerKw} kW · ${cfg.gunsPerUnit} gun · ${cfg.connector})`,
        unit: 'unit' as const,
        qty: cfg.qty,
        unitCost: sku.unitCost + optCost,
        unitPrice,
        editable: true,
        capex: true,
      },
    ]
  })
}

export function materializeTemplate(
  template: BoqTemplate,
  station: StationConfig,
): BoqLine[] {
  const totals = stationTotals(station)
  return template.lines.map((tpl) => {
    const { qtyRule, ...rest } = tpl
    return {
      ...rest,
      id: lineId(tpl.code),
      qty: resolveQty(qtyRule, station, totals),
    }
  })
}

export function buildBoqFromStation(
  station: StationConfig,
  templateId?: string | null,
): BoqLine[] {
  const equipment = buildEquipmentLines(station)
  const template =
    (templateId ? getBoqTemplate(templateId) : null) ??
    (station.presetCode ? getBoqTemplateByPreset(station.presetCode) : null) ??
    boqTemplates[0]!

  const epc = materializeTemplate(template, station)
  return [...equipment, ...epc]
}

export function summarizeBoq(
  lines: BoqLine[],
  pricing: PricingRule = DEFAULT_PRICING,
): BoqSummary {
  const byCategory = emptyCategoryTotals()
  let softwareOpexMonthly = 0
  let totalCost = 0

  for (const line of lines) {
    const sell = line.qty * line.unitPrice
    const cost = line.qty * line.unitCost
    totalCost += cost
    if (!line.capex) {
      softwareOpexMonthly += sell
      continue
    }
    byCategory[line.category] += sell
  }

  const equipmentSub = byCategory.A_EQUIPMENT
  const epcSub =
    byCategory.B_ELECTRICAL +
    byCategory.C_CIVIL +
    byCategory.D_SYSTEMS +
    byCategory.F_EPC_SERVICES
  const softwareCapex = byCategory.E_SOFTWARE
  const subtotal = equipmentSub + epcSub + softwareCapex
  const contingency = subtotal * pricing.contingencyPct
  byCategory.G_CONTINGENCY = contingency
  const discountAmount = pricing.discountAmount
  const beforeVat = Math.max(0, subtotal + contingency - discountAmount)
  const vat = beforeVat * pricing.vatPct
  const grandTotal = beforeVat + vat
  const grossMargin = beforeVat - totalCost
  const grossMarginPct = beforeVat > 0 ? grossMargin / beforeVat : 0

  return {
    lines,
    byCategory,
    equipmentSub,
    epcSub,
    softwareCapex,
    softwareOpexMonthly,
    subtotal,
    contingency,
    discountAmount,
    beforeVat,
    vat,
    grandTotal,
    totalCost,
    grossMargin,
    grossMarginPct,
  }
}

export function updateBoqLine(
  lines: BoqLine[],
  id: string,
  patch: Partial<Pick<BoqLine, 'qty' | 'unitPrice' | 'unitCost' | 'description' | 'notes'>>,
): BoqLine[] {
  return lines.map((line) => (line.id === id ? { ...line, ...patch } : line))
}

export function createQuotationDraft(input: {
  station: StationConfig
  customer?: Partial<QuotationCustomer>
  projectName?: string
  templateId?: string
  pricing?: Partial<PricingRule>
  leadTimeWeeks?: number
}): Quotation {
  const totals = stationTotals(input.station)
  const volumeDiscount = totals.equipmentSell - totals.equipmentSellNet
  const pricing: PricingRule = {
    ...DEFAULT_PRICING,
    ...input.pricing,
    discountAmount: volumeDiscount + (input.pricing?.discountAmount ?? 0),
  }
  const lines = buildBoqFromStation(input.station, input.templateId)
  const summary = summarizeBoq(lines, pricing)
  const now = new Date()
  const valid = new Date(now)
  valid.setDate(valid.getDate() + 30)

  return {
    id: `qt-${Math.random().toString(36).slice(2, 10)}`,
    number: `QT-EV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-DRAFT`,
    revision: 1,
    status: 'draft',
    createdAt: now.toISOString(),
    validUntil: valid.toISOString(),
    projectName: input.projectName ?? input.station.name,
    customer: {
      name: input.customer?.name ?? '',
      company: input.customer?.company ?? '',
      email: input.customer?.email ?? '',
      phone: input.customer?.phone ?? '',
      taxId: input.customer?.taxId,
      address: input.customer?.address,
    },
    station: input.station,
    lines,
    pricing,
    summary,
    leadTimeWeeks: input.leadTimeWeeks ?? 12,
    paymentTerms: '30% ลงสัญญา · 40% จัดส่งอุปกรณ์ · 30% หลัง commissioning',
    exclusions: [
      'ค่าไฟฟ้าเข้าโครงการ / ค่าธรรมเนียมการไฟฟ้า',
      'งานโครงสร้างอาคารเดิมนอกขอบเขตสถานี',
      'ใบอนุญาตก่อสร้าง (ถ้าหน่วยงานท้องถิ่นกำหนดแยก)',
    ],
    notes: 'ราคาอ้างอิงจากการกำหนดค่าเบื้องต้น ต้องสำรวจหน้างานก่อนยืนยันใบเสนอราคา',
  }
}
