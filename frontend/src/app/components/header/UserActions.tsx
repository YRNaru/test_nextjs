"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function UserActions() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return null;

  return (
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
  );
}

