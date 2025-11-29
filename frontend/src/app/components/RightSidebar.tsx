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
    setCurrentTime(new Date());
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <aside
      className={`fixed top-20 bottom-0 w-[320px] max-h-[calc(100vh-80px)] overflow-y-auto backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90 border-l border-white/20 dark:border-white/10 p-6 pr-4 z-50 transition-all duration-300 right-0 shadow-2xl shadow-black/10 dark:shadow-black/30 scrollbar-hide xl:translate-x-0 ${rightSidebarOpen ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0 pointer-events-none xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto"}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`
        aside::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <div className="flex flex-col gap-6">
        {/* 現在時刻 */}
        <div className="relative p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"></div>
          <h3 className="relative text-lg font-bold mb-4 m-0 flex items-center gap-2">
            <span className="text-xl">⏰</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">現在時刻</span>
          </h3>
          <div className="relative text-3xl font-bold text-center py-5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-3 font-mono shadow-lg">
            {currentTime ? currentTime.toLocaleTimeString("ja-JP") : "--:--:--"}
          </div>
          <div className="relative text-sm text-center text-foreground/80">
            {currentTime
              ? currentTime.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })
              : "読み込み中..."}
          </div>
        </div>

        {/* 今日のヒント */}
        <div className="relative p-3 rounded-2xl backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-xl overflow-hidden">
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
          <h4 className="relative text-base font-bold mb-3 m-0 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">今日のヒント</span>
          </h4>
          <p className="relative text-sm text-foreground leading-relaxed m-0 px-4 py-3.5 bg-white/50 dark:bg-gray-800/50 rounded-xl border-l-4 border-purple-500 shadow-md">
            {randomTip || "読み込み中..."}
          </p>
        </div>

        {/* 学習進捗 */}
        <div className="relative p-3 rounded-2xl backdrop-blur-md bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-20"></div>
          <h4 className="relative text-base font-bold mb-4 m-0 flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">学習進捗</span>
          </h4>
          <div className="relative space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Next.js基礎</span>
                <span className="text-sm font-bold text-green-500">75%</span>
              </div>
              <div className="relative w-full h-3 bg-white/30 dark:bg-gray-800/30 rounded-full overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300 shadow-lg" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">React基礎</span>
                <span className="text-sm font-bold text-blue-500">60%</span>
              </div>
              <div className="relative w-full h-3 bg-white/30 dark:bg-gray-800/30 rounded-full overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 shadow-lg" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">TypeScript</span>
                <span className="text-sm font-bold text-purple-500">85%</span>
              </div>
              <div className="relative w-full h-3 bg-white/30 dark:bg-gray-800/30 rounded-full overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 shadow-lg" style={{ width: "85%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* ブックマーク */}
        <div className="relative p-3 rounded-2xl backdrop-blur-md bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/20 shadow-xl overflow-hidden">
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-3xl opacity-20"></div>
          <h4 className="relative text-base font-bold mb-4 m-0 flex items-center gap-2">
            <span className="text-lg">🔖</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">ブックマーク</span>
          </h4>
          <ul className="relative list-none p-0 m-0 flex flex-col gap-2">
            {["⭐ よく使うコードスニペット", "📚 参考書籍リスト", "🎥 おすすめ動画", "🛠️ 便利ツール集"].map((item, index) => (
              <li key={index} className="group px-4 py-3 rounded-xl text-sm font-medium text-foreground bg-white/50 dark:bg-gray-800/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

