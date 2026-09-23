# Revisão fase 4 — CTA urgência, Área de atendimento, Sobre

Intervalo: `c44e9b2..29452f6` (`git diff -- src`). Comparações: seis capturas `qa/out/{desktop,mobile}-04/05/06-*.png`; inspeção do DOM/HTML servido e do layout em 320, 390, 1024, 1280 e 1440px. **0 bloqueantes, 3 importantes, 1 menor.**

## Achados

1. **IMPORTANTE — Ordem visual e ordem de leitura divergem no mobile.** `src/components/ServiceArea/ServiceArea.tsx:38-77,80-138`; `src/components/ServiceArea/ServiceArea.module.css:13,42-43,86,132,182`. Com `display: contents` e `order`, a tela mostra título → lead → mapa → legenda → mini-mapa → “Outras cidades”/CTA, mas a árvore acessível/DOM lê título → lead → “SANTA CATARINA” → “Outras cidades”/CTA → mapa → legenda. Assim, a navegação por leitor de tela e o Tab chegam ao CTA visualmente inferior antes de explicar o mapa; o SVG não aparece no mesmo ponto em que o usuário vidente o encontra. **Correção:** alinhar a sequência do DOM à sequência visual mobile e usar o grid desktop para posicionar os blocos sem reordenação por `order`; preservar um único CTA e uma única versão de mapa acessível por breakpoint. `display: contents` em `div` genéricos não foi, por si só, uma falha observada; o problema demonstrado é a divergência de sequência.

2. **IMPORTANTE — A legenda da base desaparece no mobile, contrariando a DEC-018.** `src/components/ServiceArea/ServiceArea.module.css:105-108,253-255`; `src/components/ServiceArea/ServiceArea.tsx:126-129`. A decisão aprovada exige a legenda “Atendimento principal / Base · Palhoça / Sob consulta”, mas a regra mobile aplica `display: none` em `BASE · PALHOÇA`. O ponto vermelho permanece no mapa sem sua chave, também para leitor de tela. A captura mobile v2 tem dois itens, mas a DEC-018 posterior é explícita; isto deve ser arbitrado como fidelidade à decisão, não como inclusão de município novo. **Correção:** manter a chave da base nos dois breakpoints, ajustando apenas a distribuição responsiva da legenda; não adicionar outros nomes de municípios.

3. **IMPORTANTE — O CTA de localização suprime o evento posicional exigido.** `src/components/UrgentCTA/UrgentCTA.tsx:19-26`; `src/components/ContactLink/ContactLink.tsx:24-25`; `src/lib/analytics.ts:37-42`. O botão WhatsApp de urgência usa `event="location_cta_click"`; `track()` só gera `urgent_cta_whatsapp_click` quando recebe `whatsapp_click`. Ao conectar o tracking na Fase 8, esse clique poderá gerar `location_cta_click`, mas nunca o evento posicional `urgent_cta_whatsapp_click` listado em `docs/SEO-ANALYTICS.md` §8. **Correção:** tratar o CTA de localização como uma interação com dois eventos GA4 (localização e posição), com deduplicação explícita de conversão Ads; não contar dois cliques/conversões. Não reabre o bootstrap de `gtag`, já adiado para a Fase 8.

4. **MENOR — Os caminhos do mapa têm custo material no HTML inicial.** `src/components/ServiceArea/mapData.ts:1-71`; `src/components/ServiceArea/ServiceArea.tsx:83-120`. O módulo tem 55.077 bytes e renderiza no HTML tanto o mapa desktop quanto o mobile (mais os dois mini-mapas), embora só um de cada fique visível. Na resposta local, a seção ocupou 61.081 bytes sem compressão, dos quais 53.028 eram valores `d`; isolada, comprimiu para ~20,5 KB gzip, cerca de 36% dos ~56,3 KB gzip do HTML total. Não é motivo para bloquear esta fase nem evidencia 55 KB de JS enviado ao cliente, pois o componente é server-side. **Correção:** no passe de performance, testar simplificação controlada dos paths/SVGO ou SVGs estáticos cacheáveis, conferindo pixel a pixel as duas escalas e preservando o nome acessível. Não trocar por mapa genérico.

## Verificações sem achado adicional

- DEC-018: busca no `src` e no HTML servido não encontrou nomes de municípios não confirmados; os dois SVGs principais têm nome acessível somente com Palhoça, São José e Florianópolis, e o breakpoint oculto não apareceu na árvore acessível. Mini-mapas são decorativos (`aria-hidden`).
- DEC-021: o slot neutro configurável permanece sem fotografia falsa; a composição e o heading do Sobre não cortaram nem se sobrepuseram ao texto em 320, 1024, 1280 ou 1440px.
- As seis comparações em 1440/390px não mostraram divergência perceptível adicional de grid, tipografia, hairlines ou mapa. Em 1024px o título da Área quebra “ATENDIMENTO / NA”, mas permanece íntegro e sem overflow; acompanhar no QA responsivo.
- A microcopy da Urgência computa `#999999` sobre `#080808`, contraste **7,03:1**, acima dos 4,5:1 exigidos pelo [WCAG 2.2, critério 1.4.3 AA](https://www.w3.org/TR/WCAG22/#contrast-minimum). O foco claro também está configurado na superfície escura.

---

## Arbitragem do Tech Lead

| # | Decisão | Quando |
|---|---|---|
| 1 Ordem de leitura ≠ ordem visual no mobile | **Aceito.** DOM na sequência visual mobile; desktop posiciona via grid, sem `order`. | Fase 6 |
| 2 Legenda da base oculta no mobile | **Rejeitado.** DEC-018 regula *conteúdo* (quais cidades aparecem), não a composição por breakpoint. A baseline mobile aprovada tem 2 itens; aparência = design vence (SOURCE-OF-TRUTH §4). O quadrado vermelho fica adjacente ao rótulo PALHOÇA e o nome acessível do mapa cobre as três cidades. Esclarecimento registrado em DEC-018. | — |
| 3 CTA de localização sem evento posicional | **Aceito.** Um clique gera `location_cta_click` + `urgent_cta_whatsapp_click` (GA4) e no máximo uma conversão Ads. | Fase 8 |
| 4 Peso dos paths do mapa | **Aceito.** Testar SVGO/simplificação com conferência pixel a pixel no passe de performance. | Fase 8 |
