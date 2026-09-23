# Source of Truth

Este documento define qual fonte vence quando design, conteúdo e dados comerciais divergem.

## 1. Fatos do negócio

Fontes canônicas:

- `PRODUCT.md`
- `CONTENT.md`
- `OPEN-ITEMS.md`

Esses arquivos vencem qualquer texto presente em mockups intermediários.

### Confirmado

- Marca: Zion Guincho.
- Base: Palhoça/SC.
- Atendimento principal: Palhoça, São José e Florianópolis.
- Atendimento: 24 horas, todos os dias, incluindo finais de semana e feriados.
- Outras cidades/destinos: sob consulta.
- Operação atual: um caminhão e atendimento direto pelo proprietário.
- A operação/marca é nova, mas o profissional possui experiência anterior no segmento.
- Atende carros.
- Atende motos.
- Atende caminhonetes/utilitários.
- Atende veículos rebaixados.
- Atende veículos acidentados.
- Realiza transporte agendado.
- Atende pane mecânica e elétrica.
- Realiza auxílio de bateria.
- Realiza transportes entre cidades sob consulta.

### Não confirmado

- telefone;
- WhatsApp;
- e-mail;
- Instagram;
- Google Business Profile;
- CNPJ para publicação;
- endereço público;
- formas de pagamento definitivas;
- preço/faixa de preço;
- tempo médio de chegada;
- seguro;
- número de anos de experiência;
- avaliações;
- métricas de atendimento.

## 2. Visual

A referência visual final é o arquivo exportado da versão aprovada da landing page, atualmente identificado como:

`Zion Landing Page v2.dc.html`

Use também a versão mobile contida no mesmo documento.

O arquivo deve ser colocado em:

`docs/reference/Zion Landing Page v2.dc.html`

Assets de suporte do export também devem permanecer em `docs/reference/` para consulta visual, mas não precisam ser usados diretamente em produção.

## 3. Correções conhecidas sobre a referência visual

A referência visual contém uma versão de mapa/lista com cidades adicionais. **Não usar essas cidades como cobertura publicada.**

Cobertura confirmada:

- Palhoça
- São José
- Florianópolis

Texto permitido:

> Outros destinos e cidades sob consulta.

A imagem do caminhão usada na Hero é um asset gerado por IA e deve ser tratada como placeholder até existir fotografia real do caminhão da Zion.

A seção Sobre ainda depende de fotografia real ou asset editorial aprovado.

## 4. Regra para conflito

- Conflito de dado factual: conteúdo/documentação vence.
- Conflito de aparência: design final vence.
- Conflito de comportamento técnico: documentação técnica vence, desde que não altere a aparência aprovada.
- Falta de informação: não inferir; consultar `OPEN-ITEMS.md`.
