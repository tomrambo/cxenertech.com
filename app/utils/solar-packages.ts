/**
 * Website solar package DTO — matches CMMS /api/public/solar-packages
 */

export type SolarSystemType = 'on_grid' | 'hybrid' | 'off_grid'

export type SolarWebsitePackage = {
  id: string
  slug: string
  slug_aliases: string[]
  code: string
  name: string
  name_th: string
  product_type: SolarSystemType
  source_label: string
  tagline: string
  description: string
  power_kw: number
  phase: '1P' | '3P'
  area_m2: number
  yield_kwh_year: number
  savings_monthly_thb: number
  price_from: number
  currency: 'THB'
  inverter: { brand: string | null; model: string | null }
  panel: { brand: string | null; model: string | null; qty: number | null }
  battery: { brand: string | null; model: string | null; qty: number | null } | null
  includes: string[]
  features: string[]
  warranty_years: number | null
  sort_order: number
  image: string | null
  effective_from: string
  active: boolean
}

export type SolarPackageMeta = {
  power_kw: number[]
  system_types: SolarSystemType[]
  phases: Array<'1P' | '3P'>
}

export function systemTypeLabel(type: string | null | undefined) {
  if (type === 'hybrid') return 'Hybrid'
  if (type === 'off_grid') return 'Off-grid'
  return 'On-grid'
}
