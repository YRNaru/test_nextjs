# PowerShellクリーンアップスクリプト
# すべてのコンテナ、ボリューム、ビルドキャッシュを削除します

$ErrorActionPreference = "Stop"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  クリーンアップスクリプト" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$response = Read-Host "⚠️  すべてのコンテナ、ボリューム、データを削除します。続行しますか？ (y/n)"

if ($response -ne 'y' -and $response -ne 'Y') {
    Write-Host "キャンセルしました" -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🛑 コンテナを停止しています..." -ForegroundColor Cyan
docker-compose down

Write-Host ""
Write-Host "🗑️  ボリュームを削除しています..." -ForegroundColor Cyan
docker-compose down -v

Write-Host ""
Write-Host "🧹 未使用のDockerイメージを削除しています..." -ForegroundColor Cyan
docker image prune -f

Write-Host ""
Write-Host "✅ クリーンアップが完了しました" -ForegroundColor Green
Write-Host ""
Write-Host "再度セットアップするには：" -ForegroundColor Yellow
Write-Host "  .\scripts\setup.ps1" -ForegroundColor Gray
Write-Host ""

