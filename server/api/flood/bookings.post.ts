import { contactInfo } from '../../../app/utils/nav'
import { assertFloodRate, createFloodBooking } from '../../utils/flood-bookings'
import { createFloodGatewayQr } from '../../utils/flood-gateway'
import { forwardFloodLead } from '../../utils/flood-lead'
import { fetchFloodMarketplace } from '../../utils/flood-marketplace'
import { resolveFloodPlace } from '../../utils/flood-places'

export default defineEventHandler(async (event) => {
  assertFloodRate(getRequestIP(event, { xForwardedFor: true }) || 'local')
  const body = await readBody(event)
  const catalog = await fetchFloodMarketplace(event)
  const place = await resolveFloodPlace(event, String(body?.placeId || ''))
  if (!place) {
    throw createError({ statusCode: 400, message: 'กรุณาเลือกที่อยู่จาก Google Map แล้วปักพิกัดอีกครั้ง' })
  }

  const result = createFloodBooking(
    {
      ...(body || {}),
      address: place.address,
      placeId: place.placeId,
      lat: place.lat,
      lng: place.lng,
    },
    catalog.services,
  )
  const payment = await createFloodGatewayQr(event, result.booking.depositThb, result.booking.ref)
  const leadForwarded = result.duplicate
    ? false
    : await forwardFloodLead(event, result.booking)

  if (!result.stored && !leadForwarded && !result.duplicate) {
    throw createError({
      statusCode: 503,
      message: `ยังบันทึกคิวไม่ได้ โทร ${contactInfo.phone} เพื่อจองกับทีมโดยตรง`,
    })
  }

  return {
    ok: true,
    duplicate: result.duplicate,
    held: result.stored,
    leadForwarded,
    booking: result.booking,
    payment,
  }
})
