import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '../components/RegisterForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'アカウント登録 | Next.js 初心者講座',
  description: '新しいアカウントを作成して、Next.js学習を始めましょう',
};

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>アカウント登録</h1>
          <p className={styles.description}>
            新しいアカウントを作成して、Next.js学習を始めましょう
          </p>
        </div>

        <div className={styles.formContainer}>
          <RegisterForm />
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            既にアカウントをお持ちですか？{' '}
            <Link href="/login" className={styles.link}>
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

