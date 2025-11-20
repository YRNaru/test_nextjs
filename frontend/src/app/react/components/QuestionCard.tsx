import { PracticeQuestion } from "@/types/react";

interface QuestionCardProps {
  question: PracticeQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onSubmit: () => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
}: QuestionCardProps) {
  return (
    <div className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6">
      <h3 className="mb-5 text-[var(--card-text)] text-2xl">
        {question.question}
      </h3>
      {question.code && (
        <pre className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-4 mb-5 overflow-x-auto font-mono text-sm">
          <code className="text-[var(--card-text)]">{question.code}</code>
        </pre>
      )}
      <div className="flex flex-col gap-3 mb-6">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            className={`px-5 py-4 border-2 rounded-lg text-left cursor-pointer transition-all duration-200 text-base leading-relaxed ${
              selectedAnswer === index
                ? "border-[#3498db] bg-[rgba(52,152,219,0.1)] text-[#3498db] font-semibold"
                : "border-[var(--border-color)] bg-[var(--card-background)] text-[var(--card-text)] hover:border-[#3498db] hover:bg-[var(--section-background)]"
            }`}
            onClick={() => onAnswerSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="w-full py-3 px-6 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9] disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onSubmit}
        disabled={selectedAnswer === null}
      >
        回答する
      </button>
    </div>
  );
}
