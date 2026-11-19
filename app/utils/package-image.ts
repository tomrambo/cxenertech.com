/**
 * Package card/hero image — prefer absolute URL from CMMS DB (S3).
 * Relative paths are legacy local public/ assets.
 */
export function resolvePackageImage(
  image: string | null | undefined,
): string | null {
  const raw = String(image ?? '').trim()
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  return raw.startsWith('/') ? raw : `/${raw}`
}

/** Combine the cover, API images and legacy specs.imageGallery in display order. */
export function resolvePackageImages(...sources: unknown[]): string[] {
  const images = new Set<string>()

  function collect(value: unknown) {
    if (Array.isArray(value)) {
      value.forEach(collect)
      return
    }
    if (typeof value !== 'string') return

    for (const entry of value.split(/[,\r\n]+/)) {
      const raw = entry.trim()
      if (!raw) continue
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw) && !/^https?:\/\//i.test(raw)) continue
      const image = resolvePackageImage(raw)
      if (image) images.add(image)
    }
  }

  sources.forEach(collect)
  return [...images]
}
