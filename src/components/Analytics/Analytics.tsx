import Script from 'next/script'
import { ADS_ID, GA_ID, analyticsEnabled } from '@/lib/analytics'

/**
 * Bootstrap do gtag somente com NEXT_PUBLIC_GA_ID ou NEXT_PUBLIC_GOOGLE_ADS_ID.
 * Consent mode v2 com tudo negado por padrão (estratégia de consentimento pendente — OPEN-ITEMS P2);
 * atualização pelo ponto único `updateConsent()` em src/lib/analytics.ts.
 */
export function Analytics() {
  if (!analyticsEnabled) return null
  const loaderId = GA_ID || ADS_ID
  const configs = [GA_ID, ADS_ID]
    .filter(Boolean)
    .map((id) => `gtag('config', ${JSON.stringify(id)});`)
    .join('\n')

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
${configs}`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(loaderId)}`} strategy="afterInteractive" />
    </>
  )
}
