import type { SeoCrumb, SeoFaq } from '~/composables/usePageSeo'

export type EvLandingSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export type EvLanding = {
  path: string
  heroTitle: string
  heroDescription: string
  seoTitle: string
  seoDescription: string
  crumbs: SeoCrumb[]
  intro: string[]
  sections: EvLandingSection[]
  features?: { title: string; desc: string }[]
  faqs: SeoFaq[]
  related: { label: string; to: string }[]
  ctaTitle?: string
  ctaDescription?: string
}

const home: SeoCrumb = { name: 'หน้าแรก', path: '/' }
const ev: SeoCrumb = { name: 'EV Charging', path: '/ev-charging' }
const station: SeoCrumb = { name: 'EV Station', path: '/ev-charging/station' }

export const evLandings: Record<string, EvLanding> = {
  station: {
    path: '/ev-charging/station',
    heroTitle: 'รับติดตั้ง EV Station — สถานีชาร์จรถยนต์ไฟฟ้า ครบวงจร',
    heroDescription:
      'บริษัทติดตั้งสถานีชาร์จรถไฟฟ้า จากออกแบบ ก่อสร้าง EPC ถึงแพลตฟอร์มบริหาร โดย CX ENERTECH',
    seoTitle: 'รับติดตั้ง EV Station | สถานีชาร์จรถยนต์ไฟฟ้า',
    seoDescription:
      'รับสร้างและติดตั้ง EV Station สถานีชาร์จรถยนต์ไฟฟ้า ครบวงจร ดูราคา แพ็กเกจ และขอใบเสนอราคาจาก CX ENERTECH',
    crumbs: [home, ev, { name: 'รับติดตั้ง EV Station', path: '/ev-charging/station' }],
    intro: [
      'CX ENERTECH เป็นผู้รับเหมา EV Station ที่รับงานติดตั้งสถานีชาร์จรถยนต์ไฟฟ้าแบบครบวงจร ไม่ได้ขายเครื่องอย่างเดียว งานครอบคลุมสำรวจทำเล ออกแบบโหลดไฟฟ้า ติดตั้ง DC/AC ยื่นการไฟฟ้า และส่งมอบพร้อมระบบคิดเงิน',
      'ลูกค้าที่ค้นหาคำว่าสร้าง EV Station รับติดตั้ง EV Station หรือติดตั้งสถานีชาร์จรถไฟฟ้า มักต้องการทีมที่รับผิดชอบหน้างานได้จริง เราจึงรวมแพ็กเกจราคาอ้างอิง จุดคืนทุน และงาน EPC ไว้ในที่เดียว',
    ],
    sections: [
      {
        heading: 'บริการติดตั้ง EV Station ครอบคลุมทุกไซต์',
        paragraphs: [
          'งานติดตั้ง EV Station ของเราแบ่งตามประเภทพื้นที่ชัดเจน เพื่อให้กำลังชาร์จ หม้อแปลง และงบลงทุนตรงกับปริมาณรถและความจุไฟฟ้า',
        ],
        bullets: [
          'สถานีชาร์จสาธารณะและ EV Hub',
          'ปั๊มน้ำมัน โรงแรม ห้าง ร้านอาหาร',
          'โรงงาน ฟลีต และที่จอดองค์กร',
          'ระบบ DC Fast และ AC สำหรับธุรกิจ',
        ],
      },
      {
        heading: 'ราคา EV Station คิดอย่างไร',
        paragraphs: [
          'ราคาสถานีชาร์จรถยนต์ไฟฟ้าไม่ได้มีเรทเดียวทั้งตลาด ขึ้นกับกำลังเครื่อง (120 / 180 / 240 kW) จำนวนจุดชาร์จ งานหม้อแปลง ตู้ MDB สายไฟ หลังคา และแพลตฟอร์มคิดเงิน',
          'ดูต้นทุนอ้างอิงที่หน้าราคา EV Station และแพ็กเกจ CX Charge แล้วให้ทีมประเมินไซต์เพื่อออกใบเสนอราคา',
        ],
      },
      {
        heading: 'ขั้นตอนรับสร้าง EV Station',
        paragraphs: ['งานรับสร้างสถานีชาร์จรถไฟฟ้าเดินเป็นขั้น ไม่ทิ้งลูกค้าไว้กับผู้รับเหมาย่อยหลายราย'],
        bullets: [
          'สำรวจทำเลและตรวจระบบไฟฟ้า / หม้อแปลง',
          'ออกแบบผังจุดจอด โหลด และแบบก่อสร้าง',
          'ยืนยันแพ็กเกจและงบลงทุน',
          'ติดตั้งเครื่องชาร์จ งานไฟฟ้า และโครงสร้าง',
          'ทดสอบ ตรวจรับ และเปิดให้บริการพร้อมแพลตฟอร์ม',
        ],
      },
    ],
    features: [
      { title: 'ทีมติดตั้งเอง', desc: 'วิศวกรและช่างสถานีชาร์จดูแลหน้างาน ไม่ส่งต่อมั่ว' },
      { title: 'แพ็กเกจพร้อมราคา', desc: 'เลือก DC 60–240 kW และสถานีสำเร็จรูปได้ทันที' },
      { title: 'EPC ถึง O&M', desc: 'ออกแบบ ติดตั้ง ขออนุญาต และดูแลสถานีหลังเปิด' },
    ],
    faqs: [
      {
        q: 'รับติดตั้ง EV Station ใช้เวลากี่วัน?',
        a: 'จุด AC เล็กอาจเสร็จในไม่กี่วัน สถานี DC Fast ที่มีหม้อแปลงและขยายเขตไฟฟ้ารวมออกแบบ–ยื่น กฟฟ. มักใช้เวลาหลายสัปดาห์ถึงหลายเดือน',
      },
      {
        q: 'บริษัทติดตั้ง EV Station ยื่นการไฟฟ้าให้ไหม?',
        a: 'รวมในขอบเขตงานมาตรฐาน ทั้งแบบไฟฟ้า ขออนุญาต ขยายเขต และตรวจรับก่อนเปิดสถานี',
      },
      {
        q: 'ราคาติดตั้งสถานีชาร์จรถไฟฟ้าดูได้ที่ไหน?',
        a: 'ราคาเริ่มต้นอยู่ที่แพ็กเกจและหน้าราคา EV Station ไม่รวมงานเสริมเฉพาะไซต์ ใบเสนอราคาจริงต้องสำรวจทำเล',
      },
    ],
    related: [
      { label: 'ราคาและต้นทุน EV Station', to: '/ev-charging/cost' },
      { label: 'ลงทุน / จุดคืนทุน', to: '/ev-charging/investment' },
      { label: 'EV Station Turnkey EPC', to: '/ev-charging/station/epc' },
      { label: 'DC Fast Charger', to: '/ev-charging/commercial/dc-fast' },
      { label: 'สถานีชาร์จสำหรับธุรกิจ', to: '/ev-charging/commercial' },
      { label: 'ขอใบเสนอราคา EV Station', to: '/ev-charging/quotation' },
    ],
    ctaTitle: 'ต้องการผู้รับเหมา EV Station ประเมินไซต์?',
    ctaDescription: 'ส่งผังที่จอดและข้อมูลมิเตอร์ เพื่อรับใบเสนอราคาติดตั้งสถานีชาร์จรถยนต์ไฟฟ้า',
  },

  cost: {
    path: '/ev-charging/cost',
    heroTitle: 'ราคา EV Station — ต้นทุนสร้างสถานีชาร์จรถไฟฟ้า',
    heroDescription: 'ดูงบลงทุน ค่าติดตั้ง และราคาเครื่องชาร์จ DC 120 / 180 / 240 kW ก่อนตัดสินใจ',
    seoTitle: 'ราคา EV Station | ต้นทุนสถานีชาร์จรถยนต์ไฟฟ้า',
    seoDescription:
      'ราคา EV Station ต้นทุนสร้างสถานีชาร์จรถไฟฟ้า ค่าติดตั้ง และราคา DC Fast Charger 120 180 240 kW โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'ราคา EV Station', path: '/ev-charging/cost' }],
    intro: [
      'ราคาสถานีชาร์จรถยนต์ไฟฟ้าประกอบด้วยเครื่องชาร์จ งานไฟฟ้า โครงสร้าง และซอฟต์แวร์ ไม่ใช่แค่ราคาเครื่องชาร์จ EV ตัวเดียว หน้านี้สรุปต้นทุนสร้าง EV Station ให้เห็นกรอบก่อนขอใบเสนอราคา',
      'ค่าใช้จ่ายติดตั้ง EV Station แปรตามกำลัง DC จำนวนหัวชาร์จ ระยะสาย ตู้ MDB และว่าต้องขยายเขตไฟฟ้าหรือขอหม้อแปลงใหม่หรือไม่',
    ],
    sections: [
      {
        heading: 'งบลงทุน EV Station แบ่งเป็นอะไรบ้าง',
        paragraphs: ['งบลงทุนสถานีชาร์จรถไฟฟ้าโดยทั่วไปมี 4 ก้อน'],
        bullets: [
          'เครื่องชาร์จ DC / AC และหัวชาร์จ',
          'งานไฟฟ้า หม้อแปลง ตู้ MDB RMU และสายไฟ',
          'งานโยธา จุดจอด หลังคา ป้าย กล้อง',
          'แพลตฟอร์มคิดเงิน มอนิเตอร์ และค่าออกแบบ',
        ],
      },
      {
        heading: 'ราคาเครื่องชาร์จ DC ตามกำลัง',
        paragraphs: [
          'ราคา DC Fast Charger และราคา EV Charger สำหรับธุรกิจดูได้จากเรทเครื่องตามจำนวน และจากแพ็กเกจสถานี ขนาดที่ค้นบ่อยคือ 120 kW 180 kW และ 240 kW รวมถึง EV Hub หลายจุดชาร์จ',
        ],
      },
      {
        heading: 'ค่าออกแบบและค่าติดตั้ง',
        paragraphs: [
          'ค่าออกแบบ EV Station รวมผังจุดจอด แบบไฟฟ้า และเอกสารการไฟฟ้า ค่าติดตั้งขึ้นกับหน้างาน ไม่ใช้เรทเดียวกับทุกที่จอด',
        ],
      },
    ],
    faqs: [
      {
        q: 'ราคา EV Station เริ่มต้นเท่าไร?',
        a: 'จุด DC เดี่ยวกับสถานีหลายหัวคนละระดับ ดูแพ็กเกจและตารางเรทเครื่องเป็นราคาตั้งต้น แล้วยืนยันหลังสำรวจโหลดไฟฟ้า',
      },
      {
        q: 'ราคา EV Hub ต่างจากเครื่องเดี่ยวอย่างไร?',
        a: 'Hub รวมหลายจุดชาร์จ งานไฟฟ้าใหญ่กว่า และมักมี canopy กับระบบคิดเงินรวม ต้นทุนต่อหัวอาจต่ำกว่าแต่ CAPEX รวมสูงกว่า',
      },
    ],
    related: [
      { label: 'ตารางเรทเครื่องชาร์จ', to: '/ev-charging/packages/price-rates' },
      { label: 'แพ็กเกจ CX Charge', to: '/ev-charging/packages' },
      { label: 'EV Station 120 kW', to: '/ev-charging/120kw' },
      { label: 'EV Station 180 kW', to: '/ev-charging/180kw' },
      { label: 'EV Station 240 kW', to: '/ev-charging/240kw' },
      { label: 'ลงทุนและ ROI', to: '/ev-charging/investment' },
    ],
    ctaTitle: 'ต้องการประเมินต้นทุน EV Station ตามงบ?',
    ctaDescription: 'ส่งจำนวนจุดชาร์จและข้อมูลมิเตอร์ เพื่อรับกรอบงบลงทุน',
  },

  investment: {
    path: '/ev-charging/investment',
    heroTitle: 'ลงทุน EV Station — ธุรกิจสถานีชาร์จรถไฟฟ้า',
    heroDescription: 'วิเคราะห์ ROI คืนทุน กำไร และทำเล ก่อนเปิดสถานีชาร์จรถยนต์ไฟฟ้า',
    seoTitle: 'ลงทุน EV Station คุ้มไหม | ROI สถานีชาร์จรถไฟฟ้า',
    seoDescription:
      'ลงทุน EV Station คุ้มไหม คืนทุนกี่ปี คำนวณ ROI กำไร และรายได้สถานีชาร์จรถไฟฟ้า โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'ลงทุน EV Station', path: '/ev-charging/investment' }],
    intro: [
      'ธุรกิจ EV Station คุ้มเมื่อมีรถผ่านเพียงพอ ค่าไฟและค่าบริการสมเหตุสมผล และต้นทุนไฟฟ้าไม่บาน หน้านี้ช่วยวางกรอบก่อนเปิดสถานีชาร์จรถไฟฟ้า ไม่ใช่การรับประกันผลตอบแทน',
      'CX ENERTECH รับวิเคราะห์ทำเล ประเมินงบลงทุน และคำนวณ ROI EV Station จากสมมติฐานการใช้งาน แล้วเทียบกับแพ็กเกจลงทุนในฐานข้อมูล',
    ],
    sections: [
      {
        heading: 'EV Station คืนทุนกี่ปี',
        paragraphs: [
          'จุดคืนทุนสถานีชาร์จรถไฟฟ้าขึ้นกับ CAPEX จำนวนครั้งชาร์จต่อวัน อัตราค่าบริการ และค่าไฟ หากทำเลดี ระบบ DC Fast อาจคืนทุนเร็วกว่าจุด AC ที่ใช้งานน้อย',
        ],
      },
      {
        heading: 'เลือกทำเลสถานีชาร์จรถไฟฟ้า',
        paragraphs: [
          'ทำเล EV Station ที่มักคุ้มคือปั๊ม ทางหลวง ห้าง โรงแรม และนิคม วิเคราะห์ทำเลควรมองปริมาณรถไฟฟ้า เวลาจอด และคู่แข่งในรัศมี ไม่ใช่ดูแค่พื้นที่ว่าง',
        ],
      },
      {
        heading: 'กำไรและรายได้ EV Station',
        paragraphs: [
          'รายได้สถานีชาร์จรถไฟฟ้ามาจากค่าชาร์จ ค่าที่จอด หรือแพ็กเกจสมาชิก กำไรหลังหักค่าไฟ O&M และค่าแพลตฟอร์ม ดูตารางจุดคืนทุนอ้างอิงของแพ็กเกจได้ที่หน้า Payback',
        ],
      },
    ],
    faqs: [
      {
        q: 'ลงทุน EV Station คุ้มไหม?',
        a: 'คุ้มเมื่อมีดีมานด์ชาร์จสม่ำเสมอและต้นทุนไฟฟ้าควบคุมได้ ไซต์ที่รถน้อยหรือต้องขยายเขตไฟแพง อาจคืนทุนช้า ควรให้สำรวจก่อนล็อกงบ',
      },
      {
        q: 'EV Station ใช้งบเท่าไหร่?',
        a: 'งบมีตั้งแต่จุด DC เดี่ยวถึง Hub หลายหัว รวมหม้อแปลง ดูหน้าราคาและแพ็กเกจ แล้วให้ทีมประเมินตามไซต์',
      },
    ],
    related: [
      { label: 'ตารางจุดคืนทุนแพ็กเกจ', to: '/ev-charging/packages/payback' },
      { label: 'ราคาและต้นทุน', to: '/ev-charging/cost' },
      { label: 'แพ็กเกจลงทุน', to: '/ev-charging/packages' },
      { label: 'วิเคราะห์ทำเล / ใบเสนอราคา', to: '/ev-charging/quotation' },
      { label: 'ติดตั้งทั่วประเทศ', to: '/ev-charging/thailand' },
    ],
    ctaTitle: 'ปรึกษาลงทุน EV Station',
    ctaDescription: 'รับวิเคราะห์ทำเลและคำนวณ ROI เบื้องต้นจากข้อมูลพื้นที่ของคุณ',
  },

  epc: {
    path: '/ev-charging/station/epc',
    heroTitle: 'EV Station Turnkey — รับเหมาติดตั้งครบวงจร',
    heroDescription: 'Full Turnkey EPC ออกแบบ จัดซื้อ ก่อสร้าง และส่งมอบสถานีชาร์จรถไฟฟ้า',
    seoTitle: 'EV Station Turnkey | รับเหมา EPC สถานีชาร์จ',
    seoDescription:
      'รับเหมา EV Station แบบ Turnkey EPC รับสร้างสถานีชาร์จรถยนต์ไฟฟ้า ออกแบบติดตั้งครบวงจร โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'Turnkey EPC', path: '/ev-charging/station/epc' }],
    intro: [
      'EV Station Turnkey คือให้ผู้รับเหมารายเดียวรับผิดชอบออกแบบ จัดซื้อ ติดตั้ง ทดสอบ และส่งมอบสถานีที่เปิดใช้ได้ CX ENERTECH รับสร้างสถานีชาร์จรถไฟฟ้าแบบ Full Turnkey ไม่แยกงานไฟฟ้ากับงานเครื่องให้ลูกค้าประสานเอง',
    ],
    sections: [
      {
        heading: 'ขอบเขต Turnkey Charger Station',
        paragraphs: ['ติดตั้ง EV Station ครบวงจรครอบคลุม'],
        bullets: [
          'Engineering — ผังจุดจอด โหลด แบบไฟฟ้า',
          'Procurement — เครื่องชาร์จ BOS และอุปกรณ์หลัก',
          'Construction — งานโยธา ไฟฟ้า โครงสร้าง',
          'Commissioning — ทดสอบ ตรวจรับ เปิดสถานี',
        ],
      },
      {
        heading: 'ต่างจากจ้างติดตั้งเครื่องอย่างเดียว',
        paragraphs: [
          'ผู้รับเหมา EPC EV Station รับผิดชอบทั้งระบบ หากไฟไม่พอ แบบ กฟฟ. ไม่ผ่าน หรือสถานีเปิดไม่ได้ มีจุดรับผิดชอบรายเดียว',
        ],
      },
    ],
    features: [
      { title: 'ออกแบบและติดตั้ง', desc: 'ผังสถานีและงานไฟฟ้าในสัญญาเดียว' },
      { title: 'ผู้รับเหมาสถานีชาร์จ EV', desc: 'ทีมหน้างานและวิศวกรติดตามจนส่งมอบ' },
      { title: 'พร้อมแพลตฟอร์ม', desc: 'คิดเงิน มอนิเตอร์ และรายงานรายได้' },
    ],
    faqs: [
      {
        q: 'Turnkey EV Station รวมขออนุญาตไหม?',
        a: 'งานมาตรฐานรวมแบบก่อสร้าง แบบไฟฟ้า และยื่นการไฟฟ้า รายละเอียดตามขอบเขตในใบเสนอราคา',
      },
    ],
    related: [
      { label: 'ภาพรวม EV Station', to: '/ev-charging/station' },
      { label: 'ออกแบบสถานี', to: '/ev-charging/station/design' },
      { label: 'ระบบไฟฟ้า', to: '/ev-charging/station/electrical' },
      { label: 'ขออนุญาต / การไฟฟ้า', to: '/ev-charging/station/approvals' },
      { label: 'Commissioning', to: '/ev-charging/station/commissioning' },
      { label: 'O&M', to: '/ev-charging/station/om' },
    ],
  },

  commercial: {
    path: '/ev-charging/commercial',
    heroTitle: 'EV Charger สำหรับธุรกิจ — สถานีชาร์จองค์กร',
    heroDescription: 'ติดตั้ง EV Station สำหรับโรงแรม ห้าง ปั๊ม โรงงาน ร้านอาหาร และ Developer',
    seoTitle: 'EV Charger สำหรับธุรกิจ | สถานีชาร์จองค์กร',
    seoDescription:
      'ติดตั้ง EV Charger และ EV Station สำหรับธุรกิจ โรงแรม ห้าง ปั๊มน้ำมัน โรงงาน และร้านอาหาร โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'EV สำหรับธุรกิจ', path: '/ev-charging/commercial' }],
    intro: [
      'สถานีชาร์จสำหรับองค์กรช่วยดึงลูกค้า รองรับฟลีต และสร้างรายได้จากที่จอด CX ENERTECH ติดตั้ง EV Charger บริษัท โรงงาน โรงแรม ห้าง และปั๊มน้ำมัน ตามโหลดไฟฟ้าและพฤติกรรมจอดรถจริง',
    ],
    sections: [
      {
        heading: 'เลือกประเภทธุรกิจ',
        paragraphs: ['ไซต์คนละแบบใช้กำลังชาร์จไม่เหมือนกัน'],
        bullets: [
          'โรงแรมและร้านอาหาร — จอดนาน ใช้ AC หรือ DC ตามเทิร์นโอเวอร์',
          'ห้างและที่จอดสาธารณะ — ผสม AC/DC และระบบคิดเงิน',
          'ปั๊มน้ำมัน — DC Fast ให้ชาร์จแล้วไปต่อ',
          'โรงงานและฟลีต — ชาร์จตามรอบกะ อาจใช้หลายหัวพร้อมกัน',
          'Developer / คอนโด / อพาร์ตเมนต์ — จุดชาร์จผู้อยู่อาศัยและแขก',
        ],
      },
    ],
    faqs: [
      {
        q: 'คอนโดติด EV Station ได้ไหม?',
        a: 'ได้หากนิติบุคคลอนุญาตและระบบไฟฟ้าอาคารรองรับ ทีมจะสำรวจตู้ MDB และที่จอดร่วมกับผู้จัดการอาคาร',
      },
    ],
    related: [
      { label: 'DC Fast สำหรับธุรกิจ', to: '/ev-charging/commercial/dc-fast' },
      { label: 'AC Charger', to: '/ev-charging/commercial/ac' },
      { label: 'แพลตฟอร์มคิดเงิน', to: '/ev-charging/management' },
      { label: 'Turnkey EPC', to: '/ev-charging/station/epc' },
      { label: 'ขอใบเสนอราคา', to: '/ev-charging/quotation' },
    ],
  },

  'dc-fast': {
    path: '/ev-charging/commercial/dc-fast',
    heroTitle: 'ติดตั้ง DC Fast Charger — ชาร์จเร็วสำหรับธุรกิจ',
    heroDescription: 'DC Charging Station สำหรับปั๊มน้ำมัน โรงแรม ร้านอาหาร และสถานีสาธารณะ',
    seoTitle: 'ติดตั้ง DC Fast Charger | DC Charging Station',
    seoDescription:
      'ติดตั้ง DC Fast Charger และ DC Charging Station สำหรับปั๊มน้ำมัน โรงแรม ร้านอาหาร และธุรกิจ โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'EV สำหรับธุรกิจ', path: '/ev-charging/commercial' }, { name: 'DC Fast', path: '/ev-charging/commercial/dc-fast' }],
    intro: [
      'DC Fast Charger เหมาะเมื่อลูกค้าต้องการชาร์จแล้วไปต่อ เช่น ปั๊ม ทางหลวง และจุดพัก CX ENERTECH ติดตั้ง DC Charger พร้อมงานไฟฟ้าและแพลตฟอร์มคิดเงิน ไม่ขายเครื่องแล้วทิ้งงานหน้างาน',
    ],
    sections: [
      {
        heading: 'DC Fast Charger ใช้กับธุรกิจแบบไหน',
        paragraphs: [
          'ปั๊มน้ำมันใช้ DC เพื่อเทิร์นโอเวอร์สูง โรงแรมอาจผสม AC สำหรับแขกค้างคืนกับ DC สำหรับ walk-in ร้านอาหารใช้ DC เมื่อลูกค้าจอดสั้นระหว่างมื้อ',
        ],
      },
      {
        heading: 'เลือกกำลัง 120 / 180 / 240 kW',
        paragraphs: [
          'กำลังสูงขึ้นชาร์จเร็วขึ้นแต่ต้องการหม้อแปลงและสายไฟที่รองรับ ดูหน้าแต่ละขนาดเพื่อประกอบการลงทุน',
        ],
      },
    ],
    faqs: [
      {
        q: 'DC Fast ต่างจาก AC อย่างไร?',
        a: 'DC จ่ายไฟตรงเข้าแบตรถ ใช้เวลาสั้นกว่า เหมาะกับจุดแวะ AC เหมาะกับที่จอดนาน เช่น ที่ทำงานและที่พัก',
      },
    ],
    related: [
      { label: 'EV Station 120 kW', to: '/ev-charging/120kw' },
      { label: 'EV Station 180 kW', to: '/ev-charging/180kw' },
      { label: 'EV Station 240 kW', to: '/ev-charging/240kw' },
      { label: 'สถานีชาร์จสำหรับธุรกิจ', to: '/ev-charging/commercial' },
      { label: 'ราคา DC Charger', to: '/ev-charging/cost' },
    ],
  },

  management: {
    path: '/ev-charging/management',
    heroTitle: 'แพลตฟอร์มสถานีชาร์จสำหรับธุรกิจ',
    heroDescription: 'บริหารเครื่องชาร์จ ชำระเงิน มอนิเตอร์ และรายงานรายได้บนแดชบอร์ดเดียว',
    seoTitle: 'แพลตฟอร์มสถานีชาร์จสำหรับธุรกิจ | CX ENERTECH',
    seoDescription:
      'แพลตฟอร์มสถานีชาร์จสำหรับธุรกิจ จัดการ EV Charger ชำระเงิน มอนิเตอร์ และรายงาน โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'แพลตฟอร์มสถานีชาร์จ', path: '/ev-charging/management' }],
    intro: [
      'สถานีที่เปิดแล้วต้องการซอฟต์แวร์คิดเงิน ดูสถานะเครื่อง และสรุปรายได้ แพลตฟอร์มของ CX ENERTECH เชื่อมเครื่องชาร์จ การชำระเงิน มอนิเตอร์ และรายงาน ไม่ให้สถานีเปิดแล้วบริหารด้วยสเปรดชีต',
    ],
    sections: [
      {
        heading: 'โมดูลหลัก',
        paragraphs: ['เลือกใช้ตามขนาดสถานี'],
        bullets: [
          'Charger Management — สถานะ รีสตาร์ท กำหนดราคา',
          'Payment — บัตร QR สมาชิก',
          'Monitoring — แจ้งเตือนเมื่อเครื่องล่ม',
          'Reporting — รายได้และพลังงาน',
          'ERP — ส่งข้อมูลเข้าบัญชีองค์กร',
        ],
      },
    ],
    faqs: [
      {
        q: 'ใช้กับเครื่องยี่ห้ออื่นได้ไหม?',
        a: 'ขึ้นกับโปรโตคอลของเครื่อง ทีมจะยืนยันตอนออกแบบสถานี ไม่รับประกันทุกยี่ห้อหากไม่ได้สำรวจ',
      },
    ],
    related: [
      { label: 'Charger Management', to: '/ev-charging/management/charger' },
      { label: 'Payment', to: '/ev-charging/management/payment' },
      { label: 'Monitoring', to: '/ev-charging/management/monitoring' },
      { label: 'Reporting', to: '/ev-charging/management/reporting' },
      { label: 'ERP', to: '/ev-charging/management/erp' },
      { label: 'EV Station', to: '/ev-charging/station' },
    ],
  },

  electrical: {
    path: '/ev-charging/station/electrical',
    heroTitle: 'ระบบไฟฟ้า EV Station — MDB สายไฟ โหลดชาร์จ',
    heroDescription: 'ออกแบบตู้ MDB สายไฟ และระบบไฟฟ้าสถานีชาร์จให้ปลอดภัยและขยายได้',
    seoTitle: 'ระบบไฟฟ้า EV Station | ตู้ MDB และสายไฟชาร์จ',
    seoDescription:
      'ตู้ MDB สำหรับ EV Station สายไฟสำหรับ EV Charger และระบบไฟฟ้าสถานีชาร์จตามมาตรฐาน โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'ระบบไฟฟ้า', path: '/ev-charging/station/electrical' }],
    intro: [
      'งานไฟฟ้าคือต้นทุนแฝงที่ทำให้ราคา EV Station เลื่อน ตู้ MDB สำหรับ EV Station ต้องรับโหลดหลายหัวพร้อมกัน สายไฟสำหรับ EV Charger ต้องทนกระแส DC/AC และระยะจากหม้อแปลงถึงเครื่อง',
    ],
    sections: [
      {
        heading: 'องค์ประกอบระบบไฟฟ้าสถานี',
        paragraphs: ['ออกแบบให้ขยายจุดชาร์จในอนาคตได้'],
        bullets: [
          'หม้อแปลง / RMU ตามขนาดโหลด',
          'ตู้ MDB และวงจรย่อยต่อเครื่อง',
          'สายไฟ ราง และระบบกราวด์',
          'Single Line Diagram และ Shop Drawing',
        ],
      },
    ],
    faqs: [
      {
        q: 'สายไฟ EV Charger ใช้สเปกอะไร?',
        a: 'ขึ้นกับกำลังเครื่อง ระยะ และมาตรฐานติดตั้ง ทีมกำหนดในแบบไฟฟ้า ไม่แนะนำให้ซื้อสายเองโดยไม่คำนวณแรงดันตก',
      },
    ],
    related: [
      { label: 'หม้อแปลง EV Station', to: '/ev-charging/station/transformer' },
      { label: 'RMU / MDB', to: '/ev-charging/station/rmu-mdb' },
      { label: 'ขออนุญาตการไฟฟ้า', to: '/ev-charging/station/approvals' },
      { label: 'Turnkey EPC', to: '/ev-charging/station/epc' },
    ],
  },

  transformer: {
    path: '/ev-charging/station/transformer',
    heroTitle: 'หม้อแปลงสำหรับ EV Station',
    heroDescription: 'เลือกขนาดหม้อแปลงให้พอสำหรับ DC Fast และสถานีหลายหัวชาร์จ',
    seoTitle: 'หม้อแปลง EV Station | Transformer สำหรับ EV Charger',
    seoDescription:
      'หม้อแปลงสำหรับ EV Station และ EV Charger 120 180 240 kW ออกแบบโหลดและขอการไฟฟ้า โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'หม้อแปลง', path: '/ev-charging/station/transformer' }],
    intro: [
      'สถานี DC Fast มักชนเพดานมิเตอร์เดิม ต้องใช้หม้อแปลงสำหรับ EV Charger ขนาดที่พอดี ไม่เล็กจนไฟตก และไม่ใหญ่จนงบบาน',
    ],
    sections: [
      {
        heading: 'ต้องใช้หม้อแปลงขนาดเท่าไหร่',
        paragraphs: [
          'ขึ้นกับผลรวมกำลังเครื่อง ค่า diversity และแผนขยาย จุด 120 kW กับ Hub 240 kW หลายเครื่องคนละระดับ ทีมคำนวณจากผังจุดชาร์จ ไม่ใช้สูตรเดียวทั้งประเทศ',
        ],
      },
    ],
    faqs: [
      {
        q: 'มีหม้อแปลงอยู่แล้วติดตั้ง DC ได้เลยไหม?',
        a: 'ได้ถ้าความจุเหลือพอและวงจรปลอดภัย ทีมจะวัดโหลดเดิมก่อนเสนอว่าต้องเพิ่มไฟหรือขอหม้อแปลงใหม่',
      },
    ],
    related: [
      { label: 'ระบบไฟฟ้า', to: '/ev-charging/station/electrical' },
      { label: 'EV Station 120 kW', to: '/ev-charging/120kw' },
      { label: 'ขออนุญาต / ขยายเขต', to: '/ev-charging/station/approvals' },
    ],
  },

  design: {
    path: '/ev-charging/station/design',
    heroTitle: 'รับออกแบบ EV Station ตามพื้นที่',
    heroDescription: 'ออกแบบผังจุดจอด โหลดไฟฟ้า และประสบการณ์ผู้ใช้ตามงบและที่ดิน',
    seoTitle: 'ออกแบบ EV Station | ผังสถานีชาร์จตามพื้นที่',
    seoDescription:
      'รับออกแบบ EV Station ตามพื้นที่ ผังจุดจอด โหลดไฟฟ้า และแบบก่อสร้างสถานีชาร์จ โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'ออกแบบสถานี', path: '/ev-charging/station/design' }],
    intro: [
      'รับออกแบบ EV Station ตามพื้นที่จริง ไม่ใช้ผังสำเร็จรูปกับทุกที่จอด งานรวมทางเข้า–ออก รัศมีรถ ความยาวสาย และตำแหน่งหม้อแปลง',
    ],
    sections: [
      {
        heading: 'สิ่งที่ได้จากงานออกแบบ',
        paragraphs: ['ใช้ประกอบใบเสนอราคาและยื่นอนุญาต'],
        bullets: [
          'ผังจุดชาร์จและจราจรในที่จอด',
          'ประมาณการโหลดและขนาดเครื่อง',
          'กรอบ BOQ และงบตามสเกล',
        ],
      },
    ],
    faqs: [
      {
        q: 'ออกแบบอย่างเดียวโดยไม่ติดตั้งได้ไหม?',
        a: 'คุยได้ แต่โมเดลหลักของเราคือออกแบบแล้วติดตั้ง Turnkey เพื่อให้แบบกับหน้างานไม่คนละชุด',
      },
    ],
    related: [
      { label: 'Turnkey EPC', to: '/ev-charging/station/epc' },
      { label: 'ประเมินทำเล', to: '/ev-charging/investment' },
      { label: 'ขอใบเสนอราคา / BOQ', to: '/ev-charging/quotation' },
    ],
  },

  approvals: {
    path: '/ev-charging/station/approvals',
    heroTitle: 'ขออนุญาตติดตั้ง EV Station — การไฟฟ้าและแบบก่อสร้าง',
    heroDescription: 'ยื่น PEA/MEA ขยายเขต มาตรฐานติดตั้ง และตรวจรับสถานีชาร์จรถไฟฟ้า',
    seoTitle: 'ขออนุญาต EV Station | การไฟฟ้า PEA MEA',
    seoDescription:
      'ขออนุญาตติดตั้ง EV Station ขยายเขตไฟฟ้า มาตรฐานติดตั้ง EV Charger และตรวจรับสถานี โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'ขออนุญาต / การไฟฟ้า', path: '/ev-charging/station/approvals' }],
    intro: [
      'สร้าง EV Station ต้องขออนุญาตอะไร ขึ้นกับขนาดโหลดและพื้นที่ งานทั่วไปเกี่ยวกับการไฟฟ้าสำหรับ EV Station แบบก่อสร้าง และมาตรฐานติดตั้ง EV Charger ในประเทศไทย',
      'CX ENERTECH ช่วยยื่นขอไฟฟ้า ขอเพิ่มไฟ ขยายเขต ขอหม้อแปลง จัดเอกสาร และวิศวกรออกแบบให้ครบ ไม่ปล่อยลูกค้าไปต่อคิว กฟฟ. คนเดียว',
    ],
    sections: [
      {
        heading: 'เอกสารและแบบที่ใช้บ่อย',
        paragraphs: ['รายการจริงปรับตามเขต PEA หรือ MEA'],
        bullets: [
          'แบบไฟฟ้าและ Single Line Diagram',
          'Shop Drawing และแบบก่อสร้าง EV Station',
          'เอกสารขออนุญาต EV Charger / สถานี',
          'ขั้นตอนตรวจรับ EV Station ก่อนเปิด',
        ],
      },
    ],
    faqs: [
      {
        q: 'PEA กับ MEA ต่างกันอย่างไรในงานสถานีชาร์จ?',
        a: 'คนละเขตและคนละขั้นตอนยื่น ทีมจะดูที่ตั้งไซต์แล้วจัดชุดเอกสารให้ตรงหน่วยงาน',
      },
    ],
    related: [
      { label: 'ระบบไฟฟ้า', to: '/ev-charging/station/electrical' },
      { label: 'หม้อแปลง', to: '/ev-charging/station/transformer' },
      { label: 'Commissioning / ตรวจรับ', to: '/ev-charging/station/commissioning' },
      { label: 'ความรู้ EV', to: '/knowledge/ev' },
    ],
  },

  commissioning: {
    path: '/ev-charging/station/commissioning',
    heroTitle: 'Commissioning และตรวจรับ EV Station',
    heroDescription: 'ทดสอบเครื่องชาร์จ ระบบไฟฟ้า และความพร้อมเปิดให้บริการ',
    seoTitle: 'ตรวจรับ EV Station | Commissioning สถานีชาร์จ',
    seoDescription:
      'Commissioning และตรวจรับ EV Station ทดสอบระบบชาร์จก่อนเปิดให้บริการ โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'Commissioning', path: '/ev-charging/station/commissioning' }],
    intro: [
      'ตรวจรับ EV Station คือการพิสูจน์ว่าเครื่องชาร์จ ระบบไฟฟ้า แพลตฟอร์มคิดเงิน และความปลอดภัยพร้อมใช้จริง ไม่ใช่แค่เปิดไฟแล้วส่งมอบ',
    ],
    sections: [
      {
        heading: 'ขอบเขตทดสอบ',
        paragraphs: ['ปรับตามขนาดสถานี'],
        bullets: [
          'ชาร์จจริงกับรถหรือโหลดทดสอบ',
          'ป้องกันและกราวด์',
          'การคิดเงินและการตัดไฟฉุกเฉิน',
          'เอกสารส่งมอบและสอนใช้งาน',
        ],
      },
    ],
    faqs: [
      {
        q: 'เปิดสถานีได้ทันทีหลังติดตั้งเครื่องไหม?',
        a: 'ควรผ่าน commissioning และเงื่อนไขการไฟฟ้าก่อน ทีมจะล็อกลิสต์ตรวจรับให้ชัดในสัญญา',
      },
    ],
    related: [
      { label: 'Turnkey EPC', to: '/ev-charging/station/epc' },
      { label: 'O&M หลังเปิด', to: '/ev-charging/station/om' },
      { label: 'ขออนุญาต', to: '/ev-charging/station/approvals' },
    ],
  },

  om: {
    path: '/ev-charging/station/om',
    heroTitle: 'รับดูแลสถานีชาร์จรถไฟฟ้า — O&M',
    heroDescription: 'บำรุงรักษา ซ่อมเครื่อง มอนิเตอร์ และดูแล EV Station หลังเปิดให้บริการ',
    seoTitle: 'รับดูแลสถานีชาร์จรถไฟฟ้า | O&M EV Station',
    seoDescription:
      'รับดูแลสถานีชาร์จรถไฟฟ้า O&M บำรุงรักษาเครื่องชาร์จและระบบสถานี โดย CX ENERTECH',
    crumbs: [home, ev, station, { name: 'O&M', path: '/ev-charging/station/om' }],
    intro: [
      'สถานีที่เปิดแล้วรายได้หลุดเมื่อเครื่องล่ม CX ENERTECH รับดูแลสถานีชาร์จรถไฟฟ้า ทั้งป้องกัน แก้ไข และมอนิเตอร์ระยะไกล ไม่ทิ้งงานหลังส่งมอบ',
    ],
    sections: [
      {
        heading: 'งาน O&M ที่รวมได้',
        paragraphs: ['ทำสัญญาตามจำนวนสถานี'],
        bullets: [
          'ตรวจตามรอบ ทำความสะอาดหัวชาร์จ',
          'ซ่อมและอะไหล่ตามเงื่อนไข',
          'เฝ้าระวังออนไลน์และแจ้งเตือน',
          'รายงานพร้อมใช้และพลังงาน',
        ],
      },
    ],
    faqs: [
      {
        q: 'รับดูแลสถานีที่ไม่ได้ติดตั้งเองได้ไหม?',
        a: 'สำรวจสภาพเครื่องและแพลตฟอร์มก่อน รับได้หากสเปกและอะไหล่รองรับ',
      },
    ],
    related: [
      { label: 'แพลตฟอร์มมอนิเตอร์', to: '/ev-charging/management' },
      { label: 'Commissioning', to: '/ev-charging/station/commissioning' },
      { label: 'Turnkey EPC', to: '/ev-charging/station/epc' },
    ],
  },

  quotation: {
    path: '/ev-charging/quotation',
    heroTitle: 'ขอใบเสนอราคา EV Station',
    heroDescription: 'ประเมินราคา ประเมินต้นทุน รับทำ BOQ และปรึกษาลงทุนสถานีชาร์จ',
    seoTitle: 'ใบเสนอราคา EV Station | ประเมินต้นทุนสถานีชาร์จ',
    seoDescription:
      'ขอใบเสนอราคา EV Station ประเมินต้นทุน รับทำ BOQ รับวิเคราะห์ทำเลและ ROI โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'ขอใบเสนอราคา EV Station', path: '/ev-charging/quotation' }],
    intro: [
      'ใบเสนอราคา EV Station ที่ใช้ตัดสินใจได้ต้องมาจากทำเลและโหลดจริง แบบฟอร์มนี้ส่งต่อทีมขายและวิศวกร เพื่อประเมินราคา ประเมินต้นทุน และวางแผนลงทุนตามงบ',
      'เหมาะกับเจ้าของที่ดิน เจ้าของพื้นที่ ปั๊มน้ำมัน Developer และผู้ที่ต้องการที่ปรึกษาธุรกิจสถานีชาร์จ',
    ],
    sections: [
      {
        heading: 'เตรียมข้อมูลก่อนขอราคา',
        paragraphs: ['ยิ่งครบ ใบเสนอยิ่งใกล้ต้นทุนจริง'],
        bullets: [
          'ที่ตั้งและผังที่จอด',
          'มิเตอร์ / หม้อแปลงที่มี',
          'จำนวนจุดชาร์จและกำลังที่สนใจ เช่น 120 180 240 kW',
          'งบประมาณคร่าว ๆ หากมี',
        ],
      },
    ],
    faqs: [
      {
        q: 'รับทำ BOQ EV Station แยกจากติดตั้งได้ไหม?',
        a: 'ใช้ประกอบการตัดสินใจได้ โมเดลหลักคือสำรวจแล้วเสนอแพ็กเกจติดตั้ง ไม่ใช่ขาย BOQ เปล่าเป็นสินค้า',
      },
    ],
    related: [
      { label: 'ไปที่แบบฟอร์ม', to: '/contact/quotation?type=ev' },
      { label: 'ราคาและต้นทุน', to: '/ev-charging/cost' },
      { label: 'ลงทุน / ROI', to: '/ev-charging/investment' },
      { label: 'แพ็กเกจ', to: '/ev-charging/packages' },
    ],
    ctaTitle: 'กรอกแบบฟอร์มขอใบเสนอราคา EV',
    ctaDescription: 'ทีมจะติดต่อกลับเพื่อนัดสำรวจหรือส่งข้อเสนอเบื้องต้น',
  },

  'solar-ev': {
    path: '/ev-charging/solar',
    heroTitle: 'โซลาร์สำหรับ EV Station — ชาร์จด้วยพลังงานแสงอาทิตย์',
    heroDescription: 'ติดตั้งพลังงานแสงอาทิตย์คู่สถานีชาร์จ ลดค่าไฟและสร้างจุดขายพลังงานสะอาด',
    seoTitle: 'โซลาร์สำหรับ EV Station | Solar + EV Charging',
    seoDescription:
      'โซลาร์สำหรับ EV Station พลังงานแสงอาทิตย์สำหรับสถานีชาร์จ ลดค่าไฟและชาร์จรถด้วยโซลาร์ โดย CX ENERTECH',
    crumbs: [home, ev, { name: 'โซลาร์สำหรับ EV Station', path: '/ev-charging/solar' }],
    intro: [
      'ค่าไฟคือต้นทุนผันแปรหลักของสถานีชาร์จ โซลาร์สำหรับ EV Station ช่วยลดหน่วยที่ซื้อจากกริดช่วงกลางวัน โดยเฉพาะ Hub ที่ชาร์จหนาแน่นตอนมีแดด',
    ],
    sections: [
      {
        heading: 'ออกแบบ Solar + EV อย่างไร',
        paragraphs: [
          'หลังคา canopy จุดจอดหรืออาคารข้างเคียงรับแผงได้ ระบบอาจเป็น on-grid หรือผสมกักเก็บหากต้องการเลื่อนโหลด ทีมออกแบบโหลดชาร์จกับผลิตโซลาร์ให้สอดคล้อง ไม่ติดแผงล้นใช้จริง',
        ],
      },
    ],
    faqs: [
      {
        q: 'ต้องมีแบตเตอรี่ไหม?',
        a: 'ไม่จำเป็นถ้าโหลดชาร์จตรงกับช่วงที่แผงผลิต หากชาร์จหนาแน่นกลางคืนควรประเมินแยก',
      },
    ],
    related: [
      { label: 'รับติดตั้งโซล่าเซลล์', to: '/solar/rooftop' },
      { label: 'Solar + EV Integration', to: '/smart-energy/solar-ev-integration' },
      { label: 'EV Station', to: '/ev-charging/station' },
      { label: 'ลงทุนสถานีชาร์จ', to: '/ev-charging/investment' },
    ],
  },

  thailand: {
    path: '/ev-charging/thailand',
    heroTitle: 'รับติดตั้ง EV Station ทั่วประเทศ',
    heroDescription: 'รับสร้างสถานีชาร์จรถไฟฟ้าครอบคลุมกรุงเทพ ต่างจังหวัด และหัวเมืองท่องเที่ยว',
    seoTitle: 'รับติดตั้ง EV Station ทั่วประเทศ | CX ENERTECH',
    seoDescription:
      'รับติดตั้ง EV Station ทั่วประเทศ รับสร้างสถานีชาร์จรถยนต์ไฟฟ้า กรุงเทพ ชลบุรี เชียงใหม่ ภูเก็ต และหัวเมืองหลัก',
    crumbs: [home, ev, { name: 'ติดตั้งทั่วประเทศ', path: '/ev-charging/thailand' }],
    intro: [
      'CX ENERTECH รับติดตั้งและรับสร้าง EV Station ทั่วประเทศ งานสำรวจ ออกแบบ ยื่นการไฟฟ้า และติดตั้งทำเป็นโครงการตามจังหวัด ไม่จำกัดแค่กรุงเทพ',
    ],
    sections: [
      {
        heading: 'เลือกจังหวัดที่ต้องการติดตั้ง',
        paragraphs: [
          'เปิดหน้าจังหวัดเพื่อดูบริบททำเลท้องถิ่น แล้วส่งไซต์มาประเมินราคา',
        ],
      },
    ],
    faqs: [
      {
        q: 'ต่างจังหวัดคิดค่าเดินทางอย่างไร?',
        a: 'แจ้งในใบเสนอตามระยะและจำนวนครั้งสำรวจ ไม่มีเรทแอบแฝงหลังเซ็นสัญญา',
      },
    ],
    related: [
      { label: 'กรุงเทพ', to: '/ev-charging/thailand/bangkok' },
      { label: 'ชลบุรี', to: '/ev-charging/thailand/chonburi' },
      { label: 'ระยอง', to: '/ev-charging/thailand/rayong' },
      { label: 'เชียงใหม่', to: '/ev-charging/thailand/chiang-mai' },
      { label: 'ภูเก็ต', to: '/ev-charging/thailand/phuket' },
      { label: 'ภาพรวม EV Station', to: '/ev-charging/station' },
    ],
  },
}

