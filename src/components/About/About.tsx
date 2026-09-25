import Image from 'next/image'
import { business } from '@/config/business'
import styles from './About.module.css'

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
          {/* DEC-038: só aparece com frase confirmada pelo cliente; atribuição só com nome confirmado. */}
          {business.ownerQuote && (
            <figure className={styles.quote}>
              <blockquote className={styles.quoteText}>
                <p>{business.ownerQuote}</p>
              </blockquote>
              {business.ownerName && <figcaption className={styles.quoteBy}>{business.ownerName} · Zion Guincho</figcaption>}
            </figure>
          )}
        </div>
      </div>
    </section>
  )
}
