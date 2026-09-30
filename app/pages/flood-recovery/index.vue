<script setup lang="ts">
import {
  bookableFloodServices,
  type FloodMarketplaceService,
} from '~/utils/flood-marketplace'
import {
  FLOOD_OTHER_PROVINCE,
  FLOOD_PROVINCES,
  allowedDates,
  floodFormCopy,
  floodPage,
  formatFloodDate,
  formatFloodBaht,
  slotLabel,
  type FloodAsset,
  type FloodSlot,
} from '~/utils/flood-recovery'

type SlotRow = { time: FloodSlot; remaining: number }
type DateRow = { date: string; slots: SlotRow[] }
type BookingPayload = {
  ref: string
  packageId: string
  packageName: string
  depositThb: number
  date: string
  slot: FloodSlot
  phone: string
  name: string
  status: 'awaiting_deposit' | 'deposit_declared'
}
type PayState = {
  duplicate: boolean
  held: boolean
  booking: BookingPayload
  payment: { qrImage: string | null; merchantReference: string }
}

const { locale } = useLocale()
const page = computed(() => floodPage(locale.value))
const formCopy = computed(() => floodFormCopy(locale.value))
const seoFaqs = floodPage('th').faqs

usePageSeo({
  title: 'จองช่างตรวจและซ่อมไฟฟ้าหลังน้ำท่วม',
  description:
    'จองช่างตรวจและซ่อมไฟฟ้าหลังน้ำท่วมในกทม.และ 5 จังหวัดปริมณฑล เลือกวันเข้าบริการและช่วงเวลาที่สะดวก',
  path: '/flood-recovery',
  image: '/images/flood/flood-hero.jpg',
  faq: seoFaqs,
  crumbs: [
    { name: 'หน้าแรก', path: '/' },
    { name: 'ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม', path: '/flood-recovery' },
  ],
})

const dates = ref<DateRow[]>([])
const today = ref('')
const slotsError = ref('')
const slotsPending = ref(true)
const services = ref<FloodMarketplaceService[]>([])
const servicesError = ref('')
const packageId = ref('')
const placeQuery = ref('')
const placeHits = ref<Array<{ placeId: string; description: string }>>([])
const placePending = ref(false)
const slipFile = ref<File | null>(null)
const form = reactive({
  asset: 'both' as FloodAsset,
  date: '',
  slot: '' as FloodSlot | '',
  name: '',
  phone: '',
  lineId: '',
  email: '',
  province: FLOOD_PROVINCES[0],
  address: '',
  placeId: '',
  lat: null as number | null,
  lng: null as number | null,
  note: '',
  websiteUrl: '',
  payerNote: '',
})
const submitting = ref(false)
const paying = ref(false)
const errorMsg = ref('')
const pay = ref<PayState | null>(null)
const done = ref<BookingPayload | null>(null)
const unmatched = ref(false)
const STORAGE_KEY = 'cx-flood-booking'

const visibleDates = computed(() => {
  if (!today.value) return []
  const allowed = new Set(allowedDates(packageId.value, today.value))
  return dates.value.filter((row) => allowed.has(row.date))
})

const selectedPackage = computed(() => services.value.find((item) => item.slug === packageId.value) || null)
const bookableServices = computed(() => bookableFloodServices({ categoryName: '', categorySlug: '', services: services.value }))
const primaryPackages = computed(() => bookableServices.value.filter((item) => item.kind === 'package'))
const addonServices = computed(() => bookableServices.value.filter((item) => item.kind === 'addon'))
const quoteServices = computed(() => services.value.filter((item) => !item.bookable))
const showAddons = ref(false)

function serviceName(pkg: FloodMarketplaceService) {
  return locale.value === 'en' && pkg.nameEn ? pkg.nameEn : pkg.name
}

function dateParts(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  const loc = locale.value === 'en' ? 'en-GB' : 'th-TH'
  return {
    weekday: new Intl.DateTimeFormat(loc, { weekday: 'short', timeZone: 'UTC' }).format(date),
    day: new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(date),
  }
}

