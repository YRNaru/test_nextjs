"use client";

import { useSidebar } from "../SidebarContext";

interface SidebarToggleProps {
  side: "left" | "right";
}

export default function SidebarToggle({ side }: SidebarToggleProps) {
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
  } = useSidebar();

  const isOpen = side === "left" ? leftSidebarOpen : rightSidebarOpen;
  const toggle = side === "left" ? toggleLeftSidebar : toggleRightSidebar;
  const icon = side === "left"
    ? (isOpen ? "◀" : "▶")
    : (isOpen ? "▶" : "◀");
  const label = side === "left"
    ? (isOpen ? "左サイドバーを閉じる" : "左サイドバーを開く")
    : (isOpen ? "右サイドバーを閉じる" : "右サイドバーを開く");

  return (
    <button
      onClick={toggle}
      className="group relative bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none rounded-xl px-3 py-2 text-base transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50 min-w-[40px] h-10 flex items-center justify-center overflow-hidden md:min-w-[36px] md:h-9 md:px-2.5 md:py-1.5"
      aria-label={label}
      title={label}
    >
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="relative z-10">{icon}</span>
    </button>
  );
}

