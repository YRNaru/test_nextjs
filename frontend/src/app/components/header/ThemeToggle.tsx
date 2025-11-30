"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="group relative bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 text-white border-none rounded-xl px-3 py-2 text-lg transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50 dark:hover:shadow-indigo-500/50 xl:px-2 xl:text-base"
      aria-label="テーマを切り替え"
      title={
        mounted && resolvedTheme === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え"
      }
    >
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="relative z-10">{mounted && resolvedTheme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
