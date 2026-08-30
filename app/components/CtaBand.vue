<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
  secondaryLabel?: string
  secondaryTo?: string
}>()

const { t } = useLocale()

const titleText = computed(() => props.title ?? t('cta.title'))
const descriptionText = computed(() => props.description ?? t('cta.description'))
const primaryLabelText = computed(() => props.primaryLabel ?? t('cta.quote'))
const primaryToValue = computed(() => props.primaryTo ?? '/contact/quotation')
const secondaryLabelText = computed(() => props.secondaryLabel ?? t('cta.contact'))
const secondaryToValue = computed(() => props.secondaryTo ?? '/contact')
</script>

<template>
  <section class="cta-band">
    <div class="container">
      <div>
        <h2>{{ titleText }}</h2>
        <p>{{ descriptionText }}</p>
      </div>
      <div class="cta-actions">
        <NuxtLink :to="primaryToValue" class="btn btn-primary">{{ primaryLabelText }}</NuxtLink>
        <NuxtLink v-if="secondaryLabelText" :to="secondaryToValue" class="btn btn-secondary">
          {{ secondaryLabelText }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
