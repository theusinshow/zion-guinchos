# Decisions Log

Registro das decisões já tomadas para evitar que agentes reabram discussões aprovadas sem necessidade.

## DEC-001 — Landing page única

**Status:** aprovado.

A primeira versão será uma landing page única focada em conversão, não um site institucional multipágina.

## DEC-002 — Conversões primárias

**Status:** aprovado.

WhatsApp e ligação são os dois canais primários.

## DEC-003 — Direção visual

**Status:** aprovado.

Premium Automotive + Industrial + Editorial.

## DEC-004 — Paleta

**Status:** aprovado.

Base preto/off-white com vermelho `#C93B3E` como accent controlado.

## DEC-005 — Tipografia

**Status:** aprovado.

- Barlow Condensed: display
- Archivo: body
- IBM Plex Mono: dados/microcopy

## DEC-006 — Radius

**Status:** aprovado.

Radius 0 como regra geral.

## DEC-007 — Hero Cinematic White

**Status:** aprovado.

Hero clara com imagem do caminhão à direita e tipografia forte à esquerda.

## DEC-008 — Sem fade na Hero

**Status:** aprovado.

Não usar fade/gradient/mask para dissolver a fotografia no background.

## DEC-009 — Serviços compactos

**Status:** aprovado.

Quatro serviços principais + quatro complementares. Não exibir nove itens com o mesmo peso.

## DEC-010 — Sem trust strip duplicada

**Status:** aprovado.

A própria Hero já comunica 24h/dias/região. Não criar uma segunda faixa redundante logo depois.

## DEC-011 — CTA urgência curto

**Status:** aprovado.

Deve ser uma interrupção funcional, não uma segunda Hero.

## DEC-012 — Cobertura factual restrita

**Status:** aprovado.

Apenas Palhoça, São José e Florianópolis são publicadas como cobertura principal. Outros destinos sob consulta.

## DEC-013 — Sem prova social fictícia

**Status:** aprovado.

Não haverá avaliações/depoimentos enquanto não existirem dados reais.

## DEC-014 — Operação individual

**Status:** aprovado.

Evitar "equipe" e "frota". A operação atual é conduzida pelo proprietário com um caminhão.

## DEC-015 — Fotografia

**Status:** aprovado.

Fotografia real será preferida. Imagens de IA atuais são placeholders de design e devem ser substituídas quando assets reais existirem.

## DEC-016 — Motion discreto

**Status:** aprovado.

Sem parallax pesado, scroll hijacking, cursor customizado ou efeitos chamativos.

## DEC-017 — AI slop prevention

**Status:** aprovado.

Não adicionar cards, gradients, glass, glow, pills ou decoração automática fora da referência.

## DEC-018 — Mapa da área sem cidades não confirmadas

**Status:** aprovado (Tech Lead, Fase 0).

**Contexto:** o mapa da referência v2 rotula Águas Mornas, Angelina, Anitápolis, Antônio Carlos, Biguaçu, Gov. Celso Ramos, Rancho Queimado e São Bonifácio em cinza com legenda "sob consulta". `SOURCE-OF-TRUTH.md` e `DESIGN-REFERENCE.md` proíbem reproduzir essas cidades.

**Decisão:** manter a geometria dos municípios vizinhos em cinza, **sem nenhum rótulo**, como contexto geográfico. Rotular somente Palhoça, São José e Florianópolis. Manter legenda "Atendimento principal / Base · Palhoça / Sob consulta" (sob consulta = outros destinos, confirmado).

**Impacto:** composição do mapa preservada; nenhuma cidade não confirmada publicada.

**Esclarecimento (revisão da Fase 4):** a legenda segue a composição de cada breakpoint da referência — 3 itens no desktop, 2 no mobile. DEC-018 regula conteúdo, não layout.

## DEC-019 — Estado aberto do menu mobile

**Status:** aprovado (Tech Lead, Fase 0).

**Contexto:** a referência v2 não desenha o menu mobile aberto.

**Decisão:** painel off-white abaixo do header de 64px, cobrindo a viewport, com os links na tipografia de navegação do footer mobile (Barlow Condensed 600, uppercase), separados por hairlines, seguido dos CTAs WhatsApp/Ligar no padrão dos botões da Hero mobile. Radius 0, sem sombra, sem animação além de transição curta respeitando `prefers-reduced-motion`. Ícone alterna hambúrguer ↔ ×.

