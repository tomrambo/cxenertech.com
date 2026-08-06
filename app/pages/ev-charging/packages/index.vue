<template>
  <div>
    <PageHero
      title="EV Station Packages"
      description="แพ็กเกจสถานีชาร์จและเครื่อง DC จากข้อมูลตลาด — เลือกดูสเปก ราคาอ้างอิง และโมเดลลงทุน"
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
            <span class="section-label">Catalog</span>
            <h2 class="section-title">เลือกแพ็กเกจที่เหมาะกับไซต์ของคุณ</h2>
            <p class="section-lead">
              ข้อมูลนำเข้าจาก infographic ตลาด (สถานีลงทุน · Hub turnkey · เครื่อง DC)
              ใช้เป็นจุดเริ่มต้นขอใบเสนอราคาจาก CX ENERTECH
            </p>
          </div>
          <p v-if="pending" class="status">กำลังโหลดแพ็กเกจ…</p>
          <p v-else-if="error" class="status status--error">โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่</p>
          <p v-else class="status">{{ packages.length }} แพ็กเกจ</p>
        </div>

        <div class="filters">
          <NuxtLink
            v-for="f in filters"
            :key="f.value"
            :to="f.value === 'all' ? '/ev-charging/packages' : `/ev-charging/packages?type=${f.value}`"
            class="filter"
            :class="{ 'filter--active': type === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
        </div>

        <div v-if="packages.length" class="grid">
          <article v-for="pkg in packages" :key="pkg.id" class="card">
            <div class="card__top">
              <span class="card__type">{{ typeLabel(pkg.product_type) }}</span>
              <span class="card__code">{{ pkg.code }}</span>
            </div>
            <h3 class="card__title">{{ pkg.name_th }}</h3>
            <p class="card__name">{{ pkg.name }}</p>
            <p class="card__tagline">{{ pkg.tagline }}</p>

            <dl class="meta">
              <div>
                <dt>กำลัง</dt>
                <dd>{{ formatPowerRange(pkg.power_kw_min, pkg.power_kw_max) }}</dd>
              </div>
              <div>
                <dt>จุดชาร์จ</dt>
                <dd>{{ formatNozzles(pkg.nozzle_count_min, pkg.nozzle_count_max) }}</dd>
              </div>
              <div v-if="pkg.transformer_kva">
                <dt>Transformer</dt>
                <dd>{{ pkg.transformer_kva.toLocaleString() }} kVA</dd>
              </div>
              <div v-if="pkg.roi_annual_pct">
                <dt>ROI อ้างอิง</dt>
                <dd>{{ pkg.roi_annual_pct }}%/ปี</dd>
              </div>
            </dl>

            <div class="card__price">
              <span class="card__price-label">{{ priceInfo(pkg).label }}</span>
              <div class="card__price-row">
                <strong>{{ formatThb(priceInfo(pkg).value) }}</strong>
                <span v-if="priceInfo(pkg).compareAt" class="card__compare">
                  {{ formatThb(priceInfo(pkg).compareAt) }}
                </span>
              </div>
            </div>

            <div class="card__actions">
              <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`" class="btn btn-primary">
                ดูรายละเอียด
              </NuxtLink>
              <NuxtLink
                class="btn btn-secondary"
                :to="`/contact/quotation?type=ev&package=${pkg.code}`"
              >
                ขอใบเสนอราคา
              </NuxtLink>
            </div>
          </article>
        </div>

        <p v-else-if="!pending && !error" class="empty">ยังไม่มีแพ็กเกจในหมวดนี้</p>

        <p class="disclaimer">
          ราคา / ROI / จุดคุ้มทุนเป็นตัวเลขอ้างอิงจากข้อมูลตลาดใน infographic
          ไม่ใช่ใบเสนอราคาจริงของ CX ENERTECH และไม่รับประกันผลตอบแทน
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
  PACKAGE_TYPE_LABELS,
  displayPrice,
  formatNozzles,
  formatPowerRange,
  formatThb,
} from '~/utils/ev-format'

type ApiPackage = {
  id: string
  slug: string
  code: string
  name: string
  name_th: string
  product_type: string
  tagline: string
  power_kw_min: number
  power_kw_max: number
  nozzle_count_min: number
  nozzle_count_max: number
  transformer_kva: number | null
  price_list: number | null
  price_promo: number | null
  price_capex: number | null
  roi_annual_pct: number | null
}

const route = useRoute()
const type = computed(() => (route.query.type as string) || 'all')

const filters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'Investment', value: 'investment' },
  { label: 'Turnkey', value: 'turnkey' },
  { label: 'Equipment', value: 'equipment' },
]

const { data, pending, error } = await useFetch<{ packages: ApiPackage[] }>(
  '/api/ev/packages',
  {
    query: computed(() => (type.value === 'all' ? {} : { type: type.value })),
    watch: [type],
  },
)

const packages = computed(() => data.value?.packages ?? [])

function typeLabel(t: string) {
  return PACKAGE_TYPE_LABELS[t] ?? t
}

function priceInfo(pkg: ApiPackage) {
  return displayPrice(pkg)
}

useSeoMeta({
  title: 'EV Station Packages | CX ENERTECH',
  description: 'แพ็กเกจสถานีชาร์จ EV และเครื่อง DC — สเปก ราคาอ้างอิง และโมเดลลงทุน',
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

.filter--active,
.filter:hover {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.5rem;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.3s, transform 0.35s var(--ease);
}

.card:hover {
  border-color: rgba(212, 255, 0, 0.35);
  transform: translateY(-3px);
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

.card__code {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-gold);
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
  align-items: baseline;
  gap: 0.65rem;
}

.card__price-row strong {
  font-family: var(--font-display);
  font-size: 1.25rem;
  color: var(--color-lime);
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
</style>
