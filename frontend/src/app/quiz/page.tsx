"use client";

import Link from "next/link";
import Quiz from "@/components/Quiz";
import { quizCategories } from "@/data/quiz-data";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-5 md:p-4">
      <main className="max-w-[1200px] mx-auto">
        <header className="text-center mb-10 text-white md:mb-8">
          <h1 className="text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] md:text-3xl">
            🧪 TypeScript クイズ
          </h1>
          <p className="text-xl opacity-90 max-w-[600px] mx-auto leading-relaxed md:text-base">
            カテゴリ別の問題に挑戦して、TypeScriptの理解度をチェックしましょう！
          </p>
        </header>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-10 md:grid-cols-1 md:gap-5">
          <div className="bg-white/95 p-8 rounded-xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-5">
            <span className="text-5xl block mb-5 md:text-4xl">📚</span>
            <h3 className="text-[#333] text-xl mb-4 font-semibold md:text-lg">
              カテゴリ別学習
            </h3>
            <p className="text-[#666] leading-relaxed m-0">
              プリミティブ型、配列型、オブジェクト型に分けて学習できます
            </p>
          </div>
          <div className="bg-white/95 p-8 rounded-xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-5">
            <span className="text-5xl block mb-5 md:text-4xl">⚡</span>
            <h3 className="text-[#333] text-xl mb-4 font-semibold md:text-lg">
              即座のフィードバック
            </h3>
            <p className="text-[#666] leading-relaxed m-0">
              回答後すぐに正解・不正解がわかります
            </p>
          </div>
          <div className="bg-white/95 p-8 rounded-xl text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] md:p-5">
            <span className="text-5xl block mb-5 md:text-4xl">📊</span>
            <h3 className="text-[#333] text-xl mb-4 font-semibold md:text-lg">
              詳細な結果
            </h3>
            <p className="text-[#666] leading-relaxed m-0">
              完了後にカテゴリ別の結果と詳細な解説を確認できます
            </p>
          </div>
        </div>

        <Quiz categories={quizCategories} />

        <div className="flex justify-center gap-5 mt-10 flex-wrap md:flex-col md:items-center">
          <Link
            href="/typescript"
            className="inline-block px-6 py-3 bg-white/90 text-[#333] no-underline rounded-lg font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
          >
            ← TypeScript学習に戻る
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white/90 text-[#333] no-underline rounded-lg font-medium transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
