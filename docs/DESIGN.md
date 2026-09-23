# Design System — Zion Guincho

## 1. Direção visual

Conceito:

**Premium Automotive + Industrial + Editorial**

A interface deve parecer uma campanha automotiva editorial aplicada a uma landing page local de alta conversão.

Evitar completamente aparência de:

- template genérico de guincho;
- startup/SaaS;
- dashboard;
- landing page de IA com cards repetidos;
- estética de oficina barata;
- motorsport clichê;
- neon/futurismo.

## 2. Tipografia

### Display

`Barlow Condensed`

Uso:

- H1/H2;
- títulos de serviço;
- CTAs com maior impacto quando a referência pedir.

Pesos principais: 700–800.

### Body

`Archivo`

Uso:

- parágrafos;
- navegação;
- suporte de conteúdo.

### Interface e dados

`IBM Plex Mono`

Uso restrito:

- microcopy;
- labels;
- coordenadas visuais quando realmente informativas;
- pequenos dados operacionais;
- rodapé.

Não usar mono em toda seção apenas para reforçar o sistema.

## 3. Paleta

### Base

- Ink: `#080808`
- Dark: `#111111`
- Off-white: `#F3F2ED`
- White: `#F7F7F5`

### Neutros observados na referência

- Text secondary: `#4A4A4A`
- Muted: `#6B6B6B`
- Border light: `#D8D6CF`
- Secondary muted: `#B5B3AD`
- Surface gray: `#E4E3DD`
- Mid gray: `#9A9993`
- Dark border: `#2E2E2E`

### Signal

- Red: `#C93B3E`

O vermelho é accent controlado. Pode aparecer em pequenos indicadores, setas, estados ativos e detalhes. Não usar como grande fundo dominante salvo se a referência final explicitamente pedir.

## 4. Radius e sombras

- Border radius principal: `0`.
- Não adicionar cards arredondados.
- Não adicionar shadow decorativa em componentes.
- Hairlines de 1px são parte importante da identidade.

## 5. Grid desktop

Referência final:

- canvas desktop: 1440px;
- grid: 12 colunas;
- horizontal padding: 64px;
- column gap: 24px.

Use esse sistema como alvo em 1440px. Para outras larguras, preserve proporção e alinhamentos sem transformar tudo em container genérico estreito.

## 6. Grid mobile

Referência final:

- viewport: 390px;
- horizontal padding predominante: 20px;
- layout reorganizado, não simplesmente reduzido.

## 7. Escala tipográfica observada na referência

### Desktop

- Hero H1: 96px / line-height ~0.86
- Serviços H2: 68px / 0.9
- Como funciona H2: 72px / 0.9
- CTA urgência H2: 64px / 0.9
- Área H2: 60px / 0.9
- Sobre H2: 72px / 0.9
- FAQ H2: 56px / 0.9
- CTA final H2: 124px / ~0.86

### Mobile

- Hero H1: 54px
- Serviços H2: 48px
- Como funciona H2: 46px
- CTA urgência H2: 38px
- Área H2: 44px
- Sobre H2: 40px
- FAQ H2: 40px
- CTA final H2: 60px

É aceitável usar `clamp()` entre breakpoints, desde que 390px e 1440px fiquem visualmente próximos da referência.

## 8. Ritmo vertical observado

Desktop aproximado:

- Header: 88px
- Hero visual: 720px
- Hero info rail: 96px
- Serviços: `padding 128px 64px 96px`
- Como funciona: `120px 64px 128px`
- CTA urgência: `48px 64px`
- Área de atendimento: `96px 64px 88px`
- Sobre: imagem/visual ~760px + bloco de conteúdo sobreposto
- FAQ: `144px 64px 160px`
- CTA final: grande fechamento, padding superior ~128px

Mobile aproximado:

- Header: 64px
- Hero image: 260px
- Serviços: `72px 20px 56px`
- Como funciona: `72px 20px 64px`
- CTA urgência: `36px 20px 32px`
- Área: `64px 20px 56px`
- FAQ: `80px 20px 88px`

Esses números servem como especificação de fidelidade, não como licença para hardcode indiscriminado.

## 9. Hero

- Fundo geral off-white.
- Foto do caminhão ocupa o lado direito.
- Sem fade/gradient/mask de opacidade entre foto e fundo.
- Integração deve vir do enquadramento da fotografia.
- Texto forte à esquerda.
- Barra de dados na base.
- Caminhão cinza, composição 3/4 e presença física forte.

Na referência desktop, a área de imagem começa aproximadamente em x=560 e ocupa ~880px do lado direito.

No mobile, a fotografia vira bloco próprio acima do conteúdo textual.

## 10. Serviços

- Não usar grid de cards.
- Layout editorial assimétrico.
- Quatro serviços principais.
- Serviços complementares em faixa/linha secundária.
- Hairlines estruturam a lista.
- Ícones, se usados, devem ser discretos, vetoriais, monocromáticos e consistentes; não são obrigatórios.

## 11. Como funciona

- Tratar como fluxo 01 → 02 → 03.
- Não repetir linguagem de cards/lista de Serviços.
- Relação visual entre etapas pode usar linha/trajeto simples.
- Não parecer stepper de aplicativo.

## 12. CTA de urgência

- Bloco dark curto.
- Alta clareza.
- Não virar segunda Hero.
- Texto, WhatsApp e ligação são o foco.

## 13. Área de atendimento

- Visual territorial simplificado.
- Somente Palhoça, São José e Florianópolis como cidades principais.
- Outras cidades apenas "sob consulta".
- Não incorporar Google Maps como decoração.

## 14. Sobre

- Segundo momento de materialidade/fotografia do site.
- Grande área visual/fotográfica.
- Conteúdo editorial sobreposto/relacionado conforme referência.
- Não usar layout corporativo genérico.

## 15. FAQ

- Seção intencionalmente simples.
- Hairlines, perguntas, números discretos e indicador +/−.
- Sem cards, ícones decorativos ou backgrounds especiais.

## 16. CTA final

- Fundo `#080808`.
- Tipografia muito grande.
- Símbolo/leão pode aparecer gigante, invertido e com opacidade muito baixa.
- Não deixar o símbolo comprometer leitura.
- Diferenciar claramente do CTA de urgência.

## 17. Footer

- Fundo off-white.
- Estrutura editorial/grid.
- Sem mega-footer genérico cheio de colunas.
- Hairline superior forte.

## 18. Motion

Permitido:

- fade + translate pequeno;
- revelação suave de texto/imagem;
- underline;
- deslocamento de seta de poucos pixels;
- estados de hover simples.

Evitar:

- parallax forte;
- scroll hijacking;
- texto voando;
- cursor customizado;
- WebGL;
- animações longas;
- stagger exagerado.

Respeitar `prefers-reduced-motion`.

## 19. Anti-AI-slop

Antes de finalizar cada seção, verificar se foram introduzidos elementos ausentes da referência:

- radius;
- cards;
- gradients;
- shadows;
- badges;
- ícones em círculos;
- textos inventados;
- estatísticas;
- excesso de microcopy mono;
- centralização indevida;
- componentes de SaaS.

Se não estiver na referência ou documentação, não adicionar apenas para "deixar mais bonito".
