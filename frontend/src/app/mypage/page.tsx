'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getCurrentUser } from '@/api/auth';
import { User } from '@/types';
import Link from 'next/link';
import styles from './page.module.css';

export default function MyPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // 未ログインの場合はログインページへリダイレクト
        router.push('/login');
        return;
      }

      // ユーザー情報を取得
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const response = await getCurrentUser();
          
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            setError(response.error || 'ユーザー情報の取得に失敗しました');
          }
        } catch {
          setError('予期しないエラーが発生しました');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = async () => {
    await logout();
  };

  if (authLoading || isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>読み込み中...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // リダイレクト中
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <Link href="/login" className={styles.link}>
            ログインページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>ユーザー情報が見つかりません</p>
          <Link href="/login" className={styles.link}>
            ログインページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  // 登録日をフォーマット
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>マイページ</h1>
          <p className={styles.subtitle}>アカウント情報</p>
        </div>

        <div className={styles.profileSection}>
          <div className={styles.avatar}>
            <div className={styles.avatarIcon}>
              {(user.display_name || user.name || user.email).charAt(0).toUpperCase()}
            </div>
          </div>

          <div className={styles.userInfo}>
            <div className={styles.infoItem}>
              <label className={styles.label}>名前</label>
              <p className={styles.value}>{user.display_name || user.name || 'ユーザー'}</p>
            </div>

            <div className={styles.infoItem}>
              <label className={styles.label}>メールアドレス</label>
              <p className={styles.value}>{user.email}</p>
            </div>

            <div className={styles.infoItem}>
              <label className={styles.label}>ユーザーID</label>
              <p className={styles.value}>{user.id}</p>
            </div>

            {user.createdAt && (
              <div className={styles.infoItem}>
                <label className={styles.label}>登録日</label>
                <p className={styles.value}>{formatDate(user.createdAt)}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            ログアウト
          </button>
        </div>

        <div className={styles.links}>
          <Link href="/about" className={styles.link}>
            詳細を見る →
          </Link>
          <Link href="/nextjs" className={styles.link}>
            Next.js講座 →
          </Link>
          <Link href="/typescript" className={styles.link}>
            TypeScript学習 →
          </Link>
          <Link href="/react" className={styles.link}>
            React学習 →
          </Link>
          <Link href="/quiz" className={styles.link}>
            🧪 クイズに挑戦 →
          </Link>
        </div>
      </div>
    </div>
  );
}

