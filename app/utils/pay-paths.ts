export type PayAsset = 'solar' | 'ev'

export function quoteFormTo(asset: PayAsset, packageCode?: string) {
  const q = new URLSearchParams({ type: asset })
  if (packageCode) q.set('package', packageCode)
  return `/contact/quotation?${q.toString()}`
}

export function financeFormTo(asset: PayAsset, packageCode?: string) {
  const q = new URLSearchParams({ intent: 'finance', type: asset })
  if (packageCode) q.set('package', packageCode)
  return `/contact/quotation?${q.toString()}`
}

export function financePageTo(asset: PayAsset) {
  return asset === 'solar' ? '/solar/finance' : '/ev-charging/finance'
}

export function packagesPageTo(asset: PayAsset) {
  return asset === 'solar' ? '/solar/rooftop/packages' : '/ev-charging/packages'
}

/** Investment packages are a different intent — do not attach owner-finance forms. */
export function isOwnerFinancePackage(productType?: string) {
  return productType !== 'investment'
}
