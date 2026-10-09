export const FLOOD_CATEGORY_SLUG = 'flood-electrical'
export const FLOOD_CATEGORY_NAME = 'ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม'

export type FloodServiceKind = 'package' | 'addon' | 'quote'

export type FloodMarketplaceService = {
  id: number
  slug: string
  name: string
  nameEn: string
  description: string
  priceHint: string
  priceThb: number | null
  unit: string
  pricingKind: string
  sortOrder: number
  kind: FloodServiceKind
  bookable: boolean
}

export type FloodMarketplaceCatalog = {
  categoryName: string
  categorySlug: string
  services: FloodMarketplaceService[]
}

type RawService = {
  id?: number
  slug?: string
  name?: string
  nameEn?: string | null
  description?: string | null
  priceHint?: string | null
  priceStart?: string | number | null
  unit?: string | null
  pricingKind?: string | null
  sortOrder?: number
}

type RawCategory = {
  slug?: string
  name?: string
  services?: RawService[]
}

/** ราคาแพ็กเกจบนเว็บสูงกว่าราคา Marketplace 50% รายการเสริมและงานประเมินไม่เปลี่ยน */
export const FLOOD_PACKAGE_MARKUP = 1.5

function kindFor(slug: string, priceThb: number | null): FloodServiceKind {
  if (slug.startsWith('flood-pkg-')) return 'package'
  if (priceThb && priceThb > 0) return 'addon'
  return 'quote'
}

function markedUpBaht(amount: number) {
  return Math.round(amount * FLOOD_PACKAGE_MARKUP)
}

function formatMarkedBaht(amount: number) {
  return markedUpBaht(amount).toLocaleString('en-US')
}

function scalePriceHint(hint: string) {
  let scaledListPrice = false
  return hint.replace(/(ประหยัด\s*)?(\d[\d,]*)/g, (all, prefix: string | undefined, raw: string) => {
    const amount = Number(raw.replace(/,/g, ''))
    if (!Number.isFinite(amount) || amount <= 0) return all
    if (prefix) return `${prefix}${formatMarkedBaht(amount)}`
    if (scaledListPrice) return all
    scaledListPrice = true
    return formatMarkedBaht(amount)
  })
}

function scaleSavings(text: string) {
  return text.replace(/ประหยัด\s*(\d[\d,]*)\s*บาท/g, (_all, raw: string) => {
    const amount = Number(raw.replace(/,/g, ''))
    if (!Number.isFinite(amount) || amount <= 0) return _all
    return `ประหยัด ${formatMarkedBaht(amount)} บาท`
  })
}

export function parseFloodMarketplace(payload: unknown): FloodMarketplaceCatalog {
  const categories = (payload as { categories?: RawCategory[] } | null)?.categories
  const category = Array.isArray(categories)
    ? categories.find(
        (item) =>
          item?.slug === FLOOD_CATEGORY_SLUG ||
          String(item?.name || '').trim() === FLOOD_CATEGORY_NAME,
      )
    : undefined
  if (!category) {
    return { categoryName: FLOOD_CATEGORY_NAME, categorySlug: FLOOD_CATEGORY_SLUG, services: [] }
  }

  const services = (category.services || [])
    .map((service) => {
      const slug = String(service.slug || '').trim()
      const parsed = Number(service.priceStart)
      const listPrice = Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null
      const kind = kindFor(slug, listPrice)
      const priceThb = kind === 'package' && listPrice ? markedUpBaht(listPrice) : listPrice
      const priceHint = String(service.priceHint || '').trim()
      const description = String(service.description || '').trim()
      return {
        id: Number(service.id) || 0,
        slug,
        name: String(service.name || '').trim(),
        nameEn: String(service.nameEn || '').trim(),
        description: kind === 'package' ? scaleSavings(description) : description,
        priceHint: kind === 'package' ? scalePriceHint(priceHint) : priceHint,
        priceThb,
        unit: String(service.unit || '').trim(),
        pricingKind: String(service.pricingKind || '').trim(),
        sortOrder: Number(service.sortOrder) || 0,
        kind,
        bookable: kind !== 'quote' && priceThb !== null,
      }
    })
    .filter((service) => service.slug && service.name)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    categoryName: String(category.name || FLOOD_CATEGORY_NAME),
    categorySlug: String(category.slug || FLOOD_CATEGORY_SLUG),
    services,
  }
}

export function bookableFloodServices(catalog: FloodMarketplaceCatalog) {
  return catalog.services.filter((service) => service.bookable)
}

export function lowestFloodPrice(catalog: FloodMarketplaceCatalog) {
  const primary = catalog.services.filter((service) => service.kind === 'package' && service.priceThb)
  const priced = primary.length ? primary : bookableFloodServices(catalog)
  const prices = priced.map((service) => service.priceThb).filter((price): price is number => price !== null)
  return prices.length ? Math.min(...prices) : null
}
