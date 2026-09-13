<script setup lang="ts">
import { formatThb } from '~/utils/solar-format'
import type { SolarWebsitePackage } from '~/utils/solar-packages'
import {
  QUOTE_PAYMENT_METHODS,
  paymentMethodsForIntent,
  primaryPaymentMethod,
  type QuotePaymentMethod,
} from '~/utils/quote-options'

type EvPkg = {
  code: string
  name_th: string
  tagline?: string
  product_type?: string
  power_kw_min?: number
  price_promo?: number | null
  price_list?: number | null
  price_capex?: number | null
}

const route = useRoute()
const config = useRuntimeConfig()
const submitted = ref(false)
const submitting = ref(false)
const duplicate = ref(false)
const errorMsg = ref('')
const step = ref(1)

const isFinance = computed(() => String(route.query.intent || '') === 'finance')
const financeAsset = computed(() => (String(route.query.type || '') === 'ev' ? 'ev' : 'solar'))

function defaultServiceType() {
  if (String(route.query.type || '') === 'ev') {
    return isFinance.value ? 'EV Charging Station' : 'EV Charging'
  }
  if (isFinance.value || String(route.query.type || '') === 'solar') return 'Solar Rooftop'
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
  siteOwnership: 'own' as 'own' | 'rent_with_consent' | 'unsure',
  monthlyBill: '',
  budgetHint: '',
  packagePick: (typeof route.query.package === 'string' ? route.query.package : '') || '__custom__',
})

const paymentMethods = ref<QuotePaymentMethod[]>(
  isFinance.value ? ['hire_purchase'] : ['cash'],
)

watch(
  () => [String(route.query.type || ''), String(route.query.intent || '')] as const,
  () => {
    form.type = defaultServiceType()
    if (typeof route.query.package === 'string' && route.query.package) {
      form.packagePick = route.query.package
    }
  },
  { immediate: true },
)

const catalogAsset = computed(() => {
  const t = form.type.toLowerCase()
  if (t.includes('ev') || t.includes('charger')) return 'ev' as const
  return 'solar' as const
})

const payOptions = computed(() => {
  const allowed = paymentMethodsForIntent(isFinance.value)
  return QUOTE_PAYMENT_METHODS.filter((m) => allowed.includes(m.value))
})

const STEPS = computed(() =>
  isFinance.value
    ? [
        { n: 1, title: 'ข้อมูลส่วนตัว', hint: 'ผู้ติดต่อ' },
        { n: 2, title: 'ความต้องการ', hint: 'ไซต์และแพ็กเกจ' },
        { n: 3, title: 'รูปแบบสินเชื่อ', hint: 'เลือกได้หลายรายการ' },
      ]
    : [
        { n: 1, title: 'ข้อมูลส่วนตัว', hint: 'ผู้ติดต่อ' },
        { n: 2, title: 'แพ็กเกจ / ความต้องการ', hint: 'ให้ทีมเสนอราคา' },
        { n: 3, title: 'รูปแบบการลงทุน', hint: 'เลือกได้หลายรายการ' },
      ],
)

const solarPackages = ref<SolarWebsitePackage[]>([])
const evPackages = ref<EvPkg[]>([])
const packagesLoading = ref(false)

async function loadPackages() {
  packagesLoading.value = true
  try {
    if (catalogAsset.value === 'ev') {
      const res = await $fetch<{ packages: EvPkg[] }>('/api/ev/packages', {
        query: { type: 'turnkey' },
      })
      evPackages.value = (res.packages || []).slice(0, 9)
    } else {
      const res = await $fetch<{ packages: SolarWebsitePackage[] }>('/api/solar/packages')
      solarPackages.value = (res.packages || []).slice(0, 9)
    }
  } catch {
    solarPackages.value = []
    evPackages.value = []
  } finally {
    packagesLoading.value = false
  }
}

watch(catalogAsset, () => {
  void loadPackages()
}, { immediate: true })

function quoteUrl() {
  const direct = String(config.public.quoteRequestUrl || '').trim()
  return direct || '/api/contact/quotation'
}

