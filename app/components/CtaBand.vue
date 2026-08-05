<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    primaryLabel?: string
    primaryTo?: string
    secondaryLabel?: string
    secondaryTo?: string
  }>(),
  {
    title: 'พร้อมเริ่มต้นโครงการของคุณ?',
    description: 'ทีม CX ENERTECH พร้อมให้คำปรึกษา ออกแบบ และเสนอราคาโซลูชันที่เหมาะสมกับความต้องการของคุณ',
    primaryLabel: 'ขอใบเสนอราคา',
    primaryTo: '/contact/quotation',
    secondaryLabel: 'ติดต่อเรา',
    secondaryTo: '/contact',
  },
)
</script>

<template>
  <section class="cta-band">
    <div class="container">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <div class="cta-actions">
        <NuxtLink :to="primaryTo" class="btn btn-primary">{{ primaryLabel }}</NuxtLink>
        <NuxtLink v-if="secondaryLabel" :to="secondaryTo" class="btn btn-secondary">
          {{ secondaryLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
