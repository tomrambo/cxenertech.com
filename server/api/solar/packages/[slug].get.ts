import { getSolarPackageBySlug } from '../../../utils/solar-db'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing package slug' })
  }

  const pkg = getSolarPackageBySlug(slug)
  if (!pkg) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  return { package: pkg }
})
