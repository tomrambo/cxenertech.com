import { contactInfo } from './nav'

/** Campaign booking deposits. Edit these amounts to change every quote, QR, and page. */
export const FLOOD_PACKAGES = [
  {
    id: 'inspect',
    depositThb: 1500,
    name: { th: 'ตรวจระบบหลังน้ำท่วม', en: 'Post-flood inspection' },
    summary: {
      th: 'ช่าง 1 คนเข้าตรวจตามวันที่จอง แล้วสรุปสิ่งที่ต้องซ่อมในวันเดียวกัน',
      en: 'One technician inspects on the date you book and lists what needs repair the same day',
    },
    includes: {
      th: [
        'ตรวจอินเวอร์เตอร์ สตริง DC เบรกเกอร์ SPD และจุดต่อที่เปียกน้ำ',
        'ตรวจเครื่องชาร์จ EV สายชาร์จ และเครื่องตัดไฟรั่ว ถ้ามีที่ไซต์',
        'ตัดวงจรที่ยังไม่ควรจ่ายไฟ',
        'สรุปความเสียหายให้ที่หน้างาน',
      ],
      en: [
        'Inspect the inverter, DC strings, breakers, SPDs, and wet terminations',
        'Inspect the EV charger, cable, and residual-current device when the site has one',
        'Isolate circuits that should stay off',
        'Leave a damage summary on site the same day',
      ],
    },
  },
  {
    id: 'make-safe',
    depositThb: 3900,
    name: { th: 'ตรวจและซ่อมเบื้องต้น', en: 'Inspection and make-safe' },
    summary: {
      th: 'รวมการตรวจ และงานทำให้ระบบปลอดภัยในวันเข้า ไม่เกิน 3 ชั่วโมง',
      en: 'Inspection plus up to 3 hours of make-safe work on the visit day',
    },
    includes: {
      th: [
        'ทุกอย่างในแพ็กเกจตรวจระบบ',
        'เป่าแห้งและตรวจฉนวนจุดที่เข้าถึงได้',
        'เปลี่ยนเบรกเกอร์หรือ SPD ถ้ามีอะไหล่บนรถ',
        'อินเวอร์เตอร์หรือเครื่องชาร์จทั้งเครื่องเสนอราคาหลังตรวจ',
      ],
      en: [
        'Everything in the inspection package',
        'Dry accessible parts and check insulation',
        'Replace a breaker or SPD when the van carries the part',
        'A full inverter or charger replacement is quoted after the visit',
      ],
    },
  },
  {
    id: 'urgent',
    depositThb: 5900,
    name: { th: 'คิวเร่งด่วน 2 วันทำการ', en: 'Priority within 2 business days' },
    summary: {
      th: 'ช่าง 2 คน เข้าใน 2 วันทำการถัดไป และส่งรูปความเสียหายทาง LINE ในวันตรวจ',
      en: 'Two technicians within the next 2 business days, with damage photos on LINE the same day',
    },
    includes: {
      th: [
        'จองได้เฉพาะ 2 วันทำการถัดไป ไม่นับวันอาทิตย์',
        'ช่าง 2 คน พร้อมงานทำให้ปลอดภัยแบบแพ็กเกจซ่อมเบื้องต้น',
        'ส่งรูปจุดเสียทาง LINE ในวันเข้าตรวจ',
        'อะไหล่ใหญ่เสนอราคาแยกหลังตรวจ',
      ],
      en: [
        'Dates are limited to the next 2 business days, Sundays excluded',
        'Two technicians and the same make-safe work as the repair package',
        'Damage photos sent on LINE the day of the visit',
        'Major parts are quoted separately after inspection',
      ],
    },
  },
] as const

export type FloodPackageId = (typeof FLOOD_PACKAGES)[number]['id']
export type FloodLocale = 'th' | 'en'
export type FloodSlot = '09:00' | '13:00'
export type FloodAsset = 'solar' | 'ev' | 'both' | 'other'

