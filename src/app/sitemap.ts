import type { MetadataRoute } from 'next'
import { indexable, siteUrl } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable || !siteUrl) return []
  return [{ url: `${siteUrl}/`, changeFrequency: 'monthly', priority: 1 }]
}
