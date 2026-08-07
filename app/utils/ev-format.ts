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
    return {
      labelTh: 'ราคาแนะนำขาย',
      labelEn: 'Recommended sell',
      label: 'ราคาแนะนำขาย / Sell',
      value: pkg.price_list ?? pkg.price_promo,
      compareAt:
        pkg.price_list && pkg.price_promo && pkg.price_list !== pkg.price_promo
          ? pkg.price_promo
          : null,
      compareLabel: 'ต้นทุนเริ่มต้น / Cost from',
    }
  }
  return {
    labelTh: 'CAPEX อ้างอิง',
    labelEn: 'Reference CAPEX',
    label: 'CAPEX อ้างอิง / CAPEX',
    value: pkg.price_capex ?? pkg.price_promo ?? pkg.price_list,
    compareAt: null as number | null,
    compareLabel: '',
  }
}
