<script setup lang="ts">
const route = useRoute()
await navigateTo(
  {
    path: '/contact/quotation',
    query: {
      ...route.query,
      intent: 'finance',
      type: typeof route.query.type === 'string' && route.query.type ? route.query.type : 'solar',
    },
  },
  { replace: true },
)
</script>

<template>
  <div />
</template>
