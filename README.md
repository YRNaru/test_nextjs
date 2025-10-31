# Next.js 初心者講座プロジェクト

このプロジェクトは、Next.js 15.3.4を使用したReact + TypeScriptの学習用アプリケーションです。

## 🚀 技術スタック

- **Next.js 15.3.4** - Reactフレームワーク
- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **CSS Modules** - スコープされたスタイリング
- **Turbopack** - 高速な開発サーバー

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # ホームページ (/)
│   ├── layout.tsx         # 共通レイアウト
│   ├── about/
│   │   ├── page.tsx       # Aboutページ (/about)
│   │   └── about.module.css
│   ├── page.module.css    # ホームページのスタイル
│   └── globals.css        # グローバルスタイル
├── components/            # 再利用可能なコンポーネント
│   ├── FeatureCard.tsx
│   └── FeatureCard.module.css
├── api/                   # API関連
│   ├── client.ts          # APIクライアント
│   └── constants.ts       # API定数
├── assets/                # 静的アセット
├── hooks/                 # カスタムReactフック
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── pages/                 # ページコンポーネント
├── routes/                # ルーティング関連
├── types/                 # TypeScript型定義
│   └── index.ts
├── utils/                 # ユーティリティ関数
│   ├── format.ts
│   └── validation.ts
└── lib/                   # ライブラリ関連
```

## 🛠️ 開発環境のセットアップ

### 前提条件
- Node.js 18.0.0以上
- npm または yarn

### インストール
```bash
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 📚 学習内容

### 1. Next.jsの基本概念
- App Router（新しいルーティングシステム）
- ファイルベースルーティング
- Server Components vs Client Components

### 2. コンポーネント開発
- 再利用可能なコンポーネントの作成
- CSS Modulesを使ったスタイリング
- TypeScriptによる型安全性

### 3. プロジェクト構造
- 体系的なフォルダ構成
- 型定義の管理
- ユーティリティ関数の整理

### 4. カスタムフック
- ローカルストレージ管理
- テーマ切り替え機能

### 5. API開発
- APIクライアントの実装
- 共通のHTTPリクエスト処理

## 🎯 次のステップ

1. **API Routesの実装** - バックエンド機能の追加
2. **データベース連携** - 実際のデータを使ったアプリケーション
3. **認証機能** - ユーザーログイン機能
4. **デプロイ** - Vercelへの公開

## 📖 参考資料

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [React公式ドキュメント](https://react.dev)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs)

## 🤝 コントリビューション

このプロジェクトは学習目的で作成されています。改善提案やバグ報告は歓迎します。

## 📄 ライセンス

MIT License
