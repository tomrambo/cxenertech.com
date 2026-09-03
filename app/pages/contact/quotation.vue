<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const submitted = ref(false)
const submitting = ref(false)
const duplicate = ref(false)
const errorMsg = ref('')

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  province: '',
  type:
    (route.query.type as string) === 'ev'
      ? 'EV Charging'
      : (route.query.type as string) === 'solar'
        ? 'Solar Energy'
        : 'Solar Energy',
  capacity: '',
  message: '',
  websiteUrl: '',
})

function quoteUrl() {
  const direct = String(config.public.quoteRequestUrl || '').trim()
  return direct || '/api/contact/quotation'
}

async function onSubmit() {
  errorMsg.value = ''
  submitting.value = true
  try {
    const res = await $fetch<{ ok: boolean; duplicate?: boolean }>(quoteUrl(), {
      method: 'POST',
      body: {
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        province: form.province.trim(),
        type: form.type,
        capacity: form.capacity.trim(),
        message: form.message.trim(),
        packageCode: typeof route.query.package === 'string' ? route.query.package : '',
        pagePath: route.path,
        sourceDetail: 'cxenertech.com',
        websiteUrl: form.websiteUrl,
      },
    })
    duplicate.value = Boolean(res.duplicate)
    submitted.value = true
    trackGtm('generate_lead', {
      lead_type: 'quotation',
      service_type: form.type,
      package_code: typeof route.query.package === 'string' ? route.query.package : '',
      duplicate: Boolean(res.duplicate),
    })
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMsg.value = e.data?.message || e.message || 'ส่งคำขอไม่สำเร็จ กรุณาลองใหม่'
  } finally {
    submitting.value = false
  }
}

usePageSeo({
  title: 'ขอใบเสนอราคาโซล่าเซลล์และ EV Station',
  description: 'ขอใบเสนอราคาติดตั้งโซล่าเซลล์ หรือ EV Station จาก CX ENERTECH ตามไซต์จริง',
  path: '/contact/quotation',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ติดต่อเรา', path: '/contact' },
    { name: 'ขอใบเสนอราคา', path: '/contact/quotation' },
  ],
})
</script>

<template>
  <div>
    <PageHero
      title="ขอใบเสนอราคา"
      description="กรอกข้อมูลโครงการของคุณ ทีม CX ENERTECH จะจัดทำข้อเสนอที่เหมาะสม"
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ติดต่อเรา', to: '/contact' },
        { label: 'ขอใบเสนอราคา' },
      ]"
    />

    <section class="section">
      <div class="container quote">
        <div v-if="submitted" class="success">
          <h2>{{ duplicate ? 'มีคำขอนี้อยู่แล้ว' : 'ได้รับคำขอแล้ว' }}</h2>
          <p>
            {{
              duplicate
                ? 'ทีมขายได้รับข้อมูลจากเบอร์นี้แล้ว และจะติดต่อกลับตามคิวที่มีอยู่'
                : 'ขอบคุณที่สนใจบริการของ CX ENERTECH ทีมขายจะติดต่อกลับภายใน 1–2 วันทำการ'
            }}
          </p>
          <NuxtLink to="/" class="btn btn-outline-dark">กลับหน้าแรก</NuxtLink>
        </div>

        <form v-else class="form-grid quote__form" @submit.prevent="onSubmit">
          <div class="form-grid two-col">
            <div class="form-field">
              <label for="name">ชื่อ-นามสกุล *</label>
              <input id="name" v-model="form.name" required type="text" maxlength="100" />
            </div>
            <div class="form-field">
              <label for="company">บริษัท / องค์กร</label>
              <input id="company" v-model="form.company" type="text" maxlength="255" />
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
              <label for="province">จังหวัด</label>
              <input id="province" v-model="form.province" type="text" maxlength="100" placeholder="เช่น กรุงเทพมหานคร" />
            </div>
          </div>
          <div class="form-field">
            <label for="capacity">ขนาดโดยประมาณ (kW / MW)</label>
            <input id="capacity" v-model="form.capacity" type="text" placeholder="เช่น 100 kW" />
          </div>
          <div class="form-field">
            <label for="message">รายละเอียดโครงการ</label>
            <textarea id="message" v-model="form.message" placeholder="สถานที่ ประเภทอาคาร ความต้องการพิเศษ ฯลฯ" />
          </div>
          <div class="hp" aria-hidden="true">
            <label for="websiteUrl">เว็บไซต์</label>
            <input id="websiteUrl" v-model="form.websiteUrl" type="text" tabindex="-1" autocomplete="off" />
          </div>
          <p v-if="errorMsg" class="quote__error">{{ errorMsg }}</p>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? 'กำลังส่ง…' : 'ส่งคำขอใบเสนอราคา' }}
          </button>
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

.quote__error {
  color: #f87171;
  font-size: 0.9rem;
  margin: 0;
}

.hp {
  position: absolute;
  left: -9999px;
  height: 0;
  overflow: hidden;
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
