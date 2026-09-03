<template>
  <div>
    <PageHero
      title="ประวัติบริษัท CX ENERTECH"
      description="บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด รับติดตั้งโซล่าเซลล์และ EV Station"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'เกี่ยวกับเรา', to: '/about' },
        { label: 'ประวัติบริษัท' },
      ]"
    />

    <section class="section">
      <div class="container profile">
        <div class="profile__brand">
          <BrandLogo variant="dark" :height="64" />
          <div>
            <h2>CX ENERTECH CO., LTD.</h2>
            <p>บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด</p>
          </div>
        </div>

        <div class="content-block">
          <p>
            CX ENERTECH เป็นผู้ให้บริการโซลูชันด้าน <strong>Smart Energy &amp; EV Infrastructure</strong>
            แบบครบวงจร ครอบคลุมสองเสาหลักธุรกิจ ได้แก่ Solar Energy และ EV Charging
            พร้อมเชื่อมต่อผ่าน Smart Energy Ecosystem
          </p>
          <h2>Business Pillars</h2>
          <h3>Solar Energy</h3>
          <p>Design • EPC • Installation • O&amp;M — ตั้งแต่ Solar Rooftop ถึง Solar Farm และระบบ BOS</p>
          <h3>EV Charging</h3>
          <p>Charger • Station • EPC • Management — ตั้งแต่ Home Charger ถึง DC Fast Charging Station</p>
          <h2>Positioning</h2>
          <p>POWERING A SUSTAINABLE FUTURE — Smart Solar &amp; EV Charging Solutions</p>
        </div>

        <div class="profile__actions">
          <NuxtLink to="/about/download" class="btn btn-primary">ดาวน์โหลด Company Profile</NuxtLink>
          <NuxtLink to="/projects" class="btn btn-outline-dark">ดูผลงานโครงการ</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ประวัติบริษัท | CX ENERTECH รับติดตั้งโซล่าเซลล์',
  description: 'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด รับติดตั้งโซล่าเซลล์ solar rooftop และสถานีชาร์จรถไฟฟ้าแบบ EPC',
  path: '/about/company-profile',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
    { name: 'ประวัติบริษัท', path: '/about/company-profile' },
  ],
})
</script>

<style scoped>
.profile__brand {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-silver-soft);
}

.profile__brand h2 {
  font-size: 1.5rem;
  color: var(--color-navy);
  margin: 0 0 0.25rem;
}

.profile__brand p {
  color: var(--color-muted);
  margin: 0;
}

.profile__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2.5rem;
}

@media (max-width: 560px) {
  .profile__brand {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
