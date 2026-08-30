/**
 * Solar rooftop packages store — JSON file backed (CI-safe).
 * Source: server/database/solar-package-seed.ts (CX ENERTECH sell-price tiers)
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import {
  SOLAR_PACKAGE_SEED,
  type SeedSolarPackage,
  type SolarInverterOption,
} from '../database/solar-package-seed'

export type SolarPackage = {
  id: string
  slug: string
  slug_aliases: string[]
  code: string
  name: string
  name_th: string
  product_type: 'rooftop'
  source_label: string
  tagline: string
  description: string
  power_kw: number
  phase: '1P' | '3P'
  area_m2: number
  yield_kwh_year: number
  appliances: {
    led18w: number
    tv55inch: number
    fridge15cu: number
    ac12000btu: number
  }
  savings_monthly_thb: number
  string_inverter: SolarInverterOption
  micro_inverter: SolarInverterOption
  includes: string[]
  features: string[]
  sort_order: number
  image: string | null
  effective_from: string
  currency: 'THB'
  active: boolean
  created_at: string
  updated_at: string
}

const DB_PATH = join(process.cwd(), 'data', 'solar-packages.json')

let memoryCache: SolarPackage[] | null = null

function mapSeed(p: SeedSolarPackage, now = new Date().toISOString()): SolarPackage {
  return {
    id: p.id,
    slug: p.slug,
    slug_aliases: p.slugAliases ?? [],
    code: p.code,
    name: p.name,
    name_th: p.nameTh,
    product_type: p.productType,
    source_label: p.sourceLabel,
    tagline: p.tagline,
    description: p.description,
    power_kw: p.powerKw,
    phase: p.phase,
    area_m2: p.areaM2,
    yield_kwh_year: p.yieldKwhYear,
    appliances: p.appliances,
    savings_monthly_thb: p.savingsMonthlyThb,
    string_inverter: p.stringInverter,
    micro_inverter: p.microInverter,
    includes: p.includes,
    features: p.features,
    sort_order: p.sortOrder,
    image: p.image ?? null,
    effective_from: p.effectiveFrom,
    currency: 'THB',
    active: true,
    created_at: now,
    updated_at: now,
  }
}

function readStore(): SolarPackage[] {
  if (memoryCache) return memoryCache

  if (existsSync(DB_PATH)) {
    try {
      const parsed = JSON.parse(readFileSync(DB_PATH, 'utf8')) as SolarPackage[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache = parsed
        return memoryCache
      }
    } catch {
      // fall through to seed
    }
  }

  memoryCache = SOLAR_PACKAGE_SEED.map((p) => mapSeed(p))
  return memoryCache
}

function writeStore(packages: SolarPackage[]) {
  mkdirSync(dirname(DB_PATH), { recursive: true })
  writeFileSync(DB_PATH, `${JSON.stringify(packages, null, 2)}\n`, 'utf8')
  memoryCache = packages
}

export function seedSolarPackages(_db?: unknown, { force = false } = {}) {
  if (!force && existsSync(DB_PATH)) {
    const existing = readStore()
    if (existing.length > 0) return existing.length
  }

  const now = new Date().toISOString()
  const packages = SOLAR_PACKAGE_SEED.map((p) => mapSeed(p, now))
  writeStore(packages)
  return packages.length
}

export function listSolarPackages(filters?: {
  phase?: string
  inverter?: 'string' | 'micro'
  powerKw?: number
}) {
  let packages = readStore().filter((p) => p.active)
  if (filters?.phase === '1P' || filters?.phase === '3P') {
    packages = packages.filter((p) => p.phase === filters.phase)
  }
  if (filters?.powerKw) {
    packages = packages.filter((p) => p.power_kw === filters.powerKw)
  }
  if (filters?.inverter === 'string') {
    packages = packages.filter((p) => p.string_inverter.available)
  }
  if (filters?.inverter === 'micro') {
    packages = packages.filter((p) => p.micro_inverter.available)
  }
  return packages.sort((a, b) => a.sort_order - b.sort_order || a.power_kw - b.power_kw)
}

export function getSolarPackageBySlug(slug: string) {
  return (
    readStore().find(
      (p) =>
        p.active &&
        (p.slug === slug || (p.slug_aliases ?? []).includes(slug)),
    ) ?? null
  )
}

export function getSolarDbPath() {
  return DB_PATH
}

/** Lowest available starting price for card display */
export function startingPrice(pkg: SolarPackage): number | null {
  const prices = [
    pkg.string_inverter.available ? pkg.string_inverter.priceFrom : null,
    pkg.micro_inverter.available ? pkg.micro_inverter.priceFrom : null,
  ].filter((n): n is number => typeof n === 'number')
  if (!prices.length) return null
  return Math.min(...prices)
}
