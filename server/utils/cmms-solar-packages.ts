/**
 * Solar rooftop packages from bo-ev-cx-cmms public API (DB).
 * Local JSON is used only when CMMS base URL is empty, or the public route is missing (404).
 */

import type { H3Event } from 'h3'
import { resolvePackageImage } from './package-image'
import {
  getSolarPackageBySlug as getLocalBySlug,
  listSolarPackages as listLocal,
  type SolarPackage as LocalSolarPackage,
} from './solar-db'

export type SolarSystemType = 'on_grid' | 'hybrid' | 'off_grid'

export type SolarWebsitePackage = {
  id: string
  slug: string
  slug_aliases?: string[]
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
  active?: boolean
}

type CmmsListResponse = {
  items?: SolarWebsitePackage[]
  total?: number
  meta?: {
    power_kw?: number[]
    system_types?: SolarSystemType[]
    phases?: Array<'1P' | '3P'>
  }
}

type CmmsItemResponse = {
  item?: SolarWebsitePackage
}

function cmmsBase(event: H3Event) {
  const config = useRuntimeConfig(event)
  return String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
}

function withImage(pkg: SolarWebsitePackage): SolarWebsitePackage {
  return { ...pkg, image: resolvePackageImage(pkg.image) }
}

function errorMessage(err: unknown) {
  if (err && typeof err === 'object') {
    const e = err as {
      statusCode?: number
      status?: number
      data?: { message?: string; statusMessage?: string }
      message?: string
      statusMessage?: string
    }
    return {
      statusCode: e.statusCode || e.status || 502,
      message:
        e.data?.message ||
        e.data?.statusMessage ||
        e.message ||
        e.statusMessage ||
        'CMMS solar packages unavailable',
    }
  }
  return { statusCode: 502, message: 'CMMS solar packages unavailable' }
}

function fromLocal(pkg: LocalSolarPackage): SolarWebsitePackage {
  const stringPrice = pkg.string_inverter.available ? pkg.string_inverter.priceFrom : null
  const microPrice = pkg.micro_inverter.available ? pkg.micro_inverter.priceFrom : null
  const prices = [stringPrice, microPrice].filter((n): n is number => typeof n === 'number')
  const brand =
    (pkg.string_inverter.available ? pkg.string_inverter.inverterBrand : null) ||
    (pkg.micro_inverter.available ? pkg.micro_inverter.inverterBrand : null)
  const panelBrand =
    (pkg.string_inverter.available ? pkg.string_inverter.panelBrand : null) ||
    (pkg.micro_inverter.available ? pkg.micro_inverter.panelBrand : null)
  return {
    id: pkg.id,
    slug: pkg.slug,
    slug_aliases: pkg.slug_aliases ?? [],
    code: pkg.code,
    name: pkg.name,
    name_th: pkg.name_th,
    product_type: 'on_grid',
    source_label: pkg.source_label,
    tagline: pkg.tagline,
    description: pkg.description,
    power_kw: pkg.power_kw,
    phase: pkg.phase,
    area_m2: pkg.area_m2,
    yield_kwh_year: pkg.yield_kwh_year,
    savings_monthly_thb: pkg.savings_monthly_thb,
    price_from: prices.length ? Math.min(...prices) : 0,
    currency: 'THB',
    inverter: { brand, model: null },
    panel: { brand: panelBrand, model: null, qty: null },
    battery: null,
    includes: pkg.includes,
    features: pkg.features,
    warranty_years: 2,
    sort_order: pkg.sort_order,
    image: pkg.image,
    effective_from: pkg.effective_from,
    active: pkg.active,
  }
}

function metaFromLocal(packages: SolarWebsitePackage[]) {
  return {
    power_kw: [...new Set(packages.map((p) => p.power_kw))].sort((a, b) => a - b),
    system_types: [...new Set(packages.map((p) => p.product_type))],
    phases: [...new Set(packages.map((p) => p.phase))],
  }
}

function isMissingPublicApi(statusCode: number) {
  return (
    statusCode === 404 ||
    statusCode === 301 ||
    statusCode === 302 ||
    statusCode === 303 ||
    statusCode === 307 ||
    statusCode === 308
  )
}

type PublicFetchResult<T> =
  | { ok: true; data: T }
  | { ok: false; missing: true }
  | { ok: false; missing: false; statusCode: number; message: string }

