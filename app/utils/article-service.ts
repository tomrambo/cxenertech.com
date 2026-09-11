import { EV_SERVICE_AREAS } from './ev-service-areas'

export type ArticleService = { path: string; label: string; title: string; description: string }

/** Keep a reading guide distinct from the service page that accepts enquiries. */
export function getArticleService(slug: string): ArticleService | undefined {
  const power = /^ev-station-(120|180|240)kw$/.exec(slug)?.[1]
  if (power) return {
    path: `/ev-charging/${power}kw`,
    label: `บริการติดตั้ง EV Station ${power} kW`,
    title: `คู่มือวางแผน DC Fast Charger ${power} kW: ระบบไฟและรายการ BOQ`,
    description: `ตรวจข้อมูลโหลดไฟ หม้อแปลง รายการ BOQ และสมมติฐานการใช้งานก่อนขอใบเสนอราคา DC Fast Charger ${power} kW`,
  }
  const area = EV_SERVICE_AREAS.find((place) => slug === `tidtang-ev-station-${place.slug}`)
  if (area) return {
    path: `/ev-charging/thailand/${area.slug}`,
    label: `บริการติดตั้ง EV Station ${area.th}`,
    title: `วางแผนสถานีชาร์จใน${area.th}: ทำเล ระบบไฟ และงบลงทุน`,
    description: `คู่มือประเมินทำเล รูปแบบผู้ใช้ ระบบไฟ และรายการลงทุนสำหรับสถานีชาร์จใน${area.th} ก่อนเลือกแพ็กเกจและขอสำรวจไซต์`,
  }
  if (slug === 'ev-station-epc') return {
    path: '/ev-charging/station/epc',
    label: 'บริการรับเหมา EPC สถานีชาร์จ',
    title: 'EPC สถานีชาร์จคืออะไร: ขอบเขตงานและเอกสารที่ควรตรวจ',
    description: 'ทำความเข้าใจขอบเขต EPC สถานีชาร์จ แบบไฟฟ้า BOQ งานติดตั้ง และการส่งมอบก่อนเปรียบเทียบใบเสนอราคา',
  }
}
