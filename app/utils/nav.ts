export type NavChild = { label: string; to: string }

export type NavItem = {
  label: string
  to: string
  children?: NavChild[]
}

export const mainNav: NavItem[] = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'SOLAR', to: '/solar', children: [
    { label: 'Overview', to: '/solar' },
    { label: 'Solar Packages', to: '/solar/rooftop/packages' },
    { label: 'Solar Farm', to: '/solar/farm' },
    { label: 'Solar EPC', to: '/solar/epc' },
  ] },
  {
    label: 'EV CHARGING',
    to: '/ev-charging',
    children: [
      { label: 'Overview', to: '/ev-charging' },
      { label: 'CX Charge Packages', to: '/ev-charging/packages' },
      { label: 'Payback / จุดคืนทุน', to: '/ev-charging/packages/payback' },
      // { label: 'Price Rates', to: '/ev-charging/packages/price-rates' },
      // { label: 'Investment', to: '/ev-charging/investment' },
      // { label: 'Home Charger', to: '/ev-charging/home-charger' },
      // { label: 'Commercial Charger', to: '/ev-charging/commercial' },
      // { label: 'EV Station', to: '/ev-charging/station' },
      // { label: 'Management', to: '/ev-charging/management' },
    ],
  },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'KNOWLEDGE', to: '/knowledge' },
  { label: 'CONTACT', to: '/contact' },
]

export const footerNav = {
  company: [
    { label: 'เกี่ยวกับเรา', to: '/about' },
    { label: 'วิสัยทัศน์และพันธกิจ', to: '/about/vision-mission' },
    { label: 'องค์กร', to: '/about/organization' },
    { label: 'ร่วมงานกับเรา', to: '/career' },
  ],
  solar: [
    { label: 'Solar Rooftop', to: '/solar/rooftop' },
    { label: 'PEA Solar Packages', to: '/solar/rooftop/packages' },
    { label: 'Solar Farm', to: '/solar/farm' },
    { label: 'Solar EPC', to: '/solar/epc' },
    { label: 'BOS / Electrical', to: '/solar/bos' },
  ],
  ev: [
    { label: 'Home Charger', to: '/ev-charging/home-charger' },
    { label: 'Commercial Charger', to: '/ev-charging/commercial' },
    { label: 'EV Charging Station', to: '/ev-charging/station' },
    { label: 'CX Charge Packages', to: '/ev-charging/packages' },
    { label: 'Payback / จุดคืนทุน', to: '/ev-charging/packages/payback' },
    { label: 'Price Rates', to: '/ev-charging/packages/price-rates' },
    { label: 'Management Platform', to: '/ev-charging/management' },
  ],
  resources: [
    { label: 'โครงการ', to: '/projects' },
    { label: 'ผลิตภัณฑ์', to: '/products' },
    { label: 'ศูนย์ความรู้', to: '/knowledge' },
    { label: 'พันธมิตร', to: '/partners' },
  ],
} as const

export const contactInfo = {
  company: 'CX ENERTECH',
  legalEn: 'CX ENERTECH CO., LTD.',
  legalTh: 'บริษัท ซีเอ็กซ์ เอเนอร์เทค จำกัด',
  tagline: 'Smart Energy & Technology Solutions',
  email: 'info@cxenertech.com',
  phone: '+6699-624-6444',
  line: '@cxenertech',
  address: 'เลขที่ 429/20 หมู่บ้านพรีเมี่ยมเพลส 9 ถนนสุคนธสวัสดิ์ แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230',
}
