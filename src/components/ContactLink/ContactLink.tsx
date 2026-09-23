import type { WhatsappMessageKey } from '@/config/business'
import type { TrackEvent, TrackPlacement } from '@/lib/analytics'
import { getPhoneHref, getWhatsappHref } from '@/lib/contact'

type Props = {
  channel: 'whatsapp' | 'phone'
  placement: TrackPlacement
  /** Mensagem pré-preenchida do WhatsApp (CONTENT.md). */
  message?: WhatsappMessageKey
  /** Sobrescreve o evento padrão do canal (ex.: location_cta_click). */
  event?: TrackEvent
  className?: string
  children: React.ReactNode
}

/**
 * Link de conversão (WhatsApp/ligação). Destino e tracking vêm dos helpers centrais.
 * TODO(P0): enquanto o número estiver pendente (null), renderiza igual à referência,
 * porém sem href, com aria-disabled e data-pending — nunca um destino falso.
 */
export function ContactLink({ channel, placement, message = 'default', event, className, children }: Props) {
  const href = channel === 'whatsapp' ? getWhatsappHref(message) : getPhoneHref()
  const trackEvent = event ?? (channel === 'whatsapp' ? 'whatsapp_click' : 'phone_click')
  const external = channel === 'whatsapp'

  if (!href) {
    return (
      <a className={className} role="link" aria-disabled="true" data-pending={channel} data-track={trackEvent} data-placement={placement}>
        {children}
      </a>
    )
  }

  return (
    <a
      className={className}
      href={href}
      data-track={trackEvent}
      data-placement={placement}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
