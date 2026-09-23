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

**Status:** aprovado (Tech Lead, Fase 0).

**Decisão:** a referência final não contém barra fixa de ações no mobile; o header mobile já tem "LIGAR". Não implementar `MobileActionBar`.

## DEC-024 — CTAs com contato pendente

**Status:** aprovado (Tech Lead, revisão da Fase 2).

**Contexto:** telefone e WhatsApp são P0 pendentes. Um `<a>` sem `href` com aparência de CTA ativo é enganoso para tecnologia assistiva.

**Decisão:** enquanto o dado for `null`, o CTA mantém o visual aprovado, com `aria-disabled="true"`, `data-pending` e texto acessível "(contato pendente)". Não usar destino fictício. O build de release (`ZION_RELEASE=1`) falha se telefone ou WhatsApp estiverem nulos, garantindo que a página nunca vá para mídia paga com CTAs inertes.

**Impacto:** desenvolvimento e QA visual seguem possíveis; publicação fica tecnicamente bloqueada até o P0.

## Como adicionar decisões

Para novas decisões relevantes, criar entradas `DEC-018`, `DEC-019` etc. com:

- status;
- contexto;
- decisão;
- impacto.
