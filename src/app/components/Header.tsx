'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useSidebar();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className={styles.leftSection}>
          <button 
            onClick={toggleLeftSidebar}
            className={styles.sidebarToggle}
            aria-label={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
            title={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
          >
            {leftSidebarOpen ? '◀' : '▶'}
          </button>
          <Link href="/" className={styles.logo}>
            🚀 モダンWebアプリ開発
          </Link>
        </div>
        
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
          {!isLoading && (
            <>
              {isAuthenticated ? (
                <button 
                  onClick={logout}
                  className={styles.loginButton}
                  aria-label="ログアウト"
                >
                  ログアウト
                </button>
              ) : (
                <Link 
                  href="/login" 
                  className={styles.loginButton}
                >
                  ログイン
                </Link>
              )}
            </>
          )}
          <button 
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="テーマを切り替え"
            title={mounted && resolvedTheme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {mounted && resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={toggleRightSidebar}
            className={styles.sidebarToggle}
            aria-label={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
            title={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
          >
            {rightSidebarOpen ? '▶' : '◀'}
          </button>
        </nav>
      </div>
    </header>
  );
} 