"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenisインスタンスを作成
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      // サイドバーや特定の要素でのスクロールを除外
      prevent: (node) => {
        // data-lenis-prevent属性を持つ要素とその子要素は除外
        return node.hasAttribute('data-lenis-prevent') || 
               node.closest('[data-lenis-prevent]') !== null;
      },
    });

    // アニメーションフレームでLenisを更新
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // クリーンアップ
    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  return <>{children}</>;
}
