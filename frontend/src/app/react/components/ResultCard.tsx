import styles from '../../styles/react.module.css';
import { AnswerResult } from '../types';

interface ResultCardProps {
    sectionTitle: string;
    answerResults: AnswerResult[];
    totalQuestions: number;
    onReset: () => void;
}

export default function ResultCard({ sectionTitle, answerResults, totalQuestions, onReset }: ResultCardProps) {
    const correctCount = answerResults.filter(r => r.isCorrect).length;
    const correctRate = Math.round((correctCount / totalQuestions) * 100);

    return (
        <div className={styles.resultCard}>
            <h3>🎉 {sectionTitle}の練習完了！</h3>
            <p>正解数: {correctCount} / {totalQuestions}</p>
            <p>正答率: {correctRate}%</p>
            <div className={styles.detailedResults}>
                <h4>全問題と解説</h4>
                {answerResults.map((result, idx) => (
                    <div key={idx} className={styles.resultItem}>
                        <div className={styles.resultHeader}>
                            <span>問題{idx + 1}：</span>
                            <span>{result.isCorrect ? '✅' : '❌'}</span>
                        </div>
                        <div className={styles.resultQuestion}><strong>Q.</strong> {result.question}</div>
                        {result.code && (
                            <pre className={styles.questionCode}><code>{result.code}</code></pre>
                        )}
                        <div className={styles.resultAnswer}>
                            <strong>あなたの解答：</strong> {result.options[result.selected]}
                        </div>
                        <div className={styles.resultCorrect}>
                            <strong>正解：</strong> {result.options[result.correct]}
                        </div>
                        <div className={styles.resultExplanation}>
                            <strong>解説：</strong> {result.explanation}
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.resetButton} onClick={onReset}>
                もう一度練習する
            </button>
        </div>
    );
}

