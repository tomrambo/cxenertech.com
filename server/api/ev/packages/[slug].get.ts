import { getChargerPriceRate } from '../../../database/charger-price-rates'
import { getChargerSpec } from '../../../database/charger-specs'
import { fetchCmmsChargePackageBySlug } from '../../../utils/cmms-charge-packages'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing package slug' })
  }

  const { package: pkg, source } = await fetchCmmsChargePackageBySlug(event, slug)
  if (!pkg) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  const priceRate = pkg.price_rate_id ? getChargerPriceRate(pkg.price_rate_id) : null
  const chargerSpec = pkg.spec_id ? getChargerSpec(pkg.spec_id) : null

  return {
    package: pkg,
    priceRate,
    chargerSpec,
    source,
  }
})
