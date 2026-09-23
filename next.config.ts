import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // O indicador do dev polui a QA visual (qa/compare.py).
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75],
  },
}

export default nextConfig
