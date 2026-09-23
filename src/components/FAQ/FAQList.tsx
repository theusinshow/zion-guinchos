'use client'

import { useEffect, useId, useRef, useState } from 'react'
import styles from './FAQ.module.css'

type Item = { question: string; answer: string }

/**
 * Accordion do FAQ: h3 > button com aria-expanded/aria-controls; uma resposta aberta por vez,
 * a 01 aberta por padrão (estado inicial do export). Respostas fechadas usam hidden="until-found":
 * continuam no HTML (indexáveis) e abrem sozinhas pela busca do navegador.
 */
export function FAQList({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState(0)
  const baseId = useId()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const onBeforeMatch = (event: Event) => {
      const index = Number((event.target as HTMLElement).dataset.index)
      if (!Number.isNaN(index)) setOpenIndex(index)
    }
    list.addEventListener('beforematch', onBeforeMatch)
    return () => list.removeEventListener('beforematch', onBeforeMatch)
  }, [])

  // React trata `hidden` como booleano; promove as respostas fechadas para hidden="until-found".
  useEffect(() => {
    listRef.current?.querySelectorAll<HTMLElement>('[data-index][hidden]').forEach((panel) => {
      panel.setAttribute('hidden', 'until-found')
    })
  }, [openIndex])

  return (
    <div ref={listRef} className={styles.list}>
      {items.map((item, index) => {
        const open = index === openIndex
        const buttonId = `${baseId}-q${index}`
        const panelId = `${baseId}-a${index}`
        return (
          <div key={item.question} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                id={buttonId}
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.question}>{item.question}</span>
                <span className={styles.indicator} aria-hidden="true">
                  {open ? '–' : '+'}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
              data-index={index}
              hidden={!open}
            >
              <p className={styles.answer}>{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
