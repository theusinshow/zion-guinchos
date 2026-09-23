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

## Desenvolvimento

```bash
pnpm install
pnpm dev        # scripts/dev.mjs: remove variáveis de detecção de agente para o Next 16 não reescrever CLAUDE.md/AGENTS.md
pnpm lint && pnpm typecheck && pnpm build
python qa/compare.py            # QA visual por seção contra docs/reference/baseline (dev em :3000)
python qa/capture_reference.py  # regenera as baselines a partir do export v2
```

## Build de publicação

`ZION_RELEASE=1 pnpm build`

O `next.config.ts` executa `scripts/release-check.ts` e interrompe o build listando cada item obrigatório pendente: telefone e WhatsApp em E.164 (`business.phoneE164` / `whatsappE164`), domínio (`NEXT_PUBLIC_SITE_URL`), Política de Privacidade (`business.privacyPolicyUrl`) e foto real do Sobre (`business.aboutImage`). Avisos não bloqueiam: logo/símbolo SVG, OG image 1200×630, IDs de analytics.

Sem `ZION_RELEASE`, builds de desenvolvimento e preview passam normalmente, e o site fica com `noindex` / `Disallow: /` até existir domínio + release.

Variáveis: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP` / `_PHONE` / `_LOCATION` (LOCATION cai para o de WhatsApp se vazio), `ZION_RELEASE` (servidor/build).

Consentimento: default negado (consent mode v2); integrar a futura CMP via `updateConsent()` em `src/lib/analytics.ts`.

Revisões independentes por fase: `docs/reviews/`. Decisões: `docs/DECISIONS.md`.