function parseMoney(raw: string): number | undefined {
  const n = Number(raw.replace(/[^\d.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : undefined
}

function evPrice(pkg: EvPkg) {
  return pkg.price_promo || pkg.price_list || pkg.price_capex || null
}

const catalogPackages = computed(() => {
  if (catalogAsset.value === 'ev') {
    return evPackages.value
      .filter((pkg) => pkg.product_type !== 'investment')
      .map((pkg) => ({
        code: pkg.code,
        name_th: pkg.name_th,
        price: evPrice(pkg),
      }))
  }
  return solarPackages.value.map((pkg) => ({
    code: pkg.code,
    name_th: pkg.name_th,
    price: pkg.price_from || null,
  }))
})

const extraPackage = computed(() => {
  const pick = form.packagePick
  if (!pick || pick === '__custom__') return null
  if (catalogPackages.value.some((pkg) => pkg.code === pick)) return null
  return { code: pick, name_th: pick, price: null as number | null }
})

const selectedPackageLabel = computed(() => {
  if (form.packagePick === '__custom__' || !form.packagePick) return 'ให้ทีมเสนอตามความต้องการ'
  const found = catalogPackages.value.find((pkg) => pkg.code === form.packagePick)
  return found ? `${found.name_th} (${found.code})` : form.packagePick
})

const nextStepTitle = computed(
  () => STEPS.value.find((item) => item.n === step.value + 1)?.title || '',
)

function togglePay(value: QuotePaymentMethod) {
  const cur = paymentMethods.value
  if (cur.includes(value)) {
    paymentMethods.value = cur.filter((v) => v !== value)
  } else {
    paymentMethods.value = [...cur, value]
  }
}

function selectedPackageCode() {
  if (!form.packagePick || form.packagePick === '__custom__') return ''
  return form.packagePick
}

function validateStep(n: number): string {
  if (n === 1) {
    if (!form.name.trim()) return 'กรุณากรอกชื่อ–นามสกุล'
    if (!form.phone.trim()) return 'กรุณากรอกเบอร์โทร'
    if (!form.email.trim()) return 'กรุณากรอกอีเมล'
    if (isFinance.value && form.borrowerType === 'company' && !form.company.trim()) {
      return 'กรุณากรอกชื่อบริษัท / นิติบุคคล'
    }
    return ''
  }
  if (n === 2) {
    if (!form.type) return 'กรุณาเลือกประเภทบริการ'
    if (form.packagePick !== '__custom__' && !form.packagePick) {
      return 'กรุณาเลือกแพ็กเกจ หรือเลือกให้ทีมเสนอตามความต้องการ'
    }
    return ''
  }
  if (!paymentMethods.value.length) return 'กรุณาเลือกรูปแบบที่สนใจอย่างน้อย 1 รายการ'
  return ''
}

function goNext() {
  errorMsg.value = ''
  const msg = validateStep(step.value)
  if (msg) {
    errorMsg.value = msg
    return
  }
  step.value = Math.min(3, step.value + 1)
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goBack() {
  errorMsg.value = ''
  step.value = Math.max(1, step.value - 1)
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function onSubmit() {
  errorMsg.value = ''
  const last = validateStep(3)
  if (last) {
    errorMsg.value = last
    return
  }
  submitting.value = true
  try {
    const monthlyBill = parseMoney(form.monthlyBill)
    const estimatedCost = parseMoney(form.budgetHint)
    const methods = paymentMethods.value
    const packageCode = selectedPackageCode()
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
        packageCode: packageCode || (typeof route.query.package === 'string' ? route.query.package : ''),
        pagePath: route.fullPath,
        sourceDetail: 'cxenertech.com',
        websiteUrl: form.websiteUrl,
        entryKind: isFinance.value ? 'finance' : 'quote_form',
        intent: isFinance.value ? 'finance' : 'quote',
        borrowerType: isFinance.value ? form.borrowerType : undefined,
        financeProduct: primaryPaymentMethod(methods),
        paymentMethods: methods,
        siteOwnership: isFinance.value ? form.siteOwnership : undefined,
        monthlyBill,
        estimatedCost,
        budgetHint: form.budgetHint.trim() || undefined,
      },
    })
    duplicate.value = Boolean(res.duplicate)
    submitted.value = true
    trackGtm('generate_lead', {
      lead_type: isFinance.value ? 'finance' : 'quotation',
      service_type: form.type,
      package_code: packageCode,
      payment_methods: methods.join(','),
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
      ? 'สมัครสินเชื่อ EV Station'
      : 'สมัครสินเชื่อโซล่าเซลล์'
    : 'ขอใบเสนอราคาโซล่าเซลล์และ EV Station',
)
const seoDescription = computed(() =>
  isFinance.value
    ? financeAsset.value === 'solar'
      ? 'สมัครสินเชื่อโซล่าเซลล์ — ส่งข้อมูลไซต์ให้ CX ENERTECH สำรวจ ทำใบเสนอราคา และจัดเอกสารให้สถาบันการเงินพิจารณา ไม่ใช่การอนุมัติบนเว็บ'
      : 'ส่งข้อมูลไซต์ให้ CX ENERTECH สำรวจ ทำใบเสนอราคา และจัดชุดเอกสารผู้ขายให้ธนาคารหรือลีสพิจารณา ไม่ใช่การอนุมัติสินเชื่อบนเว็บ'
    : 'ขอใบเสนอราคาติดตั้งโซล่าเซลล์ หรือ EV Station จาก CX ENERTECH ตามไซต์จริง เลือกแพ็กเกจและรูปแบบการจ่ายได้',
)

usePageSeo({
  title: seoTitle.value,
  description: seoDescription.value,
  path: '/contact/quotation',
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ติดต่อเรา', path: '/contact' },
    {
      name: isFinance.value ? 'สมัครสินเชื่อ' : 'ขอใบเสนอราคา',
      path: '/contact/quotation',
    },
  ],
})
</script>

<template>
  <div>
    <PageHero
      :title="
        isFinance
          ? financeAsset === 'ev'
            ? 'สมัครสินเชื่อ EV Station'
            : 'สมัครสินเชื่อโซล่าเซลล์'
          : 'ขอใบเสนอราคา'
      "
      :description="
        isFinance
          ? 'ผ่อนเป็นเจ้าของระบบ — กรอก 3 ขั้น ทีมสำรวจไซต์แล้วจัดเอกสารให้สถาบันการเงินพิจารณา'
          : 'กรอก 3 ขั้น: ข้อมูลติดต่อ แพ็กเกจหรือความต้องการ แล้วเลือกรูปแบบจ่ายได้มากกว่า 1 ทาง'
      "
      :crumbs="[
        { label: 'หน้าแรก', to: '/' },
        { label: 'ติดต่อเรา', to: '/contact' },
        { label: isFinance ? 'สมัครสินเชื่อ' : 'ขอใบเสนอราคา' },
      ]"
    />

    <section class="section">
      <div class="container quote">
        <div v-if="submitted" class="success">
          <p class="success__kicker">CX ENERTECH</p>
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
          <div class="success__actions">
            <NuxtLink to="/" class="btn btn-primary btn-lg">กลับหน้าแรก</NuxtLink>
            <NuxtLink
              :to="isFinance ? (financeAsset === 'ev' ? '/ev-charging/packages' : '/solar/rooftop/packages') : '/contact'"
              class="btn btn-secondary"
            >
              {{ isFinance ? 'ดูแพ็กเกจ' : 'ช่องทางติดต่ออื่น' }}
            </NuxtLink>
          </div>
        </div>

        <form v-else class="quote__form" @submit.prevent="onSubmit">
          <ol class="stepper" aria-label="ขั้นตอน">
            <li
              v-for="item in STEPS"
              :key="item.n"
              class="stepper__item"
              :class="{ 'is-active': step === item.n, 'is-done': step > item.n }"
            >
              <span class="stepper__n">{{ item.n }}</span>
              <span class="stepper__copy">
                <strong>{{ item.title }}</strong>
                <small>{{ item.hint }}</small>
              </span>
            </li>
          </ol>

          <p class="quote__lead">
            <template v-if="isFinance">
              ฟอร์มนี้สำหรับ<strong>สมัครสินเชื่อ / ผ่อน</strong> ไม่ใช่การอนุมัติบนเว็บ
              <template v-if="financeAsset === 'solar'">
                ถ้าจ่ายก้อน
                <NuxtLink class="quote__lead-link" to="/contact/quotation?type=solar">ขอใบเสนอราคา</NuxtLink>
              </template>
              <template v-else>
                ถ้าจ่ายก้อน
                <NuxtLink class="quote__lead-link" to="/contact/quotation?type=ev">ขอใบเสนอราคา</NuxtLink>
              </template>
            </template>
            <template v-else>
              ต้องการผ่อนเป็นเจ้าของระบบ?
              <NuxtLink class="quote__lead-link" to="/solar/finance">โซล่าเซลล์</NuxtLink>
              หรือ
              <NuxtLink class="quote__lead-link" to="/ev-charging/finance">EV Station</NuxtLink>
            </template>
          </p>

          <div v-if="step === 1" class="form-section">
            <h2>ข้อมูลส่วนตัว</h2>
            <div class="form-grid two-col">
              <div class="form-field">
                <label for="name">ชื่อ–นามสกุล *</label>
                <input id="name" v-model="form.name" required type="text" maxlength="100" autocomplete="name">
              </div>
              <div class="form-field">
                <label for="phone">เบอร์โทร *</label>
                <input id="phone" v-model="form.phone" required type="tel" inputmode="tel" autocomplete="tel">
              </div>
            </div>
            <div class="form-grid two-col">
              <div class="form-field">
                <label for="email">อีเมล *</label>
                <input id="email" v-model="form.email" required type="email" autocomplete="email">
              </div>
              <div class="form-field">
                <label for="lineId">Line ID</label>
                <input id="lineId" v-model="form.lineId" type="text" maxlength="64" placeholder="เช่น cxenertech">
              </div>
            </div>
            <div class="form-grid two-col">
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
                >
              </div>
              <div class="form-field">
                <label for="province">จังหวัด</label>
                <input id="province" v-model="form.province" type="text" maxlength="100" placeholder="เช่น กรุงเทพมหานคร">
              </div>
            </div>
            <div v-if="isFinance" class="form-field">
              <label for="borrowerType">ผู้ขอเป็น *</label>
              <select id="borrowerType" v-model="form.borrowerType" required>
                <option value="individual">บุคคลธรรมดา</option>
                <option value="company">นิติบุคคล / บริษัท</option>
              </select>
            </div>
          </div>

          <div v-if="step === 2" class="form-section">
            <h2>{{ isFinance ? 'ไซต์และความต้องการ' : 'เลือกแพ็กเกจ หรือบอกความต้องการ' }}</h2>
            <div class="form-grid two-col">
              <div class="form-field">
                <label for="type">ประเภทบริการ *</label>
                <select id="type" v-model="form.type" required>
                  <option>Solar Rooftop</option>
                  <option>Solar Energy</option>
                  <option>Solar Farm</option>
                  <option>Solar EPC</option>
                  <option>EV Charging</option>
                  <option>Home Charger</option>
                  <option>EV Charging Station</option>
                  <option>Smart Energy</option>
                </select>
              </div>
              <div class="form-field">
                <label for="capacity">ขนาดโดยประมาณ (kW)</label>
                <input id="capacity" v-model="form.capacity" type="text" placeholder="เช่น 10 kW">
              </div>
            </div>

            <fieldset class="form-field">
              <legend>แพ็กเกจที่สนใจ</legend>
              <p class="form-hint">เลือกแพ็กเกจอ้างอิง หรือให้ทีมเสนอตามไซต์จริง</p>
              <div v-if="packagesLoading" class="form-hint">กำลังโหลดแพ็กเกจ…</div>
              <div class="choice-grid">
                <label
                  class="choice"
                  :class="{ 'is-on': form.packagePick === '__custom__' }"
                >
                  <input v-model="form.packagePick" type="radio" value="__custom__">
                  <strong>ให้ทีมเสนอให้</strong>
                  <small>ยังไม่เลือกแพ็กเกจ — ประเมินจากไซต์และความต้องการ</small>
                </label>
                <label
                  v-if="extraPackage"
                  class="choice"
                  :class="{ 'is-on': form.packagePick === extraPackage.code }"
                >
                  <input v-model="form.packagePick" type="radio" :value="extraPackage.code">
                  <strong>{{ extraPackage.name_th }}</strong>
                  <small>{{ extraPackage.code }} · จากลิงก์แพ็กเกจ</small>
                </label>
                <label
                  v-for="pkg in catalogPackages"
                  :key="pkg.code"
                  class="choice"
                  :class="{ 'is-on': form.packagePick === pkg.code }"
                >
                  <input v-model="form.packagePick" type="radio" :value="pkg.code">
                  <strong>{{ pkg.name_th }}</strong>
                  <small>
                    {{ pkg.code }}
                    <template v-if="pkg.price"> · {{ formatThb(pkg.price) }}</template>
                  </small>
                </label>
              </div>
            </fieldset>

            <div v-if="isFinance" class="form-grid two-col">
              <div class="form-field">
                <label for="siteOwnership">ความเป็นเจ้าของพื้นที่ *</label>
                <select id="siteOwnership" v-model="form.siteOwnership" required>
                  <option value="own">เป็นเจ้าของหลังคา / ที่จอด</option>
                  <option value="rent_with_consent">เช่า — มีหรือจะขอความยินยอมเจ้าของ</option>
                  <option value="unsure">ยังไม่แน่ใจ</option>
                </select>
              </div>
              <div class="form-field">
                <label for="monthlyBill">บิลค่าไฟคร่าว ๆ (บาท/เดือน)</label>
                <input id="monthlyBill" v-model="form.monthlyBill" type="text" inputmode="numeric" placeholder="เช่น 8000">
              </div>
            </div>
            <div v-else class="form-field">
              <label for="monthlyBill">บิลค่าไฟคร่าว ๆ (บาท/เดือน)</label>
              <input id="monthlyBill" v-model="form.monthlyBill" type="text" inputmode="numeric" placeholder="เช่น 8000">
            </div>
            <div class="form-field">
              <label for="message">รายละเอียดความต้องการ</label>
              <textarea
                id="message"
                v-model="form.message"
                placeholder="ประเภทอาคาร ที่อยู่ไซต์ ช่วงเวลาที่อยากติดตั้ง หรือเงื่อนไขพิเศษ"
              />
            </div>
          </div>

          <div v-if="step === 3" class="form-section">
            <h2>{{ isFinance ? 'รูปแบบสินเชื่อที่สนใจ' : 'รูปแบบที่สนใจลงทุน' }}</h2>
            <p class="recap">{{ form.type }} · {{ selectedPackageLabel }}</p>
            <p class="form-hint">เลือกได้มากกว่า 1 รายการ — ทีมจะเสนอทางที่เหมาะกับไซต์ของคุณ</p>
            <div class="choice-grid">
              <label
                v-for="opt in payOptions"
                :key="opt.value"
                class="choice"
                :class="{ 'is-on': paymentMethods.includes(opt.value) }"
              >
                <input
                  type="checkbox"
                  :checked="paymentMethods.includes(opt.value)"
                  @change="togglePay(opt.value)"
                >
                <strong>{{ opt.label }}</strong>
                <small>{{ opt.hint }}</small>
              </label>
            </div>
            <div class="form-field" style="margin-top: 1rem">
              <label for="budgetHint">งบลงทุนคร่าว ๆ (ถ้ามี)</label>
              <input id="budgetHint" v-model="form.budgetHint" type="text" maxlength="64" placeholder="เช่น 350,000">
            </div>
          </div>

          <div class="hp" aria-hidden="true">
            <label for="websiteUrl">เว็บไซต์</label>
            <input id="websiteUrl" v-model="form.websiteUrl" type="text" tabindex="-1" autocomplete="off">
          </div>

          <p v-if="errorMsg" class="quote__error">{{ errorMsg }}</p>

          <div class="step-actions">
            <button v-if="step > 1" type="button" class="btn btn-secondary" @click="goBack">ย้อนกลับ</button>
            <button v-if="step < 3" type="button" class="btn btn-primary btn-lg" @click="goNext">
              ถัดไป · {{ nextStepTitle }}
            </button>
            <button v-else type="submit" class="btn btn-primary btn-lg" :disabled="submitting">
              {{
                submitting
                  ? 'กำลังส่ง…'
                  : isFinance
                    ? 'ส่งคำขอสมัครสินเชื่อ'
                    : 'ส่งคำขอใบเสนอราคา'
              }}
            </button>
          </div>

          <p class="quote__alt">หรือคุยกับทีมทันที</p>
          <RequestChannels compact />
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quote {
  max-width: 760px;
}

.quote__form {
  background: linear-gradient(180deg, #171717 0%, var(--color-panel) 40%);
  padding: 1.5rem 1.35rem 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top: 3px solid var(--color-lime);
  display: grid;
  gap: 1.15rem;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.stepper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.stepper__item {
  display: flex;
  gap: 0.55rem;
  align-items: center;
  padding: 0.65rem 0.7rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #101010;
  min-height: 3.4rem;
}

.stepper__item.is-active {
  border-color: rgba(212, 255, 0, 0.55);
  background: rgba(212, 255, 0, 0.08);
}

.stepper__item.is-done {
  border-color: rgba(212, 255, 0, 0.28);
}

.stepper__n {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  background: #222;
  color: var(--color-white);
  flex-shrink: 0;
}

.stepper__item.is-active .stepper__n,
.stepper__item.is-done .stepper__n {
  background: var(--color-lime);
  color: #111;
}

.stepper__copy {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
  min-width: 0;
}

.stepper__copy strong {
  font-size: 0.82rem;
  color: var(--color-white);
  line-height: 1.2;
}

.stepper__copy small {
  color: var(--color-muted);
  font-size: 0.7rem;
}

.quote__lead {
  color: var(--color-muted);
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0;
}

.quote__lead-link {
  color: var(--color-lime);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

.form-section h2 {
  font-size: 1.15rem;
  color: var(--color-white);
  margin: 0 0 0.85rem;
}

.form-section fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

.form-section legend {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-white);
  margin-bottom: 0.4rem;
}

.form-hint {
  color: var(--color-muted);
  font-size: 0.86rem;
  margin: 0 0 0.75rem;
}

.recap {
  margin: 0 0 0.75rem;
  padding: 0.7rem 0.85rem;
  background: #101010;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-white);
  font-size: 0.88rem;
}

.choice-grid {
  display: grid;
  gap: 0.55rem;
}

.choice {
  display: grid;
  gap: 0.2rem;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #101010;
  cursor: pointer;
  position: relative;
}

.choice input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.choice strong {
  color: var(--color-white);
  font-size: 0.95rem;
}

.choice small {
  color: var(--color-muted);
  font-size: 0.8rem;
  line-height: 1.4;
}

.choice.is-on {
  border-color: var(--color-lime);
  background: rgba(212, 255, 0, 0.08);
  box-shadow: inset 3px 0 0 var(--color-lime);
}

.choice:hover {
  border-color: rgba(212, 255, 0, 0.45);
}

.step-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  justify-content: flex-end;
}

.step-actions .btn-lg {
  flex: 1 1 12rem;
}

.quote__alt {
  margin: 0.35rem 0 0;
  color: var(--color-muted);
  font-size: 0.82rem;
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
  border-top: 3px solid var(--color-lime);
}

.success__kicker {
  font-family: var(--font-display);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-lime);
  font-size: 0.72rem;
  font-weight: 700;
  margin: 0 0 0.65rem;
}

.success h2 {
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.success p {
  color: var(--color-muted);
  margin-bottom: 1.5rem;
}

.success__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  justify-content: center;
}

@media (max-width: 640px) {
  .stepper {
    grid-template-columns: 1fr;
  }

  .stepper__copy small {
    display: none;
  }

  .quote__form {
    padding: 1.15rem 1rem 1.4rem;
  }
}
</style>
