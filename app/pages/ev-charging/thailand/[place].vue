<script setup lang="ts">
import { EV_LOCATION_SLUGS } from '~/utils/ev-landings'

const route = useRoute()
const id = String(route.params.place || '')
if (!EV_LOCATION_SLUGS.includes(id)) {
  throw createError({ statusCode: 404, statusMessage: 'ไม่พบจังหวัด' })
}
</script>

<template>
  <EvLanding :id="id" />
</template>
