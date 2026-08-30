import { fetchCmmsMediaBytes } from '../utils/cmms-media'

export default defineEventHandler(async (event) => {
  const src = String(getQuery(event).src || '')
  if (!src) {
    throw createError({ statusCode: 400, statusMessage: 'Missing media src' })
  }

  const config = useRuntimeConfig(event)
  const cmmsBase = String(config.cmmsApiBaseUrl || '').replace(/\/$/, '')
  const media = await fetchCmmsMediaBytes(src, cmmsBase)
  if (!media) {
    throw createError({ statusCode: 404, statusMessage: 'Media not found' })
  }

  setHeader(event, 'content-type', media.contentType)
  setHeader(event, 'cache-control', 'public, max-age=86400, stale-while-revalidate=604800')
  return media.bytes
})
