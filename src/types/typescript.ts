// TypeScriptプリミティブ型の学習用型定義

// プリミティブ型の例
export interface PrimitiveExample {
  id: string;
  type: 'string' | 'number' | 'boolean' | 'any';
  name: string;
  description: string;
  example: string;
  correctValue: string | number | boolean;
  incorrectValue: string | number | boolean;
  explanation: string;
  keyPoints?: string[];
  benefits?: string[];
}

// any型の例
export interface AnyExample {
  id: string;
  type: 'any';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  warnings: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// 関数型の例
export interface FunctionExample {
  id: string;
  type: 'function' | 'optional' | 'default' | 'callback' | 'arrow';
  name: string;
  description: string;
  syntax: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  parameters?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// 型推論の例
export interface InferenceExample {
  id: string;
  type: 'inference' | 'object' | 'function' | 'array' | 'assignment';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  keyPoints?: string[];
  benefits?: string[];
}

// 型アサーションの例
export interface AssertionExample {
  id: string;
  type: 'assertion' | 'dom' | 'any' | 'double' | 'caution';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  cautions: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// 型エイリアスの例
export interface AliasExample {
  id: string;
  type: 'alias' | 'object' | 'function' | 'index';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  keyPoints?: string[];
  benefits?: string[];
}

// 変数の例
export interface VariableExample {
  id: string;
  type: 'let' | 'const' | 'var' | 'annotation' | 'scope' | 'summary';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// 配列型の例
export interface ArrayExample {
  id: string;
  type: 'array' | 'tuple' | 'union';
  name: string;
  description: string;
  syntax: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  keyPoints?: string[];
  benefits?: string[];
}

// オブジェクト型の例
export interface ObjectExample {
  id: string;
  type: 'object' | 'optional' | 'alias';
  name: string;
  description: string;
  syntax: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  optionalProperties?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// インタフェース型の例
export interface InterfaceExample {
  id: string;
  type: 'interface' | 'extends' | 'implements' | 'optional' | 'difference';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// クラス型の例
export interface ClassExample {
  id: string;
  type: 'class' | 'extends' | 'implements' | 'access' | 'summary';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// Enum型の例
export interface EnumExample {
  id: string;
  type: 'enum' | 'string' | 'safety' | 'union' | 'summary';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// Generic型の例
export interface GenericExample {
  id: string;
  type: 'generic' | 'safety' | 'react' | 'summary';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// Union/Intersection型の例
export interface UnionIntersectionExample {
  id: string;
  type: 'union' | 'intersection' | 'alias' | 'summary';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// Literal型の例
export interface LiteralExample {
  id: string;
  type: 'string' | 'number' | 'summary';
  name: string;
  description: string;
  example: string;
  correctUsage: string;
  incorrectUsage: string;
  explanation: string;
  tips?: string[];
  keyPoints?: string[];
  benefits?: string[];
}

// 学習セクション
export interface LearningSection {
  id: string;
  title: string;
  description: string;
  examples: PrimitiveExample[] | ArrayExample[] | ObjectExample[] | AnyExample[] | FunctionExample[] | InferenceExample[] | AssertionExample[] | AliasExample[] | VariableExample[] | InterfaceExample[] | ClassExample[] | EnumExample[] | GenericExample[] | UnionIntersectionExample[] | LiteralExample[];
  keyPoints?: string[];
  benefits?: string[];
}

// 練習問題
export interface PracticeQuestion {
  id: string;
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'tuple' | 'union' | 'object' | 'optional' | 'alias' | 'any' | 'function' | 'default' | 'callback' | 'arrow' | 'inference' | 'let' | 'const' | 'var' | 'annotation' | 'scope' | 'interface' | 'extends' | 'implements' | 'optional' | 'difference' | 'class' | 'extends' | 'implements' | 'access' | 'summary' | 'enum' | 'string' | 'safety' | 'union' | 'summary' | 'generic' | 'react' | 'summary' | 'union' | 'intersection' | 'alias' | 'summary' | 'string' | 'number' | 'summary';
}

// 学習進捗
export interface LearningProgress {
  completedSections: string[];
  practiceScore: number;
  lastStudied: Date;
}

export type NeverExample = {
  title: string;
  description: string;
  code: string;
  points?: string[];
}; 