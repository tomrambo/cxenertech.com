import type { SeoFaq } from '~/composables/usePageSeo'
import { getProject, type Project } from '~/utils/projects'

export const knowledgeTopics = [
  {
    to: '/knowledge/news',
    title: 'ข่าวสาร',
    desc: 'อัปเดตแพ็กเกจ แนวโน้มโซลาร์และ EV Station ปี 2569',
    image: '/images/projects/project-mall-ev-hub.jpg',
  },
  {
    to: '/knowledge/articles',
    title: 'บทความ',
    desc: 'คู่มือเลือกขนาดระบบ จุดคืนทุน PPA และ DC Fast',
    image: '/images/projects/project-residential-solar.jpg',
  },
  {
    to: '/knowledge/solar',
    title: 'ความรู้ Solar',
    desc: 'บ้าน โรงงาน Hybrid BESS และรับติดตั้งโซล่าเซลล์',
    image: '/images/projects/project-factory-rooftop.jpg',
  },
  {
    to: '/knowledge/ev',
    title: 'ความรู้ EV',
    desc: 'สร้างสถานีชาร์จ ขออนุญาต หม้อแปลง และงบลงทุน',
    image: '/images/projects/project-dc-station.jpg',
  },
  {
    to: '/knowledge/case-studies',
    title: 'กรณีศึกษา',
    desc: 'โรงงาน คลังสินค้า สถานี DC Hub และโซลาร์บ้าน',
    image: '/images/projects/project-warehouse-epc.jpg',
  },
  {
    to: '/knowledge/faq',
    title: 'FAQ',
    desc: 'คำถามที่พบบ่อยเรื่องราคา คุ้มไหม และยื่นการไฟฟ้า',
    image: '/images/projects/project-fleet-depot.jpg',
  },
] as const

export const knowledgeFaqGroups: { title: string; items: SeoFaq[] }[] = [
  {
    title: 'โซล่าเซลล์',
    items: [
      {
        q: 'รับติดตั้งโซล่าเซลล์ใช้เวลากี่วัน?',
        a: 'บ้านพักอาศัยโดยทั่วไปติดตั้ง 1–3 วัน โรงงานขึ้นกับขนาดระบบและงานโครงสร้าง อาจใช้เวลาหลายสัปดาห์รวมออกแบบและยื่นการไฟฟ้า',
      },
      {
        q: 'ติดโซล่าเซลล์คุ้มไหม คืนทุนกี่ปี?',
        a: 'ขึ้นกับค่าไฟต่อหน่วยและการใช้ไฟกลางวัน ดูประมาณการจากหน้าจุดคืนทุนโซล่าเซลล์ แล้วให้ทีมคำนวณจากบิลจริง',
      },
      {
        q: 'ราคาติดตั้งโซล่าเซลล์ดูได้ที่ไหน?',
        a: 'ราคาเริ่มต้นอยู่ที่แพ็กเกจโซล่าเซลล์ ไม่รวมงานเสริมหน้างาน ใบเสนอราคาจริงขอได้ที่หน้าขอใบเสนอราคาโซล่าเซลล์',
      },
      {
        q: 'โรงงานควรติดขนาดเท่าไร?',
        a: 'ดูบิล 12 เดือนและพื้นที่หลังคา ขนาดที่ค้นบ่อยคือ 100 kW 200 kW 500 kW และ 1 MW',
      },
      {
        q: 'ติดโซล่าเซลล์ไม่ต้องลงทุนเองได้ไหม?',
        a: 'โมเดล PPA solar rooftop เหมาะกับโรงงานและอาคารใหญ่ ผู้ให้บริการลงทุนระบบให้ คุณจ่ายตามหน่วยที่ผลิต',
      },
    ],
  },
  {
    title: 'EV Station',
    items: [
      {
        q: 'สร้าง EV Station ต้องขออนุญาตอะไร?',
        a: 'โดยทั่วไปยื่นการไฟฟ้า แบบก่อสร้าง และมาตรฐานติดตั้ง ดูขั้นตอนที่หน้าขออนุญาต EV Station',
      },
      {
        q: 'ลงทุน EV Station คุ้มไหม คืนทุนกี่ปี?',
        a: 'ขึ้นกับทำเล ค่าไฟ และจำนวนครั้งชาร์จ ดูกรอบที่หน้าลงทุน EV Station และตารางจุดคืนทุนแพ็กเกจ',
      },
      {
        q: 'ราคา EV Station ดูได้ที่ไหน?',
        a: 'สรุปต้นทุนที่หน้าราคา EV Station เรทเครื่องที่ตารางราคาเครื่องชาร์จ ใบเสนอราคาจริงขอที่หน้าขอใบเสนอราคา EV Station',
      },
      {
        q: 'เครื่องชาร์จ EV ที่บ้านใช้ไฟบ้านได้หรือไม่?',
        a: 'ได้ ทีมจะสำรวจและออกแบบระบบไฟฟ้าให้เหมาะสมกับโหลดและความปลอดภัย',
      },
      {
        q: 'สามารถเชื่อม Solar กับ EV Charger ได้ไหม?',
        a: 'ได้ ดูแนวทางที่หน้าโซลาร์สำหรับ EV Station',
      },
    ],
  },
]

