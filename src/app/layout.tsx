import type { Metadata } from 'next'
import { Archivo, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@/components/Analytics/Analytics'
import { Tracker } from '@/components/Analytics/Tracker'
import { StructuredData } from '@/components/StructuredData/StructuredData'
import { indexable, siteUrl } from '@/config/site'
import './globals.css'

// Pesos medidos no export v2: Barlow 400/600/700/800, Archivo 400/600, Plex Mono 400.
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-archivo',
  display: 'swap',
  // Sem preload: não compõe o LCP (foto da Hero); libera banda para a imagem. Fallback métrico evita CLS.
  preload: false,
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: false,
})

const title = 'Zion Guincho 24h | Palhoça, São José e Florianópolis'
const description =
  'Guincho e auto socorro 24h em Palhoça, São José e Florianópolis para carros, motos e utilitários. Fale com a Zion por WhatsApp ou ligação.'

// Ícones: src/app/icon.png e apple-icon.png, recortes do símbolo fornecido (uploads/1.jpg) sobre off-white.
// TODO(P1): trocar pelo SVG oficial do símbolo quando existir.
// canonical/og:url só com NEXT_PUBLIC_SITE_URL; og:image só quando existir asset aprovado (OPEN-ITEMS P1).
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: '/' } } : {}),
  title,
  description,
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title,
    description,
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Zion Guincho',
    ...(siteUrl ? { url: '/' } : {}),
  },
  twitter: {
    card: 'summary',
    title,
    description,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${barlowCondensed.variable} ${archivo.variable} ${ibmPlexMono.variable}`}>
      <body>
        {children}
        <StructuredData />
        <Tracker />
        <Analytics />
      </body>
    </html>
  )
}
