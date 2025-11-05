# Test Next.js - フルスタックWebアプリケーション

React + TypeScript + Django REST Framework を使用した本格的なWebアプリケーション

## 📋 目次

- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [環境構築](#環境構築)
- [開発](#開発)
- [デプロイ](#デプロイ)
- [機能](#機能)

## 🚀 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 15.3.4
- **言語**: TypeScript
- **UI**: React 19 + React Bootstrap 5
- **認証**: Google OAuth 2.0
- **状態管理**: React Context API
- **HTTPクライアント**: Axios

### バックエンド
- **フレームワーク**: Django 4.2 + Django REST Framework
- **言語**: Python 3.11
- **認証**: JWT (Simple JWT)
- **データベース**: MySQL 8.0
- **タスクキュー**: Celery + Redis
- **WSGIサーバー**: Gunicorn

### インフラ
- **コンテナ**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **デプロイ**: Render
- **開発環境**: Cursor

## 📁 プロジェクト構成

```
test_nextjs/
├── frontend/                # Next.jsフロントエンド
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # Reactコンポーネント
│   │   ├── contexts/       # React Context
│   │   ├── hooks/          # カスタムフック
│   │   ├── lib/            # ユーティリティ
│   │   └── types/          # TypeScript型定義
│   ├── public/             # 静的ファイル
│   ├── Dockerfile
│   └── package.json
│
├── backend/                # Djangoバックエンド
│   ├── apps/
│   │   ├── users/         # ユーザー管理
│   │   └── authentication/ # 認証機能
│   ├── config/             # Django設定
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── celery.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── manage.py
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml      # GitHub Actions設定
├── docker-compose.yml     # Docker構成
├── render.yaml            # Render設定
└── env.example            # 環境変数サンプル
```

## 🛠 環境構築

### 📖 セットアップガイド

**環境に応じたガイドを選択してください：**

- 🐧 **WSL/Ubuntu**: [WSL_SETUP.md](WSL_SETUP.md) - WSL2とUbuntu環境での詳細なセットアップ手順
- ⚡ **クイックスタート**: [QUICK_START.md](QUICK_START.md) - 5分で起動する最速ガイド
- 📚 **詳細ガイド**: [SETUP_GUIDE.md](SETUP_GUIDE.md) - 完全なセットアップ手順とトラブルシューティング
- 🔄 **CI/CD**: [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) - GitHub Actions設定とデプロイガイド

### 前提条件

- Docker & Docker Compose
- Git
- Node.js 20+ (ローカル開発の場合)
- Python 3.11+ (ローカル開発の場合)

### セットアップ手順

1. **リポジトリのクローン**

```bash
git clone <repository-url>
cd test_nextjs
```

2. **環境変数の設定**

```bash
# env.exampleをコピーして.envを作成
cp env.example .env

# .envファイルを編集して必要な値を設定
# 特に以下の項目は必須:
# - SECRET_KEY
# - DB_PASSWORD
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
```

3. **Google OAuth認証情報の取得**

[Google Cloud Console](https://console.cloud.google.com/)で:
- 新しいプロジェクトを作成
- OAuth 2.0クライアントIDを作成
- 承認済みのリダイレクトURIを追加: `http://localhost:3000`
- クライアントIDとシークレットを`.env`に設定

4. **Dockerコンテナの起動**

```bash
# すべてのサービスを起動
docker-compose up -d

# ログを確認
docker-compose logs -f
```

5. **データベースのマイグレーション**

```bash
# バックエンドコンテナに入る
docker-compose exec backend sh

# マイグレーションを実行
python manage.py migrate

# スーパーユーザーを作成
python manage.py createsuperuser

# 静的ファイルを収集
python manage.py collectstatic --noinput

# コンテナから抜ける
exit
```

6. **アクセス確認**

- フロントエンド: http://localhost:3000
- バックエンドAPI: http://localhost:8000/api
- Django管理画面: http://localhost:8000/admin

## 💻 開発

### ローカル開発（Docker使用）

```bash
# 全サービスを起動
docker-compose up -d

# 特定のサービスのみ起動
docker-compose up -d frontend backend db redis

# ログを確認
docker-compose logs -f frontend
docker-compose logs -f backend

# サービスを停止
docker-compose down

# ボリュームも削除して完全にクリーンアップ
docker-compose down -v
```

### フロントエンド開発

```bash
cd frontend

# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# Lint
npm run lint
```

### バックエンド開発

```bash
cd backend

# 仮想環境の作成
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 依存関係のインストール
pip install -r requirements.txt

# マイグレーション作成
python manage.py makemigrations

# マイグレーション実行
python manage.py migrate

# 開発サーバー起動
python manage.py runserver

# テスト実行
python manage.py test

# Celeryワーカー起動
celery -A config worker -l info

# Celery Beat起動
celery -A config beat -l info
```

## 🚢 デプロイ

### Renderへのデプロイ

1. **Renderアカウントの作成**
   - [Render](https://render.com/)にサインアップ

2. **リポジトリの接続**
   - GitHubリポジトリを接続

3. **環境変数の設定**
   - Renderダッシュボードで各サービスの環境変数を設定

4. **デプロイ実行**
   - `render.yaml`が自動的に検出され、サービスがデプロイされます
   - または手動でデプロイフックをトリガー

### GitHub Actionsの設定

1. **GitHubシークレットの設定**
   - Settings > Secrets and variables > Actions
   - 以下のシークレットを設定:
     - `DOCKER_USERNAME`: Docker Hubユーザー名
     - `DOCKER_PASSWORD`: Docker Hubパスワードまたはアクセストークン
     - `RENDER_DEPLOY_HOOK_URL`: RenderのDeploy Hook URL

2. **自動デプロイ**
   - `main`ブランチへのプッシュで自動的にテスト・ビルド・デプロイ
   - Pull Request時は自動的にテストが実行される

## ✨ 機能

### 認証機能
- ✅ メール/パスワード認証
- ✅ Google OAuth 2.0ログイン
- ✅ JWT認証
- ✅ トークンリフレッシュ
- ✅ ログアウト

### ユーザー管理
- ✅ ユーザー登録
- ✅ プロフィール表示/編集
- ✅ アバター画像アップロード
- ✅ ユーザー一覧（管理者のみ）

### React学習コンテンツ
- ✅ React基礎学習
- ✅ TypeScript学習
- ✅ Next.js学習
- ✅ クイズ機能

### 定期タスク
- ✅ Celeryによる非同期タスク処理
- ✅ 定期実行タスク（Celery Beat）
- ✅ ウェルカムメール送信
- ✅ 非アクティブユーザーのクリーンアップ

## 📝 APIエンドポイント

### 認証
- `POST /api/auth/login/` - ログイン
- `POST /api/auth/register/` - ユーザー登録
- `POST /api/auth/logout/` - ログアウト
- `POST /api/auth/google/` - Google OAuth
- `POST /api/auth/token/refresh/` - トークンリフレッシュ
- `GET /api/auth/verify/` - トークン検証

### ユーザー
- `GET /api/users/profile/` - プロフィール取得
- `PATCH /api/users/profile/` - プロフィール更新
- `GET /api/users/list/` - ユーザー一覧（管理者のみ）
- `GET /api/users/<id>/` - ユーザー詳細

## 🔧 トラブルシューティング

### Dockerコンテナが起動しない

```bash
# ログを確認
docker-compose logs

# コンテナを再ビルド
docker-compose up --build
```

### データベース接続エラー

```bash
# MySQLコンテナの状態を確認
docker-compose ps db

# データベースに接続できるか確認
docker-compose exec db mysql -u test_user -p test_nextjs_db
```

### Celeryタスクが実行されない

```bash
# Redisの状態を確認
docker-compose ps redis

# Celeryワーカーのログを確認
docker-compose logs celery_worker
```

## 📚 参考資料

### プロジェクトドキュメント
- 🐧 [WSL_SETUP.md](WSL_SETUP.md) - WSL/Ubuntu環境でのセットアップ
- 💡 [WSL_TIPS.md](WSL_TIPS.md) - WSLでの開発Tips
- ⚡ [QUICK_START.md](QUICK_START.md) - クイックスタートガイド
- 📖 [SETUP_GUIDE.md](SETUP_GUIDE.md) - 詳細セットアップガイド
- 🔄 [GITHUB_ACTIONS.md](GITHUB_ACTIONS.md) - GitHub Actions CI/CD設定ガイド

### 公式ドキュメント
- [Next.js Documentation](https://nextjs.org/docs)
- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Celery Documentation](https://docs.celeryproject.org/)

## 📄 ライセンス

MIT License

## 👥 貢献

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📧 お問い合わせ

質問や提案がありましたら、issueを作成してください。
