import { randomBytes } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createError } from 'h3'
import type { FloodMarketplaceService } from '../../app/utils/flood-marketplace'
import {
  FLOOD_HOLD_MS,
  FLOOD_SLOT_CAPACITY,
  FLOOD_SLOTS,
  allowedDates,
  bangkokDateIso,
  buildPromptPayPayload,
  normalizeThaiMobile,
  type FloodAsset,
  type FloodSlot,
} from '../../app/utils/flood-recovery'

export type FloodBookingStatus = 'awaiting_deposit' | 'deposit_declared'

export type FloodBooking = {
  ref: string
  packageId: string
  packageName: string
  depositThb: number
  date: string
  slot: FloodSlot
  name: string
  phone: string
  lineId: string
  email: string
  province: string
  address: string
  placeId: string
  lat: number
  lng: number
  asset: FloodAsset
  note: string
  status: FloodBookingStatus
  createdAt: string
  depositDeclaredAt?: string
  payerNote?: string
  slipUrl?: string
}

export type FloodBookingInput = {
  packageId: string
  date: string
  slot: string
  name: string
  phone: string
  lineId?: string
  email?: string
  province: string
  address: string
  placeId: string
  lat: number
  lng: number
  asset: string
  note?: string
  websiteUrl?: string
}

const hits = new Map<string, number[]>()

function storePath() {
  return process.env.FLOOD_BOOKINGS_PATH || join(process.cwd(), 'data', 'flood-bookings.json')
}

