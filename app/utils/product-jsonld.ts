type ProductJsonLdInput = {
  name: string
  description: string
  sku: string
  image: string
  url: string
  price: number | null
  priceValidUntil?: string
}

function offerValidUntil(from?: string) {
  if (from) {
    const parsed = Date.parse(from)
    if (Number.isFinite(parsed)) {
      const next = new Date(parsed)
      next.setFullYear(next.getFullYear() + 1)
      return next.toISOString().slice(0, 10)
    }
  }
  return '2027-12-31'
}

/** Product + Offer that satisfies schema.org and Google merchant listing required fields. */
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
      priceValidUntil: offerValidUntil(input.priceValidUntil),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'TH',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'THB' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'TH' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 7,
            maxValue: 45,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
    }
  }

  return product
}
