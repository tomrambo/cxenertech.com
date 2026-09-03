<template>
  <div class="catalog">
    <!-- Hero: brand + one CTA group + product stage -->
    <section class="hero">
      <div class="hero__atmosphere" aria-hidden="true">
        <div class="hero__orb hero__orb--lime" />
        <div class="hero__orb hero__orb--gold" />
      </div>
      <div
        class="hero__media"
        style="background-image: url('/images/projects/project-dc-station.jpg')"
        aria-hidden="true"
      />
      <div class="hero__shade" aria-hidden="true" />

      <div class="container hero__layout">
        <div class="hero__copy">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <NuxtLink to="/">หน้าแรก</NuxtLink>
            <span aria-hidden="true">/</span>
            <NuxtLink to="/ev-charging">EV Charging</NuxtLink>
            <span aria-hidden="true">/</span>
            <span>แพ็กเกจสถานีชาร์จ</span>
          </nav>
          <p class="hero__brand animate-fade-up">CX ENERTECH</p>
          <h1 class="hero__title animate-fade-up animate-delay-1">
            แพ็กเกจ <em>EV Station</em> ราคาอ้างอิง
          </h1>
          <p class="hero__lead animate-fade-up animate-delay-2">
            เลือกแพ็กเกจสถานีชาร์จรถยนต์ไฟฟ้าและเครื่องชาร์จ — สเปก ราคาอ้างอิง และจุดคืนทุนในที่เดียว
          </p>
          <div class="hero__actions animate-fade-up animate-delay-3">
            <a href="#catalog" class="btn btn-primary">
              เลือกแพ็กเกจ
              <span aria-hidden="true">↓</span>
            </a>
            <NuxtLink to="/ev-charging/packages/payback" class="btn btn-secondary">
              ดูจุดคืนทุน
            </NuxtLink>
          </div>
        </div>

        <div class="hero__stage animate-fade-up animate-delay-2" aria-hidden="true">
          <img
            src="https://sgp1.digitaloceanspaces.com/evcharger/charge-packages/website/cx-station-s4.webp"
            alt=""
            width="720"
            height="560"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <section id="catalog" class="section catalog__body">
      <div class="container">
        <!-- Sticky control rail -->
        <div class="rail">
          <div class="rail__top">
            <div>
              <span class="section-label">Catalog</span>
              <h2 class="rail__title">
                <template v-if="activeTypeMeta">{{ activeTypeMeta.name }}</template>
                <template v-else>แพ็กเกจทั้งหมด</template>
              </h2>
              <p class="rail__status">
                <template v-if="pending">กำลังโหลดแคตตาล็อก…</template>
                <template v-else-if="error">โหลดไม่สำเร็จ — ลองรีเฟรชอีกครั้ง</template>
                <template v-else>
                  แสดง {{ packages.length }} จาก {{ totalFromTypes }} แพ็กเกจ
                </template>
              </p>
            </div>
            <div class="rail__links">
              <NuxtLink to="/ev-charging/quotation" class="rail__link">ขอใบเสนอราคา</NuxtLink>
              <NuxtLink to="/ev-charging/packages/payback" class="rail__link rail__link--accent">
                Payback →
              </NuxtLink>
            </div>
          </div>

          <div class="type-scroll" role="tablist" aria-label="ประเภทแพ็กเกจ">
            <NuxtLink
              to="/ev-charging/packages#catalog"
              class="type-chip"
              :class="{ 'type-chip--active': type === 'all' }"
              role="tab"
              :aria-selected="type === 'all'"
            >
              <span class="type-chip__name">ทั้งหมด</span>
              <span class="type-chip__count">{{ totalFromTypes }}</span>
            </NuxtLink>
            <NuxtLink
              v-for="t in typeFilters"
              :key="t.key"
              :to="`${typeLink(t.key)}#catalog`"
              class="type-chip"
              :class="{ 'type-chip--active': type === t.key }"
              role="tab"
              :aria-selected="type === t.key"
            >
              <span class="type-chip__code">{{ t.code }}</span>
              <span class="type-chip__name">{{ filterLabel(t) }}</span>
              <span class="type-chip__count">{{ t.package_count }}</span>
            </NuxtLink>
          </div>

          <div v-if="showChargeFilter" class="charge-row">
            <span class="charge-row__label">ชนิดไฟ</span>
            <div class="charge-row__opts">
              <NuxtLink
                v-for="f in chargeFilters"
                :key="f.value"
                :to="`${chargeLink(f.value)}#catalog`"
                class="charge-pill"
                :class="{ 'charge-pill--active': charge === f.value }"
              >
                {{ f.label }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Loading skeletons -->
        <div v-if="pending" class="skel-grid" aria-hidden="true">
          <div v-for="n in 6" :key="n" class="skel" />
        </div>

        <template v-else-if="packages.length">
          <div
            v-for="(group, gi) in displayGroups"
            :key="group.key"
            class="group"
            :style="{ '--gi': gi }"
          >
            <div v-if="type === 'all'" class="group__head">
              <div>
                <span class="group__code">{{ group.code }} · {{ group.name }}</span>
                <h3>{{ filterLabelFromKey(group.key) || group.name }}</h3>
                <p v-if="group.description">{{ group.description }}</p>
              </div>
              <NuxtLink :to="`${typeLink(group.key)}#catalog`" class="group__more">
                ดูทั้งหมด {{ group.items.length }} →
              </NuxtLink>
            </div>

            <!-- Spotlight first item -->
            <article v-if="group.items[0]" class="spotlight">
              <NuxtLink
                :to="`/ev-charging/packages/${group.items[0].slug}`"
                class="spotlight__media"
              >
                <img
                  v-if="packageImage(group.items[0])"
                  :src="packageImage(group.items[0])!"
                  :alt="group.items[0].name_th"
                  loading="lazy"
                  width="900"
                  height="700"
                  decoding="async"
                  referrerpolicy="no-referrer"
                />
              </NuxtLink>
              <div class="spotlight__body">
                <div class="spotlight__tags">
                  <span>{{ resolveTypeName(group.items[0].product_type) }}</span>
                  <span v-if="group.items[0].charge_type">{{ group.items[0].charge_type }}</span>
                  <span>{{ group.items[0].code }}</span>
                </div>
                <h3>
                  <NuxtLink :to="`/ev-charging/packages/${group.items[0].slug}`">
                    {{ group.items[0].name_th }}
                  </NuxtLink>
                </h3>
                <p class="spotlight__en">{{ group.items[0].name }}</p>
                <p class="spotlight__tagline">{{ group.items[0].tagline }}</p>

                <div class="spotlight__stats">
                  <div>
                    <span>กำลัง</span>
                    <strong>{{
                      formatPowerRange(group.items[0].power_kw_min, group.items[0].power_kw_max)
                    }}</strong>
                  </div>
                  <div>
                    <span>จุดชาร์จ</span>
                    <strong>{{
                      formatNozzles(
                        group.items[0].nozzle_count_min,
                        group.items[0].nozzle_count_max,
                      )
                    }}</strong>
                  </div>
                  <div v-if="group.items[0].payback_months != null">
                    <span>จุดคืนทุน</span>
                    <strong class="accent">
                      {{ group.items[0].payback_months }} ด. ·
                      {{
                        resolvePaybackYears(
                          group.items[0].payback_months,
                          group.items[0].payback_years,
                        )
                      }}
                      ปี
                    </strong>
                  </div>
                  <div>
                    <span>{{ priceInfo(group.items[0]).labelTh }}</span>
                    <strong class="accent">
                      <template v-if="!priceInfo(group.items[0]).pending">
                        {{ formatThb(priceInfo(group.items[0]).value) }}
                      </template>
                      <template v-else>ขอใบเสนอราคา</template>
                    </strong>
                  </div>
                </div>

                <div class="spotlight__actions">
                  <NuxtLink
                    :to="`/ev-charging/packages/${group.items[0].slug}`"
                    class="btn btn-primary"
                  >
                    ดูรายละเอียด
                  </NuxtLink>
                  <NuxtLink
                    class="btn btn-secondary"
                    :to="`/contact/quotation?type=ev&package=${group.items[0].code}`"
                  >
                    ขอใบเสนอราคา
                  </NuxtLink>
                </div>
              </div>
            </article>

            <div v-if="group.items.length > 1" class="grid">
              <article
                v-for="(pkg, pi) in group.items.slice(1)"
                :key="pkg.id"
                class="card"
                :style="{ '--i': pi }"
              >
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
                    <div v-if="pkg.payback_months != null" class="meta__payback">
                      <dt>คืนทุน</dt>
                      <dd>{{ pkg.payback_months }} ด.</dd>
                    </div>
                  </dl>

                  <div class="card__price">
                    <span>{{ priceInfo(pkg).labelTh }}</span>
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
                      ใบเสนอราคา
                    </NuxtLink>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </template>

        <div v-else-if="!error" class="empty">
          <p>ยังไม่มีแพ็กเกจในหมวดนี้</p>
          <NuxtLink to="/ev-charging/packages#catalog" class="btn btn-secondary">ดูทั้งหมด</NuxtLink>
        </div>

        <p class="disclaimer">
          ราคา / ROI / จุดคุ้มทุนเป็นตัวเลขอ้างอิงจากระบบหลังบ้าน ไม่ใช่ใบเสนอราคาจริง และไม่รับประกันผลตอบแทน
        </p>
      </div>
    </section>

    <CtaBand
      title="อยากได้แพ็กเกจที่ตัดตามพื้นที่จริง?"
      description="ทีม CX ENERTECH ออกแบบ BOQ และใบเสนอราคาตามโหลดไฟและพฤติกรรมการใช้งาน"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="กลับ Ev Charging"
      secondary-to="/ev-charging"
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

const typeFilters = computed(() =>
  types.value
    .filter((t) => t.package_count > 0 || t.key === type.value)
    .sort((a, b) => a.sort_order - b.sort_order || a.code.localeCompare(b.code)),
)

const totalFromTypes = computed(
  () =>
    types.value.reduce((sum, t) => sum + (t.package_count || 0), 0) ||
    packages.value.length,
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
  if (
    type.value === 'equipment' ||
    type.value === 'investment' ||
    type.value === 'turnkey'
  ) {
    return true
  }
  return packages.value.some((p) => p.charge_type === 'AC' || p.charge_type === 'DC')
})

