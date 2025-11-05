# GitHub Actions CI/CD ガイド

このプロジェクトでは、GitHub Actionsを使用してCI/CD（継続的インテグレーション/継続的デリバリー）を実装しています。

## 📋 目次

1. [ワークフロー概要](#ワークフロー概要)
2. [セットアップ手順](#セットアップ手順)
3. [ワークフローの詳細](#ワークフローの詳細)
4. [トラブルシューティング](#トラブルシューティング)

## 🔄 ワークフロー概要

### トリガー条件

- **Push**: `main`、`develop`ブランチへのプッシュ
- **Pull Request**: `main`、`develop`ブランチへのPR作成/更新

### ジョブ構成

```
┌─────────────────┐    ┌─────────────────┐
│ Backend Test    │    │ Frontend Test   │
└────────┬────────┘    └────────┬────────┘
         │                      │
         ├──────────┬───────────┤
         ▼          ▼           ▼
┌─────────────┐  ┌─────────────┐
│Backend Build│  │Frontend Build│  (mainブランチのみ)
└──────┬──────┘  └──────┬──────┘
       │                │
       └────────┬───────┘
                ▼
       ┌─────────────────┐
       │ Deploy to Render│  (mainブランチのみ)
       └─────────────────┘
```

## 🛠 セットアップ手順

### 1. Docker Hubアカウントの準備

Docker Hubにイメージを保存するため、アカウントが必要です。

1. [Docker Hub](https://hub.docker.com/)でアカウント作成
2. アクセストークンを生成:
   - Account Settings > Security > New Access Token
   - 権限: Read, Write, Delete を選択
   - トークンをコピー（後で使用）

### 2. GitHubシークレットの設定

リポジトリにシークレットを追加：

1. GitHubリポジトリに移動
2. **Settings** > **Secrets and variables** > **Actions**
3. **New repository secret**をクリック

以下の3つのシークレットを追加：

#### DOCKER_USERNAME
- **Name**: `DOCKER_USERNAME`
- **Value**: Docker Hubのユーザー名

#### DOCKER_PASSWORD
- **Name**: `DOCKER_PASSWORD`
- **Value**: Docker Hubのアクセストークン（パスワードではなくトークンを推奨）

#### RENDER_DEPLOY_HOOK_URL
- **Name**: `RENDER_DEPLOY_HOOK_URL`
- **Value**: RenderのDeploy Hook URL（後述）

### 3. Render Deploy Hookの取得

1. [Render Dashboard](https://dashboard.render.com/)にログイン
2. サービスを選択（バックエンドまたはフロントエンド）
3. **Settings** > **Deploy Hook**
4. URLをコピーしてGitHubシークレットに追加

### 4. ワークフローの有効化

リポジトリに`.github/workflows/ci-cd.yml`がコミットされていれば、自動的に有効化されます。

確認方法：
1. GitHubリポジトリの**Actions**タブを開く
2. ワークフローが表示されることを確認

## 📖 ワークフローの詳細

### Job 1: Backend Tests

**目的**: Djangoバックエンドのテストを実行

**実行内容**:
1. Python 3.11環境をセットアップ
2. MySQLサービスを起動
3. 依存関係をインストール
4. `python manage.py test`を実行

**トリガー**: すべてのプッシュとPR

### Job 2: Frontend Tests

**目的**: Next.jsフロントエンドのリントとテストを実行

**実行内容**:
1. Node.js 20環境をセットアップ
2. 依存関係をインストール（npm ci）
3. ESLintを実行

**トリガー**: すべてのプッシュとPR

### Job 3: Backend Build

**目的**: バックエンドのDockerイメージをビルド・プッシュ

**実行内容**:
1. Docker Buildxをセットアップ
2. Docker Hubにログイン
3. イメージをビルドしてプッシュ:
   - `your-username/test-nextjs-backend:latest`
   - `your-username/test-nextjs-backend:<commit-sha>`

**トリガー**: `main`ブランチへのプッシュ（テスト成功後）

### Job 4: Frontend Build

**目的**: フロントエンドのDockerイメージをビルド・プッシュ

**実行内容**:
1. Docker Buildxをセットアップ
2. Docker Hubにログイン
3. イメージをビルドしてプッシュ:
   - `your-username/test-nextjs-frontend:latest`
   - `your-username/test-nextjs-frontend:<commit-sha>`

**トリガー**: `main`ブランチへのプッシュ（テスト成功後）

### Job 5: Deploy to Render

**目的**: Renderにデプロイを通知

**実行内容**:
1. Deploy Hook URLにPOSTリクエストを送信
2. Renderが自動的に新しいイメージをデプロイ

**トリガー**: `main`ブランチへのプッシュ（ビルド成功後）

## 🎯 ワークフローの使い方

### 開発フロー

1. **機能ブランチで開発**
   ```bash
   git checkout -b feature/new-feature
   # コードを編集
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

2. **Pull Requestを作成**
   - GitHubでPRを作成
   - 自動的にテストが実行される
   - テストが通るまでマージしない

3. **mainブランチにマージ**
   ```bash
   # PRをマージ（GitHub UI上で）
   # または
   git checkout main
   git merge feature/new-feature
   git push origin main
   ```

4. **自動デプロイ**
   - mainへのプッシュで自動的に:
     - テスト実行
     - Dockerイメージビルド
     - Renderにデプロイ

### ワークフローの監視

1. **Actions タブで確認**
   - GitHubリポジトリ > **Actions**
   - 実行中/完了したワークフローを確認

2. **ステータスバッジの追加**（オプション）
   
   README.mdに追加：
   ```markdown
   ![CI/CD](https://github.com/your-username/test_nextjs/workflows/CI/CD%20Pipeline/badge.svg)
   ```

3. **通知の設定**
   - Settings > Notifications
   - ワークフロー失敗時にメール通知を受け取る

## 🔧 トラブルシューティング

### テストが失敗する

**問題**: `Backend Tests`または`Frontend Tests`が失敗

**確認事項**:
1. ローカルでテストが通るか確認
   ```bash
   # バックエンド
   docker-compose exec backend python manage.py test
   
   # フロントエンド
   docker-compose exec frontend npm run lint
   ```

2. 依存関係が最新か確認
   - `backend/requirements.txt`
   - `frontend/package.json`

3. 環境変数の設定を確認
   - `.github/workflows/ci-cd.yml`の`env`セクション

### ビルドが失敗する

**問題**: Dockerイメージのビルドが失敗

**確認事項**:
1. Dockerfileの構文を確認
   ```bash
   # ローカルでビルドテスト
   docker build -t test-backend ./backend
   docker build -t test-frontend ./frontend
   ```

2. Docker Hubの認証情報を確認
   - `DOCKER_USERNAME`と`DOCKER_PASSWORD`が正しく設定されているか

3. Docker Hubの容量を確認
   - 無料プランの制限に達していないか

### デプロイが失敗する

**問題**: `Deploy to Render`が失敗

**確認事項**:
1. Deploy Hook URLが正しいか確認
   - Renderダッシュボードで再確認

2. Renderサービスが正常か確認
   - Renderダッシュボードでサービスのステータスを確認

3. 手動でデプロイを試す
   ```bash
   curl -X POST $RENDER_DEPLOY_HOOK_URL
   ```

### シークレットが認識されない

**問題**: `secrets.XXX`が空

**解決方法**:
1. シークレットの名前を確認（大文字小文字を含む）
2. リポジトリレベルのシークレットであることを確認
3. Organizationシークレットの場合、リポジトリからアクセス可能か確認

### キャッシュの問題

**問題**: 古い依存関係やビルドキャッシュが使われる

**解決方法**:

Actionsタブから手動でキャッシュをクリア、または:

```yaml
# キャッシュを無効化（一時的）
- name: Install dependencies
  run: |
    cd backend
    pip install --no-cache-dir -r requirements.txt
```

## 📊 ワークフローの最適化

### ビルド時間の短縮

1. **キャッシュの活用**
   - 既に設定済み：`cache: 'pip'`、`cache: 'npm'`

2. **並列実行の最大化**
   - テストジョブは並列実行される
   - さらに分割可能な場合は追加ジョブを作成

3. **条件付き実行**
   - 変更されたファイルに応じてジョブをスキップ
   ```yaml
   - name: Check changed files
     uses: dorny/paths-filter@v2
     id: changes
     with:
       filters: |
         backend:
           - 'backend/**'
         frontend:
           - 'frontend/**'
   ```

### コスト削減

1. **プライベートリポジトリの場合**
   - GitHub Actionsの無料枠: 月2,000分
   - ビルドを最適化して時間を短縮

2. **Self-hosted Runnersの検討**
   - 頻繁にビルドする場合、自前のサーバーを使用

## 🔗 関連リンク

- [GitHub Actions ドキュメント](https://docs.github.com/ja/actions)
- [Docker Hub](https://hub.docker.com/)
- [Render ドキュメント](https://render.com/docs)

---

**GitHub Actionsで自動化された開発を楽しんでください！ 🚀**

