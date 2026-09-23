// E.164: "+", primeiro dígito 1–9 e 10–15 dígitos no total. Qualquer outro formato é tratado como pendente.
const E164 = /^\+[1-9]\d{9,14}$/

export function isE164(value: string | null | undefined): value is string {
  return typeof value === 'string' && E164.test(value)
}
