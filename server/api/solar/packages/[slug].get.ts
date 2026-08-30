import { fetchCmmsSolarPackageBySlug } from '../../../utils/cmms-solar-packages'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing package slug' })
  }

  const { package: pkg, source } = await fetchCmmsSolarPackageBySlug(event, slug)
  if (!pkg) {
    throw createError({ statusCode: 404, statusMessage: 'Package not found' })
  }

  return { package: pkg, source }
})
