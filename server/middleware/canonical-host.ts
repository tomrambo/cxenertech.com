import { canonicalRedirect } from '../utils/canonical-url'
import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'

export default defineEventHandler((event) => {
  // Prefer the original Fetch request on Workers, where the Node request is
  // an adapter. On a Node proxy use the forwarded protocol, never its host.
  const requestUrl = event.context.cloudflare?.request?.url ||
    event.context._platform?.cloudflare?.request?.url || event.web?.request?.url
  const url = requestUrl
    ? new URL(requestUrl)
    : getRequestURL(event, { xForwardedHost: false, xForwardedProto: true })
  const location = canonicalRedirect(url)
  if (!location) return
  const status = ['GET', 'HEAD'].includes(event.method) ? 301 : 308
  return sendRedirect(event, location, status)
})