function powerLanding(kw: number): EvLanding {
  return {
    path: `/ev-charging/${kw}kw`,
    heroTitle: `ติดตั้ง EV Charger ${kw} kW — DC Fast Station`,
    heroDescription: `สถานีชาร์จ ${kw} kW ดูราคา ลงทุน คืนทุน และหม้อแปลงสำหรับ DC Charger`,
    seoTitle: `EV Station ${kw} kW ราคา | ติดตั้ง DC Charger ${kw} kW`,
    seoDescription: `ติดตั้ง EV Charger ${kw} kW ราคา DC ${kw} kW ลงทุน คืนทุน และกำไรสถานีชาร์จ โดย CX ENERTECH`,
    crumbs: [home, ev, { name: `EV Station ${kw} kW`, path: `/ev-charging/${kw}kw` }],
    intro: [
      `กำลัง ${kw} kW เป็นขนาด DC Fast ที่ธุรกิจค้นหาบ่อย ทั้งติดตั้ง DC Charger ${kw} kW จุดเดียวและสถานีหลายหัวที่ใช้เครื่องนี้เป็นฐาน`,
      `ราคา EV Station ${kw} kW และกำไรขึ้นกับจำนวนครั้งชาร์จ ค่าไฟ และว่าต้องเพิ่มหม้อแปลงสำหรับ EV Charger ${kw} kW หรือไม่`,
    ],
    sections: [
      {
        heading: `หม้อแปลงสำหรับ EV Charger ${kw} kW`,
        paragraphs: [
          `โหลดต่อเนื่องของเครื่อง ${kw} kW ต้องเผื่อ diversity และแผนขยาย ทีมจะคำนวณว่ามิเตอร์เดิมพอหรือต้องขอหม้อแปลงใหม่`,
        ],
      },
      {
        heading: 'ลงทุน คืนทุน กำไร',
        paragraphs: [
          `ดูแพ็กเกจใกล้กำลังนี้และตารางจุดคืนทุน ตัวเลขบนเว็บเป็นอ้างอิง ไม่ใช่ผลจริงของทุกทำเล`,
        ],
      },
    ],
    faqs: [
      {
        q: `EV Station ${kw} kW ราคาเท่าไร?`,
        a: 'ดูเรทเครื่องและแพ็กเกจเป็นจุดตั้งต้น ค่าติดตั้งและงานไฟฟ้าคิดแยกตามไซต์',
      },
    ],
    related: [
      { label: 'ราคา EV Station', to: '/ev-charging/cost' },
      { label: 'จุดคืนทุน', to: '/ev-charging/investment' },
      { label: 'DC Fast Charger', to: '/ev-charging/commercial/dc-fast' },
      { label: 'หม้อแปลง', to: '/ev-charging/station/transformer' },
      { label: 'แพ็กเกจ', to: '/ev-charging/packages' },
    ].concat(
      [
        { label: '120 kW', to: '/ev-charging/120kw' },
        { label: '180 kW', to: '/ev-charging/180kw' },
        { label: '240 kW', to: '/ev-charging/240kw' },
      ].filter((l) => l.to !== `/ev-charging/${kw}kw`),
    ),
  }
}

