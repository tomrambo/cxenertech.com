import type { H3Event } from 'h3'

type QrResult = {
  qrImage: string | null
  merchantReference: string
  gatewayCode: 'scb_qr'
}

function cmmsHeaders(event: H3Event) {
  const config = useRuntimeConfig(event)
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  const secret = String(config.partnerIngestSecret || '').trim()
  if (secret) headers['x-partner-ingest-key'] = secret
  return headers
}

function qrFromGateway(payload: unknown) {
  const json = payload as { gatewayResponse?: { data?: { qrImage?: string } }; qrImage?: string } | null
  const raw = String(json?.qrImage || json?.gatewayResponse?.data?.qrImage || '')
  if (!raw) return null
  if (raw.startsWith('data:image/')) return raw
  return `data:image/png;base64,${raw}`
}

export async function createFloodGatewayQr(
  event: H3Event,
  amount: number,
  merchantReference: string,
): Promise<QrResult> {
  const config = useRuntimeConfig(event)
  const cmms = String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
  const callbackUrl = cmms ? `${cmms}/api/public/payments/callback` : ''

  if (cmms) {
    try {
      const res = await $fetch(`${cmms}/api/public/payments/qrcode`, {
        method: 'POST',
        headers: cmmsHeaders(event),
        body: {
          amount,
          merchantReference,
          currency: 'THB',
          gatewayCode: 'scb_qr',
          callbackUrl,
        },
        signal: AbortSignal.timeout(20000),
      })
      const qrImage = qrFromGateway(res)
      if (qrImage) return { qrImage, merchantReference, gatewayCode: 'scb_qr' }
    } catch (err) {
      console.warn('[flood-booking] CMMS payment QR was not created', err)
    }
  }

  const base = String(config.paymentApiBaseUrl || '').replace(/\/$/, '')
  const apiKey = String(config.paymentApiKey || '').trim()
  if (!base || !apiKey) {
    return { qrImage: null, merchantReference, gatewayCode: 'scb_qr' }
  }

  try {
    const res = await $fetch(`${base}/transactions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
      },
      body: {
        gatewayCode: 'scb_qr',
        amount,
        merchantReference,
        currency: 'THB',
        callbackUrl,
      },
      signal: AbortSignal.timeout(20000),
    })
    return {
      qrImage: qrFromGateway(res),
      merchantReference,
      gatewayCode: 'scb_qr',
    }
  } catch (err) {
    console.warn('[flood-booking] payment gateway QR was not created', err)
    return { qrImage: null, merchantReference, gatewayCode: 'scb_qr' }
  }
}

export async function forwardFloodSlip(event: H3Event, file: { data: Buffer; type: string; filename: string }) {
  const config = useRuntimeConfig(event)
  const cmms = String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
  if (!cmms) return null
  const body = new FormData()
  body.append('file', new Blob([file.data], { type: file.type }), file.filename)
  const headers: Record<string, string> = {}
  const secret = String(config.partnerIngestSecret || '').trim()
  if (secret) headers['x-partner-ingest-key'] = secret
  try {
    const res = await $fetch<{ url?: string }>(`${cmms}/api/public/payments/slip`, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(20000),
    })
    return res.url || null
  } catch (err) {
    console.warn('[flood-booking] CMMS slip upload was not accepted', err)
    return null
  }
}
