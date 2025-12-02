import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Next.js 初心者講座",
  description: "Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクトについて",
  keywords: ["Next.js", "学習", "講座", "React", "TypeScript"],
};

export default function About() {
  return (
    <div
      className="flex flex-col items-center min-h-screen p-10 px-5 font-sans leading-relaxed md:p-5 md:px-4"
      data-oid="f7:vb:e"
    >
      <main className="max-w-[800px] w-full flex flex-col gap-10" data-oid="664an-1">
        <h1
          className="text-4xl font-bold text-center m-0 text-foreground md:text-3xl"
          data-oid="hu3iuz4"
        >
          📖 About Next.js
        </h1>
        <div
          className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5"
          data-oid="h1qaayw"
        >
          <h2
            className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl"
            data-oid="u_._8r."
          >
            🎯 この講座について
          </h2>
          <p className="m-0 mb-4 text-foreground" data-oid="su1f29f">
            この講座では、Next.jsの基本から実践的な開発まで、段階的に学んでいきます。
            実際にコードを書きながら、Next.jsの強力な機能を体験してください。
          </p>
        </div>

        <div
          className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5"
          data-oid="3g72xx6"
        >
          <h2
            className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl"
            data-oid="ukhq9zv"
          >
            📚 学習内容
          </h2>
          <ul className="m-0 pl-5" data-oid="hkz2ifl">
            <li className="mb-2 text-foreground" data-oid="zeokk43">
              <strong data-oid=":9:u3lc">App Router</strong> - 新しいルーティングシステム
            </li>
            <li className="mb-2 text-foreground" data-oid="597.yt8">
              <strong data-oid="5ykr5w:">コンポーネント</strong> - 再利用可能なUI部品
            </li>
            <li className="mb-2 text-foreground" data-oid="0ag_pkq">
              <strong data-oid="r3_6bxo">スタイリング</strong> - CSS ModulesとTailwind CSS
            </li>
            <li className="mb-2 text-foreground" data-oid="oh3xwar">
              <strong data-oid="suv1t__">データフェッチ</strong> - API RoutesとSSR
            </li>
            <li className="mb-2 text-foreground" data-oid="ul0xu7g">
              <strong data-oid="an5vqem">デプロイ</strong> - Vercelへの公開
            </li>
            <li className="mb-2 text-foreground" data-oid="uyeihcn">
              <strong data-oid="d1f.0ti">React</strong> - コンポーネントベースのUI開発
            </li>
            <li className="mb-2 text-foreground" data-oid="f5hol66">
              <strong data-oid="bsounqr">TypeScript</strong> - 静的型付けによるコードの安全性
            </li>
          </ul>
        </div>

        <div
          className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5"
          data-oid="ueizl7k"
        >
          <h2
            className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl"
            data-oid="c32r5l:"
          >
            🛠️ 開発環境
          </h2>
          <p className="m-0 mb-4 text-foreground" data-oid="tutqnp4">
            現在使用している技術スタック：
          </p>
          <div className="flex flex-wrap gap-3 mt-4 md:gap-2" data-oid="osfq5b3">
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="u9g67qs"
            >
              Next.js 16.0.6
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="fd3h2u2"
            >
              React 19
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="c8_dr9y"
            >
              TypeScript
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="-eceioq"
            >
              CSS Modules
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="fnhn7vw"
            >
              Tailwind CSS
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="a62nuek"
            >
              React
            </span>
            <span
              className="bg-black/[0.08] dark:bg-white/[0.145] px-4 py-2 rounded-2xl text-sm font-medium text-foreground md:text-xs md:px-3 md:py-1.5"
              data-oid="6c5.7in"
            >
              TypeScript
            </span>
          </div>
        </div>

        <div className="text-center mt-5" data-oid="bf7.m_p">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
            data-oid="63emcv-"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
