import Image from 'next/image'
import { ContactLink } from '@/components/ContactLink/ContactLink'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section data-section="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.stage}>
        <div className={styles.media}>
          {/* Placeholder gerado por IA (ASSETS.md) — alt vazio por DEC-020. TODO(asset): foto real. */}
          <Image
            src="/images/hero-truck.jpg"
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) calc(100vw - max(560px, 38.889vw)), 100vw"
            className={styles.image}
          />
          <span className={styles.base}>BASE · PALHOÇA / SC</span>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true" />
            GUINCHO E AUTO SOCORRO 24H
          </p>
          <h1 id="hero-title" className={styles.title}>
            Precisou de
            <br />
            guincho?
            <br />
            <span className={styles.titleLight}>
              A Zion vai
              <br />
              até você<span className={styles.period}>.</span>
            </span>
          </h1>
          <p className={styles.body}>
            Atendimento 24 horas em Palhoça, São José e Florianópolis para carros, motos e utilitários.
          </p>
          <div className={styles.actions}>
            <ContactLink channel="whatsapp" placement="hero" className={`btn btn-primary ${styles.button}`}>
              Chamar no WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
            </ContactLink>
            <ContactLink channel="phone" placement="hero" className={`btn btn-outline ${styles.button} ${styles.buttonOutline}`}>
              Ligar agora
            </ContactLink>
          </div>
          <p className={styles.micro}>
            <strong>Está parado agora?</strong> Envie sua localização pelo WhatsApp para agilizar o atendimento.
          </p>
        </div>
      </div>

      <ul className={styles.rail}>
        <li className={styles.railPrimary}>24 horas · todos os dias</li>
        <li className={styles.railCities}>Palhoça — São José — Florianópolis</li>
        <li className={styles.railServices}>GUINCHO / TRANSPORTE / ASSISTÊNCIA</li>
      </ul>
    </section>
  )
}
