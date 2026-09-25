import { FAQList } from './FAQList'
import styles from './FAQ.module.css'

const ITEMS = [
  {
    question: 'Quais veículos podem ser transportados?',
    answer: 'A Zion atende carros, motos, caminhonetes, utilitários e veículos rebaixados.',
  },
  {
    question: 'Posso agendar um transporte?',
    answer: 'Sim. Além de situações emergenciais, também é possível solicitar transporte agendado.',
  },
  {
    question: 'A Zion atende veículos acidentados?',
    answer: 'Sim. A Zion realiza remoção e transporte de veículos sem condições de continuar o trajeto.',
  },
  {
    question: 'Como solicito atendimento?',
    answer: 'Entre em contato pelo WhatsApp ou telefone e informe sua localização, o veículo e a situação.',
  },
]

export function FAQ() {
  return (
    <section data-section="duvidas" id="duvidas" className={styles.section} aria-labelledby="duvidas-title">
      <div className={styles.column} data-reveal>
        <h2 id="duvidas-title" className={styles.title}>
          Dúvidas
          <br />
          <span className={styles.titleLight}>frequentes.</span>
        </h2>
        <FAQList items={ITEMS} />
      </div>
    </section>
  )
}
