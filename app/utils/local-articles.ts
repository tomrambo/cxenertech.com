import type { Article } from '~/utils/articles'

function article(partial: Omit<Article, 'id' | 'authorName' | 'createdAt' | 'seo'> & { id: string }): Article {
  return {
    authorName: 'CX ENERTECH',
    createdAt: partial.publishedAt || '2026-08-01',
    seo: {
      title: partial.title,
      description: partial.excerpt,
      image: partial.coverImage || null,
    },
    ...partial,
  }
}

export const LOCAL_ARTICLES: Article[] = [
  article({
    id: 'local-solar-payback',
    slug: 'tid-solar-cell-khum-mai-2569',
    title: 'ติดโซล่าเซลล์คุ้มไหม ปี 2569 — ดูจุดคืนทุนอย่างไร',
    excerpt:
      'สรุปปัจจัยที่ทำให้โซล่าเซลล์บ้านและโรงงานคืนทุนเร็วหรือช้า พร้อมลิงก์ไปตารางอ้างอิงและใบเสนอราคา',
    category: 'solar',
    publishedAt: '2026-08-12',
    coverImage: '/images/projects/project-residential-solar.jpg',
    content: `<p>คำถามที่ลูกค้าใกล้ตัดสินใจถามบ่อยคือติดโซล่าเซลล์คุ้มไหม และคืนทุนกี่ปี คำตอบไม่ใช่ตัวเลขเดียวทั้งประเทศ เพราะขึ้นกับค่าไฟต่อหน่วย การใช้ไฟกลางวัน และราคาติดตั้ง</p>
<h2>บ้านกับโรงงานคนละสมการ</h2>
<p>บ้านที่ไม่มีคนอยู่กลางวันอาจเห็นผลช้ากว่าโรงงานหรืออาคารที่ใช้แอร์ทั้งวัน เมื่อค่าไฟแพง หน่วยที่แผงผลิตได้จะทดแทนหน่วยจากกริดได้คุ้มกว่า</p>
<ul>
<li>ดูประมาณการจาก <a href="/solar/payback">หน้าจุดคืนทุนโซล่าเซลล์</a></li>
<li>เลือกขนาดบ้านที่ <a href="/solar/rooftop/residential">โซล่าเซลล์บ้าน</a> หรือ <a href="/solar/5kw">5 kW</a> / <a href="/solar/10kw">10 kW</a> / <a href="/solar/15kw">15 kW</a></li>
<li>โรงงานดูที่ <a href="/solar/rooftop/factory">โซล่าเซลล์โรงงาน</a></li>
</ul>
<h2>ถ้ายังไม่พร้อมลงทุนเอง</h2>
<p>โมเดล <a href="/solar/ppa">PPA solar rooftop</a> ให้ผู้ให้บริการลงระบบแล้วคิดตามหน่วยที่ผลิต เหมาะกับอาคารใหญ่และโรงงาน</p>
<p>ตัวเลขบนเว็บเป็นอ้างอิงจากแพ็กเกจ ไม่ใช่ผลจริงของทุกหลังคา ควรสำรวจมิเตอร์และเงาหลังคาก่อนล็อกงบ</p>`,
  }),
  article({
    id: 'local-solar-size',
    slug: 'lueak-khanad-solar-ban-5-10-15kw',
    title: 'เลือกขนาดโซล่าเซลล์บ้าน 5 / 10 / 15 kW อย่างไร',
    excerpt: 'วิธีจับขนาดระบบจากบิลค่าไฟ เฟสไฟฟ้า และพื้นที่หลังคา โดยไม่ล็อก kW จากคำค้นอย่างเดียว',
    category: 'guide',
    publishedAt: '2026-08-18',
    coverImage: '/images/projects/project-residential-solar.jpg',
    content: `<p>ขนาดยอดนิยมของโซล่าเซลล์บ้านคือ 5 kW 10 kW และ 15 kW แต่ขนาดที่ถูกต้องมาจากบิล 6–12 เดือนและมิเตอร์ 1 เฟสหรือ 3 เฟส</p>
<h2>จุดตั้งต้นคร่าว ๆ</h2>
<ul>
<li>5 kW — บ้านเริ่มต้น พื้นที่หลังคาไม่มาก ดูรายละเอียดที่ <a href="/solar/5kw">โซล่าเซลล์ 5 kW</a></li>
<li>10 kW — บ้านใหญ่หรือมีแอร์หลายตัว ดูที่ <a href="/solar/10kw">โซล่าเซลล์ 10 kW</a></li>
<li>15 kW — บ้านใหญ่หรือ SME มักเป็น 3 เฟส ดูที่ <a href="/solar/15kw">โซล่าเซลล์ 15 kW</a></li>
</ul>
<p>ราคาเริ่มต้นอยู่ที่ <a href="/solar/rooftop/packages">แพ็กเกจโซล่าเซลล์</a> ไม่รวมงานเสริมหน้างาน</p>
<h2>ไม่อยู่บ้านกลางวัน</h2>
<p>ถ้าโหลดหลักอยู่เย็น–ค่ำ ดู <a href="/solar/hybrid">โซล่าเซลล์ hybrid</a> หรือ <a href="/solar/battery">โซล่าเซลล์พร้อมแบตเตอรี่</a> แทนการติด on-grid อย่างเดียว</p>`,
  }),
  article({
    id: 'local-solar-factory',
    slug: 'tid-solar-rongngan-roemton',
    title: 'ติดตั้งโซล่าเซลล์โรงงาน เริ่มต้นอย่างไร',
    excerpt: 'ขั้นตอนสำรวจหลังคา โหลด 3 เฟส EPC และขนาด 100 kW ถึง 1 MW ที่โรงงานค้นบ่อย',
    category: 'solar',
    publishedAt: '2026-08-22',
    coverImage: '/images/projects/project-factory-rooftop.jpg',
    content: `<p>โรงงานที่ค่าไฟสูงช่วงกลางวันเหมาะกับ solar rooftop โดยตรง งานไม่ใช่แค่ปูแผง แต่รวมโครงสร้าง ตู้ MDB และการยื่นการไฟฟ้า</p>
<h2>ขนาดที่ค้นบ่อย</h2>
<p><a href="/solar/factory/100kw">100 kW</a>, <a href="/solar/factory/200kw">200 kW</a>, <a href="/solar/factory/500kw">500 kW</a> และ <a href="/solar/factory/1mw">1 MW</a> ต้องมาจากบิลและพื้นที่หลังคาที่ติดตั้งได้จริง</p>
<h2>EPC หรือ PPA</h2>
<ul>
<li><a href="/solar/epc">Solar EPC</a> — ซื้อขาด มีผู้รับเหมารายเดียว</li>
<li><a href="/solar/ppa">PPA</a> — ติดโดยไม่ต้องลง CAPEX ทั้งก้อน</li>
<li><a href="/solar/bess">BESS</a> — เมื่อโหลดพีคหรือกลางคืนสูง</li>
</ul>
<p>ภาพรวมงานโรงงานอยู่ที่ <a href="/solar/rooftop/factory">ติดตั้งโซล่าเซลล์โรงงาน</a></p>`,
  }),
  article({
    id: 'local-ev-start',
    slug: 'sang-ev-station-tong-siam-arai',
    title: 'สร้าง EV Station ต้องเตรียมอะไรบ้าง',
    excerpt: 'เช็กลิสต์ทำเล โหลดไฟฟ้า หม้อแปลง เครื่อง DC/AC และแพลตฟอร์มคิดเงิน ก่อนขอใบเสนอราคา',
    category: 'ev',
    publishedAt: '2026-08-20',
    coverImage: '/images/projects/project-dc-station.jpg',
    content: `<p>สร้างสถานีชาร์จรถยนต์ไฟฟ้าไม่จบที่ซื้อเครื่อง งานหลักคือทำเล ระบบไฟฟ้า และการขออนุญาต</p>
<h2>ข้อมูลที่ควรมีก่อนคุยทีม</h2>
<ul>
<li>ที่ตั้งและผังที่จอด</li>
<li>มิเตอร์หรือหม้อแปลงที่มี</li>
<li>จำนวนจุดชาร์จและกำลังที่สนใจ เช่น <a href="/ev-charging/120kw">120 kW</a> <a href="/ev-charging/180kw">180 kW</a> <a href="/ev-charging/240kw">240 kW</a></li>
</ul>
<p>ขั้นตอนยื่นการไฟฟ้าอยู่ที่ <a href="/ev-charging/station/approvals">ขออนุญาต EV Station</a> งาน Turnkey อยู่ที่ <a href="/ev-charging/station/epc">EV Station EPC</a></p>
<p>รับติดตั้งภาพรวมที่ <a href="/ev-charging/station">หน้า EV Station</a></p>`,
  }),
  article({
    id: 'local-ev-roi',
    slug: 'longthun-ev-station-khum-mai',
    title: 'ลงทุน EV Station คุ้มไหม — คืนทุนและกำไร',
    excerpt: 'กรอบคิด ROI สถานีชาร์จรถไฟฟ้า จากทำเล ค่าไฟ และจำนวนครั้งชาร์จ ไม่ใช่การรับประกันผลตอบแทน',
    category: 'ev',
    publishedAt: '2026-08-25',
    coverImage: '/images/projects/project-mall-ev-hub.jpg',
    content: `<p>ธุรกิจสถานีชาร์จคุ้มเมื่อมีรถผ่านเพียงพอและต้นทุนไฟฟ้าควบคุมได้ จุดที่รถน้อยหรือต้องขยายเขตไฟแพง อาจคืนทุนช้า</p>
<h2>ดูตัวเลขสองชั้น</h2>
<ul>
<li>กรอบธุรกิจที่ <a href="/ev-charging/investment">ลงทุน EV Station</a></li>
<li>ตารางแพ็กเกจที่ <a href="/ev-charging/packages/payback">จุดคืนทุน</a></li>
<li>ต้นทุนเครื่องและงานไฟฟ้าที่ <a href="/ev-charging/cost">ราคา EV Station</a></li>
</ul>
<p>ตัวเลขบนเว็บเป็นอ้างอิงจากสมมติฐานการใช้งาน ไซต์จริงต้องสำรวจทำเล</p>`,
  }),
  article({
    id: 'local-dc-kw',
    slug: 'dc-fast-charger-120-180-240kw',
    title: 'DC Fast Charger 120 / 180 / 240 kW ต่างกันอย่างไร',
    excerpt: 'เลือกกำลังชาร์จเร็วตามเทิร์นโอเวอร์ของปั๊ม โรงแรม ห้าง และความจุหม้อแปลง',
    category: 'guide',
    publishedAt: '2026-08-28',
    coverImage: '/images/projects/project-dc-station.jpg',
    content: `<p>DC Fast ชาร์จเร็วกว่า AC เพราะจ่ายไฟตรงเข้าแบตรถ กำลังสูงขึ้นชาร์จเร็วขึ้นแต่ต้องการงานไฟฟ้าที่รองรับ</p>
<ul>
<li><a href="/ev-charging/120kw">EV Station 120 kW</a> — จุดเริ่มต้นธุรกิจและปั๊มขนาดกลาง</li>
<li><a href="/ev-charging/180kw">EV Station 180 kW</a> — เทิร์นโอเวอร์สูงขึ้น</li>
<li><a href="/ev-charging/240kw">EV Station 240 kW</a> — Hub และจุดทางหลวง</li>
</ul>
<p>ภาพรวมเครื่องอยู่ที่ <a href="/ev-charging/commercial/dc-fast">ติดตั้ง DC Fast Charger</a> หม้อแปลงดูที่ <a href="/ev-charging/station/transformer">หม้อแปลง EV Station</a></p>`,
  }),
  article({
    id: 'local-solar-ev',
    slug: 'solar-samrap-ev-station',
    title: 'โซลาร์สำหรับ EV Station ลดค่าไฟจุดชาร์จได้อย่างไร',
    excerpt: 'ใช้พลังงานแสงอาทิตย์คู่สถานีชาร์จ เพื่อตัดต้นทุนหน่วยไฟช่วงกลางวัน',
    category: 'solar',
    publishedAt: '2026-09-01',
    coverImage: '/images/projects/project-warehouse-epc.jpg',
    content: `<p>ค่าไฟคือต้นทุนผันแปรหลักของสถานีชาร์จ <a href="/ev-charging/solar">โซลาร์สำหรับ EV Station</a> ช่วยลดหน่วยที่ซื้อจากกริดช่วงที่มีแดด โดยเฉพาะ Hub ที่ชาร์จหนาแน่นกลางวัน</p>
<p>หลังคา canopy หรืออาคารข้างเคียงรับแผงได้ ออกแบบโหลดชาร์จกับผลิตโซลาร์ให้สอดคล้อง ไม่ติดแผงล้นใช้จริง</p>
<p>งานแผงแยกดูที่ <a href="/solar/rooftop">รับติดตั้งโซล่าเซลล์</a> และการผสานระบบที่ <a href="/smart-energy/solar-ev-integration">Solar + EV Integration</a></p>`,
  }),
  article({
    id: 'local-ppa',
    slug: 'ppa-solar-rooftop-khue-arai',
    title: 'PPA Solar Rooftop คืออะไร — ติดโซล่าเซลล์ไม่ต้องลงทุนเอง',
    excerpt: 'อธิบายโมเดลซื้อไฟจากระบบบนหลังคา ตามสัญญา เหมาะกับโรงงานและอาคารใหญ่',
    category: 'guide',
    publishedAt: '2026-08-08',
    coverImage: '/images/projects/project-factory-rooftop.jpg',
    content: `<p>Solar PPA คือการให้ผู้ลงทุนติดตั้งระบบบนหลังคาคุณ แล้วคุณซื้อไฟจากระบบนั้นตามหน่วย โมเดลนี้ตอบคำถามติดโซล่าเซลล์ไม่ต้องลงทุน โดยเฉพาะโรงงานที่ยังไม่พร้อม CAPEX</p>
<p>ซื้อขาดคุณเป็นเจ้าของสินทรัพย์และรับผลประหยัดเต็มหลังคืนทุน PPA ได้ลดค่าไฟทันทีแต่งบผูกสัญญาระยะยาว</p>
<p>รายละเอียดที่ <a href="/solar/ppa">หน้า PPA Solar</a> และงานติดตั้งที่ <a href="/solar/rooftop">รับติดตั้งโซล่าเซลล์</a></p>`,
  }),
  article({
    id: 'news-packages',
    slug: 'cx-enertech-paket-solar-on-grid-hybrid-2569',
    title: 'CX ENERTECH อัปเดตแพ็กเกจโซลาร์ On-grid / Hybrid / Off-grid ปี 2569',
    excerpt: 'แพ็กเกจราคาเริ่มต้นบนเว็บดึงจากฐานข้อมูล เพื่อให้เลือกขนาดระบบแล้วขอใบเสนอราคาต่อได้ทันที',
    category: 'news',
    publishedAt: '2026-08-05',
    coverImage: '/images/projects/project-residential-solar.jpg',
    content: `<p>CX ENERTECH เปิดแพ็กเกจโซลาร์รูฟท็อปบนเว็บให้ดูราคาเริ่มต้นตามขนาดระบบ ทั้ง On-grid Hybrid และ Off-grid</p>
<p>ลูกค้าเลือกขนาดแล้วส่งต่อทีมสำรวจเพื่อออกใบเสนอราคาตามหลังคาจริง ดูแคตตาล็อกที่ <a href="/solar/rooftop/packages">แพ็กเกจโซล่าเซลล์</a></p>
<p>บ้านเริ่มที่ <a href="/solar/rooftop/residential">โซล่าเซลล์บ้าน</a> โรงงานที่ <a href="/solar/rooftop/factory">โซล่าเซลล์โรงงาน</a></p>`,
  }),
  article({
    id: 'news-ev-2569',
    slug: 'naewnom-ev-station-thai-2569',
    title: 'แนวโน้ม EV Station ไทย ปี 2569 — จากเครื่องเดี่ยวสู่ Hub',
    excerpt: 'ตลาดสถานีชาร์จเน้น DC Fast งานไฟฟ้า และแพลตฟอร์มคิดเงิน ไม่ใช่แค่ติดเครื่องแล้วจบ',
    category: 'news',
    publishedAt: '2026-08-15',
    coverImage: '/images/projects/project-mall-ev-hub.jpg',
    content: `<p>ปี 2569 ผู้ลงทุนสถานีชาร์จถามถึงทำเล หม้อแปลง และรายได้ต่อหัวชาร์จมากขึ้น CX ENERTECH จัดบริการเป็น Turnkey จากออกแบบถึง O&amp;M</p>
<ul>
<li><a href="/ev-charging/station">รับติดตั้ง EV Station</a></li>
<li><a href="/ev-charging/investment">วิเคราะห์ลงทุน</a></li>
<li><a href="/ev-charging/thailand">ติดตั้งทั่วประเทศ</a></li>
</ul>`,
  }),
  article({
    id: 'news-bess',
    slug: 'solar-bess-rongngan-2569',
    title: 'Solar + BESS โรงงาน ปี 2569 — ไม่ได้ถามแค่แผง',
    excerpt: 'โรงงานเริ่มประเมินระบบกักเก็บพลังงานคู่ rooftop เพื่อบริหารพีคและสำรองโหลดสำคัญ',
    category: 'news',
    publishedAt: '2026-08-26',
    coverImage: '/images/projects/project-factory-rooftop.jpg',
    content: `<p>โรงงานที่โหลดกลางคืนสูงหรือค่าดีมานด์แพง เริ่มดู BESS คู่กับโซลาร์รูฟท็อป ไม่ใช่ติดแผงเพิ่มอย่างเดียว</p>
<p>อ่านกรอบงานที่ <a href="/solar/bess">Solar BESS</a> และ <a href="/solar/hybrid">โซล่าเซลล์ hybrid</a></p>`,
  }),
  article({
    id: 'news-ev-std',
    slug: 'mattrathan-tidtang-ev-charger-thai',
    title: 'มาตรฐานติดตั้ง EV Charger ในไทย ที่ผู้ลงทุนควรรู้',
    excerpt: 'งานสถานีชาร์จเกี่ยวข้องกับแบบไฟฟ้า การไฟฟ้า และตรวจรับก่อนเปิดให้บริการ',
    category: 'news',
    publishedAt: '2026-09-01',
    coverImage: '/images/projects/project-dc-station.jpg',
    content: `<p>ติดตั้ง EV Charger ในไทยไม่จบที่วางตู้ ต้องมีแบบไฟฟ้า มาตรฐานความปลอดภัย และขั้นตอนการไฟฟ้าตามเขต PEA หรือ MEA</p>
<p>สรุปเอกสารอยู่ที่ <a href="/ev-charging/station/approvals">ขออนุญาต EV Station</a> และการตรวจรับที่ <a href="/ev-charging/station/commissioning">Commissioning</a></p>`,
  }),
]

export function listLocalArticles(category?: string): Article[] {
  const list = category
    ? LOCAL_ARTICLES.filter((item) => item.category === category)
    : [...LOCAL_ARTICLES]
  return list.sort((a, b) => {
    const aTime = Date.parse(a.publishedAt || a.createdAt) || 0
    const bTime = Date.parse(b.publishedAt || b.createdAt) || 0
    return bTime - aTime
  })
}

export function getLocalArticleBySlug(slug: string): Article | null {
  return LOCAL_ARTICLES.find((item) => item.slug === slug) || null
}
