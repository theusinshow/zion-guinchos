# Revisão final independente — Zion Guincho

Commit auditado: `d3c43d06da728107cd00ead83cdbcdd88596c264` (HEAD confirmado). Build de produção testada em `http://localhost:3200`, sem usar o servidor dev e sem alterar arquivos do projeto. Arbitragens das fases 1–6/7 e DEC-018–026 consideradas. Resultado: **0 BLOQUEANTES, 1 IMPORTANTE, 0 MENORES. Pronto tecnicamente, pendentes apenas os itens de `OPEN-ITEMS.md`: NÃO.** O desvio abaixo é uma correção técnica aceita ainda não inteiramente cumprida; os gates de conteúdo/publicação continuam deliberadamente pendentes.

## Achado

1. **IMPORTANTE — Adendo DEC-025 / rev6-7-2 parcialmente não atendido na primeira dobra tablet.** A arbitragem de `docs/reviews/fase-6-7.md` pediu H1 e início dos CTAs visíveis na dobra típica de 720px em 768–1279px. Na build de produção, em 768×720 o CTA começa em **y=705**; em **1024×720, y=742**; em **1279×720, y=779**. Mesmo em **1279×768**, começa em **y=795** (H1 termina em y=728). A foto já está no piso de 260px definido em `src/styles/tokens.css`; portanto só diminuir a foto não resolverá as larguras superiores da faixa. O H1 está muito mais visível que na revisão 6/7, mas o canal primário continua fora da dobra justamente perto do breakpoint desktop. Ajustar apenas a composição tablet aprovada — altura/ritmo/tipografia dentro de 768–1279 — e medir novamente em 720 e 768px de altura, sem mudar 390/1440 ou criar layout novo. Não há overflow associado.

## Definition of Done — `CLAUDE.md`, item por item

| Item | Estado | Evidência |
|---|---|---|
| Desktop fiel | PASSA | Nove comparações `qa/out/desktop-01..09` inspecionadas; grid, tipografia, foto, mapa, hairlines e CTA final acompanham a baseline, delta vertical de 0 a −2px. |
| Mobile fiel | PASSA | Nove comparações `qa/out/mobile-01..09` inspecionadas; mesmas quebras/composição, ressalvadas as correções factuais DEC-018/021. |
| Nenhuma informação fictícia | PASSA | HTML de produção, JSON-LD, `src/config/business.ts` e busca em `src`/`public`: só Palhoça, São José e Florianópolis publicados; sem telefone, preço, avaliação, métrica ou tempo inventado. |
| CTAs configurados ou explicitamente bloqueados | BLOQUEADO-POR-DADO | Contatos nulos geram `aria-disabled`, `data-pending` e texto acessível; sem `href` fictício. Publicação com contato depende dos P0; `ZION_RELEASE=1` impõe guarda. |
| Âncoras funcionam | PASSA | Menu mobile: `#servicos`, `#area-de-atendimento`, `#sobre`, `#duvidas` atualizam hash, focam seção e deixam topo em ~0px. Footer também contém `#como-funciona`. |
| Menu mobile funciona | PASSA | Produção 390px: abre dialog, fundo `inert`, scroll travado, Tab fica dentro, Escape fecha e devolve foco; resize para 1280 fecha e foca o link desktop. |
| FAQ por teclado/toque | PASSA | Seis botões; Enter alterna resposta/`aria-expanded`; painéis fechados `hidden="until-found"` sem região vazia. Clique usa o mesmo handler. |
| Sem overflow horizontal | PASSA | `scrollWidth === clientWidth` em 320, 375, 390, 430, 768, 1024, 1279, 1280, 1439, 1440, 1920; leão extrapola só dentro da área recortada. |
| Imagens otimizadas | PASSA | Hero e logos via `next/image` com `sizes`/preload da Hero; leão WebP decorativo/lazy. Imagens carregadas e sem 404 no load limpo. Troca por fotos reais segue OPEN-ITEMS. |
| Build passa | PASSA | `next start` de produção em :3200 serve página, fontes, imagens, robots, sitemap e 404; não reexecutei build no repositório de acesso somente leitura. Release real permanece bloqueado pelos dados/ativos documentados. |
| Lint passa | PASSA | `node node_modules/eslint/bin/eslint.js src scripts next.config.ts`: exit 0. `pnpm.exe` estava inacessível no ambiente, então executei o binário diretamente, sem escrita. |
| Typecheck passa | PASSA | `node node_modules/typescript/bin/tsc --noEmit --incremental false`: exit 0. |
| Console limpo | PASSA | Aba nova, load de produção em 1440×900 até `networkidle` + 1,5s: 0 errors, 0 warnings, 0 assets 404. |
| Metadata e sitemap coerentes | PASSA | `lang=pt-BR`, title/description/OG corretos; preview sem domínio usa `noindex,nofollow`, `robots.txt` com `Disallow: /` e sitemap vazio. Canonical/OG URL e imagem dependem de domínio/asset aprovados. |
| Eventos de conversão preparados | PASSA | `data-track`/`data-placement` em Hero, urgência, área, final; `Tracker` delegado ignora CTA pendente. `location_cta_click` gera também `urgent_cta_whatsapp_click`; Ads limitado a uma conversão/label por clique. IDs vêm do ambiente. |
| Reduced motion respeitado | PASSA | Em `reduce`, 20 alvos `data-reveal` visíveis e transições computadas de 0,01ms; Hero/Header sem reveal. |
| QA visual comparado | PASSA | 18 composites atuais (desktop/mobile × seções 01–09) abertos e comparados com baseline; nenhuma divergência de composição não deliberada. |