function clean(value: unknown, max: number) {
  return String(value ?? '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

function readAll(): FloodBooking[] {
  try {
    const parsed = JSON.parse(readFileSync(storePath(), 'utf8')) as FloodBooking[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(bookings: FloodBooking[]) {
  const path = storePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(bookings, null, 2)}\n`, 'utf8')
}

export function floodBookingOccupies(booking: FloodBooking, now = Date.now()) {
  if (booking.status === 'deposit_declared') return true
  const created = Date.parse(booking.createdAt)
  return Number.isFinite(created) && now - created < FLOOD_HOLD_MS
}

export function floodSlotRemaining(date: string, slot: FloodSlot, now = Date.now()) {
  const used = readAll().filter(
    (booking) => booking.date === date && booking.slot === slot && floodBookingOccupies(booking, now),
  ).length
  return Math.max(0, FLOOD_SLOT_CAPACITY - used)
}

export function floodAvailability(now = new Date()) {
  const today = bangkokDateIso(now)
  const dates = allowedDates('inspect', today)
  return {
    today,
    holdHours: FLOOD_HOLD_MS / (60 * 60 * 1000),
    dates: dates.map((date) => ({
      date,
      slots: FLOOD_SLOTS.map((time) => ({
        time,
        remaining: floodSlotRemaining(date, time, now.getTime()),
      })),
    })),
  }
}

export function assertFloodRate(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((stamp) => now - stamp < 60 * 60 * 1000)
  if (recent.length >= 8) {
    throw createError({ statusCode: 429, message: 'ส่งคำขอถี่เกินไป ลองใหม่ในอีกสักครู่ หรือโทรหาทีม' })
  }
  recent.push(now)
  hits.set(ip, recent)
}

function validEmail(value: string) {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function createFloodBooking(
  input: FloodBookingInput,
  catalog: FloodMarketplaceService[],
  now = new Date(),
) {
  if (clean(input.websiteUrl, 200)) {
    throw createError({ statusCode: 400, message: 'ไม่สามารถรับคำขอได้' })
  }

  const pkg = catalog.find((item) => item.slug === clean(input.packageId, 96) && item.bookable && item.priceThb)
  if (!pkg || !pkg.priceThb) throw createError({ statusCode: 400, message: 'ไม่พบแพ็กเกจที่เลือก' })

  const phone = normalizeThaiMobile(clean(input.phone, 20))
  if (!phone) throw createError({ statusCode: 400, message: 'กรุณากรอกเบอร์มือถือให้ถูกต้อง' })

  const name = clean(input.name, 100)
  if (name.length < 2) throw createError({ statusCode: 400, message: 'กรุณากรอกชื่อผู้ติดต่อ' })

  const address = clean(input.address, 300)
  if (address.length < 8) throw createError({ statusCode: 400, message: 'กรุณาเลือกที่อยู่จาก Google Map' })

  const placeId = clean(input.placeId, 1024)
  const lat = Number(input.lat)
  const lng = Number(input.lng)
  if (!placeId || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw createError({ statusCode: 400, message: 'กรุณาปักพิกัดจาก Google Map' })
  }
  if (lat < 5 || lat > 21 || lng < 97 || lng > 106) {
    throw createError({ statusCode: 400, message: 'พิกัดนี้อยู่นอกพื้นที่ให้บริการในประเทศไทย' })
  }

  const province = clean(input.province, 80)
  if (!province) throw createError({ statusCode: 400, message: 'กรุณาเลือกจังหวัด' })

  const asset = clean(input.asset, 20)
  if (asset !== 'solar' && asset !== 'ev' && asset !== 'both') {
    throw createError({ statusCode: 400, message: 'กรุณาเลือกประเภทอุปกรณ์' })
  }

  const email = clean(input.email, 120)
  if (!validEmail(email)) throw createError({ statusCode: 400, message: 'รูปแบบอีเมลไม่ถูกต้อง' })

  const slot = clean(input.slot, 5)
  if (slot !== '09:00' && slot !== '13:00') {
    throw createError({ statusCode: 400, message: 'กรุณาเลือกช่วงเวลา' })
  }

  const date = clean(input.date, 10)
  const today = bangkokDateIso(now)
  if (!allowedDates(pkg.slug, today).includes(date)) {
    throw createError({ statusCode: 400, message: 'วันที่นี้ไม่อยู่ในคิวที่เปิดรับ' })
  }

  const lineId = clean(input.lineId, 64).replace(/^@+/, '')
  const note = clean(input.note, 500)
  const existing = readAll().find(
    (booking) =>
      booking.phone === phone &&
      booking.packageId === pkg.slug &&
      booking.date === date &&
      booking.slot === slot &&
      floodBookingOccupies(booking, now.getTime()),
  )
  if (existing) {
    return { booking: existing, duplicate: true, stored: true }
  }

  if (floodSlotRemaining(date, slot, now.getTime()) < 1) {
    throw createError({ statusCode: 409, message: 'ช่วงเวลานี้เต็มแล้ว กรุณาเลือกวันหรือเวลาอื่น' })
  }

  const booking: FloodBooking = {
    ref: `FL${date.slice(2).replace(/-/g, '')}${randomBytes(2).toString('hex').toUpperCase()}`,
    packageId: pkg.slug,
    packageName: pkg.name,
    depositThb: pkg.priceThb,
    date,
    slot,
    name,
    phone,
    lineId,
    email,
    province,
    address,
    placeId,
    lat,
    lng,
    asset,
    note,
    status: 'awaiting_deposit',
    createdAt: now.toISOString(),
  }

  let stored = false
  try {
    const all = readAll()
    all.push(booking)
    writeAll(all)
    stored = true
  } catch {
    stored = false
  }

  return { booking, duplicate: false, stored }
}

export function promptPayForBooking(booking: FloodBooking) {
  return buildPromptPayPayload(booking.depositThb, booking.ref)
}

export function declareFloodDeposit(
  ref: string,
  phoneInput: string,
  payerNote: string,
  slipUrl = '',
  now = new Date(),
) {
  const code = clean(ref, 20).toUpperCase()
  if (!/^FL\d{6}[A-F0-9]{4}$/.test(code)) {
    throw createError({ statusCode: 400, message: 'รหัสจองไม่ถูกต้อง' })
  }
  const phone = normalizeThaiMobile(clean(phoneInput, 20))
  if (!phone) throw createError({ statusCode: 400, message: 'เบอร์โทรไม่ตรงกับคิวที่จอง' })

  const note = clean(payerNote, 80)
  const all = readAll()
  const index = all.findIndex((booking) => booking.ref === code && booking.phone === phone)
  if (index < 0) return { booking: null as FloodBooking | null, stored: false }

  const current = all[index]
  if (current.status === 'awaiting_deposit') {
    all[index] = {
      ...current,
      status: 'deposit_declared',
      depositDeclaredAt: now.toISOString(),
      payerNote: note,
      slipUrl: clean(slipUrl, 500) || current.slipUrl,
    }
    try {
      writeAll(all)
    } catch {
      return { booking: all[index], stored: false }
    }
  }
  return { booking: all[index], stored: true }
}
