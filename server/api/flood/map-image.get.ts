import { assertPlaceRate, fetchFloodMap } from '../../utils/flood-places'

function coord(value: unknown) {
  if (value == null || String(value) === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : Number.NaN
}

export default defineEventHandler(async (event) => {
  assertPlaceRate(getRequestIP(event, { xForwardedFor: true }) || 'local')
  const query = getQuery(event)
  const lat = coord(query.lat)
  const lng = coord(query.lng)
  const zoom = Number(query.z)
  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw createError({ statusCode: 400, message: 'พิกัดไม่ถูกต้อง' })
  }
  if (lat < 5 || lat > 21 || lng < 97 || lng > 106) {
    throw createError({ statusCode: 400, message: 'พิกัดนี้อยู่นอกพื้นที่ให้บริการในประเทศไทย' })
  }
  const pinLat = coord(query.pinLat)
  const pinLng = coord(query.pinLng)
  const image = await fetchFloodMap(event, {
    lat,
    lng,
    zoom: Number.isFinite(zoom) ? zoom : 12,
    pinLat: pinLat ?? undefined,
    pinLng: pinLng ?? undefined,
  })
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Cache-Control', 'private, max-age=300')
  return image
})
