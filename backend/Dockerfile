FROM python:3.11-slim

# 環境変数設定
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# 作業ディレクトリ
WORKDIR /app

# システム依存関係のインストール
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Pythonパッケージのインストール
COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# アプリケーションコードのコピー
COPY . .

# 静的ファイルとメディアファイル用のディレクトリ作成
RUN mkdir -p staticfiles media

# ポート公開
EXPOSE 8000

# デフォルトコマンド
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]

