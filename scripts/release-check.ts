/**
 * Guarda de release (DEC-024 + revisão 5). Executada pelo next.config.ts em todo build/dev;
 * só age com ZION_RELEASE=1. Erros bloqueiam o build; avisos apenas aparecem no log.
 */
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { business } from '../src/config/business'
import { isE164 } from '../src/lib/e164'

type Result = { errors: string[]; warnings: string[] }

function isHttpUrl(value: string | null | undefined): boolean {
  if (!value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function hasFile(dir: string, match: (name: string) => boolean): boolean {
  return existsSync(dir) && readdirSync(dir).some(match)
}

export function checkRelease(root: string, env: NodeJS.ProcessEnv): Result {
  const errors: string[] = []
  const warnings: string[] = []

  if (!isE164(business.phoneE164)) errors.push('business.phoneE164 — telefone confirmado em E.164 (P0)')
  if (!isE164(business.whatsappE164)) errors.push('business.whatsappE164 — WhatsApp confirmado em E.164 (P0)')
  if (!isHttpUrl(env.NEXT_PUBLIC_SITE_URL)) errors.push('NEXT_PUBLIC_SITE_URL — domínio definitivo (canonical, sitemap, robots)')
  if (!business.privacyPolicyUrl) errors.push('business.privacyPolicyUrl — Política de Privacidade publicada (P1)')
  if (!business.aboutImage || business.aboutImageIsPlaceholder)
    errors.push('business.aboutImage — foto real da seção Sobre (DEC-021; placeholder de IA não libera, DEC-037)')

  const brand = path.join(root, 'public', 'brand')
  const app = path.join(root, 'src', 'app')
  if (!hasFile(brand, (name) => name.endsWith('.svg'))) warnings.push('logo/símbolo em SVG ausente em public/brand (favicon e logo ainda raster)')
  if (!hasFile(app, (name) => name.startsWith('opengraph-image')) && !hasFile(path.join(root, 'public'), (name) => name.startsWith('og')))
    warnings.push('Open Graph image 1200×630 ausente')
  if (!env.NEXT_PUBLIC_GA_ID && !env.NEXT_PUBLIC_GOOGLE_ADS_ID) warnings.push('NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_GOOGLE_ADS_ID ausentes (sem analytics)')

  return { errors, warnings }
}

/** Lança erro (falha o build) se ZION_RELEASE=1 e faltar algum item obrigatório. */
export function enforceRelease(root: string, env: NodeJS.ProcessEnv = process.env): void {
  if (env.ZION_RELEASE !== '1') return
  const { errors, warnings } = checkRelease(root, env)
  const lines = [
    ...warnings.map((warning) => `  aviso: ${warning}`),
    ...errors.map((error) => `  FALTA: ${error}`),
  ]
  if (errors.length > 0) {
    throw new Error(`[zion] Release bloqueado (ZION_RELEASE=1). Itens obrigatórios pendentes:\n${lines.join('\n')}`)
  }
  if (warnings.length > 0) process.stdout.write(`[zion] Release liberado com avisos:\n${lines.join('\n')}\n`)
}
