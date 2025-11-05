# Docker クイックスタートガイド

リポジトリ作成後、すぐにDockerでプロジェクトを起動する手順です。

## 📋 前提条件の確認

### WSL/Ubuntuの場合

```bash
# WSL環境チェックスクリプトを実行
chmod +x scripts/wsl-check.sh
./scripts/wsl-check.sh
```

すべて✅（緑）になっていればOK！

### Dockerの起動確認

```bash
# Dockerが起動しているか確認
docker info

# エラーが出る場合
sudo service docker start  # WSL内にDockerをインストールした場合
# または Docker Desktop for Windowsが起動していることを確認
```

## 🚀 Docker起動手順

### 1. 環境変数ファイルの準備

```bash
# .envファイルを作成
cp env.example .env

# .envを編集（nanoエディタで開く）
nano .env
```

最低限、以下を変更：
```env
SECRET_KEY=your-random-secret-key-here-min-50-characters-long
DB_PASSWORD=your-secure-database-password
DB_ROOT_PASSWORD=your-secure-root-password
```

保存: `Ctrl + X` → `Y` → `Enter`

### 2. Dockerイメージのビルド

```bash
# すべてのサービスのイメージをビルド
docker-compose build

# 進行状況が表示されます（数分かかります）
```

これで以下のイメージが作成されます：
- `test_nextjs_backend` - Djangoバックエンド
- `test_nextjs_frontend` - Next.jsフロントエンド

### 3. コンテナの起動

```bash
# すべてのコンテナをバックグラウンドで起動
docker-compose up -d

# 起動状態を確認
docker-compose ps
```

以下のコンテナが起動します：
- `test_nextjs_db` - MySQL 8.0
- `test_nextjs_redis` - Redis 7
- `test_nextjs_backend` - Django API
- `test_nextjs_frontend` - Next.js
- `test_nextjs_celery_worker` - Celeryワーカー
- `test_nextjs_celery_beat` - Celery Beat

### 4. データベースの初期化

```bash
# データベースが完全に起動するまで少し待つ
sleep 10

# マイグレーションを実行
docker-compose exec backend python manage.py migrate

# 静的ファイルを収集
docker-compose exec backend python manage.py collectstatic --noinput

# スーパーユーザーを作成
docker-compose exec backend python manage.py createsuperuser
```

スーパーユーザー作成時の入力例：
```
Email address: admin@example.com
Password: （安全なパスワードを入力）
Password (again): （同じパスワードを再入力）
```

### 5. 動作確認

ブラウザで以下にアクセス：

- 🌐 **フロントエンド**: http://localhost:3000
- 🔧 **バックエンドAPI**: http://localhost:8000/api
- 👤 **Django管理画面**: http://localhost:8000/admin

## 📊 コンテナの状態確認

```bash
# すべてのコンテナの状態
docker-compose ps

# ログをリアルタイムで表示
docker-compose logs -f

# 特定のサービスのログ
docker-compose logs -f frontend
docker-compose logs -f backend

# ログを終了するには Ctrl + C
```

## 🛠 よく使うコマンド

### 開発ヘルパースクリプト

```bash
# スクリプトに実行権限を付与（初回のみ）
chmod +x scripts/dev.sh

# ヘルプを表示
./scripts/dev.sh help

# コンテナ起動
./scripts/dev.sh start

# コンテナ停止
./scripts/dev.sh stop

# ログ表示
./scripts/dev.sh logs

# バックエンドシェルに入る
./scripts/dev.sh shell-be

# フロントエンドシェルに入る
./scripts/dev.sh shell-fe
```

### Docker Composeコマンド

```bash
# コンテナ起動
docker-compose up -d

# コンテナ停止
docker-compose down

# コンテナ再起動
docker-compose restart

# 特定のサービスのみ起動
docker-compose up -d frontend backend db

# ログを見る
docker-compose logs -f [service-name]

# コンテナ内でコマンド実行
docker-compose exec backend python manage.py shell
docker-compose exec frontend npm run build

# すべて削除して再起動
docker-compose down -v
docker-compose up -d --build
```

