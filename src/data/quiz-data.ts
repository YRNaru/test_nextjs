import { QuizCategory } from '@/components/Quiz';

export const quizCategories: QuizCategory[] = [
  {
    id: 'primitives',
    title: 'プリミティブ型',
    description: 'TypeScriptの基本的な型（string、number、boolean）について学びます。',
    questions: [
      {
        id: 'q1',
        category: 'プリミティブ型',
        question: '以下のコードで正しい型注釈はどれですか？',
        code: 'let myNumber = 200;',
        options: [
          'let myNumber: string = 200;',
          'let myNumber: number = 200;',
          'let myNumber: boolean = 200;',
          'let myNumber: any = 200;'
        ],
        correctAnswer: 1,
        explanation: '200は数値なので、number型が正解です。',
        type: 'number'
      },
      {
        id: 'q2',
        category: 'プリミティブ型',
        question: '以下のコードでコンパイルエラーになるのはどれですか？',
        code: 'let color: string = "青";',
        options: [
          'color = "赤";',
          'color = 200;',
          'color = "緑";',
          'color = "blue";'
        ],
        correctAnswer: 1,
        explanation: 'string型の変数に数値を代入するとコンパイルエラーになります。',
        type: 'string'
      },
      {
        id: 'q3',
        category: 'プリミティブ型',
        question: 'boolean型の変数に代入できる値はどれですか？',
        code: 'let isActive: boolean;',
        options: [
          'isActive = "true";',
          'isActive = 1;',
          'isActive = true;',
          'isActive = "yes";'
        ],
        correctAnswer: 2,
        explanation: 'boolean型にはtrueまたはfalseのみ代入可能です。',
        type: 'boolean'
      }
    ]
  },
  {
    id: 'arrays',
    title: '配列型',
    description: 'TypeScriptの配列型（string[]、Array<T>、Union型、タプル型）について学びます。',
    questions: [
      {
        id: 'q4',
        category: '配列型',
        question: '以下の配列の型定義で正しいのはどれですか？',
        code: 'const fruits = ["apple", "banana", "orange"];',
        options: [
          'const fruits: string[] = ["apple", "banana", "orange"];',
          'const fruits: Array<number> = ["apple", "banana", "orange"];',
          'const fruits: (string | number)[] = ["apple", "banana", "orange"];',
          'const fruits: [string, string, string] = ["apple", "banana", "orange"];'
        ],
        correctAnswer: 0,
        explanation: '文字列の配列なので、string[]が正解です。',
        type: 'array'
      },
      {
        id: 'q5',
        category: '配列型',
        question: '以下のコードでコンパイルエラーになるのはどれですか？',
        code: 'const numbers: number[] = [1, 2, 3];',
        options: [
          'numbers.push(4);',
          'numbers.push("5");',
          'numbers.push(6);',
          'numbers.push(7);'
        ],
        correctAnswer: 1,
        explanation: 'number型の配列に文字列を追加するとコンパイルエラーになります。',
        type: 'array'
      },
      {
        id: 'q6',
        category: '配列型',
        question: 'Union型の配列で正しい定義はどれですか？',
        code: '文字列と数値の両方を格納できる配列',
        options: [
          'const mixed: string[] = ["a", 1];',
          'const mixed: (string | number)[] = ["a", 1];',
          'const mixed: [string, number] = ["a", 1];',
          'const mixed: Array<string> = ["a", 1];'
        ],
        correctAnswer: 1,
        explanation: '(string | number)[]で文字列または数値の配列を定義できます。',
        type: 'union'
      },
      {
        id: 'q7',
        category: '配列型',
        question: 'タプル型の配列で正しい定義はどれですか？',
        code: '1番目が文字列、2番目が数値の固定長配列',
        options: [
          'const tuple: string[] = ["name", 25];',
          'const tuple: (string | number)[] = ["name", 25];',
          'const tuple: [string, number] = ["name", 25];',
          'const tuple: Array<string> = ["name", 25];'
        ],
        correctAnswer: 2,
        explanation: '[string, number]で1番目が文字列、2番目が数値のタプル型を定義できます。',
        type: 'tuple'
      }
    ]
  },
  {
    id: 'objects',
    title: 'オブジェクト型',
    description: 'TypeScriptのオブジェクト型、オプショナルプロパティ、型エイリアスについて学びます。',
    questions: [
      {
        id: 'q8',
        category: 'オブジェクト型',
        question: '以下のオブジェクトの型定義で正しいのはどれですか？',
        code: 'const user = { name: "Takuya", age: 36 };',
        options: [
          'const user: { name: string; age: number } = { name: "Takuya", age: 36 };',
          'const user: { name: string; age: string } = { name: "Takuya", age: 36 };',
          'const user: { name: number; age: number } = { name: "Takuya", age: 36 };',
          'const user: { name: string; age: boolean } = { name: "Takuya", age: 36 };'
        ],
        correctAnswer: 0,
        explanation: 'nameは文字列、ageは数値なので、{ name: string; age: number }が正解です。',
        type: 'object'
      },
      {
        id: 'q9',
        category: 'オブジェクト型',
        question: 'オプショナルプロパティの正しい書き方はどれですか？',
        code: 'lastNameプロパティを省略可能にする',
        options: [
          'const person: { firstName: string; lastName: string }',
          'const person: { firstName: string; lastName?: string }',
          'const person: { firstName: string; lastName: string? }',
          'const person: { firstName: string; lastName: optional string }'
        ],
        correctAnswer: 1,
        explanation: 'プロパティ名の後ろに?をつけることでオプショナルプロパティになります。',
        type: 'optional'
      },
      {
        id: 'q10',
        category: 'オブジェクト型',
        question: '型エイリアスの正しい書き方はどれですか？',
        code: 'User型を定義する',
        options: [
          'interface User = { name: string; age: number }',
          'type User = { name: string; age: number }',
          'class User = { name: string; age: number }',
          'const User = { name: string; age: number }'
        ],
        correctAnswer: 1,
        explanation: 'typeキーワードを使って型エイリアスを定義します。',
        type: 'alias'
      }
    ]
  }
];