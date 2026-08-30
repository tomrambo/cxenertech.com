export type NavChild = { key: string; to: string }

export type NavItem = {
  key: string
  to: string
  children?: NavChild[]
}

export const mainNav: NavItem[] = [
  { key: 'home', to: '/' },
  { key: 'about', to: '/about' },
  { key: 'solar', to: '/solar', children: [
    { key: 'solarOverview', to: '/solar' },
    { key: 'solarPackages', to: '/solar/rooftop/packages' },
    { key: 'solarFarm', to: '/solar/farm' },
    { key: 'solarEpc', to: '/solar/epc' },
  ] },
  {
    key: 'evCharging',
    to: '/ev-charging',
    children: [
      { key: 'evOverview', to: '/ev-charging' },
      { key: 'evPackages', to: '/ev-charging/packages' },
      { key: 'evPayback', to: '/ev-charging/packages/payback' },
    ],
  },
  { key: 'projects', to: '/projects' },
  { key: 'articles', to: '/knowledge/articles' },
  { key: 'knowledge', to: '/knowledge' },
  { key: 'contact', to: '/contact' },
]

export const footerNav = {
  company: [
    { key: 'about', to: '/about' },
    { key: 'vision', to: '/about/vision-mission' },
    { key: 'org', to: '/about/organization' },
    { key: 'career', to: '/career' },
  ],
  solar: [
    { key: 'rooftop', to: '/solar/rooftop' },
    { key: 'peaPackages', to: '/solar/rooftop/packages' },
    { key: 'farm', to: '/solar/farm' },
    { key: 'epc', to: '/solar/epc' },
    { key: 'bos', to: '/solar/bos' },
  ],
  ev: [
    { key: 'homeCharger', to: '/ev-charging/home-charger' },
    { key: 'commercial', to: '/ev-charging/commercial' },
    { key: 'station', to: '/ev-charging/station' },
    { key: 'chargePackages', to: '/ev-charging/packages' },
    { key: 'payback', to: '/ev-charging/packages/payback' },
    { key: 'priceRates', to: '/ev-charging/packages/price-rates' },
    { key: 'management', to: '/ev-charging/management' },
  ],
  resources: [
    { key: 'projects', to: '/projects' },
    { key: 'products', to: '/products' },
    { key: 'articles', to: '/knowledge/articles' },
    { key: 'knowledge', to: '/knowledge' },
    { key: 'partners', to: '/partners' },
  ],
} as const

export const contactInfo = {
  company: 'CX ENERTECH',
  legalEn: 'CX ENERTECH CO., LTD.',
  legalTh: 'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด',
  tagline: 'Smart Energy & Technology Solutions',
  email: 'phachirawat.cx@gmail.com',
  phone: '+6699-624-6444',
  line: '@cxenertech',
  address: 'เลขที่ 429/20 หมู่บ้านพรีเมี่ยมเพลส 9 ถนนสุคนธสวัสดิ์ แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230',
}
