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
      className={`fixed top-20 bottom-0 w-[250px] max-h-[calc(100vh-80px)] overflow-y-auto bg-black/5 dark:bg-white/6 border-r-2 border-black/[0.08] dark:border-white/[0.145] p-6 pl-4 z-50 transition-all duration-300 left-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.145)] xl:w-[220px] lg:top-18 lg:bottom-auto lg:max-h-[calc(100vh-96px)] lg:w-[min(320px,90vw)] lg:mx-4 lg:rounded-2xl lg:shadow-[0_20px_40px_rgba(0,0,0,0.18)] lg:border lg:border-black/[0.08] dark:lg:border-white/[0.145] lg:border-r-0 lg:left-0 md:w-[min(300px,88vw)] md:mx-3 md:left-3 md:closed:translate-x-[-110%] ${leftSidebarOpen ? "translate-x-0 opacity-100 shadow-[0_16px_32px_rgba(0,0,0,0.12)]" : "translate-x-[-100%] opacity-0 pointer-events-none"}`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
      data-oid=":ld3mhb"
    >
      <div
        className="flex flex-col gap-6 bg-black/5 dark:bg-white/6 p-2 rounded-lg border border-dashed border-black/[0.08] dark:border-white/[0.145]"
        data-oid="4a9ducs"
      >
        <h3
          className="text-lg font-semibold mb-4 m-0 text-foreground pb-3 border-b-2 border-black/[0.08] dark:border-white/[0.145] relative before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-5 before:h-0.5 before:bg-foreground before:opacity-30 after:content-[''] after:absolute after:bottom-[-2px] after:right-0 after:w-5 after:h-0.5 after:bg-foreground after:opacity-30"
          data-oid="s:mk:tl"
        >
          📚 クイックナビ
        </h3>
        <nav className="flex flex-col gap-2" data-oid="nmaeiu9">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative flex items-center gap-3 px-3 py-3 rounded-lg border border-black/[0.08] dark:border-white/[0.145] no-underline text-foreground transition-all duration-200 text-sm bg-background before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-0.5 before:h-0 before:bg-[#3498db] before:transition-all before:duration-200 before:rounded-l-sm hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:translate-x-1 hover:border-black/[0.08] dark:hover:border-white/[0.145] hover:before:h-[60%] ${isActive(link.href) ? "bg-[rgba(52,152,219,0.1)] text-[#3498db] font-semibold border-[#3498db] before:h-[80%]" : ""}`}
              data-oid="k-yy7st"
            >
              <span className="text-lg shrink-0" data-oid="2pcpj50">
                {link.icon}
              </span>
              <span className="flex-1" data-oid="-go6-5_">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        <div
          className="mt-2 p-4 border border-black/[0.08] dark:border-white/[0.145] rounded-lg bg-background shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
          data-oid="k6i9tpz"
        >
          <h4
            className="text-sm font-semibold mb-3 m-0 text-foreground opacity-90"
            data-oid="m5g9orv"
          >
            💡 便利リンク
          </h4>
          <ul
            className="list-none p-0 m-0 flex flex-col gap-2"
            data-oid="rqe3g0y"
          >
            <li className="m-0" data-oid="g0sp5ck">
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md no-underline text-foreground text-sm transition-all duration-200 opacity-80 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:opacity-100"
                data-oid="nkw0vgs"
              >
                Next.js 公式ドキュメント
              </a>
            </li>
            <li className="m-0" data-oid="rvm83u2">
              <a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md no-underline text-foreground text-sm transition-all duration-200 opacity-80 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:opacity-100"
                data-oid="xuibqc3"
              >
                React 公式サイト
              </a>
            </li>
            <li className="m-0" data-oid="0k6ervs">
              <a
                href="https://www.typescriptlang.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 rounded-md no-underline text-foreground text-sm transition-all duration-200 opacity-80 hover:bg-black/[0.08] dark:hover:bg-white/[0.145] hover:opacity-100"
                data-oid="_h._a9m"
              >
                TypeScript ドキュメント
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