**Impacto:** única peça de UI sem referência direta; construída só com elementos existentes do sistema.

## DEC-020 — Alt da imagem da Hero

**Status:** aprovado (Tech Lead, Fase 0).

**Contexto:** o export usa `alt="Caminhão plataforma cinza da Zion"`, mas a imagem é placeholder gerado por IA (`ASSETS.md`: não afirmar que é o caminhão da Zion).

**Decisão:** `alt=""` enquanto for placeholder. Quando houver foto real, usar alt descritivo.

## DEC-021 — Foto da seção Sobre ausente

**Status:** aprovado (Tech Lead, Fase 0).

**Contexto:** a referência v2 contém apenas um slot vazio ("Foto · proprietário ao lado do caminhão").

**Decisão:** implementar a composição com bloco neutro `#C4C3BD`-equivalente na proporção exata do slot, configurável por um único ponto (`src/config/business.ts` / asset). Bloqueia produção (ver `OPEN-ITEMS.md`).

## DEC-022 — CSS Modules em vez de Tailwind

**Status:** aprovado (Tech Lead, Fase 0).

**Decisão:** tokens globais em CSS custom properties + CSS Modules por seção. Motivo: composições editoriais específicas por seção são mais legíveis e auditáveis contra a spec em CSS do que em utilitários (`ARCHITECTURE.md` §2).

## DEC-023 — Sem Mobile Action Bar

**Status:** substituída por DEC-030 (2026-09-23).

**Decisão:** a referência final não contém barra fixa de ações no mobile; o header mobile já tem "LIGAR". Não implementar `MobileActionBar`.

## DEC-024 — CTAs com contato pendente

**Status:** aprovado (Tech Lead, revisão da Fase 2).

**Contexto:** telefone e WhatsApp são P0 pendentes. Um `<a>` sem `href` com aparência de CTA ativo é enganoso para tecnologia assistiva.

**Decisão:** enquanto o dado for `null`, o CTA mantém o visual aprovado, com `aria-disabled="true"`, `data-pending` e texto acessível "(contato pendente)". Não usar destino fictício. O build de release (`ZION_RELEASE=1`) falha se telefone ou WhatsApp estiverem nulos, garantindo que a página nunca vá para mídia paga com CTAs inertes.

**Impacto:** desenvolvimento e QA visual seguem possíveis; publicação fica tecnicamente bloqueada até o P0.

## DEC-025 — Estratégia responsiva

**Status:** aprovado (Tech Lead, Fases 6+7). Motivado por rev2-3, rev3-1, rev3-3, rev4-1.

**Decisão:**
- Composição desktop a partir de **1280px** (menor largura sem colisão de H2×CTA, quebra de nav ou rail, e com a plataforma do caminhão visível). Abaixo de 1280 usa a composição mobile aprovada; nenhuma composição nova foi criada.
- < 1280: gutter fluido `clamp(20px, 0.72px + 4.944vw, 64px)` e coluna de leitura de no máximo 720px alinhada à esquerda; fundos, hairlines, foto da Hero, slot do Sobre e barras do CTA final seguem full-bleed. Hero `clamp(260px, 66.667vw, 560px)`; slot do Sobre `min(125vw, 760px)`.
- 1280–1439: H2 de linha única (Como funciona, Sobre) escalam só nessa faixa, exatos em 1440; "Também atendemos" com label col 1–2 e lista col 3–12, sem quebra.
- > 1440: grid de 1312px centralizado (`--grid-gutter = max(64px, (100cqw − 1312px)/2)`); foto da Hero começa em gutter + 496px e sangra até a borda direita; leão e metades do CTA final acompanham o grid.
- < 360px: `.btn` com padding 16px e tracking .08em; footer em `auto-fit minmax(150px, 1fr)`.
- Área: DOM na ordem visual mobile; desktop posiciona por grid explícito (sem `order`/`display: contents`).

**Impacto:** 390 e 1440 continuam idênticos à referência; 320–1920 sem overflow nem colisão.