useHead(() => ({
  script: [
    {
      key: 'ld-flood-service',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม',
        serviceType: 'Post-flood electrical inspection',
        image: 'https://www.cxenertech.com/images/flood/flood-hero.jpg',
        url: 'https://www.cxenertech.com/flood-recovery',
        provider: {
          '@type': 'Electrician',
          name: 'CX ENERTECH',
          url: 'https://www.cxenertech.com',
          image: 'https://www.cxenertech.com/logo-on-dark.png',
          telephone: '+66996246444',
          areaServed: FLOOD_PROVINCES.map((name) => ({ '@type': 'AdministrativeArea', name })),
        },
        areaServed: FLOOD_PROVINCES.map((name) => ({ '@type': 'AdministrativeArea', name })),
        offers: bookableServices.value.map((pkg) => ({
          '@type': 'Offer',
          name: pkg.name,
          priceCurrency: 'THB',
          price: pkg.priceThb,
          description: pkg.priceHint || pkg.description,
          url: 'https://www.cxenertech.com/flood-recovery#book',
        })),
      }),
    },
  ],
}))

watch(packageId, () => {
  const allowed = new Set(visibleDates.value.map((row) => row.date))
  if (form.date && !allowed.has(form.date)) {
    form.date = ''
    form.slot = ''
  }
})

watch(
  () => form.date,
  () => {
    const row = visibleDates.value.find((item) => item.date === form.date)
    if (!row?.slots.some((slot) => slot.time === form.slot && slot.remaining > 0)) form.slot = ''
  },
)

function slotChoices() {
  return visibleDates.value.find((item) => item.date === form.date)?.slots ?? []
}

async function loadSlots() {
  slotsPending.value = true
  slotsError.value = ''
  try {
    const res = await $fetch<{ today: string; dates: DateRow[] }>('/api/flood/slots')
    today.value = res.today
    dates.value = res.dates
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    slotsError.value = e.data?.message || e.message || formCopy.value.retry
  } finally {
    slotsPending.value = false
  }
}

function safeQr(image: string | null) {
  if (!image) return null
  if (image.startsWith('data:image/png;base64,') || image.startsWith('data:image/jpeg;base64,')) return image
  return null
}

function remember(state: PayState) {
  pay.value = { ...state, payment: { ...state.payment, qrImage: safeQr(state.payment.qrImage) } }
  if (import.meta.client) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pay.value))
}

let placeTimer = 0
function onPlaceInput() {
  form.placeId = ''
  form.lat = null
  form.lng = null
  window.clearTimeout(placeTimer)
  const q = placeQuery.value.trim()
  if (q.length < 2) {
    placeHits.value = []
    return
  }
  placeTimer = window.setTimeout(async () => {
    placePending.value = true
    try {
      const res = await $fetch<{ suggestions: Array<{ placeId: string; description: string }> }>('/api/flood/places', {
        query: { q },
      })
      placeHits.value = res.suggestions
    } catch {
      placeHits.value = []
    } finally {
      placePending.value = false
    }
  }, 280)
}

async function choosePlace(hit: { placeId: string; description: string }) {
  placePending.value = true
  errorMsg.value = ''
  try {
    const res = await $fetch<{ place: { placeId: string; address: string; lat: number; lng: number } }>(
      '/api/flood/places',
      { query: { placeId: hit.placeId } },
    )
    form.placeId = res.place.placeId
    form.address = res.place.address
    form.lat = res.place.lat
    form.lng = res.place.lng
    placeQuery.value = res.place.address
    placeHits.value = []
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMsg.value = e.data?.message || e.message || formCopy.value.noPlaces
  } finally {
    placePending.value = false
  }
}

async function loadPackages() {
  servicesError.value = ''
  try {
    const res = await $fetch<{ services: FloodMarketplaceService[] }>('/api/flood/packages')
    services.value = res.services
    if (!bookableServices.value.some((item) => item.slug === packageId.value)) {
      packageId.value = bookableServices.value[0]?.slug || ''
    }
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    servicesError.value = e.data?.message || e.message || formCopy.value.retry
  }
}

