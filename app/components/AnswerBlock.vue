<script setup lang="ts">
defineProps<{
  paragraphs: string[]
  assumptions?: string[]
  quoteTo: string
  quoteLabel: string
}>()
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="content-block">
        <h2>คำตอบสั้น</h2>
        <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
        <p v-if="assumptions?.length">สมมติฐาน: {{ assumptions.join(' ') }}</p>
        <p>
          <NuxtLink :to="quoteTo">{{ quoteLabel }}</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>