async function fetchCmmsPublic<T>(
  url: string,
  query?: Record<string, string>,
): Promise<PublicFetchResult<T>> {
  try {
    const res = await $fetch.raw<T>(url, {
      query,
      redirect: 'manual',
      ignoreResponseError: true,
    })
    const status = res.status
    if (isMissingPublicApi(status)) return { ok: false, missing: true }
    if (status < 200 || status >= 300) {
      return {
        ok: false,
        missing: false,
        statusCode: status,
        message: res.statusText || 'CMMS solar packages unavailable',
      }
    }
    const data = res._data
    if (!data || typeof data !== 'object') return { ok: false, missing: true }
    return { ok: true, data }
  } catch (err) {
    const parsed = errorMessage(err)
    if (isMissingPublicApi(parsed.statusCode)) return { ok: false, missing: true }
    const msg = parsed.message.toLowerCase()
    // Nuxt SPA 302→login or redirect:'error' often has no HTTP status
    if (msg.includes('fetch failed') || msg.includes('redirect')) {
      return { ok: false, missing: true }
    }
    return { ok: false, missing: false, statusCode: parsed.statusCode, message: parsed.message }
  }
}

function localList(filters?: { phase?: string; type?: string; powerKw?: number }) {
  const packages = listLocal({
    phase: filters?.phase === '1P' || filters?.phase === '3P' ? filters.phase : undefined,
    powerKw: filters?.powerKw,
  }).map(fromLocal)
  const filtered =
    filters?.type && filters.type !== 'all'
      ? packages.filter((p) => p.product_type === filters.type)
      : packages
  const mapped = filtered.map(withImage)
  return { packages: mapped, source: 'local' as const, meta: metaFromLocal(mapped) }
}

export async function fetchCmmsSolarPackages(
  event: H3Event,
  filters?: { phase?: string; type?: string; powerKw?: number },
): Promise<{
  packages: SolarWebsitePackage[]
  source: 'cmms' | 'local'
  meta: ReturnType<typeof metaFromLocal>
}> {
  const base = cmmsBase(event)
  if (!base) {
    return localList(filters)
  }

  const query: Record<string, string> = {}
  if (filters?.phase === '1P' || filters?.phase === '3P') query.phase = filters.phase
  if (filters?.type === 'on_grid' || filters?.type === 'hybrid' || filters?.type === 'off_grid') {
    query.type = filters.type
  }
  if (filters?.powerKw && Number.isFinite(filters.powerKw)) {
    query.power = String(filters.powerKw)
  }

  const fetched = await fetchCmmsPublic<CmmsListResponse>(`${base}/api/public/solar-packages`, query)
  if (!fetched.ok) {
    if (fetched.missing) return localList(filters)
    throw createError({
      statusCode: fetched.statusCode >= 400 ? fetched.statusCode : 502,
      statusMessage: `CMMS solar packages: ${fetched.message}`,
    })
  }
  if (!Array.isArray(fetched.data.items)) {
    return localList(filters)
  }
  const packages = fetched.data.items.map(withImage)
  return {
    packages,
    source: 'cmms',
    meta: {
      power_kw: fetched.data.meta?.power_kw ?? metaFromLocal(packages).power_kw,
      system_types: fetched.data.meta?.system_types ?? metaFromLocal(packages).system_types,
      phases: fetched.data.meta?.phases ?? metaFromLocal(packages).phases,
    },
  }
}

export async function fetchCmmsSolarPackageBySlug(
  event: H3Event,
  slug: string,
): Promise<{ package: SolarWebsitePackage | null; source: 'cmms' | 'local' }> {
  const base = cmmsBase(event)
  if (!base) {
    const pkg = getLocalBySlug(slug)
    return { package: pkg ? withImage(fromLocal(pkg)) : null, source: 'local' }
  }

  const fetched = await fetchCmmsPublic<CmmsItemResponse>(
    `${base}/api/public/solar-packages/${encodeURIComponent(slug)}`,
  )
  if (!fetched.ok) {
    if (fetched.missing) {
      const pkg = getLocalBySlug(slug)
      if (pkg) return { package: withImage(fromLocal(pkg)), source: 'local' }
      return { package: null, source: 'cmms' }
    }
    throw createError({
      statusCode: fetched.statusCode >= 400 ? fetched.statusCode : 502,
      statusMessage: `CMMS solar package: ${fetched.message}`,
    })
  }
  if (!fetched.data.item) {
    const pkg = getLocalBySlug(slug)
    if (pkg) return { package: withImage(fromLocal(pkg)), source: 'local' }
    return { package: null, source: 'cmms' }
  }
  return { package: withImage(fetched.data.item), source: 'cmms' }
}
