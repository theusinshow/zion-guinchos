import { business, type WhatsappMessageKey } from '@/config/business'

// E.164: "+" seguido de 10–15 dígitos (DDI + número). Qualquer outro formato é tratado como pendente.
const E164 = /^\+\d{10,15}$/

function toE164Digits(value: string | null): string | null {
  if (!value || !E164.test(value)) return null
  return value.slice(1)
}

/** `tel:` do telefone confirmado, ou null enquanto o dado estiver pendente/inválido. */
export function getPhoneHref(): string | null {
  const digits = toE164Digits(business.phoneE164)
  return digits ? `tel:+${digits}` : null
}

/** URL wa.me com mensagem pré-preenchida (CONTENT.md), ou null se pendente/inválido. */
export function getWhatsappHref(message: WhatsappMessageKey = 'default'): string | null {
  const digits = toE164Digits(business.whatsappE164)
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(business.whatsappMessages[message])}`
}

/** Placeholders visíveis só fora de produção; em produção ficam ocultos. */
export const showPendingPlaceholders = process.env.NODE_ENV !== 'production'
