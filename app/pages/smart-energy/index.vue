<template>
  <div>
    <PageHero
      title="Smart Energy"
      description="Concept เชื่อม Solar กับ EV สู่ Energy Management และอนาคตที่ยั่งยืน"
      :crumbs="[{ label: 'Home', to: '/' }, { label: 'Smart Energy' }]"
    />

    <section class="section">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Smart Energy Ecosystem</span>
          <h2 class="section-title">ไม่ใช่ IT Business Unit — แต่เป็น Ecosystem</h2>
          <p class="section-lead">
            Smart Energy ของ CX ENERTECH คือแนวคิดเชื่อมโยง Solar Energy กับ EV Charging
            เพื่อบริหารจัดการพลังงานอย่างมีประสิทธิภาพ สู่ Sustainable Future
          </p>
        </div>

        <div class="flow">
          <div class="flow__node">CX ENERTECH</div>
          <div class="flow__line" />
          <div class="flow__node flow__node--accent">SMART ENERGY ECOSYSTEM</div>
          <div class="flow__line" />
          <div class="flow__split">
            <NuxtLink to="/solar" class="flow__box">
              <strong>SOLAR ENERGY</strong>
              <span>Rooftop · Farm · EPC · O&amp;M</span>
            </NuxtLink>
            <NuxtLink to="/ev-charging" class="flow__box">
              <strong>EV CHARGING</strong>
              <span>AC · DC · Station · EV EPC</span>
            </NuxtLink>
          </div>
          <div class="flow__line" />
          <div class="flow__node flow__node--teal">ENERGY MANAGEMENT</div>
          <div class="flow__line" />
          <div class="flow__node flow__node--solar">SUSTAINABLE FUTURE</div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--color-mist)">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Capabilities</span>
          <h2 class="section-title">ความสามารถด้าน Smart Energy</h2>
        </div>
        <div class="sub-links">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="sub-link">
            {{ l.label }} <span>→</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
const links = [
  { label: 'Energy Management', to: '/smart-energy/energy-management' },
  { label: 'Solar + EV Integration', to: '/smart-energy/solar-ev-integration' },
  { label: 'Energy Monitoring', to: '/smart-energy/energy-monitoring' },
  { label: 'EV Charging Management', to: '/smart-energy/ev-charging-management' },
  { label: 'Energy Optimization', to: '/smart-energy/energy-optimization' },
  { label: 'Customized Energy Solutions', to: '/smart-energy/customized' },
]

useSeoMeta({
  title: 'Smart Energy | CX ENERTECH',
  description: 'Smart Energy Ecosystem — เชื่อม Solar กับ EV สู่อนาคตที่ยั่งยืน',
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

.flow__node--teal {
  background: var(--color-teal);
  color: white;
}

.flow__node--solar {
  background: var(--color-solar);
  color: var(--color-forest);
}

.flow__line {
  width: 1px;
  height: 24px;
  background: var(--color-mist);
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
  background: var(--color-white);
  border-top: 3px solid var(--color-teal);
  text-align: center;
  transition: transform 0.3s var(--ease);
}

.flow__box:hover {
  transform: translateY(-3px);
}

.flow__box strong {
  font-family: var(--font-display);
  color: var(--color-forest);
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
