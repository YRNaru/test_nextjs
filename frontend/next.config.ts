import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Dockerとホットリロード設定
  webpack: (config, { isServer }) => {
    // ファイル変更の監視を有効化（Docker/WSL環境用）
    if (!isServer) {
      config.watchOptions = {
        poll: 1000, // 1秒ごとにファイル変更をチェック
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
