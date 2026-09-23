# Revisão independente — Fase 1 (fundação)

Intervalo: `43c8da5..d76424c`. Revisão estática do diff e das fontes `DESIGN.md`, `SEO-ANALYTICS.md`, `QA.md`, `ACCESSIBILITY.md`, `PERFORMANCE.md` e export v2. Não há UI implementada nesta fase; comparação visual e execução dos CTAs ficam para fases posteriores. Nenhum arquivo do repositório foi alterado nesta revisão.

## Achados

1. **IMPORTANTE — Foco invisível sobre fundos escuros.** `src/app/globals.css:82-84`. O único `:focus-visible` global usa `outline: 2px solid var(--color-ink)` (`#080808`). Nas seções e CTAs de fundo `#080808` previstos no design, o contorno fica da mesma cor do fundo, contrariando `ACCESSIBILITY.md` §3 e `QA.md` §3/§10. **Correção sugerida:** definir uma variante clara de foco para controles sobre superfícies escuras, com contraste também quando o botão for off-white.

2. **IMPORTANTE — Conversões de Ads são disparadas indiscriminadamente.** `src/lib/analytics.ts:49-50`. Com ID e label configurados, qualquer chamada de `track()` envia a mesma conversão, inclusive `phone_click`, `whatsapp_click` de qualquer posição e `location_cta_click`. Isso mistura ações distintas sob um único label e pode duplicar conversões se uma interação registrar evento genérico e de localização. `SEO-ANALYTICS.md` §8 pede eventos distintos; `OPEN-ITEMS.md` deixa label(s) pendentes. **Correção sugerida:** mapear explicitamente quais eventos devem gerar cada ação de conversão após definição dos labels; manter os eventos GA4 separados.

3. **IMPORTANTE — O helper de analytics ainda não tem inicialização de `gtag`.** `src/lib/analytics.ts:38-41` e `src/app/layout.tsx:42-46`. `track()` retorna silenciosamente se `window.gtag` não existir, e o diff não instala o script nem a fila de inicialização. Configurar os IDs em `.env` não basta para emitir nenhum dos eventos de `SEO-ANALYTICS.md` §8 ou `QA.md` §15. **Correção sugerida:** antes de conectar os CTAs, adicionar bootstrap condicional das tags e estratégia de consentimento, preservando o no-op quando não houver IDs.

4. **IMPORTANTE — Metadata social e canonical incompletos.** `src/app/layout.tsx:30-39`. Há title, description e locale corretos, mas não há `metadataBase`/canonical absoluto, `openGraph.url` nem `openGraph.images`; também não foram adicionados sitemap/robots neste diff. `SEO-ANALYTICS.md` §6-7 e `QA.md` §14 exigem esses itens antes da entrega. O domínio e a imagem OG constam como pendentes em `OPEN-ITEMS.md`, portanto não se deve inventá-los. **Correção sugerida:** manter esse ponto como gate de produção e completar os campos e arquivos quando domínio e imagem forem confirmados.

5. **MENOR — Overflow horizontal global fica oculto.** `src/app/globals.css:27`. `overflow-x: clip` no `body` pode esconder elementos que escapem do grid e mascarar a verificação de reflow de `QA.md` §2 e `ACCESSIBILITY.md` §10; também pode cortar o foco de um controle próximo à borda. **Correção sugerida:** verificar `scrollWidth` e focos em 320–1920px sem depender dessa regra e aplicar contenção apenas onde houver motivo específico.

6. **MENOR — Helpers aceitam telefone não vazio sem validar dígitos.** `src/lib/contact.ts:3-15`. `getPhoneHref()` e `getWhatsappHref()` verificam apenas se o campo é truthy. Após preencher a configuração, um valor como `+` gera `tel:+` ou `https://wa.me/`, apesar de não ser contato válido. **Correção sugerida:** validar o formato E.164 ou a sequência de dígitos no ponto central de configuração e retornar `null` para valores inválidos.

## Escopo verificado sem achados adicionais

Os valores de cor e os extremos de `clamp()` em `tokens.css` conferem com `DESIGN.md` §3/§7/§8; os pesos Barlow 400/600/700/800 e IBM Plex Mono 400 cobrem os pesos usados no export, e Archivo é variável. `business.ts` mantém telefone, WhatsApp, CNPJ e foto Sobre como `null`, sem dado comercial inventado. `contact.ts` retorna `null` para os contatos ainda pendentes. O helper de analytics contempla `whatsapp_click`, `phone_click`, `location_cta_click` e os seis nomes por posição exigidos. `layout.tsx` usa `lang="pt-BR"`; `tsconfig.json` tem `strict: true`; o esqueleto de `page.tsx` usa `main`, `section`, `footer` e IDs esperados. A semântica de headings, navegação e CTAs depende da implementação das próximas fases.

---

## Arbitragem do Tech Lead

| # | Decisão | Quando |
|---|---|---|
| 1 Foco invisível sobre fundo escuro | **Aceito.** Variante de foco clara (`--focus-color`) em superfícies dark. | Correção junto da Fase 2 |
| 2 Conversão Ads indiscriminada | **Aceito.** Conversão só para eventos mapeados explicitamente (whatsapp/phone/location), label por evento via env. | Correção junto da Fase 2 |
| 3 Sem bootstrap de gtag | **Aceito, adiado.** Escopo da Fase 8 (SEO + tracking), com consent mode. | Fase 8 |
| 4 metadataBase/canonical/OG/sitemap | **Já planejado.** Fase 8; domínio e OG image seguem em `OPEN-ITEMS.md`. | Fase 8 |
| 5 `overflow-x: clip` no body | **Aceito.** Remover; overflow deve ser detectado, não escondido. | Correção junto da Fase 2 |
| 6 Validação E.164 | **Aceito.** Retornar null para valor inválido. | Correção junto da Fase 2 |
