import { Arrow } from '@/components/Arrow/Arrow'
import { ContactLink } from '@/components/ContactLink/ContactLink'
import styles from './UrgentCTA.module.css'

export function UrgentCTA() {
  return (
    <section data-section="cta-urgencia" className={`surface-dark ${styles.section}`} aria-labelledby="cta-urgencia-title">
      <div className={styles.message} data-reveal>
        <div className={styles.heading}>
          <span className={styles.dot} aria-hidden="true" />
          <h2 id="cta-urgencia-title" className={styles.title}>
            Está parado agora?
          </h2>
        </div>
        <p className={styles.body}>Envie sua localização pelo WhatsApp e informe o veículo para agilizar o atendimento.</p>
      </div>

      <div className={styles.side} data-reveal>
        <div className={styles.actions}>
          <ContactLink
            channel="whatsapp"
            message="location"
            event="location_cta_click"
            placement="urgent_cta"
            className={`btn btn-light ${styles.button} ${styles.location}`}
          >
            Enviar localização no WhatsApp <span className="btn-arrow" aria-hidden="true"><Arrow /></span>
          </ContactLink>
          <ContactLink channel="phone" placement="urgent_cta" className={`btn btn-outline-light ${styles.button} ${styles.phone}`}>
            Ligar agora
          </ContactLink>
        </div>
        <p className={styles.micro}>No WhatsApp: clipe ou + › Localização › enviar a localização atual.</p>
      </div>
    </section>
  )
}