## QA.md §1–§17

| § | Estado | Evidência sintética |
|---|---|---|
| 1 Breakpoints | **FALHA** | Sem overflow nos 11 tamanhos verificados, mas a primeira dobra tablet não cumpre o adendo DEC-025 (achado 1). |
| 2 Visual geral | PASSA | Fontes carregadas (`document.fonts.status=loaded`); paleta, radius 0, hairlines, vermelho contido, quebras e ritmo seguem as 18 capturas. |
| 3 Header | PASSA | Logo legível; nav/CTAs e menu validados, sem cobertura do alvo após âncora. |
| 4 Hero | PASSA | Foto sem fade, crop fiel em 390/1440, H1 único e rail corretos; links reais bloqueados por P0, sem destino inventado. A primeira dobra tablet está contabilizada em §1. |
| 5 Serviços | PASSA | Quatro serviços principais e quatro complementares; ícones não carregam informação indispensável, sem item extra. |
| 6 Como funciona | PASSA | Ordem 01→03 e texto completo mobile, sem dependência de hover. |
| 7 Urgência | PASSA | Bloco distinto da Hero; `data-track="location_cta_click"` no CTA de localização e `phone_click` no Ligar, com placement `urgent_cta`. Disparo em produção fica bloqueado pelo contato nulo. |
| 8 Área | PASSA | Somente três municípios nomeados em conteúdo/SVG/ARIA; outros destinos sob consulta. Geometrias cinzas sem rótulos; legenda mobile de dois itens conforme esclarecimento DEC-018. |
| 9 Sobre | PASSA | Texto da operação nova/profissional experiente conforme fonte; sem equipe, frota, anos ou foto falsa. Bloco neutro DEC-021 segue gate de release. |
| 10 FAQ | PASSA | Seis perguntas/respostas, hierarquia h3, teclado, foco e regiões apenas abertas; sem mismatch/flash visível na build testada. |
| 11 CTA final | PASSA | Leão sutil/decorativo, texto legível e canais distintos; contraste já medido nas fases anteriores (#B5B3AD 9,55:1; #999 7,03:1 sobre #080808). |
| 12 Footer | PASSA | Navegação, região e crédito corretos. Nenhum `[NÚMERO A INSERIR]`, `[A INSERIR]` ou CNPJ no HTML de produção; política segue pendente e guardada pelo release. |
| 13 Factual | PASSA | Busca em código e inspeção do HTML/JSON-LD sem depoimentos, números, pagamentos, preços, tempos ou cidades extras publicados. |
| 14 SEO | BLOQUEADO-POR-DADO | Title/description/OG/heading/robots/sitemap/JSON-LD corretos em preview; canonical absoluto, OG image e sitemap público só após domínio/asset/release. JSON-LD omite telefone/rating/reviews/rua/geo/preço. |
| 15 Tracking | PASSA | Hero WA/phone, urgência WA/phone, localização, final WA/phone presentes no mapeamento; IDs/labels ambientais; pendentes não contam conversão. Validação end-to-end com números/IDs reais bloqueada por dado. |
| 16 Técnico | PASSA | Lint e typecheck exit 0; build de produção respondendo, 404 legítimo para rota inexistente, nenhum erro/warning/asset 404 em carga limpa; reduced-motion respeitado. Links externos de contato ainda não existem por P0. |
| 17 Anti-AI-slop | PASSA | Inspeção das 18 capturas e CSS/estrutura: sem pills, cards arredondados, glass, glow, badges, gradientes, estatísticas ou animações chamativas; seções preservam composição própria. |

## Correções aceitas e decisões

- **rev5-1/2/3/5:** quatro âncoras do menu terminam no topo visível com foco; resize mobile→desktop restaura nav/fundo/scroll; botão fechar está dentro do `role=dialog`; FAQ fechado não declara `region`. Testado na build :3200.
- **rev6-7-1:** foco programático num botão do FAQ força o ancestral `data-reveal` a opacidade 1 no mesmo evento; conteúdo não fica focável invisível. Sem JS, o CSS não oculta blocos; em reduced-motion todos visíveis. **rev6-7-2:** parcialmente resolvido, ver achado 1.
- **rev4-3:** localização recebe o evento genérico próprio e o posicional `urgent_cta_whatsapp_click`; `urgent_cta_phone_click` também mapeado. Nenhum clique pendente dispara conversão. A confirmação de recebimento no GA4/Ads exige IDs e contato reais.
- **DEC-018–026:** atendidas com a ressalva explícita do adendo DEC-025; não reabri a legenda mobile DEC-018 nem a semântica de CTA pendente DEC-024.

## WCAG 2.2 AA 2.5.8 — links pequenos do footer

O **glifo** parece ter ~17px, mas o alvo real dos cinco links de navegação desktop mede **196,17×24 CSS px** na build 1440px. Portanto cumpre o tamanho mínimo de 24×24 diretamente; não precisa da exceção de espaçamento. Os alvos são adjacentes a cada 24px, sem sobreposição. Os contatos ainda pendentes não têm `href`; quando configurados, os links de texto de contato têm caixa de 20px de altura e intervalo vertical de 10px (centros a 30px), suficiente para a exceção de espaçamento de círculos de 24px, sujeito a revalidar com os dados finais. “Política de Privacidade” mede ~17px, porém hoje é elemento sem `href`/`aria-disabled`, não alvo de ponteiro funcional; revalidar o alvo quando houver URL. Critério oficial: [WCAG Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

## Handoff

Não declarar concluído ainda: corrigir e medir o achado 1. Depois, os gates externos continuam sendo telefone/WhatsApp E.164, domínio, política publicada e foto real do Sobre (`ZION_RELEASE=1` os exige), além dos assets finais/OG e decisão de consentimento/IDs descritos em `OPEN-ITEMS.md`. Nenhum desses dados deve ser inventado. Fora o adendo tablet, não encontrei regressão funcional/visual nova.

---

## Arbitragem do Tech Lead

| # | Decisão |
|---|---|
| 1 Primeira dobra tablet em viewports baixos (≈1150–1279 × 720–768) | **Aceito como limitação documentada (adendo DEC-025).** A foto já está no piso de 260px; fechar os 11–79px restantes exigiria reduzir tipografia/ritmo da composição aprovada, o que é redesenho. Critério atingido: H1 inteiro na dobra em todas as viewports medidas; CTA WhatsApp visível em 768×1024 e 1024×768. Nos casos-limite, o "LIGAR" do header permanece visível na dobra. Reabrir só com dado real de tráfego (proporção de sessões nessa faixa) após o lançamento. |

**Conclusão do Tech Lead:** implementação concluída. Pendências remanescentes são exclusivamente de dados/ativos comerciais (`OPEN-ITEMS.md`), bloqueadas tecnicamente pela guarda `ZION_RELEASE=1`.
