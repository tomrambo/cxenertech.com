<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    width: number
    height: number
    sizes?: string
    widths?: number[]
    eager?: boolean
    fetchpriority?: 'high' | 'low' | 'auto'
  }>(),
  {
    alt: '',
    sizes: '(max-width: 800px) 100vw, 1280px',
    eager: false,
    fetchpriority: 'auto',
  },
)

const stem = computed(() => props.src.replace(/\.(jpe?g|png)$/i, ''))

const webpSrcset = computed(() => {
  if (!props.widths?.length) return `${stem.value}.webp`
  return props.widths.map((width) => `${stem.value}-${width}.webp ${width}w`).join(', ')
})
</script>

<template>
  <picture class="opt-photo">
    <source
      type="image/webp"
      :srcset="webpSrcset"
      :sizes="widths?.length ? sizes : undefined"
    />
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :decoding="eager ? 'sync' : 'async'"
      :fetchpriority="fetchpriority"
    />
  </picture>
</template>

<style scoped>
.opt-photo,
.opt-photo img {
  display: block;
  width: 100%;
  height: 100%;
}

.opt-photo img {
  object-fit: cover;
}
</style>
