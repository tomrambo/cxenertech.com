<script setup lang="ts">
import { financePageTo, packagesPageTo, quoteFormTo, type PayAsset } from '~/utils/pay-paths'

const props = defineProps<{
  asset: PayAsset
  /** finance = already on the finance landing; catalog = package listing */
  context?: 'catalog' | 'finance'
}>()

const context = computed(() => props.context || 'catalog')
</script>

<template>
  <div class="pay-choice" :data-context="context">
    <p class="pay-choice__kicker">จ่ายอย่างไร</p>
    <div class="pay-choice__grid">
      <NuxtLink class="pay-choice__card" :to="quoteFormTo(asset)">
        <span class="pay-choice__tag">ซื้อขาด</span>
        <strong>ขอใบเสนอราคา</strong>
        <span>จ่ายก้อน เป็นเจ้าของระบบทันที</span>
      </NuxtLink>
      <NuxtLink
        v-if="context === 'catalog'"
        class="pay-choice__card pay-choice__card--accent"
        :to="financePageTo(asset)"
      >
        <span class="pay-choice__tag">สินเชื่อ / ผ่อน</span>
        <strong>{{ asset === 'solar' ? 'ผ่อนโซล่าเซลล์' : 'ผ่อน EV Station' }}</strong>
        <span>เป็นเจ้าของระบบ จ่ายเป็นงวดผ่านธนาคาร — CX ENERTECH จัดเอกสารผู้ขาย</span>
      </NuxtLink>
      <NuxtLink
        v-else
        class="pay-choice__card pay-choice__card--accent"
        :to="packagesPageTo(asset)"
      >
        <span class="pay-choice__tag">เลือกแพ็กเกจก่อน</span>
        <strong>{{ asset === 'solar' ? 'แพ็กเกจโซล่าเซลล์' : 'แพ็กเกจ EV Station' }}</strong>
        <span>ดูราคาอ้างอิงแล้วค่อยยื่นผ่อนแพ็กเกจนั้น</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.pay-choice {
  margin: 0 0 1.75rem;
}

.pay-choice__kicker {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin: 0 0 0.65rem;
}

.pay-choice__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.pay-choice__card {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1.05rem 1.15rem;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: inherit;
  transition: border-color 0.2s, background 0.2s;
}

.pay-choice__card:hover {
  border-color: rgba(212, 255, 0, 0.45);
  background: #191919;
}

.pay-choice__card--accent {
  border-color: rgba(212, 255, 0, 0.28);
  background: linear-gradient(160deg, rgba(212, 255, 0, 0.08), #151515 55%);
}

.pay-choice__tag {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.pay-choice__card strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--color-white);
}

.pay-choice__card span:last-child {
  color: var(--color-muted);
  font-size: 0.86rem;
  line-height: 1.45;
}

@media (max-width: 640px) {
  .pay-choice__grid {
    grid-template-columns: 1fr;
  }
}
</style>
