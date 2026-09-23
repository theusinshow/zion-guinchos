import { business, type WhatsappMessageKey } from '@/config/business'

const digits = (value: string) => value.replace(/\D/g, '')

/** `tel:` do telefone confirmado, ou null enquanto o dado estiver pendente. */
export function getPhoneHref(): string | null {
  if (!business.phoneE164) return null
  return `tel:+${digits(business.phoneE164)}`
}

/** URL wa.me com mensagem pré-preenchida (CONTENT.md), ou null se pendente. */
export function getWhatsappHref(message: WhatsappMessageKey = 'default'): string | null {
  if (!business.whatsappE164) return null
  const text = encodeURIComponent(business.whatsappMessages[message])
  return `https://wa.me/${digits(business.whatsappE164)}?text=${text}`
}

/** Placeholders visíveis só fora de produção; em produção ficam ocultos. */
export const showPendingPlaceholders = process.env.NODE_ENV !== 'production'
