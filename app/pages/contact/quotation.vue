<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const submitted = ref(false)
const submitting = ref(false)
const duplicate = ref(false)
const errorMsg = ref('')

const isFinance = computed(() => String(route.query.intent || '') === 'finance')
const financeAsset = computed(() => (String(route.query.type || '') === 'ev' ? 'ev' : 'solar'))

function defaultServiceType() {
  if (String(route.query.type || '') === 'ev') {
    return isFinance.value ? 'EV Charging Station' : 'EV Charging'
  }
  if (isFinance.value) return 'Solar Rooftop'
  return 'Solar Energy'
}

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  lineId: '',
  province: '',
  type: defaultServiceType(),
  capacity: '',
  message: '',
  websiteUrl: '',
  borrowerType: 'individual' as 'individual' | 'company',
  financeProduct: 'unsure' as 'hire_purchase' | 'leasing' | 'unsure',
  siteOwnership: 'own' as 'own' | 'rent_with_consent' | 'unsure',
  monthlyBill: '',
  budgetHint: '',
})

watch(
  () => [String(route.query.type || ''), String(route.query.intent || '')] as const,
  () => {
    form.type = defaultServiceType()
  },
  { immediate: true },
)

function quoteUrl() {
  const direct = String(config.public.quoteRequestUrl || '').trim()
  return direct || '/api/contact/quotation'
}