evLandings['120kw'] = powerLanding(120)
evLandings['180kw'] = powerLanding(180)
evLandings['240kw'] = powerLanding(240)

const places: { slug: string; th: string; intro: string }[] = [
  { slug: 'bangkok', th: 'กรุงเทพ', intro: 'กรุงเทพมีห้าง โรงแรม สำนักงาน และที่จอดหนาแน่น งานติดตั้ง EV Station มักชนเรื่องมิเตอร์อาคาร นิติบุคคล และจราจรในลานจอด' },
  { slug: 'chonburi', th: 'ชลบุรี', intro: 'ชลบุรีอยู่ใน EEC นิคม มอเตอร์เวย์ และเมืองท่องเที่ยว เหมาะกับ DC Fast สำหรับฟลีตและรถทางไกล' },
  { slug: 'rayong', th: 'ระยอง', intro: 'ระยองมีนิคมและเส้นทางขนส่ง โรงงานและโลจิสติกส์มักต้องการสถานีชาร์จฟลีตและจุด DC ริมทาง' },
  { slug: 'chachoengsao', th: 'ฉะเชิงเทรา', intro: 'ฉะเชิงเทราเชื่อมกรุงเทพกับ EEC ที่จอดนิคมและทางผ่านเป็นทำเลที่ประเมินโหลดไฟฟ้าก่อนล็อกขนาดเครื่อง' },
  { slug: 'nakhon-ratchasima', th: 'นครราชสีมา', intro: 'นครราชสีมาเป็นชุมทางอีสาน เหมาะกับสถานีชาร์จบนเส้นทางไกลและจุดบริการในเมือง' },
  { slug: 'khon-kaen', th: 'ขอนแก่น', intro: 'ขอนแก่นเป็นศูนย์กลางอีสานตอนกลาง ห้าง มหาวิทยาลัย และโรงแรมเป็นไซต์ที่ติดตั้ง EV Charger สำหรับธุรกิจได้' },
  { slug: 'udon-thani', th: 'อุดรธานี', intro: 'อุดรธานีรองรับรถทางผ่านและเมืองท่องเที่ยว ควรออกแบบ DC ตามปริมาณรถจริงไม่เกินโหลดการไฟฟ้าท้องถิ่น' },
  { slug: 'chiang-mai', th: 'เชียงใหม่', intro: 'เชียงใหม่มีโรงแรม ที่พัก และรถเช่าหนาแน่น จุด AC ในที่พักกับ DC ในเมืองคนละโมเดลธุรกิจ' },
  { slug: 'phitsanulok', th: 'พิษณุโลก', intro: 'พิษณุโลกเป็นจุดแวะภาคเหนือตอนล่าง สถานีริมทางหลวงเน้น DC Fast และงานไฟฟ้าที่ขยายได้' },
  { slug: 'nakhon-sawan', th: 'นครสวรรค์', intro: 'นครสวรรค์อยู่บนเส้นเหนือ–กลาง ทำเลปั๊มและจุดพักรถเหมาะกับประเมิน ROI จากรถทางผ่าน' },
  { slug: 'ayutthaya', th: 'อยุธยา', intro: 'อยุธยามีทั้งนิคม นักท่องเที่ยว และรถออกจากกรุงเทพ เลือกกำลังเครื่องตามประเภทลูกค้าหลักของไซต์' },
  { slug: 'saraburi', th: 'สระบุรี', intro: 'สระบุรีเป็นทางผ่านและพื้นที่อุตสาหกรรม โหลดโรงงานกับจุดบริการริมทางใช้แบบไฟฟ้าคนละชุด' },
  { slug: 'hua-hin', th: 'หัวหิน', intro: 'หัวหินเน้นโรงแรม ร้านอาหาร และที่พักวันหยุด DC สำหรับ walk-in กับ AC สำหรับแขกค้างคืนมักใช้คู่กัน' },
  { slug: 'surat-thani', th: 'สุราษฎร์ธานี', intro: 'สุราษฎร์เป็นประตูสู่เกาะและภาคใต้ งานสถานีต้องเผื่อระยะเดินทางและช่วงเทศกาล' },
  { slug: 'nakhon-si-thammarat', th: 'นครศรีธรรมราช', intro: 'นครศรีธรรมราชมีทั้งเมืองและเส้นทางใต้ ติดตั้ง EV Station ควรวางแผนการไฟฟ้าพื้นที่ให้ชัดก่อนสั่งเครื่อง' },
  { slug: 'phuket', th: 'ภูเก็ต', intro: 'ภูเก็ตมีโรงแรม รีสอร์ต และรถเช่าหนาแน่น สถานีชาร์จเป็นทั้งบริการแขกและจุดรายได้ของที่จอด' },
  { slug: 'krabi', th: 'กระบี่', intro: 'กระบี่เน้นท่องเที่ยวและที่พัก จุดชาร์จโรงแรมกับจุดสาธารณะในเมืองคนละปริมาณการใช้' },
  { slug: 'koh-samui', th: 'เกาะสมุย', intro: 'เกาะสมุยมีข้อจำกัดระบบไฟฟ้าและโลจิสติกส์อุปกรณ์ ต้องสำรวจโหลดเกาะก่อนล็อก DC Fast ขนาดใหญ่' },
]

