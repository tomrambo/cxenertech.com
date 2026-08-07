/**
 * Charger technical specs — ZEC + ZeedaDirect (ZD-DC-J1..J4) + AC series
 * Sources: ZEC specs + 30-60 / 40-160 / 160-240 / 240-420 kW datasheets + AC G/K/E sheets
 */

export type ChargerSpec = {
  id: string
  model: string
  nameTh: string
  nameEn: string
  powerKw: number
  /** Optional power range covered by this platform */
  powerKwOptions?: number[]
  overview: string
  input: Record<string, string>
  output: Record<string, string>
  environment: Record<string, string>
  structure: Record<string, string>
  components: Record<string, string>
  protection: string[]
  optionalFunctions: string[]
  standards: string[]
  certifications: string[]
  image: string
  priceRateIds: string[]
  sourceFile?: string
}

export const CHARGER_SPECS: ChargerSpec[] = [
  {
    id: 'spec-zec-60',
    model: 'ZEC-60',
    nameTh: 'เครื่องชาร์จ DC ZEC 60 kW',
    nameEn: 'ZEC 60kW DC Fast Charger',
    powerKw: 60,
    overview:
      'Integrated DC fast charger with high efficiency and flexible configuration. Supports CCS, CHAdeMO and Type 2 options in a compact footprint for centralized fast-charging stations.',
    input: {
      voltage: '400 VAC ±10%',
      frequency: '50/60 Hz',
      type: '3P+N+PE',
      current: '112 A',
      power: '67 kW',
      powerFactor: '0.99',
      thdi: '<5%',
      grounding: 'TN-S, TN-CS',
    },
    output: {
      connectorOptions: 'CCS2 / CCS2+CCS2 / CCS2+CHAdeMO / CCS2+CHAdeMO+Type2 / CCS2+CCS2+Type2',
      voltageCcs2: '200–1000 Vdc',
      voltageChademo: '200–500 Vdc',
      voltageType2: '400 Vac ±10%',
      constantPowerBand: '300–1000 V',
      maxCurrentCcs2: '200 A',
      maxCurrentChademo: '125 A',
      maxCurrentType2: '32 A',
      ratedPowerDc: '60 kW',
      ratedPowerAc: '22 kW',
      peakEfficiency: '96%',
    },
    environment: {
      altitude: '<2000 m',
      operatingTemp: '-25°C to +50°C (full power)',
      derating: '50–65°C linear limit; ≥65°C module shutdown',
      storageTemp: '-30°C to +70°C',
      humidity: '5%–95% Rh non-condensing',
      ipIk: 'IP55 / IK10',
    },
    structure: {
      dimensions: 'W850 × D450 × H2030 mm',
      weight: '≤300 kg',
      enclosure: '304 stainless steel',
      cableLength: '5 m (4.5 m exposed)',
    },
    components: {
      screen: '7" HD high-contrast touchscreen',
      rfid: 'ISO 14443 A/B, ISO/IEC 15693, Mifare, NFC',
      emergencyButton: 'Yes',
      communication: '4G / LAN',
      protocol: 'OCPP 1.6J',
      cooling: 'Air cooled',
      payment: 'RFID/APP (mobile / Visa / Master optional)',
      emc: 'Class A (industrial)',
    },
    protection: [
      'Undervoltage / Overvoltage',
      'DC Overcurrent',
      'Over-temperature',
      'Surge Protection Device',
      'Emergency Stop',
    ],
    optionalFunctions: ['Tilt detection', 'Flood detection', 'Smoke detection'],
    standards: ['IEC 61851', 'IEC 62196', 'DIN 70121', 'ISO 15118'],
    certifications: ['CE', 'TUV'],
    image: '/images/packages/cx-dc-60.jpg',
    priceRateIds: ['rate-dc-s-60', 'rate-dc-j-60'],
  },
  {
    id: 'spec-zec-120',
    model: 'ZEC-120',
    nameTh: 'เครื่องชาร์จ DC ZEC 120 kW',
    nameEn: 'ZEC 120kW DC Fast Charger',
    powerKw: 120,
    overview:
      'Outdoor integrated DC charger with 20 kW intelligent modules. Single or dual connectors with power distribution for passenger cars and logistics EVs.',
    input: {
      voltage: '400 VAC ±10%',
      frequency: '50/60 Hz',
      type: '3P+N+PE',
      current: '224 A',
      power: '133 kW',
      powerFactor: '0.99',
      thdi: '<5%',
      grounding: 'TN-S, TT',
    },
    output: {
      connectorOptions: 'CCS2 / CCS2+CCS2 / CCS2+CHAdeMO (CHAdeMO optional)',
      voltageCcs2: '200–1000 Vdc',
      voltageChademo: '200–500 Vdc',
      constantPowerBand: '300–1000 V',
      maxCurrentCcs2: '200 A',
      maxCurrentChademo: '125 A',
      ratedPowerDc: '120 kW',
      peakEfficiency: '96%',
    },
    environment: {
      altitude: '<2000 m',
      operatingTemp: '-25°C to +50°C (full power)',
      derating: '50–65°C linear limit; ≥65°C module shutdown',
      storageTemp: '-30°C to +70°C',
      humidity: '5%–95% Rh non-condensing',
      ipIk: 'IP55 / IK10',
    },
    structure: {
      dimensions: 'W1000 × D700 × H2000 mm',
      weight: '≤500 kg',
      enclosure: '304 stainless steel',
      cableLength: '5 m (4.5 m exposed)',
    },
    components: {
      screen: '7" HD high-contrast touchscreen',
      rfid: 'ISO 14443 A/B, ISO/IEC 15693, Mifare, NFC',
      emergencyButton: 'Yes',
      communication: '4G / LAN',
      protocol: 'OCPP 1.6J',
      cooling: 'Air cooled',
      payment: 'RFID/APP (mobile / Visa / Master optional)',
      emc: 'Class A (industrial)',
    },
    protection: [
      'Undervoltage / Overvoltage',
      'DC Overcurrent',
      'Over-temperature',
      'Surge Protection Device',
      'Emergency Stop',
    ],
    optionalFunctions: ['Tilt detection', 'Flood detection', 'Smoke detection'],
    standards: ['IEC 61851', 'IEC 62196'],
    certifications: ['CE', 'TUV'],
    image: '/images/packages/cx-dc-120.jpg',
    priceRateIds: ['rate-dc-s-120', 'rate-dc-j-120'],
  },
  {
    id: 'spec-zec-180',
    model: 'ZEC-180',
    nameTh: 'เครื่องชาร์จ DC ZEC 180 kW',
    nameEn: 'ZEC 180kW DC Fast Charger',
    powerKw: 180,
    overview:
      'Integrated 180 kW DC charger with dual connectors and intelligent power distribution, large LCD touchscreen with audio, and cable management for better user experience.',
    input: {
      voltage: '400 VAC ±10%',
      frequency: '50/60 Hz',
      type: '3P+N+PE',
      current: '334 A',
      power: '198 kW',
      powerFactor: '0.99',
      thdi: '<5%',
      grounding: 'TN-S, TT-CS',
    },
    output: {
      connectorOptions: 'CCS2 / CCS2+CCS2 / CCS2+CHAdeMO (CHAdeMO optional)',
      voltageCcs2: '200–1000 Vdc',
      voltageChademo: '200–500 Vdc',
      constantPowerBand: '300–1000 V',
      maxCurrentCcs2: '200 A',
      maxCurrentChademo: '125 A',
      ratedPowerDc: '180 kW',
      peakEfficiency: '96%',
    },
    environment: {
      altitude: '<2000 m',
      operatingTemp: '-25°C to +65°C',
      derating: 'Full power to 50°C; 50–65°C linear limit; ≥65°C shutdown',
      storageTemp: '-30°C to +70°C',
      humidity: '5%–95% Rh non-condensing',
      ipIk: 'IP55 / IK10',
    },
    structure: {
      dimensions: 'W850 × D750 × H2000 mm',
      weight: '≤500 kg',
      enclosure: '304 stainless steel / sheet metal',
      cableLength: '5 m (4.5 m exposed)',
    },
    components: {
      screen: '15" HD touchscreen',
      rfid: 'ISO 14443 A/B, ISO/IEC 15693, Mifare, NFC',
      emergencyButton: 'Yes',
      communication: '4G / LAN',
      protocol: 'OCPP 1.6J',
      cooling: 'Air cooled',
      payment: 'RFID/APP (mobile / Visa / Master optional)',
      emc: 'Class A (industrial)',
    },
    protection: [
      'Undervoltage / Overvoltage',
      'DC Overcurrent',
      'Over-temperature',
      'Surge Protection Device',
      'Emergency Stop',
    ],
    optionalFunctions: ['Tilt detection', 'Flood detection', 'Smoke detection', 'Cable management', 'Heater'],
    standards: ['IEC 61851', 'IEC 62196', 'DIN 70121', 'ISO 15118'],
    certifications: ['CE', 'TUV'],
    image: '/images/packages/cx-dc-180.jpg',
    priceRateIds: ['rate-dc-j-180'],
  },
  // ZeedaDirect J-Series platforms (from 30-60 / 40-160 / 160-240 / 240-420 datasheets)
  {
    id: 'spec-zd-j1',
    model: 'ZD-DC-J1',
    nameTh: 'เครื่องชาร์จ DC ZeedaDirect J1 (30–60 kW)',
    nameEn: 'ZeedaDirect ZD-DC-J1 DC Charging System',
    powerKw: 60,
    powerKwOptions: [30, 60],
    overview:
      'Compact DC charging system for opportunity and destination charging. Modular, CE certified, with remote monitoring and OTA upgrades — ระบบชาร์จ DC ขนาดกะทัดรัด รองรับ 30/60 kW',
    input: {
      voltage: '400V±15% / 440V±15% / 480V±15% AC TN-S',
      frequency: '50/60 Hz',
      type: 'Three phase',
    },
    output: {
      power: '30 kW / 60 kW',
      ratedVoltage: 'CCS2 1000V DC',
      maxCurrent: 'CCS2 100A (30kW) / 200A (60kW)',
      cables: 'Single (30kW) / Dual (60kW)',
    },
    environment: {
      operatingTemp: '-30 °C to +50 °C',
      storageTemp: '-35 °C to +55 °C',
      humidity: '5–95%, without condensation',
      noise: '<60 dB',
    },
    structure: {
      ipRating: 'IP54',
      cooling: 'Forced Air-Cooling',
      dimensions: '690 × 584 × 1686 mm',
    },
    components: {
      screen: '8" LCD Touch Screen',
      network: '4G (GSM) / Ethernet / WIFI',
      protocol: 'OCPP1.6J or OCPP2.0',
    },
    protection: ['Modular safe design', 'Remote monitoring', 'OTA upgrade'],
    optionalFunctions: ['Dual cable (60 kW)'],
    standards: ['OCPP 1.6J', 'OCPP 2.0'],
    certifications: ['CE', 'TUV SUD'],
    image: '/images/packages/cx-dc-j1.jpg',
    priceRateIds: ['rate-dc-j-60'],
    sourceFile: '30-60 kW.pdf',
  },
  {
    id: 'spec-zd-j2',
    model: 'ZD-DC-J2',
    nameTh: 'เครื่องชาร์จ DC ZeedaDirect J2 (40–160 kW)',
    nameEn: 'ZeedaDirect ZD-DC-J2 DC Charging System',
    powerKw: 120,
    powerKwOptions: [40, 60, 80, 120, 160],
    overview:
      'Mid-power DC platform for commercial and public sites — แพลตฟอร์ม DC กลาง 40–160 kW พร้อมการยืนยันตัวตนหลายช่องทาง',
    input: {
      voltage: '400V±15% / 440V±15% / 480V±15% AC TN-S',
      frequency: '45–65 Hz',
      type: 'Three phase',
    },
    output: {
      power: '40 / 60 / 80 / 120 / 160 kW',
      ratedVoltage: 'CCS2 1000V DC',
      maxCurrent: 'CCS2 200A',
      cableLength: '5m × 2 or 7m × 2',
    },
    environment: {
      operatingTemp: '-30 °C ~ +50 °C',
      humidity: '5–95%, without condensation',
      noise: '<65 dB',
    },
    structure: {
      ipRating: 'IP54',
      cooling: 'Forced Air-Cooling',
      dimensions: '700 × 490 × 1696 mm',
    },
    components: {
      screen: '8" LCD Touch Screen',
      network: '4G (GSM or CDMA) / Ethernet',
      protocol: 'OCPP1.6J or OCPP2.0.1',
      authorization: 'APP / RFID / NFC / Credit Card',
    },
    protection: ['Modular safe design', 'Remote monitoring', 'OTA upgrade'],
    optionalFunctions: ['7 m cables', 'Credit card payment'],
    standards: ['OCPP 1.6J', 'OCPP 2.0.1'],
    certifications: ['CE', 'TUV SUD'],
    image: '/images/packages/cx-dc-j2.jpg',
    priceRateIds: ['rate-dc-j-120'],
    sourceFile: '40-160 kW.pdf',
  },
  {
    id: 'spec-zd-j3',
    model: 'ZD-DC-J3',
    nameTh: 'เครื่องชาร์จ DC ZeedaDirect J3 (160–240 kW)',
    nameEn: 'ZeedaDirect ZD-DC-J3 DC Charging System',
    powerKw: 180,
    powerKwOptions: [160, 180, 240],
    overview:
      'High-power DC system for station and depot use — ระบบ DC ความจุสูง 160/180/240 kW สำหรับสถานีและเดโป',
    input: {
      voltage: '400V±15% / 440V±15% / 480V±15% AC TN-S',
      frequency: '45–65 Hz',
      type: 'Three phase',
    },
    output: {
      power: '160 / 180 / 240 kW',
      ratedVoltage: 'CCS2 1000V DC',
      maxCurrent: 'CCS2 200A / 250A / 400A',
      cableLength: '5m × 2 or 7m × 2',
    },
    environment: {
      operatingTemp: '-30 °C to +50 °C',
      humidity: '5–95%, non-condensing',
      noise: '<65 dB',
    },
    structure: {
      ipRating: 'IP54',
      cooling: 'Forced Air-Cooling',
      dimensions: '750 × 605 × 1805 mm',
    },
    components: {
      screen: '8" LCD Touch Screen',
      network: '4G (GSM or CDMA) / Ethernet',
      protocol: 'OCPP 1.6J or OCPP 2.0.1',
      authorization: 'App / RFID / NFC / Credit Card',
    },
    protection: ['Modular safe design', 'Remote monitoring', 'OTA upgrade'],
    optionalFunctions: ['7 m cables', 'Credit card payment'],
    standards: ['OCPP 1.6J', 'OCPP 2.0.1'],
    certifications: ['CE', 'TUV SUD'],
    image: '/images/packages/cx-dc-j3.jpg',
    priceRateIds: ['rate-dc-j-180', 'rate-dc-j-240'],
    sourceFile: '160-240 kW.pdf',
  },
  {
    id: 'spec-zd-j4',
    model: 'ZD-DC-J4',
    nameTh: 'เครื่องชาร์จ DC ZeedaDirect J4 (240–420 kW)',
    nameEn: 'ZeedaDirect ZD-DC-J4 DC Charging System',
    powerKw: 240,
    powerKwOptions: [240, 300, 360, 420],
    overview:
      'Ultra high-power DC platform for hubs and highway corridors — แพลตฟอร์ม DC กำลังสูงพิเศษ 240–420 kW',
    input: {
      voltage: '400V±15% / 440V±15% / 480V±15%',
      frequency: '45–65 Hz',
      type: 'Three phase',
    },
    output: {
      power: '240 / 300 / 360 / 420 kW',
      ratedVoltage: 'CCS2 1000V DC',
      maxCurrent: 'CCS2 400A',
      cableLength: '5m × 2 or 7m × 2',
    },
    environment: {
      operatingTemp: '-30 °C ~ +50 °C',
      humidity: '5–95%, without condensation',
      noise: '<65 dB',
    },
    structure: {
      ipRating: 'IP54',
      cooling: 'Forced Air-Cooling',
      dimensions: '850 × 1100 × 2200 mm',
    },
    components: {
      screen: '8" LCD Touch Screen',
      network: '4G (GSM) / Ethernet / WIFI',
      protocol: 'OCPP1.6J or OCPP2.0',
      authorization: 'APP / RFID / NFC / Credit Card',
    },
    protection: ['Modular safe design', 'Remote monitoring', 'OTA upgrade'],
    optionalFunctions: ['7 m cables', 'WIFI', 'Credit card payment'],
    standards: ['OCPP 1.6J', 'OCPP 2.0'],
    certifications: ['CE'],
    image: '/images/packages/cx-dc-j4.jpg',
    priceRateIds: ['rate-dc-j-240'],
    sourceFile: '240-420 kW.pdf',
  },
  // AC series
  {
    id: 'spec-ac-g-7',
    model: 'ZD-AC-G',
    nameTh: 'เครื่องชาร์จ AC G-Series 7.4 kW',
    nameEn: 'ZD Energy G Series 7.4kW Single Phase EV Charger',
    powerKw: 7,
    powerKwOptions: [3.7, 7.4],
    overview:
      'Compact single-phase AC wallbox for home and light commercial — เครื่องชาร์จ AC เฟสเดียว กะทัดรัด IP55',
    input: {
      voltage: 'AC 230V',
      current: '32A (16A option)',
      frequency: '50 Hz',
      phase: '1P',
    },
    output: {
      power: '7.4 kW (3.7 kW option)',
      cableLength: '7 m',
      connector: 'Type 2 / CCS2 compatible platform',
    },
    environment: {
      operatingTemp: '-25 °C to +50 °C',
      storageTemp: '-40 °C to +85 °C',
      humidity: '5%–95% no condensation',
      altitude: '≤2000 m',
    },
    structure: {
      ipRating: 'IP55',
      dimensions: '310 × 214 × 90 mm',
      weight: '3.5 kg',
      mount: 'Wall / pedestal',
    },
    components: {
      connectivity: 'WIFI / 4G / Bluetooth (optional)',
      rfid: 'Optional (2 cards)',
      protocol: 'OCPP1.6JSON',
      app: 'Yes',
    },
    protection: [
      'Undervoltage / Overvoltage',
      'Overcurrent',
      'Overheat',
      'Short Circuit',
      'Leakage (DC 6mA, AC 30mA ≤0.1s)',
      'Lightning',
      'Emergency Stop',
    ],
    optionalFunctions: ['RFID', 'WIFI', '4G', 'Bluetooth', 'Pedestal'],
    standards: ['OCPP 1.6 JSON'],
    certifications: ['CE', 'UKCA', 'CQC', 'NOM', 'SAA', 'RoHS'],
    image: '/images/packages/cx-ac-g7.jpg',
    priceRateIds: ['rate-ac-g-7'],
    sourceFile: 'เครื่องชาร์จ AC G-Series EV Charger.pdf',
  },
  {
    id: 'spec-ac-k-7',
    model: 'ZD-AC-K',
    nameTh: 'เครื่องชาร์จ AC K-Series 7.4 kW',
    nameEn: 'ZD Energy K Series 7.4kW Single Phase EV Charger',
    powerKw: 7,
    powerKwOptions: [3.7, 7.4],
    overview:
      'Rugged single-phase AC charger with IP66 shell — เครื่องชาร์จ AC เฟสเดียว เปลือก IP66 สำหรับกลางแจ้ง',
    input: {
      voltage: 'AC 230V (EU) / AC 110–265V (US)',
      current: '32A (16A option)',
      frequency: '40–60 Hz',
      phase: '1P',
    },
    output: {
      power: '7.4 kW (3.7 kW option)',
      cableLength: '7 m',
    },
    environment: {
      operatingTemp: '-20 °C to +65 °C (EU)',
      storageTemp: '-40 °C to +85 °C',
      humidity: '5%–95% no condensation',
      altitude: '≤4000 m',
    },
    structure: {
      ipRating: 'IP66 shell / IP55 gun',
      dimensions: '420 × 251 × 145 mm',
      weight: '4.58 kg',
      mount: 'Wall / pedestal',
    },
    components: {
      connectivity: 'WiFi / 4G / Bluetooth',
      rfid: 'Optional (2 cards)',
      protocol: 'OCPP 1.6 JSON',
      app: 'Yes',
    },
    protection: [
      'Undervoltage / Overvoltage',
      'Overcurrent',
      'Overheat',
      'Short Circuit',
      'Leakage (DC 6mA, AC 30mA ≤0.1s)',
      'Lightning',
      'Emergency Stop',
    ],
    optionalFunctions: ['RFID', 'WIFI', '4G', 'Bluetooth', 'Pedestal'],
    standards: ['OCPP 1.6 JSON'],
    certifications: ['CE', 'UKCA', 'ETL', 'CCC', 'FCC', 'IC', 'RoHS'],
    image: '/images/packages/cx-ac-k7.jpg',
    priceRateIds: ['rate-ac-k-7'],
    sourceFile: 'เครื่องชาร์จ AC K-Series EV Charger.pdf',
  },
  {
    id: 'spec-ac-miniz-7',
    model: 'ZD-AC-MINIZ',
    nameTh: 'เครื่องชาร์จ AC Mini Z-Series 7 kW',
    nameEn: 'AC Mini Z-Series 7 kW Charger',
    powerKw: 7,
    overview:
      'Entry AC wallbox for residential and light commercial — เครื่องชาร์จ AC รุ่นประหยัดสำหรับบ้านและธุรกิจขนาดเล็ก',
    input: {
      voltage: 'AC 230V',
      phase: '1P',
      power: '7 kW',
    },
    output: {
      power: '7 kW',
    },
    environment: {
      usage: 'Indoor / outdoor light commercial',
    },
    structure: {
      form: 'Compact wallbox',
    },
    components: {
      protocol: 'OCPP ready (series dependent)',
    },
    protection: ['Standard AC charger protections'],
    optionalFunctions: [],
    standards: [],
    certifications: ['CE'],
    image: '/images/packages/cx-ac-miniz.jpg',
    priceRateIds: ['rate-ac-miniz-7'],
    sourceFile: 'ตารางราคาเครื่องชาร์จแบบ AC.pdf',
  },
  {
    id: 'spec-ac-e',
    model: 'ZD-AC-E',
    nameTh: 'เครื่องชาร์จ AC E-Series 11/22 kW',
    nameEn: 'ZD Energy E Series 11/22kW Three Phase EV Charger',
    powerKw: 22,
    powerKwOptions: [11, 22],
    overview:
      'Three-phase AC charger for commercial sites — เครื่องชาร์จ AC สามเฟส 11/22 kW IP55 สำหรับเชิงพาณิชย์',
    input: {
      voltage: 'AC 400V',
      current: '32A (16A option)',
      frequency: '50 Hz',
      phase: '3P',
    },
    output: {
      power: '22 kW (11 kW option)',
      cableLength: '7 m',
    },
    environment: {
      operatingTemp: '-20 °C to +50 °C',
      storageTemp: '-40 °C to +85 °C',
      humidity: '5%–95% no condensation',
      altitude: '≤2000 m',
    },
    structure: {
      ipRating: 'IP55',
      dimensions: '473 × 290 × 160 mm',
      weight: '8 kg',
      mount: 'Wall / pedestal',
    },
    components: {
      connectivity: 'WIFI / 4G / Bluetooth',
      rfid: 'Optional (2 cards)',
      protocol: 'OCPP1.6JSON',
      app: 'Yes',
    },
    protection: [
      'Undervoltage / Overvoltage',
      'Overcurrent',
      'Overheat',
      'Short Circuit',
      'Leakage (DC 6mA, AC 30mA ≤0.1s)',
      'Lightning',
      'Emergency Stop',
    ],
    optionalFunctions: ['RFID', 'WIFI', '4G', 'Bluetooth', 'Pedestal'],
    standards: ['OCPP 1.6 JSON'],
    certifications: ['CE', 'UKCA', 'RCM', 'CQC', 'TUV', 'SGS', 'RoHS'],
    image: '/images/packages/cx-ac-e.jpg',
    priceRateIds: ['rate-ac-e-11', 'rate-ac-e-22'],
    sourceFile: 'เครื่องชาร์จ AC E-Series EV Charger.pdf',
  },
]

export function listChargerSpecs() {
  return CHARGER_SPECS
}

export function getChargerSpec(id: string) {
  return CHARGER_SPECS.find((s) => s.id === id) ?? null
}

export function getChargerSpecByPower(powerKw: number) {
  return (
    CHARGER_SPECS.find((s) => s.powerKw === powerKw) ??
    CHARGER_SPECS.find((s) => s.powerKwOptions?.includes(powerKw)) ??
    null
  )
}

export function getChargerSpecForRate(priceRateId: string) {
  return CHARGER_SPECS.find((s) => s.priceRateIds.includes(priceRateId)) ?? null
}
