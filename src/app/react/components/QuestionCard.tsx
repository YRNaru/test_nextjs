import styles from '../../styles/react.module.css';
import { PracticeQuestion } from '@/types/react';

interface QuestionCardProps {
    question: PracticeQuestion;
    selectedAnswer: number | null;
    onAnswerSelect: (index: number) => void;
    onSubmit: () => void;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerSelect, onSubmit }: QuestionCardProps) {
    return (
        <div className={styles.questionCard}>
            <h3>{question.question}</h3>
            {question.code && (
                <pre className={styles.questionCode}>
                    <code>{question.code}</code>
                </pre>
            )}
            <div className={styles.options}>
                {question.options.map((option: string, index: number) => (
                    <button
                        key={index}
                        className={`${styles.option} ${selectedAnswer === index ? styles.selectedOption : ''}`}
                        onClick={() => onAnswerSelect(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button
                className={styles.nextButton}
                onClick={onSubmit}
                disabled={selectedAnswer === null}
            >
                回答する
            </button>
        </div>
    );
}

