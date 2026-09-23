// Fase 1: esqueleto das seções com o contrato de QA (data-section + âncoras).
// Header e cada seção viram componentes próprios nas fases seguintes.
export default function Home() {
  return (
    <>
      <main>
        <section data-section="hero" aria-label="Início" />
        <section data-section="servicos" id="servicos" aria-label="Serviços" />
        <section data-section="como-funciona" id="como-funciona" aria-label="Como funciona" />
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
