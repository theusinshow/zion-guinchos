import type { Metadata } from 'next'
import { Archivo, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google'
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
  variable: '--font-archivo',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

const title = 'Zion Guincho 24h | Palhoça, São José e Florianópolis'
const description =
  'Guincho e auto socorro 24h em Palhoça, São José e Florianópolis para carros, motos e utilitários. Fale com a Zion por WhatsApp ou ligação.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: 'pt_BR',
    type: 'website',
    siteName: 'Zion Guincho',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${barlowCondensed.variable} ${archivo.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
