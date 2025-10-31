'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/react.module.css';

import { basicData, basicPractice, componentData, componentPractice, propsData, propsPractice, useReducerData, useReducerPractice, contextData, contextPractice, hooksData, hooksPractice, useStateData, useStatePractice, useCallbackData, useCallbackPractice, useMemoData, useMemoPractice, useEffectData, useEffectPractice, useContextData, useContextPractice, useLayoutEffectData, useLayoutEffectPractice, useRefData, useRefPractice, customHookData, customHookPractice } from '@/data/react-data';
import { PracticeQuestion, LearningSection } from '@/types/react';
import SectionTabs from './components/SectionTabs';
import ChildSectionTabs from './components/ChildSectionTabs';
import LearningContent from './components/LearningContent';
import PracticeSection from './components/PracticeSection';
import { ParentSection, ChildSection, AnswerResult } from './types';

export default function ReactPage() {
    const [parentSection, setParentSection] = useState<ParentSection>('basic');
    const [childSection, setChildSection] = useState<ChildSection | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answerResults, setAnswerResults] = useState<AnswerResult[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);

    // 親セクションのデータ
    const fixedBasicData = { ...basicData, id: 'basic' };
    const fixedComponentData = { ...componentData, id: 'component' };
    const fixedPropsData = { ...propsData, id: 'props' };
    const fixedContextData = { ...contextData, id: 'context' };
    const fixedHooksData = { ...hooksData, id: 'hooks' };
    const parentSections: LearningSection[] = [fixedBasicData, fixedComponentData, fixedPropsData, fixedContextData, fixedHooksData];

    // 子セクション（フック）のデータ
    const fixedUseStateData = { ...useStateData, id: 'useState' };
    const fixedUseReducerData = { ...useReducerData, id: 'useReducer' };
    const fixedUseCallbackData = { ...useCallbackData, id: 'useCallback' };
    const fixedUseMemoData = { ...useMemoData, id: 'useMemo' };
    const fixedUseContextData = { ...useContextData, id: 'useContext' };
    const fixedUseEffectData = { ...useEffectData, id: 'useEffect' };
    const fixedUseLayoutEffectData = { ...useLayoutEffectData, id: 'useLayoutEffect' };
    const fixedUseRefData = { ...useRefData, id: 'useRef' };
    const fixedCustomHookData = { ...customHookData, id: 'customHook' };
    const childSections: LearningSection[] = [fixedUseStateData, fixedUseReducerData, fixedUseCallbackData, fixedUseMemoData, fixedUseEffectData, fixedUseContextData, fixedUseLayoutEffectData, fixedUseRefData, fixedCustomHookData];

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

    // 現在表示するセクションを決定
    const activeSection = childSection || parentSection;
    const currentSectionData = childSection 
        ? childSections.find(section => section.id === childSection)
        : parentSections.find(section => section.id === parentSection);
    const currentSectionQuestions = sectionPracticeQuestions[activeSection] || [];

    useEffect(() => {
        setCurrentQuestion(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setAnswerResults([]);
        setShowFeedback(false);
    }, [activeSection]);

    // 親セクションが変更されたとき、子セクションをリセット
    useEffect(() => {
        if (parentSection !== 'hooks') {
            setChildSection(null);
        }
    }, [parentSection]);

    const handleParentSectionClick = (section: ParentSection) => {
        setParentSection(section);
        if (section !== 'hooks') {
            setChildSection(null);
        }
    };

    const handleChildSectionClick = (section: ChildSection) => {
        // 既に選択されているセクションがクリックされた場合は解除
        if (childSection === section) {
            setChildSection(null);
        } else {
            setChildSection(section);
        }
    };

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

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <header className={styles.header}>
                    <h1>React 学習</h1>
                </header>
                <SectionTabs
                    sections={parentSections}
                    activeSection={parentSection}
                    onSectionClick={handleParentSectionClick}
                />
                {parentSection === 'hooks' && (
                    <ChildSectionTabs
                        sections={childSections}
                        activeSection={childSection}
                        onSectionClick={handleChildSectionClick}
                    />
                )}
                <LearningContent sectionData={currentSectionData} />
                <PracticeSection
                    sectionTitle={currentSectionData?.title || ''}
                    questions={currentSectionQuestions}
                    currentQuestion={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    showResult={showResult}
                    showFeedback={showFeedback}
                    answerResults={answerResults}
                    onAnswerSelect={handleAnswerSelect}
                    onSubmit={handleSubmitAnswer}
                    onNext={handleNextQuestion}
                    onReset={resetQuiz}
                />
            </main>
        </div>
    );
}