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
    <img
      v-if="variant === 'mark'"
      src="/logo-mark.svg"
      alt="CX ENERTECH"
      class="brand-logo__img"
      :style="{ height: `${height}px` }"
    />
    <img
      v-else-if="variant === 'light'"
      src="/logo-white.svg"
      alt="CX ENERTECH"
      class="brand-logo__img"
      :style="{ height: `${height}px` }"
    />
    <img
      v-else
      src="/logo.svg"
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
}
</style>
