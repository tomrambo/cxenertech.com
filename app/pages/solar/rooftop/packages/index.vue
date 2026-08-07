<template>
  <div>
    <PageHero
      title="Solar Packages"
      description="แพ็กเกจโซลาร์รูฟท็อปตามตารางราคา SOLAR — 3 / 5 / 10 / 15 / 20 kW · String & Micro Inverter"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'Solar', to: '/solar' },
        { label: 'Rooftop', to: '/solar/rooftop' },
        { label: 'Packages' },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="intro">
          <div>
            <span class="section-label">SOLAR · ปรับราคาใหม่</span>
            <h2 class="section-title">เลือกขนาดระบบที่เหมาะกับหลังคาของคุณ</h2>
            <p class="section-lead">
              มีผลตั้งแต่ 24 มี.ค. 2569 ตามเงื่อนไขที่ กฟภ. กำหนด · ราคาเป็นราคาเริ่มต้นอ้างอิง
            </p>
          </div>
          <p v-if="pending" class="status">กำลังโหลด…</p>
          <p v-else-if="error" class="status status--error">โหลดไม่สำเร็จ</p>
          <p v-else class="status">{{ packages.length }} แพ็กเกจ</p>
        </div>

        <div class="filters">
          <NuxtLink
            v-for="f in powerFilters"
            :key="f.value"
            :to="powerLink(f.value)"
            class="filter"
            :class="{ 'filter--active': power === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
        </div>

        <div class="filters filters--sub">
          <span class="filters__label">Phase</span>
          <NuxtLink
            v-for="f in phaseFilters"
            :key="f.value"
            :to="phaseLink(f.value)"
            class="filter filter--sub"
            :class="{ 'filter--active': phase === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
          <span class="filters__label">Inverter</span>
          <NuxtLink
            v-for="f in inverterFilters"
            :key="f.value"
            :to="inverterLink(f.value)"
            class="filter filter--sub"
            :class="{ 'filter--active': inverter === f.value }"
          >
            {{ f.label }}
          </NuxtLink>
        </div>

        <div v-if="packages.length" class="grid">
          <article v-for="pkg in packages" :key="pkg.id" class="card">
            <div class="card__body">
              <div class="card__top">
                <span class="card__code">{{ pkg.code }}</span>
                <span class="card__phase">{{ phaseLabel(pkg.phase) }}</span>
              </div>
              <h3 class="card__title">{{ pkg.name_th }}</h3>
              <p class="card__name">{{ pkg.name }}</p>
              <p class="card__tagline">{{ pkg.tagline }}</p>

              <dl class="meta">
                <div>
                  <dt>กำลัง</dt>
                  <dd>{{ pkg.power_kw }} kW</dd>
                </div>
                <div>
                  <dt>พื้นที่</dt>
                  <dd>{{ pkg.area_m2 }} ตร.ม.</dd>
                </div>
                <div>
                  <dt>ผลิตได้</dt>
                  <dd>{{ pkg.yield_kwh_year.toLocaleString('th-TH') }} หน่วย/ปี</dd>
                </div>
                <div>
                  <dt>ลดค่าไฟเฉลี่ย</dt>
                  <dd>{{ formatThb(pkg.savings_monthly_thb) }}/เดือน</dd>
                </div>
              </dl>

              <div class="price-block">
                <div v-if="pkg.string_inverter.available" class="price-row price-row--string">
                  <span>String Inverter</span>
                  <strong>เริ่ม {{ formatThb(pkg.string_inverter.priceFrom) }}</strong>
                </div>
                <div v-else class="price-row price-row--muted">
                  <span>String Inverter</span>
                  <strong>ไม่มีตัวเลือก</strong>
                </div>
                <div v-if="pkg.micro_inverter.available" class="price-row price-row--micro">
                  <span>Micro / Optimizer</span>
                  <strong>เริ่ม {{ formatThb(pkg.micro_inverter.priceFrom) }}</strong>
                </div>
              </div>

              <div class="card__actions">
                <NuxtLink :to="`/solar/rooftop/packages/${pkg.slug}`" class="btn btn-primary">
                  รายละเอียด
                </NuxtLink>
                <NuxtLink
                  class="btn btn-secondary"
                  :to="`/contact/quotation?type=solar&package=${pkg.code}`"
                >
                  ขอใบเสนอราคา
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>

        <p v-else-if="!pending && !error" class="empty">ไม่พบแพ็กเกจตามตัวกรองนี้</p>

      </div>
    </section>

    <CtaBand
      title="ต้องการประเมินหลังคาจริง?"
      description="ทีม CX ENERTECH ออกแบบระบบและใบเสนอราคาตามพื้นที่และมิเตอร์ของคุณ"
      primary-label="ขอใบเสนอราคา Solar"
      primary-to="/solar/quotation"
      secondary-label="Solar Rooftop"
      secondary-to="/solar/rooftop"
    />
  </div>
