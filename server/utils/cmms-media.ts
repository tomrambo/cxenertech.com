/**
 * Resolve CMMS article media (cover + inline images).
 * Relative paths like `/images/blog/{slug}/cover.webp` live on the CMMS origin,
 * not on this website — proxy them through `/api/cmms-media`.
 */

const LOCAL_CMMS_ORIGINS = ['http://127.0.0.1:3000', 'http://localhost:3000']

export function mediaPathFromSrc(src: string) {
  const raw = src.trim()
  if (!raw) return ''
  if (raw.startsWith('/')) return raw
  try {
    const url = new URL(raw)
    return `${url.pathname}${url.search}`
  } catch {
    return raw.startsWith('/') ? raw : `/${raw}`
  }
}

export function toSiteMediaUrl(src: string | null | undefined) {
  const raw = String(src ?? '').trim()
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  const path = raw.startsWith('/') ? raw : `/${raw}`
  return `/api/cmms-media?src=${encodeURIComponent(path)}`
}

export function fallbackCoverPath(slug: string) {
  const safe = slug.replace(/[^a-z0-9\u0E00-\u0E7F-]/gi, '')
  if (!safe) return null
  return `/images/blog/${safe}/cover.webp`
}

export function firstHtmlImage(html: string) {
  const match = html.match(/<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i)
  return match?.[1]?.trim() || null
}

export function rewriteHtmlMedia(html: string) {
  return html.replace(
    /(<img\b[^>]*\bsrc\s*=\s*["'])([^"']+)(["'])/gi,
    (_full, prefix: string, src: string, suffix: string) => {
      const resolved = toSiteMediaUrl(src) || src
      return `${prefix}${resolved}${suffix}`
    },
  )
}

function hostOf(origin: string) {
  try {
    return new URL(origin).host
  } catch {
    return ''
  }
}

export function allowedMediaOrigins(cmmsBase: string) {
  const origins = [cmmsBase.replace(/\/$/, '')]
  if (import.meta.dev) origins.push(...LOCAL_CMMS_ORIGINS)
  return [...new Set(origins.filter(Boolean))]
}

export function isAllowedMediaSrc(src: string, cmmsBase: string) {
  const raw = src.trim()
  if (!raw) return false
  if (raw.startsWith('/images/')) return true
  try {
    const url = new URL(raw)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false
    const allowed = new Set(
      allowedMediaOrigins(cmmsBase)
        .map(hostOf)
        .filter(Boolean),
    )
    allowed.add('sgp1.digitaloceanspaces.com')
    return allowed.has(url.host)
  } catch {
    return false
  }
}

function isImageContentType(value: string | null) {
  const ct = (value || '').split(';')[0].trim().toLowerCase()
  return ct.startsWith('image/')
}

async function fetchImage(url: string) {
  const res = await fetch(url, {
    headers: { accept: 'image/*,*/*;q=0.8' },
  })
  if (!res.ok) return null
  const contentType = res.headers.get('content-type')
  if (!isImageContentType(contentType)) return null
  const bytes = new Uint8Array(await res.arrayBuffer())
  if (!bytes.byteLength) return null
  return { bytes, contentType: contentType || 'application/octet-stream' }
}

export async function fetchCmmsMediaBytes(
  src: string,
  cmmsBase: string,
): Promise<{ bytes: Uint8Array; contentType: string } | null> {
  const raw = src.trim()
  if (!isAllowedMediaSrc(raw, cmmsBase)) return null

  const origins = allowedMediaOrigins(cmmsBase)
  const candidates: string[] = []

  if (/^https?:\/\//i.test(raw)) {
    candidates.push(raw)
  } else {
    const path = raw.startsWith('/') ? raw : `/${raw}`
    for (const origin of origins) candidates.push(`${origin}${path}`)
  }

  for (const url of candidates) {
    try {
      const hit = await fetchImage(url)
      if (hit) return hit
    } catch {
      // try next origin
    }
  }
  return null
}
