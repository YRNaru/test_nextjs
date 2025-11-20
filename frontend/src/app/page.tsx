import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]">
      <main className="w-full max-w-4xl mx-auto py-8 px-6 md:py-6 md:px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground text-center md:text-3xl">
          📖 サイト
        </h1>
        <div className="mb-8 p-6 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)] md:p-4">
          <h2 className="text-2xl font-semibold mb-4 text-foreground md:text-xl">
            🎯 この講座について
          </h2>
          <p className="text-foreground leading-relaxed opacity-90">
            この講座では、モダンWebアプリケーション(Next.js)の基本から実践的な開発まで、段階的に学んでいきます。
            実際にコードを書きながら、Next.jsの強力な機能を体験してください。
          </p>
        </div>

        <div className="mb-8 p-6 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)] md:p-4">
          <h2 className="text-2xl font-semibold mb-4 text-foreground md:text-xl">
            📚 学習内容
          </h2>
          <ul className="list-none p-0 space-y-2 text-foreground">
            <li>
              <strong>App Router</strong> - 新しいルーティングシステム
            </li>
            <li>
              <strong>コンポーネント</strong> - 再利用可能なUI部品
            </li>
            <li>
              <strong>スタイリング</strong> - CSS ModulesとTailwind CSS
            </li>
            <li>
              <strong>データフェッチ</strong> - API RoutesとSSR
            </li>
            <li>
              <strong>デプロイ</strong> - Vercelへの公開
            </li>
            <li>
              <strong>React</strong> - コンポーネントベースのUI開発
            </li>
            <li>
              <strong>TypeScript</strong> - 静的型付けによるコードの安全性
            </li>
          </ul>
        </div>

        <div className="mb-8 p-6 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)] md:p-4">
          <h2 className="text-2xl font-semibold mb-4 text-foreground md:text-xl">
            🛠️ 開発環境
          </h2>
          <p className="text-foreground mb-4 opacity-90">
            現在使用している技術スタック：
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              Next.js 15.3.4
            </span>
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              React 18
            </span>
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              TypeScript
            </span>
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              CSS Modules
            </span>
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              Tailwind CSS
            </span>
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              React
            </span>
            <span className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium">
              TypeScript
            </span>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/mypage"
            className="inline-block text-[#3498db] no-underline font-medium transition-colors duration-200 hover:text-[#2980b9] hover:underline"
          >
            ← マイページへ
          </Link>
        </div>
      </main>
    </div>
  );
}
