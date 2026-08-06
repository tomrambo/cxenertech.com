export type Project = {
  slug: string
  title: string
  category: 'solar' | 'ev' | 'epc'
  categoryLabel: string
  capacity: string
  location: string
  image: string
  overview: string
  scope: string[]
  technology: string[]
  results: string[]
}

export const projects: Project[] = [
  {
    slug: 'factory-rooftop-2mw',
    title: 'โรงงานอุตสาหกรรม Solar Rooftop',
    category: 'solar',
    categoryLabel: 'Solar Projects',
    capacity: '2 MW',
    location: 'นิคมอุตสาหกรรม ภาคตะวันออก',
    image: '/images/projects/project-factory-rooftop.jpg',
    overview:
      'ติดตั้งระบบโซลาร์รูฟท็อปบนหลังคาโรงงานอุตสาหกรรม เพื่อลดต้นทุนไฟฟ้าและเพิ่มสัดส่วนพลังงานสะอาด',
    scope: ['สำรวจและออกแบบระบบ', 'จัดหาแผงและอินเวอร์เตอร์', 'ติดตั้งโครงสร้างและระบบไฟฟ้า', 'Commissioning และ Monitoring'],
    technology: ['High-efficiency Mono PERC Modules', 'String Inverters', 'Energy Monitoring Platform'],
    results: ['ลดค่าไฟเฉลี่ยต่อปีอย่างมีนัยสำคัญ', 'ระบบ Online Monitoring แบบเรียลไทม์', 'ส่งมอบตามกำหนดเวลา'],
  },
  {
    slug: 'commercial-dc-station',
    title: 'สถานีชาร์จ DC Fast Charging',
    category: 'ev',
    categoryLabel: 'EV Charging Projects',
    capacity: '4 × 120 kW',
    location: 'กรุงเทพมหานคร',
    image: '/images/projects/project-dc-station.jpg',
    overview: 'ออกแบบและก่อสร้างสถานีชาร์จเร็ว DC สำหรับผู้ใช้รถ EV ในเมือง พร้อมระบบบริหารจัดการ',
    scope: ['Station Design', 'ระบบไฟฟ้าและ Transformer', 'ติดตั้ง DC Fast Charger', 'Commissioning และ Payment Integration'],
    technology: ['DC Fast Chargers 120 kW', 'OCPP Management Platform', 'Payment Gateway'],
    results: ['เปิดให้บริการเต็มรูปแบบ', 'รองรับหลายยี่ห้อ EV', 'รายงานการใช้งานแบบรวมศูนย์'],
  },
  {
    slug: 'warehouse-solar-epc',
    title: 'คลังสินค้า Solar EPC',
    category: 'epc',
    categoryLabel: 'EPC Projects',
    capacity: '1.5 MW',
    location: 'สมุทรปราการ',
    image: '/images/projects/project-warehouse-epc.jpg',
    overview: 'บริการ EPC ครบวงจรสำหรับคลังสินค้าขนาดใหญ่ ตั้งแต่ Engineering ถึง O&M',
    scope: ['Engineering Design', 'Procurement', 'Construction', 'Commissioning', 'O&M Contract'],
    technology: ['Rooftop Mounting System', 'Central/String Hybrid Design', 'SCADA Monitoring'],
    results: ['COD สำเร็จตามแผน', 'Performance Ratio ตามเป้าหมาย', 'สัญญาบำรุงรักษาระยะยาว'],
  },
  {
    slug: 'mall-ev-hub',
    title: 'EV Charging Hub ห้างสรรพสินค้า',
    category: 'ev',
    categoryLabel: 'EV Charging Projects',
    capacity: '12 จุดชาร์จ',
    location: 'นนทบุรี',
    image: '/images/projects/project-mall-ev-hub.jpg',
    overview: 'ศูนย์ชาร์จ EV ในห้างสรรพสินค้า ผสมผสาน AC และ DC พร้อมประสบการณ์ผู้ใช้ที่ดี',
    scope: ['ออกแบบ Layout จุดจอด', 'ติดตั้ง AC/DC Chargers', 'ระบบไฟฟ้า MDB', 'Management Platform'],
    technology: ['AC Wallbox', 'DC Fast Charger', 'QR Payment', 'Remote Monitoring'],
    results: ['เพิ่มบริการลูกค้าห้าง', 'อัตราการใช้งานสูงในช่วงพีค', 'บริหารจัดการจากศูนย์กลาง'],
  },
  {
    slug: 'residential-solar-cluster',
    title: 'โซลาร์บ้านพักอาศัยกลุ่มโครงการ',
    category: 'solar',
    categoryLabel: 'Solar Projects',
    capacity: '5–10 kW / หลัง',
    location: 'ปริมณฑลกรุงเทพฯ',
    image: '/images/projects/project-residential-solar.jpg',
    overview: 'ติดตั้งโซลาร์รูฟท็อปสำหรับบ้านในโครงการจัดสรรหลายหลัง',
    scope: ['ออกแบบรายหลัง', 'ติดตั้งมาตรฐานเดียวกัน', 'ระบบ Monitoring สำหรับเจ้าของบ้าน'],
    technology: ['Residential Inverters', 'Smart Meter Integration'],
    results: ['ลูกบ้านลดค่าไฟได้ชัดเจน', 'มาตรฐานติดตั้งสม่ำเสมอ'],
  },
  {
    slug: 'fleet-depot-charging',
    title: 'Depot Charging สำหรับรถบรรทุก EV',
    category: 'epc',
    categoryLabel: 'EPC Projects',
    capacity: '8 × DC Charger',
    location: 'ชลบุรี',
    image: '/images/projects/project-fleet-depot.jpg',
    overview: 'ระบบชาร์จสำหรับกองยานพาหนะไฟฟ้าใน Depot พร้อม Load Management',
    scope: ['Load Study', 'Electrical Infrastructure', 'DC Charger EPC', 'Fleet Scheduling Integration'],
    technology: ['High-power DC', 'Load Balancing', 'Fleet Software API'],
    results: ['รองรับรอบวิ่งของกองรถ', 'ควบคุมโหลดไม่เกินสัญญาไฟฟ้า'],
  },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}

export function filterProjects(category?: string) {
  if (!category || category === 'all') return projects
  return projects.filter((p) => p.category === category)
}
