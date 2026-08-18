export const OTHER_OPTION = 'อื่นๆ'

export const OCCUPATIONS = [
  'พนักงานเอกชน',
  'พนักงานออฟฟิศ',
  'Sales / Sales Engineer',
  'ฟรีแลนซ์',
  'นายหน้า / ตัวแทนขาย',
  'เจ้าของธุรกิจ',
  'ข้าราชการ / รัฐวิสาหกิจ',
  'นักศึกษา',
  'ว่างงาน',
  'แม่บ้าน',
  'ล่าม / บริการอิสระ',
  OTHER_OPTION,
] as const

export const SALES_DURATIONS = [
  'น้อยกว่า 1 ปี',
  '1 ปี',
  '2–3 ปี',
  '4–5 ปี',
  '6–10 ปี',
  'มากกว่า 10 ปี',
  '20 ปีขึ้นไป',
] as const

export const SALES_CHANNELS = [
  { value: 'online', label: 'ออนไลน์' },
  { value: 'offline', label: 'ออฟไลน์' },
  { value: 'face_to_face', label: 'Face to Face' },
  { value: 'phone', label: 'โทรศัพท์' },
  { value: 'booth', label: 'ออกบูธ' },
  { value: 'visit_customer', label: 'เดินทางพบลูกค้า' },
] as const

export const PREFERRED_CHANNELS = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'line', label: 'Line' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'face_to_face', label: 'Face to Face' },
  { value: 'phone', label: 'โทรศัพท์' },
] as const

export const FORM_STEPS = [
  { n: 1, title: 'ข้อมูลติดต่อ', hint: 'ชื่อและช่องทางติดต่อ' },
  { n: 2, title: 'ประสบการณ์', hint: 'งานขายที่เคยทำ' },
  { n: 3, title: 'ช่องทางขาย', hint: 'ช่องทางและฐานลูกค้า' },
  { n: 4, title: 'ยืนยัน', hint: 'ตรวจสอบแล้วส่ง' },
] as const

export type PreferredChannel = (typeof PREFERRED_CHANNELS)[number]['value']

export type PartnerRegisterPayload = {
  fullName: string
  nickname: string
  phone: string
  lineId: string
  email: string
  currentAddress: string
  currentOccupation: string
  currentOccupationOther: string
  hasSalesExperience: boolean | null
  previousCompanies: string
  productsSold: string
  salesDuration: string
  salesChannels: string[]
  preferredChannels: string[]
  hasExistingCustomers: boolean | null
  customerBaseTypes: string
  maxAnnualSales: string
  consent: boolean
  websiteUrl?: string
  sourceDetail?: string
}

export function emptyPartnerForm(): PartnerRegisterPayload {
  return {
    fullName: '',
    nickname: '',
    phone: '',
    lineId: '',
    email: '',
    currentAddress: '',
    currentOccupation: '',
    currentOccupationOther: '',
    hasSalesExperience: null,
    previousCompanies: '',
    productsSold: '',
    salesDuration: '',
    salesChannels: [],
    preferredChannels: [],
    hasExistingCustomers: null,
    customerBaseTypes: '',
    maxAnnualSales: '',
    consent: false,
    websiteUrl: '',
    sourceDetail: 'cxenertech.com/partners/become-a-partner',
  }
}

export function toggleChannel(current: string[], value: string) {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value]
}

export function resolveOccupation(form: PartnerRegisterPayload) {
  if (form.currentOccupation === OTHER_OPTION) {
    return form.currentOccupationOther.trim()
  }
  return form.currentOccupation.trim()
}

export function resolveSalesChannelDesc(form: PartnerRegisterPayload) {
  const labels = SALES_CHANNELS.filter((c) => form.salesChannels.includes(c.value)).map(
    (c) => c.label,
  )
  return labels.join(', ')
}
