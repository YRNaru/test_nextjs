# ============================================
# ステージ1: ベースイメージ
# ============================================
FROM python:3.11-slim AS base

# 環境変数設定
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    POETRY_VERSION=1.5.1

# 作業ディレクトリ
WORKDIR /app

# ============================================
# ステージ2: 依存関係のビルド
# ============================================
FROM base AS builder

# システム依存関係のインストール
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Pythonパッケージのインストール
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --user -r requirements.txt

# ============================================
# ステージ3: 本番用ランタイム
# ============================================
FROM base AS runner

# セキュリティのため非rootユーザーを作成
RUN groupadd -r django && useradd -r -g django django

# ビルドステージから依存関係をコピー
COPY --from=builder --chown=django:django /root/.local /home/django/.local

# PATHに追加
ENV PATH=/home/django/.local/bin:$PATH

# 必要最小限のシステムパッケージをインストール
RUN apt-get update && apt-get install -y \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# アプリケーションコードのコピー
COPY --chown=django:django . .

# 静的ファイルとメディアファイル用のディレクトリ作成
RUN mkdir -p staticfiles media logs && \
    chown -R django:django staticfiles media logs

# 非rootユーザーに切り替え
USER django

# 静的ファイルの収集（本番用）
RUN python manage.py collectstatic --noinput || true

# ポート公開
EXPOSE 8000

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/admin/login/')"

# Gunicornで本番サーバーを起動
CMD ["gunicorn", "config.wsgi:application", \
     "--bind", "0.0.0.0:8000", \
     "--workers", "4", \
     "--threads", "2", \
     "--worker-class", "gthread", \
     "--worker-tmp-dir", "/dev/shm", \
     "--access-logfile", "-", \
     "--error-logfile", "-", \
     "--log-level", "info"]

# ============================================
# 開発環境用のステージ
# ============================================
FROM base AS dev

# システム依存関係のインストール
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Pythonパッケージのインストール
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# アプリケーションコードのコピー
COPY . .

# 静的ファイルとメディアファイル用のディレクトリ作成
RUN mkdir -p staticfiles media logs

# ポート公開
EXPOSE 8000

# 開発サーバーの起動
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

