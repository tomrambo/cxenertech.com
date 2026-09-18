<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: 'light' | 'dark' | 'mark'
    height?: number
  }>(),
  {
    variant: 'dark',
    height: 40,
  },
)

const asset = computed(() => {
  if (props.variant === 'light') {
    return { src: '/logo-on-dark.png', width: 360, height: 206 }
  }
  if (props.variant === 'mark') {
    return { src: '/logo-mark.webp', width: 128, height: 128 }
  }
  return { src: '/logo.webp', width: 360, height: 208 }
})
</script>

<template>
  <span class="brand-logo" :style="{ height: `${height}px` }">
    <img
      :src="asset.src"
      alt="CX ENERTECH"
      class="brand-logo__img"
      :class="{ 'brand-logo__img--mark': variant === 'mark' }"
      :width="asset.width"
      :height="asset.height"
      decoding="async"
    />
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  height: v-bind('`${height}px`');
}

.brand-logo__img {
  width: auto;
  height: 100%;
  display: block;
  object-fit: contain;
}

.brand-logo__img--mark {
  aspect-ratio: 1;
}
</style>
