# CLAUDE.md — Zion Guincho

## Missão

Implementar fielmente a landing page aprovada da Zion Guincho.

Nesta etapa, você atua como **frontend engineer, implementation engineer, accessibility reviewer, performance engineer, SEO technical implementer e QA engineer**.

Você não está autorizado a reinterpretar a direção visual aprovada.

## Regra principal

**FIDELIDADE > INTERPRETAÇÃO.**

A referência visual é uma especificação, não uma inspiração.

Não faça por conta própria:

- redesign;
- nova direção de arte;
- novos componentes decorativos;
- novos textos comerciais;
- novas cidades;
- novos serviços;
- novas métricas;
- novas avaliações;
- novas promessas;
- arredondamentos;
- gradients;
- glassmorphism;
- shadows decorativas;
- cards genéricos;
- badges;
- ícones extras;
- animações chamativas.

## Leitura obrigatória

Antes de modificar qualquer arquivo, leia:

- `docs/SOURCE-OF-TRUTH.md`
- `docs/PRODUCT.md`
- `docs/CONTENT.md`
- `docs/DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/IMPLEMENTATION.md`
- `docs/ASSETS.md`
- `docs/SEO-ANALYTICS.md`
- `docs/ACCESSIBILITY.md`
- `docs/PERFORMANCE.md`
- `docs/QA.md`
- `docs/DECISIONS.md`
- `docs/OPEN-ITEMS.md`

Também analise todos os arquivos em `docs/reference/`.

## Hierarquia de fonte de verdade

Quando houver conflito:

1. **Fatos comerciais e copy:** `PRODUCT.md` e `CONTENT.md` vencem.
2. **Visual e composição:** design final em `docs/reference/` vence.
3. **Tokens e regras visuais:** `DESIGN.md` complementa a referência.
4. **Decisões técnicas:** `ARCHITECTURE.md` e `IMPLEMENTATION.md`.
5. **Pendências:** `OPEN-ITEMS.md` nunca podem ser preenchidas por inferência.

Exemplo crítico: uma referência visual intermediária pode exibir cidades adicionais no mapa. A cobertura confirmada é somente **Palhoça, São José e Florianópolis**, com outros destinos sob consulta. Não publique cidades não confirmadas.

## Processo obrigatório

### Fase 1 — auditoria

Antes de editar:

1. analisar o repositório;
2. identificar stack e scripts existentes;
3. identificar referências e assets;
4. comparar desktop e mobile;
5. mapear fontes, grid, espaçamentos, cores e imagens;
6. listar qualquer bloqueio real.

Se o repositório já tiver uma stack funcional, preserve-a salvo razão técnica forte.

### Fase 2 — fundação

Implementar:

- fontes;
- tokens;
- reset/global styles;
- container/grid;
- configuração centralizada do negócio;
- helpers de contato/tracking.

### Fase 3 — página

Implementar na ordem:

1. Header
2. Hero
3. Serviços
4. Como funciona
5. CTA de urgência
6. Área de atendimento
7. Sobre
8. FAQ
9. CTA final
10. Footer
11. Mobile action bar, se mantida pela referência final

### Fase 4 — acabamento

- responsividade;
- motion discreto;
- acessibilidade;
- SEO;
- analytics;
- performance;
- visual QA.

## Regras de código

- TypeScript strict.
- HTML semântico.
- Zero `console.log` no resultado final.
- Zero erros de lint.
- Zero erros de typecheck.
- Zero warnings relevantes.
- Não criar abstrações genéricas sem reutilização real.
- Não espalhar telefone/WhatsApp em componentes; usar config central.
- Não espalhar tracking manualmente; usar helper central.
- Não usar client components quando server/static resolve.
- Não usar biblioteca pesada para accordion, menu ou motion simples.

## Componentização esperada

Componentes de seção são aceitáveis:

- `Header`
- `Hero`
- `Services`
- `HowItWorks`
- `UrgentCTA`
- `ServiceArea`
- `About`
- `FAQ`
- `FinalCTA`
- `Footer`
- `MobileActionBar`

Evite abstrações artificiais como `GenericCard`, `GenericSection`, `SectionTitle` ou wrappers sem ganho real.

## Conteúdo não confirmado

Nunca invente:

- telefone;
- WhatsApp;
- CNPJ;
- endereço exato;
- coordenadas;
- avaliações;
- nota Google;
- número de atendimentos;
- anos específicos de experiência;
- tempo médio de chegada;
- equipe;
- frota maior que um caminhão;
- seguro;
- rastreamento;
- preço;
- parcelamento;
- formas de pagamento ainda não confirmadas;
- cidades além das confirmadas.

Se um dado não confirmado for tecnicamente necessário, torne-o configurável e deixe um placeholder de desenvolvimento que não seja exibido como informação factual em produção.

## Definition of Done

Só declarar concluído quando:

- design desktop estiver fiel;
- design mobile estiver fiel;
- nenhuma informação fictícia estiver publicada;
- todos os CTAs estiverem configurados ou explicitamente bloqueados por dado pendente;
- anchors funcionarem;
- menu mobile funcionar;
- FAQ funcionar por teclado e toque;
- layout não tiver overflow horizontal;
- imagens estiverem otimizadas;
- build passar;
- lint passar;
- typecheck passar;
- console estiver limpo;
- metadata e sitemap estiverem coerentes;
- eventos de conversão estiverem preparados;
- `prefers-reduced-motion` for respeitado;
- QA visual tiver sido comparado com a referência em desktop e mobile.

Não considere o trabalho finalizado apenas porque a aplicação compila.
