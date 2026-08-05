<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  crumbs?: { label: string; to?: string }[]
}>()
</script>

<template>
  <section class="page-hero">
    <div class="container">
      <nav v-if="crumbs?.length" class="breadcrumb" aria-label="Breadcrumb">
        <template v-for="(c, i) in crumbs" :key="i">
          <NuxtLink v-if="c.to" :to="c.to">{{ c.label }}</NuxtLink>
          <span v-else>{{ c.label }}</span>
          <span v-if="i < crumbs.length - 1" aria-hidden="true">/</span>
        </template>
      </nav>
      <h1 class="animate-fade-up">{{ title }}</h1>
      <p v-if="description" class="animate-fade-up animate-delay-1">{{ description }}</p>
      <slot />
    </div>
  </section>
</template>
