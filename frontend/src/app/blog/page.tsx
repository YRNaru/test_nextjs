import Link from "next/link";
import { formatDate } from "@/utils/format";

// サンプルブログデータ
const blogPosts = [
  {
    id: "1",
    title: "Next.js App Routerの基本",
    excerpt: "Next.js 13で導入されたApp Routerについて、その特徴と使い方を詳しく解説します。",
    publishedAt: "2024-01-15",
    author: "Next.js講師",
    tags: ["Next.js", "App Router", "React"],
  },
  {
    id: "2",
    title: "TypeScriptで型安全な開発",
    excerpt: "TypeScriptを使った型安全なReactコンポーネントの開発方法を学びましょう。",
    publishedAt: "2024-01-10",
    author: "TypeScript講師",
    tags: ["TypeScript", "React", "型安全性"],
  },
  {
    id: "3",
    title: "CSS Modulesでスタイリング",
    excerpt: "CSS Modulesを使ったスコープされたスタイリングの実践的な使い方を紹介します。",
    publishedAt: "2024-01-05",
    author: "CSS講師",
    tags: ["CSS", "CSS Modules", "スタイリング"],
  },
];

export default function BlogPage() {
  return (
    <div
      className="flex flex-col items-center min-h-screen p-10 px-5 font-sans leading-relaxed md:p-5 md:px-4"
      data-oid="6:gedbp"
    >
      <main className="max-w-[800px] w-full flex flex-col gap-10" data-oid="yyqkp2f">
        <header className="text-center mb-8" data-oid="7o9eq8t">
          <h1
            className="text-4xl font-bold m-0 mb-4 text-foreground md:text-3xl"
            data-oid="h53_lty"
          >
            📝 ブログ
          </h1>
          <p className="text-lg text-foreground opacity-80 m-0 md:text-base" data-oid="_awba8_">
            Next.jsとReactに関する最新の情報やチュートリアルをお届けします。
          </p>
        </header>

        <div className="flex flex-col gap-8" data-oid="7-hoy6e">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-black/5 dark:bg-white/6 p-8 rounded-xl border border-black/[0.08] dark:border-white/[0.145] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] md:p-6"
              data-oid="a70sueg"
            >
              <div className="mb-4" data-oid="f7tchca">
                <h2
                  className="text-2xl font-semibold m-0 mb-2 text-foreground md:text-xl"
                  data-oid="3gp65kf"
                >
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-foreground no-underline transition-opacity duration-200 hover:opacity-80"
                    data-oid="ww1ll11"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div
                  className="flex gap-4 text-sm text-foreground opacity-60 md:flex-col md:gap-2"
                  data-oid="qif5atv"
                >
                  <span className="flex items-center" data-oid="0tbu9h8">
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="flex items-center" data-oid="dwonvgb">
                    by {post.author}
                  </span>
                </div>
              </div>

              <p className="m-0 mb-4 text-foreground opacity-80 leading-relaxed" data-oid="i4ioa21">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2" data-oid="cpsw84x">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-black/[0.08] dark:bg-white/[0.145] px-3 py-1 rounded-2xl text-xs font-medium text-foreground opacity-80"
                    data-oid="f1m9ygf"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8" data-oid="ep5qbr3">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
            data-oid="ne2-vds"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
