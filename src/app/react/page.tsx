'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/react.module.css';

import { basicData, basicPractice, componentData, componentPractice, propsData, propsPractice, useReducerData, useReducerPractice, contextData, contextPractice, hooksData, hooksPractice, useStateData, useStatePractice, useCallbackData, useCallbackPractice, useMemoData, useMemoPractice, useEffectData, useEffectPractice, useContextData, useContextPractice, useLayoutEffectData, useLayoutEffectPractice, useRefData, useRefPractice, customHookData, customHookPractice } from '@/data/react-data';
import { BasicExample, PracticeQuestion, LearningSection } from '@/types/react';

export default function ReactPage() {
    const [activeSection, setActiveSection] = useState<'basic' | 'component' | 'props' | 'context' | 'hooks' | 'useState' | 'useReducer' | 'useCallback' | 'useMemo' | 'useEffect' | 'useContext' | 'useLayoutEffect' | 'useRef' | 'customHook'>('basic');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResults, setAnswerResults] = useState<{ selected: number; correct: number; isCorrect: boolean; explanation: string; question: string; code?: string; options: string[] }[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const fixedBasicData = { ...basicData, id: 'basic' };
    const fixedComponentData = { ...componentData, id: 'component' };
    const fixedPropsData = { ...propsData, id: 'props' };
    const fixedContextData = { ...contextData, id: 'context' };
    const fixedHooksData = { ...hooksData, id: 'hooks' };
    const fixedUseStateData = { ...useStateData, id: 'useState' };
    const fixedUseReducerData = { ...useReducerData, id: 'useReducer' };
    const fixedUseCallbackData = { ...useCallbackData, id: 'useCallback' };
    const fixedUseMemoData = { ...useMemoData, id: 'useMemo' };
    const fixedUseContextData = { ...useContextData, id: 'useContext' };
    const fixedUseEffectData = { ...useEffectData, id: 'useEffect' };
    const fixedUseLayoutEffectData = { ...useLayoutEffectData, id: 'useLayoutEffect' };
    const fixedUseRefData = { ...useRefData, id: 'useRef' };
    const fixedCustomHookData = { ...customHookData, id: 'customHook' };
    const sections: LearningSection[] = [fixedBasicData, fixedComponentData, fixedPropsData, fixedContextData, fixedHooksData, fixedUseStateData, fixedUseReducerData, fixedUseCallbackData, fixedUseMemoData, fixedUseEffectData, fixedUseContextData, fixedUseLayoutEffectData, fixedUseRefData, fixedCustomHookData];
    const sectionPracticeQuestions: { [key: string]: PracticeQuestion[] } = {
        basic: basicPractice,
        component: componentPractice,
        props: propsPractice,
        context: contextPractice,
        hooks: hooksPractice,
        useState: useStatePractice,
        useReducer: useReducerPractice,
        useCallback: useCallbackPractice,
        useMemo: useMemoPractice,
        useEffect: useEffectPractice,
        useContext: useContextPractice,
        useLayoutEffect: useLayoutEffectPractice,
        useRef: useRefPractice,
        customHook: customHookPractice,
    };

    const currentSectionData = sections.find(section => section.id === activeSection);
    const currentSectionQuestions = sectionPracticeQuestions[activeSection] || [];

    useEffect(() => {
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setAnswerResults([]);
        setShowFeedback(false);
    }, [activeSection]);

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;
        const question = currentSectionQuestions[currentQuestion];
        const isCorrect = selectedAnswer === question.correctAnswer;
        setAnswerResults(prev => [
            ...prev,
            {
                selected: selectedAnswer,
                correct: question.correctAnswer,
                isCorrect,
                explanation: question.explanation,
                question: question.question,
                code: question.code,
                options: question.options
            }
        ]);
        setShowFeedback(true);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        if (currentQuestion < currentSectionQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setAnswerResults([]);
        setShowFeedback(false);
    };

    const renderBasicExample = (example: BasicExample) => (
        <div key={example.id} className={styles.exampleCard}>
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

    const renderExamples = () => {
        if (!currentSectionData || !Array.isArray(currentSectionData.examples) || currentSectionData.examples.length === 0) {
            return <p>このセクションには例がありません。</p>;
        }
        return (currentSectionData.examples as BasicExample[]).map(example => renderBasicExample(example));
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>React 学習</h1>
                    <p>Reactの学習サイトです。</p>
                </header>
                <div className={styles.sectionTabs}>
                    {sections.map(section => (
                        <button
                            key={section.id}
                            className={`${styles.tab} ${activeSection === section.id ? styles.activeTab : ''}`}
                            onClick={() => setActiveSection(section.id as 'basic' | 'component' | 'props' | 'useReducer' | 'context' | 'hooks' | 'useState' | 'useCallback')}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
                <section className={styles.learningSection}>
                    <h2>{currentSectionData?.title}</h2>
                    <p className={styles.description}>{currentSectionData?.description}</p>
                    <div className={styles.keyPoints}>
                        <h3>重要なポイント</h3>
                        <ul>
                            {currentSectionData?.keyPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.examples}>
                        <h3>例</h3>
                        {renderExamples()}
                    </div>
                </section>
                <section className={styles.practiceSection}>
                    <h2>🧪 {currentSectionData?.title}の練習問題</h2>
                    {currentSectionQuestions && currentSectionQuestions.length > 0 ? (
                        <>
                            <div className={styles.progress}>
                                問題 {currentQuestion + 1} / {currentSectionQuestions.length}
                            </div>
                            {!showResult ? (
                                !showFeedback ? (
                                    <div className={styles.questionCard}>
                                        <h3>{currentSectionQuestions[currentQuestion].question}</h3>
                                        {currentSectionQuestions[currentQuestion].code && (
                                            <pre className={styles.questionCode}>
                                                <code>{currentSectionQuestions[currentQuestion].code}</code>
                                            </pre>
                                        )}
                                        <div className={styles.options}>
                                            {currentSectionQuestions[currentQuestion].options.map((option: string, index: number) => (
                                                <button
                                                    key={index}
                                                    className={`${styles.option} ${selectedAnswer === index ? styles.selectedOption : ''}`}
                                                    onClick={() => handleAnswerSelect(index)}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            className={styles.nextButton}
                                            onClick={handleSubmitAnswer}
                                            disabled={selectedAnswer === null}
                                        >
                                            回答する
                                        </button>
                                    </div>
                                ) : (
                                    <div className={styles.feedbackCard}>
                                        <h3>{answerResults[currentQuestion]?.isCorrect ? '✅ 正解！' : '❌ 不正解'}</h3>
                                        <p>{currentSectionQuestions[currentQuestion].explanation}</p>
                                        <button
                                            className={styles.nextButton}
                                            onClick={handleNextQuestion}
                                        >
                                            {currentQuestion < currentSectionQuestions.length - 1 ? '次の問題' : '結果を見る'}
                                        </button>
                                    </div>
                                )
                            ) : (
                                <div className={styles.resultCard}>
                                    <h3>🎉 {currentSectionData?.title}の練習完了！</h3>
                                    <p>正解数: {answerResults.filter(r => r.isCorrect).length} / {currentSectionQuestions.length}</p>
                                    <p>正答率: {Math.round((answerResults.filter(r => r.isCorrect).length / currentSectionQuestions.length) * 100)}%</p>
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
                                    <button className={styles.resetButton} onClick={resetQuiz}>
                                        もう一度練習する
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={styles.noQuestions}>
                            <p>このセクションには練習問題がありません。</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}