<template>
  <div>
    <PageHero
      title="CX Charge Packages"
      description="CX Station · CX DC S/J · CX AC"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'Packages' },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="intro">
          <div>
            <span class="section-label">Catalog / แคตตาล็อก</span>
            <h2 class="section-title">CX package for your site / แพ็กเกจ CX ที่เหมาะกับไซต์ของคุณ</h2>
          </div>
          <p v-if="pending" class="status">Loading… / กำลังโหลด…</p>
          <p v-else-if="error" class="status status--error">Failed to load / โหลดไม่สำเร็จ</p>
          <p v-else class="status">{{ packages.length }} packages / แพ็กเกจ</p>
        </div>

        <div class="filters">
          <NuxtLink
            v-for="f in filters"
            :key="f.value"
            :to="typeLink(f.value)"
            class="filter"
            :class="{ 'filter--active': type === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
        </div>

        <div v-if="type === 'investment'" class="filters filters--sub">
          <span class="filters__label">Current / ชนิดไฟ</span>
          <NuxtLink
            v-for="f in chargeFilters"
            :key="f.value"
            :to="chargeLink(f.value)"
            class="filter filter--sub"
            :class="{ 'filter--active': charge === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
        </div>

        <div v-if="paybackPackages.length" class="payback-table-section">
          <div class="payback-table-head">
            <span class="section-label">Payback / จุดคืนทุน</span>
            <h3>Payback — ลงทุน & สถานีสำเร็จรูป (เดือน · ปี)</h3>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>แพ็กเกจ</th>
                  <th>ประเภท</th>
                  <th>CAPEX</th>
                  <th>ROI / ปี</th>
                  <th>Payback (เดือน)</th>
                  <th>Payback (ปี)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pkg in paybackPackages" :key="`pb-${pkg.id}`">
                  <td>
                    <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`" class="table-link">
                      {{ pkg.name_th }}
                    </NuxtLink>
                    <span class="table-code">{{ pkg.code }}</span>
                  </td>
                  <td>{{ typeLabel(pkg.product_type) }}</td>
                  <td>{{ formatThb(pkg.price_capex) }}</td>
                  <td>{{ pkg.roi_annual_pct != null ? `${pkg.roi_annual_pct}%` : '—' }}</td>
                  <td class="payback-cell">{{ pkg.payback_months }} เดือน</td>
                  <td class="payback-cell">
                    {{ resolvePaybackYears(pkg.payback_months, pkg.payback_years) }} ปี
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="packages.length" class="grid">
          <article v-for="pkg in packages" :key="pkg.id" class="card">
            <div v-if="pkg.image" class="card__visual">
              <img :src="pkg.image" :alt="pkg.name_th" loading="lazy" width="640" height="360" />
            </div>
            <div class="card__body">
            <div class="card__top">
              <span class="card__type">{{ typeLabel(pkg.product_type) }}</span>
              <span v-if="pkg.charge_type" class="card__charge">{{ pkg.charge_type }}</span>
              <span class="card__code">{{ pkg.code }}</span>
            </div>
            <h3 class="card__title">{{ pkg.name_th }}</h3>
            <p class="card__name">{{ pkg.name }}</p>
            <p class="card__tagline">{{ pkg.tagline }}</p>

            <dl class="meta">
              <div>
                <dt>Power / กำลัง</dt>
                <dd>{{ formatPowerRange(pkg.power_kw_min, pkg.power_kw_max) }}</dd>
              </div>
              <div>
                <dt>Bays / จุดชาร์จ</dt>
                <dd>{{ formatNozzles(pkg.nozzle_count_min, pkg.nozzle_count_max) }}</dd>
              </div>
              <div v-if="pkg.transformer_kva">
                <dt>Transformer</dt>
                <dd>{{ pkg.transformer_kva.toLocaleString() }} kVA</dd>
              </div>
              <div v-if="pkg.roi_annual_pct">
                <dt>ROI</dt>
                <dd>{{ pkg.roi_annual_pct }}%/yr</dd>
              </div>
              <div
                v-if="
                  (pkg.product_type === 'investment' || pkg.product_type === 'turnkey') &&
                  pkg.payback_months != null
                "
              >
                <dt>Payback</dt>
                <dd>
                  {{ pkg.payback_months }} เดือน ·
                  {{ resolvePaybackYears(pkg.payback_months, pkg.payback_years) }} ปี
                </dd>
              </div>
            </dl>

            <div class="card__price">
              <span class="card__price-label">{{ priceInfo(pkg).label }}</span>
              <div class="card__price-row">
                <strong v-if="!priceInfo(pkg).pending">{{ formatThb(priceInfo(pkg).value) }}</strong>
                <strong v-else class="card__price-pending">ขอใบเสนอราคา / Request quote</strong>
                <span v-if="priceInfo(pkg).compareAt" class="card__cost">
                  {{ priceInfo(pkg).compareLabel }} {{ formatThb(priceInfo(pkg).compareAt) }}
                </span>
              </div>
            </div>

            <div class="card__actions">
              <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`" class="btn btn-primary">
                Details / รายละเอียด
              </NuxtLink>
              <NuxtLink
                class="btn btn-secondary"
                :to="`/contact/quotation?type=ev&package=${pkg.code}`"
              >
                Quote / ขอใบเสนอราคา
              </NuxtLink>
            </div>
            </div>
          </article>
        </div>

        <p v-if="!pending && !error && !packages.length" class="empty">No packages in this category / ยังไม่มีแพ็กเกจในหมวดนี้</p>

        <p class="disclaimer">
          Prices / ROI / payback are reference figures only — not a formal CX ENERTECH quotation and not a return guarantee.
          ราคา / ROI / จุดคุ้มทุนเป็นตัวเลขอ้างอิง ไม่ใช่ใบเสนอราคาจริง และไม่รับประกันผลตอบแทน
        </p>
      </div>
    </section>

    <CtaBand
      title="ต้องการแพ็กเกจที่ปรับตามพื้นที่จริง?"
      description="ทีม CX ENERTECH ออกแบบ BOQ และใบเสนอราคาตามไซต์ของคุณ"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="ดูโอกาสลงทุน"
      secondary-to="/ev-charging/investment"
    />
  </div>
