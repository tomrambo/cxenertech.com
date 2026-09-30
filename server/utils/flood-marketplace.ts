import type { H3Event } from 'h3'
import { parseFloodMarketplace, type FloodMarketplaceCatalog } from '../../app/utils/flood-marketplace'

let cached: { at: number; catalog: FloodMarketplaceCatalog } | null = null

export async function fetchFloodMarketplace(event: H3Event): Promise<FloodMarketplaceCatalog> {
  if (cached && Date.now() - cached.at < 5 * 60 * 1000) return cached.catalog

  const config = useRuntimeConfig(event)
  const base = String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
  if (!base) {
    throw createError({ statusCode: 503, message: 'ยังไม่ได้ตั้งค่า CMMS สำหรับรายการบริการ' })
  }

  try {
    const payload = await $fetch(`${base}/api/public/marketplace/services`, {
      signal: AbortSignal.timeout(8000),
    })
    const catalog = parseFloodMarketplace(payload)
    if (!catalog.services.length) {
      throw createError({ statusCode: 502, message: 'ไม่พบหมวดตรวจและซ่อมไฟฟ้าหลังน้ำท่วมใน Marketplace' })
    }
    cached = { at: Date.now(), catalog }
    return catalog
  } catch (err) {
    if (cached) return cached.catalog
    const status = (err as { statusCode?: number }).statusCode
    if (status && status < 500) throw err
    throw createError({ statusCode: 502, message: 'โหลดแพ็กเกจจาก Marketplace ไม่สำเร็จ' })
  }
}
