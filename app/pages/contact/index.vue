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

usePageSeo({
  title: 'ติดต่อ CX ENERTECH | ขอใบเสนอราคาโซล่าเซลล์และ EV',
  description: 'ติดต่อทีม CX ENERTECH ทางฟอร์ม LINE โทร หรือขอสินเชื่อติดตั้งโซล่าเซลล์และ EV Station',
  path: '/contact',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ติดต่อเรา', path: '/contact' },
  ],
})
</script>

<template>
  <div>
    <PageHero
      title="ติดต่อเรา"
      description="ขอสินค้าได้หลายช่องทาง — ใบเสนอราคา LINE โทร สินเชื่อ หรือนัดสำรวจพื้นที่"
      :crumbs="[{ label: 'หน้าแรก', to: '/' }, { label: 'ติดต่อเรา' }]"
    />

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-label">ช่องทางขอสินค้า</span>
          <h2 class="section-title">เลือกช่องทางที่คุยสะดวก</h2>
          <p class="section-lead">
            ฟอร์ม แชท LINE สายตรง หรือโมเดลผ่อน — ทีมเดียวกันเป็นผู้รับเรื่อง ไม่ต้องยื่นธนาคารบนเว็บ
          </p>
        </div>
        <RequestChannels />
        <p class="address">{{ contactInfo.address }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact">
        <div class="contact__info">
          <span class="section-label">Get in Touch</span>
          <h2 class="section-title">ฝากข้อความ</h2>
          <p class="section-lead">
            หากยังไม่พร้อมกรอกใบเสนอราคา ส่งข้อความทั่วไปไว้ก่อนได้ ทีมจะติดต่อกลับ
          </p>
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
.address {
  margin-top: 1.5rem;
  color: var(--color-muted);
  font-size: 0.92rem;
}

.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
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
