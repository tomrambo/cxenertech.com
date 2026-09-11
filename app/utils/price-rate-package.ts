export type PackageRateLink = {
  slug: string
  code: string
  price_rate_id?: string | null
  product_type: string
  active?: boolean
}

/** Link to a published equipment package, never guess another brand's slug. */
export function packageSlugForRate(
  rate: { id: string; skuCode: string },
  packages: PackageRateLink[],
): string | null {
  const pkg = packages.find((item) =>
    item.active !== false && item.product_type === 'equipment' && item.slug &&
    (item.price_rate_id === rate.id || item.code === rate.skuCode),
  )
  return pkg?.slug || null
}
