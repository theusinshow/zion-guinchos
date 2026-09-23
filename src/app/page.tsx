import { About } from '@/components/About/About'
import { Header } from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import { HowItWorks } from '@/components/HowItWorks/HowItWorks'
import { ServiceArea } from '@/components/ServiceArea/ServiceArea'
import { Services } from '@/components/Services/Services'
import { UrgentCTA } from '@/components/UrgentCTA/UrgentCTA'

// Seções ainda vazias mantêm o contrato de QA (data-section + âncoras) até suas fases.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <UrgentCTA />
        <ServiceArea />
        <About />
        <section data-section="duvidas" id="duvidas" aria-label="Dúvidas" />
        <section data-section="cta-final" aria-label="Fale direto com a Zion" />
      </main>
      <footer data-section="footer" />
    </>
  )
}
