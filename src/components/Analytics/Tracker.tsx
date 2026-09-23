'use client'

import { useEffect } from 'react'
import { analyticsEnabled, isTrackEvent, isTrackPlacement, track } from '@/lib/analytics'

/** Listener delegado único: qualquer clique em [data-track] vira track(evento, {placement}). */
export function Tracker() {
  useEffect(() => {
    if (!analyticsEnabled) return
    const onClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>('[data-track]')
      // CTA com contato pendente (DEC-024) não tem destino: não é uma conversão.
      if (!element || element.hasAttribute('data-pending')) return
      const { track: name, placement } = element.dataset
      if (isTrackEvent(name) && isTrackPlacement(placement)) track(name, { placement })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])

  return null
}
