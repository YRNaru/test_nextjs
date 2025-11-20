import Link from "next/link";

export default function About() {
  return (
    <div
      className="flex flex-col items-center min-h-screen p-10 px-5 font-sans leading-relaxed md:p-5 md:px-4"
      data-oid="o1db6_h"
    >
      <main
        className="max-w-[800px] w-full flex flex-col gap-10"
        data-oid="tt21nb5"
      >
        <h1
          className="text-4xl font-bold text-center m-0 text-foreground md:text-3xl"
          data-oid="v2x6map"
        >
          📖 About Next.js
        </h1>
        <div
          className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5"
          data-oid="dgnwh2b"
        >
          <h2
            className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl"
            data-oid="cj_56wk"
          >
            🎯 この講座について
          </h2>
          <p className="m-0 mb-4 text-foreground" data-oid="cpceo2f">
            この講座では、Next.jsの基本から実践的な開発まで、段階的に学んでいきます。
            実際にコードを書きながら、Next.jsの強力な機能を体験してください。
          </p>
        </div>

        <div
          className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5"
          data-oid=".own7i_"
        >
          <h2
            className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl"
            data-oid=":5j.a66"
          >
            📚 学習内容
          </h2>
          <ul className="m-0 pl-5" data-oid="24fafl8">
            <li className="mb-2 text-foreground" data-oid="bcqom_w">
              <strong data-oid="q2ijywu">App Router</strong> -
              新しいルーティングシステム
            </li>
            <li className="mb-2 text-foreground" data-oid="iq_0e.b">
              <strong data-oid="8w4ea1x">コンポーネント</strong> -
              再利用可能なUI部品
            </li>
            <li className="mb-2 text-foreground" data-oid="_qxs2e-">
              <strong data-oid="1_jj74v">スタイリング</strong> - CSS
              ModulesとTailwind CSS
            </li>
            <li className="mb-2 text-foreground" data-oid="xeavi54">
              <strong data-oid="5tew06w">データフェッチ</strong> - API
              RoutesとSSR
            </li>
            <li className="mb-2 text-foreground" data-oid="u6efkb_">
              <strong data-oid=".m1lwem">デプロイ</strong> - Vercelへの公開
            </li>
            <li className="mb-2 text-foreground" data-oid="d:2fxn5">
              <strong data-oid="0mu.w82">React</strong> -
              コンポーネントベースのUI開発
            </li>
            <li className="mb-2 text-foreground" data-oid="jfpyeoa">
              <strong data-oid="..g7je2">TypeScript</strong> -
              静的型付けによるコードの安全性
            </li>
          </ul>
        </div>

        <div
          className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5"
          data-oid="29hyty8"
        >
          <h2
            className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl"
            data-oid="p5p5iio"
          >
            🛠️ 開発環境
          </h2>
          <p className="m-0 mb-4 text-foreground" data-oid="fdsgw81">
            現在使用している技術スタック：
          </p>
          <div
            className="flex flex-wrap gap-3 mt-4 md:gap-2"
            data-oid="8ns1fyo"
          >
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="ezeun80"
            >
              Next.js 15.3.4
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="4nkwr4q"
            >
              React 18
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="08nu.tf"
            >
              TypeScript
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="e9speu5"
            >
              CSS Modules
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="5vgjc.p"
            >
              Tailwind CSS
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="szq5ik5"
            >
              React
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="kduu4om"
            >
              TypeScript
            </span>
          </div>
        </div>

        <div className="text-center mt-5" data-oid="hcvibdn">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
            data-oid="s:ex-n4"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
