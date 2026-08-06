import { seedPackages, getEvDbPath } from '../../../utils/ev-db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const force = query.force === '1' || query.force === 'true'
  const count = seedPackages(undefined, { force })
  return {
    ok: true,
    seeded: count,
    force,
    dbPath: getEvDbPath(),
  }
})
