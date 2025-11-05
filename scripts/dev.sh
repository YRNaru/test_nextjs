#!/bin/bash

# 開発用便利スクリプト
# よく使うコマンドを簡単に実行できます

set -e

show_help() {
    echo "=========================================="
    echo "  開発用ヘルパースクリプト"
    echo "=========================================="
    echo ""
    echo "使い方: ./scripts/dev.sh [コマンド]"
    echo ""
    echo "コマンド:"
    echo "  start          - すべてのコンテナを起動"
    echo "  stop           - すべてのコンテナを停止"
    echo "  restart        - すべてのコンテナを再起動"
    echo "  logs           - すべてのログを表示"
    echo "  logs-fe        - フロントエンドのログを表示"
    echo "  logs-be        - バックエンドのログを表示"
    echo "  logs-celery    - Celeryのログを表示"
    echo "  ps             - コンテナの状態を表示"
    echo "  shell-fe       - フロントエンドコンテナのシェルに入る"
    echo "  shell-be       - バックエンドコンテナのシェルに入る"
    echo "  db-shell       - データベースシェルに入る"
    echo "  migrate        - マイグレーションを実行"
    echo "  makemigrations - マイグレーションファイルを作成"
    echo "  superuser      - スーパーユーザーを作成"
    echo "  test-be        - バックエンドのテストを実行"
    echo "  test-fe        - フロントエンドのテストを実行"
    echo "  clean          - すべてのコンテナとボリュームを削除"
    echo "  rebuild        - コンテナを再ビルド"
    echo "  help           - このヘルプを表示"
    echo ""
}

case "$1" in
    start)
        echo "🚀 コンテナを起動しています..."
        docker-compose up -d
        echo "✅ 起動完了"
        echo ""
        echo "アクセス:"
        echo "  フロントエンド: http://localhost:3000"
        echo "  バックエンド: http://localhost:8000"
        echo "  管理画面: http://localhost:8000/admin"
        ;;
    
    stop)
        echo "🛑 コンテナを停止しています..."
        docker-compose down
        echo "✅ 停止完了"
        ;;
    
    restart)
        echo "🔄 コンテナを再起動しています..."
        docker-compose restart
        echo "✅ 再起動完了"
        ;;
    
    logs)
        echo "📋 すべてのログを表示します（Ctrl+Cで終了）"
        docker-compose logs -f
        ;;
    
    logs-fe)
        echo "📋 フロントエンドのログを表示します（Ctrl+Cで終了）"
        docker-compose logs -f frontend
        ;;
    
    logs-be)
        echo "📋 バックエンドのログを表示します（Ctrl+Cで終了）"
        docker-compose logs -f backend
        ;;
    
    logs-celery)
        echo "📋 Celeryのログを表示します（Ctrl+Cで終了）"
        docker-compose logs -f celery_worker celery_beat
        ;;
    
    ps)
        echo "📊 コンテナの状態:"
        docker-compose ps
        ;;
    
    shell-fe)
        echo "🐚 フロントエンドコンテナに入ります..."
        docker-compose exec frontend sh
        ;;
    
    shell-be)
        echo "🐚 バックエンドコンテナに入ります..."
        docker-compose exec backend sh
        ;;
    
    db-shell)
        echo "🗄️  データベースシェルに入ります..."
        docker-compose exec db mysql -u test_user -p test_nextjs_db
        ;;
    
    migrate)
        echo "🔄 マイグレーションを実行しています..."
        docker-compose exec backend python manage.py migrate
        echo "✅ マイグレーション完了"
        ;;
    
    makemigrations)
        echo "📝 マイグレーションファイルを作成しています..."
        docker-compose exec backend python manage.py makemigrations
        echo "✅ マイグレーションファイル作成完了"
        ;;
    
    superuser)
        echo "👤 スーパーユーザーを作成します..."
        docker-compose exec backend python manage.py createsuperuser
        ;;
    
    test-be)
        echo "🧪 バックエンドのテストを実行しています..."
        docker-compose exec backend python manage.py test
        ;;
    
    test-fe)
        echo "🧪 フロントエンドのテストを実行しています..."
        docker-compose exec frontend npm test
        ;;
    
    clean)
        echo "⚠️  すべてのコンテナとボリュームを削除します"
        read -p "続行しますか？ (y/n): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "🧹 クリーンアップ中..."
            docker-compose down -v
            docker system prune -f
            echo "✅ クリーンアップ完了"
        else
            echo "キャンセルしました"
        fi
        ;;
    
    rebuild)
        echo "🔨 コンテナを再ビルドしています..."
        docker-compose build --no-cache
        docker-compose up -d
        echo "✅ 再ビルド完了"
        ;;
    
    help|--help|-h|"")
        show_help
        ;;
    
    *)
        echo "❌ 不明なコマンド: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

