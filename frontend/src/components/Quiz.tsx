'use client';

import { useState } from 'react';
import styles from './Quiz.module.css';

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
      explanation: currentQuestionData!.explanation
    };

    setResults(prev => [...prev, result]);
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
    const totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
    const answeredQuestions = results.length;
    return `${answeredQuestions} / ${totalQuestions}`;
  };

  const getCategoryProgress = () => {
    const categoryQuestions = currentCategoryData?.questions.length || 0;
    const answeredInCategory = results.filter(r => r.category === currentCategoryData?.title).length;
    return `${answeredInCategory} / ${categoryQuestions}`;
  };

  const getCorrectCount = () => {
    return results.filter(r => r.isCorrect).length;
  };

  const getCorrectCountByCategory = (categoryTitle: string) => {
    const categoryResults = results.filter(r => r.category === categoryTitle);
    return categoryResults.filter(r => r.isCorrect).length;
  };

  const getTotalQuestionsByCategory = (categoryTitle: string) => {
    const category = categories.find(cat => cat.title === categoryTitle);
    return category?.questions.length || 0;
  };

  if (quizCompleted) {
    return (
      <div className={styles.quizContainer}>
        <div className={styles.resultSummary}>
          <h2>🎉 クイズ完了！</h2>
          <div className={styles.overallResult}>
            <p>総合結果: {getCorrectCount()} / {results.length} 問正解</p>
            <p>正答率: {Math.round((getCorrectCount() / results.length) * 100)}%</p>
          </div>

          <div className={styles.categoryResults}>
            <h3>カテゴリ別結果</h3>
            {categories.map(category => {
              const correct = getCorrectCountByCategory(category.title);
              const total = getTotalQuestionsByCategory(category.title);
              const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
              
              return (
                <div key={category.id} className={styles.categoryResult}>
                  <h4>{category.title}</h4>
                  <p>{correct} / {total} 問正解 ({percentage}%)</p>
                </div>
              );
            })}
          </div>

          <div className={styles.detailedResults}>
            <h3>詳細結果</h3>
            {results.map((result, index) => (
              <div key={index} className={`${styles.resultItem} ${result.isCorrect ? styles.correct : styles.incorrect}`}>
                <div className={styles.resultHeader}>
                  <span className={styles.resultNumber}>問題 {index + 1}</span>
                  <span className={styles.resultCategory}>{result.category}</span>
                  <span className={styles.resultStatus}>
                    {result.isCorrect ? '✅ 正解' : '❌ 不正解'}
                  </span>
                </div>
                <div className={styles.resultExplanation}>
                  <p>{result.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.resetButton} onClick={resetQuiz}>
            もう一度挑戦する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.quizContainer}>
      {/* カテゴリ選択 */}
      <div className={styles.categorySelector}>
        <h3>カテゴリ選択</h3>
        <div className={styles.categoryTabs}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`${styles.categoryTab} ${currentCategory === index ? styles.activeCategory : ''}`}
              onClick={() => {
                setCurrentCategory(index);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowFeedback(false);
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {/* 進捗表示 */}
      <div className={styles.progress}>
        <div className={styles.overallProgress}>
          全体進捗: {getProgressText()}
        </div>
        <div className={styles.categoryProgress}>
          {currentCategoryData?.title}: {getCategoryProgress()}
        </div>
      </div>

      {/* 問題表示 */}
      <div className={styles.questionCard}>
        <h3>問題 {currentQuestion + 1}</h3>
        <p className={styles.questionText}>{currentQuestionData?.question}</p>
        
        {currentQuestionData?.code && (
          <pre className={styles.questionCode}>
            <code>{currentQuestionData.code}</code>
          </pre>
        )}

        <div className={styles.options}>
          {currentQuestionData?.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.option} ${
                selectedAnswer === index ? styles.selectedOption : ''
              } ${
                showFeedback && index === currentQuestionData!.correctAnswer 
                  ? styles.correctAnswer 
                  : ''
              } ${
                showFeedback && selectedAnswer === index && index !== currentQuestionData!.correctAnswer 
                  ? styles.incorrectAnswer 
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback}
            >
              {option}
            </button>
          ))}
        </div>

        {/* フィードバック表示 */}
        {showFeedback && (
          <div className={`${styles.feedback} ${results[results.length - 1]?.isCorrect ? styles.correctFeedback : styles.incorrectFeedback}`}>
            <h4>{results[results.length - 1]?.isCorrect ? '✅ 正解！' : '❌ 不正解'}</h4>
            <p>{currentQuestionData?.explanation}</p>
          </div>
        )}

        {/* ボタン */}
        <div className={styles.buttonContainer}>
          {!showFeedback ? (
            <button
              className={styles.submitButton}
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              回答する
            </button>
          ) : (
            <button
              className={styles.nextButton}
              onClick={handleNextQuestion}
            >
              {currentQuestion < currentCategoryData!.questions.length - 1 || currentCategory < categories.length - 1 
                ? '次の問題' 
                : '結果を見る'
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 