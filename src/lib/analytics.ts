/**
 * Tracking centralizado (docs/SEO-ANALYTICS.md §8).
 * Componentes nunca chamam gtag diretamente: usam `track()`.
 * Sem IDs configurados (NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GOOGLE_ADS_ID) é no-op.
 */

export type TrackEvent = 'whatsapp_click' | 'phone_click' | 'location_cta_click'

export type TrackPlacement = 'header' | 'hero' | 'como_funciona' | 'urgent_cta' | 'area' | 'final' | 'footer' | 'menu'

export type TrackParams = {
  placement: TrackPlacement
}

type Gtag = (command: 'event', eventName: string, params: Record<string, unknown>) => void

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? ''
const ADS_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL ?? ''

export const analyticsEnabled = Boolean(GA_ID || ADS_ID)

// Eventos por posição exigidos (ex.: hero_whatsapp_click, final_phone_click).
const PLACEMENT_EVENTS: Partial<Record<TrackPlacement, string>> = {
  hero: 'hero',
  urgent_cta: 'urgent_cta',
  final: 'final',
}

function placementEventName(event: TrackEvent, placement: TrackPlacement): string | null {
  const prefix = PLACEMENT_EVENTS[placement]
  if (!prefix) return null
  if (event === 'whatsapp_click') return `${prefix}_whatsapp_click`
  if (event === 'phone_click') return `${prefix}_phone_click`
  return null
}

export function track(event: TrackEvent, { placement }: TrackParams): void {
  if (!analyticsEnabled || typeof window === 'undefined') return
  const gtag = (window as Window & { gtag?: Gtag }).gtag
  if (typeof gtag !== 'function') return

  const params = { placement, page_path: window.location.pathname }
  gtag('event', event, params)

  const positional = placementEventName(event, placement)
  if (positional) gtag('event', positional, params)

  if (ADS_ID && ADS_LABEL) {
    gtag('event', 'conversion', { send_to: `${ADS_ID}/${ADS_LABEL}` })
  }
}
