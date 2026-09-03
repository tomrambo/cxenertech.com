<template>
  <div>
    <PageHero
      title="ดาวน์โหลด Company Profile"
      description="เอกสารแนะนำบริษัท CX ENERTECH CO., LTD."
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'เกี่ยวกับเรา', to: '/about' },
        { label: 'ดาวน์โหลดโปรไฟล์' },
      ]"
    />

    <section class="section">
      <div class="container download">
        <div class="download__card">
          <BrandLogo variant="dark" :height="52" />
          <h2>Company Profile (PDF)</h2>
          <p>บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด — CX ENERTECH CO., LTD.</p>
          <p class="download__meta">Smart Energy &amp; EV Infrastructure</p>
          <a class="btn btn-primary" href="/docs/CX-ENERTECH-Company-Profile.pdf" download>
            ดาวน์โหลด PDF
          </a>
          <p class="download__hint">
            หากไฟล์ยังไม่พร้อม ติดต่อ
            <a href="mailto:phachirawat.cx@gmail.com">phachirawat.cx@gmail.com</a>
            เพื่อรับ Company Profile
          </p>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'ดาวน์โหลดโปรไฟล์บริษัท | CX ENERTECH',
  description: 'ดาวน์โหลดเอกสารแนะนำบริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด ผู้รับติดตั้งโซล่าเซลล์และ EV Station',
  path: '/about/download',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'เกี่ยวกับเรา', path: '/about' },
    { name: 'ดาวน์โหลดโปรไฟล์', path: '/about/download' },
  ],
})
</script>

<style scoped>
.download {
  max-width: 560px;
}

.download__card {
  background: var(--color-panel);
  border-top: 3px solid var(--color-gold);
  padding: 2.5rem 2rem;
  text-align: center;
}

.download__card h2 {
  margin: 1.25rem 0 0.5rem;
  color: var(--color-white);
}

.download__card p {
  color: var(--color-muted);
}

.download__meta {
  font-family: var(--font-display);
  font-size: 0.8rem !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gold) !important;
  margin: 0.75rem 0 1.75rem !important;
}

.download__hint {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.download__hint a {
  color: var(--color-gold-deep);
  text-decoration: underline;
}
</style>
