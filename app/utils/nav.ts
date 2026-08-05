export const mainNav = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'SOLAR', to: '/solar' },
  { label: 'EV CHARGING', to: '/ev-charging' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'KNOWLEDGE', to: '/knowledge' },
  { label: 'CONTACT', to: '/contact' },
] as const

export const footerNav = {
  company: [
    { label: 'เกี่ยวกับเรา', to: '/about' },
    { label: 'วิสัยทัศน์และพันธกิจ', to: '/about/vision-mission' },
    { label: 'องค์กร', to: '/about/organization' },
    { label: 'ร่วมงานกับเรา', to: '/career' },
  ],
  solar: [
    { label: 'Solar Rooftop', to: '/solar/rooftop' },
    { label: 'Solar Farm', to: '/solar/farm' },
    { label: 'Solar EPC', to: '/solar/epc' },
    { label: 'BOS / Electrical', to: '/solar/bos' },
  ],
  ev: [
    { label: 'Home Charger', to: '/ev-charging/home-charger' },
    { label: 'Commercial Charger', to: '/ev-charging/commercial' },
    { label: 'EV Charging Station', to: '/ev-charging/station' },
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
  tagline: 'Smart Energy & EV Infrastructure',
  email: 'info@cxenertech.com',
  phone: '+66 (0) 2-XXX-XXXX',
  line: '@cxenertech',
  address: 'กรุงเทพมหานคร ประเทศไทย',
}
