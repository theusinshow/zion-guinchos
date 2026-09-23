import type { NextConfig } from 'next'
import { enforceRelease } from './scripts/release-check'

// Guarda de release (DEC-024): com ZION_RELEASE=1 o build falha listando o que falta.
enforceRelease(__dirname)

const nextConfig: NextConfig = {
  // O indicador do dev polui a QA visual (qa/compare.py).
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
  },
}

export default nextConfig
