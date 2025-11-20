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
    <div
      className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6"
      data-oid="7bht3lg"
    >
      <h3
        className="text-2xl font-semibold mb-4 text-[var(--card-text)]"
        data-oid="1g8k649"
      >
        🎉 {sectionTitle}の練習完了！
      </h3>
      <p className="mb-2 text-[var(--card-text)]" data-oid="vqw7drf">
        正解数: {correctCount} / {totalQuestions}
      </p>
      <p className="mb-6 text-[var(--card-text)]" data-oid="5eczqoq">
        正答率: {correctRate}%
      </p>
      <div className="mb-8" data-oid="passijl">
        <h4
          className="text-xl font-semibold mb-4 text-[var(--card-text)]"
          data-oid="om7unj6"
        >
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
            data-oid="h-v86aw"
          >
            <div
              className="flex justify-between items-center mb-3 flex-wrap gap-2.5"
              data-oid="if3xtkg"
            >
              <span
                className="font-semibold text-[var(--card-text)]"
                data-oid="vdgo4ch"
              >
                問題{idx + 1}：
              </span>
              <span className="text-xl" data-oid="amd43-_">
                {result.isCorrect ? "✅" : "❌"}
              </span>
            </div>
            <div className="mb-3 text-[var(--card-text)]" data-oid="50br004">
              <strong data-oid="xgcjz._">Q.</strong> {result.question}
            </div>
            {result.code && (
              <pre
                className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-3 mb-3 overflow-x-auto font-mono text-xs"
                data-oid="v.ya4e9"
              >
                <code className="text-[var(--card-text)]" data-oid="rjq:zv.">
                  {result.code}
                </code>
              </pre>
            )}
            <div className="mb-2 text-[var(--card-text)]" data-oid="8t75b0s">
              <strong data-oid="81vpvvy">あなたの解答：</strong>{" "}
              {result.options[result.selected]}
            </div>
            <div className="mb-2 text-[var(--card-text)]" data-oid="_vcf:q3">
              <strong data-oid="685x2xx">正解：</strong>{" "}
              {result.options[result.correct]}
            </div>
            <div
              className="text-[var(--card-text)] leading-relaxed"
              data-oid="2tg:zy:"
            >
              <strong data-oid="4gyp5zx">解説：</strong> {result.explanation}
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full py-4 px-6 border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
        onClick={onReset}
        data-oid="61:9amv"
      >
        もう一度練習する
      </button>
    </div>
  );
}
