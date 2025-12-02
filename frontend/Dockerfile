# ============================================
# ステージ1: 依存関係のインストール
# ============================================
FROM node:22-alpine AS deps
WORKDIR /app

# パッケージファイルのコピー（キャッシュ最適化のため先にコピー）
COPY package*.json ./

# 依存関係のインストール（本番用のみ）
RUN npm ci --only=production && \
    npm cache clean --force

# ============================================
# ステージ2: ビルドステージ
# ============================================
FROM node:22-alpine AS builder
WORKDIR /app

# ビルド用の依存関係をインストール
COPY package*.json ./
RUN npm ci

# アプリケーションコードのコピー
COPY . .

# 環境変数の設定（ビルド時）
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Next.jsアプリケーションのビルド（Turbopack使用）
RUN npm run build

# ============================================
# ステージ3: 本番用ランタイム
# ============================================
FROM node:22-alpine AS runner
WORKDIR /app

# セキュリティのため非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 環境変数の設定
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 本番用のファイルのみをコピー
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

# 非rootユーザーに切り替え
USER nextjs

# ポート公開
EXPOSE 3000

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 本番サーバーの起動
CMD ["node", "server.js"]

# ============================================
# 開発環境用のステージ
# ============================================
FROM node:22-alpine AS dev
WORKDIR /app

# パッケージファイルのコピー
COPY package*.json ./

# 全ての依存関係のインストール
RUN npm ci

# アプリケーションコードのコピー
COPY . .

# 環境変数の設定
ENV NEXT_TELEMETRY_DISABLED=1

# ポート公開
EXPOSE 3000

# 開発サーバーの起動（Turbopack有効）
CMD ["npm", "run", "dev"]

