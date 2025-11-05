# セットアップガイド

このドキュメントでは、開発環境のセットアップ手順を詳しく説明します。

## 目次

1. [事前準備](#事前準備)
2. [ローカル開発環境のセットアップ](#ローカル開発環境のセットアップ)
3. [Google OAuth認証の設定](#google-oauth認証の設定)
4. [データベースのセットアップ](#データベースのセットアップ)
5. [Celeryの設定](#celeryの設定)
6. [開発のワークフロー](#開発のワークフロー)
7. [本番環境へのデプロイ](#本番環境へのデプロイ)

## 事前準備

### 必要なソフトウェア

#### 必須
- **Docker Desktop** (Windows/Mac) または Docker Engine (Linux)
  - [Docker公式サイト](https://www.docker.com/get-started)からダウンロード
  - バージョン: 20.10以上
- **Git**
  - [Git公式サイト](https://git-scm.com/)からダウンロード
  - バージョン: 2.30以上

#### 推奨（ローカル開発用）
- **Node.js**
  - [Node.js公式サイト](https://nodejs.org/)からLTS版をダウンロード
  - バージョン: 20.x
- **Python**
  - [Python公式サイト](https://www.python.org/)からダウンロード
  - バージョン: 3.11以上

### エディタ
- **Cursor** (推奨)
  - AI機能を活用した開発が可能

## ローカル開発環境のセットアップ

### 1. リポジトリのクローン

```bash
# GitLabからクローン
git clone https://gitlab.com/your-username/test_nextjs.git
cd test_nextjs
```

### 2. 環境変数の設定

```bash
# env.exampleをコピーして.envを作成
cp env.example .env
```

`.env`ファイルを編集：

```env
# 開発環境用の設定例

# Django設定
DEBUG=True
SECRET_KEY=your-super-secret-key-change-this-in-production

# データベース設定
DB_NAME=test_nextjs_db
DB_USER=test_user
DB_PASSWORD=secure_password_here
DB_ROOT_PASSWORD=root_secure_password
DB_HOST=db
DB_PORT=3306

# Redis設定
REDIS_URL=redis://redis:6379/0

# Google OAuth（後で設定）
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# フロントエンド設定
NEXT_PUBLIC_API_URL=http://localhost:8000/api
FRONTEND_URL=http://localhost:3000

# バックエンド設定
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### 3. Dockerコンテナの起動

```bash
# すべてのサービスをバックグラウンドで起動
docker-compose up -d

# 起動確認（すべてのコンテナがUpになっていることを確認）
docker-compose ps

# ログをリアルタイムで確認
docker-compose logs -f
```

起動するサービス：
- **db**: MySQL 8.0
- **redis**: Redis 7
- **backend**: Django API
- **frontend**: Next.js
- **celery_worker**: Celeryワーカー
- **celery_beat**: Celery Beat（定期実行）

### 4. データベースの初期化

```bash
# バックエンドコンテナに入る
docker-compose exec backend sh

# データベースマイグレーションを実行
python manage.py migrate

# スーパーユーザーを作成（管理画面にアクセスするため）
python manage.py createsuperuser
# メールアドレス: admin@example.com
# パスワード: 任意の安全なパスワード

# 静的ファイルを収集
python manage.py collectstatic --noinput

# コンテナから抜ける
exit
```

### 5. 動作確認

ブラウザで以下のURLにアクセス：

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000/api
- **Django管理画面**: http://localhost:8000/admin

## Google OAuth認証の設定

### 1. Google Cloud Platformの設定

1. **Google Cloud Console**にアクセス
   - https://console.cloud.google.com/

2. **新しいプロジェクトを作成**
   - プロジェクト名: `test-nextjs`（任意）

3. **OAuth同意画面の設定**
   - ナビゲーションメニュー > APIとサービス > OAuth同意画面
   - ユーザータイプ: 外部
   - アプリ名: `Test Next.js App`
   - サポートメール: あなたのメールアドレス
   - スコープ: `email`, `profile`, `openid`

4. **OAuth 2.0クライアントIDの作成**
   - ナビゲーションメニュー > APIとサービス > 認証情報
   - 「認証情報を作成」> 「OAuth クライアント ID」
   - アプリケーションの種類: ウェブアプリケーション
   - 名前: `Test Next.js Web Client`
   
   **承認済みのJavaScript生成元**:
   ```
   http://localhost:3000
   ```
   
   **承認済みのリダイレクトURI**:
   ```
   http://localhost:3000
   http://localhost:8000/accounts/google/login/callback/
   ```

5. **クライアントIDとシークレットをコピー**
   - 作成後に表示されるクライアントIDとクライアントシークレットをコピー

### 2. .envファイルの更新

```env
GOOGLE_CLIENT_ID=あなたのクライアントID.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=あなたのクライアントシークレット
```

### 3. コンテナの再起動

```bash
# 設定を反映させるために再起動
docker-compose restart backend frontend
```

### 4. Django管理画面でサイト設定

1. http://localhost:8000/admin にアクセス
2. Sites > Sites で「example.com」を「localhost:3000」に変更
3. Social applications で新しいGoogle認証アプリを追加
   - Provider: Google
   - Name: Google
   - Client id: Google Cloud ConsoleからコピーしたクライアントID
   - Secret key: クライアントシークレット
   - Sites: localhost:3000 を選択

## データベースのセットアップ

### マイグレーションの作成と適用

```bash
# モデルを変更した後、マイグレーションファイルを生成
docker-compose exec backend python manage.py makemigrations

# マイグレーションを適用
docker-compose exec backend python manage.py migrate

# マイグレーション状態を確認
docker-compose exec backend python manage.py showmigrations
```

### データベースのバックアップ

```bash
# バックアップを作成
docker-compose exec db mysqldump -u test_user -p test_nextjs_db > backup.sql

# バックアップから復元
docker-compose exec -T db mysql -u test_user -p test_nextjs_db < backup.sql
```

### データベースに直接接続

```bash
# MySQLシェルに接続
docker-compose exec db mysql -u test_user -p test_nextjs_db

# データを確認
mysql> SHOW TABLES;
mysql> SELECT * FROM users_user;
mysql> EXIT;
```

## Celeryの設定

### 定期タスクの追加

Django管理画面から定期タスクを設定：

1. http://localhost:8000/admin にアクセス
2. Periodic Tasks > Periodic tasks > ADD PERIODIC TASK

**例: 毎日0時に非アクティブユーザーをクリーンアップ**
- Name: `Daily Cleanup Inactive Users`
- Task (registered): `apps.users.tasks.cleanup_inactive_users`
- Interval: every 1 day
- Start Datetime: 今日の0:00

### カスタムタスクの作成

`backend/apps/users/tasks.py`にタスクを追加：

```python
from celery import shared_task

@shared_task
def my_custom_task(param1, param2):
    """カスタムタスク"""
    # タスクの処理
    return f"Task completed with {param1} and {param2}"
```

### タスクの実行

```python
# Pythonシェルから
from apps.users.tasks import my_custom_task

# 非同期で実行
result = my_custom_task.delay("value1", "value2")

# 結果を確認
print(result.get())
```

### Celeryのモニタリング

```bash
# ワーカーのログを確認
docker-compose logs -f celery_worker

# Beatのログを確認
docker-compose logs -f celery_beat

# タスクの状態を確認
docker-compose exec backend python manage.py shell
>>> from apps.users.tasks import cleanup_inactive_users
>>> result = cleanup_inactive_users.delay()
>>> result.status
>>> result.result
```

## 開発のワークフロー

### フロントエンド開発

```bash
# フロントエンドコンテナに入る
docker-compose exec frontend sh

# または、ローカルで開発
cd frontend
npm install
npm run dev
```

**主な開発タスク**：
- コンポーネントの作成: `src/components/`
- ページの作成: `src/app/`
- APIクライアントの更新: `src/lib/api.ts`
- スタイルの変更: `src/app/globals.css`

### バックエンド開発

```bash
# バックエンドコンテナに入る
docker-compose exec backend sh

# または、ローカルで開発
cd backend
source venv/bin/activate  # 仮想環境を有効化
python manage.py runserver
```

**主な開発タスク**：
- モデルの作成/変更: `apps/*/models.py`
- APIエンドポイントの追加: `apps/*/views.py`, `apps/*/urls.py`
- シリアライザーの作成: `apps/*/serializers.py`
- Celeryタスクの追加: `apps/*/tasks.py`

### テストの実行

```bash
# バックエンドのテスト
docker-compose exec backend python manage.py test

# フロントエンドのテスト
docker-compose exec frontend npm test

# Lintの実行
docker-compose exec frontend npm run lint
```

## 本番環境へのデプロイ

### Renderへのデプロイ

1. **Renderアカウントの作成**
   - https://render.com/ にサインアップ

2. **リポジトリの接続**
   - Dashboard > New > Blueprint
   - GitLabリポジトリを接続
   - `render.yaml`が自動検出される

3. **環境変数の設定**
   - 各サービスで以下の環境変数を設定：
     - `SECRET_KEY`: 安全なランダム文字列
     - `DEBUG`: `false`
     - `ALLOWED_HOSTS`: デプロイされたドメイン
     - `CORS_ALLOWED_ORIGINS`: フロントエンドのURL
     - `GOOGLE_CLIENT_ID`: 本番用のクライアントID
     - `GOOGLE_CLIENT_SECRET`: 本番用のシークレット
     - `FRONTEND_URL`: フロントエンドのURL
     - `NEXT_PUBLIC_API_URL`: バックエンドのURL

4. **データベースの初期化**
   - Renderのシェルから：
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **デプロイの確認**
   - 各サービスのログを確認
   - ヘルスチェックが正常か確認

### GitLab CI/CDの設定

1. **GitLab変数の設定**
   - プロジェクト > Settings > CI/CD > Variables
   - 追加する変数：
     - `CI_REGISTRY_USER`: GitLabユーザー名
     - `CI_REGISTRY_PASSWORD`: アクセストークン
     - `RENDER_DEPLOY_HOOK_URL`: RenderのDeploy Hook URL

2. **パイプラインの実行**
   - `main`ブランチへのプッシュで自動実行
   - またはCI/CDパイプラインから手動実行

## トラブルシューティング

### よくある問題と解決方法

#### 1. Dockerコンテナが起動しない

```bash
# ログを確認
docker-compose logs

# コンテナを停止して再ビルド
docker-compose down
docker-compose up --build
```

#### 2. ポートが既に使用されている

```bash
# 使用されているポートを確認
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# プロセスを終了するか、docker-compose.ymlでポートを変更
```

#### 3. データベース接続エラー

```bash
# MySQLコンテナの状態を確認
docker-compose ps db

# データベースログを確認
docker-compose logs db

# コンテナを再起動
docker-compose restart db
```

#### 4. マイグレーションエラー

```bash
# マイグレーション状態を確認
docker-compose exec backend python manage.py showmigrations

# すべてのマイグレーションをロールバック
docker-compose exec backend python manage.py migrate app_name zero

# 再度マイグレーション
docker-compose exec backend python manage.py migrate
```

#### 5. Celeryタスクが実行されない

```bash
# Redisの接続を確認
docker-compose exec redis redis-cli ping

# Celeryワーカーのログを確認
docker-compose logs celery_worker

# ワーカーを再起動
docker-compose restart celery_worker celery_beat
```

## 次のステップ

- [README.md](README.md)でプロジェクトの全体像を確認
- APIドキュメントを参照して開発を開始
- 機能追加やバグ修正のプルリクエストを作成

質問がある場合は、GitLabのIssueを作成してください！

