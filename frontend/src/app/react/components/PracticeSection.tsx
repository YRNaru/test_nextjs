"use client";

import { PracticeQuestion } from "@/types/react";
import QuestionCard from "./QuestionCard";
import FeedbackCard from "./FeedbackCard";
import ResultCard from "./ResultCard";
import { AnswerResult } from "../types";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface PracticeSectionProps {
  sectionTitle: string;
  questions: PracticeQuestion[];
  currentQuestion: number;
  selectedAnswer: number | null;
  showResult: boolean;
  showFeedback: boolean;
  answerResults: AnswerResult[];
  onAnswerSelect: (index: number) => void;
  onSubmit: () => void;
  onNext: () => void;
  onReset: () => void;
}

export default function PracticeSection({
  sectionTitle,
  questions,
  currentQuestion,
  selectedAnswer,
  showResult,
  showFeedback,
  answerResults,
  onAnswerSelect,
  onSubmit,
  onNext,
  onReset,
}: PracticeSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation();

  if (!questions || questions.length === 0) {
    return (
      <section
        ref={elementRef}
        className={`bg-gradient-to-br from-[var(--card-background)] to-[rgba(255,255,255,0.05)] rounded-2xl p-10 mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-white/10 backdrop-blur-[10px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
        data-oid="8shd::9"
      >
        <h2
          className="text-[var(--card-text)] mb-6 text-3xl font-bold"
          data-oid="6-9g:l8"
        >
          🧪 {sectionTitle}の練習問題
        </h2>
        <div
          className="text-center p-8 text-[var(--card-text-secondary)]"
          data-oid="19ewjj7"
        >
          <p className="m-0" data-oid="a2y-7ph">
            このセクションには練習問題がありません。
          </p>
        </div>
      </section>
    );
  }

  const isLastQuestion = currentQuestion >= questions.length - 1;

  return (
    <section
      ref={elementRef}
      className={`bg-gradient-to-br from-[var(--card-background)] to-[rgba(255,255,255,0.05)] rounded-2xl p-10 mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] border border-white/10 backdrop-blur-[10px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}
      data-oid="hkctzou"
    >
      <h2
        className="text-[var(--card-text)] mb-6 text-3xl font-bold"
        data-oid="os2f4zu"
      >
        🧪 {sectionTitle}の練習問題
      </h2>
      <div
        className="flex justify-center items-center p-4 bg-[var(--section-background)] rounded-lg mb-6 text-sm font-semibold text-[var(--card-text)]"
        data-oid="7m12fy4"
      >
        問題 {currentQuestion + 1} / {questions.length}
      </div>
      {!showResult ? (
        !showFeedback ? (
          <QuestionCard
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={onAnswerSelect}
            onSubmit={onSubmit}
            data-oid="a_ntdk3"
          />
        ) : (
          <FeedbackCard
            question={questions[currentQuestion]}
            isCorrect={answerResults[currentQuestion]?.isCorrect || false}
            onNext={onNext}
            isLastQuestion={isLastQuestion}
            data-oid="e784_a."
          />
        )
      ) : (
        <ResultCard
          sectionTitle={sectionTitle}
          answerResults={answerResults}
          totalQuestions={questions.length}
          onReset={onReset}
          data-oid="mtdab4q"
        />
      )}
    </section>
  );
}
