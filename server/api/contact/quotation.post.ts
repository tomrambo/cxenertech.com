type QuoteResult = {
  ok: boolean
  duplicate?: boolean
  id?: number
  message?: string
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
      message: e.data?.message || e.message || 'ไม่สามารถส่งคำขอใบเสนอราคาได้',
    }
  }
  return { statusCode: 502, message: 'ไม่สามารถส่งคำขอใบเสนอราคาได้' }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const base = String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
  if (!base) {
    throw createError({
      statusCode: 503,
      message: 'ยังไม่ได้ตั้งค่า CMMS API สำหรับรับคำขอใบเสนอราคา',
    })
  }

  const body = await readBody(event)
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  }
  const secret = String(config.partnerIngestSecret || '').trim()
  if (secret) headers['x-partner-ingest-key'] = secret

  const ip = getRequestIP(event, { xForwardedFor: true })
  if (ip) headers['x-forwarded-for'] = ip
  const ua = getHeader(event, 'user-agent')
  if (ua) headers['user-agent'] = ua

  try {
    return await $fetch<QuoteResult>(`${base}/api/public/quote-leads`, {
      method: 'POST',
      body,
      headers,
    })
  } catch (err) {
    const parsed = errorMessage(err)
    throw createError(parsed)
  }
})
