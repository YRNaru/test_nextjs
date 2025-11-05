# WSL/Ubuntu セットアップガイド

このガイドでは、WSL（Windows Subsystem for Linux）/Ubuntu環境でのセットアップ方法を説明します。

## 📋 目次

1. [WSL2のセットアップ](#wsl2のセットアップ)
2. [Ubuntu環境の準備](#ubuntu環境の準備)
3. [Docker環境のセットアップ](#docker環境のセットアップ)
4. [プロジェクトのセットアップ](#プロジェクトのセットアップ)
5. [トラブルシューティング](#トラブルシューティング)

## 🔧 WSL2のセットアップ

### 1. WSL2の有効化

PowerShellを**管理者権限**で開いて実行：

```powershell
# WSLを有効化
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 仮想マシンプラットフォームを有効化
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 再起動
Restart-Computer
```

再起動後、再度PowerShellを管理者権限で開いて：

```powershell
# WSL2をデフォルトに設定
wsl --set-default-version 2
```

### 2. Ubuntuのインストール

**方法1: Microsoft Storeから**
1. Microsoft Storeを開く
2. "Ubuntu 22.04 LTS"を検索
3. インストール
4. 起動してユーザー名とパスワードを設定

**方法2: コマンドラインから**

```powershell
# 利用可能なディストリビューションを確認
wsl --list --online

# Ubuntuをインストール
wsl --install -d Ubuntu-22.04
```

### 3. WSL2であることを確認

```powershell
# インストールされているディストリビューションを確認
wsl --list --verbose

# Ubuntu-22.04がバージョン2であることを確認
# バージョン1の場合は以下で変換
wsl --set-version Ubuntu-22.04 2
```

## 🐧 Ubuntu環境の準備

### 1. Ubuntuを起動

```powershell
# Ubuntuを起動
wsl -d Ubuntu-22.04
```

または、スタートメニューから「Ubuntu 22.04」を起動

### 2. システムのアップデート

```bash
# パッケージリストを更新
sudo apt update

# インストール済みパッケージをアップグレード
sudo apt upgrade -y
```

### 3. 基本的なツールのインストール

```bash
# 必要なツールをインストール
sudo apt install -y \
    build-essential \
    curl \
    wget \
    git \
    vim \
    nano \
    ca-certificates \
    gnupg \
    lsb-release
```

### 4. Gitの設定

```bash
# Gitユーザー情報を設定
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Gitエディタを設定（お好みで）
git config --global core.editor "nano"

# WSL特有の設定（改行コードの自動変換を無効化）
git config --global core.autocrlf input
```

## 🐳 Docker環境のセットアップ

### オプション1: Docker Desktop for Windows（推奨）

#### 1. Docker Desktopのインストール

1. [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)をダウンロード
2. インストーラーを実行
3. インストール時に「Use WSL 2 instead of Hyper-V」を選択

#### 2. Docker DesktopでWSL2統合を有効化

1. Docker Desktopを起動
2. Settings（設定）> Resources > WSL Integration
3. "Enable integration with my default WSL distro"を有効化
4. Ubuntu-22.04を有効化
5. "Apply & Restart"をクリック

#### 3. WSL内で確認

```bash
# Dockerが使えるか確認
docker --version
docker-compose --version

# Dockerが動作しているか確認
docker run hello-world
```

### オプション2: WSL内に直接Dockerをインストール

Docker Desktopを使わない場合（軽量・高速）：

```bash
# Docker公式GPGキーを追加
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Dockerリポジトリを追加
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# パッケージリストを更新
sudo apt update

# Dockerをインストール
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 現在のユーザーをdockerグループに追加（sudoなしで実行できるように）
sudo usermod -aG docker $USER

# グループ変更を反映（ログアウト/ログインでも可）
newgrp docker

# Dockerサービスを開始
sudo service docker start

# 自動起動を有効化（WSL2では手動起動が必要な場合あり）
# ~/.bashrc に以下を追加すると起動時に自動的に開始される
echo 'if [ -z "$(ps aux | grep dockerd | grep -v grep)" ]; then
    sudo service docker start > /dev/null 2>&1
fi' >> ~/.bashrc

# 確認
docker --version
docker compose version
```

**注意**: WSL2でDockerデーモンを直接実行する場合、WSLを開くたびに`sudo service docker start`が必要な場合があります。

## 🚀 プロジェクトのセットアップ

### 1. プロジェクトディレクトリへ移動

**方法1: WSL内にクローン（推奨）**

```bash
# ホームディレクトリに移動
cd ~

# プロジェクトをクローン
git clone <your-repository-url> test_nextjs
cd test_nextjs
```

**方法2: Windows側のディレクトリを使用**

```bash
# Windowsのディレクトリにアクセス
cd /mnt/c/Users/yamam/OneDrive/ドキュメント/test_nextjs
```

⚠️ **注意**: Windows側のディレクトリ（/mnt/c/...）を使用すると、ファイルシステムのパフォーマンスが低下します。WSL内（~/test_nextjs）にクローンすることを強く推奨します。

### 2. 環境変数の設定

```bash
# .envファイルを作成
cp env.example .env

# .envファイルを編集
nano .env
```

必須の変更項目：
- `SECRET_KEY`: ランダムな文字列に変更
- `DB_PASSWORD`: 安全なパスワードに変更
- `DB_ROOT_PASSWORD`: 安全なパスワードに変更

保存して終了: `Ctrl + X` → `Y` → `Enter`

### 3. 環境チェック（推奨）

```bash
# 環境チェックスクリプトに実行権限を付与
chmod +x scripts/wsl-check.sh

# WSL環境が正しく設定されているか確認
./scripts/wsl-check.sh
```

このスクリプトは以下を確認します：
- WSL2で動作しているか
- Dockerが正しくインストールされているか
- パフォーマンスに最適な場所（WSL内）で作業しているか

### 4. セットアップスクリプトの実行

```bash
# スクリプトに実行権限を付与
chmod +x scripts/*.sh

# セットアップを実行
./scripts/setup.sh
```

セットアップが完了したら：

```bash
# スーパーユーザーを作成
docker-compose exec backend python manage.py createsuperuser
```

### 5. アクセス確認

- **フロントエンド**: http://localhost:3000
- **バックエンドAPI**: http://localhost:8000/api
- **Django管理画面**: http://localhost:8000/admin

WSLからでもWindowsのブラウザで上記URLにアクセスできます！

## 🔧 開発のベストプラクティス

### VS CodeでWSLを使う

1. VS Codeに「WSL」拡張機能をインストール
2. VS Codeを開き、左下の緑色のアイコンをクリック
3. "Connect to WSL"を選択
4. プロジェクトフォルダを開く: `~/test_nextjs`

または、WSLから直接VS Codeを開く：

```bash
cd ~/test_nextjs
code .
```

### CursorでWSLを使う

```bash
cd ~/test_nextjs
cursor .
```

### ファイルのパーミッション

WSL内でファイルを作成すると、Windowsからもアクセスできます：

```bash
# WSL内のファイルパス
~/test_nextjs

# Windowsからのアクセスパス
\\wsl$\Ubuntu-22.04\home\<username>\test_nextjs
```

エクスプローラーのアドレスバーに `\\wsl$` と入力すると、WSLのファイルシステムが表示されます。

### パフォーマンス最適化

```bash
# Docker ComposeでWSL2の最適化設定を使用
# docker-compose.ymlはすでに最適化されています

# Dockerのメモリ制限を設定（必要に応じて）
# ~/.wslconfigファイルを作成
cat > ~/.wslconfig << 'EOF'
[wsl2]
memory=8GB
processors=4
swap=2GB
EOF

# WSLを再起動して設定を反映
# PowerShellで実行:
# wsl --shutdown
# 再度WSLを起動
```

## 🛠 トラブルシューティング

### 1. Docker Daemonが起動しない

**エラー**: `Cannot connect to the Docker daemon`

**解決方法**:

```bash
# Dockerサービスを起動
sudo service docker start

# 状態を確認
sudo service docker status

# Docker Desktopを使用している場合
# Docker Desktopが起動していることを確認
```

### 2. ポート競合エラー

**エラー**: `port is already allocated`

**解決方法**:

```bash
# 使用中のポートを確認
sudo lsof -i :3000
sudo lsof -i :8000

# プロセスを終了
sudo kill -9 <PID>

# または、docker-compose.ymlでポートを変更
```

### 3. パーミッションエラー

**エラー**: `Permission denied`

**解決方法**:

```bash
# 現在のユーザーをdockerグループに追加
sudo usermod -aG docker $USER

# ログアウト/ログインまたは
newgrp docker

# ファイルのパーミッションを修正
chmod +x scripts/*.sh
```

### 4. WSL2でDockerが遅い

**解決方法**:

1. **プロジェクトをWSL内に配置**
   ```bash
   # /mnt/c/... ではなく ~/test_nextjs を使用
   ```

2. **Docker Desktopの設定を最適化**
   - Settings > Resources > WSL Integration
   - メモリを増やす（推奨: 8GB）

3. **WSL2のメモリ制限を調整**
   - `~/.wslconfig`を編集（上記参照）

### 5. npm/pipのインストールが遅い

**解決方法**:

```bash
# npmのキャッシュを使用
cd frontend
npm ci --cache /tmp/npm-cache

# pipのキャッシュを使用
cd backend
pip install -r requirements.txt --cache-dir /tmp/pip-cache
```

### 6. Dockerイメージのビルドが失敗

**解決方法**:

```bash
# キャッシュを使わずに再ビルド
docker-compose build --no-cache

# 未使用のイメージを削除
docker system prune -a

# 再度ビルド
docker-compose up --build
```

### 7. データベース接続エラー

**解決方法**:

```bash
# コンテナの状態を確認
docker-compose ps

# データベースログを確認
docker-compose logs db

# データベースコンテナを再起動
docker-compose restart db

# データベースに直接接続してテスト
docker-compose exec db mysql -u test_user -p test_nextjs_db
```

## 📊 WSL2のリソース監視

```bash
# WSL2のメモリ使用量を確認
free -h

# Dockerコンテナのリソース使用状況
docker stats

# ディスク使用量
df -h
```

## 🔄 WSL2のメンテナンス

### WSL2のシャットダウンと再起動

PowerShellで：

```powershell
# WSL2を完全にシャットダウン
wsl --shutdown

# 特定のディストリビューションを再起動
wsl -d Ubuntu-22.04
```

### WSL2のバックアップ

```powershell
# Ubuntuをエクスポート（バックアップ）
wsl --export Ubuntu-22.04 D:\Backup\ubuntu-backup.tar

# リストア
wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 D:\Backup\ubuntu-backup.tar
```

## 🚀 次のステップ

1. **開発環境の確認**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

2. **開発を開始**
   - VS Code/CursorでWSLに接続
   - プロジェクトを開く: `~/test_nextjs`

3. **開発用ヘルパースクリプトを使用**
   ```bash
   # 開発用スクリプトに実行権限を付与
   chmod +x scripts/dev.sh
   
   # 使い方を確認
   ./scripts/dev.sh help
   
   # よく使うコマンド
   ./scripts/dev.sh start        # コンテナ起動
   ./scripts/dev.sh logs         # ログ表示
   ./scripts/dev.sh shell-be     # バックエンドシェル
   ./scripts/dev.sh migrate      # マイグレーション
   ```

4. **便利なエイリアスを設定（オプション）**
   ```bash
   # ~/.bashrcに追加
   echo 'alias dev="./scripts/dev.sh"' >> ~/.bashrc
   echo 'alias dcu="docker-compose up -d"' >> ~/.bashrc
   echo 'alias dcd="docker-compose down"' >> ~/.bashrc
   echo 'alias dcl="docker-compose logs -f"' >> ~/.bashrc
   echo 'alias dps="docker-compose ps"' >> ~/.bashrc
   source ~/.bashrc
   
   # 使用例
   dev start    # コンテナ起動
   dev logs-be  # バックエンドログ
   ```

## 📚 追加リソース

### プロジェクト内のドキュメント
- **[WSL_TIPS.md](WSL_TIPS.md)** - パフォーマンス最適化、便利なTips集
- **[QUICK_START.md](QUICK_START.md)** - 5分でセットアップ
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - 詳細なセットアップガイド
- **[.wslconfig.example](.wslconfig.example)** - WSL2のメモリ・CPU設定例

### 公式ドキュメント
- [WSL2 公式ドキュメント](https://learn.microsoft.com/ja-jp/windows/wsl/)
- [Docker Desktop WSL2 バックエンド](https://docs.docker.com/desktop/windows/wsl/)
- [Ubuntu WSL ドキュメント](https://ubuntu.com/wsl)

---

**WSL2での開発を楽しんでください！ 🎉**

