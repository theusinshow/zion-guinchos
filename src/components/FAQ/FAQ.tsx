import { FAQList } from './FAQList'
import styles from './FAQ.module.css'

const ITEMS = [
  {
    question: 'A Zion atende 24 horas?',
    answer: 'Sim. O atendimento funciona 24 horas, todos os dias, incluindo finais de semana e feriados.',
  },
  {
    question: 'Quais regiões a Zion atende?',
    answer:
      'O atendimento principal acontece em Palhoça, São José e Florianópolis. Outros destinos também podem ser consultados.',
  },
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
      <div className={styles.column}>
        <h2 id="duvidas-title" className={styles.title}>
          Antes de chamar,
          <br />
          <span className={styles.titleLight}>
            talvez sua dúvida <br className={styles.mobileBreak} />
            esteja aqui.
          </span>
        </h2>
        <FAQList items={ITEMS} />
      </div>
    </section>
  )
}
