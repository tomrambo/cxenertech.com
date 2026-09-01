<script setup lang="ts">
const map: Record<string, string> = {
  '100kw': 'factory-100',
  '200kw': 'factory-200',
  '500kw': 'factory-500',
  '1mw': 'factory-1mw',
}
const route = useRoute()
const id = map[String(route.params.size || '')]
if (!id) {
  throw createError({ statusCode: 404, statusMessage: 'ไม่พบขนาดระบบ' })
}
</script>

<template>
  <SolarLanding :id="id" />
</template>
