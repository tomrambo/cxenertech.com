<template>
  <div>
    <PageHero
      title="จุดคืนทุน EV Station — ลงทุนสถานีชาร์จคุ้มไหม"
      description="ROI คืนทุน และกำไรอ้างอิงของแพ็กเกจลงทุนและสถานีสำเร็จรูป"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'EV Charging', to: '/ev-charging' },
        { label: 'ลงทุน EV Station', to: '/ev-charging/investment' },
        { label: 'จุดคืนทุน' },
      ]"
    />

    <section class="section">
      <div class="container">
        <div class="intro">
          <div>
            <span class="section-label">Payback / จุดคืนทุน</span>
            <h2 class="section-title">ระยะคืนทุนอ้างอิงทุกแพ็กเกจ</h2>
            <p class="lead">
              แพ็กเกจลงทุน / Investment และสถานีสำเร็จรูป / Turnkey — แสดงทั้งจำนวนเดือนและปี
            </p>
          </div>
          <p v-if="pending" class="status">Loading… / กำลังโหลด…</p>
          <p v-else-if="error" class="status status--error">Failed to load / โหลดไม่สำเร็จ</p>
        </div>

        <div v-for="group in groups" :key="group.type" class="group">
          <div class="group__head">
            <h3>{{ group.title }}</h3>
            <span>{{ group.items.length }} packages</span>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>แพ็กเกจ</th>
                  <th>กำลัง</th>
                  <th>CAPEX อ้างอิง</th>
                  <th>ROI / ปี</th>
                  <th>จุดคืนทุน (เดือน)</th>
                  <th>จุดคืนทุน (ปี)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pkg in group.items" :key="pkg.id">
                  <td>
                    <strong>{{ pkg.name_th }}</strong>
                    <span class="code">{{ pkg.code }}</span>
                  </td>
                  <td>{{ formatPowerRange(pkg.power_kw_min, pkg.power_kw_max) }}</td>
                  <td>{{ formatThb(pkg.price_capex) }}</td>
                  <td>{{ pkg.roi_annual_pct != null ? `${pkg.roi_annual_pct}%` : '—' }}</td>
                  <td class="payback">
                    {{ pkg.payback_months != null ? `${pkg.payback_months} เดือน` : '—' }}
                  </td>
                  <td class="payback">
                    {{
                      pkg.payback_months != null || pkg.payback_years != null
                        ? `${resolvePaybackYears(pkg.payback_months, pkg.payback_years)} ปี`
                        : '—'
                    }}
                  </td>
                  <td>
                    <NuxtLink :to="`/ev-charging/packages/${pkg.slug}`" class="link">
                      รายละเอียด
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="disclaimer">
          จุดคืนทุน / ROI / CAPEX เป็นตัวเลขอ้างอิงจากสมมติฐานการใช้งาน — ไม่ใช่ใบเสนอราคาจริง และไม่รับประกันผลตอบแทน
        </p>

        <div class="actions">
          <NuxtLink to="/ev-charging/packages" class="btn btn-secondary">
            ← CX Charge Packages
          </NuxtLink>
          <NuxtLink to="/ev-charging/packages?type=investment" class="btn btn-primary">
            ดูแพ็กเกจลงทุน
          </NuxtLink>
          <NuxtLink to="/ev-charging/packages?type=turnkey" class="btn btn-secondary">
            ดูสถานีสำเร็จรูป
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      title="ต้องการคำนวณจุดคืนทุนตามไซต์จริง?"
      description="ทีม CX ENERTECH ปรับสมมติฐาน utilization, ราคาขายไฟ และ CAPEX ให้ตรงพื้นที่ของคุณ"
      primary-label="ขอใบเสนอราคา EV"
      primary-to="/ev-charging/quotation"
      secondary-label="ดูแคตตาล็อกแพ็กเกจ"
      secondary-to="/ev-charging/packages"
    />
  </div>
</template>

<script setup lang="ts">
import {
  formatPowerRange,
  formatThb,
  resolvePaybackYears,
} from '~/utils/ev-format'

type ApiPackage = {
  id: string
  slug: string
  code: string
  name_th: string
  product_type: 'investment' | 'turnkey' | string
  power_kw_min: number
  power_kw_max: number
  price_capex: number | null
  roi_annual_pct: number | null
  payback_months: number | null
  payback_years?: number | null
}

const { data, pending, error } = await useFetch<{ packages: ApiPackage[] }>(
  '/api/ev/packages',
)

const packages = computed(() => data.value?.packages ?? [])

const groups = computed(() => [
  {
    type: 'investment',
    title: 'แพ็กเกจลงทุน / Investment',
    items: packages.value.filter((p) => p.product_type === 'investment'),
  },
  {
    type: 'turnkey',
    title: 'สถานีสำเร็จรูป / Turnkey',
    items: packages.value.filter((p) => p.product_type === 'turnkey'),
  },
])

usePageSeo({
  title: 'EV Station คืนทุนกี่ปี | จุดคืนทุนแพ็กเกจ',
  description:
    'จุดคืนทุน ROI และ CAPEX อ้างอิงของแพ็กเกจลงทุนและสถานีชาร์จรถไฟฟ้า CX ENERTECH',
  path: '/ev-charging/packages/payback',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ลงทุน EV Station', path: '/ev-charging/investment' },
    { name: 'จุดคืนทุน', path: '/ev-charging/packages/payback' },
  ],
})
</script>

<style scoped>
.intro {
  margin-bottom: 2.5rem;
}

.lead {
  max-width: 42rem;
  color: var(--color-silver);
  line-height: 1.6;
  margin-top: 0.75rem;
}

.status {
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  margin-top: 1rem;
}

.status--error {
  color: #ff8f8f;
}

.group {
  margin-bottom: 2.75rem;
}

.group__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  align-items: baseline;
  margin-bottom: 1rem;
}

.group__head h3 {
  font-size: 1.25rem;
  color: var(--color-white);
}

.group__head span {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-muted);
}

.table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: var(--color-panel);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

th,
td {
  padding: 0.85rem 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  vertical-align: top;
}

th {
  font-family: var(--font-display);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  background: rgba(0, 0, 0, 0.25);
  white-space: nowrap;
}

td strong {
  display: block;
  color: var(--color-white);
  font-size: 0.95rem;
  margin-bottom: 0.2rem;
}

.code {
  display: block;
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--color-gold);
}

.payback {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--color-lime);
  white-space: nowrap;
}

.link {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-lime);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.disclaimer {
  font-size: 0.85rem;
  color: var(--color-muted);
  line-height: 1.55;
  margin: 0.5rem 0 1.75rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
