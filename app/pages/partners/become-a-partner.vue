<script setup lang="ts">
import {
  FORM_STEPS,
  OCCUPATIONS,
  OTHER_OPTION,
  PREFERRED_CHANNELS,
  SALES_CHANNELS,
  SALES_DURATIONS,
  emptyPartnerForm,
  resolveOccupation,
  resolveSalesChannelDesc,
  toggleChannel,
} from '~/utils/partner-register'

const config = useRuntimeConfig()
const form = reactive(emptyPartnerForm())
const step = ref(1)
const submitting = ref(false)
const submitted = ref(false)
const duplicate = ref(false)
const errorMsg = ref('')

const benefits = [
  {
    title: 'สินค้าพร้อมขาย',
    body: 'Solar Rooftop, EV Charger และแพ็กเกจติดตั้งที่ทีม CX ซัพพอร์ตให้ครบ',
  },
  {
    title: 'ไม่ต้องสต็อกของ',
    body: 'โฟกัสปิดการขาย ทีมหลังบ้านดูแลสำรวจ ติดตั้ง และบริการหลังการขาย',
  },
  {
    title: 'ฐานลูกค้าของคุณมีค่า',
    body: 'มีลูกค้าบ้านพัก โรงงาน หรือนักลงทุนอยู่แล้ว สามารถต่อยอดเป็นรายได้ได้ทันที',
  },
]

const yesNo = [
  { value: true, label: 'เคย', alt: 'มี' },
  { value: false, label: 'ไม่เคย', alt: 'ไม่มี' },
]

function registerUrl() {
  const direct = String(config.public.partnerRegisterUrl || '').trim()
  return direct || '/api/partners/register'
}

function validateStep(n: number) {
  if (n === 1) {
    if (!form.fullName.trim() || !form.phone.trim()) {
      return 'กรุณากรอกชื่อ–นามสกุล และเบอร์โทรศัพท์'
    }
    if (form.currentOccupation === OTHER_OPTION && !form.currentOccupationOther.trim()) {
      return 'กรุณาระบุอาชีพปัจจุบัน'
    }
  }
  if (n === 2 && form.hasSalesExperience == null) {
    return 'กรุณาเลือกว่าเคยทำงานด้าน Sales มาก่อนหรือไม่'
  }
  if (n === 3) {
    if (form.preferredChannels.length === 0) {
      return 'กรุณาเลือกช่องทางที่ถนัดอย่างน้อย 1 ช่องทาง'
    }
    if (form.hasExistingCustomers == null) {
      return 'กรุณาเลือกว่ามีฐานลูกค้าเดิมหรือไม่'
    }
  }
  if (n === 4 && !form.consent) {
    return 'กรุณายอมรับเงื่อนไขการเก็บข้อมูล'
  }
  return ''
}

function goNext() {
  errorMsg.value = ''
  const msg = validateStep(step.value)
  if (msg) {
    errorMsg.value = msg
    return
  }
  step.value = Math.min(4, step.value + 1)
}

function goBack() {
  errorMsg.value = ''
  step.value = Math.max(1, step.value - 1)
}

async function onSubmit() {
  errorMsg.value = ''
  const msg = validateStep(4)
  if (msg) {
    errorMsg.value = msg
    return
  }

  submitting.value = true
  try {
    const res = await $fetch<{ ok: boolean; duplicate?: boolean }>(registerUrl(), {
      method: 'POST',
      body: {
        ...form,
        fullName: form.fullName.trim(),
        nickname: form.nickname.trim(),
        phone: form.phone.trim(),
        lineId: form.lineId.trim(),
        email: form.email.trim(),
        currentAddress: form.currentAddress.trim(),
        currentOccupation: resolveOccupation(form),
        previousCompanies: form.hasSalesExperience ? form.previousCompanies.trim() : '',
        productsSold: form.hasSalesExperience ? form.productsSold.trim() : '',
        salesDuration: form.hasSalesExperience ? form.salesDuration.trim() : '',
        salesChannelDesc: resolveSalesChannelDesc(form),
        customerBaseTypes: form.hasExistingCustomers ? form.customerBaseTypes.trim() : '',
        maxAnnualSales: form.maxAnnualSales.trim(),
      },
    })
    duplicate.value = Boolean(res.duplicate)
    submitted.value = true
    trackGtm('generate_lead', {
      lead_type: 'partner',
      duplicate: Boolean(res.duplicate),
    })
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMsg.value = e.data?.message || e.message || 'ส่งใบสมัครไม่สำเร็จ กรุณาลองใหม่'
  } finally {
    submitting.value = false
  }
}

