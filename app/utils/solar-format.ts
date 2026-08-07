export function formatThb(value: number | null | undefined) {
  if (value == null) return '—'
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatKwhYear(value: number) {
  return `${value.toLocaleString('th-TH')} หน่วย/ปี`
}

export function phaseLabel(phase: string) {
  if (phase === '1P') return '1 เฟส / 1-Phase'
  if (phase === '3P') return '3 เฟส / 3-Phase'
  return phase
}

export function startingPrice(pkg: {
  string_inverter: { available: boolean; priceFrom: number | null }
  micro_inverter: { available: boolean; priceFrom: number | null }
}) {
  const prices = [
    pkg.string_inverter.available ? pkg.string_inverter.priceFrom : null,
    pkg.micro_inverter.available ? pkg.micro_inverter.priceFrom : null,
  ].filter((n): n is number => typeof n === 'number')
  if (!prices.length) return null
  return Math.min(...prices)
}
