<template>
  <div class="catalog">
    <section class="hero">
      <div
        class="hero__media"
        style="background-image: url('/images/packages/cx-station-s4.jpg')"
        aria-hidden="true"
      />
      <div class="hero__shade" aria-hidden="true" />
      <div class="container hero__inner">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <NuxtLink to="/">Home</NuxtLink>
          <span aria-hidden="true">/</span>
          <NuxtLink to="/ev-charging">EV Charging</NuxtLink>
          <span aria-hidden="true">/</span>
          <span>Packages</span>
        </nav>
        <p class="hero__brand animate-fade-up">CX ENERTECH · Charge Packages</p>
        <h1 class="hero__title animate-fade-up animate-delay-1">
          CX Charge <em>Packages</em>
        </h1>
        <p class="hero__lead animate-fade-up animate-delay-2">
          เลือกแพ็กเกจตามประเภทจากระบบหลังบ้าน — Station · Charger · Investment
        </p>
      </div>
    </section>

    <section class="section catalog__body">
      <div class="container">
        <div class="toolbar">
          <div class="toolbar__meta">
            <span class="section-label">Catalog</span>
            <p v-if="pending" class="status">กำลังโหลด…</p>
            <p v-else-if="error" class="status status--error">โหลดไม่สำเร็จ</p>
            <p v-else class="status">
              {{ packages.length }} แพ็กเกจ
              <span v-if="activeTypeMeta" class="status__type">· {{ activeTypeMeta.name }}</span>
            </p>
          </div>
          <NuxtLink to="/ev-charging/packages/payback" class="toolbar__payback">
            Payback / จุดคืนทุน →
          </NuxtLink>
        </div>

        <div class="filters" role="tablist" aria-label="ประเภทแพ็กเกจ">
          <NuxtLink
            to="/ev-charging/packages"
            class="filter"
            :class="{ 'filter--active': type === 'all' }"
            role="tab"
            :aria-selected="type === 'all'"
          >
            ทั้งหมด
            <span class="filter__count">{{ totalFromTypes }}</span>
          </NuxtLink>
          <NuxtLink
            v-for="t in typeFilters"
            :key="t.key"
            :to="typeLink(t.key)"
            class="filter"
            :class="{ 'filter--active': type === t.key }"
            role="tab"
            :aria-selected="type === t.key"
          >
            <span class="filter__code">{{ t.code }}</span>
            {{ filterLabel(t) }}
            <span class="filter__count">{{ t.package_count }}</span>
          </NuxtLink>
        </div>

        <div v-if="showChargeFilter" class="filters filters--sub">
          <span class="filters__label">ชนิดไฟ</span>
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

        <template v-if="packages.length">
          <div v-for="group in displayGroups" :key="group.key" class="group">
            <div v-if="type === 'all'" class="group__head">
              <div>
                <span class="group__code">{{ group.code }}</span>
                <h2>{{ group.name }}</h2>
                <p v-if="group.description">{{ group.description }}</p>
              </div>
              <span class="group__count">{{ group.items.length }}</span>
            </div>

            <div class="grid">
              <article v-for="pkg in group.items" :key="pkg.id" class="card">
                <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`" class="card__media">
                  <img
                    v-if="packageImage(pkg)"
                    :src="packageImage(pkg)!"
                    :alt="pkg.name_th"
                    loading="lazy"
                    width="640"
                    height="400"
                    decoding="async"
                    referrerpolicy="no-referrer"
                  />
                  <div v-else class="card__media-empty" aria-hidden="true" />
                  <span v-if="pkg.charge_type" class="card__badge">{{ pkg.charge_type }}</span>
                </NuxtLink>

                <div class="card__body">
                  <div class="card__top">
                    <span class="card__type">{{ resolveTypeName(pkg.product_type) }}</span>
                    <span class="card__code">{{ pkg.code }}</span>
                  </div>
                  <h3 class="card__title">
                    <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`">{{ pkg.name_th }}</NuxtLink>
                  </h3>
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
                      <dt>ROI</dt>
                      <dd>{{ pkg.roi_annual_pct }}%/yr</dd>
                    </div>
                    <div
                      v-if="pkg.payback_months != null"
                      class="meta__payback"
                    >
                      <dt>จุดคืนทุน</dt>
                      <dd>
                        {{ pkg.payback_months }} ด.
                        <span>· {{ resolvePaybackYears(pkg.payback_months, pkg.payback_years) }} ปี</span>
                      </dd>
                    </div>
                  </dl>

                  <div class="card__price">
                    <span class="card__price-label">{{ priceInfo(pkg).label }}</span>
                    <strong v-if="!priceInfo(pkg).pending">{{ formatThb(priceInfo(pkg).value) }}</strong>
                    <strong v-else class="card__price-pending">ขอใบเสนอราคา</strong>
                  </div>

                  <div class="card__actions">
                    <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`" class="btn btn-primary">
                      รายละเอียด
                    </NuxtLink>
                    <NuxtLink
                      class="btn btn-secondary"
                      :to="`/contact/quotation?type=ev&package=${pkg.code}`"
                    >
                      ขอใบเสนอราคา
                    </NuxtLink>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </template>

        <p v-else-if="!pending && !error" class="empty">ยังไม่มีแพ็กเกจในหมวดนี้</p>

        <p class="disclaimer">
          ราคา / ROI / จุดคุ้มทุนเป็นตัวเลขอ้างอิงจากระบบหลังบ้าน ไม่ใช่ใบเสนอราคาจริง และไม่รับประกันผลตอบแทน
        </p>
      </div>
    </section>

    <CtaBand
      title="ต้องการแพ็กเกจที่ปรับตามพื้นที่จริง?"
      description="ทีม CX ENERTECH ออกแบบ BOQ และใบเสนอราคาตามไซต์ของคุณ"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="Payback / จุดคืนทุน"
      secondary-to="/ev-charging/packages/payback"
    />
  </div>
</template>

<script setup lang="ts">
import {
  displayPrice,
  formatNozzles,
  formatPowerRange,
  formatThb,
  PACKAGE_TYPE_LABELS,
  resolvePaybackYears,
  typeLabel,
} from '~/utils/ev-format'
import { resolvePackageImage } from '~/utils/package-image'

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

type PackageType = {
  key: string
  code: string
  group_label: string
  name: string
  description: string
  uses_boq: boolean
  sort_order: number
  package_count: number
}

const route = useRoute()
const type = computed(() => (route.query.type as string) || 'all')
const charge = computed(() => {
  const c = route.query.charge as string
  return c === 'AC' || c === 'DC' ? c : 'all'
})

const chargeFilters = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'AC', value: 'AC' },
  { label: 'DC', value: 'DC' },
]

function typeLink(value: string) {
  if (value === 'all') return '/ev-charging/packages'
  const q = new URLSearchParams({ type: value })
  if (charge.value !== 'all') q.set('charge', charge.value)
  return `/ev-charging/packages?${q.toString()}`
}

function chargeLink(value: string) {
  const q = new URLSearchParams()
  if (type.value !== 'all') q.set('type', type.value)
  if (value !== 'all') q.set('charge', value)
  const qs = q.toString()
  return qs ? `/ev-charging/packages?${qs}` : '/ev-charging/packages'
}

const { data, pending, error } = await useFetch<{
  packages: ApiPackage[]
  types?: PackageType[]
}>(
  '/api/ev/packages',
  {
    query: computed(() => {
      const q: Record<string, string> = { includeTypes: '1' }
      if (type.value !== 'all') q.type = type.value
      if (charge.value !== 'all') q.charge = charge.value
      return q
    }),
    watch: [type, charge],
  },
)

const packages = computed(() => data.value?.packages ?? [])
const types = computed(() => data.value?.types ?? [])

/** แสดงเฉพาะประเภทที่มีแพ็กเกจ (หรือประเภทที่เลือกอยู่) */
const typeFilters = computed(() =>
  types.value
    .filter((t) => t.package_count > 0 || t.key === type.value)
    .sort((a, b) => a.sort_order - b.sort_order || a.code.localeCompare(b.code)),
)

const totalFromTypes = computed(() =>
  types.value.reduce((sum, t) => sum + (t.package_count || 0), 0) || packages.value.length,
)

const typeMap = computed(() => {
  const map = new Map<string, PackageType>()
  for (const t of types.value) map.set(t.key, t)
  return map
})

const activeTypeMeta = computed(() =>
  type.value === 'all' ? null : typeMap.value.get(type.value) ?? null,
)

const showChargeFilter = computed(() => {
  if (type.value === 'equipment' || type.value === 'investment' || type.value === 'turnkey') {
    return true
  }
  return packages.value.some((p) => p.charge_type === 'AC' || p.charge_type === 'DC')
})

function filterLabel(t: PackageType) {
  const known = PACKAGE_TYPE_LABELS[t.key]
  if (known) return known.th
  return t.name
}

function resolveTypeName(productType: string) {
  const fromDb = typeMap.value.get(productType)
  if (fromDb) return fromDb.name
  return typeLabel(productType, 'th')
}

const displayGroups = computed(() => {
  if (type.value !== 'all') {
    const meta = activeTypeMeta.value
    return [
      {
        key: type.value,
        code: meta?.code ?? '',
        name: meta?.name ?? resolveTypeName(type.value),
        description: meta?.description ?? '',
        items: packages.value,
      },
    ]
  }

  const byType = new Map<string, ApiPackage[]>()
  for (const pkg of packages.value) {
    const list = byType.get(pkg.product_type) ?? []
    list.push(pkg)
    byType.set(pkg.product_type, list)
  }

  const orderedKeys = [
    ...typeFilters.value.map((t) => t.key),
    ...[...byType.keys()].filter((k) => !typeMap.value.has(k)),
  ]

  return orderedKeys
    .filter((key) => byType.has(key))
    .map((key) => {
      const meta = typeMap.value.get(key)
      return {
        key,
        code: meta?.code ?? '',
        name: meta?.name ?? resolveTypeName(key),
        description: meta?.description ?? '',
        items: byType.get(key) ?? [],
      }
    })
})

function packageImage(pkg: ApiPackage) {
  return resolvePackageImage(pkg.image)
}

function priceInfo(pkg: ApiPackage) {
  return displayPrice(pkg)
}

useSeoMeta({
  title: 'CX Charge Packages | CX ENERTECH',
  description: 'แพ็กเกจ CX Station, CX DC และ CX AC — ประเภทจากระบบหลังบ้าน พร้อมสเปกและราคาอ้างอิง',
})
</script>

<style scoped>
.catalog {
  background: var(--color-black);
  color: var(--color-white);
}

.hero {
  position: relative;
  min-height: clamp(280px, 42vh, 420px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero__media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(11, 11, 11, 0.92) 0%, rgba(11, 11, 11, 0.55) 55%, rgba(11, 11, 11, 0.35) 100%),
    linear-gradient(180deg, rgba(11, 11, 11, 0.2), rgba(11, 11, 11, 0.92));
}

.hero__inner {
  position: relative;
  z-index: 1;
  padding-block: 4.5rem 2.75rem;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 1.25rem;
}

.breadcrumb a {
  color: var(--color-silver);
}

.breadcrumb a:hover {
  color: var(--color-lime);
}

.hero__brand {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 0.75rem;
}

.hero__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  margin-bottom: 0.75rem;
}

.hero__title em {
  font-style: normal;
  color: var(--color-gold);
}

.hero__lead {
  max-width: 36rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.catalog__body {
  padding-top: 2.5rem;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

.status {
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--color-muted);
  margin-top: 0.35rem;
}

.status--error {
  color: #ff8f8f;
}

.status__type {
  color: var(--color-silver);
}

.toolbar__payback {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-lime);
  letter-spacing: 0.04em;
}

.toolbar__payback:hover {
  color: var(--color-lime-soft);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.filters--sub {
  margin-top: -0.75rem;
  border-bottom: 0;
  align-items: center;
}

.filters__label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-right: 0.25rem;
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.95rem;
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-silver);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.filter__code {
  color: var(--color-gold);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.filter__count {
  font-size: 0.7rem;
  opacity: 0.7;
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

.filter--active .filter__code,
.filter:hover .filter__code,
.filter--active .filter__count,
.filter:hover .filter__count {
  color: inherit;
  opacity: 1;
}

.group {
  margin-bottom: 2.75rem;
}

.group__head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.group__code {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--color-gold);
  margin-bottom: 0.35rem;
}

.group__head h2 {
  font-size: 1.45rem;
  color: var(--color-white);
}

.group__head p {
  margin-top: 0.35rem;
  color: var(--color-muted);
  font-size: 0.92rem;
  max-width: 36rem;
}

.group__count {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--color-lime);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.35rem;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  transition: border-color 0.3s, transform 0.35s var(--ease);
}

.card:hover {
  border-color: rgba(212, 255, 0, 0.35);
  transform: translateY(-4px);
}

.card__media {
  position: relative;
  display: block;
  height: 200px;
  background:
    radial-gradient(circle at 70% 30%, rgba(212, 255, 0, 0.08), transparent 50%),
    #0e1218;
  overflow: hidden;
}

.card__media img,
.card__media-empty {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  padding: 1rem;
  display: block;
  transition: transform 0.55s var(--ease);
}

.card__media-empty {
  background: linear-gradient(135deg, #151515, #1c2636);
}

.card:hover .card__media img {
  transform: scale(1.04);
}

.card__badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  background: rgba(11, 11, 11, 0.75);
  border: 1px solid rgba(212, 255, 0, 0.35);
  color: var(--color-lime);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 1.25rem 1.35rem 1.4rem;
  flex: 1;
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: baseline;
}

.card__type {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-lime);
}

.card__code {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--color-gold);
}

.card__title {
  font-size: 1.15rem;
  line-height: 1.3;
}

.card__title a {
  color: var(--color-white);
}

.card__title a:hover {
  color: var(--color-lime);
}

.card__name {
  font-size: 0.82rem;
  color: var(--color-muted);
}

.card__tagline {
  font-size: 0.9rem;
  color: var(--color-silver);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem 1rem;
  margin-top: 0.35rem;
  padding: 0.85rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.meta dt {
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.15rem;
}

.meta dd {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-white);
}

.meta__payback dd {
  color: var(--color-lime);
}

.meta__payback dd span {
  color: var(--color-silver);
  font-weight: 500;
}

.card__price {
  margin-top: 0.25rem;
}

.card__price-label {
  display: block;
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.2rem;
}

.card__price strong {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-lime);
}

.card__price-pending {
  font-size: 1rem !important;
  color: var(--color-gold) !important;
}

.card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: auto;
  padding-top: 0.85rem;
}

.card__actions .btn {
  padding: 0.65rem 1rem;
  font-size: 0.78rem;
}

.empty {
  color: var(--color-muted);
  padding: 2.5rem 0;
}

.disclaimer {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  max-width: 46rem;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .card__media {
    height: 180px;
  }
}
</style>
