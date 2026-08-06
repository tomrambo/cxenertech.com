import { getEvPackageBySlug } from '../../../utils/ev-db'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing package slug' })
  }

  const pkg = getEvPackageBySlug(slug)
  if (!pkg) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  return { package: pkg }
})
