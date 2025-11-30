"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

export default function LeftSidebar() {
  const pathname = usePathname();
  const { leftSidebarOpen } = useSidebar();

  const quickLinks = [
    { href: "/", label: "ホーム", icon: "🏠" },
    { href: "/mypage", label: "マイページ", icon: "👤" },
    { href: "/blog", label: "ブログ", icon: "📝" },
    { href: "/nextjs", label: "Next.js", icon: "⚡" },
    { href: "/typescript", label: "TypeScript", icon: "📘" },
    { href: "/react", label: "React", icon: "⚛️" },
    { href: "/quiz", label: "クイズ", icon: "🧪" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed top-20 bottom-0 w-[320px] max-h-[calc(100vh-80px)] overflow-y-auto backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/90 border-r border-white/20 dark:border-white/10 p-6 pl-4 z-50 transition-all duration-300 left-0 shadow-2xl shadow-black/10 dark:shadow-black/30 scrollbar-hide xl:translate-x-0 ${leftSidebarOpen ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0 pointer-events-none xl:translate-x-0 xl:opacity-100 xl:pointer-events-auto"}`}
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
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20"></div>
          <h3 className="relative text-xl font-bold m-0 pb-4 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">クイックナビ</span>
          </h3>
        </div>

        <nav className="flex flex-col gap-3">
          {quickLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 text-sm font-medium no-underline overflow-hidden hover:scale-105 hover:shadow-lg ${
                isActive(link.href)
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/30"
                  : "bg-white/50 dark:bg-gray-800/50 text-foreground border-white/20 dark:border-white/10 hover:border-blue-500/50"
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className={`text-xl shrink-0 transition-transform duration-300 group-hover:scale-125 ${isActive(link.href) ? "" : "group-hover:rotate-12"}`}>
                {link.icon}
              </span>
              <span className="flex-1">{link.label}</span>
              {isActive(link.href) && (
                <span className="w-2 h-2 rounded-full bg-white shadow-lg animate-pulse"></span>
              )}
            </Link>
          ))}
        </nav>

        <div className="relative mt-4 p-3 rounded-2xl backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 shadow-xl">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
          <h4 className="relative text-base font-bold mb-4 m-0 flex items-center gap-2">
            <span className="text-lg">💡</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">便利リンク</span>
          </h4>
          <ul className="relative list-none p-0 m-0 flex flex-col gap-2">
            <li className="m-0">
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 rounded-xl no-underline text-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-md hover:translate-x-1"
              >
                <span className="mr-2">📖</span>Next.js 公式ドキュメント
              </a>
            </li>
            <li className="m-0">
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 rounded-xl no-underline text-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-md hover:translate-x-1"
              >
                <span className="mr-2">⚛️</span>React 公式サイト
              </a>
            </li>
            <li className="m-0">
              <a
                href="https://www.typescriptlang.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2.5 rounded-xl no-underline text-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-md hover:translate-x-1"
              >
                <span className="mr-2">📘</span>TypeScript ドキュメント
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