## 🔧 トラブルシューティング

### エラー: "port is already allocated"

別のプロセスがポートを使用しています。

**WSL/Ubuntu:**
```bash
# ポートを使用しているプロセスを確認
sudo lsof -i :3000
sudo lsof -i :8000

# プロセスを終了
sudo kill -9 <PID>
```

### エラー: "Cannot connect to the Docker daemon"

Dockerが起動していません。

```bash
# Docker Desktop for Windowsを起動

# または、WSL内のDockerを起動
sudo service docker start
```

### コンテナが起動しない

```bash
# ログを確認
docker-compose logs

# 特定のサービスのログを確認
docker-compose logs db
docker-compose logs backend

# コンテナを完全に削除して再作成
docker-compose down -v
docker-compose up -d --build
```

### データベース接続エラー

```bash
# データベースコンテナの状態を確認
docker-compose ps db

# データベースログを確認
docker-compose logs db

# データベースコンテナを再起動
docker-compose restart db

# 10秒待ってからマイグレーション再実行
sleep 10
docker-compose exec backend python manage.py migrate
```

### フロントエンドが起動しない

```bash
# node_modulesを再インストール
docker-compose exec frontend rm -rf node_modules
docker-compose exec frontend npm install

# または、コンテナを再ビルド
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### ビルドに失敗する

```bash
# キャッシュをクリアして再ビルド
docker-compose build --no-cache

# 古いイメージを削除
docker system prune -a

# 再度ビルド
docker-compose build
docker-compose up -d
```

## 📈 パフォーマンス最適化

### WSL/Ubuntu環境

1. **プロジェクトはWSL内に配置**
   ```bash
   # 良い（速い）
   ~/test_nextjs

   # 悪い（遅い）
   /mnt/c/Users/...
   ```

2. **.wslconfig設定**
   ```powershell
   # PowerShellで（Windows側）
   notepad $env:USERPROFILE\.wslconfig
   ```

   内容（例）:
   ```ini
   [wsl2]
   memory=8GB
   processors=4
   swap=2GB
   ```

   保存後、WSLを再起動:
   ```powershell
   wsl --shutdown
   ```

## 🎯 次のステップ

### 1. 開発環境の確認

```bash
# すべてのコンテナが起動しているか
docker-compose ps

# ログにエラーがないか
docker-compose logs
```

### 2. テストデータの作成（オプション）

```bash
# Djangoシェルに入る
docker-compose exec backend python manage.py shell

# Pythonシェルで
>>> from apps.users.models import User
>>> User.objects.create_user(
...     email='test@example.com',
...     password='testpassword123',
...     display_name='Test User'
... )
>>> exit()
```

### 3. 開発を開始

- VS Code/CursorでWSLに接続
- プロジェクトを開く: `~/test_nextjs`
- ファイルを編集すると自動的にホットリロードされます

### 4. GitHubにプッシュ

```bash
git add .
git commit -m "Initial Docker setup"
git push origin main

# GitHub Actionsが自動実行されます
```

## 💡 ヒント

### コンテナ内のデータを永続化

- データベースのデータ: `mysql_data`ボリューム
- 静的ファイル: `static_volume`ボリューム  
- メディアファイル: `media_volume`ボリューム

### 開発中のワークフロー

```bash
# 朝：起動
docker-compose up -d
./scripts/dev.sh logs

# 開発中：コードを編集
# → 自動的にリロードされる

# 終了時：停止
docker-compose down
```

## 📚 関連ドキュメント

- [README.md](README.md) - プロジェクト概要
- [WSL_SETUP.md](WSL_SETUP.md) - WSL詳細セットアップ
- [docker-compose.yml](docker-compose.yml) - Docker構成

---

**Docker環境でのハッピーコーディング！ 🐳**

