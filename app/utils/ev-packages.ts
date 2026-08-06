/**
 * EV Charging — package & station configuration schema
 * Used by configurator, packages, and quotation flows.
 */

export type Money = number // THB

export type ConnectorType = 'CCS2' | 'CHAdeMO' | 'CCS2+CHAdeMO'
export type ChargerArchitecture = 'standalone' | 'cabinet-dispenser'
export type OcppVersion = '1.6' | '2.0.1'
export type AuthMethod = 'RFID' | 'QR' | 'APP' | 'OCPP'
export type PackageProductType = 'equipment' | 'turnkey' | 'investment'

export type ChargerSku = {
  id: string
  code: string
  name: string
  architecture: ChargerArchitecture
  powerKw: number
  gunsDefault: 1 | 2
  connectorDefault: ConnectorType
  ocpp: OcppVersion[]
  auth: AuthMethod[]
  ipRating: 'IP54' | 'IP55' | 'IP65'
  warrantyMonthsDefault: 12 | 24 | 36
  /** Internal cost — never show on customer quote */
  unitCost: Money
  /** Sell price before options / discounts */
  unitPrice: Money
  optionAdders: ChargerOptionAdder[]
  targetSites: string[]
  active: boolean
}

export type ChargerOptionAdder = {
  id: string
  label: string
  /** Extra sell price per unit */
  price: Money
  cost?: Money
}

/** User-customized instance of a charger SKU in a station */
export type ChargerConfig = {
  lineId: string
  skuId: string
  qty: number
  powerKw: number
  gunsPerUnit: 1 | 2
  connector: ConnectorType
  architecture: ChargerArchitecture
  warrantyMonths: 12 | 24 | 36
  selectedOptionIds: string[]
  /** Override sell price per unit; null = use catalog + options */
  unitPriceOverride: Money | null
}

export type FootprintM = {
  widthM: number
  depthM: number
}

export type TransformerSuggestion = {
  minKva: number
  maxKva: number
  label: string
  note: string
}

export type StationConfig = {
  id: string
  name: string
  /** Preset code if started from HUB-S/M/L */
  presetCode: string | null
  chargers: ChargerConfig[]
  footprint: FootprintM | null
  /** Manual override; null = auto from sizing table */
  transformerKvaOverride: number | null
  parkingBays: number | null
  notes: string
}

export type PackagePreset = {
  code: string
  name: string
  productType: PackageProductType
  description: string
  /** Seed charger lines when applying preset */
  chargerLines: Array<{
    skuId: string
    qty: number
    gunsPerUnit: 1 | 2
  }>
  footprint: FootprintM
  transformerKva: number
  parkingBays: number
  /** Reference CAPEX from market research — not CX sell price */
  referenceCapex: Money | null
  boqTemplateId: string
  targetSites: string[]
}

/** Volume discount tiers on equipment sell price */
export type VolumeDiscountTier = {
  minQty: number
  discountPct: number
}

export const VOLUME_DISCOUNTS: VolumeDiscountTier[] = [
  { minQty: 3, discountPct: 0.03 },
  { minQty: 5, discountPct: 0.05 },
  { minQty: 10, discountPct: 0.08 },
]

export const TRANSFORMER_SIZING: Array<{
  maxTotalKw: number
  suggestion: TransformerSuggestion
}> = [
  {
    maxTotalKw: 150,
    suggestion: { minKva: 250, maxKva: 315, label: '250–315 kVA', note: 'small commercial' },
  },
  {
    maxTotalKw: 300,
    suggestion: { minKva: 400, maxKva: 500, label: '400–500 kVA', note: 'HUB-S class' },
  },
  {
    maxTotalKw: 600,
    suggestion: { minKva: 800, maxKva: 1000, label: '800–1,000 kVA', note: 'HUB-M class' },
  },
  {
    maxTotalKw: 960,
    suggestion: { minKva: 1250, maxKva: 1600, label: '1,250–1,600 kVA', note: 'HUB-L / hub cabinet' },
  },
]

