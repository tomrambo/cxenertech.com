<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const status = computed(() => Number(props.error?.statusCode) || 500)
const is404 = computed(() => status.value === 404)

useSeoMeta({
  title: is404.value ? 'ไม่พบหน้านี้ | CX ENERTECH' : 'เกิดข้อผิดพลาด | CX ENERTECH',
  description: is404.value
    ? 'ไม่พบหน้าที่ต้องการ ดูแพ็กเกจโซล่าเซลล์ EV Station หรือขอใบเสนอราคาจาก CX ENERTECH'
    : 'เกิดข้อผิดพลาดชั่วคราว กรุณาลองใหม่',
  robots: 'noindex, nofollow',
})

const links = [
  { label: 'รับติดตั้งโซล่าเซลล์', to: '/solar/rooftop' },
  { label: 'แพ็กเกจโซล่าเซลล์', to: '/solar/rooftop/packages' },
  { label: 'รับติดตั้ง EV Station', to: '/ev-charging/station' },
  { label: 'แพ็กเกจ EV Station', to: '/ev-charging/packages' },
  { label: 'บทความ', to: '/knowledge/articles' },
  { label: 'ขอใบเสนอราคา', to: '/contact/quotation' },
]

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="err">
    <p class="err__code">{{ status }}</p>
    <h1>{{ is404 ? 'ไม่พบหน้านี้' : 'เกิดข้อผิดพลาด' }}</h1>
    <p class="err__lead">
      {{
        is404
          ? 'ลิงก์นี้อาจย้ายแล้ว — ไปหน้าที่ Google ควรจัดอันดับต่อได้ที่นี่'
          : 'ลองรีเฟรช หรือกลับหน้าแรกแล้วเข้าเมนูบริการอีกครั้ง'
      }}
    </p>
    <div class="err__actions">
      <button type="button" class="btn btn-primary" @click="goHome">กลับหน้าแรก</button>
      <NuxtLink to="/contact/quotation" class="btn btn-secondary">ขอใบเสนอราคา</NuxtLink>
    </div>
    <ul class="err__links">
      <li v-for="l in links" :key="l.to">
        <NuxtLink :to="l.to">{{ l.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.err {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 40rem;
  margin: 0 auto;
  padding: 4rem 1.25rem;
}
.err__code {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  color: var(--color-gold);
  margin-bottom: 0.75rem;
}
.err h1 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin-bottom: 0.75rem;
}
.err__lead {
  color: var(--color-muted);
  line-height: 1.65;
  margin-bottom: 1.75rem;
}
.err__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}
.err__links {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.err__links a {
  color: var(--color-lime);
}
</style>
