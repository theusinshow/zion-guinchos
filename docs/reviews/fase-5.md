# Revisão fase 5 — FAQ, CTA final, Footer e correções rev2/rev3

Intervalo fixado: `29452f6..c2a74c1` (`src public`). Comparações: seis imagens `qa/out/{desktop,mobile}-07/08/09-*.png`. Testes funcionais na build isolada de `c2a74c1` (`next build` + `next start -p 3100`), sem escrever no repositório. **0 bloqueantes, 4 importantes, 1 menor.**

## Achados

1. **IMPORTANTE — A correção do foco em âncora não garante que o destino fique visível.** `src/components/Header/MobileMenu.tsx:16-21,40-45,123-130`. Em 390×844, partindo do topo e escolhendo “Serviços” no menu, a URL vira `#servicos` e o foco vai à `section`, mas seu topo termina em **−164px** e o `h2` em **−91px**: o título fica parcialmente cortado. `history.pushState()` não executa a rolagem nativa da âncora, e `target.focus()` escolhe uma posição inadequada para uma seção alta. **Correção:** após retirar `inert`, rolar explicitamente o alvo ao início (`scrollIntoView({block:'start'})`, com offset apenas se houver header fixo), e então focá-lo sem alterar a rolagem; verificar todas as âncoras mobile. A parte “foco no destino” da revisão 2 foi aplicada, mas a navegação visual não ficou resolvida.

2. **IMPORTANTE — Resize mobile→desktop ainda perde o foco.** `src/components/Header/MobileMenu.tsx:77-83`. Com o menu aberto e o foco em “Serviços”, ao ampliar de 390 para 1024px, o painel fecha e `inert`/scroll são restaurados, porém `document.activeElement` termina em `body`, não no link equivalente da navegação desktop. A CSS oculta o controle focado antes de `onResize` consultar `hadFocus`, tornando a condição falsa. **Correção:** guardar o estado de foco do menu antes da troca de breakpoint (por exemplo, acompanhar `matchMedia`/estado do menu e focar o primeiro link visível após o commit), sem depender de `document.activeElement` depois que o painel se torna `display:none`. A correção arbitrada da revisão 2 permanece incompleta.

3. **IMPORTANTE — O Tab sai do diálogo enquanto `aria-modal="true"`.** `src/components/Header/MobileMenu.tsx:67-74,98-124`. O conjunto do trap inclui o botão “Fechar menu”, que é **irmão externo** do `<div role="dialog">`. Com quatro links focáveis no painel, quatro Tabs a partir do primeiro link levam o foco ao botão fora do diálogo, enquanto ele continua aberto e modal. Isso contradiz o [padrão de diálogo modal do W3C](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), que mantém a sequência de Tab dentro do diálogo. **Correção:** fazer o contêiner semântico do diálogo abranger também o controle de fechar ou oferecer controle de fechar dentro do painel e ciclar apenas elementos internos; manter Escape e a aparência DEC-019. `inert` no fundo e o retorno por Escape funcionaram no teste.

4. **IMPORTANTE — Política de Privacidade continua como link inerte na produção.** `src/components/Footer/Footer.tsx:100-107`. A build de produção remove corretamente `[NÚMERO A INSERIR]` e `[A INSERIR]`, mas apresenta “Política de Privacidade (página pendente)” como `<a role="link" aria-disabled="true">` sem `href`; não há página de destino. `docs/OPEN-ITEMS.md:15` a classifica como P1 de produção. Não há URL para inventar nesta fase, mas o rodapé legal não deve ser considerado pronto para publicação. **Correção:** manter o estado pendente em QA e exigir política aprovada com página/URL válida antes do release; verificar também o gate de publicação quando os dados P0 forem preenchidos. Não reabre a DEC-024 para CTAs de contato.

5. **MENOR — Painéis fechados do FAQ aparecem como regiões vazias na árvore acessível.** `src/components/FAQ/FAQList.tsx:61-69`. Depois que o effect promove `hidden` para `hidden="until-found"`, as cinco respostas fechadas têm altura zero e conteúdo oculto, mas a snapshot de acessibilidade do Chromium ainda expõe cinco `region` nomeadas pelas perguntas, sem parágrafo. Isso polui a navegação por regiões e sugere respostas presentes porém vazias. **Correção:** atribuir `role="region"`/nome acessível somente ao painel aberto (ou remover o papel explícito dos fechados), preservando `until-found` para a busca e `aria-expanded` nos botões.

## Verificações sem achado adicional

- FAQ: seis perguntas e respostas coincidem com `CONTENT.md`; SSR inclui as respostas no HTML, com cinco painéis `hidden=""`; após hidratação eles viram `hidden="until-found"` sem ganho de altura nem erro de hidratação observado. Clique/Enter mantém uma resposta aberta por vez; um evento `beforematch` simulado promove a resposta correspondente. Conteúdo no HTML permite leitura por crawlers, mas não garante indexação por buscadores. Sem JS/antes da hidratação, a busca nativa ainda não dispõe de `until-found` — limitação de progressive enhancement, não regressão visual observada.
- CTA final: as capturas 1440/390 reproduzem a composição; não houve overflow em 320, 390, 1024, 1280 ou 1440px. O leão é decorativo (`alt=""`, `aria-hidden`), WebP de 16.452 bytes em `<img loading="lazy" decoding="async">`. Texto `#B5B3AD` sobre `#080808`: **9,55:1**; microcopy `#999999`: **7,03:1**, ambos acima do AA para texto normal ([WCAG 2.2 1.4.3](https://www.w3.org/TR/WCAG22/#contrast-minimum)).
- Footer: build e `next start` da revisão fixada não serviram os placeholders `[NÚMERO A INSERIR]` nem `[A INSERIR]` no HTML ou DOM; CNPJ permanece ausente. Navegação/região/crédito conferem com a referência. Contatos nulos exibem a indicação acessível “(contato pendente)” da DEC-024; `ZION_RELEASE=1` segue planejado para a Fase 8.
- Correções rev2/rev3: o menu agora tem `nav`/`dialog`, fundo `inert`, trava de scroll e Escape devolvendo foco; `sizes` da Hero corresponde à largura CSS (`calc(100vw - max(560px, 38.889vw))`); o trajeto mobile acompanha a altura das etapas em 320/390; a validação E.164 rejeita DDI iniciado por zero. O detector Impeccable nos componentes alterados retornou `[]`.

---

## Arbitragem do Tech Lead

| # | Decisão | Quando |
|---|---|---|
| 1 Âncora do menu não rola até o destino | **Aceito.** `scrollIntoView({block:'start'})` após remover `inert`, depois `focus({preventScroll:true})`; validar todas as âncoras mobile. | Fase 8 (correções) |
| 2 Resize perde o foco | **Aceito.** Guardar estado de foco antes da troca de breakpoint (matchMedia 1280) e focar o link visível equivalente. | Fase 8 (correções) |
| 3 Tab sai do dialog | **Aceito.** O controle de fechar passa a pertencer ao container do dialog (ou o trap cicla só elementos internos). Visual DEC-019 inalterado. | Fase 8 (correções) |
| 4 Política de Privacidade inerte | **Aceito como gate de release.** `business.privacyPolicyUrl: null` (P1); a guarda `ZION_RELEASE=1` também falha sem ela. Sem inventar página. | Fase 8 |
| 5 Regiões vazias no FAQ | **Aceito.** `role="region"` só no painel aberto. | Fase 8 (correções) |
