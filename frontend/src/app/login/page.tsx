import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'ログイン | Next.js 初心者講座',
  description: 'アカウントにログインして、Next.js学習を続けましょう',
};

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>ログイン</h1>
          <p className={styles.description}>
            アカウントにログインして、Next.js学習を続けましょう
          </p>
        </div>

        <div className={styles.formContainer}>
          <LoginForm />
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            アカウントをお持ちでないですか？{' '}
            <Link href="/register" className={styles.link}>
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

