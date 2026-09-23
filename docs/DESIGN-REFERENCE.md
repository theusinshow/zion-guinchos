# Design Reference

## Arquivo principal

Use como referência visual final:

`docs/reference/Zion Landing Page v2.dc.html`

Ele contém desktop 1440 e mobile 390.

## Arquivos auxiliares do export

Se disponíveis, mantenha em `docs/reference/`:

- `support.js`
- `image-slot.js`
- `uploads/1.jpg`
- `uploads/2.jpg`
- `uploads/Gemini_Generated_Image_denn4hdenn4hdenn.jpg`
- demais assets necessários para abrir o export localmente

Não copie a implementação HTML inline do export diretamente para produção. Use-a para medir e comparar composição.

## Ordem visual aprovada

1. Header
2. Hero
3. Serviços
4. Como funciona
5. CTA de urgência
6. Área de atendimento
7. Sobre
8. Dúvidas/FAQ
9. CTA final
10. Footer

## Canvas de comparação

- Desktop de referência: 1440px
- Mobile de referência: 390px

A implementação deve ser comparada lado a lado nesses dois tamanhos antes de ajuste dos demais breakpoints.

## Correções factuais que vencem o mockup

A referência visual contém cidades extras na área de atendimento. Não reproduzir essas cidades.

Use somente:

- Palhoça
- São José
- Florianópolis

Mais:

`Outras cidades sob consulta.`

## Assets temporários

A imagem do caminhão no design é um placeholder gerado por IA.

Ela pode ser usada na fase de implementação para preservar o design, mas deve estar claramente tratada como asset temporário e substituível.

## Regra para pixel fidelity

Não é necessário copiar literalmente cada inline style do export. O objetivo é reproduzir:

- proporção;
- hierarquia;
- alinhamento;
- espaçamento;
- tipografia;
- ritmo;
- comportamento responsivo;
- materialidade visual.

Se houver divergência pequena entre pixels do export e uma implementação mais robusta que mantém a aparência, priorizar a robustez. Se houver divergência perceptível, aproximar da referência.
