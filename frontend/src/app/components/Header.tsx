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
    <header className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-[10px] py-4 bg-black/5 dark:bg-white/6 border-b border-black/[0.08] dark:border-white/[0.145]">
      <div className="w-full px-4 flex items-center justify-between xl:px-5 md:items-stretch md:gap-3 sm:gap-3">
        <div className="flex items-center gap-4 md:w-full md:justify-between">
          <button
            onClick={toggleLeftSidebar}
            className="bg-transparent border-2 border-foreground rounded-lg px-3 py-2 text-base transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 min-w-[40px] h-10 flex items-center justify-center md:min-w-[36px] md:h-9 md:px-2.5 md:py-1.5"
            aria-label={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
            title={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
          >
            {leftSidebarOpen ? "◀" : "▶"}
          </button>

          <nav className="flex gap-6 items-center xl:gap-4 xl:text-sm lg:gap-3 lg:text-sm md:flex-wrap md:gap-2 md:[row-gap:0.5rem] md:text-xs">
            <Link
              href="/"
              className={`relative no-underline text-foreground font-medium transition-opacity duration-200 hover:opacity-80 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full ${isActive("/") ? "text-[#3498db] font-semibold after:w-full after:bg-[#3498db]" : ""} xl:text-[0.9rem] lg:text-[0.85rem] md:text-xs`}
            >
              ホーム
            </Link>

            <Link
              href="/mypage"
              className={`relative no-underline text-foreground font-medium transition-opacity duration-200 hover:opacity-80 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full ${isActive("/mypage") ? "text-[#3498db] font-semibold after:w-full after:bg-[#3498db]" : ""} xl:text-[0.9rem] lg:text-[0.85rem] md:text-xs`}
            >
              マイページ
            </Link>

            <Link
              href="/blog"
              className={`relative no-underline text-foreground font-medium transition-opacity duration-200 hover:opacity-80 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full ${isActive("/blog") ? "text-[#3498db] font-semibold after:w-full after:bg-[#3498db]" : ""} xl:text-[0.9rem] lg:text-[0.85rem] md:text-xs`}
            >
              ブログ
            </Link>

            <Link
              href="/nextjs"
              className={`relative no-underline text-foreground font-medium transition-opacity duration-200 hover:opacity-80 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full ${isActive("/nextjs") ? "text-[#3498db] font-semibold after:w-full after:bg-[#3498db]" : ""} xl:text-[0.9rem] lg:text-[0.85rem] md:text-xs`}
            >
              Next.js
            </Link>

            <Link
              href="/typescript"
              className={`relative no-underline text-foreground font-medium transition-opacity duration-200 hover:opacity-80 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full ${isActive("/typescript") ? "text-[#3498db] font-semibold after:w-full after:bg-[#3498db]" : ""} xl:text-[0.9rem] lg:text-[0.85rem] md:text-xs`}
            >
              TypeScript
            </Link>

            <Link
              href="/react"
              className={`relative no-underline text-foreground font-medium transition-opacity duration-200 hover:opacity-80 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-foreground after:transition-all after:duration-200 hover:after:w-full ${isActive("/react") ? "text-[#3498db] font-semibold after:w-full after:bg-[#3498db]" : ""} xl:text-[0.9rem] lg:text-[0.85rem] md:text-xs`}
            >
              React
            </Link>

            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="bg-gradient-to-br from-[#3498db] to-[#2980b9] text-white border-none rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer no-underline transition-all duration-200 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#2980b9] hover:to-[#21618c] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(52,152,219,0.3)] xl:px-2 xl:text-xs lg:px-2 lg:text-xs md:text-xs"
                    aria-label="ログアウト"
                  >
                    ログアウト
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="bg-gradient-to-br from-[#3498db] to-[#2980b9] text-white border-none rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer no-underline transition-all duration-200 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#2980b9] hover:to-[#21618c] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(52,152,219,0.3)] xl:px-2 xl:text-xs lg:px-2 lg:text-xs md:text-xs"
                  >
                    ログイン
                  </Link>
                )}
              </>
            )}

            <button
              onClick={toggleTheme}
              className="bg-transparent border-2 border-foreground rounded-lg px-2 py-2 text-lg transition-all duration-200 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 xl:px-2 xl:text-base lg:px-2 lg:text-base md:text-sm"
              aria-label="テーマを切り替え"
              title={
                mounted && resolvedTheme === "dark"
                  ? "ライトモードに切り替え"
                  : "ダークモードに切り替え"
              }
            >
              {mounted && resolvedTheme === "dark" ? "☀️" : "🌙"}
            </button>
          </nav>

          <Link
            href="/"
            className="text-2xl font-bold no-underline text-foreground transition-opacity duration-200 hover:opacity-80 xl:text-[1.4rem] md:text-xl"
          >
            🚀 モダンWebアプリ開発
          </Link>
          <button
              onClick={toggleRightSidebar}
              className="bg-transparent border-2 border-foreground rounded-lg px-2 py-2 text-base transition-all duration-200 flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 hover:bg-black/5 dark:hover:bg-white/5 min-w-[36px] h-10 xl:min-w-[32px] xl:px-2 lg:min-w-[32px] lg:px-2 md:min-w-[30px] md:h-9 md:px-1.5 md:py-1.5 md:text-sm"
              aria-label={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
              title={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
            >
              {rightSidebarOpen ? "▶" : "◀"}
            </button>
        </div>
      </div>
    </header>
  );
}
