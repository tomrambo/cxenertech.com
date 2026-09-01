import { fetchCmmsSolarPackages } from '../../../utils/cmms-solar-packages'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const phase =
    query.phase === '1P' || query.phase === '3P' ? query.phase : undefined
  const type =
    query.type === 'on_grid' || query.type === 'hybrid' || query.type === 'off_grid'
      ? query.type
      : undefined
  const powerRaw = Array.isArray(query.power) ? query.power[0] : query.power
  const powerKw =
    powerRaw !== undefined && powerRaw !== null && powerRaw !== '' && powerRaw !== 'all'
      ? Number(powerRaw)
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
