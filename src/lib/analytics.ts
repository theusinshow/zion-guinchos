/**
 * Tracking centralizado (docs/SEO-ANALYTICS.md §8).
 * Componentes nunca chamam gtag diretamente: marcam o CTA com data-track/data-placement
 * (Tracker delegado) ou usam `track()`. Sem IDs configurados é no-op.
 */

export type TrackEvent = 'whatsapp_click' | 'phone_click' | 'location_cta_click'

export type TrackPlacement = 'header' | 'hero' | 'como_funciona' | 'urgent_cta' | 'area' | 'final' | 'footer' | 'menu'

export type TrackParams = {
  placement: TrackPlacement
}

type Gtag = (command: string, ...args: unknown[]) => void

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? ''

// Conversão do Ads somente para eventos mapeados explicitamente, com label próprio.
const ADS_CONVERSION_LABELS: Record<TrackEvent, string> = {
  whatsapp_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP ?? '',
  phone_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE ?? '',
  location_cta_click: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_LOCATION ?? '',
}

export const analyticsEnabled = Boolean(GA_ID || ADS_ID)

const TRACK_EVENTS: readonly TrackEvent[] = ['whatsapp_click', 'phone_click', 'location_cta_click']
const PLACEMENTS: readonly TrackPlacement[] = ['header', 'hero', 'como_funciona', 'urgent_cta', 'area', 'final', 'footer', 'menu']

export const isTrackEvent = (value: unknown): value is TrackEvent => TRACK_EVENTS.includes(value as TrackEvent)
export const isTrackPlacement = (value: unknown): value is TrackPlacement => PLACEMENTS.includes(value as TrackPlacement)

// Eventos por posição exigidos (ex.: hero_whatsapp_click, final_phone_click).
const PLACEMENT_EVENTS: Partial<Record<TrackPlacement, string>> = {
  hero: 'hero',
  urgent_cta: 'urgent_cta',
  final: 'final',
}

/** O CTA de localização abre o WhatsApp: conta como canal WhatsApp para o evento posicional. */
const channelOf = (event: TrackEvent) => (event === 'phone_click' ? 'phone' : 'whatsapp')

function placementEventName(event: TrackEvent, placement: TrackPlacement): string | null {
  const prefix = PLACEMENT_EVENTS[placement]
  return prefix ? `${prefix}_${channelOf(event)}_click` : null
}

/** Um clique = no máximo uma conversão Ads. Localização usa o label próprio, com fallback para o do WhatsApp. */
function conversionLabel(event: TrackEvent): string {
  if (event === 'location_cta_click') return ADS_CONVERSION_LABELS.location_cta_click || ADS_CONVERSION_LABELS.whatsapp_click
  return ADS_CONVERSION_LABELS[event]
}

function getGtag(): Gtag | null {
  if (typeof window === 'undefined') return null
  const gtag = (window as Window & { gtag?: Gtag }).gtag
  return typeof gtag === 'function' ? gtag : null
}

export function track(event: TrackEvent, { placement }: TrackParams): void {
  if (!analyticsEnabled) return
  const gtag = getGtag()
  if (!gtag) return

  const params = { placement, page_path: window.location.pathname }
  gtag('event', event, params)

  const positional = placementEventName(event, placement)
  if (positional) gtag('event', positional, params)

  const label = conversionLabel(event)
  if (ADS_ID && label) gtag('event', 'conversion', { send_to: `${ADS_ID}/${label}` })
}

/**
 * Ponto único de consentimento (consent mode v2). Default = negado (ver Analytics.tsx) até existir a
 * estratégia de consentimento (OPEN-ITEMS P2); o banner/CMP futuro deve chamar esta função.
 */
export function updateConsent({ analytics, ads }: { analytics: boolean; ads: boolean }): void {
  const gtag = getGtag()
  if (!gtag) return
  gtag('consent', 'update', {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: ads ? 'granted' : 'denied',
    ad_user_data: ads ? 'granted' : 'denied',
    ad_personalization: ads ? 'granted' : 'denied',
  })
}
