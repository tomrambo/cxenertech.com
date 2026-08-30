<template>
  <div v-if="pkg">
    <PageHero
      :title="pkg.name_th"
      :description="pkg.tagline"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'Solar', to: '/solar' },
        { label: 'Rooftop', to: '/solar/rooftop' },
        { label: 'Packages', to: '/solar/rooftop/packages' },
        { label: pkg.code },
      ]"
    />

    <section class="section">
      <div class="container detail">
        <div class="detail__main">
          <div class="badge-row">
            <span class="badge">{{ pkg.power_kw }} kW</span>
            <span class="code">{{ pkg.code }}</span>
            <span class="phase">{{ systemTypeLabel(pkg.product_type) }} · {{ phaseLabel(pkg.phase) }}</span>
          </div>

          <p class="lead">{{ pkg.description }}</p>
          <p class="source">แหล่งข้อมูล: {{ pkg.source_label }} · มีผล {{ pkg.effective_from }}</p>

          <h2 class="block-title">สเปกหลัก</h2>
          <dl class="spec-grid">
            <div>
              <dt>กำลังติดตั้ง</dt>
              <dd>{{ pkg.power_kw }} kW</dd>
            </div>
            <div>
              <dt>ประเภทระบบ</dt>
              <dd>{{ systemTypeLabel(pkg.product_type) }}</dd>
            </div>
            <div>
              <dt>ระบบไฟฟ้า</dt>
              <dd>{{ phaseLabel(pkg.phase) }}</dd>
            </div>
            <div>
              <dt>พื้นที่ติดตั้ง</dt>
              <dd>{{ pkg.area_m2 }} ตร.ม.</dd>
            </div>
            <div>
              <dt>ไฟฟ้าที่ผลิตได้</dt>
              <dd>{{ pkg.yield_kwh_year.toLocaleString('th-TH') }} หน่วย/ปี</dd>
            </div>
            <div>
              <dt>ลดค่าไฟเฉลี่ย</dt>
              <dd>{{ formatThb(pkg.savings_monthly_thb) }}/เดือน</dd>
            </div>
          </dl>

          <h2 class="block-title">อุปกรณ์หลัก</h2>
          <ul class="kv">
            <li>
              <span>แผงโซลาร์</span>
              <strong>{{ equipmentLabel(pkg.panel) }}</strong>
            </li>
            <li>
              <span>อินเวอร์เตอร์</span>
              <strong>{{ equipmentLabel(pkg.inverter) }}</strong>
            </li>
            <li>
              <span>แบตเตอรี่</span>
              <strong>{{ pkg.battery ? equipmentLabel(pkg.battery) : 'ไม่รวมในชุด' }}</strong>
            </li>
          </ul>

          <h2 class="block-title">สิ่งที่รวมในแพ็กเกจ</h2>
          <ul class="checklist">
            <li v-for="item in pkg.includes" :key="item">{{ item }}</li>
          </ul>

          <h2 class="block-title">จุดเด่น</h2>
          <ul class="checklist">
            <li v-for="item in pkg.features" :key="item">{{ item }}</li>
          </ul>
        </div>

        <aside class="detail__aside">
          <div class="aside-box">
            <h4>ราคาเริ่มต้น</h4>
            <p class="aside-price">{{ formatThb(pkg.price_from) }}</p>
            <p class="aside-note">ราคาเริ่มต้นอ้างอิงจากฐานข้อมูล · ไม่ใช่ใบเสนอราคาจริง</p>
            <NuxtLink
              class="btn btn-primary"
              :to="`/contact/quotation?type=solar&package=${pkg.code}`"
            >
              ขอใบเสนอราคา
            </NuxtLink>
            <NuxtLink to="/solar/rooftop/packages" class="aside-link">← แพ็กเกจทั้งหมด</NuxtLink>
          </div>
        </aside>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
import { formatThb, phaseLabel } from '~/utils/solar-format'
import { systemTypeLabel, type SolarWebsitePackage } from '~/utils/solar-packages'

function equipmentLabel(row: { brand: string | null; model?: string | null; qty?: number | null }) {
  const name = [row.brand, row.model].filter(Boolean).join(' ')
  if (!name) return 'ตามแพ็กเกจ'
  if (row.qty && row.qty > 1) return `${name} × ${row.qty}`
  return name
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data, error } = await useFetch<{ package: SolarWebsitePackage }>(
  () => `/api/solar/packages/${slug.value}`,
)

if (error.value || !data.value?.package) {
  throw createError({ statusCode: 404, statusMessage: 'Package not found' })
}

const pkg = computed(() => data.value!.package)

useSeoMeta({
  title: () => `${pkg.value.name_th} | CX ENERTECH`,
  description: () => pkg.value.description,
})
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2.5rem;
  align-items: start;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
  margin-bottom: 1rem;
}

.badge {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: var(--color-lime);
  color: #111;
  padding: 0.3rem 0.65rem;
}

.code {
  font-family: var(--font-display);
  color: var(--color-gold);
  font-weight: 600;
}

.phase {
  font-size: 0.85rem;
  color: var(--color-muted);
}

.lead {
  color: var(--color-silver);
  max-width: 42rem;
  line-height: 1.7;
}

.source {
  margin-top: 0.65rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.block-title {
  font-size: 1.2rem;
  color: var(--color-white);
  margin: 2rem 0 0.85rem;
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
  margin-bottom: 0.2rem;
}

.spec-grid dd {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-white);
}

.kv,
.checklist {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kv li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--color-muted);
}

.kv strong {
  color: var(--color-white);
}

.checklist li {
  padding-left: 1.2rem;
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

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.option {
  padding: 1.15rem;
  background: var(--color-panel);
  border-top: 3px solid transparent;
}

.option--string {
  border-top-color: #c4b5fd;
}

.option--micro {
  border-top-color: var(--color-gold);
}

.option h3 {
  font-size: 0.9rem;
  color: var(--color-white);
  margin-bottom: 0.5rem;
}

.option-price {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-lime);
}

.option-brands,
.option-na {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.aside-box {
  background: var(--color-panel);
  border-top: 3px solid var(--color-lime);
  padding: 1.5rem;
  position: sticky;
  top: calc(var(--header-h) + 1.5rem);
}

.aside-box h4 {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.aside-price {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-lime);
  margin: 0.4rem 0 0.75rem;
}

.aside-note {
  font-size: 0.82rem;
  color: var(--color-muted);
  margin-bottom: 1.1rem;
  line-height: 1.45;
}

.aside-link {
  display: block;
  margin-top: 0.85rem;
  font-size: 0.85rem;
  color: var(--color-muted);
}

@media (max-width: 860px) {
  .detail {
    grid-template-columns: 1fr;
  }

  .options {
    grid-template-columns: 1fr;
  }

  .aside-box {
    position: static;
  }
}
</style>
