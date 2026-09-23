import { Header } from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import { HowItWorks } from '@/components/HowItWorks/HowItWorks'
import { Services } from '@/components/Services/Services'

// Seções ainda vazias mantêm o contrato de QA (data-section + âncoras) até suas fases.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <section data-section="cta-urgencia" aria-label="Está parado agora?" />
        <section data-section="area-de-atendimento" id="area-de-atendimento" aria-label="Área de atendimento" />
        <section data-section="sobre" id="sobre" aria-label="Sobre" />
        <section data-section="duvidas" id="duvidas" aria-label="Dúvidas" />
        <section data-section="cta-final" aria-label="Fale direto com a Zion" />
      </main>
      <footer data-section="footer" />
    </>
  )
}
