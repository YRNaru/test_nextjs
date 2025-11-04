'use client';

import { useState, useEffect } from 'react';
import { useSidebar } from './SidebarContext';
import styles from './Sidebar.module.css';

export default function RightSidebar() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [randomTip, setRandomTip] = useState<string>('');
  const { rightSidebarOpen, closeRightSidebar } = useSidebar();
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateFooterHeight = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // フッターが画面内に表示されている場合のみ高さを考慮
        if (rect.top < viewportHeight) {
          setFooterHeight(viewportHeight - rect.top);
        } else {
          setFooterHeight(0);
        }
      }
    };

    updateFooterHeight();
    window.addEventListener('scroll', updateFooterHeight);
    window.addEventListener('resize', updateFooterHeight);
    
    // リサイズオブザーバーでフッターのサイズ変更を監視
    const footer = document.querySelector('footer');
    if (footer) {
      const resizeObserver = new ResizeObserver(updateFooterHeight);
      resizeObserver.observe(footer);
      return () => {
        window.removeEventListener('scroll', updateFooterHeight);
        window.removeEventListener('resize', updateFooterHeight);
        resizeObserver.disconnect();
      };
    }

    return () => {
      window.removeEventListener('scroll', updateFooterHeight);
      window.removeEventListener('resize', updateFooterHeight);
    };
  }, []);

  const tips = [
    '💡 Next.jsはApp RouterとPages Routerの2つのルーティング方式があります',
    '🚀 Server Componentsを使うとパフォーマンスが向上します',
    '⚡ 画像最適化はnext/imageコンポーネントを使いましょう',
    '🔒 TypeScriptで型安全性を確保しましょう',
    '📱 レスポンシブデザインを心がけましょう',
  ];

  useEffect(() => {
    // クライアント側でのみ実行されるようにする
    setCurrentTime(new Date());
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside 
      className={`${styles.rightSidebar} ${rightSidebarOpen ? styles.open : styles.closed}`}
      style={{ bottom: `${footerHeight}px` }}
    >
      <div className={styles.sidebarContent}>
        <h3 className={styles.sidebarTitle}>⏰ 現在時刻</h3>
        <div className={styles.timeDisplay}>
          {currentTime ? currentTime.toLocaleTimeString('ja-JP') : '--:--:--'}
        </div>
        <div className={styles.dateDisplay}>
          {currentTime ? currentTime.toLocaleDateString('ja-JP', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          }) : '読み込み中...'}
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>💡 今日のヒント</h4>
          <p className={styles.tip}>{randomTip || '読み込み中...'}</p>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>📊 学習進捗</h4>
          <div className={styles.progressItem}>
            <span>Next.js基礎</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className={styles.progressItem}>
            <span>React基礎</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className={styles.progressItem}>
            <span>TypeScript</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>🔖 ブックマーク</h4>
          <ul className={styles.bookmarkList}>
            <li>⭐ よく使うコードスニペット</li>
            <li>📚 参考書籍リスト</li>
            <li>🎥 おすすめ動画</li>
            <li>🛠️ 便利ツール集</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

