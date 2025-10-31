import styles from '../../styles/react.module.css';
import { PracticeQuestion } from '@/types/react';

interface FeedbackCardProps {
    question: PracticeQuestion;
    isCorrect: boolean;
    onNext: () => void;
    isLastQuestion: boolean;
}

export default function FeedbackCard({ question, isCorrect, onNext, isLastQuestion }: FeedbackCardProps) {
    return (
        <div className={styles.feedbackCard}>
            <h3>{isCorrect ? '✅ 正解！' : '❌ 不正解'}</h3>
            <p>{question.explanation}</p>
            <button
                className={styles.nextButton}
                onClick={onNext}
            >
                {isLastQuestion ? '結果を見る' : '次の問題'}
            </button>
        </div>
    );
}

