<template>
  <section class="package-gallery" :aria-label="`รูปภาพ ${name}`" @keydown="onKeydown">
    <div class="package-gallery__stage">
      <button
        type="button"
        class="package-gallery__image-button"
        :aria-label="`ขยายรูปภาพ ${name} ภาพที่ ${selectedIndex + 1}`"
        @click="openLightbox"
      >
        <img
          :src="selectedImage"
          :alt="`${name} — ภาพที่ ${selectedIndex + 1}`"
          width="1200"
          height="675"
          decoding="async"
          referrerpolicy="no-referrer"
        />
        <span class="package-gallery__expand" aria-hidden="true">⤢ ขยายภาพ</span>
      </button>

      <template v-if="images.length > 1">
        <button type="button" class="package-gallery__arrow package-gallery__arrow--previous" aria-label="ภาพก่อนหน้า" @click="move(-1)">‹</button>
        <button type="button" class="package-gallery__arrow package-gallery__arrow--next" aria-label="ภาพถัดไป" @click="move(1)">›</button>
      </template>
      <span class="package-gallery__counter" aria-hidden="true">{{ selectedIndex + 1 }} / {{ images.length }}</span>
    </div>

    <div v-if="images.length > 1" class="package-gallery__thumbnails" aria-label="เลือกรูปภาพ">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="package-gallery__thumbnail"
        :class="{ 'package-gallery__thumbnail--selected': index === selectedIndex }"
        :aria-label="`ดูภาพที่ ${index + 1} จาก ${images.length}`"
        :aria-pressed="index === selectedIndex"
        @click="selectedIndex = index"
      >
        <img :src="image" alt="" loading="lazy" width="160" height="100" decoding="async" referrerpolicy="no-referrer" />
      </button>
    </div>
    <p class="sr-only" role="status">ภาพที่ {{ selectedIndex + 1 }} จาก {{ images.length }}</p>

    <dialog ref="lightbox" class="package-gallery__lightbox" :aria-label="`รูปภาพขนาดใหญ่ ${name}`" @close="unlockScroll" @click="closeOnBackdrop">
      <div class="package-gallery__lightbox-content">
        <button type="button" class="package-gallery__close" aria-label="ปิดภาพขนาดใหญ่" autofocus @click="lightbox?.close()">✕</button>
        <img
          :src="selectedImage"
          :alt="`${name} — ภาพที่ ${selectedIndex + 1}`"
          class="package-gallery__full-image"
          referrerpolicy="no-referrer"
        />
        <div class="package-gallery__lightbox-controls">
          <button v-if="images.length > 1" type="button" aria-label="ภาพก่อนหน้า" @click="move(-1)">‹</button>
          <span aria-live="polite">{{ selectedIndex + 1 }} / {{ images.length }}</span>
          <button v-if="images.length > 1" type="button" aria-label="ภาพถัดไป" @click="move(1)">›</button>
        </div>
      </div>
    </dialog>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{ images: string[]; name: string }>()
const selectedIndex = ref(0)
const selectedImage = computed(() => props.images[selectedIndex.value])
const lightbox = ref<HTMLDialogElement | null>(null)
let previousOverflow: string | undefined

function move(direction: number) {
  selectedIndex.value = (selectedIndex.value + direction + props.images.length) % props.images.length
}

function onKeydown(event: KeyboardEvent) {
  if (props.images.length < 2) return
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }
}

function openLightbox() {
  if (!lightbox.value || lightbox.value.open) return
  lightbox.value.showModal()
  previousOverflow = document.documentElement.style.overflow
  document.documentElement.style.overflow = 'hidden'
}

function unlockScroll() {
  if (previousOverflow === undefined) return
  document.documentElement.style.overflow = previousOverflow
  previousOverflow = undefined
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === lightbox.value) lightbox.value?.close()
}

onBeforeUnmount(() => {
  lightbox.value?.close()
  unlockScroll()
})
</script>

<style scoped>
.package-gallery {
  margin: 1.25rem 0 1.5rem;
}

.package-gallery__stage {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #0e1a2b;
}

button {
  font-family: inherit;
  cursor: pointer;
}

.package-gallery button:focus-visible {
  outline: 3px solid var(--color-lime);
  outline-offset: -4px;
}

.package-gallery__image-button {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}

.package-gallery__image-button > img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
}

.package-gallery__expand,
.package-gallery__counter {
  position: absolute;
  padding: 0.35rem 0.65rem;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 0.8rem;
  pointer-events: none;
}

.package-gallery__expand {
  right: 0.75rem;
  bottom: 0.75rem;
}

.package-gallery__counter {
  top: 0.75rem;
  right: 0.75rem;
}

.package-gallery__arrow,
.package-gallery__lightbox-controls button,
.package-gallery__close {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 2rem;
  line-height: 1;
}

.package-gallery__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.package-gallery__arrow--previous {
  left: 0.75rem;
}

.package-gallery__arrow--next {
  right: 0.75rem;
}

.package-gallery__thumbnails {
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  padding: 0.75rem 0 0.25rem;
}

.package-gallery__thumbnail {
  flex: 0 0 100px;
  padding: 3px;
  border: 2px solid transparent;
  background: var(--color-panel);
  opacity: 0.65;
}

.package-gallery__thumbnail:hover,
.package-gallery__thumbnail--selected {
  opacity: 1;
}

.package-gallery__thumbnail--selected {
  border-color: var(--color-lime);
}

.package-gallery__thumbnail img {
  display: block;
  width: 100%;
  height: 60px;
  object-fit: cover;
}

.package-gallery__lightbox {
  position: fixed;
  inset: 0;
  width: min(1200px, calc(100% - 2rem));
  max-width: none;
  max-height: calc(100dvh - 2rem);
  margin: auto;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: #0b0b0b;
  color: #fff;
}

.package-gallery__lightbox::backdrop {
  background: rgba(0, 0, 0, 0.9);
}

.package-gallery__lightbox-content {
  position: relative;
  padding: 3.75rem 1rem 1rem;
}

.package-gallery__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.25rem;
}

.package-gallery__full-image {
  display: block;
  width: 100%;
  height: min(70dvh, 800px);
  object-fit: contain;
}

.package-gallery__lightbox-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (max-width: 540px) {
  .package-gallery__thumbnail {
    flex-basis: 80px;
  }

  .package-gallery__thumbnail img {
    height: 48px;
  }

  .package-gallery__lightbox-content {
    padding-inline: 0.5rem;
  }
}
</style>
