type ProductJsonLdInput = {
  name: string
  description: string
  sku: string
  image: string
  url: string
  price: number | null
  /** Set only for a confirmed offer, never for starting prices or reference CAPEX. */
  priceIsExact?: boolean
  priceValidUntil?: string
}

/** Product pricing uses only catalog facts; fulfillment policies require verified data. */
export function buildProductJsonLd(input: ProductJsonLdInput) {
  const product: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    sku: input.sku,
    brand: { '@type': 'Brand', name: 'CX ENERTECH' },
    image: [input.image],
  }

  if (input.priceIsExact && input.price != null && Number.isFinite(input.price) && input.price > 0) {
    product.offers = {
      '@type': 'Offer',
      url: input.url,
      priceCurrency: 'THB',
      price: input.price.toFixed(2),
      ...(input.priceValidUntil && /^\d{4}-\d{2}-\d{2}$/.test(input.priceValidUntil)
        && Number.isFinite(Date.parse(input.priceValidUntil))
        ? { priceValidUntil: input.priceValidUntil }
        : {}),
      seller: {
        '@type': 'Organization',
        name: 'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด',
      },
    }
  }

  return product
}

/** Custom installation packages require a site quotation, not a fixed product offer. */
export function buildServiceJsonLd(input: Pick<ProductJsonLdInput, 'name' | 'description' | 'url' | 'image'>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: input.url,
    image: input.image,
    provider: { '@id': `${new URL(input.url).origin}/#business` },
  }
}