async function onSubmit() {
  errorMsg.value = ''
  if (!form.placeId || form.lat == null || form.lng == null) {
    errorMsg.value = locale.value === 'en' ? 'Choose the site from Google Maps' : 'กรุณาเลือกที่อยู่จาก Google Map'
    return
  }
  if (!form.date || !form.slot) {
    errorMsg.value = locale.value === 'en' ? 'Choose a date and arrival window' : 'กรุณาเลือกวันที่และช่วงเวลา'
    return
  }
  submitting.value = true
  try {
    const res = await $fetch<PayState & { ok: boolean }>('/api/flood/bookings', {
      method: 'POST',
      body: {
        packageId: packageId.value,
        date: form.date,
        slot: form.slot,
        name: form.name,
        phone: form.phone,
        lineId: form.lineId,
        email: form.email,
        province: form.province === FLOOD_OTHER_PROVINCE ? formCopy.value.other : form.province,
        address: form.address,
        placeId: form.placeId,
        lat: form.lat,
        lng: form.lng,
        asset: form.asset,
        note: form.note,
        websiteUrl: form.websiteUrl,
      },
    })
    remember(res)
    done.value = null
    trackGtm('flood_booking_created', {
      package_id: packageId.value,
      deposit: res.booking.depositThb,
      duplicate: res.duplicate,
    })
    await nextTick()
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMsg.value = e.data?.message || e.message || (locale.value === 'en' ? 'Booking failed' : 'จองไม่สำเร็จ')
  } finally {
    submitting.value = false
  }
}

function onSlip(event: Event) {
  const input = event.target as HTMLInputElement
  slipFile.value = input.files?.[0] || null
}

async function onDeclare() {
  if (!pay.value || !slipFile.value) {
    errorMsg.value = locale.value === 'en' ? 'Attach the transfer slip' : 'กรุณาแนบสลิป'
    return
  }
  paying.value = true
  errorMsg.value = ''
  try {
    const body = new FormData()
    body.append('ref', pay.value.booking.ref)
    body.append('phone', pay.value.booking.phone)
    body.append('payerNote', form.payerNote)
    body.append('slip', slipFile.value)
    const res = await $fetch<{ ok: boolean; booking: BookingPayload | null }>('/api/flood/deposit', {
      method: 'POST',
      body,
    })
    unmatched.value = !res.booking
    done.value = res.booking || pay.value.booking
    pay.value = null
    if (import.meta.client) sessionStorage.removeItem(STORAGE_KEY)
    trackGtm('flood_deposit_declared', { package_id: done.value.packageId })
  } catch (err: unknown) {
    const e = err as { data?: { message?: string }; message?: string }
    errorMsg.value = e.data?.message || e.message || (locale.value === 'en' ? 'Could not send the notice' : 'แจ้งโอนไม่สำเร็จ')
  } finally {
    paying.value = false
  }
}

onMounted(() => {
  loadPackages()
  loadSlots()
  const raw = sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return
  try {
    const saved = JSON.parse(raw) as PayState
    if (saved?.booking?.status === 'awaiting_deposit' && saved.booking.ref && saved.payment) {
      pay.value = { ...saved, payment: { ...saved.payment, qrImage: safeQr(saved.payment.qrImage) } }
    }
  } catch {
    sessionStorage.removeItem(STORAGE_KEY)
  }
})
</script>

