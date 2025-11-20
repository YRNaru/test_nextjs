"use client";

import { useSidebar } from "./SidebarContext";
import { ReactNode, useEffect, useState } from "react";

export default function MainContent({ children }: { children: ReactNode }) {
  const { leftSidebarOpen, rightSidebarOpen } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    // クライアント側でのみ実行
    setMounted(true);
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // サーバー側とクライアント側で同じ初期値を返す
  const sidebarWidth =
    viewportWidth > 1200 && viewportWidth <= 1400 ? 220 : 250;
  const shouldOffsetSidebars = viewportWidth >= 1200;

  // mountedになるまではサーバー側と同じ値（0）を返す
  const paddingLeft =
    mounted && leftSidebarOpen && shouldOffsetSidebars
      ? `${sidebarWidth}px`
      : "0";
  const paddingRight =
    mounted && rightSidebarOpen && shouldOffsetSidebars
      ? `${sidebarWidth}px`
      : "0";

  return (
    <main
      className="min-h-screen pt-20 transition-[padding] duration-300 xl:px-0 md:px-0"
      style={{
        paddingLeft,
        paddingRight,
      }}
      data-oid="wz2tdd8"
    >
      {children}
    </main>
  );
}
