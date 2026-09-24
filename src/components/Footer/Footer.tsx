import Image from 'next/image'
import { Arrow } from '@/components/Arrow/Arrow'
import { ContactLink } from '@/components/ContactLink/ContactLink'
import { business } from '@/config/business'
import { showPendingPlaceholders } from '@/lib/contact'
import styles from './Footer.module.css'

const NAV = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#area-de-atendimento', label: 'Área de atendimento' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#duvidas', label: 'Dúvidas' },
]

const REGION = ['PALHOÇA / SC', 'SÃO JOSÉ / SC', 'FLORIANÓPOLIS / SC']

/** Número confirmado; placeholder só fora de produção; em produção, nada. */
function displayOrPlaceholder(value: string | null, placeholder: string): string | null {
  if (value) return value
  return showPendingPlaceholders ? placeholder : null
}

export function Footer() {
  const whatsappNumber = displayOrPlaceholder(business.whatsappDisplay, '[NÚMERO A INSERIR]')
  const phoneNumber = displayOrPlaceholder(business.phoneDisplay, '[NÚMERO A INSERIR]')
  // TODO(P1): CNPJ só após confirmação de publicação.
  const cnpj = displayOrPlaceholder(business.cnpj, '[A INSERIR]')

  return (
    <footer data-section="footer" className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.brand}>
          <Image src="/brand/zion-logo.png" alt="Zion Guincho" width={640} height={420} sizes="104px" className={styles.logo} />
          <p className={styles.description}>Guincho e auto socorro 24h. Base em Palhoça/SC.</p>
        </div>

        <div className={styles.quickActions}>
          <ContactLink channel="whatsapp" placement="footer" className={`btn btn-primary ${styles.quickButton}`}>
            WhatsApp <span className="btn-arrow" aria-hidden="true"><Arrow /></span>
          </ContactLink>
          <ContactLink channel="phone" placement="footer" className={`btn btn-outline ${styles.quickButton}`}>
            Ligar
          </ContactLink>
        </div>

        <div className={styles.columns}>
          <nav className={styles.nav} aria-labelledby="footer-nav-label">
            <p id="footer-nav-label" className={styles.label}>
              NAVEGAÇÃO
            </p>
            <ul>
              {NAV.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`nav-link ${styles.navLink}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <p className={styles.label}>CONTATO</p>
            <div className={styles.contactList}>
              <ContactLink channel="whatsapp" placement="footer" className={styles.contactLink}>
                <span className={styles.contactName}>
                  WhatsApp <span className={styles.contactArrow} aria-hidden="true"><Arrow /></span>
                </span>
                {whatsappNumber && <span className={styles.contactNumber}>{whatsappNumber}</span>}
              </ContactLink>
              <ContactLink channel="phone" placement="footer" className={styles.contactLink}>
                <span className={styles.contactName}>Telefone</span>
                {phoneNumber && <span className={styles.contactNumber}>{phoneNumber}</span>}
              </ContactLink>
            </div>
          </div>

          <div className={styles.side}>
            <div className={styles.region}>
              <p className={styles.label}>REGIÃO</p>
              <ul>
                {REGION.map((city) => (
                  <li key={city} className={styles.regionItem}>
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.legal}>
              <p className={styles.label}>LEGAL</p>
              {business.privacyPolicyUrl ? (
                <a className={styles.privacy} href={business.privacyPolicyUrl}>
                  Política de Privacidade
                </a>
              ) : (
                // TODO(P1): política ainda não publicada — padrão pendente (DEC-024), sem href; bloqueia release.
                <a className={styles.privacy} role="link" aria-disabled="true" data-pending="privacy">
                  Política de Privacidade
                  <span className="visually-hidden"> (página pendente)</span>
                </a>
              )}
              {cnpj && <p className={styles.cnpj}>CNPJ {cnpj}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© ZION GUINCHO</span>
        <span>
          SITE POR <span className={styles.credit}>CODED BY M</span>
        </span>
      </div>
    </footer>
  )
}
