<script setup lang="ts">
import { contactInfo } from '~/utils/nav'

const submitted = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: 'ทั่วไป',
  message: '',
})

function onSubmit() {
  submitted.value = true
  trackGtm('generate_lead', {
    lead_type: 'contact',
    subject: form.subject,
  })
}

useSeoMeta({
  title: 'Contact Us | CX ENERTECH',
  description: 'ติดต่อ CX ENERTECH เพื่อสอบถามบริการ Solar และ EV Charging',
})
</script>

<template>
  <div>
    <PageHero
      title="Contact Us"
      description="ติดต่อทีม CX ENERTECH สำหรับคำปรึกษา ใบเสนอราคา หรือขอสำรวจพื้นที่"
      :crumbs="[{ label: 'Home', to: '/' }, { label: 'Contact' }]"
    />

    <section class="section">
      <div class="container contact">
        <div class="contact__info">
          <span class="section-label">Get in Touch</span>
          <h2 class="section-title">พูดคุยกับเรา</h2>
          <p class="section-lead">
            เรายินดีให้คำปรึกษาเกี่ยวกับ Solar Energy, EV Charging และ Smart Energy Solutions
          </p>

          <ul class="info-list">
            <li>
              <strong>Email</strong>
              <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
            </li>
            <li>
              <strong>Phone</strong>
              <span>{{ contactInfo.phone }}</span>
            </li>
            <li>
              <strong>LINE OA</strong>
              <NuxtLink to="/contact/line">{{ contactInfo.line }}</NuxtLink>
            </li>
            <li>
              <strong>Address</strong>
              <span>{{ contactInfo.address }}</span>
            </li>
          </ul>

          <div class="quick-links">
            <NuxtLink to="/contact/quotation" class="sub-link">ขอใบเสนอราคา <span>→</span></NuxtLink>
            <NuxtLink to="/contact/site-survey" class="sub-link">ขอสำรวจพื้นที่ <span>→</span></NuxtLink>
            <NuxtLink to="/contact/support" class="sub-link">Service &amp; Support <span>→</span></NuxtLink>
            <NuxtLink to="/contact/maps" class="sub-link">Google Maps <span>→</span></NuxtLink>
          </div>
        </div>

        <div class="contact__form-wrap">
          <div v-if="submitted" class="success">
            <h3>ขอบคุณที่ติดต่อเรา</h3>
            <p>ทีม CX ENERTECH จะติดต่อกลับโดยเร็วที่สุด</p>
          </div>
          <form v-else class="form-grid" @submit.prevent="onSubmit">
            <div class="form-grid two-col">
              <div class="form-field">
                <label for="name">ชื่อ-นามสกุล</label>
                <input id="name" v-model="form.name" required type="text" />
              </div>
              <div class="form-field">
                <label for="phone">เบอร์โทร</label>
                <input id="phone" v-model="form.phone" required type="tel" />
              </div>
            </div>
            <div class="form-field">
              <label for="email">อีเมล</label>
              <input id="email" v-model="form.email" required type="email" />
            </div>
            <div class="form-field">
              <label for="subject">หัวข้อ</label>
              <select id="subject" v-model="form.subject">
                <option>ทั่วไป</option>
                <option>Solar Energy</option>
                <option>EV Charging</option>
                <option>Smart Energy</option>
                <option>Partnership</option>
                <option>Career</option>
              </select>
            </div>
            <div class="form-field">
              <label for="message">ข้อความ</label>
              <textarea id="message" v-model="form.message" required />
            </div>
            <button type="submit" class="btn btn-primary">ส่งข้อความ</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
}

.info-list {
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-list li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-list strong {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-teal);
}

.info-list a:hover {
  color: var(--color-solar);
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact__form-wrap {
  background: var(--color-panel);
  padding: 2rem;
  border-top: 3px solid var(--color-lime);
}

.success {
  text-align: center;
  padding: 3rem 1rem;
}

.success h3 {
  color: var(--color-white);
  margin-bottom: 0.5rem;
}

.success p {
  color: var(--color-muted);
}

@media (max-width: 800px) {
  .contact {
    grid-template-columns: 1fr;
  }
}
</style>
