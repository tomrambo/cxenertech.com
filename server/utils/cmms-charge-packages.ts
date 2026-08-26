/**
 * Charge packages from bo-ev-cx-cmms public API (DB).
 * Local JSON (ev-db) is used only when CMMS base URL is empty.
 */

import type { H3Event } from 'h3'
import { resolvePackageImage } from './package-image'
import {
  getEvPackageBySlug,
  listEvPackages,
  type EvPackage,
} from './ev-db'

export type ChargePackageType = {
  key: string
  code: string
  group_label: string
  name: string
  description: string
  uses_boq: boolean
  sort_order: number
  package_count: number
}

type CmmsListResponse = {
  items?: EvPackage[]
  total?: number
}

type CmmsItemResponse = {
  item?: EvPackage
}

type CmmsTypesResponse = {
  items?: ChargePackageType[]
  total?: number
}

const LOCAL_TYPE_FALLBACK: ChargePackageType[] = [
  {
    key: 'investment',
    code: '03',
    group_label: 'CX EV STATION',
    name: 'EV Station Investment',
    description: 'ลงทุนสถานีพร้อม Business Model',
    uses_boq: true,
    sort_order: 3,
    package_count: 0,
  },
  {
    key: 'turnkey',
    code: '02',
    group_label: 'CX EV STATION',
    name: 'EV Station Turnkey',
    description: 'สถานีพร้อมเปิดใช้งาน',
    uses_boq: true,
    sort_order: 2,
    package_count: 0,
  },
  {
    key: 'equipment',
    code: '99',
    group_label: 'CX EV CHARGER',
    name: 'Charger Equipment',
    description: 'ขายตู้ชาร์จและอุปกรณ์',
    uses_boq: false,
    sort_order: 99,
    package_count: 0,
  },
]

function cmmsBase(event: H3Event) {
  const config = useRuntimeConfig(event)
  return String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
}

function withDbImage(pkg: EvPackage): EvPackage {
  return {
    ...pkg,
    image: resolvePackageImage(pkg.image),
  }
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
        'CMMS charge packages unavailable',
    }
  }
  return { statusCode: 502, message: 'CMMS charge packages unavailable' }
}

function localTypesFromPackages(packages: EvPackage[]): ChargePackageType[] {
  const counts = new Map<string, number>()
  for (const pkg of packages) {
    counts.set(pkg.product_type, (counts.get(pkg.product_type) || 0) + 1)
  }
  return LOCAL_TYPE_FALLBACK.map((row) => ({
    ...row,
    package_count: counts.get(row.key) || 0,
  })).filter((row) => row.package_count > 0 || counts.size === 0)
}

export async function fetchCmmsChargePackageTypes(
  event: H3Event,
): Promise<{ types: ChargePackageType[]; source: 'cmms' | 'local' }> {
  const base = cmmsBase(event)
  if (!base) {
    return {
      types: localTypesFromPackages(listEvPackages()),
      source: 'local',
    }
  }

  try {
    const res = await $fetch<CmmsTypesResponse>(
      `${base}/api/public/charge-packages/product-types`,
    )
    const types = Array.isArray(res.items) ? res.items : []
    return { types, source: 'cmms' }
  } catch (err) {
    const parsed = errorMessage(err)
    // Older CMMS without product-types route — derive from packages
    if (parsed.statusCode === 404) {
      const { packages } = await fetchCmmsChargePackages(event)
      const counts = new Map<string, number>()
      for (const pkg of packages) {
        counts.set(pkg.product_type, (counts.get(pkg.product_type) || 0) + 1)
      }
      const derived = [...counts.entries()]
        .map(([key, package_count], index) => {
          const fallback = LOCAL_TYPE_FALLBACK.find((t) => t.key === key)
          return {
            key,
            code: fallback?.code ?? String(index + 1).padStart(2, '0'),
            group_label: fallback?.group_label ?? 'CX EV',
            name: fallback?.name ?? key,
            description: fallback?.description ?? '',
            uses_boq: fallback?.uses_boq ?? false,
            sort_order: fallback?.sort_order ?? index + 1,
            package_count,
          } satisfies ChargePackageType
        })
        .sort((a, b) => a.sort_order - b.sort_order || a.key.localeCompare(b.key))
      return { types: derived, source: 'cmms' }
    }
    throw createError({
      statusCode: parsed.statusCode >= 400 ? parsed.statusCode : 502,
      statusMessage: `CMMS charge package types: ${parsed.message}`,
    })
  }
}

export async function fetchCmmsChargePackages(
  event: H3Event,
  filters?: { type?: string; charge?: string },
): Promise<{ packages: EvPackage[]; source: 'cmms' | 'local' }> {
  const base = cmmsBase(event)
  if (!base) {
    return {
      packages: listEvPackages(filters).map(withDbImage),
      source: 'local',
    }
  }

  const query: Record<string, string> = {}
  if (filters?.type && filters.type !== 'all') query.type = filters.type
  if (filters?.charge === 'AC' || filters?.charge === 'DC') {
    query.charge = filters.charge
  }

  try {
    const res = await $fetch<CmmsListResponse>(
      `${base}/api/public/charge-packages`,
      { query },
    )
    const packages = (Array.isArray(res.items) ? res.items : []).map(withDbImage)
    return { packages, source: 'cmms' }
  } catch (err) {
    const parsed = errorMessage(err)
    throw createError({
      statusCode: parsed.statusCode >= 400 ? parsed.statusCode : 502,
      statusMessage: `CMMS charge packages: ${parsed.message}`,
    })
  }
}

export async function fetchCmmsChargePackageBySlug(
  event: H3Event,
  slug: string,
): Promise<{ package: EvPackage | null; source: 'cmms' | 'local' }> {
  const base = cmmsBase(event)
  if (!base) {
    const pkg = getEvPackageBySlug(slug)
    return {
      package: pkg ? withDbImage(pkg) : null,
      source: 'local',
    }
  }

  try {
    const res = await $fetch<CmmsItemResponse>(
      `${base}/api/public/charge-packages/${encodeURIComponent(slug)}`,
    )
    return {
      package: res.item ? withDbImage(res.item) : null,
      source: 'cmms',
    }
  } catch (err) {
    const parsed = errorMessage(err)
    if (parsed.statusCode === 404) {
      return { package: null, source: 'cmms' }
    }
    throw createError({
      statusCode: parsed.statusCode >= 400 ? parsed.statusCode : 502,
      statusMessage: `CMMS charge package: ${parsed.message}`,
    })
  }
}
