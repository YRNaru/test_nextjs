import { PracticeQuestion } from "@/types/react";

interface FeedbackCardProps {
  question: PracticeQuestion;
  isCorrect: boolean;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function FeedbackCard({
  question,
  isCorrect,
  onNext,
  isLastQuestion,
}: FeedbackCardProps) {
  return (
    <div
      className={`p-6 rounded-xl mb-6 border-l-4 ${
        isCorrect
          ? "bg-[#d4edda] border-l-[#28a745] text-[#155724]"
          : "bg-[#f8d7da] border-l-[#dc3545] text-[#721c24]"
      }`}
      data-oid="fnylz6c"
    >
      <h3 className="text-2xl font-semibold mb-3" data-oid="k8wdgwt">
        {isCorrect ? "✅ 正解！" : "❌ 不正解"}
      </h3>
      <p className="mb-6 leading-relaxed" data-oid="npk8epd">
        {question.explanation}
      </p>
      <button
        className="w-full py-3 px-6 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
        onClick={onNext}
        data-oid="w2euq9u"
      >
        {isLastQuestion ? "結果を見る" : "次の問題"}
      </button>
    </div>
  );
}
