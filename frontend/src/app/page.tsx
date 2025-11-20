import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
      data-oid="69c7lc7"
    >
      <main
        className="w-full max-w-4xl mx-auto py-8 px-6 md:py-6 md:px-4"
        data-oid="wiiexrr"
      >
        <h1
          className="text-4xl font-bold mb-8 text-foreground text-center md:text-3xl"
          data-oid="sy:tp4z"
        >
          📖 サイト
        </h1>
        <div
          className="mb-8 p-6 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)] md:p-4"
          data-oid="jom:htr"
        >
          <h2
            className="text-2xl font-semibold mb-4 text-foreground md:text-xl"
            data-oid="d9eud0x"
          >
            🎯 この講座について
          </h2>
          <p
            className="text-foreground leading-relaxed opacity-90"
            data-oid="c0am85l"
          >
            この講座では、モダンWebアプリケーション(Next.js)の基本から実践的な開発まで、段階的に学んでいきます。
            実際にコードを書きながら、Next.jsの強力な機能を体験してください。
          </p>
        </div>

        <div
          className="mb-8 p-6 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)] md:p-4"
          data-oid="3z21tbx"
        >
          <h2
            className="text-2xl font-semibold mb-4 text-foreground md:text-xl"
            data-oid="mgheyjz"
          >
            📚 学習内容
          </h2>
          <ul
            className="list-none p-0 space-y-2 text-foreground"
            data-oid="-o_2l:v"
          >
            <li data-oid="c2il6qx">
              <strong data-oid="18s8b9z">App Router</strong> -
              新しいルーティングシステム
            </li>
            <li data-oid="aobb1ph">
              <strong data-oid="twmfbpd">コンポーネント</strong> -
              再利用可能なUI部品
            </li>
            <li data-oid="7_b2yu_">
              <strong data-oid="dfu58e9">スタイリング</strong> - CSS
              ModulesとTailwind CSS
            </li>
            <li data-oid="xfsbl:e">
              <strong data-oid="qsr8_gk">データフェッチ</strong> - API
              RoutesとSSR
            </li>
            <li data-oid="og3_syu">
              <strong data-oid="9w7ka9n">デプロイ</strong> - Vercelへの公開
            </li>
            <li data-oid="nx:3qr2">
              <strong data-oid="om5t6ie">React</strong> -
              コンポーネントベースのUI開発
            </li>
            <li data-oid="uuubsuj">
              <strong data-oid="v9i:71b">TypeScript</strong> -
              静的型付けによるコードの安全性
            </li>
          </ul>
        </div>

        <div
          className="mb-8 p-6 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)] md:p-4"
          data-oid="_4t_s:o"
        >
          <h2
            className="text-2xl font-semibold mb-4 text-foreground md:text-xl"
            data-oid="oubdyhu"
          >
            🛠️ 開発環境
          </h2>
          <p className="text-foreground mb-4 opacity-90" data-oid="8hhi_zb">
            現在使用している技術スタック：
          </p>
          <div className="flex flex-wrap gap-2" data-oid="vsjpkx2">
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="zmzjnzi"
            >
              Next.js 15.3.4
            </span>
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="idlcwyt"
            >
              React 18
            </span>
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="z255mg0"
            >
              TypeScript
            </span>
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="dgylfx5"
            >
              CSS Modules
            </span>
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="-vruzuq"
            >
              Tailwind CSS
            </span>
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="-0t7qgt"
            >
              React
            </span>
            <span
              className="px-3 py-1.5 bg-[var(--card-background)] border border-[var(--border-color)] rounded-full text-sm text-foreground font-medium"
              data-oid="my6m:o:"
            >
              TypeScript
            </span>
          </div>
        </div>

        <div className="text-center mt-8" data-oid="cb6-_p2">
          <Link
            href="/mypage"
            className="inline-block text-[#3498db] no-underline font-medium transition-colors duration-200 hover:text-[#2980b9] hover:underline"
            data-oid="lvrdv1r"
          >
            ← マイページへ
          </Link>
        </div>
      </main>
    </div>
  );
}