/** Catalog seed — prices are placeholders for configurator math; replace with CX list prices */
export const chargerSkus: ChargerSku[] = [
  {
    id: 'sku-dc-30',
    code: 'DC-30',
    name: 'DC Fast Charger 30 kW',
    architecture: 'standalone',
    powerKw: 30,
    gunsDefault: 1,
    connectorDefault: 'CCS2',
    ocpp: ['1.6'],
    auth: ['RFID', 'QR', 'OCPP'],
    ipRating: 'IP54',
    warrantyMonthsDefault: 12,
    unitCost: 140000,
    unitPrice: 179000,
    optionAdders: [
      { id: 'opt-warranty-24', label: 'ขยายประกันเป็น 24 เดือน', price: 12000, cost: 8000 },
      { id: 'opt-chademo', label: 'เพิ่มหัว CHAdeMO', price: 25000, cost: 18000 },
    ],
    targetSites: ['hotel', 'restaurant', 'sme', 'factory'],
    active: true,
  },
  {
    id: 'sku-dc-40',
    code: 'DC-40',
    name: 'DC Fast Charger 40 kW',
    architecture: 'standalone',
    powerKw: 40,
    gunsDefault: 1,
    connectorDefault: 'CCS2',
    ocpp: ['1.6'],
    auth: ['RFID', 'QR', 'OCPP'],
    ipRating: 'IP54',
    warrantyMonthsDefault: 12,
    unitCost: 280000,
    unitPrice: 350100,
    optionAdders: [
      { id: 'opt-warranty-24', label: 'ขยายประกันเป็น 24 เดือน', price: 15000, cost: 10000 },
    ],
    targetSites: ['commercial', 'mall'],
    active: true,
  },
  {
    id: 'sku-dc-60',
    code: 'DC-60',
    name: 'DC Fast Charger 60 kW',
    architecture: 'standalone',
    powerKw: 60,
    gunsDefault: 1,
    connectorDefault: 'CCS2',
    ocpp: ['1.6', '2.0.1'],
    auth: ['RFID', 'QR', 'APP', 'OCPP'],
    ipRating: 'IP54',
    warrantyMonthsDefault: 12,
    unitCost: 500000,
    unitPrice: 629100,
    optionAdders: [
      { id: 'opt-split-power', label: 'Output split power (2 guns)', price: 45000, cost: 30000 },
      { id: 'opt-warranty-24', label: 'ขยายประกันเป็น 24 เดือน', price: 20000, cost: 14000 },
    ],
    targetSites: ['commercial', 'mall', 'office'],
    active: true,
  },
  {
    id: 'sku-dc-120',
    code: 'DC-120',
    name: 'DC Fast Charger 120 kW Dual Gun',
    architecture: 'standalone',
    powerKw: 120,
    gunsDefault: 2,
    connectorDefault: 'CCS2',
    ocpp: ['1.6', '2.0.1'],
    auth: ['RFID', 'QR', 'APP', 'OCPP'],
    ipRating: 'IP55',
    warrantyMonthsDefault: 24,
    unitCost: 750000,
    unitPrice: 980000,
    optionAdders: [
      { id: 'opt-warranty-36', label: 'ขยายประกันเป็น 36 เดือน', price: 35000, cost: 24000 },
      { id: 'opt-branded-panel', label: 'แผงแบรนด์ลูกค้า', price: 15000, cost: 8000 },
    ],
    targetSites: ['station', 'mall', 'gas', 'depot'],
    active: true,
  },
  {
    id: 'sku-hub-cabinet',
    code: 'HUB-CAB',
    name: 'Hub Power Cabinet (480–960 kW class)',
    architecture: 'cabinet-dispenser',
    powerKw: 480,
    gunsDefault: 2,
    connectorDefault: 'CCS2',
    ocpp: ['1.6', '2.0.1'],
    auth: ['RFID', 'QR', 'APP', 'OCPP'],
    ipRating: 'IP55',
    warrantyMonthsDefault: 24,
    unitCost: 3200000,
    unitPrice: 4200000,
    optionAdders: [
      { id: 'opt-power-960', label: 'อัปเกรดเป็น 960 kW class', price: 1800000, cost: 1400000 },
      { id: 'opt-extra-dispenser', label: 'Dispenser เพิ่ม 1 ตัว (2 guns)', price: 280000, cost: 200000 },
    ],
    targetSites: ['gas', 'mall', 'hub', 'parking'],
    active: true,
  },
]

export const packagePresets: PackagePreset[] = [
  {
    code: 'HUB-S',
    name: 'Starter Station',
    productType: 'turnkey',
    description: 'สถานีเริ่มต้น 2×120 kW · 4 จุดชาร์จ สำหรับพื้นที่จำกัด',
    chargerLines: [{ skuId: 'sku-dc-120', qty: 2, gunsPerUnit: 2 }],
    footprint: { widthM: 12, depthM: 6.5 },
    transformerKva: 400,
    parkingBays: 4,
    referenceCapex: 3270000,
    boqTemplateId: 'boq-hub-s',
    targetSites: ['sme', 'commercial', 'office'],
  },
  {
    code: 'HUB-M',
    name: 'Growth Station',
    productType: 'turnkey',
    description: 'สถานีขยาย 5×120 kW · 10 จุดชาร์จ สำหรับทราฟฟิกสูง',
    chargerLines: [{ skuId: 'sku-dc-120', qty: 5, gunsPerUnit: 2 }],
    footprint: { widthM: 30, depthM: 7.5 },
    transformerKva: 1000,
    parkingBays: 10,
    referenceCapex: 9000000,
    boqTemplateId: 'boq-hub-m',
    targetSites: ['mall', 'tourism', 'gas'],
  },
  {
    code: 'HUB-L',
    name: 'Hub Station Custom',
    productType: 'turnkey',
    description: 'Hub cabinet + dispenser ปรับจำนวนหัว 2–12 ตามพื้นที่',
    chargerLines: [{ skuId: 'sku-hub-cabinet', qty: 1, gunsPerUnit: 2 }],
    footprint: { widthM: 24, depthM: 8 },
    transformerKva: 1250,
    parkingBays: 4,
    referenceCapex: 5590000,
    boqTemplateId: 'boq-hub-l',
    targetSites: ['gas', 'mall', 'hub', 'parking'],
  },
]

