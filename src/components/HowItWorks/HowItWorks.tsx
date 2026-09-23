import { ContactLink } from '@/components/ContactLink/ContactLink'
import styles from './HowItWorks.module.css'

const STEPS = [
  { title: 'Chame a Zion', text: 'Entre em contato pelo WhatsApp ou telefone.' },
  { title: 'Envie sua localização', text: 'Informe onde você está e qual veículo precisa de atendimento.' },
  { title: 'Receba o atendimento', text: 'Com as informações necessárias, a Zion inicia o atendimento.' },
]

export function HowItWorks() {
  return (
    <section data-section="como-funciona" id="como-funciona" className={styles.section} aria-labelledby="como-funciona-title">
      <h2 id="como-funciona-title" className={styles.title}>
        Pedir um guincho <br className={styles.mobileBreak} />
        <span className={styles.titleLight}>pode ser simples.</span>
      </h2>

      <div className={styles.flow}>
        {/* Trajeto desktop: SVG do export v2 (1312×88). No mobile, o trajeto 28×420 do export é
            desenhado por etapa (marcador + linha que acompanha a altura + diagonal), para crescer com o texto. */}
        <svg className={styles.pathDesktop} viewBox="0 0 1312 88" aria-hidden="true">
          <polyline points="7,64 300,64 340,24 600,24 640,64 897,64 1312,64" fill="none" stroke="currentColor" strokeWidth="2" />
          <rect x="0" y="57" width="14" height="14" className={styles.markerFirst} />
          <rect x="445.3" y="17" width="14" height="14" fill="currentColor" />
          <rect x="890.7" y="57" width="14" height="14" fill="currentColor" />
          <polyline points="1300,56 1312,64 1300,72" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        <ol className={styles.steps}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.track} aria-hidden="true">
                <span className={styles.marker} />
                <span className={styles.line} />
                {index < STEPS.length - 1 && (
                  <svg className={styles.turn} viewBox="0 0 28 20">
                    <polyline points={index % 2 === 0 ? '7,0 21,20' : '21,0 7,20'} />
                  </svg>
                )}
              </span>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.actions}>
        <ContactLink channel="whatsapp" placement="como_funciona" className={`btn btn-primary ${styles.button}`}>
          Chamar no WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
        </ContactLink>
        <ContactLink channel="phone" placement="como_funciona" className={`btn btn-outline ${styles.button} ${styles.phone}`}>
          Ligar agora
        </ContactLink>
      </div>
    </section>
  )
}
