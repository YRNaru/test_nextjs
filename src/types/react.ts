// React学習用型定義

export interface BasicExample {
  id: string;
  type: 'component' | 'hook' | 'state' | 'props' | 'event' | 'lifecycle' | 'context' | 'ref' | 'memo' | 'effect' | 'custom' | 'other';
  name: string;
  description: string;
  example: string;
  correctUsage?: string;
  incorrectUsage?: string;
  explanation: string;
  keyPoints?: string[];
  benefits?: string[];
}

export interface PracticeQuestion {
  id: string;
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'component' | 'hook' | 'state' | 'props' | 'event' | 'lifecycle' | 'context' | 'ref' | 'memo' | 'effect' | 'custom' | 'other';
}

export interface LearningSection {
  id: string;
  title: string;
  description: string;
  examples: BasicExample[];
  keyPoints: string[];
  benefits?: string[];
}