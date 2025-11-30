"use client";

import { useState, useEffect } from "react";
import GradientCard from "../ui/GradientCard";
import SectionHeader from "../ui/SectionHeader";

const tips = [
  "💡 Next.jsはApp RouterとPages Routerの2つのルーティング方式があります",
  "🚀 Server Componentsを使うとパフォーマンスが向上します",
  "⚡ 画像最適化はnext/imageコンポーネントを使いましょう",
  "🔒 TypeScriptで型安全性を確保しましょう",
  "📱 レスポンシブデザインを心がけましょう",
];

export default function TodayTipCard() {
  const [randomTip, setRandomTip] = useState<string>("");

  useEffect(() => {
    setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <GradientCard
      gradientFrom="rgb(168, 85, 247)"
      gradientTo="rgb(236, 72, 153)"
      className="p-3"
    >
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
      <SectionHeader
        icon="💡"
        title="今日のヒント"
        gradientFrom="rgb(168, 85, 247)"
        gradientTo="rgb(236, 72, 153)"
        iconSize="text-lg"
        className="text-base mb-3"
      />
      <p className="relative text-sm text-foreground leading-relaxed m-0 px-4 py-3.5 bg-white/50 dark:bg-gray-800/50 rounded-xl border-l-4 border-purple-500 shadow-md">
        {randomTip || "読み込み中..."}
      </p>
    </GradientCard>
  );
}

