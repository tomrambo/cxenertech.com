import { assertPlaceRate, resolveFloodPlace, reverseFloodPlace, searchFloodPlaces } from '../../utils/flood-places'

export default defineEventHandler(async (event) => {
  assertPlaceRate(getRequestIP(event, { xForwardedFor: true }) || 'local')
  const query = getQuery(event)
  if (query.lat != null && query.lng != null && String(query.lat) !== '' && String(query.lng) !== '') {
    const lat = Number(query.lat)
    const lng = Number(query.lng)
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw createError({ statusCode: 400, message: 'พิกัดไม่ถูกต้อง' })
    }
    const place = await reverseFloodPlace(event, lat, lng)
    if (!place) throw createError({ statusCode: 404, message: 'ไม่พบสถานที่ตรงจุดนี้' })
    return { place }
  }
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
