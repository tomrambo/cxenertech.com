/** 301 หน้าบาง / URL เก่า ไปหน้าที่เป็นเจ้าของคีย์เวิร์ด */
export const SEO_REDIRECTS: Record<string, string> = {
  '/login': '/',
  '/blog/ev-station-120kw': '/ev-charging/120kw',
  '/blog/ev-station-180kw': '/ev-charging/180kw',
  '/blog/ev-station-240kw': '/ev-charging/240kw',
  '/blog/ev-station-epc': '/ev-charging/station/epc',

  '/solar/epc/engineering': '/solar/epc',
  '/solar/epc/procurement': '/solar/epc',
  '/solar/epc/construction': '/solar/epc',
  '/solar/epc/commissioning': '/solar/epc',
  '/solar/epc/om': '/solar/epc',
  '/solar/bos': '/solar/epc',
  '/solar/energy-monitoring': '/solar',
  '/solar/products': '/solar/rooftop/packages',
  '/solar/farm/ground-mount': '/solar/farm',
  '/solar/farm/utility-scale': '/solar/farm',
  '/solar/farm/floating': '/solar/farm',

  '/ev-charging/products': '/ev-charging/packages',
  '/ev-charging/home-charger/ac': '/ev-charging/home-charger',
  '/ev-charging/home-charger/installation': '/ev-charging/home-charger',
  '/ev-charging/home-charger/maintenance': '/ev-charging/home-charger',
  '/ev-charging/management/charger': '/ev-charging/management',
  '/ev-charging/management/reporting': '/ev-charging/management',
  '/ev-charging/management/monitoring': '/ev-charging/management',
  '/ev-charging/management/erp': '/ev-charging/management',
  '/ev-charging/management/payment': '/ev-charging/management',

  '/smart-energy/energy-management': '/smart-energy',
  '/smart-energy/energy-monitoring': '/smart-energy',
  '/smart-energy/ev-charging-management': '/smart-energy',
  '/smart-energy/energy-optimization': '/smart-energy',
  '/smart-energy/customized': '/smart-energy',

  '/products/solar-panels': '/solar/rooftop/packages',
  '/products/solar-inverter': '/solar/rooftop/packages',
  '/products/solar-equipment': '/solar/rooftop/packages',
  '/products/ac-ev-charger': '/ev-charging/packages',
  '/products/dc-fast-charger': '/ev-charging/packages',
  '/products/ev-accessories': '/ev-charging/packages',
  '/products/charging-equipment': '/ev-charging/packages',

  '/contact/maps': '/contact',
  '/contact/line': '/contact',
  '/contact/support': '/contact',

  '/partners/technology': '/partners',
  '/partners/equipment': '/partners',
  '/partners/business': '/partners',

  '/career/life': '/career',
  '/career/positions': '/career',
  '/career/submit-resume': '/career',

  '/about/organization': '/about',
  '/about/certifications': '/about',
  '/about/business-overview': '/about',
}

export function seoRedirectTarget(path: string) {
  const clean = path.replace(/\/+$/, '') || '/'
  return SEO_REDIRECTS[clean]
}
