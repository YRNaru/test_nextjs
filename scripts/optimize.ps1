# プロジェクト最適化スクリプト（PowerShell版）
# 使用方法: .\scripts\optimize.ps1

Write-Host "🚀 プロジェクト最適化を開始します..." -ForegroundColor Cyan

# 1. フロントエンドの最適化チェック
Write-Host "`n📦 フロントエンドのビルド分析中..." -ForegroundColor Yellow
Set-Location frontend

if (Test-Path "package.json") {
    Write-Host "✅ package.json found" -ForegroundColor Green
    
    # 依存関係の更新チェック
    Write-Host "依存関係のチェック..."
    npm outdated
    
    # ビルドサイズの分析
    Write-Host "`n🔨 ビルド実行中..."
    $buildResult = npm run build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ビルド成功" -ForegroundColor Green
        
        # .next フォルダのサイズを確認
        if (Test-Path ".next") {
            Write-Host "`n📊 ビルドサイズ:" -ForegroundColor Yellow
            $nextSize = (Get-ChildItem -Path ".next" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Host ".next フォルダ: $([math]::Round($nextSize, 2)) MB"
            
            if (Test-Path ".next\static") {
                $staticSize = (Get-ChildItem -Path ".next\static" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
                Write-Host ".next\static フォルダ: $([math]::Round($staticSize, 2)) MB"
            }
        }
    }
    else {
        Write-Host "❌ ビルド失敗" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    
    # TypeScriptのチェック
    Write-Host "`n🔍 TypeScriptのチェック中..." -ForegroundColor Yellow
    npm run tsc
    
    # Lintのチェック
    Write-Host "`n🔍 ESLintのチェック中..." -ForegroundColor Yellow
    npm run lint
}
else {
    Write-Host "❌ package.json が見つかりません" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

# 2. バックエンドの最適化チェック
Write-Host "`n📦 バックエンドのチェック中..." -ForegroundColor Yellow
Set-Location backend

if (Test-Path "requirements.txt") {
    Write-Host "✅ requirements.txt found" -ForegroundColor Green
    
    # Python環境のチェック
    $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
    if ($pythonCmd) {
        $pythonVersion = python --version
        Write-Host "Python version: $pythonVersion"
        
        # 仮想環境のチェック
        if ((Test-Path "venv") -or $env:VIRTUAL_ENV) {
            Write-Host "✅ 仮想環境が検出されました" -ForegroundColor Green
        }
        else {
            Write-Host "⚠️  仮想環境が検出されませんでした" -ForegroundColor Yellow
        }
        
        # Djangoのチェック
        Write-Host "`n🔍 Djangoのチェック中..." -ForegroundColor Yellow
        python manage.py check
        
        # マイグレーションのチェック
        Write-Host "`n🔍 マイグレーションのチェック中..." -ForegroundColor Yellow
        python manage.py makemigrations --dry-run --check
        
        # テストの実行
        Write-Host "`n🧪 テストの実行中..." -ForegroundColor Yellow
        python manage.py test --verbosity=1
    }
    else {
        Write-Host "❌ Pythonが見つかりません" -ForegroundColor Red
    }
}
else {
    Write-Host "❌ requirements.txt が見つかりません" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

# 3. Dockerの最適化チェック
Write-Host "`n🐳 Dockerイメージのチェック中..." -ForegroundColor Yellow

$dockerCmd = Get-Command docker -ErrorAction SilentlyContinue
if ($dockerCmd) {
    Write-Host "✅ Docker が利用可能です" -ForegroundColor Green
    
    # イメージサイズの確認
    $images = docker images | Select-String "test_nextjs"
    if ($images) {
        Write-Host "`n📊 Dockerイメージサイズ:" -ForegroundColor Yellow
        $images | ForEach-Object { Write-Host $_ }
    }
    
    # 未使用のイメージとコンテナの確認
    Write-Host "`n🧹 未使用のDockerリソース:" -ForegroundColor Yellow
    $danglingImages = docker images -f "dangling=true" -q
    Write-Host "未使用イメージ: $($danglingImages.Count)"
    $exitedContainers = docker ps -a -f "status=exited" -q
    Write-Host "停止中のコンテナ: $($exitedContainers.Count)"
}
else {
    Write-Host "⚠️  Docker が見つかりません" -ForegroundColor Yellow
}

# 4. 最適化の推奨事項
Write-Host "`n✨ 最適化の推奨事項:" -ForegroundColor Green
Write-Host "1. フロントエンド:"
Write-Host "   - npm run analyze でバンドルサイズを分析"
Write-Host "   - 不要な依存関係を削除"
Write-Host "   - 画像をWebP/AVIF形式に変換"
Write-Host ""
Write-Host "2. バックエンド:"
Write-Host "   - データベースクエリの最適化（select_related/prefetch_related）"
Write-Host "   - Redisキャッシュの活用"
Write-Host "   - 不要なログの削除"
Write-Host ""
Write-Host "3. Docker:"
Write-Host "   - docker system prune で未使用リソースを削除"
Write-Host "   - マルチステージビルドの活用"
Write-Host "   - .dockerignore の最適化"
Write-Host ""

Write-Host "🎉 最適化チェックが完了しました！" -ForegroundColor Green