<template>
  <div class="flood">
    <section class="page-hero flood-hero">
      <div class="container flood-hero__grid">
        <div>
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <NuxtLink to="/">{{ locale === 'en' ? 'Home' : 'หน้าแรก' }}</NuxtLink>
            <span aria-hidden="true">/</span>
            <span>{{ locale === 'en' ? 'Flood recovery' : 'ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม' }}</span>
          </nav>
          <h1 class="animate-fade-up">{{ page.heroTitle }}</h1>
          <p class="animate-fade-up animate-delay-1">{{ page.heroLead }}</p>
          <div class="hero-actions">
            <a href="#book" class="btn btn-primary">{{ page.bookCta }} <span aria-hidden="true">→</span></a>
            <a href="#packages" class="btn btn-secondary">{{ page.detailCta }}</a>
          </div>
        </div>
        <figure class="flood-hero__figure">
          <img
            src="/images/flood/flood-hero.jpg"
            :alt="page.heroImageAlt"
            width="1600"
            height="900"
            fetchpriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>

    <section class="proof" :aria-label="locale === 'en' ? 'Campaign facts' : 'จุดเด่นของบริการ'">
      <div class="container proof__row">
        <p v-for="item in page.proof" :key="item">{{ item }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container flood-split">
        <div>
          <span class="section-label">CX ENERTECH</span>
          <h2 class="section-title">{{ page.problemTitle }}</h2>
          <p class="section-lead">{{ page.problemBody }}</p>
        </div>
        <figure class="scene">
          <img
            src="/images/flood/flood-panel.jpg"
            :alt="page.panelImageAlt"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
          />
          <figcaption>{{ page.area }}</figcaption>
        </figure>
      </div>
    </section>

    <section class="section flood-benefits">
      <div class="container">
        <h2 class="section-title">{{ page.benefitTitle }}</h2>
        <div class="benefit-grid">
          <article v-for="item in page.benefits" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="packages" class="section">
      <div class="container">
        <span class="section-label">Packages</span>
        <h2 class="section-title">{{ page.packagesTitle }}</h2>
        <p class="section-lead">{{ page.packagesLead }}</p>
        <p v-if="servicesError" class="form-error">{{ servicesError }}</p>
        <div class="pkg-grid">
          <button
            v-for="pkg in primaryPackages"
            :key="pkg.slug"
            type="button"
            class="pkg"
            :class="{ 'pkg--on': packageId === pkg.slug }"
            @click="packageId = pkg.slug"
          >
            <span v-if="pkg.priceThb" class="pkg__price">{{ formatFloodBaht(pkg.priceThb) }} <small>THB</small></span>
            <strong>{{ serviceName(pkg) }}</strong>
            <p>{{ pkg.description }}</p>
          </button>
        </div>
        <ul v-if="quoteServices.length" class="quote-list">
          <li v-for="pkg in quoteServices" :key="pkg.slug">
            <strong>{{ locale === 'en' && pkg.nameEn ? pkg.nameEn : pkg.name }}</strong>
            — {{ pkg.priceHint || pkg.description }}
          </li>
        </ul>
      </div>
    </section>

    <section class="section flood-steps">
      <div class="container steps-layout">
        <div>
          <h2 class="section-title">{{ page.howTitle }}</h2>
          <ol class="steps">
            <li v-for="(step, index) in page.steps" :key="step.title">
              <span>0{{ index + 1 }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.body }}</p>
              </div>
            </li>
          </ol>
        </div>
        <figure class="scene scene--visit">
          <img
            src="/images/flood/flood-visit.jpg"
            :alt="page.visitImageAlt"
            width="1200"
            height="900"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>

    <section id="book" class="section book">
      <div class="container book-wrap">
        <header class="book-head">
          <span class="section-label">Booking</span>
          <h2 class="section-title">{{ page.bookTitle }}</h2>
          <p class="section-lead">{{ page.bookLead }}</p>
        </header>

        <div v-if="done" class="panel success">
          <h3>{{ formCopy.successTitle }}</h3>
          <p>{{ unmatched ? formCopy.unmatched : formCopy.successBody }}</p>
          <p class="ref">{{ done.ref }}</p>
          <p>{{ formatFloodDate(done.date, locale) }} · {{ slotLabel(done.slot, locale) }}</p>
        </div>

        <div v-else-if="pay" class="panel pay">
          <h3>{{ formCopy.payTitle }}</h3>
          <div class="pay-layout">
            <div>
              <p class="pay__amount">{{ formatFloodBaht(pay.booking.depositThb) }} THB</p>
              <p class="ref">{{ formCopy.ref }} {{ pay.booking.ref }}</p>
              <p>{{ pay.booking.packageName }}</p>
              <p>{{ formatFloodDate(pay.booking.date, locale) }} · {{ slotLabel(pay.booking.slot, locale) }}</p>
              <p class="field-hint">{{ pay.duplicate ? formCopy.duplicate : pay.held ? formCopy.held : formCopy.requested }}</p>
            </div>
            <div class="pay-qr">
              <p>{{ formCopy.payTo }}</p>
              <img v-if="pay.payment.qrImage" class="qr" :src="pay.payment.qrImage" alt="QR ชำระค่าจอง" width="280" height="280" />
              <p v-else class="field-hint">{{ formCopy.qrMissing }}</p>
            </div>
          </div>
          <div class="form-field">
            <label for="flood-slip">{{ formCopy.slip }} *</label>
            <input id="flood-slip" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" @change="onSlip" />
            <p class="field-hint">{{ formCopy.slipHint }}</p>
          </div>
          <div class="form-field">
            <label for="payerNote">{{ formCopy.payerNote }}</label>
            <input id="payerNote" v-model="form.payerNote" type="text" maxlength="80" />
          </div>
          <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>
          <button type="button" class="btn btn-primary" :disabled="paying" @click="onDeclare">
            {{ paying ? formCopy.paying : formCopy.paid }}
          </button>
        </div>

        <form v-else class="panel book-form" @submit.prevent="onSubmit">
          <div class="book-block">
            <p class="field-label">{{ formCopy.package }}</p>
            <p v-if="servicesError" class="form-error">{{ servicesError }}</p>
            <div class="pick-grid" role="radiogroup" :aria-label="formCopy.package">
              <button
                v-for="pkg in primaryPackages"
                :key="pkg.slug"
                type="button"
                class="pick"
                role="radio"
                :aria-checked="packageId === pkg.slug"
                :class="{ 'pick--on': packageId === pkg.slug }"
                @click="packageId = pkg.slug"
              >
                <span class="pick__price">{{ formatFloodBaht(pkg.priceThb || 0) }}</span>
                <span class="pick__name">{{ serviceName(pkg) }}</span>
              </button>
            </div>
            <button v-if="addonServices.length" type="button" class="text-btn addon-toggle" @click="showAddons = !showAddons">
              {{ showAddons ? formCopy.hideAddons : formCopy.showAddons }}
            </button>
            <div v-if="showAddons" class="addon-grid" role="radiogroup" :aria-label="formCopy.addons">
              <button
                v-for="pkg in addonServices"
                :key="pkg.slug"
                type="button"
                class="pick pick--addon"
                role="radio"
                :aria-checked="packageId === pkg.slug"
                :class="{ 'pick--on': packageId === pkg.slug }"
                @click="packageId = pkg.slug"
              >
                <span class="pick__price">{{ formatFloodBaht(pkg.priceThb || 0) }}</span>
                <span class="pick__name">{{ serviceName(pkg) }}</span>
              </button>
            </div>
          </div>

          <div class="book-block">
            <p class="field-label">{{ formCopy.asset }}</p>
            <div class="segment">
              <label><input v-model="form.asset" type="radio" name="flood-asset" value="solar" /> {{ formCopy.solar }}</label>
              <label><input v-model="form.asset" type="radio" name="flood-asset" value="ev" /> {{ formCopy.ev }}</label>
              <label><input v-model="form.asset" type="radio" name="flood-asset" value="both" /> {{ formCopy.both }}</label>
              <label><input v-model="form.asset" type="radio" name="flood-asset" value="other" /> {{ formCopy.assetOther }}</label>
            </div>
          </div>

          <div class="book-block">
            <p class="field-label">{{ formCopy.date }}</p>
            <p v-if="slotsPending">{{ formCopy.loading }}</p>
            <p v-else-if="slotsError" class="form-error">
              {{ slotsError }}
              <button type="button" class="text-btn" @click="loadSlots">{{ formCopy.retry }}</button>
            </p>
            <div v-else class="dates" role="listbox" :aria-label="formCopy.date">
              <button
                v-for="row in visibleDates"
                :key="row.date"
                type="button"
                class="date-chip"
                :class="{ 'date-chip--on': form.date === row.date }"
                :disabled="!row.slots.some((slot) => slot.remaining > 0)"
                @click="form.date = row.date"
              >
                <span>{{ dateParts(row.date).weekday }}</span>
                <strong>{{ dateParts(row.date).day }}</strong>
              </button>
            </div>
            <p v-if="!slotsPending && !visibleDates.length" class="form-error">{{ formCopy.closed }}</p>
          </div>

          <div v-if="form.date" class="book-block">
            <p class="field-label">{{ formCopy.slot }}</p>
            <div class="slots">
              <button
                v-for="slot in slotChoices()"
                :key="slot.time"
                type="button"
                class="slot"
                :class="{ 'slot--on': form.slot === slot.time }"
                :disabled="slot.remaining < 1"
                @click="form.slot = slot.time"
              >
                <strong>{{ slotLabel(slot.time, locale) }}</strong>
                <span>{{ slot.remaining < 1 ? formCopy.full : `${slot.remaining} ${formCopy.remaining}` }}</span>
              </button>
            </div>
          </div>

          <div class="form-grid two-col">
            <div class="form-field">
              <label for="flood-name">{{ formCopy.name }} *</label>
              <input id="flood-name" v-model="form.name" required maxlength="100" autocomplete="name" />
            </div>
            <div class="form-field">
              <label for="flood-phone">{{ formCopy.phone }} *</label>
              <input id="flood-phone" v-model="form.phone" required type="tel" autocomplete="tel" />
            </div>
          </div>
          <div class="form-grid two-col">
            <div class="form-field">
              <label for="flood-line">{{ formCopy.line }}</label>
              <input id="flood-line" v-model="form.lineId" maxlength="64" autocomplete="off" />
            </div>
            <div class="form-field">
              <label for="flood-email">{{ formCopy.email }}</label>
              <input id="flood-email" v-model="form.email" type="email" autocomplete="email" />
            </div>
          </div>
          <div class="form-field">
            <label for="flood-province">{{ formCopy.province }} *</label>
            <select id="flood-province" v-model="form.province" required>
              <option v-for="name in FLOOD_PROVINCES" :key="name" :value="name">{{ name }}</option>
              <option :value="FLOOD_OTHER_PROVINCE">{{ formCopy.other }}</option>
            </select>
          </div>
          <div class="form-field place-field">
            <label for="flood-address">{{ formCopy.address }} *</label>
            <input
              id="flood-address"
              v-model="placeQuery"
              type="search"
              autocomplete="off"
              required
              :placeholder="formCopy.addressHint"
              @input="onPlaceInput"
            />
            <p v-if="placePending" class="field-hint">{{ formCopy.searching }}</p>
            <ul v-if="placeHits.length" class="place-hits">
              <li v-for="hit in placeHits" :key="hit.placeId">
                <button type="button" @click="choosePlace(hit)">{{ hit.description }}</button>
              </li>
            </ul>
            <p v-if="form.placeId && form.lat != null && form.lng != null" class="pin">
              {{ formCopy.pinned }} {{ form.lat.toFixed(5) }}, {{ form.lng.toFixed(5) }}
              <a :href="`https://www.google.com/maps/search/?api=1&query=${form.lat},${form.lng}`" target="_blank" rel="noopener">
                {{ formCopy.mapOpen }}
              </a>
            </p>
          </div>
          <div class="form-field">
            <label for="flood-note">{{ formCopy.note }}</label>
            <textarea id="flood-note" v-model="form.note" maxlength="500" rows="3" />
          </div>
          <div class="hp" aria-hidden="true">
            <label for="flood-website">Website</label>
            <input id="flood-website" v-model="form.websiteUrl" tabindex="-1" autocomplete="off" />
          </div>
          <div v-if="selectedPackage" class="book-summary">
            <div>
              <strong>{{ serviceName(selectedPackage) }}</strong>
              <span v-if="form.date && form.slot">{{ formatFloodDate(form.date, locale) }} · {{ slotLabel(form.slot, locale) }}</span>
            </div>
            <p>{{ formatFloodBaht(selectedPackage.priceThb || 0) }} THB</p>
          </div>
          <p v-if="errorMsg" class="form-error">{{ errorMsg }}</p>
          <button type="submit" class="btn btn-primary book-submit" :disabled="submitting">
            {{ submitting ? formCopy.submitting : formCopy.submit }}
          </button>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ page.faqTitle }}</h2>
        <div class="faq">
          <details v-for="item in page.faqs" :key="item.q">
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
        <p class="related">
          {{ page.related }}
          <NuxtLink to="/solar/rooftop">{{ locale === 'en' ? 'Solar installation' : 'รับติดตั้งโซล่าเซลล์' }}</NuxtLink>
          ·
          <NuxtLink to="/ev-charging/station">{{ locale === 'en' ? 'EV Station' : 'รับติดตั้ง EV Station' }}</NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand
      :title="page.ctaTitle"
      :description="page.ctaBody"
      :primary-label="page.bookCta"
      primary-to="/flood-recovery#book"
      :secondary-label="locale === 'en' ? 'Contact' : 'ติดต่อทีม'"
      secondary-to="/contact"
    />
  </div>
