import { About } from '@/components/About/About'
import { FAQ } from '@/components/FAQ/FAQ'
import { FinalCTA } from '@/components/FinalCTA/FinalCTA'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Hero } from '@/components/Hero/Hero'
import { HowItWorks } from '@/components/HowItWorks/HowItWorks'
import { Reveal } from '@/components/Reveal/Reveal'
import { ServiceArea } from '@/components/ServiceArea/ServiceArea'
import { Services } from '@/components/Services/Services'
import { UrgentCTA } from '@/components/UrgentCTA/UrgentCTA'

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
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <Reveal />
    </>
  )
}
