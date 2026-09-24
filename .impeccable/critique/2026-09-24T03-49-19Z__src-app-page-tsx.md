---
target: landing page inteira
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Dev\\webdesign\\landing-pages\\zion-guincho\\src\\app\\page.tsx"
target_fingerprint: "sha256:ce04d8d357a1de7251b0d4693f71667bc68b26c7ab4d959c8ffb478e8d1ad5db"
target_path: "C:\\Dev\\webdesign\\landing-pages\\zion-guincho\\src\\app\\page.tsx"
timestamp: 2026-09-24T03-49-19Z
slug: src-app-page-tsx
---
# Critique (3ª rodada) — Zion Guincho landing (src/app/page.tsx)

Method: dual-agent (A: revisão de design · B: detector + navegador)

## Design Health Score
| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Status | 2 | Nada diz o que acontece após o toque; WhatsApp abre nova aba sem aviso |
| 2 | Mundo real | 3 | Caixa alta condensada longa é lenta sob estresse |
| 3 | Controle | 3 | OK |
| 4 | Consistência | 3 | Numeração 01–0N com sentidos diferentes |
| 5 | Prevenção de erro | 2 | Enviar localização supõe saber usar o WhatsApp |
| 6 | Reconhecer | 3 | OK (repetição excessiva) |
| 7 | Flexibilidade | 2 | Sem skip link; tel: no desktop; número invisível |
| 8 | Estética | 3 | Cidades ~12x; Sobre vazio |
| 9 | Recuperação | 2 | Sem fallback se WhatsApp não abrir |
| 10 | Ajuda | 3 | Sem preço/pagamento (dados pendentes) |
| Total | | 26/40 | Aceitável (avaliador mais rígido; 0 problemas mensuráveis restantes) |

## Especificidade
Autoral (rota, mapa com recorte, CTA final com leão, BASE · PALHOÇA, hairlines). Vício: fórmula negrito+leve nos 7 títulos; numeração não ordinal em Serviços/FAQ.
Detector CLI: 0. Overlay 1197px: 37 (all-caps 13, line-length 10 real, cramped-padding 9 FP, wide-tracking 4, tiny-text 4 piso, viewport-edge 2, eyebrow 1, buried-raster 1). Medições 320/390/1440: 0 overflow, 0 contraste, 0 abaixo do piso, 0 alvos <44 no mobile, 0 foco coberto, headroom ok. CTAs pendentes fora do Tab (DEC-024).

## Prioridades
- [P1] Sem pessoa nem prova de confiança — nome, frase, foto, Google Business (dados reais). $impeccable clarify / layout
- [P1] Ligar no desktop (tel:) e número invisível — mostrar número quando confirmado. $impeccable adapt
- [P2] Repetição (cidades ~12x; micro da Hero = faixa de urgência). $impeccable distill
- [P2] Linhas de 85–103 caracteres em 768–1279 — max-width 65ch. $impeccable typeset
- [P2] Enviar localização exige saber usar o WhatsApp — linha de orientação. $impeccable clarify

## Personas
- Jordan: sem preço/pagamento; passo 02 sem "como"; Sobre sem nome.
- Riley: 20 CTAs pendentes parecem quebrados; tel: silencioso; Como funciona fora do nav do header.
- Casey: 320×568 CTA abaixo da dobra (barra cobre); Ligar longe do polegar esquerdo; 11px no sol; 3 famílias de fonte.

## Menores
Base vermelha no mapa sobre área cinza; legenda longe do mapa no desktop; 3º item do rail apagado.

## Perguntas
1. Nome do dono?
2. CTA principal = enviar localização?
3. Cidades 3x em vez de 12?
