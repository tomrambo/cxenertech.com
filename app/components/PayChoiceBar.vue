<script setup lang="ts">
import { financeFormTo, financePageTo, quoteFormTo, type PayAsset } from '~/utils/pay-paths'

const props = defineProps<{
  asset: PayAsset
  /** finance = already on the finance landing; catalog = package listing */
  context?: 'catalog' | 'finance'
}>()

const context = computed(() => props.context || 'catalog')
</script>

<template>
  <div class="pay-choice" :data-context="context">
    <p class="pay-choice__kicker">{{ context === 'finance' ? 'เลือกสิ่งที่ต้องการ' : 'จ่ายอย่างไร' }}</p>
    <p class="pay-choice__lead">
      {{
        context === 'finance'
          ? 'กดการ์ดด้านล่าง — ขอใบเสนอราคาถ้าจ่ายก้อน หรือสมัครสินเชื่อถ้าต้องการผ่อน'
          : 'เลือกทางจ่ายก่อน เพื่อเข้าฟอร์มที่ตรงกับสิ่งที่ต้องการ'
      }}
    </p>
    <div class="pay-choice__grid">
      <NuxtLink class="pay-choice__card" :to="quoteFormTo(asset)">
        <span class="pay-choice__tag">ซื้อขาด / จ่ายก้อน / ผ่อนบัตร</span>
        <strong>ขอใบเสนอราคา</strong>
        <span>สำรวจไซต์แล้วออกใบราคาติดตั้ง — จ่ายเงินสด หรือผ่อนบัตรเครดิตได้</span>
        <em class="pay-choice__go">เลือกทางนี้ →</em>
      </NuxtLink>
      <NuxtLink
        v-if="context === 'catalog'"
        class="pay-choice__card pay-choice__card--accent"
        :to="financePageTo(asset)"
      >
        <span class="pay-choice__tag">สินเชื่อ / ผ่อน</span>
        <strong>{{ asset === 'solar' ? 'ผ่อนโซล่าเซลล์' : 'ผ่อน EV Station' }}</strong>
        <span>เป็นเจ้าของระบบ จ่ายเป็นงวดผ่านธนาคาร — CX ENERTECH จัดเอกสารผู้ขาย</span>
        <em class="pay-choice__go">ดูสินเชื่อ →</em>
      </NuxtLink>
      <NuxtLink
        v-else
        class="pay-choice__card pay-choice__card--accent"
        :to="financeFormTo(asset)"
      >
        <span class="pay-choice__tag">ผ่อน / สินเชื่อ</span>
        <strong>สมัครสินเชื่อ</strong>
        <span>ผ่อนเช่าซื้อ ลีส หรือผ่อนบัตร — ทีมจัดเอกสารให้สถาบันการเงินพิจารณา</span>
        <em class="pay-choice__go">สมัครสินเชื่อ →</em>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.pay-choice {
  margin: 0 0 2rem;
}

.pay-choice__kicker {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin: 0 0 0.4rem;
}

.pay-choice__lead {
  margin: 0 0 0.85rem;
  color: var(--color-muted);
  font-size: 0.92rem;
  max-width: 40rem;
}

.pay-choice__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}

.pay-choice__card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.35rem 1.3rem 1.2rem;
  min-height: 11.5rem;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: inherit;
  transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.pay-choice__card:hover {
  border-color: rgba(212, 255, 0, 0.55);
  background: #191919;
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.pay-choice__card--accent {
  border-color: rgba(212, 255, 0, 0.42);
  background: linear-gradient(160deg, rgba(212, 255, 0, 0.12), #151515 55%);
  box-shadow: 0 0 24px rgba(212, 255, 0, 0.12);
}

.pay-choice__card--accent:hover {
  box-shadow: 0 0 32px rgba(212, 255, 0, 0.22);
}

.pay-choice__tag {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.pay-choice__card strong {
  font-family: var(--font-display);
  font-size: 1.22rem;
  color: var(--color-white);
}

.pay-choice__card > span:last-of-type {
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.5;
  flex: 1;
}

.pay-choice__go {
  margin-top: 0.45rem;
  font-style: normal;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--color-lime);
}

@media (max-width: 640px) {
  .pay-choice__grid {
    grid-template-columns: 1fr;
  }

  .pay-choice__card {
    min-height: 0;
  }
}
</style>
