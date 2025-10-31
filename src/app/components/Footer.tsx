import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>🚀 Next.js 初心者講座</h3>
            <p>
              Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクトです。
            </p>
          </div>
          
          <div className={styles.section}>
            <h4>📚 学習内容</h4>
            <ul>
              <li>App Router</li>
              <li>コンポーネント開発</li>
              <li>TypeScript</li>
              <li>API開発</li>
            </ul>
          </div>
          
          <div className={styles.section}>
            <h4>🔗 リンク</h4>
            <ul>
              <li><a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">Next.js Docs</a></li>
              <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a></li>
              <li><a href="https://www.typescriptlang.org/docs" target="_blank" rel="noopener noreferrer">TypeScript Docs</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2024 Next.js 初心者講座. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 