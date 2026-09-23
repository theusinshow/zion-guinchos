import { business, type WhatsappMessageKey } from '@/config/business'
import { isE164 } from '@/lib/e164'

function toE164Digits(value: string | null): string | null {
  return isE164(value) ? value.slice(1) : null
}

/** Telefone confirmado em E.164 (para JSON-LD), ou null. */
export function getPhoneE164(): string | null {
  return isE164(business.phoneE164) ? business.phoneE164 : null
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
