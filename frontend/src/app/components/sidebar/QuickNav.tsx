"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface QuickLink {
  href: string;
  label: string;
  icon: string;
}

const quickLinks: QuickLink[] = [
  { href: "/", label: "ホーム", icon: "🏠" },
  { href: "/mypage", label: "マイページ", icon: "👤" },
  { href: "/blog", label: "ブログ", icon: "📝" },
  { href: "/nextjs", label: "Next.js", icon: "⚡" },
  { href: "/typescript", label: "TypeScript", icon: "📘" },
  { href: "/react", label: "React", icon: "⚛️" },
  { href: "/quiz", label: "クイズ", icon: "🧪" },
];

export default function QuickNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div>
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20"></div>
        <h3 className="relative text-xl font-bold m-0 pb-4 flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
            クイックナビ
          </span>
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
            <span
              className={`text-xl shrink-0 transition-transform duration-300 group-hover:scale-125 ${
                isActive(link.href) ? "" : "group-hover:rotate-12"
              }`}
            >
              {link.icon}
            </span>
            <span className="flex-1">{link.label}</span>
            {isActive(link.href) && (
              <span className="w-2 h-2 rounded-full bg-white shadow-lg animate-pulse"></span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
