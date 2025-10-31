import styles from '../../styles/react.module.css';
import { BasicExample } from '@/types/react';

interface ExampleCardProps {
    example: BasicExample;
}

export default function ExampleCard({ example }: ExampleCardProps) {
    return (
        <div className={styles.exampleCard}>
            <h3>{example.name}</h3>
            <p>{example.description}</p>
            <div className={styles.codeBlock}>
                <pre><code>{example.example}</code></pre>
            </div>
            {example.correctUsage && (
                <div className={styles.usageComparison}>
                    <div className={styles.correctUsage}>
                        <strong>正しい使用法:</strong>
                        <pre><code>{example.correctUsage}</code></pre>
                    </div>
                    <div className={styles.incorrectUsage}>
                        <strong>間違った使用法:</strong>
                        <pre><code>{example.incorrectUsage}</code></pre>
                    </div>
                </div>
            )}
            <p className={styles.explanation}>{example.explanation}</p>
            {example.keyPoints && (
                <div className={styles.keyPoints}>
                    <strong>ポイント:</strong>
                    <ul>
                        {example.keyPoints.map((point, idx) => <li key={idx}>{point}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