</template>

<style scoped>
.proof {
  background: #101010;
  border-block: 1px solid rgba(212, 255, 0, 0.18);
}

.proof__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  padding-block: 1rem;
}

.proof__row p {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-lime);
}

.flood-hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(18rem, 0.95fr);
  gap: 2.25rem;
  align-items: center;
}

.flood-hero__figure,
.scene {
  margin: 0;
}

.flood-hero__figure img,
.scene img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 18px;
}

.flood-hero__figure img {
  aspect-ratio: 16 / 9;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  outline: 1px solid rgba(212, 255, 0, 0.28);
}

.scene img {
  aspect-ratio: 4 / 3;
}

.scene figcaption {
  margin-top: 0.85rem;
  color: var(--color-muted);
  font-size: 0.95rem;
  line-height: 1.65;
}

.steps-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.75fr);
  gap: 2rem;
  align-items: center;
}

.flood-split {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr);
  gap: 2rem;
  align-items: center;
}

.flood-benefits {
  background: #101010;
}

.benefit-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.pkg-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.benefit-grid article,
.pkg {
  padding: 1.2rem 1.15rem 1.25rem;
  background: var(--color-panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  text-align: left;
}

.benefit-grid h3,
.pkg strong {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 1.05rem;
}

.benefit-grid p,
.pkg p,
.pkg li,
.steps p,
.faq p,
.related {
  color: var(--color-muted);
}

.pkg {
  color: inherit;
  cursor: pointer;
}

.pkg--on {
  border-color: var(--color-lime);
  box-shadow: 0 0 0 1px var(--color-lime);
}

.pkg__price {
  display: block;
  margin-bottom: 0.35rem;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 700;
  color: var(--color-lime);
}

.pkg__price small {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

.pkg ul {
  margin-top: 0.8rem;
}

.pkg li {
  position: relative;
  padding-left: 0.9rem;
  margin-top: 0.35rem;
  font-size: 0.92rem;
}

.pkg li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  background: var(--color-lime);
}

.steps {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

.steps li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
}

.steps span {
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--color-lime);
}

