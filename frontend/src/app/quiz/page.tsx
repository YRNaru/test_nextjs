"use client";

import Link from "next/link";
import Quiz from "@/components/Quiz";
import { quizCategories } from "@/data/quiz-data";

export default function QuizPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5 md:p-4"
      data-oid="g4:ugi5"
    >
      <main className="max-w-[1200px] mx-auto" data-oid="9.xq5p:">
        <header
          className="text-center mb-10 text-white md:mb-8"
          data-oid="n_wu.81"
        >
          <h1
            className="text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] md:text-3xl"
            data-oid="nfb16y7"
          >
            🧪 TypeScript クイズ
          </h1>
          <p
            className="text-xl opacity-90 max-w-[600px] mx-auto leading-relaxed md:text-base"
            data-oid="4mr8ger"
          >
            カテゴリ別の問題に挑戦して、TypeScriptの理解度をチェックしましょう！
          </p>
        </header>

        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-10 md:grid-cols-1 md:gap-5"
          data-oid="9wnbgjx"
        >
          <div
            className="bg-white/95 p-8 rounded-xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-5"
            data-oid="j-c5a9m"
          >
            <span
              className="text-5xl block mb-5 md:text-4xl"
              data-oid="wxmd-5o"
            >
              📚
            </span>
            <h3
              className="text-[#333] text-xl mb-4 font-semibold md:text-lg"
              data-oid="ri5rdxx"
            >
              カテゴリ別学習
            </h3>
            <p className="text-[#666] leading-relaxed m-0" data-oid="o4xp0h-">
              プリミティブ型、配列型、オブジェクト型に分けて学習できます
            </p>
          </div>
          <div
            className="bg-white/95 p-8 rounded-xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-5"
            data-oid="mbj6ob4"
          >
            <span
              className="text-5xl block mb-5 md:text-4xl"
              data-oid="uekapz_"
            >
              ⚡
            </span>
            <h3
              className="text-[#333] text-xl mb-4 font-semibold md:text-lg"
              data-oid="03_5xmk"
            >
              即座のフィードバック
            </h3>
            <p className="text-[#666] leading-relaxed m-0" data-oid="xlkie:k">
              回答後すぐに正解・不正解がわかります
            </p>
          </div>
          <div
            className="bg-white/95 p-8 rounded-xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-5"
            data-oid="c1iu482"
          >
            <span
              className="text-5xl block mb-5 md:text-4xl"
              data-oid="pu.1sgj"
            >
              📊
            </span>
            <h3
              className="text-[#333] text-xl mb-4 font-semibold md:text-lg"
              data-oid="dt9zi:q"
            >
              詳細な結果
            </h3>
            <p className="text-[#666] leading-relaxed m-0" data-oid="3vstnsn">
              完了後にカテゴリ別の結果と詳細な解説を確認できます
            </p>
          </div>
        </div>

        <Quiz categories={quizCategories} data-oid="q.3n5yj" />

        <div
          className="flex justify-center gap-5 mt-10 flex-wrap md:flex-col md:items-center"
          data-oid="pt00:e9"
        >
          <Link
            href="/typescript"
            className="inline-block px-6 py-3 bg-white/90 text-[#333] no-underline rounded-lg font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            data-oid="n:uh_qn"
          >
            ← TypeScript学習に戻る
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white/90 text-[#333] no-underline rounded-lg font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            data-oid=":du7ipp"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
