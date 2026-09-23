# Zion Guincho — Landing Page

Landing page de captação da **Zion Guincho**, guincho e auto socorro 24h com base em Palhoça/SC, atendendo Palhoça, São José e Florianópolis.

Feita para tráfego pago (Google Ads) e para converter em dois canais: **WhatsApp** e **ligação**.

## Estado

| Etapa | Situação |
|---|---|
| Conteúdo, copy, design system, design desktop/mobile | Aprovados |
| Implementação (fases 0–8) | **Concluída**; fiel à referência em 1440 e 390px |
| QA visual e técnico | Concluído; ver [`docs/QA-REPORT.md`](docs/QA-REPORT.md) |
| Revisão independente | Concluída por fase; ver [`docs/reviews/`](docs/reviews) |
| Publicação em produção | **Bloqueada por dados comerciais**; ver [Pendências](#pendências-para-publicar) |

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict
- CSS Modules + tokens em CSS custom properties (sem Tailwind; DEC-022)
- `next/font` (Barlow Condensed, Archivo, IBM Plex Mono) · `next/image` (AVIF/WebP)
- Página estática (`○ /`), JavaScript no cliente só para menu mobile, FAQ, reveal e tracking
- pnpm 11 · Node ≥ 20.9

## Rodando localmente

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

`pnpm dev` roda `scripts/dev.mjs`, que remove variáveis de detecção de agente de IA antes de iniciar o `next dev`. Sem isso, o Next 16 reescreve `CLAUDE.md`/`AGENTS.md` quando é iniciado por um agente.

```bash
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm build        # build de produção (preview)
pnpm start        # serve o build
```

## Estrutura

```text
src/
├─ app/                 layout, página, robots, sitemap, ícones
├─ components/          uma pasta por seção (Header, Hero, Services, HowItWorks,
│                       UrgentCTA, ServiceArea, About, FAQ, FinalCTA, Footer)
│                       + ContactLink, Reveal, Analytics, StructuredData
├─ config/
│  ├─ business.ts       ÚNICA fonte dos dados comerciais (telefone, WhatsApp, etc.)
│  └─ site.ts           domínio, release e indexação
├─ lib/                 contact (tel/wa.me), analytics (track + consentimento), e164
└─ styles/              tokens.css, buttons.css
public/                 brand/ (logo, leão) e images/ (caminhão)
scripts/                dev.mjs, release-check.ts
qa/                     compare.py (QA visual por seção), capture_reference.py
docs/                   documentação do projeto (ver abaixo)
```

## Configurando os dados comerciais

Todos os contatos ficam em **`src/config/business.ts`**. Nenhum componente tem telefone fixo no código.

```ts
phoneE164: '+5548XXXXXXXXX',     // formato E.164
phoneDisplay: '(48) XXXXX-XXXX',
whatsappE164: '+5548XXXXXXXXX',
whatsappDisplay: '(48) XXXXX-XXXX',
privacyPolicyUrl: '/politica-de-privacidade', // ou URL externa
aboutImage: '/images/sobre.jpg',             // foto real da seção Sobre
```

Enquanto um contato estiver `null`, o CTA mantém o visual aprovado, mas fica inerte e marcado como pendente (DEC-024).

## Variáveis de ambiente

Veja [`.env.example`](.env.example).

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio definitivo (canonical, OG, sitemap). Sem ele: `noindex`. |
| `ZION_RELEASE` | `1` apenas no build de produção final; ativa a guarda de release e a indexação. |
| `NEXT_PUBLIC_GA_ID` | GA4 (opcional). |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads (opcional). |
| `NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP` / `_PHONE` / `_LOCATION` | Labels de conversão por evento. `_LOCATION` usa o de WhatsApp se vazio. |

O gtag só é carregado quando há ID. O consent mode v2 começa **negado**; a futura CMP deve chamar `updateConsent()` em `src/lib/analytics.ts`.

## Build de publicação

```bash
ZION_RELEASE=1 pnpm build
```

O `next.config.ts` roda `scripts/release-check.ts` e **interrompe o build** listando cada item obrigatório pendente: telefone e WhatsApp em E.164, `NEXT_PUBLIC_SITE_URL`, `business.privacyPolicyUrl` e `business.aboutImage`. Os avisos (logo SVG, OG image, IDs de analytics) não bloqueiam.

Sem `ZION_RELEASE`, builds de desenvolvimento e preview passam normalmente e o site fica com `noindex` / `Disallow: /`.

O passo a passo de deploy na Vercel está em **[`docs/DEPLOY.md`](docs/DEPLOY.md)**.

## Pendências para publicar

Detalhes em [`docs/OPEN-ITEMS.md`](docs/OPEN-ITEMS.md).

- [ ] Telefone e WhatsApp (P0; bloqueiam mídia paga)
- [ ] Domínio definitivo
- [ ] Política de Privacidade publicada
- [ ] Foto real da seção Sobre (hoje é um bloco neutro; DEC-021)
- [ ] Recomendado: logo/símbolo em SVG, OG image 1200×630, foto real do caminhão (a atual é placeholder gerado por IA), IDs de GA4/Ads e estratégia de consentimento

## QA visual

Com o dev rodando em `:3000`:

```bash
python qa/compare.py                 # todas as seções, 1440 e 390
python qa/compare.py --only hero     # uma seção
```

O script gera `qa/out/*.png` com a referência à esquerda e o app à direita, e imprime as alturas e checagens de overflow e console. Requer Python 3 com `playwright` e `pillow`.

## Documentação

| Documento | Conteúdo |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Regras para agentes de código (fidelidade > interpretação) |
| [`docs/SOURCE-OF-TRUTH.md`](docs/SOURCE-OF-TRUTH.md) | Hierarquia de fontes e fatos confirmados |
| [`docs/PRODUCT.md`](docs/PRODUCT.md) · [`CONTENT.md`](docs/CONTENT.md) | Produto e copy aprovada |
| [`docs/DESIGN.md`](docs/DESIGN.md) · [`DESIGN-REFERENCE.md`](docs/DESIGN-REFERENCE.md) | Design system e referência visual |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) · [`IMPLEMENTATION.md`](docs/IMPLEMENTATION.md) | Arquitetura e plano de fases |
| [`docs/ASSETS.md`](docs/ASSETS.md) | Assets atuais e necessários |
| [`docs/SEO-ANALYTICS.md`](docs/SEO-ANALYTICS.md) · [`ACCESSIBILITY.md`](docs/ACCESSIBILITY.md) · [`PERFORMANCE.md`](docs/PERFORMANCE.md) | Critérios técnicos |
| [`docs/QA.md`](docs/QA.md) · [`QA-REPORT.md`](docs/QA-REPORT.md) | Checklist e resultado do QA |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Decisões DEC-001 a DEC-026 |
| [`docs/OPEN-ITEMS.md`](docs/OPEN-ITEMS.md) | Pendências comerciais e de assets |
| [`docs/DEPLOY.md`](docs/DEPLOY.md) | Deploy na Vercel |
| [`docs/reviews/`](docs/reviews) | Revisões independentes por fase, com arbitragem |
| `docs/reference/` | Export aprovado (`Zion Landing Page v2.dc.html`), assets e baselines de QA |
| `docs/assets/logo-original/` | Arquivos originais do logo fornecidos pelo cliente |

---

Site por **Coded by M**.
