---
target: landing page inteira
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Dev\\webdesign\\landing-pages\\zion-guincho\\src\\app\\page.tsx"
target_fingerprint: "sha256:ce04d8d357a1de7251b0d4693f71667bc68b26c7ab4d959c8ffb478e8d1ad5db"
target_path: "C:\\Dev\\webdesign\\landing-pages\\zion-guincho\\src\\app\\page.tsx"
timestamp: 2026-09-24T03-22-26Z
slug: src-app-page-tsx
---
# Critique (2ª rodada) — Zion Guincho landing (src/app/page.tsx)

Method: dual-agent (A: revisão de design · B: detector + navegador)

## Design Health Score
| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Status | 3 | Nada diz que o CTA abre o WhatsApp com mensagem pronta |
| 2 | Mundo real | 3 | Botão WhatsApp sem glifo |
| 3 | Controle | 3 | OK |
| 4 | Consistência | 3 | Ligação: "Ligar"/"Ligar agora"/"Telefone" |
| 5 | Prevenção de erro | 3 | Localização corrigida (DEC-032) |
| 6 | Reconhecer vs lembrar | 3 | Desktop sem contato após a Hero |
| 7 | Flexibilidade | 2 | Desktop: tel: inútil, número só no footer |
| 8 | Estética | 3 | Bloco cinza do Sobre; vazio em Serviços desktop |
| 9 | Recuperação | 2 | Sem fallback se WhatsApp não abrir |
| 10 | Ajuda | 3 | FAQ cobre o essencial |
| Total | | 28/40 | Bom |

## Especificidade
Autoral (tipo, copy, mapa, rota, leão); imagem ainda não ajuda (caminhão IA, Sobre cinza).
Detector CLI: 0. Overlay 1078px: 35 (all-caps 13, cramped-padding 10 FP, line-length 9, tiny-text 4, wide-tracking 4, viewport-edge 2, eyebrow 1, buried-raster 1 FP). Medições 320/390/1440: sem overflow, 0 falhas de contraste, console limpo.
Detector exclusivo: barra cobre FAQ 05/06 no Tab (WCAG 2.4.11); DEC-033 não cumprida no desktop (vários 11px); alvos de toque do footer 17–24px.

## Prioridades
- [P1] Barra do mobile cobre foco — scroll-padding-bottom = altura da barra. $impeccable harden
- [P1] Desktop ~2.000px sem contato — header compacto no scroll-up ou CTAs após o FAQ. $impeccable layout
- [P2] Piso desktop 11,5px não cumprido — subir para 11,5px ou corrigir DEC-033. $impeccable typeset
- [P2] Resultado do toque não explicado; passo 03 circular — microcopy + reescrita (CONTENT.md). $impeccable clarify
- [P2] Alvos de toque do footer pequenos — área de 44px via padding. $impeccable adapt

## Personas
- Jordan: não sabe o que o toque faz; sem valores no FAQ; Sobre vazio.
- Riley: barra cobre FAQ 05/06; desktop sem contato; toggle extra em 360×640; barra sobre o título do CTA final em 390.
- Casey: paisagem sem H1; WhatsApp sem glifo; links do footer pequenos.

## Menores
Base vermelha no mapa sem legenda no mobile; vazio em Serviços desktop; Como funciona desktop só WhatsApp; número só no footer; dois blocos pretos empilhados em 390.

## Perguntas
1. Glifo do WhatsApp vs pureza da marca?
2. Sobre antes de Serviços?
3. Linha factual de segurança?