.book {
  background:
    radial-gradient(ellipse 50% 80% at 100% 0%, rgba(212, 255, 0, 0.08), transparent 55%),
    #0b0b0b;
}

.book-wrap {
  max-width: 52rem;
}

.book-head .section-lead {
  max-width: 38rem;
}

.book-form {
  display: grid;
  gap: 1.35rem;
}

.book-block {
  display: grid;
  gap: 0.55rem;
}

.panel {
  padding: 1.25rem;
  background: rgba(20, 20, 20, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
}

.field-label {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
}

.pick-grid,
.addon-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.pick {
  display: grid;
  gap: 0.15rem;
  min-height: 4.6rem;
  padding: 0.85rem 0.95rem;
  text-align: left;
  color: inherit;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  cursor: pointer;
}

.pick--on {
  border-color: var(--color-lime);
  background: rgba(212, 255, 0, 0.1);
  box-shadow: inset 0 0 0 1px var(--color-lime);
}

.pick__price {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-lime);
}

.pick--on .pick__price {
  color: var(--color-lime);
}

.pick__name {
  font-size: 0.92rem;
  line-height: 1.35;
}

.addon-toggle {
  justify-self: start;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
}

.segment {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
}

.segment label {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 2.8rem;
  padding: 0.55rem 0.4rem;
  text-align: center;
  font-size: 0.92rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  cursor: pointer;
}

