<script setup lang="ts">
import { seoRedirectTarget } from '~/utils/seo-redirects'

const route = useRoute()
const slug = String(route.params.slug || '').trim()
const fromBlog = slug ? `/blog/${slug}` : '/blog'
const dest =
  seoRedirectTarget(fromBlog) ||
  (slug ? `/knowledge/articles/${slug}` : '/knowledge/articles')
await navigateTo(dest, { redirectCode: 301, replace: true })
</script>
<template>
  <div />
</template>
