<script setup lang="ts">
import { contactLineHandle, contactLineHref, contactTelHref } from '~/utils/nav'

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
      <div class="cta-actions-wrap">
        <div class="cta-actions">
          <NuxtLink :to="primaryToValue" class="btn btn-primary btn-lg">{{ primaryLabelText }}</NuxtLink>
          <NuxtLink v-if="secondaryLabelText" :to="secondaryToValue" class="btn btn-secondary">
            {{ secondaryLabelText }}
          </NuxtLink>
        </div>
        <p class="cta-alt">
          หรือคุยทันที
          <a :href="contactTelHref()">โทร</a>
          ·
          <a :href="contactLineHref()" target="_blank" rel="noopener noreferrer">
            LINE {{ contactLineHandle() }}
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-actions-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.65rem;
}

.cta-alt {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.85;
}

.cta-alt a {
  color: var(--color-lime);
  font-weight: 600;
}

@media (max-width: 800px) {
  .cta-actions-wrap {
    align-items: flex-start;
  }
}
</style>
