# QA Checklist

## 1. Visual — breakpoints

Verificar manualmente:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## 2. Visual — geral

- [ ] Sem overflow horizontal.
- [ ] Barlow Condensed carregada corretamente.
- [ ] Archivo carregada corretamente.
- [ ] IBM Plex Mono carregada corretamente.
- [ ] Paleta correta.
- [ ] Radius 0 onde a referência usa 0.
- [ ] Hairlines consistentes.
- [ ] Vermelho não virou cor dominante.
- [ ] Sem shadows/gradients inventados.
- [ ] Sem cards genéricos adicionados.
- [ ] Quebras dos headings próximas da referência.
- [ ] Espaçamento vertical mantém o ritmo editorial.

## 3. Header

- [ ] Logo legível.
- [ ] Anchors corretos.
- [ ] CTA correto.
- [ ] Menu mobile abre/fecha.
- [ ] Menu acessível por teclado.
- [ ] Header não cobre conteúdo.

## 4. Hero

- [ ] Sem fade/gradient entre foto e background.
- [ ] Caminhão corretamente enquadrado.
- [ ] H1 não sobrepõe área visual inadequada.
- [ ] WhatsApp funciona quando dado for confirmado.
- [ ] Telefone funciona quando dado for confirmado.
- [ ] Microcopy correta.
- [ ] Info rail coerente desktop/mobile.

## 5. Serviços

- [ ] Quatro principais.
- [ ] Quatro complementares.
- [ ] Sem lista extra inventada.
- [ ] Ícones, se existentes, coerentes e não essenciais para entendimento.

## 6. Como funciona

- [ ] Fluxo 01 → 02 → 03 claro.
- [ ] Não depende de hover.
- [ ] Texto completo no mobile.

## 7. CTA urgência

- [ ] Curto.
- [ ] Não parece segunda Hero.
- [ ] CTA de localização dispara evento correto.

## 8. Área de atendimento

- [ ] Palhoça.
- [ ] São José.
- [ ] Florianópolis.
- [ ] Nenhuma cidade extra publicada como confirmada.
- [ ] "Outras cidades sob consulta" presente.

## 9. Sobre

- [ ] Não usa "equipe" ou "frota" indevidamente.
- [ ] Não mostra anos específicos inventados.
- [ ] Fotografia/placeholder não é apresentada falsamente como registro real se for IA.

## 10. FAQ

- [ ] Seis perguntas.
- [ ] Conteúdo igual ao `CONTENT.md`.
- [ ] Accordion por teclado.
- [ ] `aria-expanded` correto.
- [ ] Focus visível.

## 11. CTA final

- [ ] Leão de fundo sutil.
- [ ] Legibilidade forte.
- [ ] WhatsApp/ligação claros.
- [ ] Diferente do CTA urgência.

## 12. Footer

- [ ] Navegação correta.
- [ ] Região correta.
- [ ] CNPJ não publicado até confirmar.
- [ ] `SITE POR CODED BY M` presente.

## 13. Conteúdo factual

- [ ] Nenhuma avaliação fictícia.
- [ ] Nenhuma métrica fictícia.
- [ ] Nenhum tempo médio fictício.
- [ ] Nenhum preço fictício.
- [ ] Nenhum telefone fictício.
- [ ] Nenhuma forma de pagamento não confirmada.

## 14. SEO

- [ ] Title.
- [ ] Description.
- [ ] Canonical.
- [ ] Open Graph.
- [ ] H1 único.
- [ ] Heading hierarchy.
- [ ] Sitemap.
- [ ] Robots.
- [ ] Structured data sem campos inventados.

## 15. Tracking

- [ ] Hero WhatsApp.
- [ ] Hero phone.
- [ ] Urgent CTA WhatsApp.
- [ ] Urgent CTA phone.
- [ ] Location CTA.
- [ ] Final WhatsApp.
- [ ] Final phone.
- [ ] IDs vêm de configuração/ambiente.

## 16. Técnico

- [ ] `npm run lint` passa.
- [ ] typecheck passa.
- [ ] `npm run build` passa.
- [ ] zero erro de console.
- [ ] zero 404 de asset.
- [ ] links externos corretos.
- [ ] `prefers-reduced-motion` respeitado.

## 17. Anti-AI-slop final

Faça uma última varredura procurando elementos adicionados sem suporte na referência:

- pills;
- cards arredondados;
- glow;
- gradients;
- glass;
- badges;
- ícones excessivos;
- microtextos decorativos inventados;
- números/estatísticas;
- animações chamativas;
- centralização genérica;
- componentes que deixam todas as seções iguais.
