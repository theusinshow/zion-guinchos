import { Arrow } from '@/components/Arrow/Arrow'
import { ContactLink } from '@/components/ContactLink/ContactLink'
import { ActionBarVisibility } from './ActionBarVisibility'
import styles from './MobileActionBar.module.css'

/**
 * Barra de contato do mobile (DEC-030, substitui DEC-023). Só < 1280px. Aparece quando os CTAs da Hero
 * estão fora da tela (acima ou abaixo da dobra) e some nos blocos que já oferecem WhatsApp + Ligar (CTA urgência, CTA final, footer).
 */
export function MobileActionBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Contato rápido" data-action-bar data-visible="false">
      <ContactLink channel="whatsapp" placement="action_bar" className={`btn btn-primary ${styles.whatsapp}`}>
        Chamar no WhatsApp <span className="btn-arrow" aria-hidden="true"><Arrow /></span>
      </ContactLink>
      <ContactLink channel="phone" placement="action_bar" className={styles.phone}>
        Ligar
      </ContactLink>
      <ActionBarVisibility />
    </div>
  )
}