.segment input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.segment label:has(input:checked) {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
  font-weight: 700;
}

.dates {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scroll-snap-type: x mandatory;
}

.date-chip {
  display: grid;
  flex: 0 0 4.7rem;
  gap: 0.1rem;
  justify-items: center;
  padding: 0.65rem 0.35rem;
  scroll-snap-align: start;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  color: var(--color-white);
  background: transparent;
  font: inherit;
  font-size: 0.78rem;
}

.date-chip strong {
  font-size: 0.95rem;
}

.slots {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.slot {
  display: grid;
  gap: 0.15rem;
  padding: 0.85rem 1rem;
  text-align: left;
  color: inherit;
  background: #121212;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 14px;
  cursor: pointer;
}

.slot span {
  color: var(--color-muted);
  font-size: 0.85rem;
}

.slot--on {
  border-color: var(--color-lime);
  background: rgba(212, 255, 0, 0.1);
}

.slot--on span {
  color: #d7d7d7;
}

.slot:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.book-summary {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  background: #101010;
  border: 1px solid rgba(212, 255, 0, 0.28);
}

.book-summary strong,
.book-summary span {
  display: block;
}

.book-summary span {
  margin-top: 0.15rem;
  color: var(--color-muted);
  font-size: 0.88rem;
}

.book-summary p {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-lime);
  white-space: nowrap;
}

