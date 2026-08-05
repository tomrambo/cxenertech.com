<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'light' | 'dark' | 'mark'
    height?: number
  }>(),
  {
    variant: 'dark',
    height: 40,
  },
)
</script>

<template>
  <span class="brand-logo" :style="{ height: `${height}px` }">
    <!-- Dark backgrounds (header/footer): gold + white wordmark -->
    <img
      v-if="variant === 'light'"
      src="/logo-on-dark.png"
      alt="CX ENERTECH"
      class="brand-logo__img"
      :style="{ height: `${height}px` }"
    />
    <!-- Mark only -->
    <img
      v-else-if="variant === 'mark'"
      src="/logo-mark.png"
      alt="CX ENERTECH"
      class="brand-logo__img brand-logo__img--mark"
      :style="{ height: `${height}px` }"
    />
    <!-- Light backgrounds: official gold + navy logo -->
    <img
      v-else
      src="/logo.png"
      alt="CX ENERTECH"
      class="brand-logo__img"
      :style="{ height: `${height}px` }"
    />
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
}

.brand-logo__img {
  width: auto;
  display: block;
  object-fit: contain;
}

.brand-logo__img--mark {
  aspect-ratio: 1;
}
</style>
