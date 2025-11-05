export interface AnswerResult {
    selected: number;
    correct: number;
    isCorrect: boolean;
    explanation: string;
    question: string;
    code?: string;
    options: string[];
}

export type ParentSection = 'basic' | 'component' | 'props' | 'api' | 'hooks';
export type ChildSection = 'context' | 'useState' | 'useReducer' | 'useCallback' | 'useMemo' | 'useEffect' | 'useContext' | 'useLayoutEffect' | 'useRef' | 'customHook';

