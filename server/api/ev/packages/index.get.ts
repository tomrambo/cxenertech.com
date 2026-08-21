import { fetchCmmsChargePackages } from '../../../utils/cmms-charge-packages'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = typeof query.type === 'string' ? query.type : undefined
  const charge =
    query.charge === 'AC' || query.charge === 'DC' ? query.charge : undefined

  const { packages, source } = await fetchCmmsChargePackages(event, {
    type,
    charge,
  })

  return {
    count: packages.length,
    packages,
    source,
  }
})
