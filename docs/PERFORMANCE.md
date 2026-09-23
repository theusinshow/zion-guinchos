# Performance

## 1. Por que importa

A landing page receberá tráfego pago. Tempo de carregamento afeta experiência, conversão e eficiência da mídia.

## 2. Metas

Metas de Lighthouse em condições razoáveis:

- Performance: >= 90
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95

Core Web Vitals:

- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1

Tratar como metas, não como justificativa para distorcer o design.

## 3. Hero/LCP

Provável LCP: imagem ou H1 da Hero.

- otimizar imagem;
- usar dimensões corretas;
- `sizes` adequado;
- preload/priority somente para o asset LCP real;
- evitar JavaScript para renderizar Hero;
- evitar fade/mask e efeitos caros.

## 4. Imagens

- AVIF/WebP;
- responsivas;
- lazy abaixo da dobra;
- sem PNG grande quando não necessário;
- compressão visualmente aceitável;
- preservar qualidade da fotografia automotiva.

## 5. Fontes

Usar somente pesos necessários.

Sugestão inicial:

- Barlow Condensed: 400, 700, 800
- Archivo: 400, 500, 600
- IBM Plex Mono: 400, 500, 600 se todos forem realmente usados

Revisar o bundle final e reduzir pesos.

## 6. JavaScript

- mínimo possível;
- não hidratar seções estáticas;
- menu e FAQ são as interações principais;
- tracking deve ser carregado de forma responsável;
- evitar bibliotecas de motion pesadas.

## 7. CSS

- evitar CSS duplicado;
- evitar inline styles gigantes na implementação final, mesmo que o export de design use inline styles;
- criar regras claras e específicas para o sistema editorial.

## 8. Terceiros

Cada script de terceiro deve justificar seu custo.

Antes de ativar GA4/Google Ads, medir impacto e aplicar estratégia de carregamento apropriada.
