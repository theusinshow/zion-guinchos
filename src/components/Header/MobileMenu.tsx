'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import styles from './Header.module.css'

const FOCUSABLE = 'a[href], button:not([disabled])'

/** Fundo que fica inerte com o menu aberto: conteúdo da página + itens do header fora do menu. */
function backgroundElements(header: HTMLElement | null): HTMLElement[] {
  const page = [...document.querySelectorAll<HTMLElement>('main, footer')]
  const headerItems = header ? [...header.querySelectorAll<HTMLElement>('[data-menu-background]')] : []
  return [...page, ...headerItems]
}

/** Foca o destino de uma âncora (tabIndex=-1 quando não focável) para manter a posição do leitor/teclado. */
function focusAnchorTarget(hash: string) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  history.pushState(null, '', hash)
  target.focus()
}

/**
 * Menu mobile (DEC-019). Modal: role=dialog + aria-modal, fundo inert, scroll travado,
 * Tab circula entre botão e painel, Escape fecha e devolve o foco ao botão.
 */
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pendingHash = useRef<string | null>(null)

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])

  // Depois de fechar por âncora: fundo já sem inert e scroll liberado, então foca o destino.
  useEffect(() => {
    if (open || !pendingHash.current) return
    focusAnchorTarget(pendingHash.current)
    pendingHash.current = null
  }, [open])

  useEffect(() => {
    if (!open) return
    const header = buttonRef.current?.closest('header') ?? null
    const top = header ? header.getBoundingClientRect().bottom : 0
    panelRef.current?.style.setProperty('--menu-top', `${Math.max(top, 0)}px`)

    const background = backgroundElements(header)
    background.forEach((element) => {
      element.inert = true
    })

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(true)
        return
      }
      if (event.key !== 'Tab' || !panelRef.current || !buttonRef.current) return
      // Ciclo de foco: botão do menu + itens do painel.
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
      const index = items.indexOf(document.activeElement as HTMLElement)
      const next = event.shiftKey ? index - 1 : index + 1
      if (index === -1 || next < 0 || next >= items.length) {
        event.preventDefault()
        items[event.shiftKey ? items.length - 1 : 0].focus()
      }
    }
    const onResize = () => {
      if (!window.matchMedia('(min-width: 1280px)').matches) return
      const hadFocus = panelRef.current?.contains(document.activeElement) || document.activeElement === buttonRef.current
      close(false)
      // O botão e o painel somem no desktop: foco vai para o controle visível equivalente (nav principal).
      if (hadFocus) header?.querySelector<HTMLElement>('nav a[href]')?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      background.forEach((element) => {
        element.inert = false
      })
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open, close])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuToggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.menuIcon} data-open={open} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <div
        ref={panelRef}
        id={panelId}
        className={styles.menuPanel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-open={open}
        hidden={!open}
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
          if (!link) return
          event.preventDefault()
          pendingHash.current = link.hash
          close(false)
        }}
      >
        {children}
      </div>
    </>
  )
}
