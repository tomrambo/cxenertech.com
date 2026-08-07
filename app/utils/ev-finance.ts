/**
 * EV Charging — financial model & break-even schema
 */

import type { Money } from './ev-packages'
import type { BoqSummary } from './ev-boq'

export type FeeBasis = 'revenue' | 'gross_profit' | 'net_profit'

export type FeeRule = {
  id: string
  label: string
  /** e.g. platform 12%, land GP 15%, coordinator 10% */
  pct: number
  basis: FeeBasis
  /** Apply before investor residual */
  order: number
}

export type FinancialAssumptions = {
  /** Selling price to EV drivers */
  sellPricePerKwh: Money
  /** Electricity purchase cost */
  energyCostPerKwh: Money
  /** Average dispensed energy per day */
  kwhPerDay: number
  /** Operating days per month */
  daysPerMonth: number
  /** Fixed monthly opex (maintenance, insurance, internet excl. energy) */
  fixedOpexMonthly: Money
  /** Fees deducted from revenue or profit */
  feeRules: FeeRule[]
  /**
   * Which CAPEX basis to use for break-even:
   * - beforeVat: investment before VAT
   * - grandTotal: include VAT
   */
  capexBasis: 'beforeVat' | 'grandTotal'
}

export type BreakEvenResult = {
  contributionPerKwh: Money
  revenueMonthly: Money
  energyCostMonthly: Money
  variableFeesMonthly: Money
  fixedOpexMonthly: Money
  grossMarginMonthly: Money
  /** After profit-share style fees on GP/net */
  investorNetMonthly: Money
  annualInvestorNet: Money
  breakEvenMonths: number | null
  breakEvenKwh: number | null
  /** Hours/day at full station power needed to hit daily BE energy */
  breakEvenFullLoadHoursPerDay: number | null
  roiAnnualPct: number | null
  paybackYears: number | null
  feasible: boolean
  warnings: string[]
}

export type FinancialModel = {
  assumptions: FinancialAssumptions
  capex: Money
  stationKw: number
  result: BreakEvenResult
  disclaimer: string
}

export const DEFAULT_FEE_RULES_STARTER: FeeRule[] = [
  { id: 'platform', label: 'Platform / Management fee', pct: 0.12, basis: 'revenue', order: 1 },
  { id: 'gp-share', label: 'GP share', pct: 0.25, basis: 'gross_profit', order: 2 },
  { id: 'coordinator', label: 'Coordinator', pct: 0.1, basis: 'net_profit', order: 3 },
]

export const DEFAULT_FEE_RULES_GROWTH: FeeRule[] = [
  { id: 'platform', label: 'Platform / Management fee', pct: 0.15, basis: 'revenue', order: 1 },
  { id: 'land-gp', label: 'Land owner GP', pct: 0.15, basis: 'revenue', order: 1 },
  { id: 'coordinator', label: 'Coordinator', pct: 0.1, basis: 'net_profit', order: 3 },
]

export const DEFAULT_ASSUMPTIONS: FinancialAssumptions = {
  sellPricePerKwh: 8,
  energyCostPerKwh: 2.8,
  kwhPerDay: 2400,
  daysPerMonth: 30,
  fixedOpexMonthly: 28000,
  feeRules: DEFAULT_FEE_RULES_STARTER,
  capexBasis: 'beforeVat',
}

/** Preset assumptions aligned with CX Station S4 / S10 examples */
export const ASSUMPTION_PRESETS = {
  'CX-S4': {
    ...DEFAULT_ASSUMPTIONS,
    kwhPerDay: 2400,
    fixedOpexMonthly: 28000, // maintenance 20k + insurance 5k + internet 3k
    feeRules: DEFAULT_FEE_RULES_STARTER,
  } satisfies FinancialAssumptions,
  'CX-S10': {
    ...DEFAULT_ASSUMPTIONS,
    kwhPerDay: 6000,
    fixedOpexMonthly: 28000, // maintenance 20k + internet 5k + utilities 3k
    feeRules: DEFAULT_FEE_RULES_GROWTH,
  } satisfies FinancialAssumptions,
} as const

export const FINANCE_DISCLAIMER =
  'จุดคุ้มทุนและ ROI เป็นประมาณการตามสมมติฐานที่กำหนด ไม่ใช่การรับประกันผลตอบแทนจริง Utilization และอัตราค่าไฟขึ้นกับทำเลและการดำเนินงาน'

function feesOnRevenue(revenue: Money, rules: FeeRule[]): Money {
  return rules
    .filter((r) => r.basis === 'revenue')
    .reduce((sum, r) => sum + revenue * r.pct, 0)
}

/**
 * Variable fee rate as fraction of revenue (for contribution/kWh).
 * Only revenue-based fees reduce per-kWh contribution directly.
 */
export function variableFeeRate(rules: FeeRule[]): number {
  return rules.filter((r) => r.basis === 'revenue').reduce((sum, r) => sum + r.pct, 0)
}

export function contributionPerKwh(
  sellPricePerKwh: Money,
  energyCostPerKwh: Money,
  feeRules: FeeRule[],
): Money {
  const f = variableFeeRate(feeRules)
  return sellPricePerKwh - energyCostPerKwh - sellPricePerKwh * f
}

export function resolveCapex(summary: BoqSummary, basis: FinancialAssumptions['capexBasis']): Money {
  return basis === 'grandTotal' ? summary.grandTotal : summary.beforeVat
}

