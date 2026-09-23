import Image from 'next/image'
import { business } from '@/config/business'
import styles from './About.module.css'

const FACTS = [
  { label: 'BASE', value: 'Palhoça / SC' },
  { label: 'ATENDIMENTO', value: '24 horas · todos os dias' },
  { label: 'COBERTURA PRINCIPAL', value: 'Palhoça · São José · Florianópolis' },
]

export function About() {
  return (
    <section data-section="sobre" id="sobre" className={styles.section} aria-labelledby="sobre-title">
      {/* TODO(P1): foto real (proprietário + caminhão) — ponto único em business.aboutImage (DEC-021).
          Enquanto null, bloco neutro sólido na proporção do slot do export. */}
      <div className={styles.visual}>
        {business.aboutImage && <Image src={business.aboutImage} alt="" fill sizes="100vw" className={styles.image} />}
      </div>

      <div className={styles.content}>
        <div className={styles.heading} data-reveal>
          <h2 id="sobre-title" className={styles.title}>
            Atendimento direto.
            <br />
            <span className={styles.titleLight}>
              Do primeiro contato
              <br />
              ao transporte.
            </span>
          </h2>
        </div>

        <div className={styles.text} data-reveal>
          <p className={styles.lead}>
            A Zion é uma nova operação de guincho e auto socorro em Palhoça, conduzida por um profissional com experiência no
            segmento.
          </p>
          <p className={styles.paragraph}>
            Do contato inicial ao atendimento, você fala diretamente com quem realizará o serviço.
          </p>
        </div>

        <dl className={styles.facts} data-reveal>
          {FACTS.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.note}>Também realiza transportes para outras cidades sob consulta.</p>
      </div>
    </section>
  )
}
