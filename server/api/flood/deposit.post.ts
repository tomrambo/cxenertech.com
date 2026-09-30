import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { contactInfo } from '../../../app/utils/nav'
import { assertFloodRate, declareFloodDeposit } from '../../utils/flood-bookings'
import { forwardFloodSlip } from '../../utils/flood-gateway'
import { forwardFloodLead, forwardFloodNotice } from '../../utils/flood-lead'

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf'])
const MAX_SLIP = 5 * 1024 * 1024

function field(form: { name?: string; data: Buffer }[], name: string) {
  return form.find((item) => item.name === name)?.data.toString('utf8') || ''
}

function saveLocalSlip(ref: string, file: { data: Buffer; filename?: string }) {
  const ext = (file.filename || 'slip.jpg').split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const dir = join(process.cwd(), 'data', 'flood-slips')
  mkdirSync(dir, { recursive: true })
  const filename = `${ref.replace(/[^A-Z0-9]/g, '')}.${ext}`
  writeFileSync(join(dir, filename), file.data)
  return filename
}

export default defineEventHandler(async (event) => {
  assertFloodRate(getRequestIP(event, { xForwardedFor: true }) || 'local')
  const form = await readMultipartFormData(event)
  if (!form) {
    throw createError({ statusCode: 400, message: 'กรุณาแนบสลิปการโอน' })
  }
  const file = form.find((item) => item.name === 'slip' && item.data?.length && item.type)
  if (!file?.type || !ALLOWED.has(file.type)) {
    throw createError({ statusCode: 400, message: 'สลิปต้องเป็นไฟล์ JPG, PNG, WEBP หรือ PDF' })
  }
  if (file.data.length > MAX_SLIP) {
    throw createError({ statusCode: 400, message: 'สลิปต้องมีขนาดไม่เกิน 5 MB' })
  }

  const ref = field(form, 'ref')
  const phone = field(form, 'phone')
  const payerNote = field(form, 'payerNote')
  const uploaded = await forwardFloodSlip(event, {
    data: file.data,
    type: file.type,
    filename: file.filename || 'slip.jpg',
  })
  let slipUrl = uploaded || ''
  if (!slipUrl) {
    try {
      slipUrl = saveLocalSlip(ref, file)
    } catch {
      slipUrl = ''
    }
  }
  if (!slipUrl) {
    throw createError({ statusCode: 503, message: 'บันทึกสลิปไม่สำเร็จ ลองแนบอีกครั้ง' })
  }

  const result = declareFloodDeposit(ref, phone, payerNote, slipUrl)
  const slipNote = `ลูกค้าแนบสลิปค่าจองแล้ว${uploaded ? ` ${uploaded}` : ` ไฟล์ ${slipUrl}`}`
  const leadForwarded = result.booking
    ? await forwardFloodLead(event, result.booking, slipNote)
    : await forwardFloodNotice(event, {
        name: 'ลูกค้าแนบสลิป',
        phone: phone.replace(/\D/g, ''),
        message: `ลูกค้าแนบสลิปค่าจองรหัส ${ref.replace(/[^A-Za-z0-9]/g, '').slice(0, 20)} ไม่พบคิวนี้ในไฟล์ของเครื่องที่รับแจ้ง ให้จับคู่จากรหัสจองในลีดเดิม สลิป ${slipUrl}`,
        packageCode: ref.replace(/[^A-Za-z0-9]/g, '').slice(0, 20),
      })

  if (!result.booking && !leadForwarded) {
    throw createError({
      statusCode: 404,
      message: `ไม่พบคิวนี้ โทร ${contactInfo.phone} แล้วแจ้งรหัสจอง`,
    })
  }

  return {
    ok: true,
    booking: result.booking,
    leadForwarded,
    slipUrl,
  }
})
