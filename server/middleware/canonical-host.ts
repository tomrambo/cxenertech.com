/**
 * Apex (cxenertech.com) must 301 to www. If Cloudflare returns 522 on apex,
 * this never runs — the custom domain still has to point at the same Worker.
 */
const APEX_HOST = 'cxenertech.com'
const CANONICAL_HOST = 'www.cxenertech.com'

export default defineEventHandler((event) => {
  const hostHeader = getRequestHeader(event, 'host') || getRequestHeader(event, 'x-forwarded-host') || ''
  const host = hostHeader.split(',')[0].split(':')[0].trim().toLowerCase()
  if (host !== APEX_HOST) return

  const url = getRequestURL(event)
  const location = `https://${CANONICAL_HOST}${url.pathname}${url.search}`
  return sendRedirect(event, location, 301)
})
