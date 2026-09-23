# QA Report — Implementação

Resultado do QA final (Tech Lead) e da revisão final independente, sobre o commit `d3c43d0` e posteriores (só documentação). Checklist de origem: [`QA.md`](QA.md). Revisão final completa: [`reviews/final.md`](reviews/final.md).

## Fidelidade visual

Comparação por seção entre a aplicação e o export aprovado (`qa/compare.py`), com `prefers-reduced-motion: reduce`:

| Seção | Desktop 1440 (ref / app) | Mobile 390 (ref / app) |
|---|---|---|
| Hero (com header) | 904 / 904 | 969 / 968 |
| Serviços | 918 / 917 | 1173 / 1171 |
| Como funciona | 631 / 630 | 815 / 813 |
| CTA urgência | 190 / 188 | 332 / 331 |
| Área de atendimento | 966 / 965 | 1079 / 1077 |
| Sobre | 1203 / 1202 | 1039 / 1038 |
| Dúvidas | 1029 / 1028 | 792 / 790 |
| CTA final | 733 / 731 | 668 / 667 |
| Footer | 298 / 297 | 538 / 536 |

Os deltas de 0 a −2px vêm do arredondamento do recorte. Medidas elemento a elemento no Playwright batem com o export. Na inspeção lado a lado não há divergência perceptível, exceto as correções deliberadas:

- Mapa sem os rótulos de municípios não confirmados (DEC-018)
- Sobre com bloco neutro no lugar do slot vazio do Claude Design (DEC-021)

## Responsividade

Build de produção em 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 e 2844px (ultrawide, DPR 0.9):

- Overflow horizontal: **0** em todas as larguras
- Console: **limpo** · Respostas 4xx/5xx: **nenhuma**
- Placeholders de desenvolvimento em produção: **nenhum**
- Composição desktop a partir de 1280px; abaixo, composição mobile com gutter fluido (DEC-025)
- Limitação aceita: em viewports paisagem baixos próximos de 1279×720–768, o topo do CTA WhatsApp fica até ~79px abaixo da dobra (adendo DEC-025)

## Conteúdo e fatos

- 51/51 textos de `CONTENT.md` presentes
- 0 ocorrências de termos proibidos: cidades não confirmadas, "equipe", "frota", avaliações, pagamentos, preços, tempos, anos
- JSON-LD `AutomotiveBusiness` só com dados confirmados: sem rating, review, geo, priceRange ou telefone inventado

## Semântica e acessibilidade

- 1 `h1` · 7 `h2` (um por seção) · `h3` nos itens
- Âncoras `#servicos`, `#como-funciona`, `#area-de-atendimento`, `#sobre`, `#duvidas` válidas, com foco e rolagem corretos a partir do menu
- Menu mobile: `role="dialog"`, `aria-modal`, fundo `inert`, Tab contido, Escape devolve o foco
- FAQ: `button` real com `aria-expanded`/`aria-controls`; respostas no HTML (`hidden="until-found"`)
- Reveal nunca deixa elemento focável invisível; `prefers-reduced-motion` zera o motion
- Contraste: texto claro sobre `#080808` de 7,03:1 a 9,55:1
- Target size (WCAG 2.2 2.5.8): links do footer com 24px de altura de alvo

## Anti-AI-slop

Sem cards, gradientes, glass, glow, badges ou pills. O radius aparece só nos pontos vermelhos, que já são circulares na referência. A única `box-shadow` é a hairline interna de 1px da amostra "sob consulta" da legenda, presente no export.

## Performance (Lighthouse 12, build de produção)

| | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| Mobile | 93–94 | 100 | 100 | 66* | 3,1s** | 0 | 10–24ms |
| Desktop | 100 | 100 | 100 | 66* | 0,65s | 0,0003 | 0 |

\* A única auditoria de SEO reprovada é `is-crawlable`, por causa do `noindex` proposital do preview. Com domínio e `ZION_RELEASE=1`, passa.

\*\* O LCP simulado (Lantern) iguala o LCP ao TTI. Com throttling real (`--throttling-method=devtools`) fica em 2,2–2,4s, dentro da meta de 2,5s. O LCP é a foto da Hero (AVIF de ~16 KB).

Rolagem a 2844px: 61 fps, pior frame de 17ms.

## Técnico

- `pnpm lint` · `pnpm typecheck` · `pnpm build`: passam
- `ZION_RELEASE=1 pnpm build`: falha de propósito, listando telefone, WhatsApp, domínio, Política de Privacidade e foto do Sobre
- Tracking (testado com IDs fictícios): um clique gera o evento genérico + o posicional + no máximo uma conversão Ads; CTAs pendentes não disparam nada

## Definition of Done (`CLAUDE.md`)

Todos os itens passam, exceto os bloqueados por dado comercial: CTAs com destino real e canonical/OG com domínio. Essas pendências estão em [`OPEN-ITEMS.md`](OPEN-ITEMS.md) e são impostas pela guarda de release.