</template>

<script setup lang="ts">
import { formatThb, phaseLabel } from '~/utils/solar-format'

type InverterOpt = {
  available: boolean
  priceFrom: number | null
  inverterBrand: string | null
  panelBrand: string | null
}

type ApiPackage = {
  id: string
  slug: string
  code: string
  name: string
  name_th: string
  tagline: string
  power_kw: number
  phase: string
  area_m2: number
  yield_kwh_year: number
  savings_monthly_thb: number
  string_inverter: InverterOpt
  micro_inverter: InverterOpt
}

const route = useRoute()
const power = computed(() => (route.query.power as string) || 'all')
const phase = computed(() => (route.query.phase as string) || 'all')
const inverter = computed(() => (route.query.inverter as string) || 'all')

const powerFilters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: '3 kW', value: '3' },
  { label: '5 kW', value: '5' },
  { label: '10 kW', value: '10' },
  { label: '15 kW', value: '15' },
  { label: '20 kW', value: '20' },
]

const phaseFilters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: '1 เฟส', value: '1P' },
  { label: '3 เฟส', value: '3P' },
]

const inverterFilters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'String', value: 'string' },
  { label: 'Micro', value: 'micro' },
]

function buildQuery(overrides: Record<string, string>) {
  const q: Record<string, string> = {}
  const next = {
    power: power.value,
    phase: phase.value,
    inverter: inverter.value,
    ...overrides,
  }
  if (next.power !== 'all') q.power = next.power
  if (next.phase !== 'all') q.phase = next.phase
  if (next.inverter !== 'all') q.inverter = next.inverter
  const qs = new URLSearchParams(q).toString()
  return qs ? `/solar/rooftop/packages?${qs}` : '/solar/rooftop/packages'
}

function powerLink(value: string) {
  return buildQuery({ power: value })
}
function phaseLink(value: string) {
  return buildQuery({ phase: value })
}
function inverterLink(value: string) {
  return buildQuery({ inverter: value })
}

const { data, pending, error } = await useFetch<{ packages: ApiPackage[] }>(
  '/api/solar/packages',
  {
    query: computed(() => {
      const q: Record<string, string> = {}
      if (power.value !== 'all') q.power = power.value
      if (phase.value !== 'all') q.phase = phase.value
      if (inverter.value !== 'all') q.inverter = inverter.value
      return q
    }),
    watch: [power, phase, inverter],
  },
)

const packages = computed(() => data.value?.packages ?? [])

useSeoMeta({
  title: 'Solar Packages | CX ENERTECH',
  description: 'แพ็กเกจโซลาร์รูฟท็อป SOLAR 3–20 kW ราคา String และ Micro Inverter',
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

.section-lead {
  color: var(--color-muted);
  max-width: 36rem;
  line-height: 1.6;
}

.status {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--color-muted);
}

.status--error {
  color: #ff8f8f;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  align-items: center;
}

.filters--sub {
  margin-bottom: 2rem;
}

.filters__label {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-left: 0.35rem;
}

.filter {
  padding: 0.5rem 1rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-white);
  border: 1.5px solid var(--color-mist);
  background: var(--color-panel);
}

.filter--sub {
  padding: 0.4rem 0.85rem;
  font-size: 0.75rem;
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
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.card__body {
  padding: 1.35rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.card__code {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-gold);
}

.card__phase {
  font-size: 0.72rem;
  color: var(--color-lime);
  font-family: var(--font-display);
}

.card__title {
  font-size: 1.15rem;
  color: var(--color-white);
}

.card__name,
.card__tagline {
  font-size: 0.88rem;
  color: var(--color-muted);
  line-height: 1.45;
}

.meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem 1rem;
  margin: 0.4rem 0;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.meta dt {
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.meta dd {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--color-white);
  font-size: 0.92rem;
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.85rem;
}

.price-row span {
  color: var(--color-muted);
}

.price-row--string strong {
  color: #c4b5fd;
}

.price-row--micro strong {
  color: var(--color-gold);
}

.price-row--muted strong {
  color: var(--color-muted);
  font-weight: 500;
}

.card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.5rem;
}

.card__actions .btn {
  padding: 0.65rem 1rem;
  font-size: 0.8rem;
}

.empty {
  color: var(--color-muted);
  padding: 1.5rem 0;
}

.table-ref {
  margin-top: 2.5rem;
}

.table-ref img {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: block;
}

.table-ref figcaption {
  margin-top: 0.75rem;
  font-size: 0.82rem;
  color: var(--color-muted);
  line-height: 1.55;
  max-width: 46rem;
}
</style>
