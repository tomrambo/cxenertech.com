<template>
  <div v-if="pkg">
    <PageHero
      :title="pkg.name_th"
      :description="pkg.tagline"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'Packages', to: '/ev-charging/packages' },
        { label: pkg.code },
      ]"
    />

    <section class="section">
      <div class="container detail">
        <div class="detail__main">
          <div class="badge-row">
            <span class="badge">{{ typeLabelText }}</span>
            <span class="code">{{ pkg.code }}</span>
          </div>

          <div v-if="pkg.image" class="hero-visual">
            <img :src="pkg.image" :alt="pkg.name_th" loading="lazy" width="1200" height="675" />
          </div>

          <h1 class="name-en">{{ pkg.name }}</h1>
          <p class="lead">{{ pkg.description }}</p>
          <p class="source">Source / แหล่งข้อมูล: {{ pkg.source_label }}</p>

          <h2 class="block-title">Key specs / สเปกหลัก</h2>
          <dl class="spec-grid">
            <div>
              <dt>Power / กำลัง</dt>
              <dd>{{ formatPowerRange(pkg.power_kw_min, pkg.power_kw_max) }}</dd>
            </div>
            <div>
              <dt>Bays / จุดชาร์จ</dt>
              <dd>{{ formatNozzles(pkg.nozzle_count_min, pkg.nozzle_count_max) }}</dd>
            </div>
            <div v-if="pkg.charger_count">
              <dt>Cabinets / จำนวนตู้</dt>
              <dd>{{ pkg.charger_count }}</dd>
            </div>
            <div v-if="pkg.parking_bays">
              <dt>Parking / จุดจอด</dt>
              <dd>{{ pkg.parking_bays }}</dd>
            </div>
            <div v-if="pkg.transformer_kva">
              <dt>Transformer</dt>
              <dd>{{ pkg.transformer_kva.toLocaleString() }} kVA</dd>
            </div>
            <div v-if="pkg.footprint_w_m && pkg.footprint_d_m">
              <dt>Footprint / พื้นที่</dt>
              <dd>{{ pkg.footprint_w_m }} × {{ pkg.footprint_d_m }} m</dd>
            </div>
          </dl>

          <h2 class="block-title">Details / รายละเอียดเพิ่มเติม</h2>
          <ul class="kv">
            <li v-for="(val, key) in pkg.specs" :key="key">
              <span>{{ key }}</span>
              <strong>{{ val }}</strong>
            </li>
          </ul>

          <h2 class="block-title">Included / สิ่งที่รวมในแพ็กเกจ</h2>
          <ul class="checklist">
            <li v-for="item in pkg.includes" :key="item">{{ item }}</li>
          </ul>

          <h2 class="block-title">Highlights / จุดเด่น</h2>
          <ul class="checklist">
            <li v-for="item in pkg.features" :key="item">{{ item }}</li>
          </ul>

          <template v-if="chargerSpec">
            <h2 class="block-title">Technical specs / สเปกเทคนิค ({{ chargerSpec.model }})</h2>
            <p class="block-lead">{{ chargerSpec.nameEn }} · {{ chargerSpec.nameTh }}</p>
            <p class="lead compact">{{ chargerSpec.overview }}</p>

            <h3 class="sub-title">Input / อินพุต</h3>
            <ul class="kv">
              <li v-for="(val, key) in chargerSpec.input" :key="`in-${key}`">
                <span>{{ key }}</span>
                <strong>{{ val }}</strong>
              </li>
            </ul>

            <h3 class="sub-title">Output / เอาต์พุต</h3>
            <ul class="kv">
              <li v-for="(val, key) in chargerSpec.output" :key="`out-${key}`">
                <span>{{ key }}</span>
                <strong>{{ val }}</strong>
              </li>
            </ul>

            <h3 class="sub-title">Environment &amp; structure</h3>
            <ul class="kv">
              <li v-for="(val, key) in { ...chargerSpec.environment, ...chargerSpec.structure }" :key="`env-${key}`">
                <span>{{ key }}</span>
                <strong>{{ val }}</strong>
              </li>
            </ul>

            <h3 class="sub-title">Protection / การป้องกัน</h3>
            <ul class="checklist">
              <li v-for="item in chargerSpec.protection" :key="item">{{ item }}</li>
            </ul>
          </template>

          <template v-if="pkg.financials">
            <h2 class="block-title">Financial model / โมเดลการเงินอ้างอิง</h2>
            <ul class="kv">
              <li v-for="(val, key) in pkg.financials" :key="key">
                <span>{{ key }}</span>
                <strong>{{ formatFinanceValue(key, val) }}</strong>
              </li>
            </ul>
          </template>
        </div>

        <aside class="detail__aside">
          <div class="aside-box">
            <h4>{{ price.label }}</h4>
            <p class="aside-price">{{ formatThb(price.value) }}</p>
            <p v-if="price.compareAt" class="aside-compare">
              {{ price.compareLabel }} {{ formatThb(price.compareAt) }}
            </p>
            <p class="aside-note">{{ pkg.price_note }}</p>

            <dl v-if="pkg.roi_annual_pct || pkg.payback_months" class="aside-stats">
              <div v-if="pkg.roi_annual_pct">
                <dt>ROI / ปี</dt>
                <dd>{{ pkg.roi_annual_pct }}%</dd>
              </div>
              <div v-if="pkg.payback_months">
                <dt>Payback</dt>
                <dd>{{ pkg.payback_months }} เดือน</dd>
              </div>
              <div v-if="pkg.net_profit_monthly">
                <dt>Net profit ref.</dt>
                <dd>{{ formatThb(pkg.net_profit_monthly) }}/mo</dd>
              </div>
            </dl>

            <NuxtLink
              class="btn btn-primary"
              :to="`/contact/quotation?type=ev&package=${pkg.code}`"
            >
              Quote / ขอใบเสนอราคา
            </NuxtLink>
            <NuxtLink to="/ev-charging/packages" class="aside-link">← All packages / แพ็กเกจทั้งหมด</NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