</template>

<script setup lang="ts">
import {
  displayPrice,
  formatNozzles,
  formatPowerRange,
  formatThb,
  resolvePaybackYears,
  typeLabel,
} from '~/utils/ev-format'

type ApiPackage = {
  id: string
  slug: string
  code: string
  name: string
  name_th: string
  product_type: string
  charge_type?: 'AC' | 'DC' | null
  tagline: string
  image: string | null
  power_kw_min: number
  power_kw_max: number
  nozzle_count_min: number
  nozzle_count_max: number
  transformer_kva: number | null
  price_list: number | null
  price_promo: number | null
  price_capex: number | null
  roi_annual_pct: number | null
  payback_months: number | null
  payback_years?: number | null
}

const route = useRoute()
const type = computed(() => (route.query.type as string) || 'all')
const charge = computed(() => {
  const c = route.query.charge as string
  return c === 'AC' || c === 'DC' ? c : 'all'
})

const filters = [
  { label: 'ทั้งหมด / All', value: 'all' },
  { label: 'ลงทุน / Investment', value: 'investment' },
  { label: 'สถานีสำเร็จรูป / Turnkey', value: 'turnkey' },
  { label: 'เครื่องชาร์จ / Equipment', value: 'equipment' },
]

const chargeFilters = [
  { label: 'ทั้งหมด / All', value: 'all' },
  { label: 'AC', value: 'AC' },
  { label: 'DC', value: 'DC' },
]

function typeLink(value: string) {
  if (value === 'all') return '/ev-charging/packages'
  if (value === 'investment' && charge.value !== 'all') {
    return `/ev-charging/packages?type=investment&charge=${charge.value}`
  }
  return `/ev-charging/packages?type=${value}`
}

function chargeLink(value: string) {
  if (value === 'all') return '/ev-charging/packages?type=investment'
  return `/ev-charging/packages?type=investment&charge=${value}`
}

const { data, pending, error } = await useFetch<{ packages: ApiPackage[] }>(
  '/api/ev/packages',
  {
    query: computed(() => {
      const q: Record<string, string> = {}
      if (type.value !== 'all') q.type = type.value
      if (type.value === 'investment' && charge.value !== 'all') q.charge = charge.value
      return q
    }),
    watch: [type, charge],
  },
)

const packages = computed(() => data.value?.packages ?? [])