**Adendo (revisão 6+7):** na faixa 768–1279 a altura da foto da Hero é limitada para manter H1 e o início dos CTAs na primeira dobra típica; 390 e ≥1280 inalterados. Implementado como `max(260px, min(66.667vw, 560px, 36svh))`. Limitação aceita (revisão final): em viewports paisagem baixos próximos de 1279×720–768 o topo do CTA WhatsApp fica até ~79px abaixo da dobra; H1 e o "LIGAR" do header permanecem visíveis. Reavaliar com dados reais de tráfego.

## DEC-026 — Motion

**Status:** aprovado (Tech Lead, Fase 7).

**Decisão:** reveal (opacity + translateY 12px, 500ms ease-out, sem stagger) em blocos abaixo da dobra, via um único IntersectionObserver; nada na Hero/Header. Estado oculto só com `html.reveal-ready` (JS) e `prefers-reduced-motion: no-preference`. Hovers: seta ±4–6px, sublinhado nos links de nav.

## DEC-027 — Fundo claro mais branco

**Status:** aprovado (cliente, 2026-09-23).

**Contexto:** o off-white `#F3F2ED` da referência foi considerado amarelado demais.

**Decisão:** token `--color-offwhite` passa a `#FAFAF8`. Demais neutros inalterados; hover do botão claro continua `#FFFFFF`.

**Impacto:** todas as superfícies claras (Hero, seções, Sobre, Footer, menu mobile) e textos claros sobre fundo escuro ficam mais brancos. Contraste de texto escuro/cinza/vermelho sobre o fundo só melhora.

## DEC-028 — Leão do CTA final no desktop

**Status:** aprovado (cliente, 2026-09-23).

**Contexto:** no desktop (≥1280) o leão de fundo do CTA final aparecia cortado e deslocado para a direita, fora do grid.

**Decisão:** leão com 944px de largura, centralizado na altura da seção, com a borda direita do desenho alinhada à borda direita do grid. Opacidade, filtro e mobile inalterados.

**Impacto:** só o posicionamento do leão no desktop muda; o conteúdo e os CTAs continuam iguais.

## DEC-029 — Setas dos CTAs em SVG

**Status:** aprovado (cliente, 2026-09-23).

**Contexto:** as setas eram os caracteres `→`/`↗`, que o IBM Plex Mono não tem; o navegador desenhava com a fonte monospace do sistema, e o resultado mudava de um sistema para outro.

**Decisão:** componente `Arrow` (SVG inline, traço 1.5 em viewBox 16, ponta aberta, `currentColor`, 1em). Direções `right` e `up-right`. Os spans existentes continuam controlando tamanho, cor (vermelho) e hover.

**Impacto:** mesma posição, cor e animação em todos os CTAs; desenho idêntico em qualquer sistema operacional.

## DEC-030 — Barra de contato no mobile

**Status:** aprovado (cliente, 2026-09-23, após critique de design). Substitui DEC-023.

**Contexto:** o header não é sticky; depois da Hero o mobile ficava até ~1.800px sem nenhum ponto de contato (Sobre + FAQ).

**Decisão:** `MobileActionBar` fixa no rodapé da tela, só < 1280px: "Chamar no WhatsApp" (btn-primary) + "Ligar" (célula com hairline, como o header). Aparece quando o CTA principal da Hero não está inteiro na tela (já rolado ou cortado pela dobra em telas baixas) e some enquanto o CTA de urgência, os botões do CTA final ou o footer estão na tela. Oculta = fora da tela + `visibility: hidden` (fora do foco); entra com transform 240ms ease-out, sem transição em `prefers-reduced-motion`. Respeita `safe-area-inset-bottom`. Sem JS, não aparece. Tracking com `placement: action_bar`. Fica inerte com o menu aberto.

**Impacto:** contato sempre ao alcance do polegar; em celulares baixos (≤ 360×640) e em 1024×768 a barra já aparece na primeira tela.

**Adendo (critique 2):** `html { scroll-padding-bottom: 61px + safe area }` abaixo de 1280, para foco e âncoras pararem acima da barra (WCAG 2.4.11). Tab pela página inteira em 390×844: nenhum elemento focado fica sob a barra.

