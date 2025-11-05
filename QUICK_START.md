# クイックスタートガイド

このガイドでは、最速でプロジェクトを起動する方法を説明します。

## 📖 環境別ガイド

**あなたの環境に合わせて選択してください：**

- 🐧 **WSL/Ubuntu**: [WSL_SETUP.md](WSL_SETUP.md) - WSL2環境での詳細セットアップ
- 💻 **Windows/Mac/Linux**: このガイドをそのまま続けてください
- 📚 **詳細な手順**: [SETUP_GUIDE.md](SETUP_GUIDE.md) - トラブルシューティング含む完全ガイド

## 🚀 5分でセットアップ

### 1. リポジトリをクローン

**WSL/Ubuntu の場合：**
```bash
# WSL内で実行（推奨）
cd ~
git clone <repository-url>
cd test_nextjs
```

**Windows/Mac/Linux の場合：**
```bash
git clone <repository-url>
cd test_nextjs
```

### 2. 環境変数を設定

```bash
# Windowsの場合
Copy-Item env.example .env

# Mac/Linuxの場合
cp env.example .env
```

`.env`ファイルを編集：
- `SECRET_KEY`: ランダムな文字列に変更
- `DB_PASSWORD`: 安全なパスワードに変更
- その他はデフォルトのままでOK（Google OAuthは後で設定可能）

### 3. セットアップスクリプトを実行

**WSL/Ubuntu/Mac/Linux**:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

**Windows (PowerShell)**:
```powershell
.\scripts\setup.ps1
```

> 💡 **WSLユーザーへ**: WSL内でLinuxコマンドを使用してください。詳細は [WSL_SETUP.md](WSL_SETUP.md) を参照。

### 4. スーパーユーザーを作成

```bash
docker-compose exec backend python manage.py createsuperuser
```

メールアドレスとパスワードを入力してください。

### 5. アクセス

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000/api
- **管理画面**: http://localhost:8000/admin

## 📱 基本的な使い方

### コンテナの管理

```bash
# 起動
docker-compose up -d

# 停止
docker-compose down

# ログを確認
docker-compose logs -f

# 特定のサービスのログ
docker-compose logs -f frontend
docker-compose logs -f backend
```

### 開発作業

```bash
# フロントエンドのパッケージをインストール
cd frontend
npm install

# バックエンドのパッケージをインストール
cd backend
pip install -r requirements.txt
```

## 🔧 よくある問題

### ポートが既に使用されている

エラー: `port is already allocated`

**解決方法**:
```bash
# 使用中のポートを確認
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Mac/Linux
lsof -i :3000
lsof -i :8000

# プロセスを終了するか、docker-compose.ymlでポートを変更
```

### データベース接続エラー

**解決方法**:
```bash
# データベースコンテナを再起動
docker-compose restart db

# データベースの状態を確認
docker-compose ps db
docker-compose logs db
```

### マイグレーションエラー

**解決方法**:
```bash
# マイグレーションを再実行
docker-compose exec backend python manage.py migrate

# または、データベースをリセット
docker-compose down -v
docker-compose up -d
# 10秒待つ
docker-compose exec backend python manage.py migrate
```

## 🎓 次のステップ

1. **Google OAuthの設定**
   - [SETUP_GUIDE.md](SETUP_GUIDE.md#google-oauth認証の設定) を参照

2. **開発を始める**
   - フロントエンド: `frontend/src/app/`
   - バックエンド: `backend/apps/`

3. **APIドキュメントを確認**
   - [README.md](README.md#apiエンドポイント) を参照

4. **デプロイ**
   - [README.md](README.md#デプロイ) を参照

## 🧹 クリーンアップ

すべてを削除して最初からやり直したい場合：

**Windows**:
```powershell
.\scripts\clean.ps1
```

**Mac/Linux**:
```bash
chmod +x scripts/clean.sh
./scripts/clean.sh
```

## 📚 詳細なドキュメント

- **詳細なセットアップ**: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **プロジェクト概要**: [README.md](README.md)
- **API仕様**: [README.md#apiエンドポイント](README.md#apiエンドポイント)

## 💡 ヒント

### 開発効率を上げる

```bash
# ログを複数のターミナルで監視
# ターミナル1: フロントエンド
docker-compose logs -f frontend

# ターミナル2: バックエンド
docker-compose logs -f backend

# ターミナル3: Celery
docker-compose logs -f celery_worker
```

### データベースを直接操作

```bash
# MySQLシェルに接続
docker-compose exec db mysql -u test_user -p test_nextjs_db

# Djangoシェルを起動
docker-compose exec backend python manage.py shell
```

### 静的ファイルの更新

```bash
# フロントエンドのビルド
cd frontend
npm run build

# バックエンドの静的ファイル収集
docker-compose exec backend python manage.py collectstatic --noinput
```

## 🆘 サポート

問題が発生した場合：

1. [SETUP_GUIDE.md](SETUP_GUIDE.md#トラブルシューティング) のトラブルシューティングを確認
2. GitHubのIssueを作成
3. ログを確認: `docker-compose logs`

---

**Happy Coding! 🎉**

