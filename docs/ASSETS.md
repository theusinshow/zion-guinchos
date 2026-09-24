# Assets

## 1. Estado atual

Originais do logo fornecidos pelo cliente: `docs/assets/logo-original/`. Versões usadas no site: `public/brand/`. Favicon: `src/app/icon.png`, `apple-icon.png`, `favicon.ico` (recorte do símbolo raster; trocar pelo SVG oficial).

O export do design contém os seguintes assets de referência:

### Logo / símbolo

- `uploads/1.jpg`
- `uploads/2.jpg`

São imagens raster fornecidas como identidade inicial. O site final deve preferir SVG vetorizado quando disponível.

Uso esperado:

- logo horizontal no Header/Footer;
- símbolo do leão como elemento de marca;
- versão clara/escura conforme fundo.

### Hero truck

- `uploads/Gemini_Generated_Image_denn4hdenn4hdenn.jpg`
- dimensão observada: 2752 × 1536

É uma imagem gerada por IA usada como placeholder visual do caminhão cinza.

Não afirmar que esse é literalmente o caminhão da Zion. Substituir por foto real quando disponível.

### Mapa de referência

- `uploads/pasted-1790134648967-0.png`

É referência geográfica intermediária, não uma fonte de cobertura comercial.

Não publicar as cidades extras contidas nessa imagem como áreas atendidas confirmadas.

### Placeholders de IA fornecidos pelo cliente (2026-09-24, DEC-037)

Originais PNG em `docs/assets/generated/`; versões WebP servidas de `public/images/generated/`.

- `zion-hero-truck-v2.webp` (1672×941) — Hero. Substitui `hero-truck.jpg`.
- `zion-about-truck.webp` (1679×937) — slot do Sobre. Não libera release (`aboutImageIsPlaceholder`).
- `zion-truck-with-car.webp` / `zion-truck-with-motorcycle.webp` (1678×937) — par de fotos em Serviços (serviços 02 e 03).
- `zion-og-background.webp` (1200×630) — convertido para `src/app/opengraph-image.jpg`.
- `zion-truck-with-boat-concept.png` — **não usado**: transporte de embarcação não é serviço confirmado (PRODUCT.md §6). Só o original fica em `docs/assets/generated/`; não há versão em `public/` (não é publicado).

Todos são IA: alt vazio (decorativos, DEC-020) e nunca apresentados como o caminhão real da Zion.

## 2. Assets necessários para produção

### Prioridade alta

- logo horizontal Zion em SVG;
- símbolo do leão isolado em SVG;
- versão preta;
- versão branca;
- favicon;
- fotografia real do caminhão para Hero;
- fotografia real para seção Sobre, idealmente proprietário + caminhão ou operação.

### Prioridade média

- 1–2 detalhes reais do equipamento: gancho, plataforma, cabo ou cabine;
- Open Graph image 1200×630.

## 3. Regras de imagem

- Preferir AVIF/WebP em produção.
- Manter original de alta qualidade no pipeline quando possível.
- Hero deve ter `priority`/preload somente se necessário para LCP.
- Imagens abaixo da dobra devem usar lazy loading.
- Definir `sizes` corretamente.
- Evitar base64 inline para imagens grandes.
- Definir `object-position` por breakpoint quando necessário.

## 4. Direção fotográfica

- caminhão cinza/grafite;
- estética automotiva editorial;
- tons neutros;
- luz suave;
- ambiente simples;
- contraste controlado;
- sem neon;
- sem flare;
- sem drama cinematográfico exagerado;
- sem banco de imagem genérico.

## 5. Não usar

- fotos de guinchos aleatórios como se fossem da Zion;
- logotipos de terceiros;
- placas/números fictícios legíveis;
- caminhão futurista;
- assets de IA que contradigam o equipamento real quando as fotos definitivas existirem.
