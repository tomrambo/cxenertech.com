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