function filterLabel(t: PackageType) {
  return PACKAGE_TYPE_LABELS[t.key]?.th ?? t.name
}

function filterLabelFromKey(key: string) {
  return PACKAGE_TYPE_LABELS[key]?.th ?? ''
}

function resolveTypeName(productType: string) {
  const fromDb = typeMap.value.get(productType)
  if (fromDb) return filterLabel(fromDb)
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

usePageSeo({
  title: 'แพ็กเกจ EV Station | ราคาสถานีชาร์จรถไฟฟ้า',
  description:
    'แพ็กเกจ CX Station CX DC CX AC ราคา EV Station และเครื่องชาร์จรถไฟฟ้า พร้อมสเปกและจุดคืนทุนอ้างอิง',
  path: '/ev-charging/packages',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'EV Charging', path: '/ev-charging' },
    { name: 'แพ็กเกจ EV Station', path: '/ev-charging/packages' },
  ],
})
</script>

<style scoped>
.catalog {
  background: var(--color-black);
  color: var(--color-white);
}

/* —— Hero —— */
.hero {
  position: relative;
  min-height: min(78vh, 760px);
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
}

.hero__atmosphere {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.hero__orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.35;
}

.hero__orb--lime {
  width: 42vw;
  height: 42vw;
  max-width: 420px;
  max-height: 420px;
  right: 8%;
  top: 12%;
  background: rgba(212, 255, 0, 0.28);
  animation: float-orb 10s ease-in-out infinite alternate;
}

