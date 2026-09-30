import { floodPackage, slotLabel } from '../../app/utils/flood-recovery'
import { contactInfo } from '../../app/utils/nav'
import type { FloodBooking as StoredBooking } from './flood-bookings'

type LeadBooking = Pick<
  StoredBooking,
  | 'ref'
  | 'packageId'
  | 'depositThb'
  | 'date'
  | 'slot'
  | 'name'
  | 'phone'
  | 'lineId'
  | 'email'
  | 'province'
  | 'address'
  | 'lat'
  | 'lng'
  | 'packageName'
  | 'asset'
  | 'note'
  | 'status'
>

function assetLabel(asset: LeadBooking['asset']) {
  if (asset === 'solar') return 'โซลาร์'
  if (asset === 'ev') return 'เครื่องชาร์จ EV'
  if (asset === 'both') return 'โซลาร์และเครื่องชาร์จ EV'
  return 'อื่นๆ'
}

export function floodLeadMessage(booking: LeadBooking, extra?: string) {
  const pkg = floodPackage(booking.packageId)
  const lines = [
    `รหัสจอง ${booking.ref}`,
    `แพ็กเกจ ${booking.packageName || pkg?.name.th || booking.packageId}`,
    `ค่าจอง ${booking.depositThb} บาท`,
    `วันที่ ${booking.date} ${slotLabel(booking.slot, 'th')}`,
    `อุปกรณ์ ${assetLabel(booking.asset)}`,
    `ที่อยู่ ${booking.address} ${booking.province}`,
    Number.isFinite(booking.lat) && Number.isFinite(booking.lng)
      ? `พิกัด ${booking.lat}, ${booking.lng} https://www.google.com/maps/search/?api=1&query=${booking.lat},${booking.lng}`
      : '',
    booking.note ? `หมายเหตุ ${booking.note}` : '',
    `สถานะ ${booking.status === 'deposit_declared' ? 'ลูกค้าแจ้งว่าโอนแล้ว' : 'รอการโอนค่าจอง'}`,
    extra || '',
  ]
  return lines.filter(Boolean).join('\n')
}

export async function forwardFloodNotice(
  event: Parameters<typeof useRuntimeConfig>[0],
  input: {
    name: string
    phone: string
    email?: string
    lineId?: string
    province?: string
    message: string
    packageCode: string
  },
) {
  const config = useRuntimeConfig(event)
  const base = String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
  if (!base) return false

  const headers: Record<string, string> = { 'content-type': 'application/json' }
  const secret = String(config.partnerIngestSecret || '').trim()
  if (secret) headers['x-partner-ingest-key'] = secret

  try {
    await $fetch(`${base}/api/public/quote-leads`, {
      method: 'POST',
      headers,
      signal: AbortSignal.timeout(4000),
      body: {
        name: input.name,
        company: '',
        email: input.email || contactInfo.email,
        phone: input.phone,
        lineId: input.lineId || '',
        province: input.province || '',
        type: 'Flood Recovery',
        capacity: '',
        message: input.message,
        packageCode: input.packageCode,
        pagePath: '/flood-recovery',
        sourceDetail: 'cxenertech.com',
        websiteUrl: '',
        entryKind: 'flood_booking',
        intent: 'flood_booking',
      },
    })
    return true
  } catch (err) {
    console.warn('[flood-booking] CMMS lead was not forwarded', err)
    return false
  }
}

export function forwardFloodLead(
  event: Parameters<typeof useRuntimeConfig>[0],
  booking: LeadBooking,
  extra?: string,
) {
  return forwardFloodNotice(event, {
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    lineId: booking.lineId,
    province: booking.province,
    message: floodLeadMessage(booking, extra),
    packageCode: booking.ref,
  })
}
