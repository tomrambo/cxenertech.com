export const QUOTE_PAYMENT_METHODS = [
  {
    value: 'cash',
    label: 'ชำระเงินสด / จ่ายก้อน',
    hint: 'ซื้อขาด เป็นเจ้าของระบบทันที',
  },
  {
    value: 'card_installment',
    label: 'ผ่อนบัตรเครดิต',
    hint: 'ผ่อนผ่านบัตรกับธนาคารผู้ออกบัตร',
  },
  {
    value: 'hire_purchase',
    label: 'ผ่อนเช่าซื้อ (สินเชื่อ)',
    hint: 'เป็นเจ้าของระบบ จ่ายเป็นงวดผ่านสถาบันการเงิน',
  },
  {
    value: 'leasing',
    label: 'ลีส',
    hint: 'เช่าใช้ระบบตามสัญญา ไม่ต้องล็อกเงินก้อนเท่าซื้อขาด',
  },
] as const

export type QuotePaymentMethod = (typeof QUOTE_PAYMENT_METHODS)[number]['value']

export const FINANCE_PAYMENT_METHODS: QuotePaymentMethod[] = [
  'hire_purchase',
  'leasing',
  'card_installment',
]

export const QUOTE_PAYMENT_LABELS: Record<QuotePaymentMethod, string> = {
  cash: 'ชำระเงินสด / จ่ายก้อน',
  card_installment: 'ผ่อนบัตรเครดิต',
  hire_purchase: 'ผ่อนเช่าซื้อ (สินเชื่อ)',
  leasing: 'ลีส',
}

export function paymentMethodsForIntent(isFinance: boolean): QuotePaymentMethod[] {
  return isFinance ? [...FINANCE_PAYMENT_METHODS] : QUOTE_PAYMENT_METHODS.map((m) => m.value)
}

export function primaryPaymentMethod(methods: QuotePaymentMethod[]): QuotePaymentMethod | undefined {
  if (!methods.length) return undefined
  const rank: QuotePaymentMethod[] = ['hire_purchase', 'leasing', 'card_installment', 'cash']
  return rank.find((m) => methods.includes(m)) ?? methods[0]
}
