import { ContactLink } from '@/components/ContactLink/ContactLink'
import { desktopShapes, miniDesktopShapes, miniMobileShapes, mobileShapes, type MapShape, type MiniShape } from './mapData'
import styles from './ServiceArea.module.css'

// DEC-018: rótulos SOMENTE das 3 cidades confirmadas. Vizinhos ficam como geometria cinza sem nome.
const MAP_LABEL = 'Mapa da Grande Florianópolis com Palhoça, São José e Florianópolis em destaque'

function Shapes({ shapes }: { shapes: MapShape[] }) {
  return shapes.map((shape) => (
    <path key={shape.d.slice(0, 24)} d={shape.d} className={shape.kind === 'main' ? styles.main : styles.neighbor} />
  ))
}

const MINI_CLASS: Record<MiniShape['kind'], string> = {
  state: styles.miniState,
  region: styles.miniRegion,
  main: styles.miniMain,
}

function MiniMap({ shapes, className, viewBox, frame }: { shapes: MiniShape[]; className: string; viewBox: string; frame: React.SVGProps<SVGRectElement> }) {
  return (
    <svg className={className} viewBox={viewBox} aria-hidden="true">
      {shapes.map((shape) => (
        <path key={shape.d.slice(0, 24)} d={shape.d} className={MINI_CLASS[shape.kind]} />
      ))}
      <rect {...frame} className={styles.frame} />
    </svg>
  )
}

export function ServiceArea() {
  return (
    <section data-section="area-de-atendimento" id="area-de-atendimento" className={styles.section} aria-labelledby="area-title">
      {/* DOM na ordem de leitura/visual do mobile; o desktop posiciona os blocos por grid (sem `order`). */}
      <h2 id="area-title" className={styles.title} data-reveal>
        Atendimento na
        <br />
        <span className={styles.titleLight}>
          Grande
          <br />
          Florianópolis.
        </span>
      </h2>
      <p className={styles.lead} data-reveal>
        A Zion atende principalmente Palhoça, São José e Florianópolis, além de realizar transportes para outras cidades sob
        consulta.
      </p>
      <svg data-reveal className={styles.mapDesktop} viewBox="0 0 760 740" role="img" aria-label={MAP_LABEL}>
        <Shapes shapes={desktopShapes} />
        <line x1="529.2" y1="291.7" x2="572" y2="291.7" className={styles.guide} />
        <text x="577" y="301.9" className={styles.cityLabel} fontSize="30">
          FLORIANÓPOLIS
        </text>
        <line x1="351.2" y1="282.9" x2="321.2" y2="282.9" className={styles.guideLight} />
        <line x1="343.2" y1="282.9" x2="321.2" y2="282.9" className={styles.guide} />
        <text x="316.2" y="293.1" textAnchor="end" className={styles.cityLabel} fontSize="30">
          SÃO JOSÉ
        </text>
        <line x1="367.7" y1="414.9" x2="337.7" y2="414.9" className={styles.guideLight} />
        <line x1="359.7" y1="414.9" x2="337.7" y2="414.9" className={styles.guide} />
        <text x="332.7" y="425.1" textAnchor="end" className={styles.cityLabel} fontSize="30">
          PALHOÇA
        </text>
        <rect x="215.9" y="409.9" width="10" height="10" className={styles.base} />
      </svg>
      <svg data-reveal className={styles.mapMobile} viewBox="0 0 350 360" role="img" aria-label={MAP_LABEL}>
        <Shapes shapes={mobileShapes} />
        <line x1="220.3" y1="135.7" x2="244" y2="135.7" className={styles.guide} />
        <text x="249" y="140.8" className={styles.cityLabel} fontSize="15">
          FLORIANÓPOLIS
        </text>
        <line x1="149.4" y1="140.2" x2="132.9" y2="140.2" className={styles.guideLight} />
        <line x1="141.4" y1="140.2" x2="132.9" y2="140.2" className={styles.guide} />
        <text x="127.9" y="145.3" textAnchor="end" className={styles.cityLabel} fontSize="15">
          SÃO JOSÉ
        </text>
        <line x1="155.5" y1="198.7" x2="139" y2="198.7" className={styles.guideLight} />
        <line x1="147.5" y1="198.7" x2="139" y2="198.7" className={styles.guide} />
        <text x="134" y="203.8" textAnchor="end" className={styles.cityLabel} fontSize="15">
          PALHOÇA
        </text>
        <rect x="67.6" y="193.7" width="10" height="10" className={styles.base} />
      </svg>
      <ul className={styles.legend} data-reveal>
        <li>
          <span className={`${styles.swatch} ${styles.swatchMain}`} aria-hidden="true" />
          ATENDIMENTO PRINCIPAL
        </li>
        <li className={styles.legendBase}>
          <span className={`${styles.swatch} ${styles.swatchBase}`} aria-hidden="true" />
          BASE · PALHOÇA
        </li>
        <li>
          <span className={`${styles.swatch} ${styles.swatchConsult}`} aria-hidden="true" />
          SOB CONSULTA
        </li>
      </ul>
      <div className={styles.mini} data-reveal>
        <MiniMap
          shapes={miniDesktopShapes}
          className={styles.miniDesktop}
          viewBox="0 0 300 200"
          frame={{ x: 232.6, y: 75.3, width: 56.7, height: 54.9 }}
        />
        <MiniMap
          shapes={miniMobileShapes}
          className={styles.miniMobile}
          viewBox="0 0 130 88"
          frame={{ x: 95.4, y: 31, width: 28.9, height: 28.1 }}
        />
        <p className={styles.miniLabel}>
          SANTA CATARINA<span className={styles.miniSep}> · </span>
          <br className={styles.miniBreak} />
          GRANDE FLORIANÓPOLIS
        </p>
      </div>
      <div className={styles.other} data-reveal>
        <h3 className={styles.otherTitle}>Outras cidades</h3>
        <p className={styles.otherText}>
          Transportes e atendimentos para outros destinos também podem ser consultados diretamente com a Zion.
        </p>
        <div>
          <ContactLink channel="whatsapp" placement="area" className={`btn btn-primary ${styles.button}`}>
            Consultar atendimento <span className="btn-arrow" aria-hidden="true">→</span>
          </ContactLink>
        </div>
      </div>
    </section>
  )
}
