'use client'

import { useEffect } from 'react'

const DESKTOP = '(min-width: 1280px)'
/** Rolagem mínima para cima antes de o header voltar: evita piscar com o trackpad. */
const SHOW_AFTER = 8

/**
 * Header "headroom" no desktop (DEC-034): some ao rolar para baixo e volta ao rolar para cima, para o
 * contato nunca ficar a mais de um gesto de distância. Não some com o foco dentro dele.
 */
export function HeaderScroll() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-site-header]')
    if (!header) return
    const desktop = window.matchMedia(DESKTOP)

    let lastY = window.scrollY
    let upDistance = 0
    let frame = 0

    const setHidden = (hidden: boolean) => {
      header.dataset.hidden = String(hidden)
    }

    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      const delta = y - lastY
      lastY = y

      if (!desktop.matches || y <= header.offsetHeight || header.contains(document.activeElement)) {
        upDistance = 0
        setHidden(false)
        return
      }
      if (delta > 0) {
        upDistance = 0
        setHidden(true)
      } else if (delta < 0) {
        upDistance -= delta
        if (upDistance >= SHOW_AFTER) setHidden(false)
      }
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onFocusIn = () => {
      if (header.contains(document.activeElement)) setHidden(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    header.addEventListener('focusin', onFocusIn)
    desktop.addEventListener('change', update)
    return () => {
      window.removeEventListener('scroll', onScroll)
      header.removeEventListener('focusin', onFocusIn)
      desktop.removeEventListener('change', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return null
}
