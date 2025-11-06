# ソーシャル認証実装サマリー

## 実装内容

このプロジェクトに、**Twitter**、**Discord**、**Google** のソーシャル認証機能を追加しました。

---

## 変更されたファイル

### 1. バックエンド設定

#### `backend/config/settings.py`
- TwitterとDiscordのプロバイダーを `INSTALLED_APPS` に追加
- `SOCIALACCOUNT_PROVIDERS` にTwitterとDiscordの設定を追加

#### `backend/apps/authentication/serializers.py`
- `SocialAuthSerializer` を追加（Twitter、Discord用）

#### `backend/apps/authentication/views.py`
- `TwitterAuthView` を追加
- `DiscordAuthView` を追加
- Google認証は既存の `GoogleAuthView` を使用

#### `backend/apps/authentication/urls.py`
- Twitter認証エンドポイント: `/api/auth/twitter/`
- Discord認証エンドポイント: `/api/auth/discord/`
- Google認証エンドポイント: `/api/auth/google/`

#### `backend/requirements.txt`
- `requests==2.31.0` を追加（HTTPリクエスト用）

### 2. 環境変数設定

#### `env.example`
- Google、Twitter、Discordのクライアント IDとシークレットの例を追加

---

## APIエンドポイント

### Google認証
```
POST /api/auth/google/
Content-Type: application/json

{
  "access_token": "google-oauth-access-token"
}
```

### Twitter認証
```
POST /api/auth/twitter/
Content-Type: application/json

{
  "access_token": "twitter-oauth-access-token",
  "provider": "twitter"
}
```

### Discord認証
```
POST /api/auth/discord/
Content-Type: application/json

{
  "access_token": "discord-oauth-access-token",
  "provider": "discord"
}
```

---

## 成功時のレスポンス

すべてのソーシャル認証エンドポイントは、以下の形式でレスポンスを返します:

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "display_name": "ユーザー名"
  },
  "tokens": {
    "refresh": "jwt-refresh-token",
    "access": "jwt-access-token"
  },
  "is_new_user": true
}
```

---

## セットアップ手順

### 1. 環境変数を設定

`.env` ファイルを作成し、以下を設定してください:

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

詳細な取得方法は `SOCIAL_AUTH_SETUP.md` を参照してください。

### 2. 依存パッケージをインストール

```bash
cd backend
pip install -r requirements.txt
```

### 3. データベースマイグレーション

```bash
python manage.py migrate
```

### 4. 開発サーバーを起動

```bash
python manage.py runserver
```

---

## 認証フロー

### フロントエンド側の実装（例）

```typescript
// Google認証の例
const handleGoogleLogin = async (googleAccessToken: string) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: googleAccessToken,
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      // トークンを保存
      localStorage.setItem('access_token', data.tokens.access);
      localStorage.setItem('refresh_token', data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // ユーザー情報を更新
      setUser(data.user);
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Discord認証の例
const handleDiscordLogin = async (discordAccessToken: string) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/discord/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: discordAccessToken,
        provider: 'discord',
      }),
    });

    const data = await response.json();
    // 以降はGoogleと同様
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Twitter認証の例
const handleTwitterLogin = async (twitterAccessToken: string) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/twitter/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: twitterAccessToken,
        provider: 'twitter',
      }),
    });

    const data = await response.json();
    // 以降はGoogleと同様
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

---

## 注意事項

### Twitter認証について

- Twitterはメールアドレスを提供しないことがあるため、ユーザーIDベースの一時メールアドレス（`{twitter_id}@twitter.temp`）を生成しています
- 本番環境では、別途メールアドレスの入力を求める実装を追加することを推奨します

### セキュリティ

1. **本番環境では必ずHTTPSを使用してください**
2. **クライアントシークレットは絶対に公開しないでください**
3. **環境変数ファイル(.env)をgitにコミットしないでください**
4. **CORS設定を適切に行ってください**

### CORS設定

`backend/config/settings.py` で、フロントエンドのURLを `CORS_ALLOWED_ORIGINS` に追加してください:

```python
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000'
).split(',')
```

---

## テスト方法

### cURLでのテスト例

```bash
# Discord認証のテスト
curl -X POST http://localhost:8000/api/auth/discord/ \
  -H "Content-Type: application/json" \
  -d '{
    "access_token": "your-discord-access-token",
    "provider": "discord"
  }'
```

---

## トラブルシューティング

### マイグレーションエラー

```bash
python manage.py makemigrations
python manage.py migrate
```

### 依存パッケージのエラー

```bash
pip install --upgrade -r requirements.txt
```

### ソーシャルアカウントテーブルが見つからない場合

```bash
python manage.py migrate allauth
```

---

## 参考資料

- [django-allauth Documentation](https://django-allauth.readthedocs.io/)
- [Django REST Framework Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/)
- 詳細な OAuth 設定手順: `SOCIAL_AUTH_SETUP.md`

