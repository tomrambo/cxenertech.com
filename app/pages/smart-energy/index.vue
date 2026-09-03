<template>
  <div>
    <PageHero
      title="Smart Energy — เชื่อมโซลาร์กับสถานีชาร์จ"
      description="บริหารพลังงานจากหลังคาโซลาร์ไปยัง EV Charging ในระบบเดียว ไม่ใช่แผนกไอทีแยก"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'Smart Energy' }]"
    />

    <section class="section">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Smart Energy Ecosystem</span>
          <h2 class="section-title">ผลิต ชาร์จ และวัดผลในวงจรเดียวกัน</h2>
          <p class="section-lead">
            Smart Energy ของ CX ENERTECH คือการเอาไฟฟ้าจากโซล่าเซลล์ไปใช้ที่สถานีชาร์จและโหลดอาคาร
            พร้อมระบบมอนิเตอร์ ไม่ได้ขายซอฟต์แวร์แยกจากงานติดตั้ง
          </p>
        </div>

        <div class="flow">
          <div class="flow__node">CX ENERTECH</div>
          <div class="flow__line" />
          <div class="flow__node flow__node--accent">SMART ENERGY</div>
          <div class="flow__line" />
          <div class="flow__split">
            <NuxtLink to="/solar/rooftop" class="flow__box">
              <strong>รับติดตั้งโซล่าเซลล์</strong>
              <span>Rooftop · โรงงาน · EPC</span>
            </NuxtLink>
            <NuxtLink to="/ev-charging/station" class="flow__box">
              <strong>รับติดตั้ง EV Station</strong>
              <span>DC Fast · AC · แพลตฟอร์ม</span>
            </NuxtLink>
          </div>
        </div>

        <div class="content-block" style="margin-top: 3rem">
          <h2>มอนิเตอร์และบริหารพลังงาน</h2>
          <p>
            หลังติดตั้ง วัดการผลิต การชาร์จ และค่าไฟจากกริด เพื่อปรับตารางชาร์จให้ใช้ไฟโซลาร์กลางวัน
            งานปรับแต่งเฉพาะไซต์คุยตอนสำรวจ ไม่แยกเป็นหน้าย่อยที่ไม่มีเนื้อหา
          </p>
          <p>
            ถ้ารวมโซลาร์กับสถานีชาร์จในที่ดินเดียวกัน อ่านหน้า
            <NuxtLink to="/smart-energy/solar-ev-integration">Solar + EV Integration</NuxtLink>
          </p>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Smart Energy | เชื่อมโซลาร์กับ EV Charging',
  description:
    'Smart Energy ของ CX ENERTECH เชื่อมโซล่าเซลล์กับสถานีชาร์จรถไฟฟ้า พร้อมมอนิเตอร์พลังงานในงานติดตั้งเดียวกัน',
  path: '/smart-energy',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'Smart Energy', path: '/smart-energy' },
  ],
})
</script>

<style scoped>
.flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 640px;
  margin: 0 auto;
}

.flow__node {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.08em;
  font-size: 0.9rem;
  padding: 0.85rem 1.5rem;
  background: var(--color-forest);
  color: var(--color-cream);
  text-align: center;
}

.flow__node--accent {
  background: var(--color-forest-mid);
  color: var(--color-teal-bright);
  font-size: 0.8rem;
}

.flow__line {
  width: 1px;
  height: 24px;
  background: #101010;
}

.flow__split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
}

.flow__box {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1.25rem;
  background: var(--color-panel);
  border-top: 3px solid var(--color-teal);
  text-align: center;
  transition: transform 0.3s var(--ease);
}

.flow__box:hover {
  transform: translateY(-3px);
}

.flow__box strong {
  font-family: var(--font-display);
  color: var(--color-white);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
}

.flow__box span {
  font-size: 0.8rem;
  color: var(--color-muted);
}

@media (max-width: 520px) {
  .flow__split {
    grid-template-columns: 1fr;
  }
}
</style>
