import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Next.js 16 Configuration */
  
  // パフォーマンス最適化
  reactStrictMode: true,
  
  // Standalone出力（Dockerで最適）
  output: 'standalone',
  
  // Turbopack設定（Next.js 16でデフォルト有効）
  turbopack: {},
  
  // 画像最適化設定
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1年
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Next.js 16: デフォルト動作の変更
    unoptimized: false,
  },
  
  // 圧縮設定
  compress: true,
  
  // Production最適化
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // 実験的機能の有効化
  experimental: {
    // Next.js 16の新機能
    optimizeCss: true,
    optimizePackageImports: ['react-bootstrap', 'bootstrap', 'axios'],
    // キャッシュ設定の改善
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
  
  // ヘッダー設定（セキュリティ＆パフォーマンス）
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
