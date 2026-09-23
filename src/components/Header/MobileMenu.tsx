'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import styles from './Header.module.css'

const FOCUSABLE = 'a[href], button:not([disabled])'
const DESKTOP = '(min-width: 1280px)'

/** Fundo que fica inerte com o menu aberto: conteúdo da página + itens do header fora do menu. */
function backgroundElements(header: HTMLElement | null): HTMLElement[] {
  const page = [...document.querySelectorAll<HTMLElement>('main, footer')]
  const headerItems = header ? [...header.querySelectorAll<HTMLElement>('[data-menu-background]')] : []
  return [...page, ...headerItems]
}

/** Rola o destino da âncora para o topo e o foca sem nova rolagem (tabIndex=-1 quando não focável). */
function goToAnchor(hash: string) {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  // Preserva a query string (UTMs) ao atualizar o hash.
  history.pushState(null, '', `${location.pathname}${location.search}${hash}`)
  target.scrollIntoView({ block: 'start' })
  target.focus({ preventScroll: true })
}

/**
 * Menu mobile (DEC-019). O contêiner do dialog envolve o botão abrir/fechar e o painel, então o Tab
 * circula só por elementos internos. Fundo inert, scroll travado, Escape fecha e devolve o foco ao botão.
 */
export function MobileMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pendingHash = useRef<string | null>(null)
  const focusInMenu = useRef(false)
  const pendingDesktopFocus = useRef(false)

  const close = useCallback((restoreFocus: boolean) => {
    setOpen(false)
    if (restoreFocus) buttonRef.current?.focus()
  }, [])

  // Depois de fechar (fundo sem inert, scroll liberado): âncora pendente ou foco no nav desktop.
  useEffect(() => {
    if (open) return
    if (pendingHash.current) {
      goToAnchor(pendingHash.current)
      pendingHash.current = null
    }
    if (pendingDesktopFocus.current) {
      pendingDesktopFocus.current = false
      rootRef.current?.closest('header')?.querySelector<HTMLElement>('nav a[href]')?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const root = rootRef.current
    const header = root?.closest('header') ?? null
    const top = header ? header.getBoundingClientRect().bottom : 0
    panelRef.current?.style.setProperty('--menu-top', `${Math.max(top, 0)}px`)

    const background = backgroundElements(header)
    background.forEach((element) => {
      element.inert = true
    })

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    focusInMenu.current = true

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(true)
        return
      }
      if (event.key !== 'Tab' || !root) return
      const items = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)]
      const index = items.indexOf(document.activeElement as HTMLElement)
      const next = event.shiftKey ? index - 1 : index + 1
      if (index === -1 || next < 0 || next >= items.length) {
        event.preventDefault()
        items[event.shiftKey ? items.length - 1 : 0].focus()
      }
    }
    // Estado de foco guardado por eventos: no breakpoint o CSS oculta o menu antes do resize ser tratado.
    const onFocusIn = () => {
      focusInMenu.current = true
    }
    const onFocusOut = (event: FocusEvent) => {
      if (!root?.contains(event.relatedTarget as Node | null)) focusInMenu.current = false
    }
    const desktop = window.matchMedia(DESKTOP)
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (!event.matches) return
      pendingDesktopFocus.current = focusInMenu.current
      close(false)
    }

    document.addEventListener('keydown', onKeyDown)
    root?.addEventListener('focusin', onFocusIn)
    root?.addEventListener('focusout', onFocusOut)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      background.forEach((element) => {
        element.inert = false
      })
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
      root?.removeEventListener('focusin', onFocusIn)
      root?.removeEventListener('focusout', onFocusOut)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [open, close])

  return (
    <div
      ref={rootRef}
      className={styles.menuRoot}
      role={open ? 'dialog' : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? 'Menu' : undefined}
    >
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
          const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
          if (!link) return
          event.preventDefault()
          pendingHash.current = link.hash
          close(false)
        }}
      >
        {children}
      </div>
    </div>
  )
}
