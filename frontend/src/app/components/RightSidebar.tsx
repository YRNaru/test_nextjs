"use client";

import { useState, useEffect } from "react";
import { useSidebar } from "./SidebarContext";

export default function RightSidebar() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [randomTip, setRandomTip] = useState<string>("");
  const { rightSidebarOpen } = useSidebar();

  const tips = [
    "💡 Next.jsはApp RouterとPages Routerの2つのルーティング方式があります",
    "🚀 Server Componentsを使うとパフォーマンスが向上します",
    "⚡ 画像最適化はnext/imageコンポーネントを使いましょう",
    "🔒 TypeScriptで型安全性を確保しましょう",
    "📱 レスポンシブデザインを心がけましょう",
  ];

  useEffect(() => {
    // クライアント側でのみ実行されるようにする
    setCurrentTime(new Date());
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside
      className={`fixed top-20 bottom-0 w-[250px] max-h-[calc(100vh-80px)] overflow-y-auto bg-black/5 dark:bg-white/6 border-l-2 border-black/[0.08] dark:border-white/[0.145] p-6 pr-4 z-50 transition-all duration-300 right-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.145)] xl:w-[220px] lg:top-18 lg:bottom-auto lg:max-h-[calc(100vh-96px)] lg:w-[min(320px,90vw)] lg:mx-4 lg:rounded-2xl lg:shadow-[0_20px_40px_rgba(0,0,0,0.18)] lg:border lg:border-black/[0.08] dark:lg:border-white/[0.145] lg:border-l-0 lg:right-0 md:w-[min(300px,88vw)] md:mx-3 md:right-3 md:closed:translate-x-[110%] ${rightSidebarOpen ? "translate-x-0 opacity-100 shadow-[0_16px_32px_rgba(0,0,0,0.12)]" : "translate-x-[100%] opacity-0 pointer-events-none"}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    >
      <div className="flex flex-col gap-6 bg-black/5 dark:bg-white/6 p-2 rounded-lg border border-dashed border-black/[0.08] dark:border-white/[0.145]">
        <h3 className="text-lg font-semibold mb-4 m-0 text-foreground pb-3 border-b-2 border-black/[0.08] dark:border-white/[0.145] relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-5 before:h-0.5 before:bg-foreground before:opacity-30 after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-5 after:h-0.5 after:bg-foreground after:opacity-30">
          ⏰ 現在時刻
        </h3>
        <div className="text-2xl font-bold text-foreground text-center py-4 bg-black/[0.08] dark:bg-white/[0.145] rounded-lg mb-2 font-mono">
          {currentTime ? currentTime.toLocaleTimeString("ja-JP") : "--:--:--"}
        </div>
        <div className="text-sm text-foreground text-center opacity-70 mb-4">
          {currentTime
            ? currentTime.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })
            : "読み込み中..."}
        </div>

        <div className="mt-2 p-4 border border-black/[0.08] dark:border-white/[0.145] rounded-lg bg-background shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h4 className="text-sm font-semibold mb-3 m-0 text-foreground opacity-90">
            💡 今日のヒント
          </h4>
          <p className="text-sm text-foreground leading-relaxed m-0 px-3 py-3 bg-black/[0.08] dark:bg-white/[0.145] rounded-lg border-l-[3px] border-[#3498db]">
            {randomTip || "読み込み中..."}
          </p>
        </div>

        <div className="mt-2 p-4 border border-black/[0.08] dark:border-white/[0.145] rounded-lg bg-background shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h4 className="text-sm font-semibold mb-3 m-0 text-foreground opacity-90">
            📊 学習進捗
          </h4>
          <div className="mb-4">
            <span className="block text-xs text-foreground mb-2 opacity-80">
              Next.js基礎
            </span>
            <div className="w-full h-2 bg-black/[0.08] dark:bg-white/[0.145] rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3498db] to-[#2ecc71] rounded transition-all duration-300"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-xs text-foreground mb-2 opacity-80">
              React基礎
            </span>
            <div className="w-full h-2 bg-black/[0.08] dark:bg-white/[0.145] rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3498db] to-[#2ecc71] rounded transition-all duration-300"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
          <div className="mb-4">
            <span className="block text-xs text-foreground mb-2 opacity-80">
              TypeScript
            </span>
            <div className="w-full h-2 bg-black/[0.08] dark:bg-white/[0.145] rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#3498db] to-[#2ecc71] rounded transition-all duration-300"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-2 p-4 border border-black/[0.08] dark:border-white/[0.145] rounded-lg bg-background shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <h4 className="text-sm font-semibold mb-3 m-0 text-foreground opacity-90">
            🔖 ブックマーク
          </h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-2">
            <li className="px-3 py-2 rounded-md text-sm text-foreground bg-black/[0.08] dark:bg-white/[0.145] cursor-pointer transition-all duration-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:translate-x-1">
              ⭐ よく使うコードスニペット
            </li>
            <li className="px-3 py-2 rounded-md text-sm text-foreground bg-black/[0.08] dark:bg-white/[0.145] cursor-pointer transition-all duration-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:translate-x-1">
              📚 参考書籍リスト
            </li>
            <li className="px-3 py-2 rounded-md text-sm text-foreground bg-black/[0.08] dark:bg-white/[0.145] cursor-pointer transition-all duration-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:translate-x-1">
              🎥 おすすめ動画
            </li>
            <li className="px-3 py-2 rounded-md text-sm text-foreground bg-black/[0.08] dark:bg-white/[0.145] cursor-pointer transition-all duration-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:translate-x-1">
              🛠️ 便利ツール集
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
