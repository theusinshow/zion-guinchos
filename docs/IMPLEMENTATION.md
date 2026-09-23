# Implementation Plan

## Fase 0 — preparar referências

Criar `docs/reference/` e adicionar o export final do Claude Design e seus assets.

Referência principal atual:

- `Zion Landing Page v2.dc.html`

Não usar designs intermediários como fonte principal quando divergirem do final.

## Fase 1 — auditoria

Antes de escrever UI:

- ler toda a documentação;
- abrir a referência desktop;
- abrir a referência mobile;
- mapear dimensões e composição;
- identificar assets temporários vs definitivos;
- verificar se já existe projeto/base de código.

## Fase 2 — fundação visual

Implementar:

- fontes;
- cores/tokens;
- body/global reset;
- grid desktop/mobile;
- foco visível;
- helpers de CTA.

Validar uma página mínima antes de avançar.

## Fase 3 — Header + Hero

Prioridade máxima de fidelidade.

### Header

- desktop 88px na referência 1440;
- mobile 64px na referência 390;
- anchors reais;
- CTA de solicitar guincho;
- menu mobile acessível.

### Hero

- desktop: grande bloco visual ~720px;
- mobile: imagem ~260px + bloco de copy;
- sem gradient/fade;
- `object-position` ajustado por breakpoint;
- H1 responsivo mantendo quebras próximas da referência;
- CTA WhatsApp + ligação;
- info rail inferior.

## Fase 4 — Serviços + Como funciona

### Serviços

- quatro principais;
- faixa de complementares;
- nada de cards;
- interações simples, não essenciais à leitura.

### Como funciona

- fluxo 01 → 02 → 03;
- leitura completa sem hover;
- CTA após fluxo conforme referência.

## Fase 5 — CTA de urgência + Área + Sobre

### CTA urgência

- bloco dark curto;
- alta densidade de conversão;
- dois canais de contato.

### Área

- gráfico/mapa leve e próprio;
- apenas três cidades confirmadas;
- não usar imagem intermediária como fonte factual.

### Sobre

- preservar grande área fotográfica/material;
- usar placeholder aprovado se foto real ainda não existir;
- não inventar equipe/frota.

## Fase 6 — FAQ + CTA final + Footer

### FAQ

- botão semântico por item;
- `aria-expanded`;
- `aria-controls`;
- conteúdo acessível;
- transição curta/opcional;
- não esconder conteúdo de motores de busca por implementação inadequada.

### CTA final

- fundo dark;
- leão/símbolo sutil;
- headline de grande escala;
- WhatsApp e ligação.

### Footer

- navegação;
- contato;
- região;
- legal;
- crédito Coded by M.

## Fase 7 — mobile

Comparar especificamente em:

- 320px
- 375px
- 390px
- 430px

Validar:

- H1;
- menu;
- CTAs;
- imagens;
- FAQ;
- mapa;
- footer;
- action bar fixa, se usada.

## Fase 8 — motion

Adicionar somente depois do layout estável.

Preferir CSS.

Motion não pode atrasar interação nem alterar layout.

## Fase 9 — SEO + tracking

Após CTAs definitivos:

- metadata;
- canonical;
- sitemap;
- robots;
- structured data somente com dados confirmados;
- eventos de conversão;
- UTMs preservadas quando relevante.

## Fase 10 — QA

Executar `QA.md` integralmente.

## Comportamento de CTA quando número estiver pendente

Durante desenvolvimento, não criar número falso.

Opções aceitáveis:

1. deixar o CTA visualmente renderizado mas sem destino real, apenas em ambiente local, com indicação técnica no código; ou
2. usar config `null` e desabilitar ação sem publicar a build como produção.

Antes de deploy, telefone/WhatsApp são bloqueadores.

## Política de alteração de design

Se a implementação revelar um problema real de acessibilidade ou responsividade que exige divergência da referência:

1. corrigir com a menor alteração possível;
2. documentar a decisão em `DECISIONS.md`;
3. não usar o problema como justificativa para redesenhar a seção.
