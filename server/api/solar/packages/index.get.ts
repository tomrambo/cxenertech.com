import { fetchCmmsSolarPackages } from '../../../utils/cmms-solar-packages'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const phase =
    query.phase === '1P' || query.phase === '3P' ? query.phase : undefined
  const type =
    query.type === 'on_grid' || query.type === 'hybrid' || query.type === 'off_grid'
      ? query.type
      : undefined
  const powerKw =
    typeof query.power === 'string' && query.power
      ? Number(query.power)
      : undefined

  const { packages, source, meta } = await fetchCmmsSolarPackages(event, {
    phase,
    type,
    powerKw: Number.isFinite(powerKw) ? powerKw : undefined,
  })

  return {
    count: packages.length,
    packages,
    source,
    meta,
  }
})
