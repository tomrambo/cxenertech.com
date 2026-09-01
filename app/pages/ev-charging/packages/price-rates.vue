<template>
  <div>
    <PageHero
      title="ราคาเครื่องชาร์จ EV — เรท DC / AC"
      description="ราคา DC Fast Charger และเครื่องชาร์จรถไฟฟ้า ตามจำนวนเครื่อง สำหรับประกอบงบลงทุน EV Station"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'ราคา EV Station', to: '/ev-charging/cost' },
        { label: 'เรทเครื่องชาร์จ' },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="intro">
          <div>
            <span class="section-label">Pricing / ตารางราคา</span>
            <h2 class="section-title">Official charger rate sheet / เรทราคาเครื่องชาร์จ</h2>
            <p class="section-lead">
              Updated 3 Dec 2025 (3/12/2568). Cost tiers: &lt;3 · 3–10 · 10–30 · &gt;30 units.
            </p>
          </div>
          <NuxtLink to="/ev-charging/packages" class="back">← Packages / แพ็กเกจ</NuxtLink>
        </div>

        <div class="filters">
          <button
            v-for="f in filters"
            :key="f.value"
            type="button"
            class="filter"
            :class="{ 'filter--active': typeFilter === f.value }"
            @click="typeFilter = f.value"
          >
            {{ f.label }}
          </button>
        </div>

        <p v-if="pending" class="status">Loading…</p>
        <p v-else-if="error" class="status status--error">Failed to load rates</p>

        <div v-else class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Series</th>
                <th>Name TH / EN</th>
                <th>kW</th>
                <th>Cost &lt;3</th>
                <th>3–10</th>
                <th>10–30</th>
                <th>&gt;30</th>
                <th>Sell / ขาย</th>
                <th>Package</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in filteredRates" :key="r.id">
                <td class="mono">{{ r.skuCode }}</td>
                <td>{{ r.series }}</td>
                <td>
                  <strong>{{ r.nameTh }}</strong>
                  <span class="en">{{ r.nameEn }}</span>
                </td>
                <td>{{ r.powerKw }}</td>
                <td>{{ formatThb(r.costByQty['<3']) }}</td>
                <td>{{ formatThb(r.costByQty['3-10']) }}</td>
                <td>{{ formatThb(r.costByQty['10-30']) }}</td>
                <td>{{ formatThb(r.costByQty['>30']) }}</td>
                <td class="sell">{{ formatThb(r.sellPrice) }}</td>
                <td>
                  <NuxtLink
                    v-if="packageSlug(r.skuCode)"
                    :to="`/ev-charging/packages/${packageSlug(r.skuCode)}`"
                    class="pkg-link"
                  >
                    ดูแพ็กเกจ
                  </NuxtLink>
                  <span v-else class="muted">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="disclaimer">
          Internal reference rates from CX price sheets. Not a formal quotation.
          ราคาอ้างอิงภายในจากตารางราคา CX — ไม่ใช่ใบเสนอราคาจริง
        </p>
      </div>
    </section>

    <CtaBand
      title="Need a formal quote?"
      description="ทีม CX ENERTECH จัดทำใบเสนอราคาตามจำนวนและไซต์ของคุณ"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
    />
  </div>
</template>

<script setup lang="ts">
import { formatThb } from '~/utils/ev-format'

type QtyTier = '<3' | '3-10' | '10-30' | '>30'

type PriceRate = {
  id: string
  skuCode: string
  series: string
  nameTh: string
  nameEn: string
  powerKw: number
  currentType: 'AC' | 'DC'
  costByQty: Record<QtyTier, number | null>
  sellPrice: number | null
}

const typeFilter = ref<'all' | 'DC' | 'AC'>('all')

const filters = [
  { label: 'ทั้งหมด / All', value: 'all' as const },
  { label: 'DC', value: 'DC' as const },
  { label: 'AC', value: 'AC' as const },
]

const { data, pending, error } = await useFetch<{ rates: PriceRate[] }>(
  '/api/ev/price-rates',
)

const filteredRates = computed(() => {
  const rates = data.value?.rates ?? []
  if (typeFilter.value === 'all') return rates
  return rates.filter((r) => r.currentType === typeFilter.value)
})

/** Map price-rate SKU → package slug */
const SKU_TO_SLUG: Record<string, string> = {
  'CX-DC60-S': 'cx-dc-60',
  'CX-DC120-S': 'cx-dc-120',
  'CX-DC60-J': 'cx-dc-60-j',
  'CX-DC120-J': 'cx-dc-120-j',
  'CX-DC180-J': 'cx-dc-180',
  'CX-DC240-J': 'cx-dc-240-j',
  'CX-AC7-G': 'cx-ac-7-g',
  'CX-AC7-K': 'cx-ac-7-k',
  'CX-AC7-MINIZ': 'cx-ac-7-miniz',
  'CX-AC11-E': 'cx-ac-11-e',
  'CX-AC22-E': 'cx-ac-22-e',
}

function packageSlug(sku: string) {
  return SKU_TO_SLUG[sku] ?? null
}

usePageSeo({
  title: 'ราคาเครื่องชาร์จ EV | เรท DC Fast Charger',
  description:
    'ราคาเครื่องชาร์จรถไฟฟ้า ราคา DC Charger และ EV Charger สำหรับธุรกิจ ตามจำนวนเครื่อง โดย CX ENERTECH',
  path: '/ev-charging/packages/price-rates',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ราคา EV Station', path: '/ev-charging/cost' },
    { name: 'เรทเครื่องชาร์จ', path: '/ev-charging/packages/price-rates' },
  ],
})
</script>

<style scoped>
.intro {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.75rem;
  align-items: flex-end;
}

.back {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--color-lime);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.filter {
  padding: 0.55rem 1.15rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-white);
  border: 1.5px solid var(--color-mist);
  background: var(--color-panel);
  cursor: pointer;
}

.filter--active,
.filter:hover {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
}

.status {
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.status--error {
  color: #ff8f8f;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: var(--color-panel);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 860px;
}

th,
td {
  padding: 0.75rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
  vertical-align: top;
}

th {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: rgba(0, 0, 0, 0.25);
  white-space: nowrap;
}

.mono {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-gold);
  white-space: nowrap;
}

td strong {
  display: block;
  color: var(--color-white);
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.en {
  display: block;
  font-size: 0.78rem;
  color: var(--color-muted);
}

.sell {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-lime);
  white-space: nowrap;
}

.pkg-link {
  font-family: var(--font-display);
  font-size: 0.78rem;
  color: var(--color-lime);
  white-space: nowrap;
}

.muted {
  color: var(--color-muted);
}

.disclaimer {
  margin-top: 1.75rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  max-width: 44rem;
  line-height: 1.6;
}
</style>
