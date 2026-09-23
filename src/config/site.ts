/**
 * Configuração de publicação (servidor/build). Sem domínio inventado:
 * NEXT_PUBLIC_SITE_URL ausente ⇒ sem canonical/og:url e sem indexação.
 */
function parseSiteUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : null
  } catch {
    return null
  }
}

export const siteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)

/** Build de publicação (DEC-024): ZION_RELEASE=1. */
export const isRelease = process.env.ZION_RELEASE === '1'

/** Indexação só com domínio definido E build de release; previews ficam fora dos buscadores. */
export const indexable = Boolean(siteUrl) && isRelease
