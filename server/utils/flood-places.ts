import type { H3Event } from 'h3'

export type FloodPlaceSuggestion = {
  placeId: string
  description: string
}

export type FloodPlacePin = {
  placeId: string
  address: string
  lat: number
  lng: number
}

function mapsKey(event: H3Event) {
  const config = useRuntimeConfig(event)
  return String(config.googleMapsApiKey || '').trim()
}

async function mapsGet<T>(event: H3Event, path: string, query: Record<string, string>) {
  const key = mapsKey(event)
  if (!key) {
    throw createError({ statusCode: 503, message: 'ยังไม่ได้ตั้งค่า Google Maps สำหรับค้นหาที่อยู่' })
  }
  const url = new URL(`https://maps.googleapis.com/maps/api/${path}`)
  for (const [name, value] of Object.entries(query)) url.searchParams.set(name, value)
  url.searchParams.set('key', key)
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  const json = (await res.json().catch(() => null)) as (T & { status?: string; error_message?: string }) | null
  if (!json || json.status === 'REQUEST_DENIED' || json.status === 'INVALID_REQUEST') {
    throw createError({
      statusCode: 502,
      message: 'Google Map ปฏิเสธคำค้นนี้ ตรวจคีย์และสิทธิ์ Places API',
    })
  }
  return json
}

export async function searchFloodPlaces(event: H3Event, input: string): Promise<FloodPlaceSuggestion[]> {
  const q = input.replace(/\s+/g, ' ').trim()
  if (q.length < 2) return []
  const json = await mapsGet<{
    predictions?: Array<{ place_id?: string; description?: string }>
    status?: string
  }>(event, 'place/autocomplete/json', {
    input: q,
    components: 'country:th',
    language: 'th',
  })
  if (json.status === 'ZERO_RESULTS') return []
  return (json.predictions || [])
    .map((item) => ({
      placeId: String(item.place_id || ''),
      description: String(item.description || ''),
    }))
    .filter((item) => item.placeId && item.description)
    .slice(0, 6)
}

export async function resolveFloodPlace(event: H3Event, placeId: string): Promise<FloodPlacePin | null> {
  const id = placeId.trim()
  if (!/^[A-Za-z0-9_-]{8,1024}$/.test(id)) return null
  const json = await mapsGet<{
    status?: string
    result?: {
      place_id?: string
      formatted_address?: string
      geometry?: { location?: { lat?: number; lng?: number } }
    }
  }>(event, 'place/details/json', {
    place_id: id,
    fields: 'formatted_address,geometry,place_id',
    language: 'th',
  })
  const loc = json.result?.geometry?.location
  const address = String(json.result?.formatted_address || '').trim()
  if (json.status !== 'OK' || !loc || !Number.isFinite(loc.lat) || !Number.isFinite(loc.lng) || address.length < 8) {
    return null
  }
  if (loc.lat < 5 || loc.lat > 21 || loc.lng < 97 || loc.lng > 106) return null
  return {
    placeId: String(json.result?.place_id || id),
    address,
    lat: loc.lat,
    lng: loc.lng,
  }
}
