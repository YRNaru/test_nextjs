'use client';

import styles from '../../styles/react.module.css';
import { PracticeQuestion } from '@/types/react';
import QuestionCard from './QuestionCard';
import FeedbackCard from './FeedbackCard';
import ResultCard from './ResultCard';
import { AnswerResult } from '../types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
    onReset
}: PracticeSectionProps) {
    const { elementRef, isVisible } = useScrollAnimation();

    if (!questions || questions.length === 0) {
        return (
            <section ref={elementRef} className={`${styles.practiceSection} ${isVisible ? styles.visible : ''}`}>
                <h2>🧪 {sectionTitle}の練習問題</h2>
                <div className={styles.noQuestions}>
                    <p>このセクションには練習問題がありません。</p>
                </div>
            </section>
        );
    }

    const isLastQuestion = currentQuestion >= questions.length - 1;

    return (
        <section ref={elementRef} className={`${styles.practiceSection} ${isVisible ? styles.visible : ''}`}>
            <h2>🧪 {sectionTitle}の練習問題</h2>
            <div className={styles.progress}>
                問題 {currentQuestion + 1} / {questions.length}
            </div>
            {!showResult ? (
                !showFeedback ? (
                    <QuestionCard
                        question={questions[currentQuestion]}
                        selectedAnswer={selectedAnswer}
                        onAnswerSelect={onAnswerSelect}
                        onSubmit={onSubmit}
                    />
                ) : (
                    <FeedbackCard
                        question={questions[currentQuestion]}
                        isCorrect={answerResults[currentQuestion]?.isCorrect || false}
                        onNext={onNext}
                        isLastQuestion={isLastQuestion}
                    />
                )
            ) : (
                <ResultCard
                    sectionTitle={sectionTitle}
                    answerResults={answerResults}
                    totalQuestions={questions.length}
                    onReset={onReset}
                />
            )}
        </section>
    );
}

