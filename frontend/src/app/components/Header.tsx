"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useSidebar();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-xl backdrop-saturate-150 py-4 bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-gray-900/80 dark:via-gray-900/70 dark:to-gray-900/80 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 h-20">
      <div className="w-full h-full px-4 flex items-center justify-center relative xl:px-5">
        <div className="absolute left-4 flex items-center gap-4 xl:left-5">
          <button
            onClick={toggleLeftSidebar}
            className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none rounded-xl px-3 py-2 text-base transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 min-w-[40px] h-10 flex items-center justify-center overflow-hidden md:min-w-[36px] md:h-9 md:px-2.5 md:py-1.5"
            aria-label={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
            title={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{leftSidebarOpen ? "◀" : "▶"}</span>
          </button>
        </div>

        <nav className="hidden xl:flex gap-6 items-center xl:gap-4 xl:text-sm">
          <Link
            href="/"
            className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${isActive("/") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full" : ""} xl:text-[0.9rem]`}
          >
            ホーム
          </Link>

          <Link
            href="/mypage"
            className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${isActive("/mypage") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full" : ""} xl:text-[0.9rem]`}
          >
            マイページ
          </Link>

          <Link
            href="/blog"
            className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${isActive("/blog") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full" : ""} xl:text-[0.9rem]`}
          >
            ブログ
          </Link>

          <Link
            href="/nextjs"
            className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${isActive("/nextjs") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full" : ""} xl:text-[0.9rem]`}
          >
            Next.js
          </Link>

          <Link
            href="/typescript"
            className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${isActive("/typescript") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full" : ""} xl:text-[0.9rem]`}
          >
            TypeScript
          </Link>

          <Link
            href="/react"
            className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${isActive("/react") ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full" : ""} xl:text-[0.9rem]`}
          >
            React
          </Link>

          {!isLoading && (
            <>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="group relative bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none rounded-xl px-3 py-2 text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 xl:px-2 xl:text-xs"
                  aria-label="ログアウト"
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">ログアウト</span>
                </button>
              ) : (
                <Link
                  href="/login"
                  className="group relative bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none rounded-xl px-3 py-2 text-sm font-bold cursor-pointer no-underline transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 xl:px-2 xl:text-xs"
                >
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">ログイン</span>
                </Link>
              )}
            </>
          )}

          <button
            onClick={toggleTheme}
            className="group relative bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 text-white border-none rounded-xl px-3 py-2 text-lg transition-all duration-300 flex items-center justify-center overflow-hidden hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50 dark:hover:shadow-indigo-500/50 xl:px-2 xl:text-base"
            aria-label="テーマを切り替え"
            title={
              mounted && resolvedTheme === "dark"
                ? "ライトモードに切り替え"
                : "ダークモードに切り替え"
            }
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{mounted && resolvedTheme === "dark" ? "☀️" : "🌙"}</span>
          </button>
        </nav>

        <div className="absolute right-4 flex items-center gap-4 xl:right-5">
          <Link
            href="/"
            className="text-2xl font-bold no-underline transition-all duration-300 hover:scale-105 xl:text-[1.4rem] md:text-xl flex items-center gap-2"
          >
            <span className="text-3xl xl:text-2xl md:text-xl">🚀</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">モダンWebアプリ開発</span>
          </Link>
          <button
            onClick={toggleRightSidebar}
            className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none rounded-xl px-3 py-2 text-base transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 min-w-[40px] h-10 flex items-center justify-center overflow-hidden md:min-w-[36px] md:h-9 md:px-2.5 md:py-1.5"
            aria-label={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
            title={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10">{rightSidebarOpen ? "▶" : "◀"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}　
