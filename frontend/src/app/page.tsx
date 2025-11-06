import Link from "next/link";
import styles from "./styles/about.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>📖 サイト</h1>
        <div className={styles.section}>
          <h2>🎯 この講座について</h2>
          <p>
            この講座では、モダンWebアプリケーション(Next.js)の基本から実践的な開発まで、段階的に学んでいきます。
            実際にコードを書きながら、Next.jsの強力な機能を体験してください。
          </p>
        </div>

        <div className={styles.section}>
          <h2>📚 学習内容</h2>
          <ul>
            <li><strong>App Router</strong> - 新しいルーティングシステム</li>
            <li><strong>コンポーネント</strong> - 再利用可能なUI部品</li>
            <li><strong>スタイリング</strong> - CSS ModulesとTailwind CSS</li>
            <li><strong>データフェッチ</strong> - API RoutesとSSR</li>
            <li><strong>デプロイ</strong> - Vercelへの公開</li>
            <li><strong>React</strong> - コンポーネントベースのUI開発</li>
            <li><strong>TypeScript</strong> - 静的型付けによるコードの安全性</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>🛠️ 開発環境</h2>
          <p>
            現在使用している技術スタック：
          </p>
          <div className={styles.techStack}>
            <span className={styles.tech}>Next.js 15.3.4</span>
            <span className={styles.tech}>React 18</span>
            <span className={styles.tech}>TypeScript</span>
            <span className={styles.tech}>CSS Modules</span>
            <span className={styles.tech}>Tailwind CSS</span>
            <span className={styles.tech}>React</span>
            <span className={styles.tech}>TypeScript</span>
          </div>
        </div>

        <div className={styles.navigation}>
          <Link href="/mypage" className={styles.link}>
            ← マイページへ
          </Link>
        </div>
      </main>
    </div>
  );
}
