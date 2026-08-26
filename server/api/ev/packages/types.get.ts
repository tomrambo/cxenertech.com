import { fetchCmmsChargePackageTypes } from '../../../utils/cmms-charge-packages'

export default defineEventHandler(async (event) => {
  const { types, source } = await fetchCmmsChargePackageTypes(event)
  return {
    count: types.length,
    types,
    source,
  }
})
