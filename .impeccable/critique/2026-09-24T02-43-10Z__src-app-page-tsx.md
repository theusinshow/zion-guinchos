---
target: landing page inteira
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Dev\\webdesign\\landing-pages\\zion-guincho\\src\\app\\page.tsx"
target_fingerprint: "sha256:c9a74e4613c120cad234f45c57a5fd8a3f8d3c345caa6326ec50c3f098118046"
target_path: "C:\\Dev\\webdesign\\landing-pages\\zion-guincho\\src\\app\\page.tsx"
timestamp: 2026-09-24T02-43-10Z
slug: src-app-page-tsx
---
# Critique — Zion Guincho landing (src/app/page.tsx)

Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score
| # | Heurística | Nota | Problema-chave |
|---|---|---|---|
| 1 | Visibilidade do status | 3 | CTAs pendentes mudam cor e animam seta no hover como se funcionassem |
| 2 | Linguagem do mundo real | 3 | Rótulos mono (GUINCHO / TRANSPORTE / ASSISTÊNCIA) soam como anotação de designer |
| 3 | Controle e liberdade | 3 | Header não fixo: voltar a um contato exige rolar |
| 4 | Consistência | 3 | Mesma ação WhatsApp com 5 rótulos; "Solicitar guincho" não diz o canal |
| 5 | Prevenção de erro | 2 | "Enviar minha localização" só pré-preenche texto |
| 6 | Reconhecer vs lembrar | 2 | Número só aparece no footer |
| 7 | Flexibilidade | 2 | Nenhum atalho de contato persistente após a Hero (DEC-023) |
| 8 | Estética e minimalismo | 3 | Cidades ~10x, trio base/24h/cobertura 3x |
| 9 | Recuperação de erro | 2 | WhatsApp falhou → nenhum número visível de fallback |
| 10 | Ajuda | 3 | FAQ de 6, acessível |
| Total | | 27/40 | Aceitável |

## Especificidade
Autoral: grid editorial com hairlines, display condensado pesado/leve, vermelho só como sinal, mapa desenhado, rota 01→02→03. Genérico: foto IA do caminhão, ícones de 16px em Serviços, repetição de fatos.
Detector CLI: 0 achados. Overlay (2560px): 35 padrões — all-caps-body 13, cramped-padding 11, undersized-ui-text 9, wide-tracking 7, tiny-text 5, hero-eyebrow-chip 1, line-length 1, buried-raster 1. Falsos positivos: caixa alta/tracking/eyebrow (DESIGN.md), cramped-padding (min-height), buried-raster (leão DEC-028). Real: microtexto 9–11px; line-length ~86ch UrgentCTA.

## Prioridades
- [P1] Contato some ao rolar no mobile — barra inferior Ligar+WhatsApp após a Hero, ou header fixo compacto (reverte DEC-023). $impeccable adapt
- [P1] CTAs da Hero abaixo da dobra em 390×700 e 1366×768 — regra por altura. $impeccable layout
- [P1] Sobre = bloco cinza vazio no momento de confiança — composição fallback + fotos reais. $impeccable harden
- [P2] Rótulos de CTA variam; "Enviar minha localização" promete demais — rótulos com canal + instrução (CONTENT.md). $impeccable clarify
- [P2] Microtexto mono 9–10,5px — piso 11–12px para informação. $impeccable typeset

## Personas
- Jordan: não sabe que "Solicitar guincho" abre WhatsApp; sem rosto/nome.
- Riley: localização "enviada"?; CTAs pendentes animam; FAQ single-open; desktop sem WhatsApp Web sem fallback.
- Casey: sem contato persistente; LIGAR no canto superior direito; 7 arquivos de fonte com swap.

## Menores
Ícones de Serviços ~16px; área morta em Serviços desktop; "–" no FAQ vs setas SVG; estilo dev para CTAs pendentes; line-length UrgentCTA. Contatos pendentes bloqueiam mídia paga.

## Perguntas
1. Por que o número só aparece no footer?
2. A foto de 260px vale tirar o WhatsApp da primeira tela?
3. Por que a pessoa prometida no Sobre nunca aparece?
4. Uma barra fixa substituiria CTAs repetidos?