export const knowledgeFaqs: SeoFaq[] = knowledgeFaqGroups.flatMap((group) => group.items)

export type KnowledgeCase = {
  slug: string
  lesson: string
  challenge: string
  approach: string[]
  quoteCta: { label: string; to: string }
}

export const knowledgeCases: KnowledgeCase[] = [
  {
    slug: 'factory-rooftop-2mw',
    lesson: 'โรงงานขนาดใหญ่คุ้มเมื่อโหลดกลางวันสูงและหลังคาต่อเนื่อง',
    challenge:
      'โรงงานในนิคมต้องการลดค่าไฟโดยไม่หยุดไลน์ผลิต หลังคากว้างแต่ต้องวางแผนโครงสร้างและช่วงเชื่อมไฟฟ้า',
    approach: [
      'สำรวจโครงสร้างและบิล 12 เดือน',
      'ออกแบบ rooftop 2 MW แบบ EPC',
      'ติดตั้งเป็นโซน ไม่ปิดทั้งโรง',
      'ส่งมอบพร้อมมอนิเตอร์ออนไลน์',
    ],
    quoteCta: { label: 'โซล่าเซลล์โรงงาน', to: '/solar/rooftop/factory' },
  },
  {
    slug: 'commercial-dc-station',
    lesson: 'DC Fast ในเมืองต้องการหม้อแปลง แพลตฟอร์มคิดเงิน และตรวจรับก่อนเปิด',
    challenge:
      'จุดบริการในกรุงเทพต้องการชาร์จเร็ว 4 × 120 kW โดยไม่ให้ระบบไฟฟ้าอาคารล้น',
    approach: [
      'ออกแบบโหลดและจุดจอด',
      'ติดตั้ง DC 120 kW พร้อม OCPP',
      'เชื่อมระบบชำระเงิน',
      'commissioning ก่อนเปิดบริการ',
    ],
    quoteCta: { label: 'DC Fast Charger', to: '/ev-charging/commercial/dc-fast' },
  },
  {
    slug: 'warehouse-solar-epc',
    lesson: 'คลังสินค้าได้เปรียบจากหลังคาเมทัลยาว แต่งาน EPC ต้องคุมตารางส่งมอบ',
    challenge:
      'คลังสมุทรปราการมีพื้นที่หลังคาใหญ่ ต้องการผู้รับเหมารายเดียวตั้งแต่แบบถึง O&M',
    approach: [
      'Engineering และจัดซื้อตามสเปก',
      'ก่อสร้างและทดสอบ 1.5 MW',
      'ล็อก Performance Ratio',
      'สัญญาบำรุงรักษาระยะยาว',
    ],
    quoteCta: { label: 'โซล่าเซลล์คลังสินค้า', to: '/solar/rooftop/warehouse' },
  },
  {
    slug: 'mall-ev-hub',
    lesson: 'ห้างใช้ AC คู่ DC เพื่อรองรับทั้งจอดนานและชาร์จแล้วไปต่อ',
    challenge:
      'ที่จอดห้างนนทบุรีต้องการ 12 จุดชาร์จ โดยไม่รบกวนการเดินรถในลาน',
    approach: [
      'ผังจุดจอดและป้าย',
      'ผสม AC wallbox กับ DC Fast',
      'QR Payment และมอนิเตอร์รวมศูนย์',
    ],
    quoteCta: { label: 'EV สำหรับธุรกิจ', to: '/ev-charging/commercial' },
  },
  {
    slug: 'residential-solar-cluster',
    lesson: 'โครงการบ้านจัดสรรคุ้มเมื่อมาตรฐานติดตั้งสม่ำเสมอรายหลัง',
    challenge:
      'หลายหลังในปริมณฑลต้องการโซลาร์ 5–10 kW โดยเจ้าของบ้านไม่ต้องประสานช่างเอง',
    approach: [
      'ออกแบบรายหลังตามมิเตอร์',
      'ติดตั้งชุดมาตรฐานเดียวกัน',
      'มอนิเตอร์ให้เจ้าของบ้านดูเอง',
    ],
    quoteCta: { label: 'โซล่าเซลล์บ้าน', to: '/solar/rooftop/residential' },
  },
  {
    slug: 'fleet-depot-charging',
    lesson: 'ฟลีตชาร์จตามรอบกะ ต้องบาลานซ์โหลดไม่ให้เกินสัญญาไฟฟ้า',
    challenge:
      'เดโปชลบุรีมีรถบรรทุก EV หลายคันกลับพร้อมกันหลังกะ เสี่ยงดีมานด์พุ่ง',
    approach: [
      'ศึกษาโหลดและตารางวิ่ง',
      'ติดตั้ง DC หลายหัวพร้อม load management',
      'เชื่อมซอฟต์แวร์กองรถ',
    ],
    quoteCta: { label: 'EV Station EPC', to: '/ev-charging/station/epc' },
  },
]

export function getKnowledgeCase(slug: string): (KnowledgeCase & { project: Project }) | null {
  const extra = knowledgeCases.find((item) => item.slug === slug)
  const project = getProject(slug)
  if (!extra || !project) return null
  return { ...extra, project }
}
