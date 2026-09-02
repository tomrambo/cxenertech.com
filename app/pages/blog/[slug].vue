<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '').trim()
await navigateTo(
  slug ? `/knowledge/articles/${slug}` : '/knowledge/articles',
  { redirectCode: 301, replace: true },
)
</script>
<template>
  <div />
</template>
