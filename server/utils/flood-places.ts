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

export function extractFloodCoordinates(input: string): { lat: number; lng: number } | null {
  const text = input.trim()
  const match =
    text.match(/@(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/) ||
    text.match(/!3d(-?\d{1,3}\.\d+)!4d(-?\d{1,3}\.\d+)/) ||
    text.match(/(?:[?&](?:q|query|ll)=)(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/) ||
    text.match(/(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/)
  if (!match) return null
  let lat = Number(match[1])
  let lng = Number(match[2])
  const inside = (a: number, b: number) => a >= 5 && a <= 21 && b >= 97 && b <= 106
  if (!inside(lat, lng) && inside(lng, lat)) {
    const swapped = lat
    lat = lng
    lng = swapped
  }
  if (!inside(lat, lng)) return null
  return { lat, lng }
}

function placeSearchText(input: string) {
  return input
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function geocodeFloodPlaces(event: H3Event, input: string): Promise<FloodPlaceSuggestion[]> {
  const json = await mapsGet<{
    status?: string
    results?: Array<{
      place_id?: string
      formatted_address?: string
      geometry?: { location?: { lat?: number; lng?: number } }
    }>
  }>(event, 'geocode/json', {
    address: input,
    language: 'th',
    region: 'th',
  })
  if (json.status === 'ZERO_RESULTS') return []
  return (json.results || [])
    .map((item) => {
      const pin = pinFromGeocode(item)
      return pin ? { placeId: pin.placeId, description: pin.address } : null
    })
    .filter((item): item is FloodPlaceSuggestion => Boolean(item))
    .slice(0, 5)
}

export async function searchFloodPlaces(event: H3Event, input: string): Promise<FloodPlaceSuggestion[]> {
  const raw = input.replace(/\s+/g, ' ').trim()
  if (raw.length < 2) return []
  const coords = extractFloodCoordinates(raw)
  if (coords) {
    const pin = await reverseFloodPlace(event, coords.lat, coords.lng)
    return pin ? [{ placeId: pin.placeId, description: pin.address }] : []
  }
  const q = placeSearchText(raw)
  if (q.length < 2) return []
  try {
    const json = await mapsGet<{
      predictions?: Array<{ place_id?: string; description?: string }>
      status?: string
    }>(event, 'place/autocomplete/json', {
      input: q.slice(0, 180),
      components: 'country:th',
      language: 'th',
    })
    const hits = (json.predictions || [])
      .map((item) => ({
        placeId: String(item.place_id || ''),
        description: String(item.description || ''),
      }))
      .filter((item) => item.placeId && item.description)
      .slice(0, 6)
    if (hits.length) return hits
  } catch {
    // A full pasted address can be rejected by autocomplete. Geocoding still understands it.
  }
  return geocodeFloodPlaces(event, q.slice(0, 300))
}

const placeHits = new Map<string, number[]>()

export function assertPlaceRate(ip: string) {
  const now = Date.now()
  const recent = (placeHits.get(ip) || []).filter((stamp) => now - stamp < 10 * 60 * 1000)
  if (recent.length >= 40) {
    throw createError({ statusCode: 429, message: 'ค้นหาสถานที่ถี่เกินไป ลองใหม่ในอีกสักครู่' })
  }
  recent.push(now)
  placeHits.set(ip, recent)
}

function pinFromGeocode(item: {
  place_id?: string
  formatted_address?: string
  geometry?: { location?: { lat?: number; lng?: number } }
}): FloodPlacePin | null {
  const loc = item.geometry?.location
  const address = String(item.formatted_address || '').trim()
  const placeId = String(item.place_id || '')
  if (!placeId || !loc || !Number.isFinite(loc.lat) || !Number.isFinite(loc.lng) || address.length < 8) return null
  if (loc.lat < 5 || loc.lat > 21 || loc.lng < 97 || loc.lng > 106) return null
  return { placeId, address, lat: loc.lat, lng: loc.lng }
}

export async function reverseFloodPlace(event: H3Event, lat: number, lng: number): Promise<FloodPlacePin | null> {
  if (lat < 5 || lat > 21 || lng < 97 || lng > 106) return null
  const json = await mapsGet<{
    status?: string
    results?: Array<{
      place_id?: string
      formatted_address?: string
      geometry?: { location?: { lat?: number; lng?: number } }
    }>
  }>(event, 'geocode/json', {
    latlng: `${lat.toFixed(6)},${lng.toFixed(6)}`,
    language: 'th',
  })
  if (json.status === 'ZERO_RESULTS') return null
  for (const item of json.results || []) {
    const pin = pinFromGeocode(item)
    if (pin) return pin
  }
  return null
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

export async function fetchFloodMap(event: H3Event, input: { lat: number; lng: number; zoom: number; pinLat?: number; pinLng?: number }) {
  const key = mapsKey(event)
  if (!key) throw createError({ statusCode: 503, message: 'ยังไม่ได้ตั้งค่า Google Maps สำหรับค้นหาที่อยู่' })
  const zoom = Math.min(18, Math.max(10, Math.round(input.zoom)))
  const url = new URL('https://maps.googleapis.com/maps/api/staticmap')
  url.searchParams.set('center', `${input.lat},${input.lng}`)
  url.searchParams.set('zoom', String(zoom))
  url.searchParams.set('size', '640x360')
  url.searchParams.set('scale', '2')
  url.searchParams.set('maptype', 'roadmap')
  url.searchParams.set('language', 'th')
  url.searchParams.set('region', 'th')
  if (Number.isFinite(input.pinLat) && Number.isFinite(input.pinLng)) {
    url.searchParams.set('markers', `color:0xC6F000|${input.pinLat},${input.pinLng}`)
  }
  url.searchParams.set('key', key)
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  const type = res.headers.get('content-type') || ''
  if (!res.ok || !type.includes('image')) {
    throw createError({ statusCode: 502, message: 'โหลดแผนที่ Google ไม่สำเร็จ' })
  }
  return new Uint8Array(await res.arrayBuffer())
}
