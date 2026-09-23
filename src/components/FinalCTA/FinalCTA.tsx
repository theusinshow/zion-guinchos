import { ContactLink } from '@/components/ContactLink/ContactLink'
import styles from './FinalCTA.module.css'

export function FinalCTA() {
  return (
    <section data-section="cta-final" className={`surface-dark ${styles.section}`} aria-labelledby="cta-final-title">
      {/* Símbolo do leão gigante, invertido e a 6,5% de opacidade (export v2). Decorativo.
          <img> nativo lazy com WebP leve (16 KB): o next/image o apontava como LCP quando a página
          era rolada por script, e a qualidade é irrelevante nessa opacidade. */}
      <div className={styles.lion} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/zion-lion.webp" alt="" width={1080} height={1350} loading="lazy" decoding="async" />
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            ATENDIMENTO 24H
          </p>
          <p className={styles.base}>BASE · PALHOÇA / SC</p>
        </div>

        <h2 id="cta-final-title" className={styles.title}>
          Precisa de <br className={styles.mobileBreak} />
          guincho?
          <br />
          <span className={styles.titleLight}>
            Fale direto <br className={styles.mobileBreak} />
            com a Zion.
          </span>
        </h2>

        <div className={styles.details}>
          <p className={styles.body}>
            Atendimento em Palhoça, São José e Florianópolis, além de transportes para outras cidades sob consulta.
          </p>
          <p className={`${styles.micro} ${styles.microDesktop}`}>
            Envie sua localização e informe qual veículo precisa de atendimento.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <ContactLink channel="whatsapp" placement="final" className={`${styles.action} ${styles.whatsapp}`}>
          Chamar no WhatsApp <span className={styles.arrow} aria-hidden="true">→</span>
        </ContactLink>
        <ContactLink channel="phone" placement="final" className={`${styles.action} ${styles.phone}`}>
          Ligar agora <span className={styles.arrow} aria-hidden="true">↗</span>
        </ContactLink>
      </div>

      <p className={`${styles.micro} ${styles.microMobile}`}>
        Envie sua localização e informe qual veículo precisa de atendimento.
      </p>
    </section>
  )
}
