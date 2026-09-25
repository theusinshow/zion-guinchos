import Image from 'next/image'
import styles from './Services.module.css'

// Ícones: SVG inline do export v2 (viewBox 24, traço 1.8, square/miter).
const ICONS = {
  guincho: (
    <>
      <path d="M14 17V8h4.5l3 4.5V17" />
      <path d="M17.5 8v4.5h4" />
      <path d="M2 13h12" />
      <path d="M2 13v4" />
      <path d="M1.5 21h21" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="17.5" cy="17" r="2" />
      <path d="M4 13l3-6h3" />
    </>
  ),
  carros: (
    <>
      <path d="M3 17v-4l2.5-1L8 8h8l3 4 2 1v4" />
      <path d="M8 12h11" />
      <path d="M12.5 8v4" />
      <path d="M1.5 21h21" />
      <circle cx="7.5" cy="17" r="2" />
      <circle cx="16.5" cy="17" r="2" />
    </>
  ),
  motos: (
    <>
      <circle cx="5.5" cy="17" r="3" />
      <circle cx="18.5" cy="17" r="3" />
      <path d="M5.5 17 9 11.5h5l4.5 5.5" />
      <path d="M14 11.5l2-4.5h2.5" />
      <path d="M9 11.5 8 9.5H5" />
      <path d="M1.5 21h21" />
    </>
  ),
  rebaixados: (
    <>
      <path d="M5 2v4h2.5v2" />
      <path d="M5 17v-3l2.5-1 2-3.5h6.5l2.5 3.5 2.5 1v3" />
      <path d="M9.5 13h10" />
      <path d="M1.5 21h21" />
      <circle cx="8.5" cy="17" r="1.8" />
      <circle cx="16.5" cy="17" r="1.8" />
    </>
  ),
}

const SERVICES = [
  {
    title: 'Guincho 24h',
    text: 'Remoção do veículo parado, a qualquer hora.',
    icon: ICONS.guincho,
  },
  {
    title: 'Carros e utilitários',
    text: 'Automóveis, caminhonetes e utilitários.',
    icon: ICONS.carros,
  },
  {
    title: 'Motos',
    text: 'Transporte de motocicletas, 24 horas.',
    icon: ICONS.motos,
  },
  {
    title: 'Veículos rebaixados e acidentados',
    text: 'Rebaixados ou sem condições de seguir viagem.',
    icon: ICONS.rebaixados,
  },
]

const ALSO = ['Pane mecânica e elétrica', 'Auxílio de bateria', 'Transporte agendado', 'Transporte entre cidades']

export function Services() {
  return (
    <section data-section="servicos" id="servicos" className={styles.services} aria-labelledby="servicos-title">
      <div className={styles.top}>
        <div className={styles.intro} data-reveal>
          <h2 id="servicos-title" className={styles.title}>
            O que a Zion
            <br />
            <span className={styles.titleLight}>atende.</span>
          </h2>
          <p className={styles.lead}>
            Da emergência ao transporte agendado.
          </p>
          {/* DEC-037: ilustram os serviços 02 e 03. Placeholders de IA (ASSETS.md): decorativos, alt vazio (DEC-020). */}
          <div className={styles.photos}>
            <div className={styles.photo}>
              <Image
                src="/images/generated/zion-truck-with-car.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 260px, 50vw"
                className={`${styles.photoImage} ${styles.photoCar}`}
              />
            </div>
            <div className={styles.photo}>
              <Image
                src="/images/generated/zion-truck-with-motorcycle.webp"
                alt=""
                fill
                sizes="(min-width: 1280px) 260px, 50vw"
                className={`${styles.photoImage} ${styles.photoMoto}`}
              />
            </div>
          </div>
        </div>

        <ol className={styles.list} data-reveal>
          {SERVICES.map((service, index) => (
            <li key={service.title} className={styles.item}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className={styles.copy}>
                <h3 className={styles.itemTitle}>{service.title}</h3>
                <p className={styles.itemText}>{service.text}</p>
              </div>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="square"
                strokeLinejoin="miter"
                aria-hidden="true"
              >
                {service.icon}
              </svg>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.also} data-reveal>
        <h3 className={styles.alsoLabel}>TAMBÉM ATENDEMOS</h3>
        <ul className={styles.alsoList}>
          {ALSO.map((item) => (
            <li key={item} className={styles.alsoItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
