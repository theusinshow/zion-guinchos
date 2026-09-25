# SEO & Analytics

## 1. Objetivo

A página é orientada a Google Ads, mas deve nascer tecnicamente sólida para busca local e compartilhamento.

## 2. Metadata inicial

### Title

`Zion Guincho 24h | Palhoça, São José e Florianópolis`

### Meta description

Sugestão:

`Guincho e auto socorro 24h em Palhoça, São José e Florianópolis para carros, motos e utilitários. Fale com a Zion por WhatsApp ou ligação.`

Revisar quando telefone/serviços finais forem confirmados.

## 3. Estrutura semântica

- um único H1;
- H2 por seção principal;
- headings não usados apenas por estilo;
- anchors com IDs legíveis;
- `main`, `nav`, `section`, `footer`.

IDs sugeridos:

- `#servicos`
- `#area-de-atendimento`
- `#sobre`
- `#duvidas`

## 4. Local SEO

Termos naturais permitidos na copy:

- guincho 24h Palhoça;
- guincho São José;
- guincho Florianópolis;
- auto socorro;
- transporte de veículos.

Não keyword-stuff.

Não criar páginas de cidade nesta primeira entrega sem estratégia própria.

## 5. Structured Data

Usar schema apropriado a negócio local/serviço automotivo apenas com informações confirmadas.

Não preencher por inferência:

- rating;
- reviewCount;
- address exato;
- geo;
- priceRange;
- telephone enquanto pendente;
- openingHours além do 24h confirmado, se houver ambiguidade de representação.

## 6. Canonical, sitemap e robots

- canonical absoluto na produção;
- `sitemap.xml`;
- `robots.txt`;
- ambiente de preview/staging deve evitar indexação se necessário.

## 7. Open Graph

Preparar:

- `og:title`;
- `og:description`;
- `og:image` 1200×630;
- URL canônica;
- locale `pt_BR`.

## 8. Analytics

Preparar integração centralizada com GA4/Google Ads, sem IDs falsos.

Eventos mínimos:

- `whatsapp_click`
- `phone_click`
- `location_cta_click`

Eventos por posição:

- `hero_whatsapp_click`
- `hero_phone_click`
- `urgent_cta_whatsapp_click`
- `urgent_cta_phone_click`
- `final_whatsapp_click`
- `final_phone_click`

Dados úteis por evento:

- `placement`
- `device_type` quando disponível via analytics, não precisa inferir manualmente
- `page_path`

## 9. UTMs

Não quebrar parâmetros UTM durante navegação/CTA.

Se for necessário enviar contexto de campanha ao WhatsApp ou analytics, fazer de forma deliberada e sem poluir a mensagem do usuário.

## 10. Privacidade e consentimento

A estratégia de consentimento deve ser definida antes de ativar tags de marketing em produção.

Não adicionar banner genérico apenas para cumprir checklist sem entender quais tags/cookies estarão ativos.

Arquitetar a integração para permitir consent mode/configuração posterior.