.hero__orb--gold {
  width: 30vw;
  height: 30vw;
  max-width: 280px;
  max-height: 280px;
  left: 5%;
  bottom: 10%;
  background: rgba(212, 175, 55, 0.22);
  animation: float-orb 12s ease-in-out infinite alternate-reverse;
}

.hero__media {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center 40%;
  transform: scale(1.06);
  animation: hero-zoom 20s var(--ease) both;
}

.hero__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(105deg, rgba(11, 11, 11, 0.94) 0%, rgba(11, 11, 11, 0.72) 42%, rgba(11, 11, 11, 0.35) 100%),
    linear-gradient(180deg, rgba(11, 11, 11, 0.25), rgba(11, 11, 11, 0.9));
}

.hero__layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(1.5rem, 4vw, 3rem);
  align-items: center;
  padding-block: clamp(5rem, 12vh, 7rem) clamp(3rem, 7vh, 4.5rem);
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: var(--color-muted);
  margin-bottom: 1.15rem;
}

.breadcrumb a:hover {
  color: var(--color-lime);
}

.hero__brand {
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.4vw, 1.45rem);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 0.85rem;
}

.hero__title {
  font-size: clamp(2.6rem, 7vw, 4.4rem);
  line-height: 1.02;
  margin-bottom: 1rem;
}