.book-submit {
  width: 100%;
  justify-content: center;
}

.date-chip--on {
  background: var(--color-lime);
  color: #111;
  border-color: var(--color-lime);
}

.date-chip:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.form-error {
  color: #ffb4b4;
}

.text-btn {
  color: var(--color-lime);
  text-decoration: underline;
}

.hp {
  position: absolute;
  left: -9999px;
  height: 0;
  overflow: hidden;
}

.pay h3 {
  margin-bottom: 0.8rem;
}

.pay-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 16rem;
  gap: 1.25rem;
  align-items: start;
}

.pay-qr {
  padding: 0.9rem;
  border-radius: 14px;
  background: #101010;
}

.pay__amount,
.ref {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-lime);
}

.ref {
  font-size: 1.15rem;
}

.qr {
  width: min(100%, 240px);
  margin: 0.5rem 0 1rem;
  padding: 0.6rem;
  background: #fff;
  border-radius: 12px;
}

.qr :deep(svg) {
  width: 100%;
  height: auto;
  display: block;
}

.field-hint,
.quote-list,
.pin {
  color: var(--color-muted);
  font-size: 0.92rem;
}

.quote-list {
  margin-top: 1.25rem;
}

.place-hits {
  margin: 0.4rem 0 0;
  padding: 0;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
}

.place-hits button {
  width: 100%;
  padding: 0.7rem 0.85rem;
  text-align: left;
  color: inherit;
  background: #161616;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  cursor: pointer;
}

.place-hits button:hover {
  background: #222;
}

.pin a {
  margin-left: 0.5rem;
  color: var(--color-lime);
}

.faq {
  display: grid;
  gap: 0.7rem;
  max-width: 44rem;
}

.faq details {
  padding: 0.9rem 1rem;
  background: var(--color-panel);
  border-radius: 12px;
}

.faq summary {
  cursor: pointer;
  font-weight: 600;
}

.faq p {
  margin-top: 0.55rem;
}

.related {
  margin-top: 1.5rem;
  max-width: 42rem;
}

.related a {
  color: var(--color-lime);
}

@media (max-width: 900px) {
  .flood-hero__grid,
  .flood-split,
  .steps-layout,
  .benefit-grid {
    grid-template-columns: 1fr;
  }

  .segment {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .pkg-grid,
  .pick-grid,
  .addon-grid,
  .segment,
  .pay-layout {
    grid-template-columns: 1fr;
  }
}
</style>
