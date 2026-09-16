<script setup lang="ts">
const config = useRuntimeConfig()
const submitted = ref(false)
const submitting = ref(false)
const duplicate = ref(false)
const errorMsg = ref('')
const unlocked = ref(false)

const form = reactive({
  name: '',
  phone: '',
  lineId: '',
  email: '',
  company: '',
  websiteUrl: '',
})

const fileHref = '/downloads/cx-factory-solar-sizing-guide.pdf'

function quoteUrl() {
  const direct = String(config.public.quoteRequestUrl || '').trim()
  return direct || '/api/contact/quotation'
}

async function onSubmit() {
  errorMsg.value = ''
  if (!form.lineId.trim()) {
    errorMsg.value = 'กรุณากรอก Line ID เพื่อส่งคู่มือและนัดคุยต่อ'
    return
  }
  submitting.value = true
  try {
    const res = await $fetch<{ ok: boolean; duplicate?: boolean }>(quoteUrl(), {
      method: 'POST',
      body: {
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        lineId: form.lineId.trim().replace(/^@+/, ''),
        type: 'Solar Energy',
        message: 'ขอคู่มือคำนวณขนาดไฟโซล่าเซลล์สำหรับโรงงาน',
        pagePath: '/knowledge/downloads/factory-solar-guide',
        sourceDetail: 'cxenertech.com/lead-magnet',
        websiteUrl: form.websiteUrl,
        entryKind: 'lead_magnet',
        intent: 'download_guide',
      },
    })
    duplicate.value = Boolean(res.duplicate)
    submitted.value = true
    unlocked.value = true
    trackGtm('generate_lead', {
      lead_type: 'lead_magnet',
      service_type: 'Solar Energy',
      asset_name: 'factory-solar-sizing-guide',
      duplicate: Boolean(res.duplicate),
    })
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMsg.value = e.data?.message || e.message || 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <p v-if="unlocked" class="magnet__ok">
      {{ duplicate ? 'มีคำขอนี้อยู่แล้ว ดาวน์โหลดคู่มือได้ด้านล่าง' : 'ได้รับข้อมูลแล้ว ดาวน์โหลดคู่มือได้ทันที' }}
    </p>
    <p v-if="errorMsg" class="magnet__err" role="alert">{{ errorMsg }}</p>
    <form v-if="!unlocked" class="form-grid" @submit.prevent="onSubmit">
      <div class="form-grid two-col">
        <div class="form-field">
          <label for="magnet-name">ชื่อ-นามสกุล *</label>
          <input id="magnet-name" v-model="form.name" required type="text" maxlength="100" />
        </div>
        <div class="form-field">
          <label for="magnet-phone">เบอร์โทร *</label>
          <input id="magnet-phone" v-model="form.phone" required type="tel" />
        </div>
      </div>
      <div class="form-grid two-col">
        <div class="form-field">
          <label for="magnet-line">Line ID *</label>
          <input
            id="magnet-line"
            v-model="form.lineId"
            required
            type="text"
            maxlength="64"
            autocomplete="off"
            placeholder="ID ที่ค้นหาใน LINE"
          />
        </div>
        <div class="form-field">
          <label for="magnet-email">อีเมล *</label>
          <input id="magnet-email" v-model="form.email" required type="email" />
        </div>
      </div>
      <div class="form-field">
        <label for="magnet-company">บริษัท / โรงงาน</label>
        <input id="magnet-company" v-model="form.company" type="text" maxlength="255" />
      </div>
      <input v-model="form.websiteUrl" class="magnet__hp" tabindex="-1" autocomplete="off" aria-hidden="true" />
      <button class="btn btn-primary" type="submit" :disabled="submitting">
        {{ submitting ? 'กำลังส่ง…' : 'รับคู่มือและให้ทีมติดต่อ' }}
      </button>
    </form>
    <p v-if="unlocked" class="magnet__file">
      <a class="btn btn-primary" :href="fileHref" download>ดาวน์โหลด PDF</a>
      <NuxtLink class="btn btn-secondary" to="/contact/quotation?type=solar">ขอสำรวจหน้างาน</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.magnet__ok {
  color: var(--color-lime);
  margin-bottom: 1rem;
}
.magnet__err {
  color: #ff8a8a;
  margin-bottom: 1rem;
}
.magnet__hp {
  position: absolute;
  left: -9999px;
  height: 0;
  opacity: 0;
}
.magnet__file {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}
.form-grid {
  margin-top: 0.5rem;
}
button[disabled] {
  opacity: 0.6;
}
</style>