export const FLOOD_SLOTS = ['09:00', '13:00'] as const satisfies readonly FloodSlot[]
export const FLOOD_SLOT_CAPACITY = 2
export const FLOOD_HOLD_MS = 2 * 60 * 60 * 1000
export const FLOOD_HORIZON_DAYS = 21
export const FLOOD_PATH = '/flood-recovery'

export const FLOOD_PROVINCES = [
  'กรุงเทพมหานคร',
  'นนทบุรี',
  'ปทุมธานี',
  'สมุทรปราการ',
  'สมุทรสาคร',
  'นครปฐม',
] as const

export const FLOOD_OTHER_PROVINCE = 'จังหวัดอื่น'

export function floodPackage(id: string) {
  return FLOOD_PACKAGES.find((item) => item.id === id) ?? null
}

export function formatFloodBaht(amount: number) {
  return new Intl.NumberFormat('th-TH').format(amount)
}

export function promptPayMobile(phone = contactInfo.phone) {
  const digits = phone.replace(/\D/g, '')
  const local = digits.startsWith('66') ? digits.slice(2) : digits.replace(/^0/, '')
  if (!/^\d{9}$/.test(local)) return null
  return `0066${local}`
}

export function promptPayDisplay(phone = contactInfo.phone) {
  const digits = phone.replace(/\D/g, '')
  const local = digits.startsWith('66') ? `0${digits.slice(2)}` : digits
  if (local.length !== 10) return phone
  return `${local.slice(0, 3)}-${local.slice(3, 6)}-${local.slice(6)}`
}

export function normalizeThaiMobile(input: string) {
  const digits = input.replace(/\D/g, '')
  const local = digits.startsWith('66') ? `0${digits.slice(2)}` : digits
  return /^0[689]\d{8}$/.test(local) ? local : null
}

export function bangkokDateIso(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now)
}

export function addCalendarDays(iso: string, days: number) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + days))
  return date.toISOString().slice(0, 10)
}

export function calendarWeekday(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function bookableDates(todayIso: string, horizon = FLOOD_HORIZON_DAYS) {
  const dates: string[] = []
  for (let offset = 1; offset <= horizon; offset += 1) {
    const iso = addCalendarDays(todayIso, offset)
    if (calendarWeekday(iso) === 0) continue
    dates.push(iso)
  }
  return dates
}

export function allowedDates(packageId: string, todayIso: string) {
  const dates = bookableDates(todayIso)
  return packageId === 'urgent' ? dates.slice(0, 2) : dates
}

export function formatFloodDate(iso: string, locale: FloodLocale) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)))
}

export function slotLabel(slot: FloodSlot, locale: FloodLocale) {
  if (locale === 'en') return slot === '09:00' ? '09:00-12:00' : '13:00-16:00'
  return slot === '09:00' ? 'เช้า 09:00-12:00' : 'บ่าย 13:00-16:00'
}

function tlv(id: string, value: string) {
  return `${id}${String(value.length).padStart(2, '0')}${value}`
}

