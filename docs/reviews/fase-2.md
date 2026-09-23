# Revisão independente — Fase 2 (Header, menu mobile e Hero)

Intervalo: `d76424c..7644d04`. Evidência: diff, export v2, `qa/out/desktop-01-hero.png`, `qa/out/mobile-01-hero.png` e checagem do servidor em 390, 320 e 1024px. As capturas de 1440/390 estão próximas da referência; os achados abaixo se concentram em comportamento e larguras intermediárias. A captura inclui o indicador do Next em modo dev, que não é parte da UI de produção.

## Achados

1. **IMPORTANTE — CTAs pendentes são anunciados como links, mas não têm ação nem entram no Tab.** `src/components/ContactLink/ContactLink.tsx:25-31`. Com os números `null`, o componente renderiza `<a role="link" aria-disabled="true">` sem `href`. O navegador não o trata como link nativo ou controle focável; no teste a árvore acessível o anuncia como link desabilitado, enquanto a aparência continua idêntica à de um CTA ativo. Isso afeta todos os contatos da Hero e do Header. `aria-disabled` não acrescenta comportamento nem transforma um `<a>` sem `href` em alternativa plenamente acessível. **Correção sugerida:** em desenvolvimento, renderizar um `<button type="button" disabled>` com texto acessível que explique a indisponibilidade e uma indicação visível de pendência, mantendo dimensões da referência; quando houver número confirmado, renderizar `<a href>` nativo. Impedir publicação enquanto os números P0 estiverem nulos. Não criar destino fictício.

2. **IMPORTANTE — Menu mobile aberto não forma uma navegação modal acessível.** `src/components/Header/MobileMenu.tsx:75-86` e `src/components/Header/Header.tsx:40-59`. O painel é um `<div>` genérico; o único `<nav aria-label="Principal">` está oculto no mobile. No snapshot aberto, os links aparecem como lista dentro do banner, sem landmark de navegação, e a Hero continua na árvore acessível apesar do painel cobrir a viewport e prender o Tab. **Correção sugerida:** envolver links em `<nav aria-label="Principal">`; se o painel continuar modal (trava scroll e ciclo de foco), expor `role="dialog"`/`aria-modal="true"` com nome e tornar o conteúdo de fundo inerte enquanto aberto. Manter o visual aprovado pela DEC-019.

3. **IMPORTANTE — O layout desktop em 1024px perde a composição da Hero.** `src/components/Hero/Hero.module.css:139-150,226-245` e `src/components/Header/Header.module.css:161-165`. O modo desktop começa em 1024px, mas a imagem só ocupa 464px de largura com `object-fit: cover` e `object-position: 88%`; na captura de 1024px, aparece essencialmente a cabine, sem a plataforma do guincho que caracteriza a foto. Nesse mesmo ponto, “ÁREA DE ATENDIMENTO” no header e duas partes da barra de dados quebram em linhas, embora mantenham alturas fixas de 88/96px. **Correção sugerida:** criar uma transição responsiva própria para ~1024–1279px (composição/crop e espaçamentos fluidos ou manutenção temporária do arranjo mobile) e validar a presença do caminhão completo, a legibilidade do nav e a barra de dados. A meta continua sendo a referência de 1440px.

4. **IMPORTANTE — `sizes` superestima a Hero e induz variante maior que a área exibida.** `src/components/Hero/Hero.tsx:10-17`. O `sizes` fixo de `1290px` para todo desktop não corresponde aos 880px renderizados em 1440px nem aos 464px em 1024px; `120vw` no mobile também supera a largura real. No navegador em DPR 1, `currentSrc` solicitou `w=1920` para 1024 e 1440px. A imagem é candidata a LCP e tem `preload`, ampliando o custo inicial. **Correção sugerida:** fazer `sizes` descrever a largura CSS efetiva por breakpoint (no desktop, aproximadamente `calc(100vw - max(560px, 38.889vw))`; no mobile, `100vw`) e medir a variante/transferência resultante. Manter preload apenas para esta imagem LCP.

5. **MENOR — Fechar o menu por âncora ou resize perde o foco.** `src/components/Header/MobileMenu.tsx:45-47,82-85`. No teste com teclado, Enter em “Serviços” atualizou `#servicos` e fechou o painel, mas o foco foi para `body`; ao abrir o menu e ampliar para 1024px, ocorreu o mesmo. Isso interrompe a posição do usuário de teclado/leitor de tela. **Correção sugerida:** ao seguir âncora, focar o heading/section de destino com `tabIndex={-1}`; no resize, mover o foco para um controle visível equivalente antes de ocultar o painel. Escape já devolve foco corretamente ao botão.

## Pontos verificados

O menu abriu/fechou em 390px, Escape restaurou o foco ao botão, o Tab permaneceu no conjunto botão/painel e o scroll foi travado/restaurado. A Hero usa `alt=""` conforme DEC-020, sem fade/gradient; cores, pesos, quebras e hairlines em 1440/390 acompanharam as capturas. Em 320px, não observei overflow horizontal nem corte dos CTAs; o viewport útil caiu para 305px por causa da barra de rolagem vertical. `scripts/dev.mjs` foi inspecionado; não identifiquei falha nova demonstrável no escopo deste diff. O detector Impeccable sobre os componentes alterados retornou `[]`. Os eventos de tracking continuam previstos para a Fase 8 conforme a arbitragem da Fase 1.

---

## Arbitragem do Tech Lead

| # | Decisão | Quando |
|---|---|---|
| 1 CTA pendente como `<a>` sem href | **Aceito com ajuste (DEC-024).** Não trocar por `<button disabled>` (também sai do Tab e muda a semântica final). Manter o elemento, acrescentar texto acessível "(contato pendente)" em `.visually-hidden`, e bloquear release: build de produção falha se P0 estiver nulo quando `ZION_RELEASE=1`. | Correções pós-Fase 4 + guarda na Fase 8 |
| 2 Menu sem landmark/modal | **Aceito.** `<nav aria-label="Principal">` no painel, `role="dialog"` + `aria-modal` + `aria-label`, conteúdo de fundo `inert` enquanto aberto. Visual DEC-019 inalterado. | Correções pós-Fase 4 |
| 3 Composição desktop em 1024–1279 | **Aceito.** Tratado na Fase 6: critério = caminhão com plataforma visível, nav sem quebra, rail sem quebra; ajustar o ponto de troca desktop com evidência de screenshot. | Fase 6 |
| 4 `sizes` superestimado | **Aceito.** `sizes` = largura CSS efetiva por breakpoint. | Correções pós-Fase 4 |
| 5 Foco perdido ao fechar menu | **Aceito.** Âncora: foco no destino (`tabIndex=-1`); resize: foco no controle visível equivalente. | Correções pós-Fase 4 |