export function computeBreakEven(input: {
  capex: Money
  stationKw: number
  assumptions: FinancialAssumptions
}): BreakEvenResult {
  const a = input.assumptions
  const warnings: string[] = []

  if (a.sellPricePerKwh <= a.energyCostPerKwh) {
    warnings.push('ราคาขายต่ำกว่าหรือเท่ากับต้นทุนไฟ — ไม่มี contribution เป็นบวก')
  }

  const u = contributionPerKwh(a.sellPricePerKwh, a.energyCostPerKwh, a.feeRules)
  const revenueMonthly = a.sellPricePerKwh * a.kwhPerDay * a.daysPerMonth
  const energyCostMonthly = a.energyCostPerKwh * a.kwhPerDay * a.daysPerMonth
  const variableFeesMonthly = feesOnRevenue(revenueMonthly, a.feeRules)

  // Margin after energy + revenue fees + fixed opex (before GP/net profit shares)
  const afterVariable = revenueMonthly - energyCostMonthly - variableFeesMonthly
  const grossMarginMonthly = afterVariable - a.fixedOpexMonthly

  // Apply gross_profit then net_profit fees in order
  const gpRules = [...a.feeRules].filter((r) => r.basis === 'gross_profit').sort((x, y) => x.order - y.order)
  let afterGp = grossMarginMonthly
  for (const rule of gpRules) {
    afterGp -= Math.max(0, afterGp) * rule.pct
  }

  const netRules = [...a.feeRules].filter((r) => r.basis === 'net_profit').sort((x, y) => x.order - y.order)
  let investorNetMonthly = afterGp
  for (const rule of netRules) {
    investorNetMonthly -= Math.max(0, investorNetMonthly) * rule.pct
  }

  const annualInvestorNet = investorNetMonthly * 12
  const feasible = u > 0 && investorNetMonthly > 0

  if (u <= 0) {
    warnings.push('Contribution ต่อ kWh ≤ 0 — ตรวจราคาขาย / ค่าไฟ / platform fee')
  }
  if (investorNetMonthly <= 0) {
    warnings.push('กำไรสุทธินักลงทุนต่อเดือน ≤ 0 ภายใต้สมมติฐานนี้')
  }

  const breakEvenMonths =
    feasible && investorNetMonthly > 0 ? input.capex / investorNetMonthly : null

  // Energy-only BE ignoring fixed & profit shares (useful sensitivity)
  const breakEvenKwh = u > 0 ? input.capex / u : null

  // Full-load hours to deliver assumed daily kWh (utilization signal)
  const breakEvenFullLoadHoursPerDay =
    input.stationKw > 0 && a.kwhPerDay > 0 ? a.kwhPerDay / input.stationKw : null

  if (breakEvenFullLoadHoursPerDay != null && breakEvenFullLoadHoursPerDay > 14) {
    warnings.push(
      `Utilization อ้างอิงสูง (~${breakEvenFullLoadHoursPerDay.toFixed(1)} ชม.เต็มกำลัง/วัน) — ควรปรับ kWh/วันให้สมจริง`,
    )
  }

  const roiAnnualPct =
    feasible && input.capex > 0 ? (annualInvestorNet / input.capex) * 100 : null

  const paybackYears =
    breakEvenMonths != null ? breakEvenMonths / 12 : null

  return {
    contributionPerKwh: u,
    revenueMonthly,
    energyCostMonthly,
    variableFeesMonthly,
    fixedOpexMonthly: a.fixedOpexMonthly,
    grossMarginMonthly,
    investorNetMonthly,
    annualInvestorNet,
    breakEvenMonths,
    breakEvenKwh,
    breakEvenFullLoadHoursPerDay,
    roiAnnualPct,
    paybackYears,
    feasible,
    warnings,
  }
}

export function buildFinancialModel(input: {
  summary: BoqSummary
  stationKw: number
  assumptions?: Partial<FinancialAssumptions>
  feePreset?: keyof typeof ASSUMPTION_PRESETS
}): FinancialModel {
  const base =
    input.feePreset != null
      ? ASSUMPTION_PRESETS[input.feePreset]
      : DEFAULT_ASSUMPTIONS

  const assumptions: FinancialAssumptions = {
    ...base,
    ...input.assumptions,
    feeRules: input.assumptions?.feeRules ?? base.feeRules,
  }

  const capex = resolveCapex(input.summary, assumptions.capexBasis)
  const result = computeBreakEven({
    capex,
    stationKw: input.stationKw,
    assumptions,
  })

  return {
    assumptions,
    capex,
    stationKw: input.stationKw,
    result,
    disclaimer: FINANCE_DISCLAIMER,
  }
}

/** Sensitivity: months to BE across a kWh/day range */
export function breakEvenSensitivity(input: {
  capex: Money
  stationKw: number
  assumptions: FinancialAssumptions
  kwhPerDayPoints: number[]
}): Array<{ kwhPerDay: number; breakEvenMonths: number | null; investorNetMonthly: Money }> {
  return input.kwhPerDayPoints.map((kwhPerDay) => {
    const result = computeBreakEven({
      capex: input.capex,
      stationKw: input.stationKw,
      assumptions: { ...input.assumptions, kwhPerDay },
    })
    return {
      kwhPerDay,
      breakEvenMonths: result.breakEvenMonths,
      investorNetMonthly: result.investorNetMonthly,
    }
  })
}
