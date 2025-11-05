'use client';

import Link from 'next/link';
import Quiz from '@/components/Quiz';
import { quizCategories } from '@/data/quiz-data';
import styles from './page.module.css';

export default function QuizPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>🧪 TypeScript クイズ</h1>
          <p>カテゴリ別の問題に挑戦して、TypeScriptの理解度をチェックしましょう！</p>
        </header>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📚</span>
            <h3>カテゴリ別学習</h3>
            <p>プリミティブ型、配列型、オブジェクト型に分けて学習できます</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚡</span>
            <h3>即座のフィードバック</h3>
            <p>回答後すぐに正解・不正解がわかります</p>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📊</span>
            <h3>詳細な結果</h3>
            <p>完了後にカテゴリ別の結果と詳細な解説を確認できます</p>
          </div>
        </div>

        <Quiz categories={quizCategories} />

        <div className={styles.navigation}>
          <Link href="/typescript" className={styles.link}>
            ← TypeScript学習に戻る
          </Link>
          <Link href="/" className={styles.link}>
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
} 