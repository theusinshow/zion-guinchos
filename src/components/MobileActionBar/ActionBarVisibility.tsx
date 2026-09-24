'use client'

import { useEffect } from 'react'

/**
 * Blocos que já trazem WhatsApp + Ligar: com qualquer um deles na tela, a barra não aparece.
 * No CTA final conta o botão (fica ~500px abaixo do título no mobile), não o topo da seção.
 */
const STOPS = '[data-section="cta-urgencia"], [data-section="cta-final"] [data-placement="final"], [data-section="footer"]'

/**
 * Liga a barra (data-visible) sempre que o CTA principal da Hero está fora da tela: depois que ele sai pelo
 * topo e também em telas baixas, onde ele começa cortado ou abaixo da dobra. Sem JS, ela nunca aparece.
 */
export function ActionBarVisibility() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>('[data-action-bar]')
    const heroCta = document.querySelector<HTMLElement>('[data-section="hero"] [data-placement="hero"]')
    if (!bar || !heroCta || !('IntersectionObserver' in window)) return

    let heroCtaHidden = false
    const stopsOnScreen = new Set<Element>()

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroCta) {
          heroCtaHidden = entry.intersectionRatio < 1 // cortado pela dobra conta como fora da tela
        } else if (entry.isIntersecting) {
          stopsOnScreen.add(entry.target)
        } else {
          stopsOnScreen.delete(entry.target)
        }
      }
      bar.dataset.visible = String(heroCtaHidden && stopsOnScreen.size === 0)
    }, { threshold: [0, 1] })

    observer.observe(heroCta)
    document.querySelectorAll(STOPS).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
