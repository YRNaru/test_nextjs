# Backend API ドキュメント

## 概要

このプロジェクトは、Django REST Framework を使用した高品質な REST API バックエンドです。

## 主な機能

- ✅ JWT認証（アクセストークン: 1時間、リフレッシュトークン: 7日）
- ✅ ユーザー登録・ログイン・ログアウト
- ✅ Google/Twitter/Discord ソーシャル認証
- ✅ ユーザープロフィール管理
- ✅ Celery による非同期タスク処理
- ✅ 包括的なロギングとエラーハンドリング
- ✅ セキュリティ強化（HSTS, XSS保護, CSRF保護等）
- ✅ 型ヒント完備
- ✅ 85%以上のテストカバレッジ目標

## 技術スタック

- **フレームワーク**: Django 4.2
- **REST API**: Django REST Framework 3.14
- **認証**: djangorestframework-simplejwt, django-allauth
- **データベース**: MySQL (PyMySQL)
- **タスクキュー**: Celery + Redis
- **テスト**: pytest, pytest-django, pytest-cov
- **型チェック**: mypy, django-stubs
- **コード品質**: flake8, black

## プロジェクト構造

```
backend/
├── apps/
│   ├── authentication/    # 認証関連
│   │   ├── views.py      # 認証ビュー
│   │   ├── serializers.py # シリアライザー
│   │   ├── exceptions.py # カスタム例外
│   │   └── tests.py      # テスト
│   └── users/            # ユーザー管理
│       ├── models.py     # ユーザーモデル
│       ├── views.py      # ユーザービュー
│       ├── serializers.py # シリアライザー
│       ├── validators.py # バリデーター
│       ├── exceptions.py # カスタム例外
│       ├── tasks.py      # Celeryタスク
│       └── tests.py      # テスト
├── config/
│   ├── settings.py       # Django設定
│   ├── urls.py          # URLルーティング
│   ├── middleware.py    # カスタムミドルウェア
│   └── celery.py        # Celery設定
├── logs/                # ログファイル
├── media/               # アップロードファイル
├── staticfiles/         # 静的ファイル
├── pytest.ini           # pytest設定
├── mypy.ini            # mypy設定
├── .flake8             # flake8設定
└── requirements.txt    # 依存パッケージ

```

## セットアップ

### 1. 仮想環境の作成とアクティベート

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. 依存パッケージのインストール

```bash
pip install -r requirements.txt
```

### 3. 環境変数の設定

`.env` ファイルを作成し、以下の環境変数を設定:

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=test_nextjs_db
DB_USER=test_user
DB_PASSWORD=test_password
DB_HOST=localhost
DB_PORT=3306

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:8742

# Redis
REDIS_URL=redis://localhost:6379/0

# Social Auth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret
```

### 4. データベースマイグレーション

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. スーパーユーザーの作成

```bash
python manage.py createsuperuser
```

### 6. 開発サーバーの起動

```bash
python manage.py runserver
```

## テストの実行

### すべてのテストを実行

```bash
pytest
```

### カバレッジレポート付きで実行

```bash
pytest --cov=apps --cov-report=html
```

### 特定のテストファイルを実行

```bash
pytest apps/users/tests.py
```

## コード品質チェック

### 型チェック (mypy)

```bash
mypy apps/
```

### リントチェック (flake8)

```bash
flake8 apps/
```

### コードフォーマット (black)

```bash
# チェックのみ
black --check apps/

# 自動フォーマット
black apps/
```

## API エンドポイント

### 認証関連

- `POST /api/auth/register/` - ユーザー登録
- `POST /api/auth/login/` - ログイン
- `POST /api/auth/logout/` - ログアウト
- `POST /api/auth/token/refresh/` - トークン更新
- `GET /api/auth/verify/` - トークン検証
- `POST /api/auth/google/` - Google認証
- `POST /api/auth/twitter/` - Twitter認証
- `POST /api/auth/discord/` - Discord認証

### ユーザー関連

- `GET /api/users/profile/` - プロフィール取得
- `PUT /api/users/profile/` - プロフィール更新
- `PATCH /api/users/profile/` - プロフィール部分更新
- `GET /api/users/list/` - ユーザー一覧（管理者のみ）
- `GET /api/users/<id>/` - ユーザー詳細

## ベストプラクティス

### 1. 型ヒントの使用

```python
from typing import Optional

def create_user(email: str, password: Optional[str] = None) -> User:
    """ユーザーを作成"""
    return User.objects.create_user(email=email, password=password)
```

### 2. Docstringの記述

```python
def send_welcome_email(user_email: str, user_name: str) -> str:
    """
    新規ユーザーにウェルカムメールを送信
    
    Args:
        user_email: ユーザーのメールアドレス
        user_name: ユーザーの表示名
        
    Returns:
        str: 実行結果メッセージ
        
    Raises:
        Exception: メール送信に失敗した場合
    """
    # 実装
```

### 3. エラーハンドリング

```python
try:
    user = User.objects.get(id=user_id)
except User.DoesNotExist:
    logger.warning(f"User {user_id} not found")
    raise UserNotFoundError()
except Exception as e:
    logger.error(f"Error: {str(e)}", exc_info=True)
    raise
```

### 4. ロギング

```python
import logging

logger = logging.getLogger(__name__)

logger.info("User registered successfully")
logger.warning("Invalid token attempt")
logger.error("Database connection failed", exc_info=True)
```

### 5. パフォーマンス最適化

```python
# N+1問題を回避
users = User.objects.select_related('profile').all()

# 必要なフィールドのみ取得
users = User.objects.only('id', 'email', 'display_name')
```

## セキュリティ

- ✅ JWT トークンのブラックリスト機能
- ✅ HTTPS強制（本番環境）
- ✅ HSTS ヘッダー
- ✅ XSS 保護
- ✅ CSRF 保護
- ✅ Clickjacking 防止
- ✅ パスワード強度検証
- ✅ レート制限（実装予定）

## ロギング

ログは `logs/` ディレクトリに保存されます:

- `django.log` - 一般的なログ
- `error.log` - エラーログ

ログローテーション: 10MB × 10ファイル

## Celery タスク

### Celery Workerの起動

```bash
celery -A config worker -l info
```

### Celery Beatの起動（スケジュールタスク用）

```bash
celery -A config beat -l info
```

### タスク例

- `send_welcome_email` - ウェルカムメール送信
- `cleanup_inactive_users` - 非アクティブユーザーのクリーンアップ
- `send_password_reset_email` - パスワードリセットメール送信

## トラブルシューティング

### データベース接続エラー

- MySQLサービスが起動しているか確認
- データベース認証情報が正しいか確認

### Celeryタスクが実行されない

- Redisが起動しているか確認
- Celery Workerが起動しているか確認

### テストが失敗する

- データベースが最新のマイグレーション状態か確認
- テスト用の環境変数が設定されているか確認

## ライセンス

MIT License

## 貢献

プルリクエストは歓迎です。大きな変更を行う場合は、まずissueを開いて変更内容を議論してください。

