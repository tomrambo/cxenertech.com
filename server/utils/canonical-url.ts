/** Only normalize our public hosts; keep localhost and preview hosts usable. */
export function canonicalRedirect(requestUrl: URL): string | null {
  if (!['cxenertech.com', 'www.cxenertech.com'].includes(requestUrl.hostname)) return null
  if (requestUrl.protocol === 'https:' && requestUrl.hostname === 'www.cxenertech.com') return null

  return `https://www.cxenertech.com${requestUrl.pathname}${requestUrl.search}`
}