.hero__title em {
  font-style: normal;
  color: var(--color-gold);
}

.hero__lead {
  max-width: 34rem;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.65;
  margin-bottom: 1.6rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__stage {
  position: relative;
  min-height: 320px;
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(212, 255, 0, 0.1), transparent 55%),
    rgba(17, 17, 17, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.hero__stage img {
  width: 100%;
  height: min(52vh, 460px);
  object-fit: contain;
  padding: 1.5rem;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.45));
  animation: stage-float 6s ease-in-out infinite;
}

@keyframes hero-zoom {
  from { transform: scale(1.14); }
  to { transform: scale(1.06); }
}

@keyframes float-orb {
  from { transform: translateY(0); }
  to { transform: translateY(18px); }
}

@keyframes stage-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* —— Catalog rail —— */
.catalog__body {
  padding-top: 2rem;
}

.rail {
  position: sticky;
  top: calc(var(--header-h) - 4px);
  z-index: 20;
  margin-bottom: 2rem;
  padding: 1.1rem 0 1rem;
  background: linear-gradient(180deg, rgba(11, 11, 11, 0.97), rgba(11, 11, 11, 0.92));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.rail__top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1rem;
}

.rail__title {
  font-size: clamp(1.35rem, 2.5vw, 1.8rem);
  margin-top: 0.25rem;
}

.rail__status {
  margin-top: 0.3rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.rail__links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.rail__link {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-silver);
}

.rail__link--accent,
.rail__link:hover {
  color: var(--color-lime);
}

.type-scroll {
  display: flex;
  gap: 0.55rem;
  overflow-x: auto;
  padding-bottom: 0.35rem;
  scrollbar-width: thin;
}

.type-chip {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(21, 21, 21, 0.9);
  color: var(--color-silver);
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s;
}

.type-chip:hover {
  border-color: rgba(212, 255, 0, 0.4);
  color: var(--color-white);
  transform: translateY(-1px);
}

.type-chip--active {
  background: var(--color-lime);
  border-color: var(--color-lime);
  color: #111;
}

.type-chip__code {
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--color-gold);
}

.type-chip--active .type-chip__code {
  color: #111;
}

.type-chip__count {
  font-size: 0.72rem;
  opacity: 0.75;
}

.charge-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-top: 0.85rem;
}

.charge-row__label {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.charge-row__opts {
  display: flex;
  gap: 0.4rem;
}

.charge-pill {
  padding: 0.35rem 0.8rem;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-muted);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.charge-pill--active,
.charge-pill:hover {
  color: #111;
  background: var(--color-gold);
  border-color: var(--color-gold);
}

/* —— Groups / spotlight —— */
.group {
  margin-bottom: 3.25rem;
  animation: rise 0.55s var(--ease) both;
  animation-delay: calc(var(--gi) * 70ms);
}

.group__head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  margin-bottom: 1.25rem;
}

.group__code {
  display: block;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: 0.35rem;
}

.group__head h3 {
  font-size: 1.55rem;
}

.group__head p {
  margin-top: 0.35rem;
  color: var(--color-muted);
  max-width: 36rem;
}

.group__more {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-lime);
  white-space: nowrap;
}

.spotlight {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 0;
  margin-bottom: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, rgba(21, 21, 21, 0.95), rgba(14, 20, 28, 0.95));
  overflow: hidden;
  transition: border-color 0.3s, transform 0.4s var(--ease);
}

.spotlight:hover {
  border-color: rgba(212, 255, 0, 0.35);
  transform: translateY(-3px);
}

.spotlight__media {
  display: grid;
  place-items: center;
  min-height: 320px;
  background:
    radial-gradient(circle at 50% 40%, rgba(212, 255, 0, 0.1), transparent 55%),
    #0b0f14;
}

