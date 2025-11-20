"use client";

import { useState } from "react";

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: string;
}

export interface QuizCategory {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

interface QuizProps {
  categories: QuizCategory[];
}

interface QuizResult {
  questionId: string;
  category: string;
  selectedAnswer: number;
  isCorrect: boolean;
  correctAnswer: number;
  explanation: string;
}

export default function Quiz({ categories }: QuizProps) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentCategoryData = categories[currentCategory];
  const currentQuestionData = currentCategoryData?.questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return; // フィードバック表示中は選択不可
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestionData!.correctAnswer;

    const result: QuizResult = {
      questionId: currentQuestionData!.id,
      category: currentCategoryData!.title,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect,
      correctAnswer: currentQuestionData!.correctAnswer,
      explanation: currentQuestionData!.explanation,
    };

    setResults((prev) => [...prev, result]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQuestion < currentCategoryData!.questions.length - 1) {
      // 同じカテゴリ内の次の問題
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentCategory < categories.length - 1) {
      // 次のカテゴリの最初の問題
      setCurrentCategory(currentCategory + 1);
      setCurrentQuestion(0);
    } else {
      // すべての問題完了
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentCategory(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults([]);
    setQuizCompleted(false);
  };

  const getProgressText = () => {
    const totalQuestions = categories.reduce(
      (sum, cat) => sum + cat.questions.length,
      0,
    );
    const answeredQuestions = results.length;
    return `${answeredQuestions} / ${totalQuestions}`;
  };

  const getCategoryProgress = () => {
    const categoryQuestions = currentCategoryData?.questions.length || 0;
    const answeredInCategory = results.filter(
      (r) => r.category === currentCategoryData?.title,
    ).length;
    return `${answeredInCategory} / ${categoryQuestions}`;
  };

  const getCorrectCount = () => {
    return results.filter((r) => r.isCorrect).length;
  };

  const getCorrectCountByCategory = (categoryTitle: string) => {
    const categoryResults = results.filter((r) => r.category === categoryTitle);
    return categoryResults.filter((r) => r.isCorrect).length;
  };

  const getTotalQuestionsByCategory = (categoryTitle: string) => {
    const category = categories.find((cat) => cat.title === categoryTitle);
    return category?.questions.length || 0;
  };

  if (quizCompleted) {
    return (
      <div
        className="max-w-[800px] mx-auto p-5 font-sans md:p-4"
        data-oid="u9_37-l"
      >
        <div
          className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6"
          data-oid="sk71n8p"
        >
          <h2
            className="text-center mb-8 text-[var(--card-text)] text-3xl md:text-2xl"
            data-oid="fqij_d1"
          >
            🎉 クイズ完了！
          </h2>
          <div
            className="text-center mb-8 p-5 bg-[var(--section-background)] rounded-lg"
            data-oid="d-lzz50"
          >
            <p
              className="m-1 text-lg font-semibold text-[var(--card-text)]"
              data-oid="rsqecqf"
            >
              総合結果: {getCorrectCount()} / {results.length} 問正解
            </p>
            <p
              className="m-1 text-lg font-semibold text-[var(--card-text)]"
              data-oid="hl.8lik"
            >
              正答率: {Math.round((getCorrectCount() / results.length) * 100)}%
            </p>
          </div>

          <div className="mb-8" data-oid="mllhwjb">
            <h3 className="mb-4 text-[var(--card-text)]" data-oid="qnglfq6">
              カテゴリ別結果
            </h3>
            {categories.map((category) => {
              const correct = getCorrectCountByCategory(category.title);
              const total = getTotalQuestionsByCategory(category.title);
              const percentage =
                total > 0 ? Math.round((correct / total) * 100) : 0;

              return (
                <div
                  key={category.id}
                  className="flex justify-between items-center p-4 mb-2.5 bg-[var(--section-background)] rounded-md"
                  data-oid="k_g:tqj"
                >
                  <h4
                    className="m-0 text-[var(--card-text)]"
                    data-oid="lma:ost"
                  >
                    {category.title}
                  </h4>
                  <p
                    className="m-0 font-semibold text-[var(--card-text-secondary)]"
                    data-oid="1pveqi3"
                  >
                    {correct} / {total} 問正解 ({percentage}%)
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mb-8" data-oid="qgibywk">
            <h3 className="mb-4 text-[var(--card-text)]" data-oid="fpde-lq">
              詳細結果
            </h3>
            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 mb-2.5 rounded-md border-l-4 ${result.isCorrect ? "bg-[#d4edda] border-l-[#28a745]" : "bg-[#f8d7da] border-l-[#dc3545]"}`}
                data-oid="r_rza2a"
              >
                <div
                  className="flex justify-between items-center mb-2.5 flex-wrap gap-2.5"
                  data-oid="_jonio3"
                >
                  <span
                    className="font-semibold text-[var(--card-text)]"
                    data-oid="eg5c-ap"
                  >
                    問題 {index + 1}
                  </span>
                  <span
                    className="text-[var(--card-text-secondary)] text-sm"
                    data-oid="7dooms5"
                  >
                    {result.category}
                  </span>
                  <span className="font-semibold" data-oid="_u1cvsn">
                    {result.isCorrect ? "✅ 正解" : "❌ 不正解"}
                  </span>
                </div>
                <div
                  className="text-[var(--card-text)] leading-relaxed"
                  data-oid=".vjzrt1"
                >
                  <p className="m-0" data-oid="9orp1ny">
                    {result.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="block w-full p-4 border-none rounded-md bg-[#007bff] text-white text-lg font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#0056b3]"
            onClick={resetQuiz}
            data-oid="cp45tx0"
          >
            もう一度挑戦する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-[800px] mx-auto p-5 font-sans md:p-4"
      data-oid="m::8efo"
    >
      {/* カテゴリ選択 */}
      <div className="mb-8" data-oid="0952_5n">
        <h3 className="mb-4 text-[#333] text-xl" data-oid="b7-j0:z">
          カテゴリ選択
        </h3>
        <div className="flex gap-2.5 flex-wrap md:flex-col" data-oid="0notn7-">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`px-5 py-2.5 border-2 rounded-lg cursor-pointer transition-all duration-200 font-medium ${
                currentCategory === index
                  ? "border-[#007bff] bg-[#007bff] text-white"
                  : "border-[#e1e5e9] bg-white text-[#666] hover:border-[#007bff] hover:text-[#007bff]"
              }`}
              onClick={() => {
                setCurrentCategory(index);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowFeedback(false);
              }}
              data-oid="pn.2zhr"
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* 進捗表示 */}
      <div
        className="flex justify-between items-center mb-5 p-4 bg-[var(--section-background)] rounded-lg text-sm md:flex-col md:gap-2.5 md:text-center"
        data-oid="hvbl1nu"
      >
        <div
          className="font-semibold text-[var(--card-text)]"
          data-oid="r3b4hvy"
        >
          全体進捗: {getProgressText()}
        </div>
        <div className="text-[var(--card-text-secondary)]" data-oid="8r4sms.">
          {currentCategoryData?.title}: {getCategoryProgress()}
        </div>
      </div>

      {/* 問題表示 */}
      <div
        className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-5"
        data-oid="rnogtn2"
      >
        <h3
          className="mb-5 text-[var(--card-text)] text-2xl"
          data-oid="nizev1f"
        >
          問題 {currentQuestion + 1}
        </h3>
        <p
          className="text-lg leading-relaxed mb-5 text-[var(--card-text)]"
          data-oid="i1xntw8"
        >
          {currentQuestionData?.question}
        </p>

        {currentQuestionData?.code && (
          <pre
            className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-md p-4 mb-5 overflow-x-auto font-mono text-sm"
            data-oid="zfl01wm"
          >
            <code className="text-[var(--card-text)]" data-oid="0_72-rj">
              {currentQuestionData.code}
            </code>
          </pre>
        )}

        <div className="flex flex-col gap-3 mb-6" data-oid="zer1ri2">
          {currentQuestionData?.options.map((option, index) => (
            <button
              key={index}
              className={`px-5 py-4 border-2 rounded-lg text-left cursor-pointer transition-all duration-200 text-base leading-relaxed disabled:cursor-default ${
                selectedAnswer === index
                  ? "border-[#007bff] bg-[#e3f2fd] text-[#007bff] hover:bg-[#e3f2fd]"
                  : showFeedback && index === currentQuestionData!.correctAnswer
                    ? "border-[#28a745] bg-[#d4edda] text-[#155724]"
                    : showFeedback &&
                        selectedAnswer === index &&
                        index !== currentQuestionData!.correctAnswer
                      ? "border-[#dc3545] bg-[#f8d7da] text-[#721c24]"
                      : "border-[var(--border-color)] bg-[var(--card-background)] text-[var(--card-text)] hover:border-[#007bff] hover:bg-[var(--section-background)]"
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
              data-oid="anib7im"
            >
              {option}
            </button>
          ))}
        </div>

        {/* フィードバック表示 */}
        {showFeedback && (
          <div
            className={`p-5 rounded-lg mb-5 border-l-4 ${
              results[results.length - 1]?.isCorrect
                ? "bg-[#d4edda] border-l-[#28a745] text-[#155724]"
                : "bg-[#f8d7da] border-l-[#dc3545] text-[#721c24]"
            }`}
            data-oid="iq57r68"
          >
            <h4 className="mb-2.5 text-lg" data-oid="s181437">
              {results[results.length - 1]?.isCorrect
                ? "✅ 正解！"
                : "❌ 不正解"}
            </h4>
            <p className="m-0 leading-relaxed" data-oid="980khe6">
              {currentQuestionData?.explanation}
            </p>
          </div>
        )}

        {/* ボタン */}
        <div className="flex justify-center" data-oid="gngc_m5">
          {!showFeedback ? (
            <button
              className="px-8 py-3 border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-200 bg-[#007bff] text-white hover:bg-[#0056b3] disabled:bg-[#ccc] disabled:cursor-not-allowed"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              data-oid="i4u7f6h"
            >
              回答する
            </button>
          ) : (
            <button
              className="px-8 py-3 border-none rounded-md text-base font-semibold cursor-pointer transition-all duration-200 bg-[#28a745] text-white hover:bg-[#1e7e34]"
              onClick={handleNextQuestion}
              data-oid="g.jtgcb"
            >
              {currentQuestion < currentCategoryData!.questions.length - 1 ||
              currentCategory < categories.length - 1
                ? "次の問題"
                : "結果を見る"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
