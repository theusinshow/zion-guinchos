# Revisão independente — Fase 3 (Serviços, Como funciona e correções da Fase 1)

Intervalo: `7644d04..896e34d`. Evidência: diff, arbitragens de `docs/reviews/fase-1.md` e `fase-2.md`, DEC-024, export v2, quatro imagens em `qa/out/` e testes no navegador em 320, 1024, 1152, 1280 e 1440px. As capturas de 1440/390px acompanham a referência. O servidor estava recebendo trabalho da Fase 4 em paralelo; as duas seções avaliadas não tinham alterações fora do commit indicado.

## Achados

1. **IMPORTANTE — Título e CTA de Como funciona colidem em 1024px.** `src/components/HowItWorks/HowItWorks.module.css:107-116`. O H2 ocupa colunas 1–9, mas o CTA de 269px é alinhado à direita nas colunas 10–12 e invade a área do título. Em 1024px, o primeiro fragmento de “PODE SER SIMPLES” ocupa `x=489–691, y=516–590`, enquanto o botão começa em `x=676, y=577`; as caixas se cruzam em 15×13px. A captura mostra a separação quase nula. **Correção sugerida:** antes de 1280px, colocar o CTA em linha própria ou reduzir/redistribuir o espaço do cabeçalho, sem alterar o arranjo de 1440px.

2. **IMPORTANTE — Alturas fixas do fluxo mobile causam sobreposição quando o texto é ampliado.** `src/components/HowItWorks/HowItWorks.module.css:35-46` e `src/components/HowItWorks/HowItWorks.tsx:22-32`. O SVG tem 420px e as três linhas do `ol` são fixas em 146/140/134px. Em 320px com texto dos passos ampliado a 200% no navegador, o primeiro parágrafo terminou 54px depois do início da etapa 02 e o segundo terminou 150px depois do início da etapa 03. Isso viola o reflow esperado por `ACCESSIBILITY.md` §10 e pode embaralhar a leitura. **Correção sugerida:** deixar as etapas crescerem com o conteúdo e desenhar o trajeto com segmentos que acompanhem sua altura, preservando as posições do design em 390px no tamanho normal.

3. **MENOR — Faixa “Também atendemos” deixa um separador órfão quando quebra.** `src/components/Services/Services.module.css:198-226`. O `flex-wrap` move “Transporte entre cidades” para a segunda linha em 1024, 1152 e 1280px, mas `.alsoItem + .alsoItem::before` ainda desenha a hairline antes dele, agora isolada no começo da linha. A captura de 1024px mostra a linha vertical solta. **Correção sugerida:** tratar a quebra como uma faixa/grade própria nesses tamanhos ou suprimir o separador que passa a iniciar uma linha; manter hairlines entre itens na mesma linha.

4. **MENOR — A validação E.164 ainda aceita número começando por zero.** `src/lib/contact.ts:3-7`. O novo `^\+\d{10,15}$` rejeita `+` e textos não numéricos, corrigindo o caso da revisão 1, mas aceita `+0000000000` e cria destinos `tel:`/`wa.me` inválidos. **Correção sugerida:** exigir primeiro dígito após `+` entre 1 e 9 e manter o retorno `null` para qualquer valor que não cumpra a validação.

## Verificações sem novo achado

- A composição assimétrica, textos, pesos, ícones do export e hairlines (ink nas bordas principais, claras nas divisões internas) batem com as quatro capturas em 1440/390px. Em 320px, os passos e a lista de serviços não se sobrepõem no tamanho normal e não há overflow horizontal observado.
- O SVG desktop do trajeto escala com o contêiner; os marcadores continuam próximos das colunas das três etapas em 1024px. `ol`/`h3` estão corretos nas duas seções; os SVGs decorativos têm `aria-hidden`.
- O CTA “Ligar agora” de Como funciona usa `display:none` no desktop e não apareceu na árvore acessível em 1024px. O WhatsApp apareceu uma vez, sem duplicação.
- A correção de foco da revisão 1 define `--focus-color` no `:root` e uma variante clara em `.surface-dark`; sua aplicação concreta às seções escuras deve ser verificada quando elas existirem. `overflow-x: clip` foi removido.
- A conversão do Google Ads agora usa labels separados por `whatsapp_click`, `phone_click` e `location_cta_click`, emitindo conversão apenas quando o label do evento existe. O bootstrap de `gtag` e metadata continuam adiados para a Fase 8 pela arbitragem; não foram reabertos. O detector Impeccable nas duas seções retornou `[]`.

---

## Arbitragem do Tech Lead

| # | Decisão | Quando |
|---|---|---|
| 1 Colisão H2 × CTA em 1024 | **Aceito.** Mesmo pacote do achado 3 da revisão 2: faixa 1024–1279 tratada na Fase 6 com critério objetivo (sem colisão, sem quebra de nav/rail). | Fase 6 |
| 2 Alturas fixas no fluxo mobile | **Aceito.** Etapas crescem com o conteúdo; trajeto acompanha a altura real mantendo as posições do design em 390px no zoom normal. | Correções pós-Fase 4 |
| 3 Separador órfão na faixa "Também atendemos" | **Aceito.** Fase 6, junto da faixa intermediária. | Fase 6 |
| 4 E.164 aceita `+0…` | **Aceito.** `^\+[1-9]\d{9,14}$`. | Correções pós-Fase 4 |
