<script setup lang="ts">
import { floodMapLatLngAt } from '~/utils/flood-map'

const props = defineProps<{
  lat: number | null
  lng: number | null
  label: string
}>()

const emit = defineEmits<{
  pick: [point: { lat: number; lng: number }]
  failed: []
}>()

const BANGKOK = { lat: 13.7563, lng: 100.5018 }
const center = reactive({ lat: BANGKOK.lat, lng: BANGKOK.lng, z: 11 })
const img = ref<HTMLImageElement | null>(null)
const shift = ref({ x: 0, y: 0 })
let drag: { x: number; y: number; lat: number; lng: number; moved: boolean } | null = null

watch(
  () => [props.lat, props.lng] as const,
  ([lat, lng]) => {
    if (lat == null || lng == null) return
    center.lat = lat
    center.lng = lng
    if (center.z < 15) center.z = 16
  },
)

const src = computed(() => {
  const params = new URLSearchParams({
    lat: center.lat.toFixed(5),
    lng: center.lng.toFixed(5),
    z: String(center.z),
  })
  if (props.lat != null && props.lng != null) {
    params.set('pinLat', props.lat.toFixed(5))
    params.set('pinLng', props.lng.toFixed(5))
  }
  return `/api/flood/map-image?${params.toString()}`
})

function zoomBy(step: number) {
  center.z = Math.min(18, Math.max(10, center.z + step))
}

function onPointerDown(event: PointerEvent) {
  drag = { x: event.clientX, y: event.clientY, lat: center.lat, lng: center.lng, moved: false }
  try {
    img.value?.setPointerCapture(event.pointerId)
  } catch {
    // Synthetic events and some browsers reject capture. The click still counts.
  }
}

function onPointerMove(event: PointerEvent) {
  if (!drag) return
  const x = event.clientX - drag.x
  const y = event.clientY - drag.y
  if (Math.hypot(x, y) > 6) drag.moved = true
  shift.value = drag.moved ? { x, y } : { x: 0, y: 0 }
}

function onPointerUp(event: PointerEvent) {
  if (!drag || !img.value) {
    drag = null
    return
  }
  const rect = img.value.getBoundingClientRect()
  const moved = drag.moved
  const origin = { lat: drag.lat, lng: drag.lng }
  const dx = event.clientX - drag.x
  const dy = event.clientY - drag.y
  drag = null
  shift.value = { x: 0, y: 0 }
  if (!moved) {
    const point = floodMapLatLngAt({
      centerLat: origin.lat,
      centerLng: origin.lng,
      zoom: center.z,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
    })
    emit('pick', point)
    return
  }
  const next = floodMapLatLngAt({
    centerLat: origin.lat,
    centerLng: origin.lng,
    zoom: center.z,
    x: rect.width / 2 - dx,
    y: rect.height / 2 - dy,
    width: rect.width,
    height: rect.height,
  })
  center.lat = next.lat
  center.lng = next.lng
}
</script>

<template>
  <div class="flood-map">
    <img
      ref="img"
      :src="src"
      :alt="label"
      width="640"
      height="360"
      draggable="false"
      :style="{ transform: `translate(${shift.x}px, ${shift.y}px)` }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @error="emit('failed')"
    />
    <div class="flood-map__zoom">
      <button type="button" aria-label="ซูมเข้า" @click="zoomBy(1)">+</button>
      <button type="button" aria-label="ซูมออก" @click="zoomBy(-1)">−</button>
    </div>
  </div>
</template>

<style scoped>
.flood-map {
  position: relative;
  margin-top: 0.75rem;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(212, 255, 0, 0.28);
  background: #141414;
  touch-action: none;
}

.flood-map img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: fill;
  cursor: crosshair;
  user-select: none;
}

.flood-map__zoom {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  display: grid;
  gap: 0.35rem;
}

.flood-map__zoom button {
  width: 2.1rem;
  height: 2.1rem;
  border: 0;
  border-radius: 10px;
  background: #111;
  color: #d4ff00;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}
</style>
