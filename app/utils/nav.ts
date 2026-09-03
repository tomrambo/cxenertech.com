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
    { key: 'solarRooftop', to: '/solar/rooftop' },
    { key: 'solarPackages', to: '/solar/rooftop/packages' },
    { key: 'solarFactory', to: '/solar/rooftop/factory' },
    { key: 'solarPayback', to: '/solar/payback' },
    { key: 'solarPpa', to: '/solar/ppa' },
    { key: 'solarEpc', to: '/solar/epc' },
  ] },
  {
    key: 'evCharging',
    to: '/ev-charging',
    children: [
      { key: 'evOverview', to: '/ev-charging' },
      { key: 'evStation', to: '/ev-charging/station' },
      { key: 'evPackages', to: '/ev-charging/packages' },
      { key: 'evInvestment', to: '/ev-charging/investment' },
      { key: 'evEpc', to: '/ev-charging/station/epc' },
      { key: 'evPayback', to: '/ev-charging/packages/payback' },
    ],
  },
  { key: 'projects', to: '/projects' },
  { key: 'articles', to: '/knowledge/articles' },
  {
    key: 'knowledge',
    to: '/knowledge',
    children: [
      { key: 'knowledgeHub', to: '/knowledge' },
      { key: 'news', to: '/knowledge/news' },
      { key: 'articles', to: '/knowledge/articles' },
      { key: 'knowledgeSolar', to: '/knowledge/solar' },
      { key: 'knowledgeEv', to: '/knowledge/ev' },
      { key: 'caseStudies', to: '/knowledge/case-studies' },
      { key: 'faq', to: '/knowledge/faq' },
    ],
  },
  { key: 'contact', to: '/contact' },
]

export const footerNav = {
  company: [
    { key: 'about', to: '/about' },
    { key: 'vision', to: '/about/vision-mission' },
    { key: 'career', to: '/career' },
  ],
  solar: [
    { key: 'rooftop', to: '/solar/rooftop' },
    { key: 'peaPackages', to: '/solar/rooftop/packages' },
    { key: 'factory', to: '/solar/rooftop/factory' },
    { key: 'paybackSolar', to: '/solar/payback' },
    { key: 'ppa', to: '/solar/ppa' },
    { key: 'bess', to: '/solar/bess' },
    { key: 'epc', to: '/solar/epc' },
  ],
  ev: [
    { key: 'station', to: '/ev-charging/station' },
    { key: 'chargePackages', to: '/ev-charging/packages' },
    { key: 'evCost', to: '/ev-charging/cost' },
    { key: 'payback', to: '/ev-charging/investment' },
    { key: 'commercial', to: '/ev-charging/commercial' },
    { key: 'management', to: '/ev-charging/management' },
    { key: 'homeCharger', to: '/ev-charging/home-charger' },
  ],
  resources: [
    { key: 'projects', to: '/projects' },
    { key: 'products', to: '/products' },
    { key: 'articles', to: '/knowledge/articles' },
    { key: 'knowledge', to: '/knowledge' },
    { key: 'news', to: '/knowledge/news' },
    { key: 'caseStudies', to: '/knowledge/case-studies' },
    { key: 'faq', to: '/knowledge/faq' },
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
  line: 'cxenertech',
  address: 'เลขที่ 429/20 หมู่บ้านพรีเมี่ยมเพลส 9 ถนนสุคนธสวัสดิ์ แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230',
}
