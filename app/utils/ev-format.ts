export function formatThb(value: number | null | undefined) {
  if (value == null) return '—'
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPowerRange(min: number, max: number) {
  if (min === max) return `${min} kW`
  return `${min}–${max} kW`
}

export function formatNozzles(min: number, max: number) {
  if (min === max) return `${min} จุด / ${min} bay${min > 1 ? 's' : ''}`
  return `${min}–${max} จุด / bays`
}

/** Payback display: months + years (e.g. "31 เดือน · 2.6 ปี") */
export function formatPayback(
  months: number | null | undefined,
  years?: number | null | undefined,
) {
  if (months == null && years == null) return null
  const y = resolvePaybackYears(months, years)
  if (months != null && y != null) {
    return `${months} เดือน · ${y} ปี`
  }
  if (months != null) return `${months} เดือน`
  return `${y} ปี`
}

/** Derive years from months when missing (1 decimal) */
export function resolvePaybackYears(
  months: number | null | undefined,
  years?: number | null | undefined,
) {
  if (years != null) return years
  if (months == null) return null
  return Math.round((months / 12) * 10) / 10
}

export type LocaleLabel = { th: string; en: string }

export const PACKAGE_TYPE_LABELS: Record<string, LocaleLabel> = {
  equipment: { th: 'เครื่องชาร์จ', en: 'Equipment' },
  turnkey: { th: 'สถานีสำเร็จรูป', en: 'Turnkey Station' },
  investment: { th: 'แพ็กเกจลงทุน', en: 'Investment' },
}

export function typeLabel(type: string, locale: 'th' | 'en' | 'both' = 'both') {
  const label = PACKAGE_TYPE_LABELS[type]
  if (!label) return type
  if (locale === 'th') return label.th
  if (locale === 'en') return label.en
  return `${label.th} / ${label.en}`
}

export function displayPrice(pkg: {
  product_type: string
  price_promo: number | null
  price_list: number | null
  price_capex: number | null
}) {
  if (pkg.product_type === 'equipment') {
    const sell = pkg.price_list
    const cost = pkg.price_promo
    const value = sell ?? cost ?? null
    return {
      labelTh: sell != null ? 'ราคาแนะนำขาย' : 'ราคา',
      labelEn: sell != null ? 'Recommended sell' : 'Price',
      label: sell != null ? 'ราคาแนะนำขาย / Sell' : 'ราคา / Price',
      value,
      /** Cost reference — shown as secondary text, not a crossed-out promo */
      compareAt: sell != null && cost != null && sell !== cost ? cost : null,
      compareLabel: 'ต้นทุนเริ่มต้น / Cost from',
      pending: value == null,
    }
  }
  const value = pkg.price_capex ?? pkg.price_promo ?? pkg.price_list
  return {
    labelTh: 'CAPEX อ้างอิง',
    labelEn: 'Reference CAPEX',
    label: 'CAPEX อ้างอิง / CAPEX',
    value,
    compareAt: null as number | null,
    compareLabel: '',
    pending: value == null,
  }
}
