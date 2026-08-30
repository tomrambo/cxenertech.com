<script setup lang="ts">
const route = useRoute()
const submitted = ref(false)

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  type: (route.query.type as string) === 'ev' ? 'EV Charging' : (route.query.type as string) === 'solar' ? 'Solar Energy' : 'Solar Energy',
  capacity: '',
  message: '',
})

function onSubmit() {
  submitted.value = true
  trackGtm('generate_lead', {
    lead_type: 'quotation',
    service_type: form.type,
    package_code: typeof route.query.package === 'string' ? route.query.package : '',
  })
}

useSeoMeta({
  title: 'ขอใบเสนอราคา | CX ENERTECH',
  description: 'ขอใบเสนอราคาระบบ Solar Energy หรือ EV Charging จาก CX ENERTECH',
})
</script>

<template>
  <div>
    <PageHero
      title="ขอใบเสนอราคา"
      description="กรอกข้อมูลโครงการของคุณ ทีม CX ENERTECH จะจัดทำข้อเสนอที่เหมาะสม"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'Contact', to: '/contact' },
        { label: 'Request Quotation' },
      ]"
    />

    <section class="section">
      <div class="container quote">
        <div v-if="submitted" class="success">
          <h2>ได้รับคำขอแล้ว</h2>
          <p>ขอบคุณที่สนใจบริการของ CX ENERTECH ทีมขายจะติดต่อกลับภายใน 1–2 วันทำการ</p>
          <NuxtLink to="/" class="btn btn-outline-dark">กลับหน้าแรก</NuxtLink>
        </div>

        <form v-else class="form-grid quote__form" @submit.prevent="onSubmit">
          <div class="form-grid two-col">
            <div class="form-field">
              <label for="name">ชื่อ-นามสกุล *</label>
              <input id="name" v-model="form.name" required type="text" />
            </div>
            <div class="form-field">
              <label for="company">บริษัท / องค์กร</label>
              <input id="company" v-model="form.company" type="text" />
            </div>
          </div>
          <div class="form-grid two-col">
            <div class="form-field">
              <label for="email">อีเมล *</label>
              <input id="email" v-model="form.email" required type="email" />
            </div>
            <div class="form-field">
              <label for="phone">เบอร์โทร *</label>
              <input id="phone" v-model="form.phone" required type="tel" />
            </div>
          </div>
          <div class="form-grid two-col">
            <div class="form-field">
              <label for="type">ประเภทบริการ *</label>
              <select id="type" v-model="form.type" required>
                <option>Solar Energy</option>
                <option>Solar Rooftop</option>
                <option>Solar Farm</option>
                <option>Solar EPC</option>
                <option>EV Charging</option>
                <option>Home Charger</option>
                <option>EV Charging Station</option>
                <option>Smart Energy</option>
              </select>
            </div>
            <div class="form-field">
              <label for="capacity">ขนาดโดยประมาณ (kW / MW)</label>
              <input id="capacity" v-model="form.capacity" type="text" placeholder="เช่น 100 kW" />
            </div>
          </div>
          <div class="form-field">
            <label for="message">รายละเอียดโครงการ</label>
            <textarea id="message" v-model="form.message" placeholder="สถานที่ ประเภทอาคาร ความต้องการพิเศษ ฯลฯ" />
          </div>
          <button type="submit" class="btn btn-primary">ส่งคำขอใบเสนอราคา</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quote {
  max-width: 720px;
}

.quote__form {
  background: var(--color-panel);
  padding: 2rem;
  border-top: 3px solid var(--color-lime);
}

.success {
  text-align: center;
  padding: 3rem 1.5rem;
  background: var(--color-panel);
}

.success h2 {
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.success p {
  color: var(--color-muted);
  margin-bottom: 1.5rem;
}
</style>
