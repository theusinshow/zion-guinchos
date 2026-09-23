# Accessibility

## Meta

Alvo mínimo: WCAG 2.2 AA nas interações e conteúdo principal, sem comprometer a linguagem visual aprovada.

## 1. Semântica

Usar:

- `header`
- `nav`
- `main`
- `section`
- `footer`
- headings em ordem lógica
- listas quando semanticamente listas

## 2. Links e botões

- navegação e `tel:`/WhatsApp são links;
- accordion e menu mobile são botões;
- não usar `div` clicável;
- texto de link precisa fazer sentido fora do contexto quando possível.

## 3. Focus

Implementar `:focus-visible` com contraste claro.

Não remover outline sem substituto.

O vermelho pode ser usado como parte do focus, mas não deve ser o único indicador se contraste/forma ficarem insuficientes.

## 4. Menu mobile

- botão com nome acessível;
- `aria-expanded`;
- `aria-controls`;
- foco gerenciável;
- fechar com Escape é recomendado;
- evitar scroll do conteúdo atrás quando menu overlay estiver aberto.

## 5. FAQ

Cada item deve ter:

- `button` real;
- `aria-expanded`;
- `aria-controls`;
- região/resposta associada;
- operação por teclado;
- target confortável no mobile.

## 6. Imagens

Hero:

Alt descritivo somente se a imagem comunicar conteúdo útil. Se for puramente decorativa e o mesmo contexto estiver textual, `alt=""` pode ser apropriado.

Logotipo:

Alt simples como `Zion Guincho`.

Não repetir texto visual inteiro em alt.

## 7. Contraste

Validar principalmente:

- cinza sobre off-white;
- muted text no dark;
- vermelho sobre off-white;
- links e microcopy de 10–12px.

Se algum token do mockup falhar em texto pequeno, fazer a menor correção de contraste possível e documentar.

## 8. Motion

Respeitar:

```css
@media (prefers-reduced-motion: reduce) {
  /* reduzir/remover transições não essenciais */
}
```

## 9. Touch targets

Objetivo prático: ~44px de área acionável para CTAs e controles principais no mobile.

## 10. Zoom e reflow

A página deve continuar utilizável com zoom de navegador e sem overflow horizontal relevante.
