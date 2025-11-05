#!/bin/bash

# クリーンアップスクリプト
# すべてのコンテナ、ボリューム、ビルドキャッシュを削除します

set -e

echo "=========================================="
echo "  クリーンアップスクリプト"
echo "=========================================="
echo ""

read -p "⚠️  すべてのコンテナ、ボリューム、データを削除します。続行しますか？ (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "キャンセルしました"
    exit 0
fi

echo ""
echo "🛑 コンテナを停止しています..."
docker-compose down

echo ""
echo "🗑️  ボリュームを削除しています..."
docker-compose down -v

echo ""
echo "🧹 未使用のDockerイメージを削除しています..."
docker image prune -f

echo ""
echo "✅ クリーンアップが完了しました"
echo ""
echo "再度セットアップするには："
echo "  ./scripts/setup.sh"
echo ""

