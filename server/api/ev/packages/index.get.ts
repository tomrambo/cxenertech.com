import {
  fetchCmmsChargePackageTypes,
  fetchCmmsChargePackages,
} from '../../../utils/cmms-charge-packages'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const type = typeof query.type === 'string' ? query.type : undefined
  const charge =
    query.charge === 'AC' || query.charge === 'DC' ? query.charge : undefined
  const includeTypes =
    query.includeTypes === '1' ||
    query.includeTypes === 'true' ||
    query.types === '1'

  const [{ packages, source }, typesResult] = await Promise.all([
    fetchCmmsChargePackages(event, { type, charge }),
    includeTypes
      ? fetchCmmsChargePackageTypes(event)
      : Promise.resolve(null),
  ])

  return {
    count: packages.length,
    packages,
    source,
    ...(typesResult
      ? { types: typesResult.types, typesSource: typesResult.source }
      : {}),
  }
})
