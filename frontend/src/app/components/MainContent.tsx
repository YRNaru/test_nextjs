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

  // サイドバー幅を320pxに固定（パディング6 = 24px を含む）
  const sidebarWidth = 320;
  // 1280px以上（xlブレークポイント）でサイドバーが固定表示される
  const shouldOffsetSidebars = viewportWidth >= 1200;

  // mountedになるまではサーバー側と同じ値（0）を返す
  const paddingLeft =
    mounted && leftSidebarOpen && shouldOffsetSidebars ? `${sidebarWidth}px` : "0";
  const paddingRight =
    mounted && rightSidebarOpen && shouldOffsetSidebars ? `${sidebarWidth}px` : "0";

  return (
    <main
      className="min-h-screen pt-20 transition-[padding] duration-300 ease-in-out"
      style={{
        paddingLeft,
        paddingRight,
      }}
    >
      {children}
    </main>
  );
}