for (const place of places) {
  evLandings[place.slug] = {
    path: `/ev-charging/thailand/${place.slug}`,
    heroTitle: `ติดตั้ง EV Station ${place.th}`,
    heroDescription: `รับติดตั้งและรับสร้างสถานีชาร์จรถยนต์ไฟฟ้าใน${place.th} โดยทีม CX ENERTECH`,
    seoTitle: `ติดตั้ง EV Station ${place.th} | สถานีชาร์จรถไฟฟ้า`,
    seoDescription: `ติดตั้ง EV Station ${place.th} รับสร้างสถานีชาร์จรถยนต์ไฟฟ้า ดูราคาและขอใบเสนอราคา CX ENERTECH`,
    crumbs: [
      home,
      ev,
      { name: 'ทั่วประเทศ', path: '/ev-charging/thailand' },
      { name: place.th, path: `/ev-charging/thailand/${place.slug}` },
    ],
    intro: [
      place.intro,
      `บริการติดตั้ง EV Station ${place.th} รวมสำรวจทำเล ออกแบบไฟฟ้า ติดตั้งเครื่อง และยื่นการไฟฟ้าตามพื้นที่`,
    ],
    sections: [
      {
        heading: 'สิ่งที่ควรเตรียมก่อนสำรวจ',
        paragraphs: ['ใช้ได้ทั้งเจ้าของที่ดินและผู้ประกอบการในพื้นที่'],
        bullets: ['ที่ตั้งและผังที่จอด', 'ข้อมูลมิเตอร์หรือหม้อแปลง', 'จำนวนจุดชาร์จที่สนใจ'],
      },
    ],
    faqs: [
      {
        q: `ติดตั้ง EV Station ${place.th} ใช้เวลานานไหม?`,
        a: 'ขึ้นกับงานไฟฟ้าและการอนุญาตท้องถิ่น จุดเล็กเร็วกว่าสถานีที่ต้องขยายเขต ทีมแจ้งกรอบเวลาหลังสำรวจ',
      },
    ],
    related: [
      { label: 'ติดตั้งทั่วประเทศ', to: '/ev-charging/thailand' },
      { label: 'ภาพรวม EV Station', to: '/ev-charging/station' },
      { label: 'ราคา', to: '/ev-charging/cost' },
      { label: 'ขอใบเสนอราคา', to: '/ev-charging/quotation' },
    ],
  }
}

thailandRelatedFromPlaces()

function thailandRelatedFromPlaces() {
  const hub = evLandings.thailand
  hub.related = [
    ...places.map((p) => ({ label: p.th, to: `/ev-charging/thailand/${p.slug}` })),
    { label: 'ภาพรวม EV Station', to: '/ev-charging/station' },
    { label: 'ขอใบเสนอราคา', to: '/ev-charging/quotation' },
  ]
}

export const EV_LOCATION_SLUGS = places.map((p) => p.slug)

export function getEvLanding(id: string) {
  const landing = evLandings[id]
  if (!landing) {
    throw createError({ statusCode: 404, statusMessage: 'Landing not found' })
  }
  return landing
}
