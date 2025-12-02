"use client";

import { useSidebar } from "./SidebarContext";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MainContent({ children }: { children: ReactNode }) {
  const { leftSidebarOpen, rightSidebarOpen } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    setMounted(true);
    setViewportWidth(window.innerWidth);

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = 320;
  const shouldOffsetSidebars = viewportWidth >= 1200;

  const paddingLeft =
    mounted && leftSidebarOpen && shouldOffsetSidebars ? `${sidebarWidth}px` : "0";
  const paddingRight =
    mounted && rightSidebarOpen && shouldOffsetSidebars ? `${sidebarWidth}px` : "0";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20 transition-[padding] duration-300 ease-in-out"
      style={{
        paddingLeft,
        paddingRight,
      }}
    >
      {children}
    </motion.main>
  );
}
