'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          🚀 Next.js 講座
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
            ホーム
          </Link>
          <Link href="/about" className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}>
            詳細
          </Link>
          <Link href="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}>
            ブログ
          </Link>
          <Link href="/nextjs" className={`${styles.navLink} ${isActive('/nextjs') ? styles.active : ''}`}>
            Next.js
          </Link>
          <Link href="/typescript" className={`${styles.navLink} ${isActive('/typescript') ? styles.active : ''}`}>
            TypeScript
          </Link>
          <Link href="/react" className={`${styles.navLink} ${isActive('/react') ? styles.active : ''}`}>
            React
          </Link>
        </nav>
      </div>
    </header>
  );
} 