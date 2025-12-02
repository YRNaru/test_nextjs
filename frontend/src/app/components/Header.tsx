"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sun, Moon, LogOut, LogIn, Rocket, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { leftSidebarOpen, rightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useSidebar();
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed top-0 left-0 right-0 w-full z-[100] backdrop-blur-xl backdrop-saturate-150 py-4 bg-gradient-to-r from-white/80 via-white/70 to-white/80 dark:from-gray-900/80 dark:via-gray-900/70 dark:to-gray-900/80 border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 h-20"
    >
      <div className="w-full h-full px-4 flex items-center justify-center relative xl:px-5">
        <div className="absolute left-4 flex items-center gap-4 xl:left-5">
          <Button
            onClick={toggleLeftSidebar}
            variant="default"
            size="icon"
            className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            aria-label={leftSidebarOpen ? "左サイドバーを閉じる" : "左サイドバーを開く"}
          >
            <motion.div
              animate={{ rotate: leftSidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {leftSidebarOpen ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </motion.div>
          </Button>
        </div>

        <nav className="hidden xl:flex gap-6 items-center xl:gap-4 xl:text-sm">
          {[
            { href: "/", label: "ホーム" },
            { href: "/mypage", label: "マイページ" },
            { href: "/blog", label: "ブログ" },
            { href: "/nextjs", label: "Next.js" },
            { href: "/typescript", label: "TypeScript" },
            { href: "/react", label: "React" },
          ].map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <Link
                href={link.href}
                className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive(link.href)
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full"
                    : ""
                } xl:text-[0.9rem]`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {isAuthenticated ? (
                <Button
                  onClick={logout}
                  variant="default"
                  size="sm"
                  className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  ログアウト
                </Button>
              ) : (
                <Link href="/login">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    ログイン
                  </Button>
                </Link>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
          >
            <Button
              onClick={toggleTheme}
              variant="default"
              size="icon"
              className="bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 hover:from-yellow-500 hover:to-orange-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 transition-all duration-300"
              aria-label="テーマを切り替え"
            >
              <motion.div
                initial={false}
                animate={{ rotate: mounted && resolvedTheme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {mounted && resolvedTheme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </nav>

        <div className="absolute right-4 flex items-center gap-4 xl:right-5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold no-underline transition-all duration-300 hover:scale-105 xl:text-[1.4rem] md:text-xl flex items-center gap-2"
            >
              <Rocket className="w-8 h-8 xl:w-7 xl:h-7 md:w-6 md:h-6 text-blue-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                モダンWebアプリ開発
              </span>
            </Link>
          </motion.div>
          <Button
            onClick={toggleRightSidebar}
            variant="default"
            size="icon"
            className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            aria-label={rightSidebarOpen ? "右サイドバーを閉じる" : "右サイドバーを開く"}
          >
            <motion.div
              animate={{ rotate: rightSidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {rightSidebarOpen ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </motion.div>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
