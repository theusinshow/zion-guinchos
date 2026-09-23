'use client'

import { useEffect } from 'react'

/**
 * Motion discreto (DESIGN.md §18, DEC-016): revela blocos [data-reveal] ao entrar na viewport.
 * Progressive enhancement — o estado oculto só existe com html.reveal-ready (adicionada aqui, com JS)
 * e dentro de prefers-reduced-motion: no-preference (globals.css). Sem JS ou com reduce, tudo visível.
 */
export function Reveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const targets = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]

    // O que já está na viewport fica visível antes de ativar o estado oculto (sem flash).
    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.dataset.revealed = ''
    }
    document.documentElement.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.revealed = ''
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    targets.filter((el) => !('revealed' in el.dataset)).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
