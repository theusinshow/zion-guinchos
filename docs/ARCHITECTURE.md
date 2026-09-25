# Architecture

## 1. Objetivo técnico

Implementar uma landing page estática, rápida, sem backend obrigatório e com baixo custo de manutenção.

## 2. Stack recomendada

Se o repositório estiver vazio:

- Next.js App Router
- TypeScript strict
- React
- CSS Modules/global CSS ou Tailwind CSS
- `next/font` quando aplicável
- `next/image` para imagens raster

Escolha CSS vs Tailwind pela fidelidade e legibilidade do projeto. Não usar Tailwind apenas por padrão se a referência exigir muitas regras editoriais específicas mais claras em CSS.

## 3. Estrutura sugerida

```text
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  ├─ sitemap.ts
│  └─ robots.ts
├─ components/
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ Services.tsx
│  ├─ UrgentCTA.tsx
│  ├─ ServiceArea.tsx
│  ├─ About.tsx
│  ├─ FAQ.tsx
│  ├─ FinalCTA.tsx
│  ├─ Footer.tsx
│  └─ MobileActionBar.tsx
├─ config/
│  └─ business.ts
├─ lib/
│  ├─ contact.ts
│  └─ analytics.ts
└─ styles/
   └─ tokens.css        # opcional

public/
├─ brand/
└─ images/

docs/
└─ reference/
```

Não é necessário criar exatamente essa árvore se o projeto existente já tiver convenções fortes.

## 4. Configuração central do negócio

Criar uma única fonte para dados operacionais:

```ts
export const business = {
  name: 'Zion Guincho',
  baseCity: 'Palhoça',
  state: 'SC',
  phoneE164: null,
  phoneDisplay: null,
  whatsappE164: null,
  serviceAreas: ['Palhoça', 'São José', 'Florianópolis'],
  is24Hours: true,
} as const
```

Os campos pendentes devem ser `null`/configuráveis. Não inventar números.

## 5. Helpers

### Contato

Um helper central deve construir:

- `tel:`
- URL do WhatsApp
- mensagem pré-preenchida

### Analytics

Um helper central deve receber nome do evento e metadata, sem espalhar `gtag()` pelos componentes.

## 6. Server vs client

Manter a maior parte da página como Server Components/HTML estático.

Client Components somente quando necessário para:

- menu mobile;
- FAQ accordion;
- tracking de interação, se não houver abordagem alternativa;
- pequenas interações aprovadas.

## 7. Estado

Não usar gerenciador global de estado.

## 8. Dependências

Evitar dependências pesadas para:

- accordion;
- menu;
- animação básica;
- ícones simples.

Se usar biblioteca de ícones, tree-shake e importe apenas o necessário.

## 9. Ambiente

Variáveis possíveis:

```text
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
```

Telefone e WhatsApp podem estar em config versionada se forem públicos e confirmados. Se preferir ambiente, documentar claramente.
