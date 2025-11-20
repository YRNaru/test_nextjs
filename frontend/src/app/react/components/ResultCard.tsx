import { AnswerResult } from "../types";

interface ResultCardProps {
  sectionTitle: string;
  answerResults: AnswerResult[];
  totalQuestions: number;
  onReset: () => void;
}

export default function ResultCard({
  sectionTitle,
  answerResults,
  totalQuestions,
  onReset,
}: ResultCardProps) {
  const correctCount = answerResults.filter((r) => r.isCorrect).length;
  const correctRate = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6">
      <h3 className="text-2xl font-semibold mb-4 text-[var(--card-text)]">
        🎉 {sectionTitle}の練習完了！
      </h3>
      <p className="mb-2 text-[var(--card-text)]">
        正解数: {correctCount} / {totalQuestions}
      </p>
      <p className="mb-6 text-[var(--card-text)]">正答率: {correctRate}%</p>
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-[var(--card-text)]">
          全問題と解説
        </h4>
        {answerResults.map((result, idx) => (
          <div
            key={idx}
            className={`p-4 mb-4 rounded-lg border-l-4 ${
              result.isCorrect
                ? "bg-[#d4edda] border-l-[#28a745]"
                : "bg-[#f8d7da] border-l-[#dc3545]"
            }`}
          >
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2.5">
              <span className="font-semibold text-[var(--card-text)]">
                問題{idx + 1}：
              </span>
              <span className="text-xl">{result.isCorrect ? "✅" : "❌"}</span>
            </div>
            <div className="mb-3 text-[var(--card-text)]">
              <strong>Q.</strong> {result.question}
            </div>
            {result.code && (
              <pre className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-3 mb-3 overflow-x-auto font-mono text-xs">
                <code className="text-[var(--card-text)]">{result.code}</code>
              </pre>
            )}
            <div className="mb-2 text-[var(--card-text)]">
              <strong>あなたの解答：</strong> {result.options[result.selected]}
            </div>
            <div className="mb-2 text-[var(--card-text)]">
              <strong>正解：</strong> {result.options[result.correct]}
            </div>
            <div className="text-[var(--card-text)] leading-relaxed">
              <strong>解説：</strong> {result.explanation}
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full py-4 px-6 border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
        onClick={onReset}
      >
        もう一度練習する
      </button>
    </div>
  );
}
