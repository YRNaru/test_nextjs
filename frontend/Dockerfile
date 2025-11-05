FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# パッケージファイルのコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm ci

# アプリケーションコードのコピー
COPY . .

# ビルド（本番環境用）
# RUN npm run build

# ポート公開
EXPOSE 3000

# 開発サーバーの起動
CMD ["npm", "run", "dev"]

# 本番環境用のコマンド（上記のビルドのコメントを解除した場合）
# CMD ["npm", "start"]

