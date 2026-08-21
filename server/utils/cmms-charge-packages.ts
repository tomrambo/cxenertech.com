/**
 * Charge packages from bo-ev-cx-cmms public API.
 * Falls back to local JSON (ev-db) when CMMS is unset or unreachable.
 */

import type { H3Event } from 'h3'
import {
  getEvPackageBySlug,
  listEvPackages,
  type EvPackage,
} from './ev-db'

type CmmsListResponse = {
  items?: EvPackage[]
  total?: number
}

type CmmsItemResponse = {
  item?: EvPackage
}

function cmmsBase(event: H3Event) {
  const config = useRuntimeConfig(event)
  return String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
}

function errorMessage(err: unknown) {
  if (err && typeof err === 'object') {
    const e = err as {
      statusCode?: number
      status?: number
      data?: { message?: string }
      message?: string
    }
    return {
      statusCode: e.statusCode || e.status || 502,
      message: e.data?.message || e.message || 'CMMS charge packages unavailable',
    }
  }
  return { statusCode: 502, message: 'CMMS charge packages unavailable' }
}

export async function fetchCmmsChargePackages(
  event: H3Event,
  filters?: { type?: string; charge?: string },
): Promise<{ packages: EvPackage[]; source: 'cmms' | 'local' }> {
  const base = cmmsBase(event)
  if (!base) {
    return {
      packages: listEvPackages(filters),
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
    const packages = Array.isArray(res.items) ? res.items : []
    return { packages, source: 'cmms' }
  } catch (err) {
    console.warn('[cmms-charge-packages] list fallback to local:', errorMessage(err).message)
    return {
      packages: listEvPackages(filters),
      source: 'local',
    }
  }
}

export async function fetchCmmsChargePackageBySlug(
  event: H3Event,
  slug: string,
): Promise<{ package: EvPackage | null; source: 'cmms' | 'local' }> {
  const base = cmmsBase(event)
  if (!base) {
    return {
      package: getEvPackageBySlug(slug),
      source: 'local',
    }
  }

  try {
    const res = await $fetch<CmmsItemResponse>(
      `${base}/api/public/charge-packages/${encodeURIComponent(slug)}`,
    )
    return {
      package: res.item ?? null,
      source: 'cmms',
    }
  } catch (err) {
    const parsed = errorMessage(err)
    if (parsed.statusCode === 404) {
      return { package: null, source: 'cmms' }
    }
    console.warn('[cmms-charge-packages] get fallback to local:', parsed.message)
    return {
      package: getEvPackageBySlug(slug),
      source: 'local',
    }
  }
}
