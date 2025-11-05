import Link from "next/link";
import styles from "../styles/blog.module.css";
import { formatDate } from "@/utils/format";

// サンプルブログデータ
const blogPosts = [
  {
    id: "1",
    title: "Next.js App Routerの基本",
    excerpt: "Next.js 13で導入されたApp Routerについて、その特徴と使い方を詳しく解説します。",
    publishedAt: "2024-01-15",
    author: "Next.js講師",
    tags: ["Next.js", "App Router", "React"]
  },
  {
    id: "2",
    title: "TypeScriptで型安全な開発",
    excerpt: "TypeScriptを使った型安全なReactコンポーネントの開発方法を学びましょう。",
    publishedAt: "2024-01-10",
    author: "TypeScript講師",
    tags: ["TypeScript", "React", "型安全性"]
  },
  {
    id: "3",
    title: "CSS Modulesでスタイリング",
    excerpt: "CSS Modulesを使ったスコープされたスタイリングの実践的な使い方を紹介します。",
    publishedAt: "2024-01-05",
    author: "CSS講師",
    tags: ["CSS", "CSS Modules", "スタイリング"]
  }
];

export default function BlogPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>📝 ブログ</h1>
          <p>Next.jsとReactに関する最新の情報やチュートリアルをお届けします。</p>
        </header>

        <div className={styles.posts}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <h2 className={styles.postTitle}>
                  <Link href={`/blog/${post.id}`} className={styles.postLink}>
                    {post.title}
                  </Link>
                </h2>
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className={styles.postAuthor}>
                    by {post.author}
                  </span>
                </div>
              </div>
              
              <p className={styles.postExcerpt}>
                {post.excerpt}
              </p>
              
              <div className={styles.postTags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
} 