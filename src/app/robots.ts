import type { MetadataRoute } from 'next'
import { indexable, siteUrl } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  if (!indexable || !siteUrl) return { rules: { userAgent: '*', disallow: '/' } }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