## DEC-031 — Primeira dobra em telas baixas

**Status:** aprovado (cliente, 2026-09-23).

**Decisão:** mobile < 768 e ≤ 760 de altura: foto da Hero `clamp(180px, 100svh − 500px, 260px)` e espaçamentos internos menores. Desktop ≥ 1280 e ≤ 720 de altura: H1 limitado a 13svh e espaçamentos menores. Composições de referência (390×844, 1440×900) inalteradas.

**Impacto:** "Chamar no WhatsApp" da Hero inteiro na primeira tela em 390×700 (termina em 657) e 1366×650 (termina em 614).

## DEC-032 — Rótulos de CTA com o canal

**Status:** aprovado (cliente, 2026-09-23). CONTENT.md atualizado.

**Decisão:** header desktop "Solicitar guincho" → "Chamar no WhatsApp"; CTA de urgência "Enviar minha localização" → "Enviar localização no WhatsApp" (15px abaixo de 390px de largura); "Outras cidades" "Consultar atendimento" → "Consultar pelo WhatsApp". Mensagens pré-preenchidas inalteradas.

**Impacto:** todo CTA diz para onde leva; o de localização deixa de sugerir envio automático de GPS.

## DEC-033 — Piso do microtexto mono

**Status:** aprovado (cliente, 2026-09-23).

**Decisão:** nenhum texto abaixo de 11px no mobile nem abaixo de 11,5px no desktop (antes 9–10,5px: legenda do mapa, rótulos do Sobre, "BASE · PALHOÇA", rail da Hero, microcopy dos CTAs, footer). Família, caixa e tracking inalterados.

**Impacto:** legibilidade ao ar livre; sem overflow de 320 a 1920.

**Adendo (critique 2):** a primeira aplicação só subiu os textos abaixo de 11px; os de 11px no desktop (rail da Hero, rótulo de Serviços, nota do Sobre, números do FAQ, CTA final, footer) passaram a 11,5px. Medido: mínimo 11px em 320/390 e 11,5px em 1440.

## DEC-034 — Header headroom no desktop

**Status:** aprovado (cliente, 2026-09-24, após critique 2).

**Contexto:** acima de 1280 o header não era sticky e não há barra; da faixa de urgência ao fim do FAQ (~2.000px) não havia contato na tela.

**Decisão:** no desktop o próprio header (mesma altura de 88px, hairline, sem sombra) fica sticky e some ao rolar para baixo, voltando depois de 8px de rolagem para cima (`HeaderScroll`). Não some com foco dentro dele. Oculto = fora da tela e fora do foco. Transição de 240ms ease-out, nenhuma em `prefers-reduced-motion`. `scroll-padding-top: var(--header-height)` para âncoras e foco pararem abaixo dele. Mobile inalterado (tem a barra da DEC-030).

**Impacto:** "Chamar no WhatsApp" e navegação a um gesto de distância em qualquer ponto da página; posições de 1440×900 no topo inalteradas.

## DEC-035 — Como funciona: o que acontece depois do toque

**Status:** aprovado (cliente delegou a redação, 2026-09-24). CONTENT.md atualizado.

**Decisão:** passo 01 ganha "No WhatsApp, a mensagem já vai pronta." (fato: mensagens pré-preenchidas do CONTENT.md). Passo 03 troca "Com as informações necessárias, a Zion inicia o atendimento." por "Você fala diretamente com quem vai realizar o serviço, do primeiro contato ao atendimento." (fato já aprovado no Sobre). Nenhuma promessa nova.

**Impacto:** o processo responde "o que acontece se eu tocar" e deixa de ser circular no passo 03.

## DEC-036 — Alvos de toque do footer

**Status:** aprovado (cliente, 2026-09-24).

**Decisão:** links de navegação do footer com 44px de altura em telas de toque (`pointer: coarse`); com mouse o ritmo da referência continua. "Política de Privacidade" ganha área de toque invisível de ~45px (pseudo-elemento), sem mudar o desenho.

**Impacto:** WCAG 2.5.5 no footer mobile.

## DEC-037 — Imagens de IA fornecidas pelo cliente

