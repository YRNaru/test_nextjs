FROM python:3.11-slim

# 環境変数設定
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# 作業ディレクトリ
WORKDIR /app

# システム依存関係のインストール
# PyMySQLを使用するため、libmysqlclient-devは不要（オプショナル）
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
RUN mkdir -p staticfiles media

# ポート公開
EXPOSE 8000

# デフォルトコマンド（開発環境用）
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

