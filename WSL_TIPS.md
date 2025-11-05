# WSL Tips & Tricks

WSL/Ubuntu環境での開発をより快適にするためのTipsをまとめました。

## 🚀 パフォーマンス最適化

### 1. WSL内でプロジェクトを管理する

❌ **避けるべき**:
```bash
cd /mnt/c/Users/username/Projects/test_nextjs  # 遅い！
```

✅ **推奨**:
```bash
cd ~/test_nextjs  # 高速！
```

**理由**: Windows側のファイルシステム（/mnt/c/...）を使用すると、ファイルI/Oが大幅に遅くなります。

### 2. .wslconfig でリソースを最適化

Windowsユーザーディレクトリに`.wslconfig`ファイルを配置：

```bash
# WSL内から編集
explorer.exe .
# エクスプローラーでC:\Users\<YourUsername>\.wslconfigを作成
```

または：

```powershell
# PowerShellで
notepad $env:USERPROFILE\.wslconfig
```

設定例（プロジェクトの`.wslconfig.example`を参照）を適用後：

```powershell
wsl --shutdown
# WSLを再起動
```

### 3. Dockerイメージのキャッシュ

```bash
# Dockerのビルドキャッシュを活用
docker-compose build

# キャッシュが壊れた場合のみ
docker-compose build --no-cache
```

## 🛠 開発効率化

### 便利なエイリアスを設定

`~/.bashrc`または`~/.zshrc`に追加：

```bash
# プロジェクトディレクトリ
alias proj="cd ~/test_nextjs"

# Docker Compose
alias dcu="docker-compose up -d"
alias dcd="docker-compose down"
alias dcr="docker-compose restart"
alias dcl="docker-compose logs -f"
alias dps="docker-compose ps"

# Django管理
alias djmigrate="docker-compose exec backend python manage.py migrate"
alias djmake="docker-compose exec backend python manage.py makemigrations"
alias djshell="docker-compose exec backend python manage.py shell"
alias djtest="docker-compose exec backend python manage.py test"

# 開発ヘルパー
alias dev="~/test_nextjs/scripts/dev.sh"

# Git（WSL用）
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gp="git push"
alias gl="git pull"
```

適用：
```bash
source ~/.bashrc
```

### VS Code Remote - WSL

1. VS Codeに「WSL」拡張機能をインストール
2. WSLから直接起動：
   ```bash
   cd ~/test_nextjs
   code .
   ```

3. または、VS Codeの左下緑アイコン → "Connect to WSL"

### tmuxで複数ペインを管理

複数のログを同時に表示：

```bash
# tmuxのインストール
sudo apt install tmux

# tmuxを起動
tmux

# ウィンドウを分割
Ctrl+b "    # 横分割
Ctrl+b %    # 縦分割

# ペイン間の移動
Ctrl+b 矢印キー

# 使用例
# ペイン1: フロントエンドログ
docker-compose logs -f frontend

# ペイン2: バックエンドログ
docker-compose logs -f backend

# ペイン3: Celeryログ
docker-compose logs -f celery_worker
```

## 🔧 WSL管理

### WSLのメモリをクリア

WSLがメモリを食い過ぎた場合：

```powershell
# PowerShellで実行
wsl --shutdown

# WSLを再起動
wsl
```

### ディスク容量の確認と最適化

```bash
# WSL内のディスク使用量
df -h

# Dockerの使用量
docker system df

# 不要なDockerリソースを削除
docker system prune -a --volumes

# WSL2のVHDXを最適化（PowerShellで）
# wsl --shutdown
# diskpart
# select vdisk file="C:\Users\<YourUsername>\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu22.04LTS_xxx\LocalState\ext4.vhdx"
# compact vdisk
# exit
```

### WSLインスタンスのバックアップ

```powershell
# エクスポート（バックアップ）
wsl --export Ubuntu-22.04 D:\Backup\ubuntu-dev-backup.tar

# インポート（復元）
wsl --import Ubuntu-Dev D:\WSL\Ubuntu-Dev D:\Backup\ubuntu-dev-backup.tar
```

## 🌐 ネットワーク

### WindowsからWSLにアクセス

```
\\wsl$\Ubuntu-22.04\home\<username>\test_nextjs
```

エクスプローラーのアドレスバーに入力してEnter。

### WSLからWindowsのファイルにアクセス

