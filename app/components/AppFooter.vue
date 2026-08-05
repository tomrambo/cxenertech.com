<script setup lang="ts">
import { footerNav, contactInfo } from '~/utils/nav'
</script>

<template>
  <footer class="footer">
    <div class="container-wide footer__top">
      <div class="footer__brand">
        <NuxtLink to="/" class="footer__logo-link">
          <BrandLogo variant="light" :height="42" />
        </NuxtLink>
        <p class="footer__legal">{{ contactInfo.legalTh }}</p>
        <p class="footer__tagline">{{ contactInfo.tagline }}</p>
        <p class="footer__desc">
          Empowering a Sustainable Future with Smart Energy &amp; Technology Solutions
        </p>
        <div class="footer__contact">
          <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
          <span>{{ contactInfo.phone }}</span>
          <span>LINE: {{ contactInfo.line }}</span>
          <a href="https://www.cxenertech.com" target="_blank" rel="noopener">www.cxenertech.com</a>
        </div>
      </div>

      <div class="footer__cols">
        <div>
          <h4>บริษัท</h4>
          <ul>
            <li v-for="item in footerNav.company" :key="item.to">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4>Solar Energy</h4>
          <ul>
            <li v-for="item in footerNav.solar" :key="item.to">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4>EV Charging</h4>
          <ul>
            <li v-for="item in footerNav.ev" :key="item.to">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4>ทรัพยากร</h4>
          <ul>
            <li v-for="item in footerNav.resources" :key="item.to">
              <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
            </li>
            <li><NuxtLink to="/smart-energy">Smart Energy</NuxtLink></li>
            <li><NuxtLink to="/contact">ติดต่อเรา</NuxtLink></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container-wide footer__bottom-inner">
        <p>© {{ new Date().getFullYear() }} {{ contactInfo.legalEn }}. All rights reserved.</p>
        <div class="footer__bottom-links">
          <NuxtLink to="/contact/quotation">ขอใบเสนอราคา</NuxtLink>
          <NuxtLink to="/contact/site-survey">ขอสำรวจพื้นที่</NuxtLink>
          <NuxtLink to="/partners/become-a-partner">เป็นพันธมิตร</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #080808;
  color: var(--color-white);
  border-top: 1px solid rgba(212, 255, 0, 0.1);
}

.footer__top {
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 3rem;
  padding-block: 4rem 3rem;
}

.footer__logo-link {
  display: inline-block;
  margin-bottom: 0.75rem;
}

.footer__legal {
  font-size: 0.8rem;
  opacity: 0.55;
  margin-bottom: 0.5rem;
}

.footer__tagline {
  color: var(--color-lime);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0.35rem 0 1rem;
  font-family: var(--font-display);
  font-weight: 600;
}

.footer__desc {
  font-size: 0.95rem;
  opacity: 0.65;
  max-width: 280px;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.footer__contact a:hover {
  color: var(--color-lime);
}

.footer__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.footer__cols h4 {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-lime);
  margin-bottom: 1rem;
}

.footer__cols a {
  font-size: 0.9rem;
  opacity: 0.65;
  transition: opacity 0.25s, color 0.25s;
  display: inline-block;
  padding: 0.25rem 0;
}

.footer__cols a:hover {
  opacity: 1;
  color: var(--color-lime-soft);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-block: 1.25rem;
}

.footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.8rem;
  opacity: 0.5;
}

.footer__bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer__bottom-links a:hover {
  color: var(--color-lime);
  opacity: 1;
}

@media (max-width: 900px) {
  .footer__top {
    grid-template-columns: 1fr;
  }

  .footer__cols {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .footer__cols {
    grid-template-columns: 1fr;
  }
}
</style>