function parseMoney(raw: string): number | undefined {
  const n = Number(raw.replace(/[^\d.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : undefined
}

async function onSubmit() {
  errorMsg.value = ''
  if (isFinance.value && form.borrowerType === 'company' && !form.company.trim()) {
    errorMsg.value = 'กรุณากรอกชื่อบริษัท / นิติบุคคล'
    return
  }
  submitting.value = true
  try {
    const monthlyBill = parseMoney(form.monthlyBill)
    const estimatedCost = parseMoney(form.budgetHint)
    const res = await $fetch<{ ok: boolean; duplicate?: boolean }>(quoteUrl(), {
      method: 'POST',
      body: {
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        lineId: form.lineId.trim().replace(/^@+/, ''),
        province: form.province.trim(),
        type: form.type,
        capacity: form.capacity.trim(),
        message: form.message.trim(),
        packageCode: typeof route.query.package === 'string' ? route.query.package : '',
        pagePath: route.fullPath,
        sourceDetail: 'cxenertech.com',
        websiteUrl: form.websiteUrl,
        entryKind: isFinance.value ? 'finance' : 'quote_form',
        intent: isFinance.value ? 'finance' : 'quote',
        borrowerType: isFinance.value ? form.borrowerType : undefined,
        financeProduct: isFinance.value ? form.financeProduct : undefined,
        siteOwnership: isFinance.value ? form.siteOwnership : undefined,
        monthlyBill,
        estimatedCost,
        budgetHint: isFinance.value ? form.budgetHint.trim() : undefined,
      },
    })
    duplicate.value = Boolean(res.duplicate)
    submitted.value = true
    trackGtm('generate_lead', {
      lead_type: isFinance.value ? 'finance' : 'quotation',
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

const seoTitle = computed(() =>
  isFinance.value
    ? financeAsset.value === 'ev'
      ? 'ขอสินเชื่อ EV Station'
      : 'ขอสินเชื่อโซล่าเซลล์'
    : 'ขอใบเสนอราคาโซล่าเซลล์และ EV Station',
)
const seoDescription = computed(() =>
  isFinance.value
    ? 'ส่งข้อมูลไซต์ให้ CX ENERTECH สำรวจ ทำใบเสนอราคา และจัดชุดเอกสารผู้ขายให้ธนาคารหรือลีสพิจารณา ไม่ใช่การอนุมัติสินเชื่อบนเว็บ'
    : 'ขอใบเสนอราคาติดตั้งโซล่าเซลล์ หรือ EV Station จาก CX ENERTECH ตามไซต์จริง',
)

usePageSeo({
  title: seoTitle.value,
  description: seoDescription.value,
  path: '/contact/quotation',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ติดต่อเรา', path: '/contact' },
    {
      name: isFinance.value ? 'ขอสินเชื่อ' : 'ขอใบเสนอราคา',
      path: '/contact/quotation',
    },
  ],
})
</script>

<template>
  <div>
    <PageHero
      :title="isFinance ? 'ขอจัดสินเชื่อติดตั้ง' : 'ขอใบเสนอราคา'"
      :description="
        isFinance
          ? 'CX ENERTECH เป็นผู้ติดตั้งและจัดชุดเอกสารผู้ขาย ไม่ใช่ธนาคาร — ทีมจะสำรวจไซต์แล้วทำใบเสนอราคาให้สถาบันการเงินพิจารณา'
          : 'กรอกข้อมูลโครงการของคุณ ทีม CX ENERTECH จะจัดทำข้อเสนอที่เหมาะสม'
      "
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ติดต่อเรา', to: '/contact' },
        { label: isFinance ? 'ขอสินเชื่อ' : 'ขอใบเสนอราคา' },
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
                : isFinance
                  ? 'ทีมจะติดต่อเพื่อนัดสำรวจ ทำใบเสนอราคาตามไซต์ แล้วจัดชุดเอกสารให้ธนาคารหรือลีสพิจารณา'
                  : 'ขอบคุณที่สนใจบริการของ CX ENERTECH ทีมขายจะติดต่อกลับภายใน 1–2 วันทำการ'
            }}
          </p>
          <NuxtLink to="/" class="btn btn-outline-dark">กลับหน้าแรก</NuxtLink>
        </div>

        <form v-else class="form-grid quote__form" @submit.prevent="onSubmit">
          <p v-if="isFinance" class="quote__lead">
            การส่งฟอร์มนี้ยังไม่ใช่การขอสินเชื่อกับธนาคาร และไม่มีการอนุมัติบนเว็บ
            เราใช้ข้อมูลเพื่อคัดกรองความเป็นเจ้าของพื้นที่ นัดสำรวจ และทำ BOQ
            <template v-if="financeAsset === 'solar'">
              หากยังไม่ต้องการเป็นเจ้าของระบบ ดู
              <NuxtLink to="/solar/ppa">PPA ไม่ต้องลงทุนเอง</NuxtLink>
              หรือ
              <NuxtLink to="/contact/quotation?type=solar">ขอใบเสนอราคาซื้อขาด</NuxtLink>
            </template>
            <template v-else>
              หากต้องการโมเดลลงทุนสถานี ดู
              <NuxtLink to="/ev-charging/investment">ลงทุน EV Station</NuxtLink>
              หรือ
              <NuxtLink to="/contact/quotation?type=ev">ขอใบเสนอราคาซื้อขาด</NuxtLink>
            </template>
          </p>
          <p v-else class="quote__lead">
            ต้องการผ่อนแล้วเป็นเจ้าของระบบ?
            <NuxtLink to="/solar/finance">สินเชื่อโซล่าเซลล์</NuxtLink>
            หรือ
            <NuxtLink to="/ev-charging/finance">สินเชื่อ EV Station</NuxtLink>
          </p>

          <RequestChannels compact />

          <div class="form-grid two-col">
            <div class="form-field">
              <label for="name">ชื่อ-นามสกุล *</label>
              <input id="name" v-model="form.name" required type="text" maxlength="100" />
            </div>
            <div class="form-field">
              <label for="company">
                บริษัท / องค์กร{{ isFinance && form.borrowerType === 'company' ? ' *' : '' }}
              </label>
              <input
                id="company"
                v-model="form.company"
                type="text"
                maxlength="255"
                :required="isFinance && form.borrowerType === 'company'"
              />
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
          <div class="form-field">
            <label for="lineId">Line ID</label>
            <input
              id="lineId"
              v-model="form.lineId"
              type="text"
              maxlength="64"
              autocomplete="off"
              placeholder="เช่น cxenertech หรือ ID ที่ค้นหาใน LINE"
            />
          </div>

          <template v-if="isFinance">
            <div class="form-grid two-col">
              <div class="form-field">
                <label for="borrowerType">ผู้ขอเป็น *</label>
                <select id="borrowerType" v-model="form.borrowerType" required>
                  <option value="individual">บุคคลธรรมดา</option>
                  <option value="company">นิติบุคคล / บริษัท</option>
                </select>
              </div>
              <div class="form-field">
                <label for="financeProduct">รูปแบบที่สนใจ *</label>
                <select id="financeProduct" v-model="form.financeProduct" required>
                  <option value="hire_purchase">ผ่อน (เช่าซื้อ)</option>
                  <option value="leasing">ลีส</option>
                  <option value="unsure">ยังไม่แน่ใจ</option>
                </select>
              </div>
            </div>
            <div class="form-grid two-col">
              <div class="form-field">
                <label for="siteOwnership">ความเป็นเจ้าของพื้นที่ *</label>
                <select id="siteOwnership" v-model="form.siteOwnership" required>
                  <option value="own">เป็นเจ้าของหลังคา / ที่จอด</option>
                  <option value="rent_with_consent">เช่า — มีหรือจะขอความยินยอมเจ้าของ</option>
                  <option value="unsure">ยังไม่แน่ใจ</option>
                </select>
              </div>
              <div class="form-field">
                <label for="monthlyBill">บิลค่าไฟ / รายได้คร่าว ๆ (บาทต่อเดือน)</label>
                <input
                  id="monthlyBill"
                  v-model="form.monthlyBill"
                  type="text"
                  inputmode="numeric"
                  maxlength="20"
                  placeholder="เช่น 8000"
                />
              </div>
            </div>
            <div class="form-field">
              <label for="budgetHint">งบลงทุนคร่าว ๆ (ถ้ามี)</label>
              <input
                id="budgetHint"
                v-model="form.budgetHint"
                type="text"
                maxlength="64"
                placeholder="เช่น 350,000"
              />
            </div>
          </template>

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
            {{
              submitting
                ? 'กำลังส่ง…'
                : isFinance
                  ? 'ส่งคำขอจัดสินเชื่อ'
                  : 'ส่งคำขอใบเสนอราคา'
            }}
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

.quote__lead {
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0 0 0.5rem;
}

.quote__lead a {
  color: var(--color-lime);
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