.spotlight__media img {
  width: 100%;
  height: 100%;
  max-height: 420px;
  object-fit: contain;
  padding: 1.75rem;
  transition: transform 0.6s var(--ease);
}

.spotlight:hover .spotlight__media img {
  transform: scale(1.04);
}

.spotlight__body {
  padding: clamp(1.4rem, 3vw, 2.25rem);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.spotlight__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.35rem;
}

.spotlight__tags span {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-lime);
  border: 1px solid rgba(212, 255, 0, 0.28);
  padding: 0.2rem 0.45rem;
}

.spotlight__tags span:nth-child(2) {
  color: var(--color-gold);
  border-color: rgba(212, 175, 55, 0.35);
}

.spotlight__tags span:nth-child(3) {
  color: var(--color-muted);
  border-color: rgba(255, 255, 255, 0.12);
}

.spotlight__body h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
}

.spotlight__body h3 a {
  color: var(--color-white);
}

.spotlight__body h3 a:hover {
  color: var(--color-lime);
}

.spotlight__en {
  color: var(--color-muted);
  font-size: 0.9rem;
}

.spotlight__tagline {
  color: var(--color-silver);
  line-height: 1.55;
  margin: 0.35rem 0 0.75rem;
}

.spotlight__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem 1.25rem;
  padding: 1rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 1rem;
}

.spotlight__stats span {
  display: block;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.2rem;
}

.spotlight__stats strong {
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--color-white);
}

.spotlight__stats .accent {
  color: var(--color-lime);
}

.spotlight__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: auto;
}

/* —— Grid cards —— */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.15rem;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  animation: rise 0.5s var(--ease) both;
  animation-delay: calc(var(--i) * 45ms);
  transition: border-color 0.3s, transform 0.35s var(--ease);
}

.card:hover {
  border-color: rgba(212, 255, 0, 0.35);
  transform: translateY(-4px);
}

.card__media {
  position: relative;
  display: block;
  height: 190px;
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
  padding: 1rem;
  display: block;
  transition: transform 0.55s var(--ease);
}

.card__media-empty {
  background: linear-gradient(135deg, #151515, #1c2636);
}

.card:hover .card__media img {
  transform: scale(1.05);
}

.card__badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.2rem 0.45rem;
  background: rgba(11, 11, 11, 0.8);
  border: 1px solid rgba(212, 255, 0, 0.35);
  color: var(--color-lime);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.15rem 1.2rem 1.25rem;
  flex: 1;
}

.card__top {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.card__type {
  font-family: var(--font-display);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-lime);
}

.card__code {
  font-family: var(--font-display);
  font-size: 0.7rem;
  color: var(--color-gold);
}

.card__title {
  font-size: 1.08rem;
  line-height: 1.3;
}

.card__title a {
  color: var(--color-white);
}

.card__title a:hover {
  color: var(--color-lime);
}

.card__tagline {
  font-size: 0.88rem;
  color: var(--color-silver);
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.55rem;
  margin-top: 0.25rem;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.meta dt {
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 0.12rem;
}

.meta dd {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
}

.meta__payback dd {
  color: var(--color-lime);
}

.card__price {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  margin-top: 0.15rem;
}

.card__price span {
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.card__price strong {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--color-lime);
}

.card__price-pending {
  color: var(--color-gold) !important;
  font-size: 0.95rem !important;
}

.card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.75rem;
}

.card__actions .btn {
  padding: 0.6rem 0.9rem;
  font-size: 0.75rem;
}

/* —— States —— */
.skel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.15rem;
}

.skel {
  height: 360px;
  background: linear-gradient(90deg, #151515 25%, #1c1c1c 50%, #151515 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 3rem 0;
  color: var(--color-muted);
}

.disclaimer {
  margin-top: 1.25rem;
  font-size: 0.85rem;
  color: var(--color-muted);
  max-width: 46rem;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .hero__layout,
  .spotlight {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
  }

  .hero__stage {
    min-height: 240px;
    order: -1;
  }

  .hero__stage img {
    height: 260px;
  }

  .spotlight__media {
    min-height: 240px;
  }
}

@media (max-width: 640px) {
  .meta {
    grid-template-columns: 1fr 1fr;
  }

  .rail {
    top: calc(var(--header-h) - 12px);
  }
}
</style>