import {
  displayPrice,
  formatNozzles,
  formatPowerRange,
  formatThb,
  typeLabel,
} from '~/utils/ev-format'

type QtyTier = '<3' | '3-10' | '10-30' | '>30'

type ApiPackage = {
  id: string
  slug: string
  code: string
  name: string
  name_th: string
  product_type: string
  source_label: string
  tagline: string
  description: string
  image: string | null
  power_kw_min: number
  power_kw_max: number
  charger_count: number | null
  nozzle_count_min: number
  nozzle_count_max: number
  parking_bays: number | null
  transformer_kva: number | null
  footprint_w_m: number | null
  footprint_d_m: number | null
  price_list: number | null
  price_promo: number | null
  price_capex: number | null
  price_note: string
  roi_annual_pct: number | null
  payback_months: number | null
  net_profit_monthly: number | null
  specs: Record<string, string | number>
  includes: string[]
  features: string[]
  financials: Record<string, string | number> | null
  price_rate_id: string | null
  spec_id: string | null
}

type PriceRate = {
  id: string
  series: string
  nameTh: string
  nameEn: string
  costByQty: Record<QtyTier, number | null>
  sellPrice: number | null
  notes?: string
}

type ChargerSpec = {
  model: string
  nameTh: string
  nameEn: string
  overview: string
  input: Record<string, string>
  output: Record<string, string>
  environment: Record<string, string>
  structure: Record<string, string>
  protection: string[]
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, error } = await useFetch<{
  package: ApiPackage
  priceRate: PriceRate | null
  chargerSpec: ChargerSpec | null
}>(() => `/api/ev/packages/${slug.value}`)

if (error.value || !data.value?.package) {
  throw createError({ statusCode: 404, statusMessage: 'Package not found' })
}

const pkg = computed(() => data.value!.package)
const priceRate = computed(() => data.value?.priceRate ?? null)
const chargerSpec = computed(() => data.value?.chargerSpec ?? null)
const typeLabelText = computed(() => typeLabel(pkg.value.product_type))
const price = computed(() => displayPrice(pkg.value))

function formatFinanceValue(key: string, val: string | number) {
  if (typeof val !== 'number') return val
  if (/pct|Pct|percent/i.test(key)) return `${val}%`
  if (/month|Month|revenue|Revenue|cost|Cost|net|Net|annual|Annual|profit|Profit|price|Price|kwh|Kwh/i.test(key) && val >= 100) {
    return formatThb(val)
  }
  return val.toLocaleString('th-TH')
}

useSeoMeta({
  title: () => `${pkg.value.name_th} | ${pkg.value.name} | CX ENERTECH`,
  description: () => pkg.value.description,
})
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  align-items: start;
}

.badge-row {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}

.badge {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #111;
  background: var(--color-lime);
  padding: 0.35rem 0.7rem;
}

.code {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-gold);
}

.name-en {
  font-size: 1.35rem;
  color: var(--color-white);
  margin: 0 0 0.75rem;
}

.lead {
  color: var(--color-silver);
  max-width: 42rem;
  font-size: 1.05rem;
  line-height: 1.7;
}

.lead.compact {
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.source {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.hero-visual {
  margin: 1.25rem 0 1.5rem;
  overflow: hidden;
  background: #0e1a2b;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.hero-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.block-title {
  font-size: 1.25rem;
  color: var(--color-white);
  margin: 2.25rem 0 0.85rem;
}

.sub-title {
  font-size: 1rem;
  color: var(--color-lime);
  margin: 1.35rem 0 0.65rem;
}

.block-lead {
  color: var(--color-muted);
  margin-bottom: 0.85rem;
  font-size: 0.92rem;
}

.block-note {
  margin-top: 0.65rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.inline-link {
  display: inline-block;
  margin-top: 0.85rem;
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--color-lime);
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.spec-grid dt {
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.25rem;
}

.spec-grid dd {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-white);
}

.kv {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.kv li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--color-muted);
  font-size: 0.92rem;
}

.kv strong {
  color: var(--color-white);
  font-weight: 600;
  text-align: right;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checklist li {
  padding-left: 1.25rem;
  position: relative;
  color: var(--color-muted);
}

.checklist li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 8px;
  height: 8px;
  background: var(--color-lime);
}

.rate-table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.rate-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 520px;
}

.rate-table th,
.rate-table td {
  padding: 0.65rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.85rem;
}

.rate-table th {
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: rgba(0, 0, 0, 0.2);
}

.rate-table .sell {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-lime);
}

.aside-box {
  background: var(--color-panel);
  border-top: 3px solid var(--color-lime);
  padding: 1.75rem;
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}

.aside-box h4 {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.4rem;
}

.aside-price {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-lime);
  margin-bottom: 0.35rem;
}

.aside-compare {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.aside-note {
  font-size: 0.85rem;
  color: var(--color-muted);
  margin: 0.85rem 0 1.25rem;
  line-height: 1.5;
}

.aside-stats {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.aside-stats dt {
  font-size: 0.7rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.aside-stats dd {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-white);
}

.aside-link {
  display: block;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.aside-link:hover {
  color: var(--color-lime);
}

@media (max-width: 860px) {
  .detail {
    grid-template-columns: 1fr;
  }

  .aside-box {
    position: static;
  }
}
</style>
