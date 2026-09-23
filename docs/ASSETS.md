# Assets

## 1. Estado atual

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
