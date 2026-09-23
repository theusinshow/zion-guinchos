# Zion Guincho — Landing Page

Landing page de captação para a **Zion Guincho**, operação de guincho e auto socorro com base em Palhoça/SC.

O projeto foi planejado para receber tráfego pago, principalmente Google Ads, e converter usuários em dois canais principais:

1. WhatsApp
2. Ligação telefônica

## Estado do projeto

- Arquitetura de conteúdo: aprovada.
- Copy: aprovada com pendências comerciais explicitamente marcadas.
- Design system: aprovado.
- Design desktop e mobile: aprovado.
- Implementação: próxima etapa.

## Fonte de verdade

Leia nesta ordem antes de implementar:

1. `CLAUDE.md`
2. `docs/SOURCE-OF-TRUTH.md`
3. `docs/PRODUCT.md`
4. `docs/CONTENT.md`
5. `docs/DESIGN.md`
6. `docs/ARCHITECTURE.md`
7. `docs/IMPLEMENTATION.md`
8. `docs/ASSETS.md`
9. `docs/SEO-ANALYTICS.md`
10. `docs/ACCESSIBILITY.md`
11. `docs/PERFORMANCE.md`
12. `docs/QA.md`
13. `docs/DECISIONS.md`
14. `docs/OPEN-ITEMS.md`

A referência visual final deve ser colocada em `docs/reference/`. O arquivo de referência atualmente usado no handoff é `Zion Landing Page v2.dc.html`, acompanhado pelos assets exportados do Claude Design.

## Stack

Se o repositório estiver vazio, a implementação recomendada é:

- Next.js com App Router
- TypeScript strict
- React
- CSS estruturado ou Tailwind CSS, escolhendo o caminho que preserve melhor a fidelidade visual
- mínimo JavaScript no cliente

Não instalar bibliotecas apenas por conveniência. O projeto é uma landing page estática, leve e orientada a conversão.

## Dados ainda pendentes

Telefone, WhatsApp, CNPJ, formas de pagamento definitivas e fotografia real do caminhão/proprietário ainda precisam ser confirmados. Esses dados nunca devem ser inventados.

Consulte `docs/OPEN-ITEMS.md`.
