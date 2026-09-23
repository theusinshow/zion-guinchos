# Deploy — Vercel

Guia de publicação da landing page Zion Guincho na Vercel.

## Resumo

- Framework: **Next.js** (detectado automaticamente)
- Gerenciador: **pnpm 11** (fixado em `package.json` → `packageManager`)
- Node: **20.9+** (recomendado 22.x)
- Página estática; não precisa de banco nem de funções de servidor
- Otimização de imagem: feita pela Vercel via `next/image`

## 1. Importar o projeto

1. Na Vercel: **Add New → Project** → importar `theusinshow/zion-guinchos`.
2. Framework Preset: **Next.js**. Root Directory: `./`.
3. Build Command, Install Command e Output: deixar nos padrões.

## 2. Configurar o pnpm 11

O projeto usa pnpm 11 (`packageManager: pnpm@11.3.0`, com `allowBuilds` em `pnpm-workspace.yaml`). Para a Vercel usar exatamente essa versão, crie esta variável em **Settings → Environment Variables**, para todos os ambientes:

| Nome | Valor |
|---|---|
| `ENABLE_EXPERIMENTAL_COREPACK` | `1` |

Sem ela, a Vercel escolhe a versão do pnpm pelo lockfile, o que normalmente também funciona. Se o install falhar por versão do pnpm, essa variável resolve.

## 3. Ambientes e variáveis

A página tem dois modos, controlados por variáveis de ambiente:

| Modo | Quando usar | Comportamento |
|---|---|---|
| **Preview / homologação** | Enquanto faltarem dados comerciais | Build normal; `noindex` e `Disallow: /`; CTAs sem número ficam inertes |
| **Release** | Com todos os dados confirmados | `ZION_RELEASE=1`; o build falha se faltar item obrigatório; indexação liberada com domínio |

### Preview (pode fazer já)

Nenhuma variável é obrigatória. O deploy gera uma URL `*.vercel.app` sem indexação, boa para revisar com o cliente.

### Produção (release)

Em **Settings → Environment Variables → Production**:

| Variável | Valor | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://dominio-definitivo.com.br` | Sim |
| `ZION_RELEASE` | `1` | Sim (só em Production) |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXX` | Não |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-XXXXXXX` | Não |
| `NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP` | label | Não |
| `NEXT_PUBLIC_GOOGLE_ADS_LABEL_PHONE` | label | Não |
| `NEXT_PUBLIC_GOOGLE_ADS_LABEL_LOCATION` | label | Não |

> **Não defina `ZION_RELEASE=1` antes de preencher os dados.** O build de produção vai falhar de propósito, listando o que falta. É a guarda que impede publicar anúncios com botões sem destino.

Variáveis `NEXT_PUBLIC_*` entram no bundle durante o build. Depois de alterá-las, faça **Redeploy**.

## 4. Antes do release: checklist

No código (`src/config/business.ts`):

- [ ] `phoneE164` e `phoneDisplay`
- [ ] `whatsappE164` e `whatsappDisplay`
- [ ] `privacyPolicyUrl` (página publicada)
- [ ] `aboutImage` (foto real em `public/images/`)

Na Vercel:

- [ ] Domínio conectado (Settings → Domains) e `NEXT_PUBLIC_SITE_URL` igual a ele
- [ ] `ZION_RELEASE=1` em Production
- [ ] Redeploy

Para validar localmente antes de subir:

```bash
ZION_RELEASE=1 NEXT_PUBLIC_SITE_URL=https://dominio.com.br pnpm build
```

## 5. Depois do deploy

- [ ] `https://dominio/robots.txt` com `Allow` e `Sitemap:`
- [ ] `https://dominio/sitemap.xml` com a URL canônica
- [ ] Código-fonte da página com `<link rel="canonical">` e sem `noindex`
- [ ] Botões de WhatsApp e Ligar abrindo o destino certo (testar no celular)
- [ ] Com IDs configurados: eventos no GA4 DebugView (`whatsapp_click`, `phone_click`, `location_cta_click` e os posicionais)
- [ ] Lighthouse em produção (metas em `docs/PERFORMANCE.md`)

## Observações

- **Consentimento:** o consent mode v2 começa negado. Enquanto nenhuma CMP chamar `updateConsent()`, o GA4 e o Ads operam em modo sem cookies (pings anônimos). Defina a estratégia de consentimento antes de depender dos números de conversão (`OPEN-ITEMS.md`, P2).
- **Previews de branch:** ficam sempre com `noindex`, porque `ZION_RELEASE` só existe em Production.
- **Imagem do caminhão:** é placeholder gerado por IA (`ASSETS.md`). Substitua `public/images/hero-truck.jpg` pela foto real mantendo o enquadramento 3/4.
