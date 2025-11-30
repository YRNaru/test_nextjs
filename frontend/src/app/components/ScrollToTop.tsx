"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 300px以上スクロールしたらボタンを表示
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-foreground text-background border-2 border-foreground cursor-pointer text-2xl flex items-center justify-center z-[99] transition-all duration-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] opacity-90 hover:opacity-100 hover:-translate-y-[5px] hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)] active:-translate-y-[2px] md:bottom-6 md:right-6 md:w-11 md:h-11 md:text-xl"
          aria-label="上に戻る"
          title="上に戻る"
        >
          ↑
        </button>
      )}
    </>
  );
}
