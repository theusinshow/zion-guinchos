import { ContactLink } from '@/components/ContactLink/ContactLink'
import styles from './UrgentCTA.module.css'

export function UrgentCTA() {
  return (
    <section data-section="cta-urgencia" className={`surface-dark ${styles.section}`} aria-labelledby="cta-urgencia-title">
      <div className={styles.message}>
        <div className={styles.heading}>
          <span className={styles.dot} aria-hidden="true" />
          <h2 id="cta-urgencia-title" className={styles.title}>
            Está parado agora?
          </h2>
        </div>
        <p className={styles.body}>Envie sua localização pelo WhatsApp e informe o veículo para agilizar o atendimento.</p>
      </div>

      <div className={styles.side}>
        <div className={styles.actions}>
          <ContactLink
            channel="whatsapp"
            message="location"
            event="location_cta_click"
            placement="urgent_cta"
            className={`btn btn-light ${styles.button} ${styles.location}`}
          >
            Enviar minha localização <span className="btn-arrow" aria-hidden="true">→</span>
          </ContactLink>
          <ContactLink channel="phone" placement="urgent_cta" className={`btn btn-outline-light ${styles.button} ${styles.phone}`}>
            Ligar agora
          </ContactLink>
        </div>
        <p className={styles.micro}>Atendimento 24 horas em Palhoça, São José e Florianópolis.</p>
      </div>
    </section>
  )
}
