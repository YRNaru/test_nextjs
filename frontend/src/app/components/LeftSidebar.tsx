'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from './SidebarContext';
import styles from './Sidebar.module.css';

export default function LeftSidebar() {
  const pathname = usePathname();
  const { leftSidebarOpen } = useSidebar();

  const quickLinks = [
    { href: '/', label: 'ホーム', icon: '🏠' },
    { href: '/mypage', label: 'マイページ', icon: '👤' },
    { href: '/blog', label: 'ブログ', icon: '📝' },
    { href: '/nextjs', label: 'Next.js', icon: '⚡' },
    { href: '/typescript', label: 'TypeScript', icon: '📘' },
    { href: '/react', label: 'React', icon: '⚛️' },
    { href: '/quiz', label: 'クイズ', icon: '🧪' },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside 
      className={`${styles.leftSidebar} ${leftSidebarOpen ? styles.open : styles.closed}`}
    >
      <div className={styles.sidebarContent}>
        <h3 className={styles.sidebarTitle}>📚 クイックナビ</h3>
        <nav className={styles.nav}>
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navItem} ${isActive(link.href) ? styles.active : ''}`}
            >
              <span className={styles.icon}>{link.icon}</span>
              <span className={styles.label}>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>💡 便利リンク</h4>
          <ul className={styles.linkList}>
            <li>
              <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                Next.js 公式ドキュメント
              </a>
            </li>
            <li>
              <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                React 公式サイト
              </a>
            </li>
            <li>
              <a href="https://www.typescriptlang.org/docs" target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                TypeScript ドキュメント
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

