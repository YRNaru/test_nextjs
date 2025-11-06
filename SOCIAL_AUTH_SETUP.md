# ソーシャル認証設定ガイド

このガイドでは、Twitter、Discord、Googleのソーシャル認証を設定する方法を説明します。

## 目次
1. [Google OAuth 設定](#google-oauth-設定)
2. [Twitter OAuth2 設定](#twitter-oauth2-設定)
3. [Discord OAuth 設定](#discord-oauth-設定)
4. [環境変数の設定](#環境変数の設定)
5. [使用方法](#使用方法)

---

## Google OAuth 設定

### 1. Google Cloud Console でプロジェクトを作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 新しいプロジェクトを作成
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuth クライアント ID」を選択

### 2. OAuth 同意画面の設定

1. アプリケーション名を入力
2. サポートメールを設定
3. スコープに以下を追加:
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`

### 3. OAuth クライアント IDの作成

1. アプリケーションの種類: **ウェブアプリケーション**
2. 承認済みのリダイレクト URI:
   - `http://localhost:8000/accounts/google/login/callback/`
   - `http://localhost:3000/api/auth/google/callback`

### 4. クライアントIDとシークレットを取得

- クライアントIDとクライアントシークレットをコピーして環境変数に設定

---

## Twitter OAuth2 設定

### 1. Twitter Developer Portal でアプリを作成

1. [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard) にアクセス
2. 「Projects & Apps」→「Create App」をクリック
3. アプリ名を入力して作成

### 2. OAuth 2.0 設定

1. アプリの設定画面で「Settings」タブに移動
2. 「User authentication settings」の「Set up」をクリック
3. 以下を設定:
   - **App permissions**: Read
   - **Type of App**: Web App
   - **Callback URI**: `http://localhost:3000/api/auth/twitter/callback`
   - **Website URL**: `http://localhost:3000`

### 3. クライアントIDとシークレットを取得

- Client IDとClient Secretをコピーして環境変数に設定

### 注意事項

- Twitter APIは通常メールアドレスを提供しないため、ユーザーIDベースの一時メールアドレスを生成します
- 必要に応じて、別途メールアドレスの入力を求める実装を追加してください

---

## Discord OAuth 設定

### 1. Discord Developer Portal でアプリを作成

1. [Discord Developer Portal](https://discord.com/developers/applications) にアクセス
2. 「New Application」をクリック
3. アプリ名を入力して作成

### 2. OAuth2 設定

1. 左サイドバーの「OAuth2」→「General」に移動
2. 「Redirects」セクションで以下を追加:
   - `http://localhost:8000/accounts/discord/login/callback/`
   - `http://localhost:3000/api/auth/discord/callback`

### 3. クライアントIDとシークレットを取得

1. 「CLIENT ID」をコピー
2. 「CLIENT SECRET」の「Reset Secret」をクリックしてシークレットを取得
3. 環境変数に設定

---

## 環境変数の設定

`.env`ファイルまたは環境変数に以下を設定してください:

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Twitter OAuth2
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret

# Discord OAuth
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

---

## 使用方法

### バックエンド API エンドポイント

#### Google認証
```bash
POST /api/auth/google/
Content-Type: application/json

{
  "access_token": "google-access-token"
}
```

#### Twitter認証
```bash
POST /api/auth/twitter/
Content-Type: application/json

{
  "access_token": "twitter-access-token",
  "provider": "twitter"
}
```

#### Discord認証
```bash
POST /api/auth/discord/
Content-Type: application/json

{
  "access_token": "discord-access-token",
  "provider": "discord"
}
```

### レスポンス形式

成功時のレスポンス:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "display_name": "ユーザー名"
  },
  "tokens": {
    "refresh": "refresh-token",
    "access": "access-token"
  },
  "is_new_user": true
}
```

エラー時のレスポンス:

```json
{
  "error": "エラーメッセージ"
}
```

---

## データベースのマイグレーション

ソーシャル認証を有効にするために、データベースのマイグレーションを実行してください:

```bash
cd backend
python manage.py migrate
```

---

## トラブルシューティング

### Google認証が失敗する場合

- クライアントIDとシークレットが正しく設定されているか確認
- リダイレクトURIが正しく設定されているか確認
- OAuth同意画面が公開されているか確認

### Twitter認証が失敗する場合

- Twitter Developer Portalでアプリが承認されているか確認
- Callback URIが正しく設定されているか確認
- アクセストークンの有効期限が切れていないか確認

### Discord認証が失敗する場合

- クライアントIDとシークレットが正しく設定されているか確認
- Redirect URIが正しく設定されているか確認
- `identify`と`email`のスコープが要求されているか確認

---

## セキュリティに関する注意事項

1. **本番環境では必ずHTTPSを使用してください**
2. **クライアントシークレットは絶対に公開しないでください**
3. **環境変数ファイル(.env)をgitにコミットしないでください**
4. **定期的にクライアントシークレットをローテーションしてください**

---

## 参考資料

- [Django Allauth Documentation](https://django-allauth.readthedocs.io/)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [Twitter OAuth 2.0](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [Discord OAuth2](https://discord.com/developers/docs/topics/oauth2)

