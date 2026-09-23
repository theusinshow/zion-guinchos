# Open Items

Itens que precisam ser confirmados antes do deploy final.

## P0 — bloqueadores de conversão

- [ ] Número de WhatsApp.
- [ ] Número de telefone para ligação.

Sem esses dados a landing page não pode ser considerada pronta para mídia paga.

## P1 — produção/negócio

- [ ] Confirmar CNPJ que pode ser publicado no footer, se aplicável.
- [ ] Confirmar política de privacidade final.
- [ ] Definir domínio definitivo.
- [ ] Confirmar Google Business Profile, se existir.
- [ ] Confirmar Instagram, se vier a existir.

## P1 — assets

- [ ] Logo horizontal em SVG.
- [ ] Símbolo do leão em SVG.
- [ ] Versão branca do logo.
- [ ] Versão preta do logo.
- [ ] Favicon.
- [ ] Foto real do caminhão para substituir placeholder de IA na Hero.
- [ ] Foto real para a seção Sobre. **Bloqueia produção:** a referência v2 só tem slot vazio; implementação usa bloco neutro (DEC-021).
- [ ] Open Graph image.

## P2 — informações comerciais

Confirmar antes de mencionar:

- [ ] PIX.
- [ ] Dinheiro.
- [ ] Débito.
- [ ] Crédito.
- [ ] Falta de combustível como serviço.
- [ ] Troca de pneu.
- [ ] Seguro do veículo transportado.
- [ ] Equipamentos/diferenciais específicos.

Observação: em conversa preliminar foi sugerido trabalhar provisoriamente com PIX, dinheiro, débito e crédito, mas isso não está confirmado o suficiente para publicação.

## P2 — analytics

- [ ] GA4 Measurement ID.
- [ ] Google Ads ID.
- [ ] Conversion label(s).
- [ ] Estratégia de consentimento/cookies. (Implementação pronta com consent mode v2 em default negado; ponto único `updateConsent()`.)

## P2 — deploy

- [ ] Plataforma de deploy.
- [ ] DNS.
- [ ] domínio/canonical.
- [ ] ambiente de preview.

## Dados que NÃO devem ser inferidos

- tempo médio de chegada;
- anos de experiência;
- quantidade de atendimentos;
- avaliações;
- preço;
- cidades extras;
- endereço exato;
- coordenadas;
- tamanho de equipe;
- mais de um caminhão.

## Estado técnico (Tech Lead)

A guarda `ZION_RELEASE=1 pnpm build` bloqueia a publicação enquanto faltarem: telefone, WhatsApp, domínio (`NEXT_PUBLIC_SITE_URL`), URL da Política de Privacidade e foto do Sobre. Favicon atual é recorte do símbolo raster fornecido (trocar pelo SVG oficial).