**Status:** aprovado (cliente pediu para aproveitar as imagens, 2026-09-24).

**Decisão:** Hero passa a `zion-hero-truck-v2`; Sobre usa `zion-about-truck` no slot (DEC-021), com `business.aboutImageIsPlaceholder = true` para a guarda de release continuar exigindo a foto real; Serviços ganha um par de fotos (carro e moto na plataforma) abaixo do texto — no desktop ocupa o vazio da coluna esquerda e alinha com a hairline inferior da lista (16:9), no mobile fica entre o texto e a lista (4:3); `og-background` vira `src/app/opengraph-image.jpg` e o card do Twitter passa a `summary_large_image`. A imagem com barco não é usada (serviço não confirmado). Todas decorativas, alt vazio, radius 0, sem moldura.

**Impacto:** Sobre deixa de ser um bloco cinza; Serviços perde o vazio no desktop; compartilhamentos passam a ter imagem. Hero em 1672px de largura (antes 2752): nítido até 1920 em DPR 1, um pouco mais suave em telas retina grandes.

## DEC-038 — Critique 3: estrutura para dados reais, medida e texto enxuto

**Status:** aprovado (cliente delegou a redação, 2026-09-24). CONTENT.md atualizado.

**Decisão:**
- `business.ownerName` / `business.ownerQuote` (null): com frase confirmada, o Sobre mostra a citação com hairline de 1px e atribuição mono. Nada aparece enquanto null.
- Com `phoneDisplay` confirmado, o número aparece como texto no header (≥ 1440; abaixo disso não cabe ao lado da nav) e como segunda linha do "Ligar agora" do CTA final — no desktop o `tel:` nem sempre funciona.
- Texto corrido limitado a 60ch (~70–76 caracteres reais) (Hero, Serviços, Como funciona, Urgência, Área, Sobre, CTA final); só muda a faixa 768–1279, onde as linhas chegavam a 85–103 caracteres.
- A microcopy do CTA de urgência passa a ensinar a enviar a localização: "No WhatsApp: clipe ou + › Localização › enviar a localização atual."
- "Palhoça, São José e Florianópolis" fica na Hero, na Área de atendimento, no mapa, no FAQ 02 e na região do footer. Saem de: serviço 01, microcopy de urgência, fato do Sobre (vira "CONTATO · Direto com quem atende"), corpo do CTA final e descrição do footer. Micro da Hero encurtada para "Está parado? Mande a localização pelo WhatsApp."

**Impacto:** menos repetição (de ~12 para ~6 ocorrências), leitura confortável em tablets e notebooks pequenos, e o site pronto para receber nome, frase e telefone sem retrabalho.

## DEC-039 — Versão curta

**Status:** aprovado (cliente pediu "mais curto, mais direto ao ponto", 2026-09-24).

**Decisão:**
- Sai a seção "Como funciona" (os 3 passos eram óbvios para guincho); o dado útil ("a mensagem já vai pronta") vai para o corpo do CTA de urgência. Sai também o link do footer e o placement `como_funciona`.
- Sobre compacto: sem a linha de fatos (repetia o rail da Hero) e sem a nota; foto em 4:3 no mobile (antes 4:5) e 560px no desktop (antes 760px). O espaço para nome/frase do proprietário (DEC-038) continua.
- Serviços: título "O que a Zion atende.", lead "Da emergência ao transporte agendado." e uma linha por serviço.
- Área de atendimento: lead "Palhoça, São José e Florianópolis. Outras cidades sob consulta."; "Outras cidades" vira só o CTA.
- FAQ com 4 perguntas (saem "A Zion atende 24 horas?" e "Quais regiões?", já respondidas duas vezes), título "Dúvidas frequentes." e respiro vertical menor.
- Pontos de contato intactos: Hero, CTA de urgência, CTA final, header headroom e barra do mobile.

**Impacto:** página de ~7.400px para ~5.700px no mobile 390 (9 → 6,7 telas) e ~5.600px no desktop 1440; sai da composição da referência v2 nessas seções, por decisão do cliente.

## Como adicionar decisões

Para novas decisões relevantes, criar entradas `DEC-018`, `DEC-019` etc. com:

- status;
- contexto;
- decisão;
- impacto.