export function getChargerSku(id: string) {
  return chargerSkus.find((s) => s.id === id)
}

export function getPackagePreset(code: string) {
  return packagePresets.find((p) => p.code === code)
}

export function suggestTransformer(totalKw: number): TransformerSuggestion {
  const row =
    TRANSFORMER_SIZING.find((r) => totalKw <= r.maxTotalKw) ??
    TRANSFORMER_SIZING[TRANSFORMER_SIZING.length - 1]!
  return row.suggestion
}

export function volumeDiscountPct(totalChargerQty: number): number {
  let pct = 0
  for (const tier of VOLUME_DISCOUNTS) {
    if (totalChargerQty >= tier.minQty) pct = tier.discountPct
  }
  return pct
}

export function optionsPrice(sku: ChargerSku, optionIds: string[]): Money {
  return optionIds.reduce((sum, id) => {
    const opt = sku.optionAdders.find((o) => o.id === id)
    return sum + (opt?.price ?? 0)
  }, 0)
}

export function chargerLineUnitPrice(config: ChargerConfig, sku: ChargerSku): Money {
  if (config.unitPriceOverride != null) return config.unitPriceOverride
  return sku.unitPrice + optionsPrice(sku, config.selectedOptionIds)
}

export function stationTotals(station: StationConfig) {
  let totalKw = 0
  let nozzleCount = 0
  let chargerQty = 0
  let equipmentSell = 0
  let equipmentCost = 0

  for (const line of station.chargers) {
    const sku = getChargerSku(line.skuId)
    if (!sku) continue
    const unitSell = chargerLineUnitPrice(line, sku)
    const optCost = line.selectedOptionIds.reduce((sum, id) => {
      const opt = sku.optionAdders.find((o) => o.id === id)
      return sum + (opt?.cost ?? 0)
    }, 0)
    totalKw += line.powerKw * line.qty
    nozzleCount += line.gunsPerUnit * line.qty
    chargerQty += line.qty
    equipmentSell += unitSell * line.qty
    equipmentCost += (sku.unitCost + optCost) * line.qty
  }

  const discountPct = volumeDiscountPct(chargerQty)
  const equipmentSellNet = equipmentSell * (1 - discountPct)
  const transformer =
    station.transformerKvaOverride != null
      ? {
          minKva: station.transformerKvaOverride,
          maxKva: station.transformerKvaOverride,
          label: `${station.transformerKvaOverride} kVA`,
          note: 'manual override',
        }
      : suggestTransformer(totalKw)

  return {
    totalKw,
    nozzleCount,
    chargerQty,
    parkingBays: station.parkingBays ?? nozzleCount,
    equipmentSell,
    equipmentSellNet,
    equipmentCost,
    discountPct,
    transformer,
  }
}

export function createChargerConfig(
  skuId: string,
  qty = 1,
  overrides: Partial<Omit<ChargerConfig, 'lineId' | 'skuId'>> = {},
): ChargerConfig | null {
  const sku = getChargerSku(skuId)
  if (!sku) return null
  return {
    lineId: `line-${sku.code}-${cryptoRandom()}`,
    skuId,
    qty,
    powerKw: overrides.powerKw ?? sku.powerKw,
    gunsPerUnit: overrides.gunsPerUnit ?? sku.gunsDefault,
    connector: overrides.connector ?? sku.connectorDefault,
    architecture: overrides.architecture ?? sku.architecture,
    warrantyMonths: overrides.warrantyMonths ?? sku.warrantyMonthsDefault,
    selectedOptionIds: overrides.selectedOptionIds ?? [],
    unitPriceOverride: overrides.unitPriceOverride ?? null,
  }
}

export function stationFromPreset(code: string, name?: string): StationConfig | null {
  const preset = getPackagePreset(code)
  if (!preset) return null

  const chargers = preset.chargerLines
    .map((line) =>
      createChargerConfig(line.skuId, line.qty, { gunsPerUnit: line.gunsPerUnit }),
    )
    .filter((c): c is ChargerConfig => c != null)

  return {
    id: `station-${code}-${cryptoRandom()}`,
    name: name ?? preset.name,
    presetCode: preset.code,
    chargers,
    footprint: { ...preset.footprint },
    transformerKvaOverride: preset.transformerKva,
    parkingBays: preset.parkingBays,
    notes: '',
  }
}

function cryptoRandom() {
  return Math.random().toString(36).slice(2, 10)
}
