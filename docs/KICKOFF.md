# Kickoff — primeira mensagem para o Claude Code

Use esta mensagem depois de colocar esta documentação no repositório e adicionar o export final em `docs/reference/`.

```text
Comece pela FASE 1 definida em CLAUDE.md.

Leia toda a documentação do projeto antes de alterar arquivos, com prioridade para:
- docs/SOURCE-OF-TRUTH.md
- docs/PRODUCT.md
- docs/CONTENT.md
- docs/DESIGN.md
- docs/DESIGN-REFERENCE.md
- docs/ARCHITECTURE.md
- docs/IMPLEMENTATION.md
- docs/ASSETS.md
- docs/SEO-ANALYTICS.md
- docs/ACCESSIBILITY.md
- docs/PERFORMANCE.md
- docs/QA.md
- docs/DECISIONS.md
- docs/OPEN-ITEMS.md

Depois analise todos os arquivos em docs/reference/ e o estado atual do repositório.

Nesta primeira resposta, não implemente ainda.

Entregue:
1. diagnóstico do repositório;
2. stack detectada/recomendada;
3. inventário dos assets encontrados;
4. diferenças ou riscos entre referência desktop e mobile;
5. dados ainda pendentes que bloqueiam produção;
6. plano de implementação por fases;
7. estrutura de arquivos proposta;
8. dependências realmente necessárias, se houver.

Não proponha redesign.
Não invente conteúdo.
Não altere a cobertura confirmada.
A referência visual é especificação, e a documentação factual vence qualquer dado não confirmado presente no mockup.
```

Após revisar o plano, se estiver correto, use:

```text
Plano aprovado. Execute as fases de implementação até o QA final com autonomia.

Não pare entre fases para pedir confirmação, exceto se encontrar um bloqueio que exija informação comercial não confirmada e que não possa ser mantida como configuração pendente.

Compare continuamente a implementação com a referência desktop 1440 e mobile 390. Ao final, execute lint, typecheck, build e o checklist de docs/QA.md.
```
