<template>
  <div>
    <PageHero
      title="เกี่ยวกับ CX ENERTECH"
      description="ผู้ให้บริการโซลูชันพลังงานสะอาดและโครงสร้างพื้นฐาน EV แบบครบวงจร"
      :crumbs="[{ label: 'Home', to: '/' }, { label: 'About Us' }]"
    />

    <section class="section">
      <div class="container about-intro">
        <div>
          <span class="section-label">Company Profile</span>
          <h2 class="section-title">SMART ENERGY &amp; EV INFRASTRUCTURE</h2>
          <p>
            CX ENERTECH มุ่งมั่นขับเคลื่อนอนาคตที่ยั่งยืนด้วย Smart Energy Ecosystem
            เชื่อมโยงสองเสาหลัก — Solar Energy และ EV Charging — สู่การบริหารจัดการพลังงานอย่างชาญฉลาด
          </p>
          <p>
            เราให้บริการตั้งแต่การออกแบบ จัดหา ติดตั้ง ระบบ EPC ไปจนถึงการบริหารจัดการและบำรุงรักษา
            เพื่อให้ลูกค้าได้รับโซลูชันที่ครบวงจรและเชื่อถือได้
          </p>
          <NuxtLink to="/about/download" class="btn btn-outline-dark" style="margin-top: 1.5rem">
            ดาวน์โหลด Company Profile
          </NuxtLink>
        </div>
        <div class="about-stats">
          <div v-for="s in stats" :key="s.label" class="stat">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background: var(--color-mist)">
      <div class="container">
        <div class="section-header centered">
          <span class="section-label">Explore</span>
          <h2 class="section-title">ทำความรู้จักเราให้มากขึ้น</h2>
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
const stats = [
  { value: 'Solar + EV', label: 'สองเสาหลักธุรกิจ' },
  { value: 'EPC', label: 'บริการครบวงจร' },
  { value: 'O&M', label: 'ดูแลระยะยาว' },
  { value: 'Smart', label: 'Energy Ecosystem' },
]

const links = [
  { label: 'Company Profile', to: '/about/company-profile' },
  { label: 'Vision & Mission', to: '/about/vision-mission' },
  { label: 'Our Values', to: '/about/values' },
  { label: 'Business Overview', to: '/about/business-overview' },
  { label: 'Organization', to: '/about/organization' },
  { label: 'Certifications', to: '/about/certifications' },
]

useSeoMeta({
  title: 'About Us | CX ENERTECH',
  description: 'เกี่ยวกับ CX ENERTECH — Smart Energy & EV Infrastructure',
})
</script>

<style scoped>
.about-intro {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 3rem;
  align-items: start;
}

.about-intro p {
  color: var(--color-muted);
  margin-top: 1rem;
  max-width: 36rem;
}

.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat {
  background: var(--color-white);
  padding: 1.5rem;
  border-top: 3px solid var(--color-teal);
}

.stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--color-forest);
  margin-bottom: 0.35rem;
}

.stat span {
  font-size: 0.85rem;
  color: var(--color-muted);
}

@media (max-width: 800px) {
  .about-intro {
    grid-template-columns: 1fr;
  }
}
</style>
