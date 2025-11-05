#!/bin/bash

# セットアップスクリプト
# このスクリプトは初回セットアップ時に実行してください

set -e

echo "=========================================="
echo "  Test Next.js セットアップスクリプト"
echo "=========================================="
echo ""

# .envファイルの確認
if [ ! -f .env ]; then
    echo "❌ .envファイルが見つかりません"
    echo "📝 env.exampleをコピーして.envを作成してください："
    echo "   cp env.example .env"
    echo ""
    read -p ".envファイルを作成しますか？ (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cp env.example .env
        echo "✅ .envファイルを作成しました"
        echo "⚠️  .envファイルを編集して必要な値を設定してください"
        exit 0
    else
        exit 1
    fi
fi

echo "✅ .envファイルが見つかりました"
echo ""

# Dockerのチェック
if ! command -v docker &> /dev/null; then
    echo "❌ Dockerがインストールされていません"
    echo "📥 https://www.docker.com/get-started からDockerをインストールしてください"
    exit 1
fi

echo "✅ Dockerが見つかりました"
echo ""

# Docker Composeのチェック
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Composeがインストールされていません"
    echo "📥 https://docs.docker.com/compose/install/ からDocker Composeをインストールしてください"
    exit 1
fi

echo "✅ Docker Composeが見つかりました"
echo ""

# Dockerコンテナの起動
echo "🚀 Dockerコンテナを起動しています..."
docker-compose up -d

echo ""
echo "⏳ データベースの起動を待っています..."
sleep 10

# マイグレーションの実行
echo ""
echo "🔄 データベースマイグレーションを実行しています..."
docker-compose exec -T backend python manage.py migrate

echo ""
echo "📦 静的ファイルを収集しています..."
docker-compose exec -T backend python manage.py collectstatic --noinput

echo ""
echo "=========================================="
echo "  セットアップ完了！"
echo "=========================================="
echo ""
echo "次のステップ："
echo ""
echo "1. スーパーユーザーを作成："
echo "   docker-compose exec backend python manage.py createsuperuser"
echo ""
echo "2. アクセス確認："
echo "   - フロントエンド: http://localhost:3000"
echo "   - バックエンド API: http://localhost:8000/api"
echo "   - Django管理画面: http://localhost:8000/admin"
echo ""
echo "3. ログの確認："
echo "   docker-compose logs -f"
echo ""
echo "4. コンテナの停止："
echo "   docker-compose down"
echo ""

