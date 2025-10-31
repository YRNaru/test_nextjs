import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          🚀 Next.js 講座
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            ホーム
          </Link>
          <Link href="/about" className={styles.navLink}>
            詳細
          </Link>
          <Link href="/blog" className={styles.navLink}>
            ブログ
          </Link>
          <Link href="/nextjs" className={styles.navLink}>
            Next.js
          </Link>
          <Link href="/typescript" className={styles.navLink}>
            TypeScript
          </Link>
          <Link href="/react" className={styles.navLink}>
            React
          </Link>
        </nav>
      </div>
    </header>
  );
} 