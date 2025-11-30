# PowerShellセットアップスクリプト
# このスクリプトは初回セットアップ時に実行してください

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Test Next.js セットアップスクリプト" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# .envファイルの確認
if (-not (Test-Path .env)) {
    Write-Host "❌ .envファイルが見つかりません" -ForegroundColor Red
    Write-Host "📝 env.exampleをコピーして.envを作成してください：" -ForegroundColor Yellow
    Write-Host "   Copy-Item env.example .env" -ForegroundColor Yellow
    Write-Host ""
    $response = Read-Host ".envファイルを作成しますか？ (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        Copy-Item env.example .env
        Write-Host "✅ .envファイルを作成しました" -ForegroundColor Green
        Write-Host "⚠️  .envファイルを編集して必要な値を設定してください" -ForegroundColor Yellow
        exit 0
    } else {
        exit 1
    }
}

Write-Host "✅ .envファイルが見つかりました" -ForegroundColor Green
Write-Host ""

# Dockerのチェック
try {
    docker --version | Out-Null
    Write-Host "✅ Dockerが見つかりました" -ForegroundColor Green
} catch {
    Write-Host "❌ Dockerがインストールされていません" -ForegroundColor Red
    Write-Host "📥 https://www.docker.com/get-started からDockerをインストールしてください" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Docker Composeのチェック
try {
    docker-compose --version | Out-Null
    Write-Host "✅ Docker Composeが見つかりました" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Composeがインストールされていません" -ForegroundColor Red
    Write-Host "📥 https://docs.docker.com/compose/install/ からDocker Composeをインストールしてください" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Dockerコンテナの起動
Write-Host "🚀 Dockerコンテナを起動しています..." -ForegroundColor Cyan
docker-compose up -d

Write-Host ""
Write-Host "⏳ データベースの起動を待っています..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# マイグレーションの実行
Write-Host ""
Write-Host "🔄 データベースマイグレーションを実行しています..." -ForegroundColor Cyan
docker-compose exec -T backend python manage.py migrate

Write-Host ""
Write-Host "📦 静的ファイルを収集しています..." -ForegroundColor Cyan
docker-compose exec -T backend python manage.py collectstatic --noinput

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  セットアップ完了！" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "次のステップ：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. スーパーユーザーを作成：" -ForegroundColor White
Write-Host "   docker-compose exec backend python manage.py createsuperuser" -ForegroundColor Gray
Write-Host ""
Write-Host "2. アクセス確認：" -ForegroundColor White
Write-Host "   - フロントエンド: http://localhost:3000" -ForegroundColor Gray
Write-Host "   - バックエンド API: http://localhost:8000/api" -ForegroundColor Gray
Write-Host "   - Django管理画面: http://localhost:8000/admin" -ForegroundColor Gray
Write-Host ""
Write-Host "3. ログの確認：" -ForegroundColor White
Write-Host "   docker-compose logs -f" -ForegroundColor Gray
Write-Host ""
Write-Host "4. コンテナの停止：" -ForegroundColor White
Write-Host "   docker-compose down" -ForegroundColor Gray
Write-Host ""

