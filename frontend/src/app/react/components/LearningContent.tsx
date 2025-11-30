"use client";

import { LearningSection, BasicExample } from "@/types/react";
import ExampleCard from "./ExampleCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

interface LearningContentProps {
  sectionData: LearningSection | undefined;
}

export default function LearningContent({ sectionData }: LearningContentProps) {
  const { elementRef: sectionRef, isVisible: sectionVisibleFromObserver } =
    useScrollAnimation<HTMLElement>({ threshold: 0 });
  const { elementRef: descriptionRef, isVisible: descriptionVisible } =
    useScrollAnimation<HTMLParagraphElement>({ threshold: 0 });

  // セクションが変更されたときに、すべての要素を表示する
  const [sectionVisible, setSectionVisible] = useState(false);
  const [examplesVisible, setExamplesVisible] = useState(false);

  // セクションが変更されたときのリセットと表示
  useEffect(() => {
    if (!sectionData) return;

    // リセット
    setSectionVisible(false);
    setExamplesVisible(false);

    // 少し遅延して順番に表示（アニメーション効果のため）
    const timer0 = setTimeout(() => {
      setSectionVisible(true);
    }, 100);
    const timer2 = setTimeout(() => {
      setExamplesVisible(true);
    }, 500);

    // クリーンアップ関数
    return () => {
      clearTimeout(timer0);
      clearTimeout(timer2);
    };
  }, [sectionData]);

  // Observerで検出された場合も親要素を表示
  useEffect(() => {
    if (sectionVisibleFromObserver) {
      setSectionVisible(true);
    }
  }, [sectionVisibleFromObserver]);

  if (!sectionData) {
    return <p>セクションが見つかりません。</p>;
  }

  const renderExamples = () => {
    if (
      !Array.isArray(sectionData.examples) ||
      sectionData.examples.length === 0
    ) {
      return <p>このセクションには例がありません。</p>;
    }
    return (sectionData.examples as BasicExample[]).map((example) => (
      <ExampleCard key={example.id} example={example} />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className={`bg-gradient-to-br from-[var(--card-background)] to-[rgba(255,255,255,0.05)] rounded-2xl p-10 mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10 backdrop-blur-[10px] relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${sectionVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
      style={{
        borderTop: sectionVisible ? "3px solid" : "none",
        borderImage: sectionVisible
          ? "linear-gradient(90deg, #3498db, #2ecc71, #3498db) 1"
          : "none",
        borderImageSlice: sectionVisible ? "1" : "none",
      }}
    >
      <h2 className="text-[var(--card-text)] mb-4 text-3xl font-bold bg-gradient-to-br from-[#3498db] to-[#2ecc71] bg-clip-text text-transparent leading-tight tracking-tight">
        {sectionData.title}
      </h2>
      <p
        ref={descriptionRef}
        className={`text-lg leading-relaxed text-[var(--card-text-secondary)] mb-8 font-normal transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-200 ${descriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        {sectionData.description}
      </p>
      <div
        className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-8 rounded-2xl mb-8 border border-[rgba(52,152,219,0.2)] relative overflow-hidden backdrop-blur-[10px]"
        style={{
          borderLeft: "4px solid",
          borderImage: "linear-gradient(180deg, #3498db 0%, #2ecc71 100%) 1",
        }}
      >
        <h3 className="text-[var(--card-text)] mb-6 text-2xl font-bold bg-gradient-to-br from-[#3498db] to-[#2ecc71] bg-clip-text text-transparent leading-tight tracking-tight">
          重要なポイント
        </h3>
        <ul className="list-none p-0">
          {sectionData.keyPoints.map((point, index) => (
            <li
              key={index}
              className="py-3 pl-8 relative text-[var(--card-text-secondary)] transition-all duration-300 rounded-lg mb-1 hover:bg-[rgba(52,152,219,0.05)] hover:translate-x-1 hover:pl-9 before:content-['✓'] before:absolute before:left-2 before:text-[#2ecc71] before:font-bold before:text-xl before:w-6 before:h-6 before:flex before:items-center before:justify-center before:bg-[rgba(46,204,113,0.1)] before:rounded-full before:transition-all before:duration-300 hover:before:bg-[rgba(46,204,113,0.2)] hover:before:scale-110"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`mt-8 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${examplesVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-98"}`}
      >
        <h3 className="text-[var(--card-text)] mb-6 text-2xl font-bold bg-gradient-to-br from-[#3498db] to-[#9b59b6] bg-clip-text text-transparent leading-tight tracking-tight">
          例
        </h3>
        {renderExamples()}
      </div>
    </section>
  );
}
