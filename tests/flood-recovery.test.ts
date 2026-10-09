import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import {
  allowedDates,
  bookableDates,
  buildPromptPayPayload,
  crc16CcittFalse,
  promptPayMobile,
} from '../app/utils/flood-recovery.ts'
import { parseFloodMarketplace } from '../app/utils/flood-marketplace.ts'
import { createFloodBooking, floodSlotRemaining } from '../server/utils/flood-bookings.ts'
import { extractFloodCoordinates } from '../server/utils/flood-places.ts'

const NOW = new Date('2026-09-30T10:00:00+07:00')

test('PromptPay payload uses the EMV CRC and the company mobile format', () => {
  assert.equal(crc16CcittFalse('123456789'), '29B1')
  assert.equal(promptPayMobile('+6699-624-6444'), '0066996246444')
  const payload = buildPromptPayPayload(1.23, '', promptPayMobile('0812345678'))
  assert.equal(
    payload,
    '00020101021229370016A00000067701011101130066812345678530376454041.235802TH63047DDF',
  )
  assert.equal(payload.slice(-4), crc16CcittFalse(payload.slice(0, -4)))
  const booked = buildPromptPayPayload(1500, 'FL261001ABCD', '0066996246444')
  assert.match(booked, /54071500\.00/)
  assert.match(booked, /0112FL261001ABCD/)
  assert.equal(booked.slice(-4), crc16CcittFalse(booked.slice(0, -4)))
})

test('visit dates skip Sunday and the urgent package only opens the next two', () => {
  const dates = bookableDates('2026-09-30')
  assert.equal(dates[0], '2026-10-01')
  assert.equal(dates.includes('2026-10-04'), false)
  assert.deepEqual(allowedDates('urgent', '2026-09-30'), ['2026-10-01', '2026-10-02'])
  assert.equal(allowedDates('inspect', '2026-09-30').includes('2026-10-05'), true)
})

test('a booking holds a slot until the deposit is the only way to keep it past the hold', () => {
  const dir = mkdtempSync(join(tmpdir(), 'flood-bookings-'))
  process.env.FLOOD_BOOKINGS_PATH = join(dir, 'bookings.json')
  try {
    const first = createFloodBooking(sample('0811111111'), catalog(), NOW)
    const second = createFloodBooking(sample('0822222222'), catalog(), NOW)
    assert.equal(first.stored, true)
    assert.equal(second.booking.depositThb, 1990)
    assert.equal(second.booking.lat, 13.8)
    assert.equal(floodSlotRemaining('2026-10-01', '09:00', NOW.getTime()), 0)
    assert.throws(() => createFloodBooking(sample('0833333333'), catalog(), NOW), (err: { statusCode?: number }) => err.statusCode === 409)
    assert.throws(() => createFloodBooking({ ...sample('0844444444'), date: '2026-10-04' }, catalog(), NOW), (err: { statusCode?: number }) => err.statusCode === 400)
    assert.throws(() => createFloodBooking({ ...sample('0855555555'), placeId: '' }, catalog(), NOW), (err: { statusCode?: number }) => err.statusCode === 400)
    const again = createFloodBooking(sample('0811111111'), catalog(), NOW)
    assert.equal(again.duplicate, true)
    assert.equal(again.booking.ref, first.booking.ref)
  } finally {
    delete process.env.FLOOD_BOOKINGS_PATH
    rmSync(dir, { recursive: true, force: true })
  }
})

test('marketplace flood category keeps priced packages bookable', () => {
  const catalog = parseFloodMarketplace({
    categories: [
      {
        slug: 'flood-electrical',
        name: 'ตรวจและซ่อมไฟฟ้าหลังน้ำท่วม',
        services: [
          {
            id: 119,
            slug: 'flood-pkg-01',
            name: 'PKG-01',
            priceStart: '1990',
            priceHint: '4,490 บาท/หลัง ประหยัด 490 เมื่อเทียบ PKG-02+03 (ไม่รวม VAT)',
            description: 'ประหยัด 490 บาทเมื่อเทียบซื้อแยก',
            sortOrder: 10,
            unit: 'หลัง',
          },
          { id: 120, slug: 'flood-add-01', name: 'ADD-01', priceStart: '390', sortOrder: 20 },
          { id: 129, slug: 'flood-add-07', name: 'ADD-07', priceStart: null, priceHint: 'ประเมินหน้างาน', sortOrder: 170 },
        ],
      },
    ],
  })
  assert.equal(catalog.services[0].bookable, true)
  assert.equal(catalog.services[0].priceThb, 2985)
  assert.equal(catalog.services[0].priceHint, '6,735 บาท/หลัง ประหยัด 735 เมื่อเทียบ PKG-02+03 (ไม่รวม VAT)')
  assert.match(catalog.services[0].description, /ประหยัด 735 บาท/)
  assert.equal(catalog.services[1].priceThb, 390)
  assert.equal(catalog.services[2].bookable, false)
})

function catalog() {
  return [
    {
      id: 119,
      slug: 'flood-pkg-01',
      name: 'PKG-01 ตรวจไฟก่อนกลับเข้าบ้าน',
      nameEn: 'Pre-return electrical inspection',
      description: 'ตรวจตู้ไฟ',
      priceHint: '1,990 บาท/หลัง',
      priceThb: 1990,
      unit: 'หลัง',
      pricingKind: 'inspection',
      sortOrder: 10,
      kind: 'package' as const,
      bookable: true,
    },
  ]
}

function sample(phone: string) {
  return {
    packageId: 'flood-pkg-01',
    date: '2026-10-01',
    slot: '09:00',
    name: 'ทดสอบ ระบบ',
    phone,
    province: 'กรุงเทพมหานคร',
    address: '429/20 ถนนสุคนธสวัสดิ์ ลาดพร้าว กรุงเทพฯ',
    placeId: 'ChIJtestplace01',
    lat: 13.8,
    lng: 100.56,
    asset: 'solar',
    note: '',
  }
}

test('a pasted map link or coordinate pair is read as a Thailand pin', () => {
  assert.deepEqual(extractFloodCoordinates('13.82415, 100.60880'), { lat: 13.82415, lng: 100.6088 })
  assert.deepEqual(extractFloodCoordinates('100.60880, 13.82415'), { lat: 13.82415, lng: 100.6088 })
  assert.deepEqual(
    extractFloodCoordinates('https://www.google.com/maps/place/Ladprao/@13.82415,100.60880,17z'),
    { lat: 13.82415, lng: 100.6088 },
  )
  assert.equal(extractFloodCoordinates('429/20 ถนนสุคนธสวัสดิ์ แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230'), null)
})

test('map click at the center stays on the map center', async () => {
  const { floodMapLatLngAt } = await import('../app/utils/flood-map.ts')
  const center = floodMapLatLngAt({
    centerLat: 13.7563,
    centerLng: 100.5018,
    zoom: 15,
    x: 320,
    y: 180,
    width: 640,
    height: 360,
  })
  assert.ok(Math.abs(center.lat - 13.7563) < 0.00001)
  assert.ok(Math.abs(center.lng - 100.5018) < 0.00001)
  const east = floodMapLatLngAt({
    centerLat: 13.7563,
    centerLng: 100.5018,
    zoom: 15,
    x: 480,
    y: 180,
    width: 640,
    height: 360,
  })
  assert.ok(east.lng > 100.5018)
})
