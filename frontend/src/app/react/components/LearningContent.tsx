'use client';

import styles from '../../styles/react.module.css';
import { LearningSection, BasicExample } from '@/types/react';
import ExampleCard from './ExampleCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useState } from 'react';

interface LearningContentProps {
    sectionData: LearningSection | undefined;
}

export default function LearningContent({ sectionData }: LearningContentProps) {
    const { elementRef: sectionRef, isVisible: sectionVisibleFromObserver } = useScrollAnimation<HTMLElement>({ threshold: 0 });
    const { elementRef: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0 });
    
    // セクションが変更されたときに、すべての要素を表示する
    const [sectionVisible, setSectionVisible] = useState(false);
    const [examplesVisible, setExamplesVisible] = useState(false);
    
    // セクションが変更されたときのリセットと表示
    useEffect(() => {
        if (!sectionData) return;
        
        // リセット
        setSectionVisible(false);
        setExamplesVisible(false);
        
        // 少し遅延して順番に表示（アニメーション効果のため）
        const timer0 = setTimeout(() => {
            setSectionVisible(true);
        }, 100);
        const timer2 = setTimeout(() => {
            setExamplesVisible(true);
        }, 500);
        
        // クリーンアップ関数
        return () => {
            clearTimeout(timer0);
            clearTimeout(timer2);
        };
    }, [sectionData]);
    
    // Observerで検出された場合も親要素を表示
    useEffect(() => {
        if (sectionVisibleFromObserver) {
            setSectionVisible(true);
        }
    }, [sectionVisibleFromObserver]);

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
        <section ref={sectionRef} className={`${styles.learningSection} ${sectionVisible ? styles.visible : ''}`}>
            <h2>{sectionData.title}</h2>
            <p ref={descriptionRef} className={`${styles.description} ${descriptionVisible ? styles.visible : ''}`}>
                {sectionData.description}
            </p>
            <div className={styles.keyPoints}>
                <h3>重要なポイント</h3>
                <ul>
                    {sectionData.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
            <div className={`${styles.examples} ${examplesVisible ? styles.visible : ''}`}>
                <h3>例</h3>
                {renderExamples()}
            </div>
        </section>
    );
}