const occupationLabel = computed(() => resolveOccupation(form) || '—')
const salesChannelLabel = computed(() => resolveSalesChannelDesc(form) || '—')
const preferredLabel = computed(() =>
  PREFERRED_CHANNELS.filter((c) => form.preferredChannels.includes(c.value))
    .map((c) => c.label)
    .join(', ') || '—',
)

useSeoMeta({
  title: 'สมัคร Sale Freelance Partner | CX ENERTECH',
  description:
    'สมัครเป็นเซลล์อิสระของ CX ENERTECH ขายโซลูชัน Solar และ EV Charging พร้อมทีมซัพพอร์ตการติดตั้ง',
})
</script>

<template>
  <div>
    <PageHero
      title="สมัคร Sale Freelance Partner"
      description="กรอกทีละขั้น ไม่กี่นาที — ทีม CX จะติดต่อกลับเพื่อคุยสินค้าและคอมมิชชั่น"
      :crumbs="[
        { label: 'Home', to: '/' },
        { label: 'Partners', to: '/partners' },
        { label: 'Become a Partner' },
      ]"
    />

    <section class="section">
      <div class="container partner-register">
        <div class="partner-register__intro">
          <span class="section-label">Sale Freelance</span>
          <h2 class="section-title">เหมาะกับใคร</h2>
          <p class="section-lead">
            สำหรับผู้ที่เคยขายสินค้าหรือบริการ และต้องการรายได้จากงานพลังงานสะอาด
            โดยไม่ต้องลงทุนสต็อกหรือทีมติดตั้งเอง
          </p>
          <ul class="benefit-list">
            <li v-for="item in benefits" :key="item.title">
              <strong>{{ item.title }}</strong>
              <span>{{ item.body }}</span>
            </li>
          </ul>
        </div>

        <div class="partner-register__form-wrap">
          <div v-if="submitted" class="success">
            <h3>{{ duplicate ? 'เราได้รับข้อมูลของคุณไว้แล้ว' : 'ส่งใบสมัครเรียบร้อย' }}</h3>
            <p>
              ทีม CX ENERTECH จะติดต่อกลับทางโทรศัพท์หรือ LINE เพื่อพูดคุยรายละเอียด
              คอมมิชชั่น และสินค้าที่คุณจะขาย
            </p>
            <NuxtLink to="/partners" class="btn btn-secondary">กลับหน้าพันธมิตร</NuxtLink>
          </div>

          <form v-else class="form-grid" @submit.prevent="onSubmit">
            <ol class="stepper" aria-label="ขั้นตอนสมัคร">
              <li
                v-for="item in FORM_STEPS"
                :key="item.n"
                class="stepper__item"
                :class="{
                  'is-active': step === item.n,
                  'is-done': step > item.n,
                }"
              >
                <span class="stepper__n">{{ item.n }}</span>
                <span class="stepper__copy">
                  <strong>{{ item.title }}</strong>
                  <small>{{ item.hint }}</small>
                </span>
              </li>
            </ol>

            <div v-show="step === 1" class="form-section">
              <h3>ข้อมูลติดต่อ</h3>
              <p class="form-hint">ใช้สำหรับให้ทีมงานติดต่อกลับเท่านั้น</p>
              <div class="form-grid two-col">
                <div class="form-field">
                  <label for="fullName">ชื่อ–นามสกุล *</label>
                  <input id="fullName" v-model="form.fullName" type="text" autocomplete="name">
                </div>
                <div class="form-field">
                  <label for="nickname">ชื่อเล่น</label>
                  <input id="nickname" v-model="form.nickname" type="text">
                </div>
              </div>
              <div class="form-grid two-col">
                <div class="form-field">
                  <label for="phone">เบอร์โทรศัพท์ *</label>
                  <input id="phone" v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel">
                </div>
                <div class="form-field">
                  <label for="lineId">Line ID</label>
                  <input id="lineId" v-model="form.lineId" type="text">
                </div>
              </div>
              <div class="form-field">
                <label for="email">E-mail</label>
                <input id="email" v-model="form.email" type="email" autocomplete="email">
              </div>
              <div class="form-field">
                <label for="currentAddress">ที่อยู่ปัจจุบัน</label>
                <textarea id="currentAddress" v-model="form.currentAddress" rows="3" />
              </div>
              <div class="form-field">
                <label for="currentOccupation">อาชีพปัจจุบัน</label>
                <select id="currentOccupation" v-model="form.currentOccupation">
                  <option value="">เลือกอาชีพ</option>
                  <option v-for="job in OCCUPATIONS" :key="job" :value="job">{{ job }}</option>
                </select>
              </div>
              <div v-if="form.currentOccupation === OTHER_OPTION" class="form-field">
                <label for="currentOccupationOther">ระบุอาชีพ</label>
                <input id="currentOccupationOther" v-model="form.currentOccupationOther" type="text">
              </div>
            </div>

            <div v-show="step === 2" class="form-section">
              <h3>ประสบการณ์การขาย</h3>
              <fieldset class="form-field">
                <legend>เคยทำงานด้าน Sales มาก่อนหรือไม่ *</legend>
                <div class="choice-row">
                  <label
                    v-for="opt in yesNo"
                    :key="String(opt.value)"
                    class="choice-chip choice-chip--radio"
                    :class="{ 'is-on': form.hasSalesExperience === opt.value }"
                  >
                    <input v-model="form.hasSalesExperience" type="radio" :value="opt.value">
                    <span class="choice-mark" aria-hidden="true" />
                    <span>{{ opt.label }}</span>
                  </label>
                </div>
              </fieldset>

              <template v-if="form.hasSalesExperience">
                <div class="form-field">
                  <label for="previousCompanies">บริษัท / ธุรกิจที่เคยทำ</label>
                  <textarea id="previousCompanies" v-model="form.previousCompanies" rows="3" />
                </div>
                <div class="form-field">
                  <label for="productsSold">สินค้าที่เคยขาย</label>
                  <textarea id="productsSold" v-model="form.productsSold" rows="3" />
                </div>
                <div class="form-field">
                  <label for="salesDuration">ระยะเวลาที่ทำ</label>
                  <select id="salesDuration" v-model="form.salesDuration">
                    <option value="">เลือกระยะเวลา</option>
                    <option v-for="d in SALES_DURATIONS" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </template>

              <fieldset class="form-field">
                <legend>ช่องทางการขาย</legend>
                <p class="form-hint">เลือกได้มากกว่า 1 ข้อ</p>
                <div class="choice-grid">
                  <label
                    v-for="ch in SALES_CHANNELS"
                    :key="ch.value"
                    class="choice-chip"
                    :class="{ 'is-on': form.salesChannels.includes(ch.value) }"
                  >
                    <input
                      type="checkbox"
                      :checked="form.salesChannels.includes(ch.value)"
                      @change="form.salesChannels = toggleChannel(form.salesChannels, ch.value)"
                    >
                    <span class="choice-mark" aria-hidden="true" />
                    <span>{{ ch.label }}</span>
                  </label>
                </div>
              </fieldset>
            </div>

            <div v-show="step === 3" class="form-section">
              <h3>ช่องทางที่ถนัดและฐานลูกค้า</h3>
              <fieldset class="form-field">
                <legend>ช่องทางที่ถนัด *</legend>
                <p class="form-hint">เลือกได้มากกว่า 1 ข้อ</p>
                <div class="choice-grid">
                  <label
                    v-for="ch in PREFERRED_CHANNELS"
                    :key="ch.value"
                    class="choice-chip"
                    :class="{ 'is-on': form.preferredChannels.includes(ch.value) }"
                  >
                    <input
                      type="checkbox"
                      :checked="form.preferredChannels.includes(ch.value)"
                      @change="form.preferredChannels = toggleChannel(form.preferredChannels, ch.value)"
                    >
                    <span class="choice-mark" aria-hidden="true" />
                    <span>{{ ch.label }}</span>
                  </label>
                </div>
              </fieldset>

              <fieldset class="form-field">
                <legend>มีฐานลูกค้าเดิมหรือไม่ *</legend>
                <div class="choice-row">
                  <label
                    class="choice-chip choice-chip--radio"
                    :class="{ 'is-on': form.hasExistingCustomers === true }"
                  >
                    <input v-model="form.hasExistingCustomers" type="radio" :value="true">
                    <span class="choice-mark" aria-hidden="true" />
                    <span>มี</span>
                  </label>
                  <label
                    class="choice-chip choice-chip--radio"
                    :class="{ 'is-on': form.hasExistingCustomers === false }"
                  >
                    <input v-model="form.hasExistingCustomers" type="radio" :value="false">
                    <span class="choice-mark" aria-hidden="true" />
                    <span>ไม่มี</span>
                  </label>
                </div>
              </fieldset>

              <div v-if="form.hasExistingCustomers" class="form-field">
                <label for="customerBaseTypes">หากมีฐานลูกค้า เป็นฐานลูกค้าประเภทใด</label>
                <textarea
                  id="customerBaseTypes"
                  v-model="form.customerBaseTypes"
                  rows="3"
                  placeholder="เช่น บ้านพักอาศัย, โรงงาน, นักลงทุน, ลูกค้าประกัน"
                />
              </div>

              <div class="form-field">
                <label for="maxAnnualSales">ยอดขายสูงสุดที่เคยขายได้ ต่อปี</label>
                <input
                  id="maxAnnualSales"
                  v-model="form.maxAnnualSales"
                  type="text"
                  placeholder="เช่น 2.9 ล้าน, 120 ล้านบาท"
                >
              </div>
            </div>

            <div v-show="step === 4" class="form-section">
              <h3>ตรวจสอบข้อมูล</h3>
              <p class="form-hint">ดูสรุปสั้นๆ ก่อนส่ง ถ้าต้องการแก้ให้กดย้อนกลับ</p>
              <dl class="review">
                <div>
                  <dt>ชื่อ</dt>
                  <dd>{{ form.fullName || '—' }}{{ form.nickname ? ` (${form.nickname})` : '' }}</dd>
                </div>
                <div>
                  <dt>ติดต่อ</dt>
                  <dd>{{ form.phone }}{{ form.lineId ? ` · LINE ${form.lineId}` : '' }}</dd>
                </div>
                <div>
                  <dt>อาชีพปัจจุบัน</dt>
                  <dd>{{ occupationLabel }}</dd>
                </div>
                <div>
                  <dt>ประสบการณ์ขาย</dt>
                  <dd>
                    {{ form.hasSalesExperience ? 'เคย' : 'ไม่เคย' }}
                    <template v-if="form.hasSalesExperience && form.salesDuration">
                      · {{ form.salesDuration }}
                    </template>
                  </dd>
                </div>
                <div>
                  <dt>ช่องทางการขาย</dt>
                  <dd>{{ salesChannelLabel }}</dd>
                </div>
                <div>
                  <dt>ช่องทางที่ถนัด</dt>
                  <dd>{{ preferredLabel }}</dd>
                </div>
                <div>
                  <dt>ฐานลูกค้าเดิม</dt>
                  <dd>{{ form.hasExistingCustomers ? 'มี' : 'ไม่มี' }}</dd>
                </div>
              </dl>

              <label class="consent" :class="{ 'is-on': form.consent }">
                <input v-model="form.consent" type="checkbox">
                <span class="choice-mark" aria-hidden="true" />
                <span>
                  ข้าพเจ้ายินยอมให้ CX ENERTECH เก็บและใช้ข้อมูลนี้เพื่อติดต่อสมัครเป็น Sale Freelance Partner
                </span>
              </label>
            </div>

            <label class="hp" aria-hidden="true">
              เว็บไซต์
              <input v-model="form.websiteUrl" type="text" tabindex="-1" autocomplete="off">
            </label>

            <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>

            <div class="step-actions">
              <button
                v-if="step > 1"
                type="button"
                class="btn btn-secondary"
                @click="goBack"
              >
                ย้อนกลับ
              </button>
              <button
                v-if="step < 4"
                type="button"
                class="btn btn-primary"
                @click="goNext"
              >
                ถัดไป
              </button>
              <button
                v-else
                type="submit"
                class="btn btn-primary"
                :disabled="submitting"
              >
                {{ submitting ? 'กำลังส่ง…' : 'ส่งใบสมัคร' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <CtaBand
      title="อยากคุยก่อนสมัคร?"
      description="ทีมขายพร้อมอธิบายสินค้า คอมมิชชั่น และพื้นที่ที่ยังเปิดรับ partner"
      primary-label="ติดต่อเรา"
      primary-to="/contact"
      secondary-label="ดูพันธมิตร"
      secondary-to="/partners"
    />
  </div>
</template>

<style scoped>
.partner-register {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 3rem;
  align-items: start;
}

.benefit-list {
  margin-top: 1.75rem;
  display: grid;
  gap: 1rem;
}

.benefit-list li {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.1rem;
  background: var(--color-panel);
  border-left: 3px solid var(--color-lime);
}

.benefit-list strong {
  font-family: var(--font-display);
  color: var(--color-white);
}

.benefit-list span {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.partner-register__form-wrap {
  background: var(--color-panel);
  padding: 2rem;
  border-top: 3px solid var(--color-lime);
}

.stepper {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stepper__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  color: var(--color-muted);
}

.stepper__n {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
}

.stepper__copy {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stepper__copy strong {
  font-size: 0.78rem;
  color: var(--color-silver);
}

.stepper__copy small {
  color: var(--color-muted);
  font-size: 0.7rem;
}

.stepper__item.is-active .stepper__n,
.stepper__item.is-done .stepper__n {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
}

.stepper__item.is-active .stepper__copy strong {
  color: var(--color-white);
}

.form-section h3 {
  font-size: 1.05rem;
  color: var(--color-lime-soft);
  margin-bottom: 0.25rem;
}

.form-field textarea {
  min-height: 0;
}

.form-hint {
  color: var(--color-muted);
  font-size: 0.8rem;
  margin: 0.2rem 0 0.7rem;
}

.choice-row,
.choice-grid {
  display: grid;
  gap: 0.65rem;
}

.choice-row {
  grid-template-columns: 1fr 1fr;
}

.choice-grid {
  grid-template-columns: 1fr 1fr;
}

.form-field .choice-chip,
.form-section .choice-chip,
.form-field .consent,
.form-section .consent {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  margin-bottom: 0;
  padding: 0.9rem 1rem;
  border: 1.5px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-silver);
  cursor: pointer;
  font-size: 0.95rem;
  line-height: 1.35;
  font-weight: 500;
  user-select: none;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}

.choice-chip input,
.consent input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.choice-mark {
  flex: 0 0 auto;
  width: 1.25rem;
  height: 1.25rem;
  border: 1.5px solid rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  background: #0f0f0f;
  display: grid;
  place-items: center;
}

.choice-chip--radio .choice-mark {
  border-radius: 999px;
}

.choice-chip.is-on,
.consent.is-on {
  border-color: var(--color-lime);
  color: var(--color-white);
  background: rgba(212, 255, 0, 0.1);
}

.choice-chip.is-on .choice-mark,
.consent.is-on .choice-mark {
  border-color: var(--color-lime);
  background: var(--color-lime);
}

.choice-chip.is-on .choice-mark::after {
  content: '';
  width: 0.38rem;
  height: 0.7rem;
  border: solid #111;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.choice-chip--radio.is-on .choice-mark::after {
  width: 0.5rem;
  height: 0.5rem;
  border: 0;
  border-radius: 999px;
  background: #111;
  transform: none;
}

.consent {
  align-items: flex-start;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.consent.is-on .choice-mark::after {
  content: '';
  width: 0.38rem;
  height: 0.7rem;
  border: solid #111;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}

.choice-chip:focus-within,
.consent:focus-within {
  outline: 2px solid var(--color-lime);
  outline-offset: 2px;
}

.review {
  display: grid;
  gap: 0.85rem;
  margin: 0.5rem 0 1.25rem;
}

.review > div {
  display: grid;
  gap: 0.15rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.review dt {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.review dd {
  color: var(--color-white);
}

.step-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
}

.form-error {
  color: #ffb4b4;
  font-size: 0.9rem;
}

.hp {
  position: absolute;
  left: -9999px;
  height: 0;
  overflow: hidden;
}

.success {
  text-align: center;
  padding: 3rem 1rem;
  display: grid;
  gap: 1rem;
  justify-items: center;
}

.success h3 {
  color: var(--color-white);
}

.success p {
  color: var(--color-muted);
  max-width: 36rem;
}

fieldset.form-field {
  border: 0;
}

fieldset.form-field legend {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-white);
  margin-bottom: 0.4rem;
}

@media (max-width: 900px) {
  .partner-register {
    grid-template-columns: 1fr;
  }

  .stepper__copy small {
    display: none;
  }

  .choice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
