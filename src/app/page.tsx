import styles from "./styles/page.module.css";
import FeatureCard from "../components/FeatureCard";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: "📁",
      title: "ファイルベースルーティング",
      description: "フォルダ構造がURLになる直感的なルーティング"
    },
    {
      icon: "⚡",
      title: "サーバーサイドレンダリング",
      description: "SEOに最適で高速なページ読み込み"
    },
    {
      icon: "🔒",
      title: "TypeScript対応",
      description: "型安全性でバグを防ぐ"
    },
    {
      icon: "🚀",
      title: "自動最適化",
      description: "画像、フォント、バンドルの自動最適化"
    }
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>🚀 Next.js 初心者講座</h1>
        
        <div className={styles.section}>
          <h2>✨ Next.jsとは？</h2>
          <p>
            Next.jsは、ReactベースのフルスタックWebアプリケーションフレームワークです。
            サーバーサイドレンダリング（SSR）、静的サイト生成（SSG）、API Routesなど、
            モダンなWeb開発に必要な機能が全て揃っています。
          </p>
        </div>

        <div className={styles.section}>
          <h2>🎯 主な特徴</h2>
          <div className={styles.features}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>📁 プロジェクト構造</h2>
          <pre className={styles.code}>
{`src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # ホームページ (/)
│   ├── layout.tsx         # 共通レイアウト
│   ├── styles/            # スタイルファイル
│   ├── components/        # ページ専用コンポーネント
│   ├── about/
│   │   └── page.tsx       # Aboutページ (/about)
│   └── globals.css        # グローバルスタイル
├── components/            # 再利用可能なコンポーネント
├── api/                   # API関連
├── hooks/                 # カスタムReactフック
├── types/                 # TypeScript型定義
├── utils/                 # ユーティリティ関数
└── lib/                   # ライブラリ関連`}
          </pre>
        </div>

        <div className={styles.section}>
          <h2>🎉 次のステップ</h2>
          <p>
            このファイル（src/app/page.tsx）を編集して、変更がリアルタイムで反映されることを確認してください！
            ブラウザで http://localhost:3000 を開いて、変更を確認できます。
          </p>
          <div className={styles.navigation}>
            <Link href="/about" className={styles.link}>
              詳細を見る →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
