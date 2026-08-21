/**
 * Charge packages from bo-ev-cx-cmms public API (DB).
 * Local JSON (ev-db) is used only when NUXT_CMMS_API_BASE_URL is unset.
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
    throw createError({
      statusCode: parsed.statusCode >= 400 ? parsed.statusCode : 502,
      statusMessage: `CMMS charge package: ${parsed.message}`,
    })
  }
}
