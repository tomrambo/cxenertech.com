import { assertFloodRate } from '../../utils/flood-bookings'
import { resolveFloodPlace, searchFloodPlaces } from '../../utils/flood-places'

export default defineEventHandler(async (event) => {
  assertFloodRate(getRequestIP(event, { xForwardedFor: true }) || 'local')
  const query = getQuery(event)
  const placeId = String(query.placeId || '').trim()
  if (placeId) {
    const place = await resolveFloodPlace(event, placeId)
    if (!place) {
      throw createError({ statusCode: 404, message: 'ไม่พบพิกัดของสถานที่นี้' })
    }
    return { place }
  }
  const q = String(query.q || '')
  const suggestions = await searchFloodPlaces(event, q)
  return { suggestions }
})
