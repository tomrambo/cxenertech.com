import { listEvPackages } from '../../../utils/ev-db'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const type = typeof query.type === 'string' ? query.type : undefined
  const packages = listEvPackages({ type })
  return {
    count: packages.length,
    packages,
  }
})
