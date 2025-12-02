#!/bin/bash

# プロジェクト最適化スクリプト
# 使用方法: ./scripts/optimize.sh

set -e

echo "🚀 プロジェクト最適化を開始します..."

# カラー定義
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. フロントエンドの最適化チェック
echo -e "\n${YELLOW}📦 フロントエンドのビルド分析中...${NC}"
cd frontend

if [ -f "package.json" ]; then
    echo "✅ package.json found"
    
    # 依存関係の更新チェック
    echo "依存関係のチェック..."
    npm outdated || true
    
    # ビルドサイズの分析
    if npm run build; then
        echo -e "${GREEN}✅ ビルド成功${NC}"
        
        # .next フォルダのサイズを確認
        if [ -d ".next" ]; then
            echo -e "\n${YELLOW}📊 ビルドサイズ:${NC}"
            du -sh .next
            du -sh .next/static
        fi
    else
        echo -e "${RED}❌ ビルド失敗${NC}"
        exit 1
    fi
    
    # TypeScriptのチェック
    echo -e "\n${YELLOW}🔍 TypeScriptのチェック中...${NC}"
    npm run tsc || true
    
    # Lintのチェック
    echo -e "\n${YELLOW}🔍 ESLintのチェック中...${NC}"
    npm run lint || true
else
    echo -e "${RED}❌ package.json が見つかりません${NC}"
    exit 1
fi

cd ..

# 2. バックエンドの最適化チェック
echo -e "\n${YELLOW}📦 バックエンドのチェック中...${NC}"
cd backend

if [ -f "requirements.txt" ]; then
    echo "✅ requirements.txt found"
    
    # Python環境のチェック
    if command -v python &> /dev/null; then
        python_version=$(python --version)
        echo "Python version: $python_version"
        
        # 仮想環境のチェック
        if [ -d "venv" ] || [ -n "$VIRTUAL_ENV" ]; then
            echo "✅ 仮想環境が検出されました"
        else
            echo -e "${YELLOW}⚠️  仮想環境が検出されませんでした${NC}"
        fi
        
        # Djangoのチェック
        echo -e "\n${YELLOW}🔍 Djangoのチェック中...${NC}"
        python manage.py check || true
        
        # マイグレーションのチェック
        echo -e "\n${YELLOW}🔍 マイグレーションのチェック中...${NC}"
        python manage.py makemigrations --dry-run --check || true
        
        # テストの実行
        echo -e "\n${YELLOW}🧪 テストの実行中...${NC}"
        python manage.py test --verbosity=1 || true
    else
        echo -e "${RED}❌ Pythonが見つかりません${NC}"
    fi
else
    echo -e "${RED}❌ requirements.txt が見つかりません${NC}"
    exit 1
fi

cd ..

# 3. Dockerの最適化チェック
echo -e "\n${YELLOW}🐳 Dockerイメージのチェック中...${NC}"

if command -v docker &> /dev/null; then
    echo "✅ Docker が利用可能です"
    
    # イメージサイズの確認
    if docker images | grep -q "test_nextjs"; then
        echo -e "\n${YELLOW}📊 Dockerイメージサイズ:${NC}"
        docker images | grep test_nextjs | awk '{print $1, $2, $7}'
    fi
    
    # 未使用のイメージとコンテナの確認
    echo -e "\n${YELLOW}🧹 未使用のDockerリソース:${NC}"
    echo "未使用イメージ:"
    docker images -f "dangling=true" -q | wc -l || echo "0"
    echo "停止中のコンテナ:"
    docker ps -a -f "status=exited" -q | wc -l || echo "0"
else
    echo -e "${YELLOW}⚠️  Docker が見つかりません${NC}"
fi

# 4. 最適化の推奨事項
echo -e "\n${GREEN}✨ 最適化の推奨事項:${NC}"
echo "1. フロントエンド:"
echo "   - npm run analyze でバンドルサイズを分析"
echo "   - 不要な依存関係を削除"
echo "   - 画像をWebP/AVIF形式に変換"
echo ""
echo "2. バックエンド:"
echo "   - データベースクエリの最適化（select_related/prefetch_related）"
echo "   - Redisキャッシュの活用"
echo "   - 不要なログの削除"
echo ""
echo "3. Docker:"
echo "   - docker system prune で未使用リソースを削除"
echo "   - マルチステージビルドの活用"
echo "   - .dockerignore の最適化"
echo ""

echo -e "${GREEN}🎉 最適化チェックが完了しました！${NC}"