/** CRC-16/CCITT-FALSE, the checksum EMV QR codes use. */
export function crc16CcittFalse(value: string) {
  let crc = 0xffff
  for (let index = 0; index < value.length; index += 1) {
    crc ^= value.charCodeAt(index) << 8
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

export function buildPromptPayPayload(amount: number, billRef: string, mobile = promptPayMobile()) {
  if (!mobile) throw new Error('PromptPay number is not configured')
  const baht = amount.toFixed(2)
  const merchant = tlv('00', 'A000000677010111') + tlv('01', mobile)
  const bill = billRef.replace(/[^A-Za-z0-9]/g, '').slice(0, 25)
  const fields = [
    tlv('00', '01'),
    tlv('01', '12'),
    tlv('29', merchant),
    tlv('53', '764'),
    tlv('54', baht),
    tlv('58', 'TH'),
  ]
  if (bill) fields.push(tlv('62', tlv('01', bill)))
  const body = `${fields.join('')}6304`
  return body + crc16CcittFalse(body)
}

export function floodPage(locale: FloodLocale) {
  if (locale === 'en') {
    return {
      heroTitle: 'Post-flood electrical inspection and repair',
      heroLead:
        'Leave the power off after the water drops. A CX ENERTECH technician inspects the panel on the date you book in Bangkok and nearby provinces, at the Marketplace package price.',
      bookCta: 'Book a visit date',
      detailCta: 'See what is included',
      heroImageAlt: 'A technician inspecting a home breaker panel after floodwater has receded',
      panelImageAlt: 'Close-up of a multimeter test on a residential breaker panel',
      visitImageAlt: 'Technicians arriving at a townhouse for a booked electrical visit',
      proof: ['Marketplace: post-flood electrical inspection', 'Visit pin saved from Google Maps', 'Pay by QR or an uploaded slip'],
      problemTitle: 'Leave the system off until someone has checked it',
      problemBody:
        'An inverter, DC string, or EV charger that sat in floodwater can short even after the outside looks dry. A technician should isolate the circuits and check insulation before the system is energised again.',
      benefitTitle: 'What you get when you book',
      benefits: [
        { title: 'A date you choose', body: 'Morning or afternoon, Monday to Saturday. You do not wait for a quote before a slot exists.' },
        { title: 'The Marketplace price is on the QR', body: 'You pay the listed package price. Parts and VAT follow the note on that package.' },
        { title: 'A same-day damage list', body: 'You leave the visit knowing what failed, what was made safe, and what still needs parts.' },
      ],
      howTitle: 'How booking works',
      steps: [
        { title: 'Pick a package and a day', body: 'Tell us whether the site has solar, an EV charger, both, or other equipment, and where the crew can enter.' },
        { title: 'Pay the package price', body: 'Scan the payment-gateway QR for the Marketplace price, or upload a transfer slip on the same screen.' },
        { title: 'The crew arrives on that date', body: 'They inspect, isolate unsafe circuits, and quote any major parts that were not on the van.' },
      ],
      area: 'Package pricing covers Bangkok, Nonthaburi, Pathum Thani, Samut Prakan, Samut Sakhon, and Nakhon Pathom. Other provinces can still book. Travel is quoted before the slot is confirmed.',
      packagesTitle: 'Packages from Marketplace',
      packagesLead: 'These are the live services in the post-flood electrical category. The QR amount is the listed package price.',
      bookTitle: 'Book the visit',
      bookLead: 'Search the installation site or drop a pin on the map so the crew gets the coordinates. The slot is held for 2 hours while you pay by QR or slip.',
      faqTitle: 'Before you book',
      faqs: [
        { q: 'Where do the package prices come from?', a: 'The page loads the Marketplace category “ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม”. The amount on the QR is that service’s listed price. Parts and VAT follow the note on the package.' },
        { q: 'Where do you travel?', a: 'Bangkok, Nonthaburi, Pathum Thani, Samut Prakan, Samut Sakhon, and Nakhon Pathom are included. Other provinces can book, and travel is quoted separately.' },
        { q: 'How do I pay?', a: 'Scan the QR from the payment gateway, or upload a JPG, PNG, WEBP, or PDF slip on the booking screen. The team matches the slip to the booking reference.' },
        { q: 'What if the water has not receded?', a: 'Pick a date when the crew can reach the inverter or charger. Sundays are closed.' },
        { q: 'What should stay off until the visit?', a: 'Leave a flooded inverter, DC isolator, and EV charger switched off. Do not dry them with mains power.' },
      ],
      ctaTitle: 'Pick the day the crew should arrive',
      ctaBody: 'Have the site address and a mobile number ready. The team calls after the deposit shows up.',
      related: 'This visit covers equipment already on site. New solar installation and new EV stations are quoted separately.',
    }
  }

  return {
    heroTitle: 'ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม',
    heroLead:
      'น้ำลดแล้วยังไม่ควรจ่ายไฟเข้าตู้ ช่าง CX ENERTECH เข้าตรวจตามวันที่คุณจองในกรุงเทพฯ และปริมณฑล',
    bookCta: 'จองวันที่ช่างเข้า',
    detailCta: 'ดูสิ่งที่รวมในแพ็กเกจ',
    heroImageAlt: 'ช่างไฟฟ้าตรวจตู้เมนในบ้านหลังน้ำลด',
    panelImageAlt: 'ช่างใช้มัลติมิเตอร์ตรวจเบรกเกอร์ในตู้ไฟบ้าน',
    visitImageAlt: 'ทีมช่างเดินเข้าตรวจบ้านตามวันที่จอง',
    proof: ['หมวด Marketplace ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม', 'บันทึกพิกัดจาก Google Map', 'ชำระ QR หรือแนบสลิป'],
    problemTitle: 'น้ำลดแล้ว ยังไม่ควรจ่ายไฟเข้าระบบ',
    problemBody:
      'อินเวอร์เตอร์ สตริง DC และเครื่องชาร์จที่จมหรือโดนน้ำกระเซ็น ลัดวงจรได้แม้ภายนอกแห้งแล้ว ช่างควรตัดวงจรและตรวจฉนวนก่อนเปิดใช้',
    benefitTitle: 'สิ่งที่ได้เมื่อจองคิว',
    benefits: [
      { title: 'เลือกวันเข้าบริการเอง', body: 'เช้าหรือบ่าย จันทร์ถึงเสาร์ ไม่ต้องรอใบเสนอราคาก่อนจึงจะมีคิว' },
      { title: 'ยอด QR ตรงกับราคาในรายการ', body: 'ชำระตามราคาแพ็กเกจใน Marketplace ค่าอะไหล่และ VAT เป็นไปตามข้อความของแพ็กเกจนั้น' },
      { title: 'รู้รายการเสียในวันตรวจ', body: 'ได้ทั้งจุดที่ตัดไฟไว้แล้ว และรายการที่ต้องสั่งอะไหล่ต่อ' },
    ],
    howTitle: 'ขั้นตอนจอง',
    steps: [
      { title: 'เลือกแพ็กเกจและวัน', body: 'บอกว่าไซต์มีโซลาร์ เครื่องชาร์จ EV ทั้งคู่ หรืออุปกรณ์อื่น และที่อยู่ที่ช่างเข้าได้' },
      { title: 'ชำระตามราคาแพ็กเกจ', body: 'สแกน QR จาก payment gateway ตามราคา หรือแนบสลิปในหน้าเดียวกัน' },
      { title: 'ช่างเข้าตามวันที่จอง', body: 'ตรวจ ตัดวงจรที่ไม่ปลอดภัย แล้วเสนอราคาอะไหล่ใหญ่ที่ไม่มีบนรถ' },
    ],
    area: 'ราคาแพ็กเกจรวมพื้นที่กรุงเทพฯ นนทบุรี ปทุมธานี สมุทรปราการ สมุทรสาคร และนครปฐม จังหวัดอื่นจองได้ ทีมเสนอค่าเดินทางก่อนยืนยันคิว',
    packagesTitle: 'แพ็กเกจจาก Marketplace',
    packagesLead: 'รายการนี้ดึงจากหมวดตรวจและซ่อมไฟฟ้าหลังน้ำท่วม ยอดบน QR คือราคาแพ็กเกจที่แสดงในรายการบริการ',
    bookTitle: 'จองวันเข้าบริการ',
    bookLead: 'ค้นหาสถานที่ติดตั้งหรือปักหมุดบนแผนที่ เพื่อบันทึกพิกัดให้ช่าง หลังส่งแบบฟอร์ม ระบบกันคิวไว้ 2 ชั่วโมงระหว่างสแกน QR หรือแนบสลิป',
    faqTitle: 'ก่อนจอง',
    faqs: [
      { q: 'ราคาแพ็กเกจมาจากไหน?', a: 'หน้านี้โหลดหมวด «ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม» จาก Marketplace ยอดบน QR คือราคาในรายการนั้น ค่าอะไหล่และ VAT เป็นไปตามข้อความของแต่ละแพ็กเกจ' },
      { q: 'เข้าพื้นที่ไหนบ้าง?', a: 'กรุงเทพฯ นนทบุรี ปทุมธานี สมุทรปราการ สมุทรสาคร และนครปฐม รวมในราคาแพ็กเกจ จังหวัดอื่นจองได้ โดยเสนอค่าเดินทางแยก' },
      { q: 'ชำระเงินอย่างไร?', a: 'สแกน QR จาก payment gateway หรืออัปโหลดสลิป JPG, PNG, WEBP หรือ PDF ในหน้าจอง ทีมจับคู่สลิปกับรหัสจอง' },
      { q: 'ถ้าน้ำยังไม่ลด เลือกวันอย่างไร?', a: 'เลือกวันที่ช่างเข้าถึงอินเวอร์เตอร์หรือเครื่องชาร์จได้ วันอาทิตย์ไม่เปิดคิว' },
      { q: 'ก่อนช่างมา ควรปิดอะไรไว้?', a: 'ปิดอินเวอร์เตอร์ สวิตช์ DC และเครื่องชาร์จ EV ที่โดนน้ำไว้ก่อน อย่าใช้ไฟบ้านเป่าหรืออบให้แห้ง' },
    ],
    ctaTitle: 'เลือกวันที่ให้ช่างเข้า',
    ctaBody: 'เตรียมที่อยู่ไซต์และเบอร์มือถือ ทีมโทรยืนยันหลังยอดค่าจองเข้า',
    related: 'งานนี้สำหรับอุปกรณ์ที่มีอยู่แล้ว งานติดตั้งโซลาร์ใหม่และสถานีชาร์จใหม่ขอใบเสนอราคาแยก',
  }
}

export function floodFormCopy(locale: FloodLocale) {
  if (locale === 'en') {
    return {
      package: 'Package',
      asset: 'Equipment on site',
      solar: 'Solar',
      ev: 'EV charger',
      both: 'Solar and EV charger',
      assetOther: 'Other',
      date: 'Visit date',
      slot: 'Arrival window',
      name: 'Contact name',
      phone: 'Mobile',
      line: 'LINE ID',
      email: 'Email',
      province: 'Province',
      other: 'Another province (travel quoted separately)',
      address: 'Installation site',
      addressHint: 'Search a place, or click the map',
      mapPick: 'Click the map to pin the installation point. Drag to move around.',
      mapFailed: 'The map did not load. You can still search and choose a suggestion.',
      pinned: 'Pinned',
      searching: 'Searching Google Maps…',
      noPlaces: 'No matching places',
      mapOpen: 'Open this pin in Google Maps',
      note: 'What got wet, and anything the crew should know',
      submit: 'Book this slot and open payment',
      submitting: 'Saving the booking…',
      remaining: 'left',
      full: 'Full',
      closed: 'No open slots in this window',
      payTitle: 'Pay this package price to keep the booking',
      payTo: 'Payment QR',
      ref: 'Booking reference',
      payerNote: 'Note on the slip',
      slip: 'Transfer slip',
      slipHint: 'JPG, PNG, WEBP, or PDF, up to 5 MB',
      paid: 'Submit this slip',
      paying: 'Uploading the slip…',
      qrMissing: 'The QR is not available right now. Upload the transfer slip and the team will match it to this reference.',
      held: 'This slot is held for 2 hours while you pay.',
      requested: 'The team has the request. They confirm the date after the deposit arrives.',
      duplicate: 'This phone already has this slot. Pay the deposit below if you have not yet.',
      successTitle: 'Transfer notice received',
      successBody: 'The crew will call to confirm the visit after the amount is checked. Keep the reference.',
      unmatched: 'The team received this reference and will match it to your booking.',
      retry: 'Load available dates again',
      loading: 'Loading open dates…',
      deposit: 'Booking deposit',
      addons: 'Add-ons',
      showAddons: 'Show add-on services',
      hideAddons: 'Hide add-on services',
    }
  }
  return {
    package: 'แพ็กเกจ',
    asset: 'อุปกรณ์ที่ไซต์',
    solar: 'โซลาร์',
    ev: 'เครื่องชาร์จ EV',
    both: 'โซลาร์และเครื่องชาร์จ EV',
    assetOther: 'อื่นๆ',
    date: 'วันที่ให้ช่างเข้า',
    slot: 'ช่วงเวลา',
    name: 'ชื่อผู้ติดต่อ',
    phone: 'เบอร์มือถือ',
    line: 'LINE ID',
    email: 'อีเมล',
    province: 'จังหวัด',
    other: 'จังหวัดอื่น (ทีมเสนอค่าเดินทางแยก)',
    address: 'สถานที่ติดตั้ง',
    addressHint: 'ค้นหาชื่อสถานที่ หรือคลิกบนแผนที่',
    mapPick: 'คลิกบนแผนที่เพื่อปักจุดติดตั้ง หรือลากแผนที่เพื่อเลื่อนดู',
    mapFailed: 'โหลดแผนที่ไม่สำเร็จ ยังค้นหาแล้วเลือกจากรายการแนะนำได้',
    pinned: 'ปักพิกัดแล้ว',
    searching: 'กำลังค้นจาก Google Map…',
    noPlaces: 'ไม่พบสถานที่ที่ตรงกัน',
    mapOpen: 'เปิดพิกัดนี้ใน Google Map',
    note: 'จุดที่โดนน้ำ และสิ่งที่อยากให้ช่างรู้',
    submit: 'จองคิวนี้และไปหน้าชำระ',
    submitting: 'กำลังบันทึกคิว…',
    remaining: 'ว่าง',
    full: 'เต็ม',
    closed: 'ช่วงนี้ไม่มีคิวว่าง',
    payTitle: 'ชำระราคาแพ็กเกจนี้เพื่อรักษาคิว',
    payTo: 'QR ชำระเงิน',
    ref: 'รหัสจอง',
    payerNote: 'หมายเหตุบนสลิป',
    slip: 'สลิปการโอน',
    slipHint: 'JPG, PNG, WEBP หรือ PDF ไม่เกิน 5 MB',
    paid: 'ส่งสลิปนี้',
    paying: 'กำลังอัปโหลดสลิป…',
    qrMissing: 'ตอนนี้สร้าง QR ไม่ได้ แนบสลิปไว้ ทีมจะจับคู่กับรหัสจองนี้',
    held: 'คิวนี้ถูกกันไว้ 2 ชั่วโมงระหว่างชำระเงิน',
    requested: 'ทีมได้รับคำขอแล้ว และจะยืนยันวันหลังยอดค่าจองเข้า',
    duplicate: 'เบอร์นี้มีคิวช่วงเวลาเดิมอยู่แล้ว ถ้ายังไม่ได้โอน ให้ชำระตามด้านล่าง',
    successTitle: 'ได้รับแจ้งโอนแล้ว',
    successBody: 'ทีมจะโทรยืนยันวันเข้าตรวจหลังตรวจยอด เก็บบรหัสจองไว้',
    unmatched: 'ทีมได้รับรหัสนี้แล้ว และจะจับคู่กับคิวที่คุณจอง',
    retry: 'โหลดวันที่ว่างอีกครั้ง',
    loading: 'กำลังโหลดวันที่ว่าง…',
    deposit: 'ค่าจอง',
    addons: 'รายการเสริม',
    showAddons: 'ดูรายการเสริม',
    hideAddons: 'ซ่อนรายการเสริม',
  }
}
