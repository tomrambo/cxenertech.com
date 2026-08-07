/**
 * EV packages data store — JSON file backed (CI-safe, no native SQLite).
 * Source of truth seed: server/database/ev-package-seed.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { EV_PACKAGE_SEED, type SeedPackage } from '../database/ev-package-seed'

export type EvPackage = {
  id: string
  slug: string
  code: string
  name: string
  name_th: string
  product_type: 'equipment' | 'turnkey' | 'investment'
  source_label: string
  tagline: string
  description: string
  power_kw_min: number
  power_kw_max: number
  charger_count: number | null
  nozzle_count_min: number
  nozzle_count_max: number
  parking_bays: number | null
  transformer_kva: number | null
  footprint_w_m: number | null
  footprint_d_m: number | null
  price_list: number | null
  price_promo: number | null
  price_capex: number | null
  currency: string
  price_note: string
  roi_annual_pct: number | null
  payback_months: number | null
  net_profit_monthly: number | null
  specs: Record<string, string | number>
  includes: string[]
  features: string[]
  financials: Record<string, string | number> | null
  targetSites: string[]
  sort_order: number
  image: string | null
  price_rate_id: string | null
  spec_id: string | null
  charge_type: 'AC' | 'DC' | null
  active: boolean
  created_at: string
  updated_at: string
}

const DB_PATH = join(process.cwd(), 'data', 'ev-packages.json')

let memoryCache: EvPackage[] | null = null

function inferChargeType(p: SeedPackage): 'AC' | 'DC' {
  if (p.chargeType === 'AC' || p.chargeType === 'DC') return p.chargeType
  const key = `${p.code} ${p.name} ${p.slug} ${p.tagline}`.toUpperCase()
  if (/\bCX-AC|\bSME-AC|AC\d|[-_/ ]AC\b/.test(key) && !/\bSME-DC|\bCX-DC|\bDC\d/.test(key)) {
    return 'AC'
  }
  if (/\bAC\b/.test(key) && !/\bDC\b/.test(key)) return 'AC'
  return 'DC'
}

function mapSeed(p: SeedPackage, now = new Date().toISOString()): EvPackage {
  return {
    id: p.id,
    slug: p.slug,
    code: p.code,
    name: p.name,
    name_th: p.nameTh,
    product_type: p.productType,
    source_label: p.sourceLabel,
    tagline: p.tagline,
    description: p.description,
    power_kw_min: p.powerKwMin,
    power_kw_max: p.powerKwMax,
    charger_count: p.chargerCount,
    nozzle_count_min: p.nozzleCountMin,
    nozzle_count_max: p.nozzleCountMax,
    parking_bays: p.parkingBays,
    transformer_kva: p.transformerKva,
    footprint_w_m: p.footprintWm,
    footprint_d_m: p.footprintDm,
    price_list: p.priceList,
    price_promo: p.pricePromo,
    price_capex: p.priceCapex,
    currency: 'THB',
    price_note: p.priceNote,
    roi_annual_pct: p.roiAnnualPct,
    payback_months: p.paybackMonths,
    net_profit_monthly: p.netProfitMonthly,
    specs: p.specs,
    includes: p.includes,
    features: p.features,
    financials: p.financials,
    targetSites: p.targetSites,
    sort_order: p.sortOrder,
    image: p.image ?? null,
    price_rate_id: p.priceRateId ?? null,
    spec_id: p.specId ?? null,
    charge_type: inferChargeType(p),
    active: true,
    created_at: now,
    updated_at: now,
  }
}

function readStore(): EvPackage[] {
  if (memoryCache) return memoryCache

  if (existsSync(DB_PATH)) {
    try {
      const parsed = JSON.parse(readFileSync(DB_PATH, 'utf8')) as EvPackage[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache = parsed
        return memoryCache
      }
    } catch {
      // fall through to seed
    }
  }

  memoryCache = EV_PACKAGE_SEED.map((p) => mapSeed(p))
  return memoryCache
}

function writeStore(packages: EvPackage[]) {
  mkdirSync(dirname(DB_PATH), { recursive: true })
  writeFileSync(DB_PATH, `${JSON.stringify(packages, null, 2)}\n`, 'utf8')
  memoryCache = packages
}

export function seedPackages(_db?: unknown, { force = false } = {}) {
  if (!force && existsSync(DB_PATH)) {
    const existing = readStore()
    if (existing.length > 0) return existing.length
  }

  const now = new Date().toISOString()
  const packages = EV_PACKAGE_SEED.map((p) => mapSeed(p, now))
  writeStore(packages)
  return packages.length
}

export function listEvPackages(filters?: { type?: string; charge?: string }) {
  let packages = readStore().filter((p) => p.active)
  if (filters?.type && filters.type !== 'all') {
    packages = packages.filter((p) => p.product_type === filters.type)
  }
  if (filters?.charge === 'AC' || filters?.charge === 'DC') {
    packages = packages.filter((p) => p.charge_type === filters.charge)
  }
  return packages.sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name))
}

/** Legacy slugs redirected to official CX package names */
const SLUG_ALIASES: Record<string, string> = {
  'hub-s-starter-station': 'cx-station-s4',
  'hub-m-growth-station': 'cx-station-s10',
  'hub-l-custom-hub': 'cx-station-hub',
  'dc-charger-30kw': 'cx-dc-30',
  'dc-charger-40kw': 'cx-dc-40',
  'dc-charger-60kw': 'cx-dc-60',
  'dc-unicharger-30kw': 'cx-dc-30-pay',
  'cx-dc-60-zec': 'cx-dc-60',
  'cx-dc-120-zec': 'cx-dc-120',
}

export function getEvPackageBySlug(slug: string) {
  const resolved = SLUG_ALIASES[slug] ?? slug
  return readStore().find((p) => p.slug === resolved && p.active) ?? null
}

export function getEvDbPath() {
  return DB_PATH
}