```bash
# Cドライブ
cd /mnt/c/

# デスクトップ
cd /mnt/c/Users/<username>/Desktop/
```

### ポートフォワーディング

WSL内のサービスにWindowsから自動的にアクセスできますが、
外部からアクセスする場合：

```powershell
# PowerShellで実行（管理者権限）
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<WSL_IP>

# WSLのIPアドレスを確認（WSL内で）
ip addr show eth0 | grep inet
```

## 🐛 デバッグ

### WSLのログを確認

```bash
# WSLシステムログ
dmesg

# Dockerデーモンログ
sudo journalctl -u docker
```

### Docker Composeのデバッグモード

```bash
# 詳細なログを表示
docker-compose --verbose up

# サービスごとの出力を分離しない
docker-compose up --no-color
```

### ファイル変更の監視問題

Next.jsなどのホットリロードが効かない場合：

```bash
# inotify監視数を増やす
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# または、WSL再起動ごとに自動設定
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.d/60-custom.conf
```

## 📦 パッケージ管理

### aptのミラーを変更（日本サーバー）

```bash
# バックアップ
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# 日本のミラーに変更
sudo sed -i 's|http://archive.ubuntu.com|http://jp.archive.ubuntu.com|g' /etc/apt/sources.list

# 更新
sudo apt update
```

### よく使うツールをインストール

```bash
# 開発ツール
sudo apt install -y \
    vim \
    nano \
    htop \
    tree \
    jq \
    curl \
    wget \
    git \
    make \
    build-essential

# ネットワークツール
sudo apt install -y \
    net-tools \
    iputils-ping \
    dnsutils \
    traceroute
```

## 💡 便利なスクリプト

### プロジェクト起動スクリプト

`~/start-dev.sh`を作成：

```bash
#!/bin/bash

echo "🚀 開発環境を起動中..."

# Dockerが起動しているか確認
if ! docker info > /dev/null 2>&1; then
    echo "Dockerを起動しています..."
    sudo service docker start
    sleep 3
fi

# プロジェクトディレクトリに移動
cd ~/test_nextjs

# コンテナを起動
docker-compose up -d

# ログを表示
docker-compose logs -f
```

実行権限を付与：
```bash
chmod +x ~/start-dev.sh
```

### システム情報表示スクリプト

`~/sysinfo.sh`を作成：

```bash
#!/bin/bash

echo "=========================================="
echo "  システム情報"
echo "=========================================="
echo ""
echo "WSL バージョン:"
grep -i wsl /proc/version
echo ""
echo "メモリ使用量:"
free -h
echo ""
echo "ディスク使用量:"
df -h
echo ""
echo "Docker情報:"
docker info --format "{{.ServerVersion}}" 2>/dev/null || echo "Docker未起動"
echo ""
echo "実行中のコンテナ:"
docker ps --format "table {{.Names}}\t{{.Status}}" 2>/dev/null || echo "Docker未起動"
echo ""
```

## 🔒 セキュリティ

### SSH鍵の設定

```bash
# SSH鍵を生成
ssh-keygen -t ed25519 -C "your.email@example.com"

# SSH エージェントに追加
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 公開鍵を表示（GitHubなどに登録）
cat ~/.ssh/id_ed25519.pub
```

### GPG署名の設定

```bash
# GPG鍵を生成
gpg --full-generate-key

# 鍵IDを確認
gpg --list-secret-keys --keyid-format=long

# Gitに設定
git config --global user.signingkey <GPG_KEY_ID>
git config --global commit.gpgsign true
```

## 🎨 ターミナルのカスタマイズ

### Oh My Zsh のインストール

```bash
# Zshのインストール
sudo apt install zsh

# Oh My Zshのインストール
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# テーマを変更
nano ~/.zshrc
# ZSH_THEME="agnoster" または "powerlevel10k/powerlevel10k"

# プラグインを追加
# plugins=(git docker docker-compose node npm python)
```

### カラーテーマ

Windows Terminalの設定で好みのテーマを選択：
- Dracula
- Solarized Dark
- One Half Dark

## 📚 さらに学ぶ

- [WSL公式ドキュメント](https://learn.microsoft.com/ja-jp/windows/wsl/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Ubuntu Server Documentation](https://ubuntu.com/server/docs)

---

**Happy Coding in WSL! 🎉**

