"use client";

import { useState, useEffect } from "react";
import GradientCard from "../ui/GradientCard";
import SectionHeader from "../ui/SectionHeader";

export default function ClockCard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <GradientCard
      gradientFrom="rgb(59, 130, 246)"
      gradientTo="rgb(6, 182, 212)"
      className="p-6"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"></div>
      <SectionHeader
        icon="⏰"
        title="現在時刻"
        gradientFrom="rgb(59, 130, 246)"
        gradientTo="rgb(6, 182, 212)"
        iconSize="text-xl"
        className="text-lg mb-4"
      />
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
    </GradientCard>
  );
}