const paybackPackages = computed(() =>
  packages.value.filter(
    (p) =>
      (p.product_type === 'investment' || p.product_type === 'turnkey') &&
      p.payback_months != null,
  ),
)

function priceInfo(pkg: ApiPackage) {
  return displayPrice(pkg)
}

useSeoMeta({
  title: 'CX Charge Packages | CX ENERTECH',
  description: 'แพ็กเกจ CX Station, CX DC S/J และ CX AC — สเปกและราคาแนะนำขาย',
})
</script>

<style scoped>
.intro {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem 2rem;
  margin-bottom: 2rem;
  align-items: flex-end;
}

.intro .section-title {
  margin-bottom: 0.75rem;
}

.status {
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  color: var(--color-muted);
}

.status--error {
  color: #ff8f8f;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.25rem;
}

.filters--sub {
  margin-top: -1.5rem;
  margin-bottom: 2rem;
  align-items: center;
}

.filters__label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-right: 0.35rem;
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
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.filter--sub {
  padding: 0.4rem 0.95rem;
  font-size: 0.75rem;
}

.filter--active,
.filter:hover {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
}

.filter--link {
  margin-left: auto;
  border-color: rgba(212, 255, 0, 0.35);
  color: var(--color-lime);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transition: border-color 0.3s, transform 0.35s var(--ease);
}

.card:hover {
  border-color: rgba(212, 255, 0, 0.35);
  transform: translateY(-3px);
}

.card__visual {
  height: 168px;
  overflow: hidden;
  background: #0e1a2b;
}

.card__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s var(--ease);
}

.card:hover .card__visual img {
  transform: scale(1.04);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.35rem 1.5rem 1.5rem;
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
}

.card__type {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-lime);
}

.card__charge {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.15rem 0.45rem;
  border: 1px solid rgba(212, 255, 0, 0.35);
  color: var(--color-gold);
}

.card__code {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gold);
  margin-left: auto;
}

.card__title {
  font-size: 1.2rem;
  color: var(--color-white);
  line-height: 1.3;
}

.card__name {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.card__tagline {
  font-size: 0.92rem;
  color: var(--color-silver);
  line-height: 1.5;
}

.meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem 1rem;
  margin: 0.5rem 0 0.25rem;
  padding: 0.85rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.meta dt {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.2rem;
}

.meta dd {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
}

.card__payback {
  margin: 0.15rem 0 0.35rem;
  padding: 0.85rem 1rem;
  background: rgba(212, 255, 0, 0.06);
  border: 1px solid rgba(212, 255, 0, 0.22);
}

.card__payback-label {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 0.55rem;
}

.card__payback-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.card__payback-unit {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  margin-bottom: 0.15rem;
}

.card__payback-row strong {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-white);
}

.card__price-label {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.25rem;
}

.card__price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.65rem;
}

.card__price-row strong {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-lime);
}

.card__price-pending {
  font-size: 1rem !important;
  color: var(--color-gold) !important;
}

.card__cost {
  font-size: 0.78rem;
  color: var(--color-muted);
}

.card__compare {
  font-size: 0.85rem;
  color: var(--color-muted);
  text-decoration: line-through;
}

.card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.card__actions .btn {
  padding: 0.7rem 1.15rem;
  font-size: 0.8rem;
}

.empty {
  color: var(--color-muted);
  padding: 2rem 0;
}

.disclaimer {
  margin-top: 2.5rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  max-width: 46rem;
  line-height: 1.6;
}

.payback-table-section {
  margin: 0 0 2.5rem;
}

.payback-table-head {
  margin-bottom: 1rem;
}

.payback-table-head h3 {
  font-size: 1.25rem;
  color: var(--color-white);
  margin-top: 0.35rem;
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: var(--color-panel);
}

.table-wrap table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

.table-wrap th,
.table-wrap td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  vertical-align: top;
}

.table-wrap th {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: rgba(0, 0, 0, 0.25);
  white-space: nowrap;
}

.table-link {
  display: block;
  color: var(--color-white);
  font-weight: 600;
  text-decoration: none;
}

.table-link:hover {
  color: var(--color-lime);
}

.table-code {
  display: block;
  margin-top: 0.2rem;
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--color-gold);
}

.payback-cell {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-lime);
  white-space: nowrap;
}
</style>
