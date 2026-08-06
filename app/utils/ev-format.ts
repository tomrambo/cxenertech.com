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
  if (min === max) return `${min} จุด`
  return `${min}–${max} จุด`
}

export const PACKAGE_TYPE_LABELS: Record<string, string> = {
  equipment: 'Equipment',
  turnkey: 'Turnkey Station',
  investment: 'Investment',
}

export function displayPrice(pkg: {
  product_type: string
  price_promo: number | null
  price_list: number | null
  price_capex: number | null
}) {
  if (pkg.product_type === 'equipment') {
    return {
      label: 'ราคาเริ่มต้น',
      value: pkg.price_promo ?? pkg.price_list,
      compareAt: pkg.price_list && pkg.price_promo && pkg.price_list !== pkg.price_promo
        ? pkg.price_list
        : null,
    }
  }
  return {
    label: 'CAPEX อ้างอิง',
    value: pkg.price_capex ?? pkg.price_promo ?? pkg.price_list,
    compareAt: null as number | null,
  }
}
