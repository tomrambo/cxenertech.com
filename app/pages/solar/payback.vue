<script setup lang="ts">
import { formatThb } from '~/utils/solar-format'
import type { SolarWebsitePackage } from '~/utils/solar-packages'

const { data } = await useFetch<{ packages: SolarWebsitePackage[] }>('/api/solar/packages')
const rows = computed(() => {
  const list = [...(data.value?.packages ?? [])]
  return list
    .map((pkg) => {
      const save = pkg.savings_monthly_thb || 0
      const months = save > 0 ? pkg.price_from / save : null
      return {
        ...pkg,
        paybackMonths: months,
        paybackYears: months != null ? months / 12 : null,
      }
    })
    .sort((a, b) => a.power_kw - b.power_kw || a.price_from - b.price_from)
    .slice(0, 24)
})
</script>

<template>
  <SolarLanding id="payback">
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">ประมาณการจากแพ็กเกจ</span>
          <h2 class="section-title">จุดคืนทุนอ้างอิง</h2>
          <p class="section-lead">
            คำนวณจากราคาเริ่มต้น ÷ ลดค่าไฟเฉลี่ยต่อเดือนในฐานข้อมูล — ไม่ใช่ผลจริงของทุกไซต์
          </p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>รหัส</th>
                <th>ขนาด</th>
                <th>ประเภท</th>
                <th>ราคาเริ่มต้น</th>
                <th>ประหยัด/เดือน</th>
                <th>คืนทุน (ปี)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="pkg in rows" :key="pkg.id">
                <td>
                  <NuxtLink :to="`/solar/rooftop/packages/${pkg.slug}`">{{ pkg.code }}</NuxtLink>
                </td>
                <td>{{ pkg.power_kw }} kW</td>
                <td>{{ pkg.product_type }}</td>
                <td>{{ formatThb(pkg.price_from) }}</td>
                <td>{{ formatThb(pkg.savings_monthly_thb) }}</td>
                <td>
                  {{
                    pkg.paybackYears != null
                      ? pkg.paybackYears.toLocaleString('th-TH', { maximumFractionDigits: 1 })
                      : '—'
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </SolarLanding>
</template>

<style scoped>
.section-lead {
  color: var(--color-muted);
  max-width: 40rem;
}
.table-wrap {
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
th,
td {
  padding: 0.7rem 0.85rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
th {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}
td {
  color: var(--color-white);
}
a {
  color: var(--color-lime);
}
</style>
