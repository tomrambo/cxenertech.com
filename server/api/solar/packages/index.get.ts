import { listSolarPackages } from '../../../utils/solar-db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const phase =
    query.phase === '1P' || query.phase === '3P' ? query.phase : undefined
  const inverter =
    query.inverter === 'string' || query.inverter === 'micro'
      ? query.inverter
      : undefined
  const powerKw =
    typeof query.power === 'string' && query.power
      ? Number(query.power)
      : undefined

  const packages = listSolarPackages({
    phase,
    inverter,
    powerKw: Number.isFinite(powerKw) ? powerKw : undefined,
  })

  return { count: packages.length, packages }
})
