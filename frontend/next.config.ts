import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // パフォーマンス最適化
  reactStrictMode: true,
  
  // Standalone出力（Dockerで最適）
  output: 'standalone',
  
  // 画像最適化設定
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1年
  },
  
  // 圧縮設定
  compress: true,
  
  // Production最適化
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  
  // Swcコンパイラ最適化
  swcMinify: true,
  
  // 実験的機能の有効化
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-bootstrap', 'bootstrap'],
  },
  
  // Dockerとホットリロード設定
  webpack: (config, { isServer, dev }) => {
    // ファイル変更の監視を有効化（Docker/WSL環境用）
    if (!isServer && dev) {
      config.watchOptions = {
        poll: 1000, // 1秒ごとにファイル変更をチェック
        aggregateTimeout: 300,
      };
    }
    
    // Production用の最適化
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // 共通のReactライブラリ
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 20,
            },
            // その他のライブラリ
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: any) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )?.[1];
                return `npm.${packageName?.replace('@', '')}`;
              },
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
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
