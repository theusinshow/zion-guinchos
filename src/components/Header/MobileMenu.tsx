'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import styles from './Header.module.css'

const FOCUSABLE = 'a[href], button:not([disabled])'

/** Menu mobile (DEC-019): painel abaixo do header, Escape fecha, trava scroll, foco volta ao botão. */
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const header = buttonRef.current?.closest('header')
    const top = header ? header.getBoundingClientRect().bottom : 0
    panelRef.current?.style.setProperty('--menu-top', `${Math.max(top, 0)}px`)

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
      if (window.matchMedia('(min-width: 1024px)').matches) close(false)
    }

    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
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
        data-open={open}
        hidden={!open}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a[href]')) close(false)
        }}
      >
        {children}
      </div>
    </>
  )
}
