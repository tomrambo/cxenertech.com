import { listEvPackages } from '../../../utils/ev-db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const type = typeof query.type === 'string' ? query.type : undefined
  const charge =
    query.charge === 'AC' || query.charge === 'DC' ? query.charge : undefined
  const packages = listEvPackages({ type, charge })
  return {
    count: packages.length,
    packages,
  }
})
