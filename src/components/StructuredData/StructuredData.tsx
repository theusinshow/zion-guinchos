import { business } from '@/config/business'
import { siteUrl } from '@/config/site'
import { getPhoneE164 } from '@/lib/contact'

/**
 * JSON-LD AutomotiveBusiness somente com dados confirmados (SEO-ANALYTICS.md §5).
 * Proibido: rating, review, geo, priceRange, image, rua/CEP. Telefone e url só quando existirem.
 */
export function StructuredData() {
  const telephone = getPhoneE164()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutomotiveBusiness',
    name: business.name,
    description: 'Guincho e auto socorro 24h em Palhoça, São José e Florianópolis.',
    areaServed: business.serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.baseCity,
      addressRegion: business.state,
      addressCountry: 'BR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    ...(siteUrl ? { url: `${siteUrl}/` } : {}),
    ...(telephone ? { telephone } : {}),
  }

  return (
    <script
      type="application/ld+json"
      // JSON gerado no servidor a partir da config; "<" escapado para não fechar a tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
