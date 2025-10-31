import styles from '../../styles/react.module.css';
import { LearningSection, BasicExample } from '@/types/react';
import ExampleCard from './ExampleCard';

interface LearningContentProps {
    sectionData: LearningSection | undefined;
}

export default function LearningContent({ sectionData }: LearningContentProps) {
    if (!sectionData) {
        return <p>セクションが見つかりません。</p>;
    }

    const renderExamples = () => {
        if (!Array.isArray(sectionData.examples) || sectionData.examples.length === 0) {
            return <p>このセクションには例がありません。</p>;
        }
        return (sectionData.examples as BasicExample[]).map(example => (
            <ExampleCard key={example.id} example={example} />
        ));
    };

    return (
        <section className={styles.learningSection}>
            <h2>{sectionData.title}</h2>
            <p className={styles.description}>{sectionData.description}</p>
            <div className={styles.keyPoints}>
                <h3>重要なポイント</h3>
                <ul>
                    {sectionData.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
            <div className={styles.examples}>
                <h3>例</h3>
                {renderExamples()}
            </div>
        </section>
    );
}

