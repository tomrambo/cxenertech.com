import { listChargerPriceRates } from '../../../database/charger-price-rates'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const currentType =
    query.type === 'AC' || query.type === 'DC' ? query.type : undefined
  const series = typeof query.series === 'string' ? query.series : undefined
  const rates = listChargerPriceRates({ currentType, series })
  return { count: rates.length, rates }
})
