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
    <!-- Dark navy header: white wordmark SVG -->
    <img
      v-if="variant === 'light'"
      src="/logo-white.svg"
      alt="CX ENERTECH"
      class="brand-logo__img"
      :style="{ height: `${height}px` }"
    />
    <!-- Mark only -->
    <img
      v-else-if="variant === 'mark'"
      src="/logo-mark.svg"
      alt="CX ENERTECH"
      class="brand-logo__img brand-logo__img--mark"
      :style="{ height: `${height}px` }"
    />
    <!-- Light backgrounds: high-fidelity PNG -->
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
