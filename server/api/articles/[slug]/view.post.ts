import { recordCmmsArticleView } from '../../../utils/cmms-posts'

const VISITOR_RE = /^[a-zA-Z0-9_-]{8,80}$/

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')?.trim()
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing article slug' })
  }

  const body = ((await readBody(event).catch(() => null)) ?? {}) as {
    visitorId?: unknown
  }
  const visitorId = String(body.visitorId ?? '').trim()
  if (!VISITOR_RE.test(visitorId)) {
    throw createError({ statusCode: 400, statusMessage: 'ต้องส่ง visitorId' })
  }

  return recordCmmsArticleView(event, slug, visitorId)
})
