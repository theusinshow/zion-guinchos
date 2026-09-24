import Image from 'next/image'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow/Arrow'
import { ContactLink } from '@/components/ContactLink/ContactLink'
import { business } from '@/config/business'
import { HeaderScroll } from './HeaderScroll'
import { MobileMenu } from './MobileMenu'
import styles from './Header.module.css'

export const NAV_LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#area-de-atendimento', label: 'Área de atendimento' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const

export function Header() {
  return (
    <header className={styles.header} data-site-header>
      <div className={styles.brand} data-menu-background>
        <Link href="/" className={styles.logo}>
          {/* TODO(asset): trocar pelo SVG do logo quando existir (OPEN-ITEMS P1). */}
          <Image src="/brand/zion-logo.png" alt="Zion Guincho" width={640} height={420} sizes="104px" />
        </Link>
      </div>

      <nav className={styles.nav} aria-label="Principal">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={`nav-link ${styles.navLink}`}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className={styles.cta}>
        {/* DEC-038: no desktop o tel: nem sempre funciona; o número à vista permite discar do celular. */}
        {business.phoneDisplay && (
          <ContactLink channel="phone" placement="header" className={styles.ctaPhone}>
            {business.phoneDisplay}
          </ContactLink>
        )}
        <ContactLink channel="whatsapp" placement="header" className={`btn btn-primary ${styles.ctaButton}`}>
          Chamar no WhatsApp <span className="btn-arrow" aria-hidden="true"><Arrow /></span>
        </ContactLink>
      </div>

      <div className={styles.call} data-menu-background>
        <ContactLink channel="phone" placement="header" className={styles.callLink}>
          Ligar
        </ContactLink>
      </div>

      <MobileMenu>
        <nav aria-label="Principal">
          <ul className={styles.menuList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.menuLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.menuActions}>
          <ContactLink channel="whatsapp" placement="menu" className={`btn btn-primary ${styles.menuButton}`}>
            Chamar no WhatsApp <span className="btn-arrow" aria-hidden="true"><Arrow /></span>
          </ContactLink>
          <ContactLink channel="phone" placement="menu" className={`btn btn-outline ${styles.menuButton} ${styles.menuButtonOutline}`}>
            Ligar agora
          </ContactLink>
        </div>
      </MobileMenu>
      <HeaderScroll />
    </header>
  )
}
