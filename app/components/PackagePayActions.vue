<script setup lang="ts">
import {
  financeFormTo,
  financePageTo,
  isOwnerFinancePackage,
  quoteFormTo,
  type PayAsset,
} from '~/utils/pay-paths'

const props = defineProps<{
  asset: PayAsset
  packageCode: string
  productType?: string
  detailTo?: string
  layout?: 'card' | 'aside'
  quoteLabel?: string
}>()

const layout = computed(() => props.layout || 'card')
const eligible = computed(() => isOwnerFinancePackage(props.productType))
const quoteLabel = computed(() => props.quoteLabel || 'ขอใบเสนอราคา')
</script>

<template>
  <div class="pkg-pay" :data-layout="layout">
    <NuxtLink v-if="detailTo" class="btn btn-primary" :to="detailTo">รายละเอียด</NuxtLink>
    <NuxtLink
      class="btn"
      :class="detailTo ? 'btn-secondary' : 'btn-primary'"
      :to="quoteFormTo(asset, packageCode)"
    >
      {{ quoteLabel }}
    </NuxtLink>
    <template v-if="eligible">
      <NuxtLink
        v-if="layout === 'aside'"
        class="btn btn-secondary"
        :to="financeFormTo(asset, packageCode)"
      >
        ผ่อนแพ็กเกจนี้
      </NuxtLink>
      <NuxtLink v-else class="pkg-pay__finance" :to="financeFormTo(asset, packageCode)">
        ผ่อนแพ็กเกจนี้ →
      </NuxtLink>
    </template>
    <p v-else-if="layout === 'aside'" class="pkg-pay__note">
      แพ็กเกจลงทุนเปิดสถานีคนละเจตนากับการผ่อนติดตั้งเป็นของตนเอง
      <NuxtLink :to="financePageTo(asset)">ดูสินเชื่อ EV Station</NuxtLink>
    </p>
    <NuxtLink v-if="layout === 'aside' && eligible" class="pkg-pay__explain" :to="financePageTo(asset)">
      สินเชื่อ / ผ่อนคืออะไร
    </NuxtLink>
  </div>
</template>

<style scoped>
.pkg-pay {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: center;
}

.pkg-pay[data-layout='aside'] {
  flex-direction: column;
  align-items: stretch;
  gap: 0.65rem;
}

.pkg-pay[data-layout='aside'] .btn {
  width: 100%;
}

.pkg-pay__finance {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-lime);
  white-space: nowrap;
  flex: 1 0 100%;
}

.pkg-pay__finance:hover {
  color: var(--color-lime-soft);
}

.pkg-pay__explain {
  display: block;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.pkg-pay__explain:hover,
.pkg-pay__note a:hover {
  color: var(--color-lime);
}

.pkg-pay__note {
  margin: 0;
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.45;
}

.pkg-pay__note a {
  display: inline;
  color: var(--color-lime);
}
</style>
