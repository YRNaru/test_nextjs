"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/mypage", label: "マイページ" },
  { href: "/blog", label: "ブログ" },
  { href: "/nextjs", label: "Next.js" },
  { href: "/typescript", label: "TypeScript" },
  { href: "/react", label: "React" },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="hidden xl:flex gap-6 items-center xl:gap-4 xl:text-sm">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`relative no-underline text-foreground font-semibold transition-all duration-300 hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full ${
            isActive(link.href)
              ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 after:w-full"
              : ""
          } xl:text-[0.9rem]`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

