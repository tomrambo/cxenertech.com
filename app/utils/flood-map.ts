export const FLOOD_MAP_WIDTH = 640
export const FLOOD_MAP_HEIGHT = 360

function project(lat: number, lng: number, zoom: number) {
  const scale = 256 * 2 ** zoom
  const sin = Math.sin((lat * Math.PI) / 180)
  return {
    scale,
    x: ((lng + 180) / 360) * scale,
    y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * scale,
  }
}

export function floodMapLatLngAt(input: {
  centerLat: number
  centerLng: number
  zoom: number
  x: number
  y: number
  width: number
  height: number
}) {
  const origin = project(input.centerLat, input.centerLng, input.zoom)
  const px = origin.x + (input.x / input.width - 0.5) * FLOOD_MAP_WIDTH
  const py = origin.y + (input.y / input.height - 0.5) * FLOOD_MAP_HEIGHT
  const lng = (px / origin.scale) * 360 - 180
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - (2 * py) / origin.scale))) * 180) / Math.PI
  return { lat, lng }
}
