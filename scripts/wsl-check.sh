#!/bin/bash

# WSL環境チェックスクリプト
# WSL2で適切に動作しているか確認します

echo "=========================================="
echo "  WSL環境チェック"
echo "=========================================="
echo ""

# WSLかどうかを確認
if grep -q Microsoft /proc/version; then
    echo "✅ WSL環境で実行中です"
    
    # WSL2かどうかを確認
    if grep -q WSL2 /proc/version; then
        echo "✅ WSL2で実行中です（推奨）"
    else
        echo "⚠️  WSL1で実行中です。WSL2へのアップグレードを推奨します"
        echo "   PowerShellで実行: wsl --set-version Ubuntu-22.04 2"
    fi
else
    echo "ℹ️  WSL環境ではありません（通常のLinux環境）"
fi

echo ""

# 現在のディレクトリがWSL内かWindowsマウントポイントか確認
CURRENT_DIR=$(pwd)
if [[ $CURRENT_DIR == /mnt/* ]]; then
    echo "⚠️  Windowsファイルシステム上で実行中です: $CURRENT_DIR"
    echo "   パフォーマンスのため、WSL内（~/ 配下）への移動を推奨します"
    echo ""
    echo "   推奨手順:"
    echo "   1. cd ~"
    echo "   2. git clone <repository> test_nextjs"
    echo "   3. cd test_nextjs"
else
    echo "✅ WSLファイルシステム上で実行中です: $CURRENT_DIR"
fi

echo ""

# Dockerの確認
if command -v docker &> /dev/null; then
    echo "✅ Dockerコマンドが見つかりました"
    
    # Dockerが実行中か確認
    if docker info &> /dev/null; then
        echo "✅ Dockerデーモンが実行中です"
        
        # Dockerのバージョン
        DOCKER_VERSION=$(docker --version)
        echo "   $DOCKER_VERSION"
    else
        echo "❌ Dockerデーモンが実行されていません"
        echo ""
        echo "   解決方法:"
        echo "   - Docker Desktopを起動してください"
        echo "   - または: sudo service docker start"
    fi
else
    echo "❌ Dockerがインストールされていません"
    echo ""
    echo "   解決方法:"
    echo "   1. Docker Desktop for Windowsをインストール"
    echo "   2. 詳細は WSL_SETUP.md を参照"
fi

echo ""

# Docker Composeの確認
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Composeが見つかりました"
    COMPOSE_VERSION=$(docker-compose --version)
    echo "   $COMPOSE_VERSION"
else
    echo "⚠️  docker-compose コマンドが見つかりません"
    
    # docker compose (V2) を確認
    if docker compose version &> /dev/null; then
        echo "✅ Docker Compose V2 (docker compose) が利用可能です"
        COMPOSE_V2_VERSION=$(docker compose version)
        echo "   $COMPOSE_V2_VERSION"
    else
        echo "❌ Docker Composeがインストールされていません"
    fi
fi

echo ""

# Gitの確認
if command -v git &> /dev/null; then
    echo "✅ Gitがインストールされています"
    GIT_VERSION=$(git --version)
    echo "   $GIT_VERSION"
    
    # Git設定の確認
    GIT_NAME=$(git config --global user.name)
    GIT_EMAIL=$(git config --global user.email)
    
    if [ -z "$GIT_NAME" ] || [ -z "$GIT_EMAIL" ]; then
        echo "⚠️  Git設定が不完全です"
        echo ""
        echo "   以下のコマンドで設定してください:"
        echo '   git config --global user.name "Your Name"'
        echo '   git config --global user.email "your.email@example.com"'
    else
        echo "   ユーザー名: $GIT_NAME"
        echo "   メール: $GIT_EMAIL"
    fi
else
    echo "❌ Gitがインストールされていません"
    echo "   sudo apt install git"
fi

echo ""

# メモリの確認
TOTAL_MEM=$(free -h | awk '/^Mem:/ {print $2}')
USED_MEM=$(free -h | awk '/^Mem:/ {print $3}')
echo "💾 メモリ: $USED_MEM / $TOTAL_MEM 使用中"

# ディスク容量の確認
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}')
DISK_AVAIL=$(df -h . | awk 'NR==2 {print $4}')
echo "💿 ディスク: $DISK_USAGE 使用中 ($DISK_AVAIL 利用可能)"

echo ""

# .envファイルの確認
if [ -f .env ]; then
    echo "✅ .envファイルが存在します"
else
    echo "⚠️  .envファイルが見つかりません"
    echo "   cp env.example .env を実行してください"
fi

echo ""
echo "=========================================="
echo "  チェック完了"
echo "=========================================="
echo ""

# 問題がある場合の案内
if [[ $CURRENT_DIR == /mnt/* ]] || ! docker info &> /dev/null 2>&1; then
    echo "⚠️  いくつかの問題が検出されました"
    echo "   詳細は WSL_SETUP.md を確認してください"
    exit 1
else
    echo "✅ 環境は正常です。開発を開始できます！"
    echo ""
    echo "次のステップ:"
    echo "  ./scripts/setup.sh    - セットアップ実行"
    echo "  docker-compose up -d  - コンテナ起動"
    exit 0
fi

