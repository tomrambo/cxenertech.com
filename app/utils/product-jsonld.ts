type ProductJsonLdInput = {
  name: string
  description: string
  sku: string
  image: string
  url: string
  price: number | null
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

  if (input.price != null && Number.isFinite(input.price) && input.price > 0) {
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
