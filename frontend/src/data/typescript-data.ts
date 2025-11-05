import { LearningSection, PracticeQuestion, AnyExample, InferenceExample, VariableExample } from '@/types/typescript';

// TypeScriptプリミティブ型の学習データ
export const primitiveTypesData: LearningSection = {
  id: 'primitives',
  title: 'プリミティブ型',
  description: 'TypeScriptでは、JavaScriptで一般的に使用されるプリミティブ型に対応した型が用意されています。',
  keyPoints: [
    'string（文字列）',
    'number（数値）', 
    'boolean（真偽値）',
    'any（型チェック無効）',
    '型がつけられた変数には、異なる型の値を代入するとコンパイルエラーになります',
    'TypeScriptは静的型付けのため、変数の型に一致しない代入や操作は、コンパイル時に検出されます'
  ],
  benefits: ['型安全性の向上', 'バグの早期発見', '可読性・保守性の向上'],
  examples: [
    {
      id: 'string-example',
      type: 'string',
      name: 'string（文字列）',
      description: '文字列を表す型',
      example: "let color: string = '青';",
      correctValue: '青',
      incorrectValue: 200,
      explanation: '文字列型には文字列のみ代入可能です',
      benefits: ['文字列のみ許容し、型安全性を担保', '誤った型の代入を防止']
    },
    {
      id: 'number-example',
      type: 'number',
      name: 'number（数値）',
      description: '数値を表す型',
      example: 'let age: number = 36;',
      correctValue: 36,
      incorrectValue: '36',
      explanation: '数値型には数値のみ代入可能です',
      benefits: ['数値のみ許容し、型安全性を担保', '誤った型の代入を防止']
    },
    {
      id: 'boolean-example',
      type: 'boolean',
      name: 'boolean（真偽値）',
      description: '真偽値を表す型',
      example: 'let isDone: boolean = false;',
      correctValue: false,
      incorrectValue: 'false',
      explanation: '真偽値型にはtrue/falseのみ代入可能です',
      benefits: ['真偽値のみ許容し、型安全性を担保', '誤った型の代入を防止']
    },
    {
      id: 'any-example',
      type: 'any',
      name: 'any（型チェック無効）',
      description: 'どんな型の値でも代入できる型',
      example: 'let user: any = { firstName: "Takuya" };',
      correctValue: 'any型は何でも代入可能',
      incorrectValue: '型チェックが効かない',
      explanation: 'any型は型チェックを一切行わないため、TypeScriptの恩恵を受けられません',
      benefits: ['柔軟な型代入が可能', '型安全性は失われるため注意']
    }
  ]
};

// TypeScript any型の学習データ
export const anyTypesData: LearningSection = {
  id: 'any',
  title: 'any型',
  description: 'any型はTypeScriptの型チェックを無効化する特別な型です。JavaScriptからTypeScriptへの移行時以外は、原則として使用を避けるべきです。',
  keyPoints: [
    'any型はどんな型の値でも代入可能',
    '型チェックを一切行わない',
    'TypeScriptの恩恵（安全性・保守性）が失われる',
    'JavaScriptと同じ動作に戻ってしまう',
    '移行時以外は原則使用を避ける',
    'unknown型の使用を検討すべき'
  ],
  benefits: ['柔軟な型代入が可能', '型安全性は失われるため注意', '移行時の一時的な利用に便利'],
  examples: [
    {
      id: 'any-basic',
      type: 'any',
      name: '基本構文',
      description: 'any型の基本的な使い方',
      example: 'let user: any = { firstName: "Takuya" };\nuser.hello();     // OK（存在しないメソッドでもエラーにならない）\nuser();           // OK（関数でなくても呼び出せてしまう）\nuser.age = 100;   // OK（型の定義がなくても自由にプロパティ追加）\nuser = "hello";   // OK（型を変えて再代入してもエラーなし）',
      correctUsage: 'let user: any = { firstName: "Takuya" };',
      incorrectUsage: '// any型の乱用は危険\nlet everything: any = "hello";\neverything = 123;\neverything = true;\neverything.nonExistentMethod();',
      explanation: 'any型を使った瞬間、その値はなんでもできるオブジェクトになります。これはまさに「JavaScriptと同じ動作」に戻ってしまうということです。',
      keyPoints: ['型チェックが無効化される', 'なんでも代入・呼び出し可能', '安全性が著しく下がる'],
      warnings: ['静的型付けの利点が失われる', 'バグの原因になりやすい', '保守性が低下する'],
      benefits: ['型チェックを無効化できる', '柔軟な型代入が可能', 'バグの原因になりやすい']
    },
    {
      id: 'any-vs-unknown',
      type: 'any',
      name: 'any vs unknown',
      description: 'any型とunknown型の違い',
      example: '// any型\nlet anyValue: any = "hello";\nanyValue.toFixed(2);  // OK（型チェックなし）\n\n// unknown型\nlet unknownValue: unknown = "hello";\nunknownValue.toFixed(2);  // ❌ エラー（型チェック必要）\nif (typeof unknownValue === "number") {\n  unknownValue.toFixed(2);  // OK（型ガード後）\n}',
      correctUsage: '// unknown型を使用\nlet unknownValue: unknown = "hello";\nif (typeof unknownValue === "number") {\n  unknownValue.toFixed(2);\n}',
      incorrectUsage: '// any型の乱用\nlet anyValue: any = "hello";\nanyValue.toFixed(2);  // 実行時エラーの可能性',
      explanation: 'unknown型はany型と似ていますが、使う前に型チェックを要求します。any型は「なんでも通す」ので安全性が著しく下がります。',
      keyPoints: ['unknown型は型チェックを要求', 'any型は型チェックを無効化', '極力unknown型を検討すべき'],
      warnings: ['any型は安全性が著しく下がる', '実行時エラーの原因になりやすい'],
      benefits: ['unknown型より柔軟だが安全性は低い', '型チェックを省略できる']
    },
    {
      id: 'any-usage-cases',
      type: 'any',
      name: '使用場面',
      description: 'any型を使うべき場面（限定的）',
      example: '// 1. JavaScriptからTypeScriptへの移行途中\nlet legacyData: any = getLegacyData();\n\n// 2. 型情報が不明で、後から型を付ける仮の段階\nlet temporaryValue: any = getExternalData();\n\n// 3. 一時的に型エラーを回避したい場合（推奨されない）\nlet workaround: any = problematicFunction();',
      correctUsage: '// 移行時のみ使用\nlet legacyData: any = getLegacyData();\n// TODO: 後で適切な型を定義する',
      incorrectUsage: '// 日常的な使用は避ける\nlet userName: any = "Takuya";\nlet userAge: any = 36;',
      explanation: 'any型は「逃げ道」として使える型ですが、TypeScriptの恩恵を一切受けられなくなります。基本方針としては使用しないことが望ましいです。',
      keyPoints: ['移行時のみ使用', '一時的な対応のみ', '基本方針として使用しない'],
      warnings: ['日常的な使用は避ける', '適切な型定義を優先する', 'unknown型の使用を検討する'],
      benefits: ['移行時の一時的な型回避に便利', '型安全性は失われる']
    }
  ] as AnyExample[]
};

// TypeScript配列型の学習データ
export const arrayTypesData: LearningSection = {
  id: 'arrays',
  title: '配列型',
  description: 'TypeScriptでは、配列に含まれる要素の型を明示的に指定することができます。これにより、配列の要素に異なる型の値が入らないように静的にチェックできます。',
  keyPoints: [
    'string[] - 文字列だけの配列',
    'Array<T> - ジェネリック構文での配列型',
    'Union型 - 複数の型を許容する (string | number)[]',
    'タプル型 - 順番と型を厳密に固定 [string, number]',
    '配列の型定義をしっかり行うことで、バグを未然に防ぐことができます'
  ],
  benefits: ['配列要素の型安全性', 'バグの未然防止', '可読性・保守性の向上'],
  examples: [
    {
      id: 'basic-array',
      type: 'array',
      name: '基本構文',
      description: '配列の要素の型を明示的に指定',
      syntax: 'const array: string[] = []',
      example: "const array: string[] = [];\narray.push('Takuya');  // OK\narray.push(1);         // ❌ エラー",
      correctUsage: "array.push('Takuya')",
      incorrectUsage: 'array.push(1)',
      explanation: 'string型の配列には文字列のみ追加可能です',
      keyPoints: ['型違いの値を入れるとコンパイルエラー', '静的型付けの強みが発揮される'],
      benefits: ['配列要素の型安全性', '誤った型の追加を防止']
    },
    {
      id: 'generic-array',
      type: 'array',
      name: 'ジェネリック型構文',
      description: 'Array<T>という書き方も可能',
      syntax: 'const names: Array<string> = []',
      example: "const names: Array<string> = ['Alice', 'Bob']",
      correctUsage: "const names: Array<string> = ['Alice', 'Bob']",
      incorrectUsage: "const names: Array<string> = ['Alice', 123]",
      explanation: 'string[]とArray<string>は意味は同じですが、ジェネリクスに慣れている人には後者が読みやすい',
      keyPoints: ['string[]とArray<string>は同じ意味', 'ジェネリクスに慣れている人向け'],
      benefits: ['ジェネリック構文で柔軟な型指定', '型安全な配列操作']
    },
    {
      id: 'union-array',
      type: 'union',
      name: 'Union型',
      description: '複数の型を扱いたいとき',
      syntax: 'const mixedArray: (string | number)[] = []',
      example: "const mixedArrayU: (string | number)[] = ['foo', 1]  // OK",
      correctUsage: "const mixedArrayU: (string | number)[] = ['foo', 1]",
      incorrectUsage: "const mixedArrayU: (string | number)[] = ['foo', true]",
      explanation: '(A | B)[]という形で、要素ごとに複数の型を認める配列が定義できます',
      keyPoints: ['stringかnumberのどちらかが許容される', '要素ごとに複数の型を認める'],
      benefits: ['複数型の配列を安全に扱える', '型違いの要素追加を防止']
    },
    {
      id: 'tuple-array',
      type: 'tuple',
      name: 'タプル型',
      description: '要素の順序と型を固定したいとき',
      syntax: 'const tuple: [string, number] = []',
      example: "const mixedArrayT: [string, number] = ['foo', 1]  // OK",
      correctUsage: "const mixedArrayT: [string, number] = ['foo', 1]",
      incorrectUsage: "const mixedArrayT: [string, number] = [1, 'foo']",
      explanation: '配列の各要素に順序通りの型を指定したいときに使います。「1番目はstring」「2番目はnumber」というような明確な型定義が可能です',
      keyPoints: ['順番と型を厳密に固定', '明確な型定義が可能'],
      benefits: ['要素ごとに型・順序を厳密に管理', '誤った順序や型の代入を防止']
    }
  ]
};

// TypeScriptオブジェクト型の学習データ
export const objectTypesData: LearningSection = {
  id: 'objects',
  title: 'オブジェクト型',
  description: 'TypeScriptでは、オブジェクトの構造（プロパティ名と型）を明確に定義することで、意図しないプロパティの追加や誤った型の代入を防げます。',
  keyPoints: [
    'オブジェクト型 - { key: type; ... } の形式で定義',
    'オプショナル - key?: type と書くことで、そのプロパティは省略可能になる',
    '型チェック - 指定したキーと型以外を使うとコンパイルエラー',
    'エイリアス活用 - 複雑な型は type キーワードを使って再利用可能な名前付き型にできる',
    'オブジェクトの構造を明確に定義することで、バグを未然に防ぐことができます'
  ],
  benefits: ['オブジェクト構造の明確化', '意図しないプロパティ追加や型ミスの防止', '保守性の向上'],
  examples: [
    {
      id: 'basic-object',
      type: 'object',
      name: '基本構文',
      description: 'オブジェクトの構造を明確に定義',
      syntax: 'const user: { name: string; age: number } = {}',
      example: "const user: { name: string; age: number } = {\n  name: 'Takuya',\n  age: 36\n}",
      correctUsage: "const user: { name: string; age: number } = { name: 'Takuya', age: 36 }",
      incorrectUsage: "const user: { name: string; age: number } = { name: 'Takuya', age: '36' }",
      explanation: 'userは「nameは文字列、ageは数値」という型のオブジェクトとして定義されています',
      keyPoints: ['プロパティ名と型を明確に定義', '意図しないプロパティの追加を防ぐ'],
      benefits: ['プロパティ名・型の明確化', '誤った型や余計なプロパティの排除']
    },
    {
      id: 'optional-property',
      type: 'optional',
      name: 'オプショナルプロパティ',
      description: 'プロパティ名の後ろに?をつけると省略可能',
      syntax: 'let person: { firstName: string; lastName?: string }',
      example: "function printName(obj: { firstName: string; lastName?: string }) {\n  console.log(obj.firstName)\n  if (obj.lastName) {\n    console.log(obj.lastName)\n  }\n}",
      correctUsage: "printName({ firstName: 'Takuya' }) // OK\nprintName({ firstName: 'Takuya', lastName: 'Tejima' }) // OK",
      incorrectUsage: "printName({ firstName: 'Takuya', age: 36 }) // ❌ エラー",
      explanation: 'オプショナルにしておけば、必要に応じて存在しない場合の処理も安全に記述可能になります',
      keyPoints: ['?をつけると省略可能', '存在しない場合の処理も安全に記述可能'],
      optionalProperties: ['lastName'],
      benefits: ['柔軟な型設計', '省略可能なプロパティの安全な利用']
    },
    {
      id: 'type-alias',
      type: 'alias',
      name: '型エイリアス',
      description: '複雑な型を再利用可能な名前付き型に',
      syntax: 'type User = { name: string; age: number }',
      example: "type User = {\n  name: string;\n  age: number;\n}\nconst user: User = { name: 'Takuya', age: 36 }",
      correctUsage: "type User = { name: string; age: number }\nconst user: User = { name: 'Takuya', age: 36 }",
      incorrectUsage: "type User = { name: string; age: number }\nconst user: User = { name: 'Takuya', age: '36' }",
      explanation: 'オブジェクト型は記述が長くなりがちなので、型エイリアスと組み合わせて使われることが多いです',
      keyPoints: ['記述が長くなりがちなオブジェクト型', '再利用可能な名前付き型にできる'],
      benefits: ['型定義の再利用性向上', '複雑な型の簡潔化']
    }
  ]
};

// TypeScript関数型の学習データ
export const functionTypesData: LearningSection = {
  id: 'functions',
  title: '関数型',
  description: 'TypeScriptでは、関数の引数や戻り値に対して型を指定することで、予期しない呼び出しミスやバグを防ぐことができます。',
  keyPoints: [
    '引数の型定義 - name: string のように明示的に型を付ける',
    '戻り値の型定義 - (): string などの形で戻り値に型を付ける',
    'オプショナル引数 - greeting?: string のように ? を使って省略可能にする',
    'デフォルト値 - greeting: string = "Hello" のように初期値を設定',
    '関数の型指定 - (name: string) => string のように関数自体の型を指定可能',
    '型安全性により、関数の呼び出しミスやバグを未然に防げます'
  ],
  benefits: ['関数呼び出しの型安全性', 'バグの未然防止', '引数・戻り値の明確化'],
  examples: [
    {
      id: 'basic-function',
      type: 'function',
      name: '基本構文',
      description: '関数の引数と戻り値に型を指定',
      syntax: 'function 関数名(引数1: 型1, 引数2: 型2): 戻り値の型 { }',
      example: 'function sayHello(name: string): string {\n  return `Hello ${name}`;\n}\n\nsayHello("Takuya");  // OK\nsayHello(100);       // ❌ コンパイルエラー（型不一致）',
      correctUsage: 'function sayHello(name: string): string {\n  return `Hello ${name}`;\n}\nsayHello("Takuya");',
      incorrectUsage: 'function sayHello(name: string): string {\n  return `Hello ${name}`;\n}\nsayHello(100);  // ❌ エラー',
      explanation: '引数と戻り値に型を指定することで、型安全性が保たれます。間違った型の値を渡すとコンパイルエラーになります。',
      keyPoints: ['引数の型チェック', '戻り値の型チェック', 'コンパイル時のエラー検出'],
      parameters: ['name: string', '戻り値: string'],
      benefits: ['引数・戻り値の型安全性', '誤った呼び出しの防止']
    },
    {
      id: 'optional-parameter',
      type: 'optional',
      name: 'オプショナル引数',
      description: '引数の末尾に ? をつけると省略可能',
      syntax: 'function 関数名(引数1: 型1, 引数2?: 型2): 戻り値の型 { }',
      example: 'function sayHello(name: string, greeting?: string): string {\n  return `${greeting ?? "Hello"} ${name}`;\n}\n\nsayHello("Takuya");             // "Hello Takuya"\nsayHello("Takuya", "Hey");      // "Hey Takuya"',
      correctUsage: 'function sayHello(name: string, greeting?: string): string {\n  return `${greeting ?? "Hello"} ${name}`;\n}\nsayHello("Takuya");\nsayHello("Takuya", "Hey");',
      incorrectUsage: 'function sayHello(name: string, greeting?: string): string {\n  return `${greeting} ${name}`;\n}\nsayHello("Takuya");  // greetingがundefinedの可能性',
      explanation: 'オプショナル引数は省略可能ですが、関数内で使用する際はundefinedの可能性を考慮する必要があります。Null合体演算子（??）などを使用して安全に処理しましょう。',
      keyPoints: ['引数の省略が可能', 'undefinedの可能性を考慮', 'Null合体演算子の活用'],
      parameters: ['name: string', 'greeting?: string', '戻り値: string'],
      benefits: ['柔軟な関数呼び出し', '省略時の安全な処理']
    },
    {
      id: 'default-parameter',
      type: 'default',
      name: 'デフォルト引数',
      description: '引数にデフォルト値を設定',
      syntax: 'function 関数名(引数1: 型1, 引数2: 型2 = デフォルト値): 戻り値の型 { }',
      example: 'function sayHello(name: string, greeting: string = "Hello"): string {\n  return `${greeting} ${name}`;\n}\n\nsayHello("Takuya");             // "Hello Takuya"\nsayHello("Takuya", "Hey");      // "Hey Takuya"',
      correctUsage: 'function sayHello(name: string, greeting: string = "Hello"): string {\n  return `${greeting} ${name}`;\n}\nsayHello("Takuya");\nsayHello("Takuya", "Hey");',
      incorrectUsage: 'function sayHello(name: string, greeting: string = "Hello"): string {\n  return `${greeting} ${name}`;\n}\nsayHello();  // ❌ 必須引数が不足',
      explanation: 'デフォルト引数は、引数が省略された場合に自動的にデフォルト値が使用されます。オプショナル引数と異なり、undefinedの可能性はありません。',
      keyPoints: ['自動的にデフォルト値が使用', 'undefinedの可能性なし', '必須引数との組み合わせ'],
      parameters: ['name: string', 'greeting: string = "Hello"', '戻り値: string'],
      benefits: ['省略時も安全なデフォルト値', '呼び出しミスの防止']
    },
    {
      id: 'callback-function',
      type: 'callback',
      name: 'コールバック関数',
      description: '関数を引数に取る関数',
      syntax: 'function 関数名(引数: 型, callback: (引数: 型) => 戻り値の型) { }',
      example: 'function printName(firstName: string, formatter: (name: string) => string) {\n  console.log(formatter(firstName));\n}\n\nfunction formatName(name: string): string {\n  return `${name} san`;\n}\n\nprintName("Takuya", formatName);  // "Takuya san"',
      correctUsage: 'function printName(firstName: string, formatter: (name: string) => string) {\n  console.log(formatter(firstName));\n}\n\nfunction formatName(name: string): string {\n  return `${name} san`;\n}\n\nprintName("Takuya", formatName);',
      incorrectUsage: 'function printName(firstName: string, formatter: any) {\n  console.log(formatter(firstName));\n}\n\nprintName("Takuya", "not a function");  // ❌ 実行時エラー',
      explanation: '関数の型を指定することで、正しい関数が渡されることを保証できます。any型を使うと型安全性が失われ、実行時エラーの原因になります。',
      keyPoints: ['関数の型指定', '型安全性の保証', '実行時エラーの防止'],
      parameters: ['firstName: string', 'formatter: (name: string) => string'],
      benefits: ['コールバックの型安全性', '実行時エラーの防止']
    },
    {
      id: 'arrow-function',
      type: 'arrow',
      name: 'アロー関数',
      description: 'アロー関数での型指定',
      syntax: 'const 関数名 = (引数: 型): 戻り値の型 => 式',
      example: 'const sayHello = (name: string): string => `Hello ${name}`;\n\nconst add = (a: number, b: number): number => a + b;\n\nconst isEven = (num: number): boolean => num % 2 === 0;',
      correctUsage: 'const sayHello = (name: string): string => `Hello ${name}`;\nconst add = (a: number, b: number): number => a + b;',
      incorrectUsage: 'const sayHello = (name: string) => `Hello ${name}`;  // 戻り値の型が推論される\nconst add = (a, b) => a + b;  // 引数の型が不明',
      explanation: 'アロー関数でも通常の関数と同じように型を明示できます。型を省略すると型推論が働きますが、明示的に指定することで意図を明確にできます。',
      keyPoints: ['型の明示指定', '型推論との使い分け', '意図の明確化'],
      parameters: ['name: string', '戻り値: string'],
      benefits: ['アロー関数でも型安全性を担保', '意図の明確化']
    }
  ]
};

// TypeScript型推論の学習データ
export const inferenceTypesData: LearningSection = {
  id: 'inference',
  title: '型推論',
  description: 'TypeScriptには型推論（type inference）という機能があり、変数を初期化するときに代入された値から自動的に型を決定してくれます。',
  keyPoints: [
    '型推論 - 初期化や代入された値から型を自動決定',
    '利点 - 明示的に型を書かなくても、TypeScriptが自動で型安全を担保',
    '注意点 - 推論された型と異なる使い方をするとコンパイルエラーになる',
    '開発効率化 - 型定義を省略できる場面が増え、可読性と保守性を両立できる',
    '型安全性 - 推論された型に基づいてコンパイル時のチェックが行われる'
  ],
  benefits: ['型定義の省略による開発効率化', '型安全性の担保', '可読性・保守性の向上'],
  examples: [
    {
      id: 'basic-inference',
      type: 'inference',
      name: '基本例',
      description: '変数の初期化時の型推論',
      example: 'const age = 10;\nconsole.log(age.length); // エラー: number型にはlengthプロパティがない\n\nconst name = "Takuya";\nconsole.log(name.length); // OK: string型にはlengthプロパティがある',
      correctUsage: 'const age = 10;\nconsole.log(age.toString()); // OK: number型のメソッドを使用',
      incorrectUsage: 'const age = 10;\nconsole.log(age.length); // ❌ エラー: number型にはlengthプロパティがない',
      explanation: 'ageは数値で初期化されているため、number型として推論されます。number型にはlengthプロパティがないため、コンパイルエラーになります。',
      keyPoints: ['初期化時の値から型を推論', '推論された型に基づくチェック', 'コンパイル時のエラー検出'],
      benefits: ['型定義の省略が可能', '開発効率の向上', '型安全性の保証']
    },
    {
      id: 'object-inference',
      type: 'object',
      name: 'オブジェクトの型推論',
      description: 'オブジェクトの各プロパティの型推論',
      example: 'const user = {\n  name: "Takuya",\n  age: 36\n};\nconsole.log(user.age.length); // エラー: number型にはlengthがない\nconsole.log(user.name.length); // OK: string型にはlengthがある',
      correctUsage: 'const user = {\n  name: "Takuya",\n  age: 36\n};\nconsole.log(user.name.length); // OK\nconsole.log(user.age.toString()); // OK',
      incorrectUsage: 'const user = {\n  name: "Takuya",\n  age: 36\n};\nconsole.log(user.age.length); // ❌ エラー\nuser.age = "36"; // ❌ エラー: number型に文字列を代入',
      explanation: 'オブジェクトの各プロパティも初期化時の値から型が推論されます。nameはstring型、ageはnumber型として推論され、それぞれの型に基づいてチェックが行われます。',
      keyPoints: ['プロパティごとの型推論', 'オブジェクト全体の型推論', 'プロパティの型チェック'],
      benefits: ['オブジェクト型定義の省略', 'プロパティアクセスの安全性', '代入時の型チェック']
    },
    {
      id: 'function-inference',
      type: 'function',
      name: '関数の戻り値の型推論',
      description: '関数の戻り値の型推論',
      example: 'function getUser() {\n  return {\n    name: "Takuya",\n    age: 36\n  };\n}\nconst user = getUser();\nconsole.log(user.age.length); // エラー: ageはnumber型',
      correctUsage: 'function getUser() {\n  return {\n    name: "Takuya",\n    age: 36\n  };\n}\nconst user = getUser();\nconsole.log(user.name.length); // OK\nconsole.log(user.age.toString()); // OK',
      incorrectUsage: 'function getUser() {\n  return {\n    name: "Takuya",\n    age: 36\n  };\n}\nconst user = getUser();\nuser.age = "36"; // ❌ エラー: number型に文字列を代入',
      explanation: '関数の戻り値も推論されるため、戻り値に対する型チェックも行われます。getUser関数の戻り値は{ name: string; age: number }型として推論されます。',
      keyPoints: ['戻り値の型推論', '関数呼び出し結果の型チェック', '戻り値の型安全性'],
      benefits: ['戻り値型定義の省略', '関数呼び出しの安全性', '戻り値使用時の型チェック']
    },
    {
      id: 'array-inference',
      type: 'array',
      name: '配列の型推論',
      description: '配列の要素の型推論',
      example: 'const names = ["Takuya", "Yoshiki", "Taketo"];\n\nnames.forEach((name) => {\n  console.log(name.toUppercase()); // エラー: toUpperCase の綴り間違い\n});',
      correctUsage: 'const names = ["Takuya", "Yoshiki", "Taketo"];\n\nnames.forEach((name) => {\n  console.log(name.toUpperCase()); // OK: 正しいメソッド名\n});',
      incorrectUsage: 'const names = ["Takuya", "Yoshiki", "Taketo"];\n\nnames.push(123); // ❌ エラー: string型の配列に数値を追加\nnames.forEach((name) => {\n  console.log(name.toUppercase()); // ❌ エラー: 存在しないメソッド',
      explanation: 'namesは文字列の配列で初期化されているため、string[]型として推論されます。メソッド名の綴り間違いもコンパイル時に検出可能です。',
      keyPoints: ['配列要素の型推論', 'メソッド名のチェック', '配列操作の型安全性'],
      benefits: ['配列型定義の省略', 'メソッド呼び出しの安全性', '配列操作の型チェック']
    },
    {
      id: 'assignment-inference',
      type: 'assignment',
      name: '代入時の型推論によるチェック',
      description: '代入される値の型チェック',
      example: 'window.confirm = () => {\n  console.log("confirm関数");\n};\n// エラー: window.confirm の戻り値は boolean である必要がある\n\nconst numbers: number[] = [1, 2, 3];\nnumbers.push("4"); // エラー: number型の配列に文字列を追加',
      correctUsage: 'window.confirm = () => {\n  console.log("confirm関数");\n  return true; // OK: boolean型を返す\n};\n\nconst numbers: number[] = [1, 2, 3];\nnumbers.push(4); // OK: number型を追加',
      incorrectUsage: 'window.confirm = () => {\n  console.log("confirm関数");\n  return "true"; // ❌ エラー: string型を返している\n};\n\nconst numbers: number[] = [1, 2, 3];\nnumbers.push("4"); // ❌ エラー: 文字列を追加',
      explanation: 'TypeScriptは変数に代入される値の型もチェックします。標準オブジェクト（window.confirmなど）の返り値の型が一致しないとエラーになります。',
      keyPoints: ['代入時の型チェック', '標準オブジェクトの型チェック', '配列操作の型チェック'],
      benefits: ['代入時の安全性', '標準APIの正しい使用', '型の一貫性の保証']
    }
  ] as InferenceExample[]
};

// --- ここにunknownTypePracticeの定義を移動 ---
export const unknownTypePractice = [
  {
    id: 'unknown-q1',
    question: 'unknown型の特徴として正しいものはどれ？',
    code: 'let value: unknown = "test";\nvalue.toUpperCase();',
    options: [
      '型チェックなしでプロパティアクセスできる',
      '型チェックが必要',
      'どんな値も代入できない',
      'any型よりも危険'
    ],
    correctAnswer: 1,
    explanation: 'unknown型は型チェックなしでプロパティアクセスできません。型チェックが必要です。',
    type: 'unknown'
  },
  {
    id: 'unknown-q2',
    question: 'unknown型とany型の違いは？',
    code: 'let x: any = 1;\nx.toFixed(1); // ?\nlet y: unknown = 1;\ny.toFixed(1); // ?',
    options: [
      'どちらも型チェックなしでOK',
      'any型はOK、unknown型はエラー',
      'unknown型はOK、any型はエラー',
      'どちらもエラー'
    ],
    correctAnswer: 1,
    explanation: 'any型は型チェックなしでOKですが、unknown型は型チェックが必要です。',
    type: 'unknown'
  },
  {
    id: 'unknown-q3',
    question: 'unknown型の値を安全に使うには？',
    code: 'let y: unknown = 123;\n// ここで安全にtoFixedを使いたい',
    options: [
      'typeofで型を判定する',
      'そのまま使う',
      'any型にする',
      'エラーになるまで試す'
    ],
    correctAnswer: 0,
    explanation: 'unknown型はtypeofやinstanceofなどで型を判定してから使います。',
    type: 'unknown'
  },
  {
    id: 'unknown-q4',
    question: 'unknown型の主な用途は？',
    code: 'function handleInput(value: unknown) { /* ... */ }',
    options: [
      '型が明確な値だけを受け取る',
      '外部データやユーザー入力など何が来るかわからない場合',
      '型安全性を無視したい場合',
      'never型の代用',
    ],
    correctAnswer: 1,
    explanation: 'unknown型はAPIレスポンスやユーザー入力など、何が来るかわからない場合に使います。',
    type: 'unknown'
  }
];
export const neverTypePractice = [
  {
    question: 'never型が使われる典型的なケースはどれですか？',
    options: [
      '常に例外を投げる関数',
      '配列の要素数を数える関数',
      'オブジェクトのプロパティを列挙する関数'
    ],
    correctAnswer: 0,
    explanation: 'never型は決して値を返さない（例外を投げる、無限ループなど）関数の戻り値型として使われます。',
  },
  {
    question: 'switch文のdefaultでnever型を使うメリットは？',
    options: [
      'コードが短くなる',
      '分岐漏れをコンパイル時に検出できる',
      '実行速度が速くなる'
    ],
    correctAnswer: 1,
    explanation: 'defaultでnever型を使うことで、enumに新しい値が追加された際に分岐漏れを検出できます。',
  },
  {
    question: '次のうち、never型の関数の特徴として正しいものはどれ？',
    options: [
      '必ず値を返す',
      '例外を投げるか無限ループする',
      'どんな値でも返せる'
    ],
    correctAnswer: 1,
    explanation: 'never型の関数は正常に値を返すことがなく、例外を投げるか無限ループします。',
  }
];
export const asyncAwaitPractice = [
  {
    question: 'async functionの戻り値の型は？',
    code: 'async function foo() { return 123; }',
    options: [
      'number',
      'Promise<number>',
      'void',
      'string'
    ],
    correctAnswer: 1,
    explanation: 'async functionは常にPromise型を返します。',
    type: 'any'
  },
  {
    question: 'awaitはどこで使える？',
    code: 'const result = await fetchFromServer("id");',
    options: [
      'どこでも使える',
      'async function内のみ',
      'グローバルスコープのみ',
      'Promiseチェーンのみ'
    ],
    correctAnswer: 1,
    explanation: 'awaitはasync function内、または即時実行async関数内でのみ使えます。',
    type: 'any'
  },
  {
    question: '複数のPromiseを効率よく処理するには？',
    code: 'const [a, b] = await ???',
    options: [
      'Promise.all([p1, p2])',
      'p1; p2;',
      'Promise.race([p1, p2])',
      'p1.then(); p2.then();'
    ],
    correctAnswer: 0,
    explanation: 'Promise.allで複数のPromiseを並列実行できます。',
    type: 'any'
  },
  {
    question: 'async/awaitのエラー処理で推奨されるのは？',
    code: 'async function foo() {\n  // ここでエラー処理\n}',
    options: [
      'try...catchを使う',
      'catchしない',
      'Promise.allで処理する',
      'thenだけ使う'
    ],
    correctAnswer: 0,
    explanation: 'async/awaitのエラーはtry...catchで捕捉するのが推奨されます。',
    type: 'any'
  }
];
export const typeDefinitionPractice = [
  {
    question: '@types/で型定義を追加する正しいコマンドは？',
    code: '',
    options: [
      'npm install --save-dev @types/jquery',
      'npm install jquery-types',
      'npm install --save @types/jquery',
      'npm install types-jquery'
    ],
    correctAnswer: 0,
    explanation: '@types/ライブラリ名 で型定義を追加します。',
    type: 'any'
  },
  {
    question: '型定義が同梱されているライブラリの例は？',
    code: '',
    options: [
      'react',
      '@types/react',
      'jquery',
      '@types/jquery'
    ],
    correctAnswer: 0,
    explanation: 'reactは型定義が同梱されています。',
    type: 'any'
  },
  {
    question: '.d.tsファイルを自作する主な目的は？',
    code: '',
    options: [
      '型安全にJavaScriptを使うため',
      'npmパッケージを公開するため',
      '型定義を削除するため',
      'JavaScriptを高速化するため'
    ],
    correctAnswer: 0,
    explanation: '自作型定義ファイルは型安全にJavaScriptを使うために作成します。',
    type: 'any'
  },
  {
    question: '型定義ファイルを使う主な利点は？',
    code: '',
    options: [
      'コンパイル時の安全性が向上する',
      '実行速度が上がる',
      'コードが短くなる',
      'npm installが不要になる'
    ],
    correctAnswer: 0,
    explanation: '型定義ファイルを使うことでコンパイル時の安全性・保守性が向上します。',
    type: 'any'
  }
];
// セクション別練習問題データ
export const sectionPracticeQuestions = {
  variables: [
    {
      id: 'q35',
      question: 'letによる変数宣言の特徴はどれですか？',
      code: 'let a = 10;',
    options: [
        '関数スコープ',
        'ブロックスコープ',
        '再代入不可',
        '型注釈不可'
    ],
    correctAnswer: 1,
      explanation: 'letはブロックスコープを持ち、再代入可能です。',
      type: 'let'
    },
    {
      id: 'q36',
      question: 'constによる変数宣言の特徴はどれですか？',
      code: 'const num = 100;',
    options: [
        '再代入可能',
        'ブロックスコープ',
        '関数スコープ',
        '型注釈不可'
    ],
    correctAnswer: 1,
      explanation: 'constはブロックスコープで、再代入不可です。',
      type: 'const'
    },
    {
      id: 'q37',
      question: 'varによる変数宣言の特徴はどれですか？',
      code: 'var oldValue = 10;',
    options: [
        'ブロックスコープ',
        '再代入不可',
        '関数スコープ',
        '型注釈不可'
    ],
    correctAnswer: 2,
      explanation: 'varは関数スコープで、再代入可能です。',
      type: 'var'
    },
    {
      id: 'q38',
      question: '型注釈の正しい書き方はどれですか？',
      code: 'employeeNameをstring型で宣言',
    options: [
        'let employeeName: string = "John";',
        'let employeeName = string "John";',
        'let employeeName = "John": string;',
        'let employeeName string = "John";'
    ],
    correctAnswer: 0,
      explanation: '変数名の後ろに: 型名で型注釈を記述します。',
      type: 'annotation'
    },
    {
      id: 'q39',
      question: 'let/constとvarのスコープの違いは？',
      code: 'function calc(isSum: boolean) { ... }',
    options: [
        'let/constは関数スコープ、varはブロックスコープ',
        'let/constはブロックスコープ、varは関数スコープ',
        '両方ともブロックスコープ',
        '両方とも関数スコープ'
    ],
    correctAnswer: 1,
      explanation: 'let/constはブロックスコープ、varは関数スコープです。',
      type: 'scope'
    }
  ] as PracticeQuestion[],
  primitives: [
    {
      id: 'q1',
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
  ] as PracticeQuestion[],
  arrays: [
    {
      id: 'q4',
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
  ] as PracticeQuestion[],
  objects: [
    {
      id: 'q8',
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
  ] as PracticeQuestion[],
  any: [
    {
      id: 'any1',
      question: 'any型の特徴はどれですか？',
      code: '',
      options: [
        'どんな型でも代入できる',
        '型チェックが厳密',
        '数値しか代入できない',
        '文字列しか代入できない'
      ],
      correctAnswer: 0,
      explanation: 'any型はどんな型でも代入でき、型チェックが無効になります。',
      type: 'any'
    }
  ] as PracticeQuestion[],
  functions: [
    {
      id: 'fn1',
      question: '関数の戻り値の型注釈の正しい書き方はどれですか？',
      code: 'function add(a: number, b: number): number { return a + b; }',
      options: [
        'function add(a: number, b: number) { return a + b; }',
        'function add(a: number, b: number): number { return a + b; }',
        'function add(a, b): string { return a + b; }',
        'function add(a: string, b: string): number { return a + b; }'
      ],
      correctAnswer: 1,
      explanation: '戻り値の型は関数名の後ろに: 型名で記述します。',
      type: 'function'
    }
  ] as PracticeQuestion[],
  inference: [
    {
      id: 'inf1',
      question: '型推論の特徴はどれですか？',
      code: 'let x = 10;',
      options: [
        'xはany型になる',
        'xはstring型になる',
        'xはnumber型になる',
        'xはboolean型になる'
      ],
      correctAnswer: 2,
      explanation: '初期値が10なので、xはnumber型として推論されます。',
      type: 'inference'
    }
  ] as PracticeQuestion[],
  assertion: [
    {
      id: 'qA1',
      question: '型アサーションの正しい使い方はどれですか？',
      code: 'let value: any = "hello";',
      options: [
        'let str: string = value as string;',
        'let str: string = <string>value;',
        'let str: string = value;',
        'let str: number = value as string;'
      ],
      correctAnswer: 0,
      explanation: 'as構文で型アサーションできます。<string>valueもJSX以外では可。',
      type: 'any'
    },
    {
      id: 'qA2',
      question: '型アサーションの注意点はどれですか？',
      code: '',
      options: [
        '型アサーションは型安全性を保証する',
        '型アサーションは実行時エラーの原因になることがある',
        '型アサーションは型推論を強化する',
        '型アサーションは型定義を省略できる'
      ],
      correctAnswer: 1,
      explanation: '誤った型アサーションは実行時エラーの原因になります。',
      type: 'any'
    }
  ] as PracticeQuestion[],
  class: [
    {
      id: 'class1',
      question: 'TypeScriptのクラスで正しい定義はどれですか？',
      code: '',
      options: [
        'class User { name: string; }',
        'let User = { name: string }',
        'function User() { name: string }',
        'type User = { name: string }'
      ],
      correctAnswer: 0,
      explanation: 'classキーワードでクラスを定義します。',
      type: 'class'
    }
  ] as PracticeQuestion[],
  alias: [
    {
      id: 'qAL1',
      question: '型エイリアスの正しい定義はどれですか？',
      code: 'User型をtypeで定義する',
      options: [
        'type User = { name: string; age: number }',
        'interface User = { name: string; age: number }',
        'const User = { name: string; age: number }',
        'let User: { name: string; age: number }'
      ],
      correctAnswer: 0,
      explanation: 'typeキーワードで型エイリアスを定義します。',
      type: 'alias'
    },
    {
      id: 'qAL2',
      question: '型エイリアスの利点はどれですか？',
      code: 'type User = { name: string; age: number } など',
      options: [
        '型定義を再利用できる',
        '型チェックを無効化できる',
        '型推論を強制できる',
        '型アサーションを省略できる'
      ],
      correctAnswer: 0,
      explanation: '型エイリアスは型定義の再利用性を高めます。',
      type: 'alias'
    }
  ],
  interface: [
    {
      id: 'qi1',
      question: 'インターフェースの正しい定義はどれですか？',
      code: 'User型をinterfaceで定義する',
      options: [
        'interface User { name: string; age: number }',
        'type User = interface { name: string; age: number }',
        'class User implements { name: string; age: number }',
        'let User: interface = { name: string; age: number }'
      ],
      correctAnswer: 0,
      explanation: 'interfaceキーワードでオブジェクト型の構造を定義します。',
      type: 'interface'
    },
    {
      id: 'qi2',
      question: 'オプショナルプロパティの正しい書き方はどれですか？',
      code: 'interface Point { x: number; y?: number } など',
      options: [
        'interface Point { x: number; y: number? }',
        'interface Point { x: number; y?: number }',
        'interface Point { x: number; optional y: number }',
        'interface Point { x: number; y: optional number }'
      ],
      correctAnswer: 1,
      explanation: '?をプロパティ名の後ろにつけると省略可能になります。',
      type: 'optional'
    },
    {
      id: 'qi3',
      question: 'クラスでインターフェースを実装する正しい方法はどれですか？',
      code: 'class User implements IUser { ... }',
      options: [
        'class User extends IUser { ... }',
        'class User implements IUser { ... }',
        'class User interface IUser { ... }',
        'class User: IUser { ... }'
      ],
      correctAnswer: 1,
      explanation: 'implementsでクラスがインターフェースの契約を満たします。',
      type: 'implements'
    },
    {
      id: 'qi4',
      question: 'インターフェースを継承（拡張）する正しい方法はどれですか？',
      code: 'interface A extends B {}',
      options: [
        'interface A extends B {}',
        'interface A implements B {}',
        'type A extends B {}',
        'class A extends B {}'
      ],
      correctAnswer: 0,
      explanation: 'interface同士の継承はextendsを使います。',
      type: 'extends'
    }
  ] as PracticeQuestion[],
  enum: [
    {
      id: 'qe1',
      question: '次のうち、TypeScriptのEnum型の正しい定義はどれですか？',
      code: '',
      options: [
        'enum Color { Red, Green, Blue }',
        'const Color = { Red: 0, Green: 1, Blue: 2 }',
        'type Color = "Red" | "Green" | "Blue"',
        'let Color = [Red, Green, Blue]'
      ],
      correctAnswer: 0,
      explanation: 'enumキーワードで定義するのがTypeScriptのEnum型です。',
      type: 'enum'
    },
    {
      id: 'qe2',
      question: '次のコードの出力結果は？',
      code: 'enum Direction { Up, Down, Left, Right }\nconsole.log(Direction.Left);',
      options: [
        '0',
        '1',
        '2',
        '"Left"'
      ],
      correctAnswer: 2,
      explanation: 'Enumはデフォルトで0から始まり、Leftは2番目なので2が出力されます。',
      type: 'enum'
    },
    {
      id: 'qe3',
      question: '文字列Enumの定義として正しいものはどれですか？',
      code: '',
      options: [
        'enum Status { Success = "SUCCESS", Fail = "FAIL" }',
        'enum Status { Success, Fail }',
        'type Status = "SUCCESS" | "FAIL"',
        'const Status = { Success: "SUCCESS", Fail: "FAIL" }'
      ],
      correctAnswer: 0,
      explanation: '値に文字列を割り当てることで文字列Enumになります。',
      type: 'string'
    }
  ] as PracticeQuestion[],
  generic: [
    {
      id: 'qg1',
      question: '次のうち、ジェネリック型クラスの正しい定義はどれですか？',
      code: '',
      options: [
        'class Box<T> { value: T }',
        'class Box { value: T }',
        'class Box<T> { value: string }',
        'class Box { value: any }'
      ],
      correctAnswer: 0,
      explanation: '型パラメータ<T>をクラス名の後ろに付けて定義します。',
      type: 'generic'
    },
    {
      id: 'qg2',
      question: '次のコードのpushメソッドでエラーになるのはどれですか？',
      code: 'class Queue<T> {\n  private array: T[] = [];\n  push(item: T) { this.array.push(item); }\n}\nconst queue = new Queue<number>();',
      options: [
        'queue.push(123);',
        'queue.push(0);',
        'queue.push("abc");',
        'queue.push(999);'
      ],
      correctAnswer: 2,
      explanation: 'queueはnumber型のキューなので、string型はエラーになります。',
      type: 'generic'
    },
    {
      id: 'qg3',
      question: 'Reactのコンポーネントでpropsの型を柔軟に指定したい場合、どのように書くべきですか？',
      code: '',
      options: [
        'function MyComponent<T>({ value }: { value: T }) { return <div>{value}</div>; }',
        'function MyComponent({ value }: { value: any }) { return <div>{value}</div>; }',
        'function MyComponent({ value }: { value: string }) { return <div>{value}</div>; }',
        'function MyComponent({ value }: { value: number }) { return <div>{value}</div>; }'
      ],
      correctAnswer: 0,
      explanation: 'Tを型パラメータとして使うことで、propsの型を柔軟に指定できます。',
      type: 'react'
    }
  ] as PracticeQuestion[],
  unionintersection: [
    {
      id: 'ui1',
      question: '次のうち、Union型の正しい定義はどれですか？',
      code: '',
      options: [
        'type Id = number | string;',
        'type Id = number & string;',
        'type Id = number || string;',
        'type Id = number && string;'
      ],
      correctAnswer: 0,
      explanation: '|（パイプ）で「いずれかの型」を表します。',
      type: 'union'
    },
    {
      id: 'ui2',
      question: 'Intersection型（積集合型）の正しい定義はどれですか？',
      code: '',
      options: [
        'type User = Name | Age;',
        'type User = Name & Age;',
        'type User = Name || Age;',
        'type User = Name && Age;'
      ],
      correctAnswer: 1,
      explanation: '&（アンパサンド）で「すべての型」を合成します。',
      type: 'intersection'
    },
    {
      id: 'ui3',
      question: '次のコードでエラーになるのはどれですか？',
      code: 'type Id = number | string;\nlet id: Id;',
      options: [
        'id = 123;',
        'id = "abc";',
        'id = true;',
        'id = "456";'
      ],
      correctAnswer: 2,
      explanation: 'Id型はnumberまたはstring型のみ許容します。trueはboolean型なのでエラーです。',
      type: 'union'
    },
    {
      id: 'ui4',
      question: 'Intersection型を使うとどうなる？',
      code: 'type A = { a: number };\ntype B = { b: string };\ntype AB = A & B;',
      options: [
        'aプロパティだけ持つ',
        'bプロパティだけ持つ',
        'aとb両方のプロパティを持つ',
        'どちらのプロパティも持たない'
      ],
      correctAnswer: 2,
      explanation: 'Intersection型は両方の型のプロパティをすべて持つ型になります。',
      type: 'intersection'
    }
  ] as PracticeQuestion[],
  literal: [
    {
      id: 'literal1',
      question: 'リテラル型の特徴はどれですか？',
      code: "let status: 'draft' | 'published' | 'deleted';",
      options: [
        '特定の値のみ許可する',
        'どんな値でも許可する',
        '型チェックが無効',
        '数値しか許可しない'
      ],
      correctAnswer: 0,
      explanation: 'リテラル型は特定の値のみを許可し、間違った値はコンパイル時にエラーになります。',
      type: 'string'
    }
  ] as PracticeQuestion[],
  never: neverTypePractice,
  'optional-chaining': [
    {
      id: 'optional-chaining-q1',
      question: 'Optional Chainingを使うと、どのような場合にundefinedが返りますか？',
      code: `const obj = { a: { b: 2 } };
console.log(obj.a?.b); // ?`,
      options: [
        'aが存在しない場合',
        'bが存在しない場合',
        'aもbも存在する場合',
        '常にundefined'
      ],
      correctAnswer: 0,
      explanation: 'aが存在しない場合、obj.a?.bはundefinedを返します。',
      type: 'optional'
    },
    {
      id: 'optional-chaining-q2',
      question: '次のコードの出力は？',
      code: `const user = { name: 'Taro' };
console.log(user.contact?.email);`,
      options: [
        'null',
        'undefined',
        'エラーになる',
        '空文字'
      ],
      correctAnswer: 1,
      explanation: 'contactが存在しないため、undefinedが返ります。',
      type: 'optional'
    }
  ],
  'non-null-assertion': [
    {
      id: 'non-null-q1',
      question: 'Non-null Assertion Operator（!）の主な役割は何ですか？',
      code: `let value: string | undefined;\nconsole.log(value!.length);`,
      options: [
        '値がnull/undefinedであることを保証する',
        '値がnull/undefinedでないとTypeScriptに伝える',
        '値をnullに変換する',
        '型をanyに変換する'
      ],
      correctAnswer: 1,
      explanation: 'Non-null Assertion Operatorは「この値はnull/undefinedではない」とTypeScriptに伝えるためのものです。',
      type: 'non-null'
    },
    {
      id: 'non-null-q2',
      question: '次のコードの実行結果は？',
      code: `function greet(name?: string) {\n  console.log(name!.toUpperCase());\n}\ngreet();`,
      options: [
        'undefined',
        'null',
        'エラーになる',
        '何も表示されない'
      ],
      correctAnswer: 2,
      explanation: 'nameがundefinedのまま!でtoUpperCase()を呼ぶため、実行時エラーになります。',
      type: 'non-null'
    },
    {
      id: 'non-null-q3',
      question: 'findの戻り値に!を使うとどうなる？',
      code: `const arr = [1, 2, 3];\nconst found = arr.find(n => n > 3);\nconsole.log(found!.toFixed(2));`,
      options: [
        '0.00と表示される',
        'undefinedと表示される',
        'エラーになる',
        '3.00と表示される'
      ],
      correctAnswer: 2,
      explanation: 'findの戻り値がundefinedの場合、!でtoFixedを呼ぶと実行時エラーになります。',
      type: 'non-null'
    },
    {
      id: 'non-null-q4',
      question: 'DOM取得時の非nullアサーションの正しい使い方は？',
      code: `const el = document.getElementById('myInput');\n(el as HTMLInputElement)!.value = 'Hello';`,
      options: [
        'el.value = "Hello";',
        '(el as HTMLInputElement)!.value = "Hello";',
        'el!.value = "Hello";',
        'どれも正しい'
      ],
      correctAnswer: 1,
      explanation: '型アサーションと!を組み合わせて使うことで、型安全にアクセスできます。',
      type: 'non-null'
    }
  ],
  'nullish-coalescing': [
    {
      id: 'nullish-q1',
      question: 'Nullish Coalescing Operator（??）の主な役割は？',
      code: `let value: string | null = null;\nconsole.log(value ?? 'default');`,
      options: [
        'valueがnull/undefinedのとき右辺を返す',
        'valueがfalsy値のとき右辺を返す',
        'valueが0のとき右辺を返す',
        '常に右辺を返す'
      ],
      correctAnswer: 0,
      explanation: '??はnullまたはundefinedのときのみ右辺を返します。',
      type: 'nullish'
    },
    {
      id: 'nullish-q2',
      question: '次のコードの出力は？',
      code: `let num = 0;\nconsole.log(num ?? 100);`,
      options: [
        '0',
        '100',
        'undefined',
        'null'
      ],
      correctAnswer: 0,
      explanation: '0はnull/undefinedではないのでそのまま0が出力されます。',
      type: 'nullish'
    },
    {
      id: 'nullish-q3',
      question: '|| と ?? の違いで正しいのは？',
      code: `let str = '';
console.log(str || 'empty');
console.log(str ?? 'empty');`,
      options: [
        'どちらも"empty"になる',
        '||は"empty"、??は""になる',
        '||は""、??は"empty"になる',
        'どちらも""になる'
      ],
      correctAnswer: 1,
      explanation: '||は空文字もfalsyなので"empty"、??はnull/undefinedのみなので""がそのまま。',
      type: 'nullish'
    },
    {
      id: 'nullish-q4',
      question: 'Optional Chainingと??を組み合わせた場合の出力は？',
      code: `const user = { profile: undefined };
console.log(user.profile?.name ?? 'NoName');`,
      options: [
        'undefined',
        'NoName',
        'エラーになる',
        'profile'
      ],
      correctAnswer: 1,
      explanation: 'profileがundefinedなので、??の右辺"NoName"が出力されます。',
      type: 'nullish'
    }
  ],
  'type-guard': [
    {
      id: 'typeguard-q1',
      question: 'typeofによる型ガードの正しい使い方は？',
      code: `function showLength(value: number | string) {\n  if (/* ? */) {\n    console.log(value.length);\n  }\n}`,
      options: [
        "typeof value === 'string'",
        "typeof value === 'number'",
        "value instanceof String",
        "value.length !== undefined"
      ],
      correctAnswer: 0,
      explanation: "typeof value === 'string' でstring型に絞り込めます。",
      type: 'typeguard'
    },
    {
      id: 'typeguard-q2',
      question: 'instanceofによる型ガードの説明で正しいのは？',
      code: `class Dog {}\nclass Cat {}\nfunction speak(pet: Dog | Cat) {\n  if (pet instanceof Dog) {\n    // ?\n  }\n}`,
      options: [
        "petがDog型のときだけtrueになる",
        "petがCat型のときだけtrueになる",
        "常にtrueになる",
        "常にfalseになる"
      ],
      correctAnswer: 0,
      explanation: "instanceofはDog型のときだけtrueになります。",
      type: 'typeguard'
    },
    {
      id: 'typeguard-q3',
      question: 'in演算子による型ガードの使い方で正しいのは？',
      code: `type A = { foo: string };\ntype B = { bar: number };\nfunction print(obj: A | B) {\n  if (/* ? */) {\n    console.log(obj.foo);\n  }\n}`,
      options: [
        "'foo' in obj",
        "'bar' in obj",
        "typeof obj === 'A'",
        "obj instanceof A"
      ],
      correctAnswer: 0,
      explanation: "'foo' in obj でA型に絞り込めます。",
      type: 'typeguard'
    },
    {
      id: 'typeguard-q4',
      question: 'カスタム型ガード関数の特徴は？',
      code: `function isString(value: any): value is string {\n  return typeof value === 'string';\n}`,
      options: [
        "戻り値がtrueのとき型が絞り込まれる",
        "常にstring型になる",
        "型アサーションと同じ",
        "any型になる"
      ],
      correctAnswer: 0,
      explanation: "value is string のような戻り値型で、trueのとき型が絞り込まれます。",
      type: 'typeguard'
    }
  ],
  'keyof-operator': [
    {
      id: 'keyof-q1',
      question: 'keyof User の型は？',
      code: `interface User { name: string; age: number; email: string; }\ntype UserKey = keyof User;`,
      options: [
        "'name' | 'age' | 'email'",
        "string",
        "number",
        "User"
      ],
      correctAnswer: 0,
      explanation: "keyof Userはプロパティ名のUnion型になります。",
      type: 'keyof'
    },
    {
      id: 'keyof-q2',
      question: 'getProperty<T, K extends keyof T>のKの役割は？',
      code: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }`,
      options: [
        "Tのプロパティ名のみ許可する",
        "Tの値のみ許可する",
        "Tの型をanyにする",
        "Kは使われない"
      ],
      correctAnswer: 0,
      explanation: "K extends keyof T でkeyがTのプロパティ名のみ許可されます。",
      type: 'keyof'
    },
    {
      id: 'keyof-q3',
      question: 'typeofとkeyofを組み合わせると何ができる？',
      code: `const COLORS = { red: '#f00', green: '#0f0', blue: '#00f' } as const;\ntype ColorKey = keyof typeof COLORS;`,
      options: [
        "COLORSのキー名Union型を作れる",
        "値の型を取得できる",
        "number型になる",
        "string型になる"
      ],
      correctAnswer: 0,
      explanation: "typeofでオブジェクト型を取得し、keyofでキー名Union型を作れます。",
      type: 'keyof'
    },
    {
      id: 'keyof-q4',
      question: 'Mapped Typesでkeyofを使う主な目的は？',
      code: `type ReadonlyUser<T> = { readonly [K in keyof T]: T[K]; }`,
      options: [
        "各プロパティ型を参照し変換する",
        "型をanyにする",
        "プロパティ名を変更する",
        "値を変更する"
      ],
      correctAnswer: 0,
      explanation: "Mapped TypesでkeyofとT[K]を組み合わせて各プロパティ型を参照できます。",
      type: 'keyof'
    }
  ],
  'index-signature': [
    {
      id: 'indexsig-q1',
      question: 'インデックス型の基本構文は？',
      code: `type SupportVersions = { [env: number]: boolean }`,
      options: [
        '[env: number]: boolean',
        '[env: string]: number',
        '[env: boolean]: string',
        '[env: any]: any'
      ],
      correctAnswer: 0,
      explanation: 'numberキーでboolean値を持つインデックス型の定義です。',
      type: 'indexsig'
    },
    {
      id: 'indexsig-q2',
      question: 'stringキーのインデックス型で正しいのは？',
      code: `type Label = { [key: string]: string }`,
      options: [
        'key: stringで値もstring型',
        'key: numberで値もstring型',
        'key: stringで値はnumber型',
        'key: booleanで値はstring型'
      ],
      correctAnswer: 0,
      explanation: 'stringキーで値もstring型のインデックス型です。',
      type: 'indexsig'
    },
    {
      id: 'indexsig-q3',
      question: 'numberキーのインデックス型でstringキーを使うとどうなる？',
      code: `type SupportVersions = { [env: number]: boolean }\nlet versions: SupportVersions = { 'v105': true }`,
      options: [
        'エラーになる',
        '許可される',
        '値がany型になる',
        'numberキーに変換される'
      ],
      correctAnswer: 0,
      explanation: 'numberキー型にはstringキーは代入できません。',
      type: 'indexsig'
    },
    {
      id: 'indexsig-q4',
      question: 'インデックス型のユースケースで正しいのは？',
      code: `type ApiResponse = { [id: string]: { name: string; age: number } }`,
      options: [
        'APIレスポンスでキーが動的な場合',
        '配列の要素数を固定したい場合',
        'クラスの継承を表現したい場合',
        '型エイリアスを作りたい場合'
      ],
      correctAnswer: 0,
      explanation: 'APIレスポンスなど動的なキーを持つ場合にインデックス型が便利です。',
      type: 'indexsig'
    }
  ],
  'readonly': [
    {
      id: 'readonly-q1',
      question: 'readonly修飾子の主な役割は？',
      code: `type User = { readonly name: string }`,
      options: [
        'プロパティの変更を禁止する',
        '変数の再代入を禁止する',
        '型をanyにする',
        'プロパティ名を変更する'
      ],
      correctAnswer: 0,
      explanation: 'readonlyはプロパティの変更を禁止します。',
      type: 'readonly'
    },
    {
      id: 'readonly-q2',
      question: 'Readonly<T>型の特徴は？',
      code: `type User = { name: string }; type UserReadonly = Readonly<User>;`,
      options: [
        '全プロパティがreadonlyになる',
        '一部のプロパティだけreadonlyになる',
        '型がanyになる',
        'プロパティ名が変更される'
      ],
      correctAnswer: 0,
      explanation: 'Readonly<T>は全プロパティをreadonlyにします。',
      type: 'readonly'
    },
    {
      id: 'readonly-q3',
      question: 'クラスのreadonlyプロパティの特徴は？',
      code: `class User { readonly id: number; constructor(id: number) { this.id = id; } }`,
      options: [
        '再代入できない',
        '参照できない',
        '型がanyになる',
        'プロパティ名が変更される'
      ],
      correctAnswer: 0,
      explanation: 'readonlyプロパティは再代入できません。',
      type: 'readonly'
    },
    {
      id: 'readonly-q4',
      question: 'constとreadonlyの違いは？',
      code: `const arr: ReadonlyArray<number> = [1, 2, 3];`,
      options: [
        'constは変数の再代入禁止、readonlyはプロパティの変更禁止',
        'constはプロパティの変更禁止、readonlyは変数の再代入禁止',
        'どちらも同じ意味',
        'constは型をanyにする'
      ],
      correctAnswer: 0,
      explanation: 'constは変数自体の再代入禁止、readonlyはプロパティの変更禁止です。',
      type: 'readonly'
    }
  ],
  unknown: unknownTypePractice as PracticeQuestion[],
  'async-await': asyncAwaitPractice as PracticeQuestion[],
  'type-definition': typeDefinitionPractice as PracticeQuestion[]
};

// TypeScript型アサーションの学習データ
export const assertionTypesData: LearningSection = {
  id: 'assertion',
  title: '型アサーション',
  description: 'TypeScriptでは、ある値の型を開発者が「この型だと確信している」と明示するために型アサーション（Type Assertion）を使います。',
  keyPoints: [
    '型アサーションは「値 as 型」の構文で記述',
    'TypeScriptの型チェックを回避する手段なので、誤った型アサーションは実行時エラーの原因になる',
    'DOM操作やAPIレスポンスなど、TypeScriptが型を判別できない場面で有効',
    '二段階アサーション（any経由）で複雑な変換も可能',
    '乱用は避け、型安全性を優先すること'
  ],
  benefits: ['型安全性を担保しつつ柔軟な型変換が可能', 'TypeScriptが型を判別できない場面で有効', '誤用時は実行時エラーのリスク'],
  examples: [
    {
      id: 'basic-assertion',
      type: 'assertion',
      name: '基本構文',
      description: '値の型を明示的に指定',
      example: 'const value = "hello" as string;',
      correctUsage: 'const value = "hello" as string;',
      incorrectUsage: 'const value = 123 as string; // 実行時エラーの可能性',
      explanation: 'as 型名 の構文で、値の型を明示的に指定できます。',
      keyPoints: ['as 型名 の構文', '型安全性の担保'],
      cautions: ['誤った型アサーションは実行時エラーの原因'],
      benefits: ['型安全性を担保しつつ明示的な型変換が可能', '型チェックの回避']
    },
    {
      id: 'dom-assertion',
      type: 'dom',
      name: 'DOM要素の型アサーション',
      description: 'getElementByIdなどで取得した要素の型を明示',
      example: 'const input = document.getElementById("myInput") as HTMLInputElement;',
      correctUsage: 'const input = document.getElementById("myInput") as HTMLInputElement;',
      incorrectUsage: 'const input = document.getElementById("myInput") as HTMLDivElement; // 実際はInput要素',
      explanation: 'TypeScriptが型を特定できない場合、開発者が正しい型を指定することで型安全に操作できます。',
      keyPoints: ['DOM操作での型アサーション', 'HTML要素の型指定'],
      cautions: ['間違った型を指定すると実行時エラー'],
      benefits: ['DOM操作時の型安全性', '型エラーの回避']
    },
    {
      id: 'double-assertion',
      type: 'double',
      name: '二重アサーション',
      description: 'anyやunknownを経由して目的の型に変換',
      example: 'const value = "123" as unknown as number;',
      correctUsage: 'const value = "123" as unknown as number;',
      incorrectUsage: 'const value = "123" as number; // 型が大きく異なる場合はエラー',
      explanation: '型が大きく異なる場合、一度unknownやanyを経由してアサーションするテクニックです。',
      keyPoints: ['二重アサーション', '型変換の裏技'],
      cautions: ['型安全性が損なわれる可能性'],
      benefits: ['複雑な型変換が可能', '型安全性の柔軟なコントロール']
    },
    {
      id: 'wrong-assertion',
      type: 'caution',
      name: '誤った型アサーションの危険性',
      description: '誤った型アサーションによる実行時エラー例',
      example: 'const str: any = "hello";\nconst num: number = str as number;\nconsole.log(num.toFixed(2)); // TypeError',
      correctUsage: 'const str: any = 123;\nconst num: number = str as number;\nconsole.log(num.toFixed(2)); // OK',
      incorrectUsage: 'const str: any = "hello";\nconst num: number = str as number;\nconsole.log(num.toFixed(2)); // ❌ 実行時エラー',
      explanation: '型アサーションはTypeScriptの型チェックを回避するため、誤った型を指定すると実行時エラーになります。',
      keyPoints: ['型チェック回避の危険性', '実行時エラーのリスク'],
      cautions: ['asの乱用は避ける', '型安全性を優先'],
      benefits: ['型チェックを回避できる', '誤用時は実行時エラーのリスク']
    }
  ]
};

// TypeScript型エイリアスの学習データ
export const aliasTypesData: LearningSection = {
  id: 'alias',
  title: '型エイリアス',
  description: 'TypeScriptでは、型を再利用可能な名前付き型にするために型エイリアスを使います。',
  keyPoints: [
    '型エイリアスはtypeキーワードを使って定義',
    '型エイリアスを使うことで、型定義を何度も書かずに済む',
    '型エイリアスは型の再利用性を向上させる',
    '型エイリアスは型の再利用性を向上させる'
  ],
  benefits: ['型定義の再利用', '保守性の向上', '複雑な型の簡潔化'],
  examples: [
    {
      id: 'basic-alias',
      type: 'alias',
      name: '基本構文',
      description: '型エイリアスの基本的な使い方',
      example: 'type User = { name: string; age: number };\nconst user: User = { name: "Takuya", age: 36 };',
      correctUsage: 'type User = { name: string; age: number };\nconst user: User = { name: "Takuya", age: 36 };',
      incorrectUsage: 'type User = { name: string; age: number };\nconst user: User = { name: "Takuya", age: "36" };',
      explanation: '型エイリアスを使うことで、型定義を何度も書かずに済みます。',
      keyPoints: ['型エイリアスの使い方', '型定義の再利用性'],
      benefits: ['型定義の再利用', '保守性の向上']
    },
    {
      id: 'union-alias',
      type: 'alias',
      name: 'ユニオン型エイリアス',
      description: '複数のリテラル型をまとめて再利用',
      example: 'type Status = "success" | "error" | "loading";\nconst s: Status = "success";',
      correctUsage: 'type Status = "success" | "error" | "loading";\nconst s: Status = "error";',
      incorrectUsage: 'const s: Status = "fail"; // 型エラー',
      explanation: 'ユニオン型の型エイリアスで、特定の値のみ許容する型を定義できます。',
      keyPoints: ['ユニオン型', 'リテラル型の再利用'],
      benefits: ['型の制約', '可読性の向上']
    },
    {
      id: 'generic-alias',
      type: 'alias',
      name: 'ジェネリック型エイリアス',
      description: '汎用的な型定義を再利用',
      example: 'type ApiResponse<T> = { data: T; error?: string };\nconst res: ApiResponse<number> = { data: 123 };',
      correctUsage: 'type ApiResponse<T> = { data: T; error?: string };\nconst res: ApiResponse<string> = { data: "ok" };',
      incorrectUsage: 'const res: ApiResponse<number> = { data: "ng" }; // 型エラー',
      explanation: 'ジェネリック型エイリアスで、さまざまな型に対応した再利用可能な型を定義できます。',
      keyPoints: ['ジェネリック型', '汎用的な型定義'],
      benefits: ['再利用性', '型安全性']
    },
    {
      id: 'function-alias',
      type: 'function',
      name: '関数型エイリアス',
      description: '関数の型をエイリアス化',
      example: 'type Greet = (name: string) => string;\nconst greet: Greet = name => `Hello, ${name}`;',
      correctUsage: 'type Greet = (name: string) => string;\nconst greet: Greet = name => `Hello, ${name}`;',
      incorrectUsage: 'const greet: Greet = 123; // 型エラー',
      explanation: '関数の型をエイリアス化することで、可読性・再利用性が高まります。',
      keyPoints: ['関数型の型エイリアス', '可読性・再利用性'],
      benefits: ['型の再利用', '保守性の向上']
    }
  ]
};

// TypeScript変数の学習データ
export const variableTypesData: LearningSection = {
  id: 'variables',
  title: '変数',
  description: 'TypeScriptの変数宣言はJavaScriptと同じルールですが、型注釈（Type Annotation）を付けられる点が特徴です。',
  keyPoints: [
    'let/const/varで変数を宣言できる',
    '型注釈（: 型名）で型を明示できる',
    'let/constはブロックスコープ、varは関数スコープ',
    'constは再代入不可の定数',
    '実務ではlet/const推奨、varは非推奨'
  ],
  benefits: ['型安全な変数宣言', 'スコープ管理によるバグ防止', '保守性の向上'],
  examples: [
    {
      id: 'let-basic',
      type: 'let',
      name: 'letによる変数宣言',
      description: 'ES6から導入された主流の変数宣言方法',
      example: 'let employeeName: string = "John";',
      correctUsage: 'let employeeName: string = "John";',
      incorrectUsage: 'let employeeName = 100; // 型注釈がstringなのに数値を代入',
      explanation: 'letはブロックスコープを持ち、型注釈で型を明示できます。',
      keyPoints: ['ブロックスコープ', '型注釈可能', '再代入可'],
      tips: ['初期化時に型推論も可能']
    },
    {
      id: 'const-basic',
      type: 'const',
      name: 'constによる定数宣言',
      description: '再代入不可の定数を宣言',
      example: 'const num: number = 100;',
      correctUsage: 'const num: number = 100;',
      incorrectUsage: 'num = 200; // ❌ const変数は再代入不可',
      explanation: 'constは一度値を設定すると変更できません。スコープはletと同じです。',
      keyPoints: ['再代入不可', 'ブロックスコープ', '型注釈可能'],
      tips: ['オブジェクトや配列のプロパティは変更可能']
    },
    {
      id: 'var-basic',
      type: 'var',
      name: 'varによる変数宣言',
      description: '古い仕様の変数宣言。関数スコープを持つ',
      example: 'var oldValue = 10;',
      correctUsage: 'var oldValue = 10;',
      incorrectUsage: 'var oldValue: string = 10; // 型不一致',
      explanation: 'varは関数スコープで、現在は非推奨。レガシーなコードで使われることが多いです。',
      keyPoints: ['関数スコープ', '型注釈可能', '再代入可'],
      tips: ['let/constの使用を推奨']
    },
    {
      id: 'annotation',
      type: 'annotation',
      name: '型注釈の書き方',
      description: '変数名の後ろに: 型名で型を指定',
      example: 'let employeeName: string = "John";',
      correctUsage: 'let employeeName: string = "John";',
      incorrectUsage: 'let employeeName: string = 100; // 型不一致',
      explanation: '型注釈は省略可能で、初期化時に型推論されます。',
      keyPoints: [': 型名で型注釈', '省略可能（型推論）'],
      tips: ['型推論の詳細は型推論セクション参照']
    },
    {
      id: 'scope',
      type: 'scope',
      name: 'スコープの違い',
      description: 'let/constはブロックスコープ、varは関数スコープ',
      example: 'function calc(isSum: boolean) {\n  let a = 100;\n  if (isSum) {\n    let b = a + 1;\n    return b; // OK\n  }\n  return b; // エラー: bはブロックスコープ内でしか参照できない\n}',
      correctUsage: 'letはブロックスコープなので、if文の外ではbにアクセスできません。',
      incorrectUsage: 'varで宣言すると関数内でbにアクセス可能',
      explanation: 'let/constはブロックスコープ、varは関数スコープです。',
      keyPoints: ['スコープの違い', 'let/const推奨'],
      tips: ['varは極力使わない']
    },
    {
      id: 'summary',
      type: 'summary',
      name: 'まとめ',
      description: '変数宣言のポイントまとめ',
      example: '',
      correctUsage: 'let/constで宣言し、必要に応じて型注釈を使う',
      incorrectUsage: 'varを多用する',
      explanation: 'let/constが主流。型注釈は省略可能で型推論が働く。',
      keyPoints: ['let/const推奨', '型注釈は省略可能', 'varは非推奨'],
      tips: ['実務ではlet/constを使う']
    }
  ] as VariableExample[]
};

export const interfaceTypesData = {
  id: 'interface',
  title: 'インタフェース',
  description: 'TypeScriptのインタフェースは、オブジェクト型の構造やクラスの契約を定義するための機能です。型エイリアスより拡張性が高く、クラスとの連携で特に有用です。',
  keyPoints: [
    'interfaceでオブジェクト型の構造を定義',
    '同名で拡張可能な「オープン型」',
    'クラスのimplementsやinterface同士のextendsで利用',
    'オプショナルプロパティ（?）や継承も可能',
    '型エイリアスとの違いを理解する'
  ],
  examples: [
    {
      id: 'interface-basic',
      type: 'interface',
      name: '基本構文',
      description: 'オブジェクト型の構造を定義',
      example: 'interface Point { x: number; y: number; }',
      correctUsage: 'const p: Point = { x: 1, y: 2 };',
      incorrectUsage: 'const p: Point = { x: 1 }; // yが足りない',
      explanation: 'interfaceでオブジェクトの型を定義できます。',
      keyPoints: ['interfaceで型定義', 'プロパティの型チェック']
    },
    {
      id: 'interface-extend',
      type: 'extends',
      name: '拡張（同名追記・継承）',
      description: '同名でプロパティ追加やextendsで継承可能',
      example: 'interface Point { z: number; }',
      correctUsage: 'const p: Point = { x: 1, y: 2, z: 3 };',
      incorrectUsage: 'const p: Point = { x: 1, y: 2 }; // zが足りない',
      explanation: '同名で追記やextendsで複数の型を合成できます。',
      keyPoints: ['オープン型', '継承（extends）']
    },
    {
      id: 'interface-optional',
      type: 'optional',
      name: 'オプショナルプロパティ',
      description: '?を付けると省略可能',
      example: 'interface Point { x: number; y: number; z?: number; }',
      correctUsage: 'const p: Point = { x: 1, y: 2 }; // zは省略可',
      incorrectUsage: 'const p: Point = { x: 1 }; // yが足りない',
      explanation: 'z?: number のように?を付けると省略可能なプロパティになります。',
      keyPoints: ['?で省略可能', '柔軟な型定義']
    },
    {
      id: 'interface-implements',
      type: 'implements',
      name: 'クラスへのimplements',
      description: 'クラスでinterfaceを実装',
      example: 'interface IUser { name: string; age: number; sayHello: () => string; }\nclass User implements IUser {\n  name = "";\n  age = 0;\n  sayHello() { return `こんにちは、私は${this.name}、${this.age}歳です。`; }\n}',
      correctUsage: 'const u = new User(); u.name = "Taro"; u.sayHello();',
      incorrectUsage: 'class User implements IUser {} // プロパティ未実装でエラー',
      explanation: 'implementsでクラスがinterfaceの契約を満たす必要があります。',
      keyPoints: ['クラスの型契約', 'プロパティ・メソッドの実装必須']
    },
    {
      id: 'interface-difference',
      type: 'difference',
      name: '型エイリアスとの違い',
      description: '拡張性・継承・用途の違い',
      example: 'interface A { x: number; }\ntype B = { x: number; }',
      correctUsage: 'interfaceは同名追記・extends可、typeは&で合成',
      incorrectUsage: 'type B = { x: number; } type B = { y: number; } // 再定義不可',
      explanation: 'interfaceはオープン型で拡張・継承が可能。typeは再定義不可だが、&で合成できる。',
      keyPoints: ['オープン型', '継承', '型エイリアスとの違い']
    }
  ]
};

// TypeScriptクラス型の学習データ
export const classTypesData: LearningSection = {
  id: 'class',
  title: 'クラス',
  description: 'TypeScriptでは、ES2015（ES6）で導入されたJavaScriptのクラス構文に型付けを加えて利用できます。クラスの定義、継承、インタフェースの実装、アクセス修飾子など、オブジェクト指向の機能を型安全に扱えます。',
  keyPoints: [
    'class キーワードでクラスを定義',
    'フィールドやメソッドに型を明示',
    'constructorで初期化処理',
    'extendsで継承',
    'implementsでインタフェースを実装',
    'アクセス修飾子（public, private, protected）で可視範囲を制御'
  ],
  benefits: ['型安全なクラス設計', '継承や実装による再利用性向上', 'アクセス制御による安全性'],
  examples: [
    {
      id: 'class-basic',
      type: 'class',
      name: '基本構文',
      description: 'クラスの定義とフィールド・メソッドの型指定',
      example: `class Point {\n  x: number;\n  y: number;\n\n  constructor(x: number = 0, y: number = 0) {\n    this.x = x;\n    this.y = y;\n  }\n\n  moveX(n: number): void {\n    this.x += n;\n  }\n\n  moveY(n: number): void {\n    this.y += n;\n  }\n}\nconst point = new Point();\npoint.moveX(10);\nconsole.log(point.x + ', ' + point.y); // 10, 0`,
      correctUsage: 'const point = new Point();\npoint.moveX(10);',
      incorrectUsage: 'point.moveX("10"); // ❌ number型以外はエラー',
      explanation: 'フィールドやメソッドの型を明示することで、型安全なクラス設計が可能です。',
      keyPoints: ['フィールド・メソッドの型指定', 'constructorで初期化', '戻り値型の明示'],
      tips: ['TypeScriptではクラスの各メンバに型を付けることで、型安全性が高まります。'],
      benefits: ['クラスの型安全性', '誤った型の利用防止']
    },
    {
      id: 'class-extends',
      type: 'extends',
      name: '継承（extends）',
      description: 'クラスの継承とsuperの利用',
      example: `class Point3D extends Point {\n  z: number;\n  constructor(x: number = 0, y: number = 0, z: number = 0) {\n    super(x, y);\n    this.z = z;\n  }\n  moveZ(n: number): void {\n    this.z += n;\n  }\n}\nconst point3D = new Point3D();\npoint3D.moveX(10);\npoint3D.moveZ(20);\nconsole.log(point3D.x + ', ' + point3D.y + ', ' + point3D.z); // 10, 0, 20`,
      correctUsage: 'const point3D = new Point3D();\npoint3D.moveX(10);\npoint3D.moveZ(20);',
      incorrectUsage: 'super(); // ❌ 親クラスのconstructorを呼ばないとエラー',
      explanation: 'extendsで親クラスを継承し、super()で親のconstructorを呼び出します。親クラスのメソッドも利用可能です。',
      keyPoints: ['extendsで継承', 'super()で親の初期化', '親メソッドの利用'],
      tips: ['継承によりコードの再利用性が向上します。'],
      benefits: ['継承による再利用性', '親クラスの型安全な利用']
    },
    {
      id: 'class-implements',
      type: 'implements',
      name: 'インタフェースのimplements',
      description: 'クラスでインタフェースを実装',
      example: `interface IUser {\n  name: string;\n  age: number;\n  sayHello: () => string;\n}\nclass User implements IUser {\n  name: string;\n  age: number;\n  constructor() {\n    this.name = '';\n    this.age = 0;\n  }\n  sayHello(): string {\n    return 'こんにちは、私は' + this.name + '、' + this.age + '歳です。';\n  }\n}\nconst user = new User();\nuser.name = 'Takuya';\nuser.age = 36;\nconsole.log(user.sayHello()); // 'こんにちは、私はTakuya、36歳です。'`,
      correctUsage: 'class User implements IUser { ... }',
      incorrectUsage: 'class User extends IUser { ... } // ❌ implementsで実装',
      explanation: 'implementsでインタフェースの契約を満たす必要があります。',
      keyPoints: ['implementsで型安全な実装', '必須プロパティ・メソッドの強制'],
      tips: ['インタフェースを使うことで、複数のクラスで共通のAPIを保証できます。'],
      benefits: ['インタフェース契約の型安全な実装', '共通APIの保証']
    },
    {
      id: 'class-access',
      type: 'access',
      name: 'アクセス修飾子',
      description: 'public, private, protectedによる可視範囲の制御',
      example: `class BasePoint3D {\n  public x: number;\n  private y: number;\n  protected z: number;\n}\nconst basePoint = new BasePoint3D();\nbasePoint.x; // OK\nbasePoint.y; // ❌ エラー\nbasePoint.z; // ❌ エラー\nclass ChildPoint extends BasePoint3D {\n  constructor() {\n    super();\n    this.x; // OK\n    this.y; // ❌ エラー\n    this.z; // OK\n  }\n}`,
      correctUsage: 'basePoint.x; // OK',
      incorrectUsage: 'basePoint.y; // ❌ privateは外部アクセス不可',
      explanation: 'publicはどこからでも、privateはクラス内のみ、protectedはサブクラスからもアクセス可能です。',
      keyPoints: ['public, private, protectedの違い', '可視範囲の制御'],
      tips: ['アクセス修飾子を使い分けて、意図しないアクセスを防ぎます。'],
      benefits: ['アクセス制御による安全性', '意図しないアクセスの防止']
    },
    {
      id: 'class-summary',
      type: 'summary',
      name: 'まとめ',
      description: 'TypeScriptクラスのポイントまとめ',
      example: 'class Animal {\n  name: string;\n  constructor(name: string) {\n    this.name = name;\n  }\n}',
      correctUsage: 'class Dog extends Animal {\n  bark() {\n    console.log("ワンワン");\n  }\n}\nconst dog = new Dog("ポチ");\ndog.bark();',
      incorrectUsage: 'class Cat extends Animal {\n  bark() {\n    console.log(this.name); // エラー: Catにbarkメソッドは不要\n  }\n}',
      explanation: 'クラス定義、フィールド・メソッドの型、継承、implements、アクセス修飾子など、TypeScriptのクラスは型安全なオブジェクト指向設計を実現します。',
      keyPoints: [
        'class キーワードで定義',
        'フィールド・メソッドの型明示',
        '継承（extends）',
        'インタフェースの実装（implements）',
        'アクセス修飾子で可視範囲制御'
      ],
      benefits: ['型安全なクラス設計', '継承・実装・アクセス制御の理解']
    }
  ]
};

// TypeScript Enum型の学習データ
export const enumTypesData: LearningSection = {
  id: 'enum',
  title: 'Enum型',
  description: 'TypeScript独自のEnum（列挙型）は、名前付き定数のセットを型安全に管理できる便利な機能です。数値・文字列EnumやUnion型との比較も理解しましょう。',
  keyPoints: [
    'enumで名前付き定数セットを定義',
    'デフォルトは0からの連番（数値Enum）',
    '文字列Enumも定義可能',
    '型安全性が高い',
    'Union型でも同様の表現が可能'
  ],
  benefits: ['定数の型安全な管理', '値の一元管理', 'バグの未然防止'],
  examples: [
    {
      id: 'enum-basic',
      type: 'enum',
      name: '基本のEnum定義',
      description: '数値Enumの基本構文',
      example: `enum Direction {\n  Up,\n  Down,\n  Left,\n  Right\n}\nlet direction: Direction = Direction.Left;\nconsole.log(direction); // 2`,
      correctUsage: 'direction = Direction.Right;',
      incorrectUsage: `direction = 'Left'; // エラー: string型は代入不可`,
      explanation: 'Enumはデフォルトで0から始まり、1ずつインクリメントされます。',
      keyPoints: ['enumで定数セットを定義', 'デフォルトは0からの連番'],
      benefits: ['定数の型安全な管理', '値の一元管理', 'バグの未然防止']
    },
    {
      id: 'enum-safety',
      type: 'safety',
      name: '型安全性',
      description: 'Enum型以外の値は代入できない',
      example: `direction = 'Left'; // エラー`,
      correctUsage: 'direction = Direction.Up;',
      incorrectUsage: `direction = 99; // エラー: 定義外の値`,
      explanation: 'Enum型に定義外の値や型は代入できません。',
      keyPoints: ['型安全性', '定義外の値はエラー'],
      benefits: ['型安全な値の利用', '誤った値の代入防止']
    },
    {
      id: 'enum-string',
      type: 'string',
      name: '文字列Enum',
      description: '値に文字列を割り当てるEnum',
      example: `enum Direction {\n  Up = 'UP',\n  Down = 'DOWN',\n  Left = 'LEFT',\n  Right = 'RIGHT'\n}\nconst value = 'DOWN';\nconst enumValue = value as Direction;\nif (enumValue === Direction.Down) {\n  console.log('Down is selected');\n}`,
      correctUsage: `Direction.Left // 'LEFT'`,
      incorrectUsage: `Direction['UP'] // undefined`,
      explanation: '文字列EnumはAPIレスポンスやパラメータが文字列の場合に便利です。',
      keyPoints: ['値に文字列を割り当て', '自動インクリメントなし'],
      benefits: ['API連携で便利', '値の明示的な管理']
    },
    {
      id: 'enum-union',
      type: 'union',
      name: 'Union型との比較',
      description: 'Union型でも同様の表現が可能',
      example: `type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';\nlet d: Direction = 'UP';`,
      correctUsage: `d = 'LEFT';`,
      incorrectUsage: `d = 'TOP'; // エラー: 定義外の値`,
      explanation: 'Union型は型のみで値を制約します。Enumは値と型を一元管理できます。',
      keyPoints: ['Union型でも表現可能', 'Enumは値と型を一元管理'],
      benefits: ['柔軟な型制約', '値と型の一元管理']
    },
    {
      id: 'enum-summary',
      type: 'summary',
      name: 'まとめ',
      description: 'Enum型のポイントまとめ',
      example: 'enum Color { Red, Green, Blue }',
      correctUsage: 'const c: Color = Color.Green;',
      incorrectUsage: 'const c: Color = "Green"; // エラー',
      explanation: 'Enumは型安全な定数セットを簡潔に定義でき、数値・文字列EnumやUnion型との使い分けも重要です。',
      keyPoints: [
        'enumで定数セットを型安全に管理',
        '数値Enum・文字列Enumの使い分け',
        'Union型との違いも理解'
      ],
      benefits: ['型安全な定数管理', '使い分けの理解']
    }
  ]
};

// TypeScript Generic型の学習データ
export const genericTypesData: LearningSection = {
  id: 'generic',
  title: 'ジェネリック型',
  description: 'ジェネリック（Generics）は、クラスや関数の中で使う型を外部から指定できる仕組みです。型安全性を保ちながら柔軟なコードを実現します。',
  keyPoints: [
    '型パラメータ（Tなど）で型を抽象化',
    '利用時に具体的な型を指定',
    '型安全性と柔軟性を両立',
    '配列・キュー・Reactコンポーネントなどで活用'
  ],
  benefits: ['汎用的な型定義', '再利用性の向上', '型安全性の担保'],
  examples: [
    {
      id: 'generic-basic',
      type: 'generic',
      name: '基本のジェネリック型クラス',
      description: '型パラメータTを使ったキューの例',
      example: `class Queue<T> {\n  private array: T[] = [];\n  push(item: T) {\n    this.array.push(item);\n  }\n  pop(): T | undefined {\n    return this.array.shift();\n  }\n}\nconst queue = new Queue<number>();\nqueue.push(111);\nqueue.push(112);`,
      correctUsage: 'queue.push(123); // OK',
      incorrectUsage: `queue.push('hoge'); // エラー: string型はnumber型に代入できない`,
      explanation: 'Tは型パラメータで、利用時にnumberなど具体的な型を指定します。',
      keyPoints: ['Tは仮の型', '利用時に型を指定', '型安全性'],
      benefits: ['型安全な汎用クラス', '再利用性の向上']
    },
    {
      id: 'generic-safety',
      type: 'safety',
      name: '型安全性',
      description: '異なる型の代入や利用を防ぐ',
      example: `let str = 'fuga';\nstr = queue.pop(); // エラー: strはstring型、pop()はnumber型を返す`,
      correctUsage: 'const n = queue.pop(); // nはnumber型',
      incorrectUsage: `str = queue.pop(); // エラー`,
      explanation: 'ジェネリックを使うことで、異なる型の代入や利用をコンパイル時に防げます。',
      keyPoints: ['型安全性', '異なる型の代入を防ぐ'],
      benefits: ['異なる型の誤用防止', '型安全な利用']
    },
    {
      id: 'generic-react',
      type: 'react',
      name: 'Reactとの関連',
      description: 'Reactコンポーネントもジェネリック型で定義可能',
      example: `type Props<T> = { value: T };\nfunction MyComponent<T>({ value }: Props<T>) {\n  return <div>{value}</div>;\n}`,
      correctUsage: '<MyComponent value={123} /> // OK',
      incorrectUsage: '<MyComponent value="abc" /> // Tがnumberの場合はエラー',
      explanation: 'Reactのコンポーネントもpropsの型をジェネリックで柔軟に指定できます。',
      keyPoints: ['propsの型を柔軟に指定', '再利用性が高い'],
      benefits: ['型安全なProps', '再利用性の向上']
    },
    {
      id: 'generic-summary',
      type: 'summary',
      name: 'まとめ',
      description: 'ジェネリック型のポイントまとめ',
      example: 'class Stack<T> { /* ... */ }',
      correctUsage: 'const s = new Stack<string>();',
      incorrectUsage: 'const s = new Stack<number, string>(); // 型パラメータが多すぎる',
      explanation: 'ジェネリック型は型安全性と柔軟性を両立し、配列・キュー・Reactなどで広く使われます。',
      keyPoints: [
        '型パラメータで型を抽象化',
        '利用時に型を指定',
        '型安全性と柔軟性の両立'
      ],
      benefits: ['型安全性と柔軟性の両立', '幅広い用途で活用']
    }
  ]
};

// TypeScript Union/Intersection型の学習データ
export const unionIntersectionTypesData: LearningSection = {
  id: 'unionintersection',
  title: 'Union型・Intersection型',
  description: 'Union型（|）は「いずれかの型」、Intersection型（&）は「すべての型」を満たす型を定義できます。型エイリアスや複合型設計で活用されます。',
  keyPoints: [
    'Union型（|）は「AまたはB」',
    'Intersection型（&）は「AかつB」',
    '型エイリアスで複雑な型も定義可能',
    '柔軟かつ安全な型設計が可能'
  ],
  benefits: ['複数型の柔軟な表現', '型安全な合成', 'バグの未然防止'],
  examples: [
    {
      id: 'union-basic',
      type: 'union',
      name: 'Union型の基本',
      description: '複数の型のいずれかを許容',
      example: 'type Id = number | string;',
      correctUsage: 'let id: Id = 123; id = "abc";',
      incorrectUsage: 'let id: Id = true; // エラー',
      explanation: 'Id型はnumberまたはstring型を許容します。',
      keyPoints: ['|で複数型を許容', '柔軟な型定義'],
      benefits: ['柔軟な型表現', '型安全な値の利用']
    },
    {
      id: 'union-func',
      type: 'union',
      name: 'Union型の関数引数',
      description: '関数の引数にもUnion型を利用可能',
      example: 'function printId(id: number | string) {\n  console.log(id);\n}',
      correctUsage: 'printId(11); printId("22");',
      incorrectUsage: 'printId(true); // エラー',
      explanation: 'numberまたはstring型のみ受け付けます。',
      keyPoints: ['関数引数にも使える', '型安全性'],
      benefits: ['型安全な引数', '柔軟な関数設計']
    },
    {
      id: 'union-alias',
      type: 'alias',
      name: '型エイリアスでUnion型',
      description: '型エイリアスで複雑な型も定義可能',
      example: 'type Identity = { id: number | string; name: string; }\ntype Contact = { name: string; email: string; phone: string; }\ntype IdentityOrContact = Identity | Contact;',
      correctUsage: 'const id: IdentityOrContact = { id: "111", name: "Takuya" };',
      incorrectUsage: 'const id: IdentityOrContact = { email: "a@b.com" }; // nameが不足',
      explanation: 'IdentityOrContact型はIdentity型またはContact型のいずれかを許容します。',
      keyPoints: ['型エイリアスで複雑な型', '柔軟な設計'],
      benefits: ['複雑な型の柔軟な表現', '型安全な設計']
    },
    {
      id: 'intersection-basic',
      type: 'intersection',
      name: 'Intersection型の基本',
      description: '複数の型を合成し、すべてのプロパティを持つ型を定義',
      example: 'type Employee = Identity & Contact;',
      correctUsage: 'const employee: Employee = { id: "111", name: "Takuya", email: "test@example.com", phone: "012345678" };',
      incorrectUsage: 'const employee: Employee = { name: "Takuya", email: "test@example.com", phone: "012345678" }; // idが不足',
      explanation: 'Employee型はIdentityとContact両方のプロパティが必須です。',
      keyPoints: ['&で型を合成', 'すべてのプロパティが必須'],
      benefits: ['型安全な合成', '全プロパティの保証']
    },
    {
      id: 'unionintersection-summary',
      type: 'summary',
      name: 'まとめ',
      description: 'Union型・Intersection型のポイントまとめ',
      example: 'type AorB = A | B;\ntype AB = A & B;',
      correctUsage: 'type UserOrAdmin = User | Admin;',
      incorrectUsage: 'type UserAndAdmin = User | Admin; // &で合成しないと両方の型にならない',
      explanation: 'Union型は「AまたはB」、Intersection型は「AかつB」。用途に応じて使い分けましょう。',
      keyPoints: [
        'Union型は柔軟性',
        'Intersection型は合成',
        '型エイリアスで複雑な型も定義可能'
      ],
      benefits: ['柔軟性と合成の理解', '型安全な設計']
    }
  ]
};

// TypeScript Literal型の学習データ
export const literalTypesData: LearningSection = {
  id: 'literal',
  title: 'リテラル型',
  description: 'リテラル型は、特定の値のみを許可する型です。文字列や数値など、決まった値だけを型として指定できます。',
  keyPoints: [
    '特定の値のみ許可する型',
    '|（パイプ）で複数の値を区切る',
    '間違った値はコンパイル時にエラー',
    '状態管理やAPIレスポンスで活用'
  ],
  benefits: ['特定の値のみ許容', '型安全な制約', 'バグの未然防止'],
  examples: [
    {
      id: 'literal-string',
      type: 'string',
      name: '文字列リテラル型',
      description: '特定の文字列のみ許可',
      example: "let postStatus: 'draft' | 'published' | 'deleted';",
      correctUsage: "postStatus = 'draft';",
      incorrectUsage: "postStatus = 'drafts'; // エラー: 許可されていない文字列",
      explanation: "postStatusには'draft', 'published', 'deleted'のみ代入可能です。",
      keyPoints: ['文字列リテラル型', '許可値以外はエラー'],
      benefits: ['特定値のみ許容', '型安全な制約']
    },
    {
      id: 'literal-number',
      type: 'number',
      name: '数値リテラル型',
      description: '特定の数値のみ許可',
      example: 'function compare(a: string, b: string): -1 | 0 | 1 {\n  return a === b ? 0 : a > b ? 1 : -1;\n}',
      correctUsage: 'compare("a", "b"); // -1, 0, 1 のいずれか',
      incorrectUsage: 'compare("a", "b"); // 2 は返せない',
      explanation: '戻り値は-1, 0, 1のいずれかであることを型で保証できます。',
      keyPoints: ['数値リテラル型', '戻り値の限定'],
      benefits: ['特定値のみ許容', '型安全な戻り値']
    },
    {
      id: 'literal-summary',
      type: 'summary',
      name: 'まとめ',
      description: 'リテラル型のポイントまとめ',
      example: "let status: 'open' | 'closed';",
      correctUsage: "status = 'open';",
      incorrectUsage: "status = 'pending'; // エラー: 'pending'は許可されていない値",
      explanation: 'リテラル型は特定の値のみを許可し、間違った値をコンパイル時に検出できます。',
      keyPoints: [
        '特定の値のみ許可',
        '間違った値はエラー',
        '状態管理やAPIレスポンスで活用'
      ],
      benefits: ['特定値のみ許容', '型安全な制約', 'API設計で活用']
    }
  ]
};



export const neverTypesData = {
  id: 'never',
  title: 'never型',
  description: '決して発生しない値を表す特殊な型。例外を投げる関数や網羅性チェックなどで利用。',
  keyPoints: [
    '決して発生しない値を表す型',
    '例外を投げる関数、無限ループ、網羅性チェックで利用',
    '型安全性をさらに高め、分岐漏れを未然に防げる'
  ],
  examples: [
    {
      title: '常に例外を投げる関数',
      description: 'この関数は決して正常終了して値を返すことがないため、戻り値型を never と定義します。',
      code: `function error(message: string): never {\n  throw new Error(message);\n}`,
      points: ['例外を投げる関数', '値を返さない']
    },
    {
      title: '型チェック網羅性保証',
      description: 'TypeScriptに「ここは到達しないコードである」ことを伝えられます。将来型が追加された場合、分岐漏れをコンパイルエラーで検知可能です。',
      code: `function foo(x: string | number | number[]): boolean {\n  if (typeof x === 'string') {\n    return true;\n  } else if (typeof x === 'number') {\n    return false;\n  }\n  // このreturnは決して呼ばれないはず\n  return error('Never happens');\n}`,
      points: ['網羅性チェック', '分岐漏れ検知']
    },
    {
      title: 'switch文での使用',
      description: 'default で never を使うと、enumに新しい値が追加された際にswitch文の漏れを検出できます。',
      code: `enum PageType {\n  ViewProfile,\n  EditProfile,\n  ChangePassword,\n}\n\nconst getTitleText = (type: PageType) => {\n  switch (type) {\n    case PageType.ViewProfile:\n      return 'Setting';\n    case PageType.EditProfile:\n      return 'Edit Profile';\n    case PageType.ChangePassword:\n      return 'Change Password';\n    default:\n      const wrongType: never = type;\n      throw new Error(wrongType + ' is not in PageType');\n  }\n};`,
      points: ['switch文', 'enum', '分岐漏れ検知']
    }
  ]
};

// Optional Chaining（オプショナルチェイニング）の学習データ
export const optionalChainingData = {
  id: 'optional-chaining',
  title: 'Optional Chaining（オプショナルチェイニング）',
  description: 'Optional Chaining（オプショナルチェイニング）は、ネストされたオブジェクトプロパティへのアクセス時に、途中のプロパティがnullやundefinedであっても実行時エラーにならず、undefinedを返す構文です。TypeScript 3.7から導入されました。',
  keyPoints: [
    '?. を使うことで、nullやundefinedチェックを省略できる',
    '途中でプロパティが存在しない場合はundefinedを返す',
    '実行時エラーが起きず、安全にundefinedを返す',
    'TypeScript 3.7以降で利用可能'
  ],
  examples: [
    {
      id: 'optional-chaining-basic',
      type: 'optional',
      name: '基本構文',
      description: '従来のnullチェックとOptional Chainingの比較',
      example: `// 従来の記述\nif (obj && obj.prop1 && obj.prop1.prop2) {\n  // 処理\n}\n\n// Optional Chaining\nif (obj?.prop1?.prop2) {\n  // 処理\n}`,
      correctUsage: 'obj?.prop1?.prop2',
      incorrectUsage: 'obj.prop1.prop2 // objやprop1がundefinedの場合エラー',
      explanation: '?. を使うことで、途中のプロパティがundefinedやnullでもエラーにならずundefinedを返します。',
      keyPoints: ['nullチェックの省略', '安全なプロパティアクセス']
    },
    {
      id: 'optional-chaining-interface',
      type: 'optional',
      name: 'インターフェースとOptional Chaining',
      description: 'Optional Chainingを使ったプロパティアクセス例',
      example: `interface User {\n  name: string;\n  social?: {\n    facebook: boolean;\n    twitter: boolean;\n  };\n}\n\nlet user: User;\nuser = { name: 'Takuya', social: { facebook: true, twitter: true } };\nconsole.log(user.social?.facebook); // true\n\nuser = { name: 'Takuya' };\nconsole.log(user.social?.facebook); // undefined（エラーにならない）`,
      correctUsage: 'user.social?.facebook',
      incorrectUsage: 'user.social.facebook // socialがundefinedの場合エラー',
      explanation: 'social?.facebook は social が存在する場合のみ facebook にアクセスし、それ以外の場合は undefined を返します。',
      keyPoints: ['?を使った安全なアクセス', 'undefined時もエラーにならない']
    },
    {
      id: 'optional-chaining-type-example',
      type: 'optional',
      name: '型定義例',
      description: 'Optional Chainingでよく使うオプショナルプロパティの型定義例',
      example: `interface Profile {\n  name: string;\n  contact?: {\n    email?: string;\n    phone?: string;\n  };\n}\nconst p: Profile = { name: 'Taro' };\nconsole.log(p.contact?.email); // undefined`,
      correctUsage: 'p.contact?.email',
      incorrectUsage: 'p.contact.email // contactがundefinedの場合エラー',
      explanation: 'contactやemailが存在しない場合でもエラーにならずundefinedを返します。',
      keyPoints: ['オプショナルプロパティとOptional Chainingの組み合わせ']
    }
  ]
};

export const nonNullAssertionData = {
  id: 'non-null-assertion',
  title: 'Non-null Assertion Operator（非nullアサーション演算子）',
  description: 'Non-null Assertion Operator（!）は、「この値は絶対にnull/undefinedではない」とTypeScriptに伝えるための演算子です。nullやundefinedの可能性がある変数・プロパティに対して、型エラーを回避できますが、実行時にはnullチェックが行われないため注意が必要です。',
  keyPoints: [
    '変数名の後ろに!を付けることで「null/undefinedではない」と明示できる',
    '型エラーを回避できるが、実行時エラーのリスクがある',
    'Optional Chaining（?.）やデフォルト値（??）の利用も検討する',
    '事前にnullチェックを行うのが安全'
  ],
  examples: [
    {
      id: 'non-null-basic',
      type: 'non-null',
      name: '基本構文',
      description: 'Non-null Assertion Operatorの基本的な使い方',
      example: `function greet(name?: string) {\n  console.log('Hello, ' + name!.toUpperCase());\n}\n\ngreet('Takuya'); // Hello, TAKUYA\ngreet();         // 実行時エラー: nameがundefinedの場合`,
      correctUsage: "name! // nameがnull/undefinedでないと仮定",
      incorrectUsage: "name.toUpperCase() // nameがundefinedの場合コンパイルエラー",
      explanation: "name! と書くことで「ここではnameはnull/undefinedではない」とTypeScriptに伝えられます。ただし、実行時にはnullチェックが行われないため、存在しない場合は例外が発生します。",
      keyPoints: ['型エラー回避', '実行時エラーのリスク']
    },
    {
      id: 'non-null-array',
      type: 'non-null',
      name: '配列要素への非nullアサーション',
      description: '配列のfind結果など、null/undefinedの可能性がある値に対して使う例',
      example: `const users = [{ name: 'Takuya' }, { name: 'Yuki' }];\nconst user = users.find(u => u.name === 'Takuya');\nconsole.log(user!.name); // Takuya`,
      correctUsage: "user!.name",
      incorrectUsage: "user.name // userがundefinedの場合エラー",
      explanation: "findの戻り値はundefinedの可能性があるため、!で非nullを明示できます。",
      keyPoints: ['findやDOM取得などでよく使う', 'undefined時は実行時エラー']
    },
    {
      id: 'non-null-dom',
      type: 'non-null',
      name: 'DOM取得時の非nullアサーション',
      description: 'document.getElementByIdなどでnullの可能性がある場合の例',
      example: `const el = document.getElementById('myInput');\n(el as HTMLInputElement)!.value = 'Hello';`,
      correctUsage: "(el as HTMLInputElement)!.value",
      incorrectUsage: "el.value // elがnullの場合エラー",
      explanation: "getElementByIdはnullを返す可能性があるため、!で非nullを明示できます。",
      keyPoints: ['DOM操作でよく使う', 'null時は実行時エラー']
    },
    {
      id: 'non-null-check',
      type: 'non-null',
      name: 'nullチェックとの併用',
      description: '事前にnullチェックを行う安全な使い方',
      example: `function printLength(str?: string) {\n  if (str) {\n    console.log(str!.length);\n  }\n}`,
      correctUsage: "if (str) { str!.length }",
      incorrectUsage: "str!.length // strがundefinedの場合エラー",
      explanation: "nullチェック後に!を使うことで、型エラーも実行時エラーも防げます。",
      keyPoints: ['nullチェックと併用が安全', '型エラー・実行時エラー両方防止']
    }
  ]
};

export const nullishCoalescingData = {
  id: 'nullish-coalescing',
  title: 'Nullish Coalescing Operator（null合体演算子）',
  description: 'Nullish Coalescing Operator（??）は、左辺がnullまたはundefinedの場合に右辺の値を返す演算子です。null/undefined時のデフォルト値設定に便利で、0や空文字はそのまま扱われます。',
  keyPoints: [
    '??はnull/undefinedのみを判定',
    '0や空文字はそのまま',
    'APIレスポンスやoptional値の補完に便利',
    'Optional Chainingと組み合わせて使うことも多い'
  ],
  examples: [
    {
      id: 'nullish-basic',
      type: 'nullish',
      name: '基本構文',
      description: 'Nullish Coalescing Operator（??）の基本的な使い方',
      example: `let userName: string | null | undefined;\nconsole.log(userName ?? 'ゲスト'); // userNameがnullまたはundefinedなら'ゲスト'を出力`,
      correctUsage: "userName ?? 'ゲスト'",
      incorrectUsage: "userName || 'ゲスト' // falsy値全てに反応",
      explanation: "??は左辺がnullまたはundefinedのときのみ右辺を返します。0や空文字はそのまま。",
      keyPoints: ['null/undefinedのみ判定', 'デフォルト値の設定']
    },
    {
      id: 'nullish-vs-or',
      type: 'nullish',
      name: '|| との違い',
      description: '||はfalsy値全て、??はnull/undefinedのみ判定',
      example: `let num = 0;\nconsole.log(num || 100); // 100\nconsole.log(num ?? 100); // 0`,
      correctUsage: "num ?? 100 // 0がそのまま",
      incorrectUsage: "num || 100 // 0はfalsyなので100になる",
      explanation: "||は0や空文字も右辺に置き換えるが、??はnull/undefinedのみ右辺に置き換える。",
      keyPoints: ['0や空文字は??でそのまま', '||はfalsy値全てに反応']
    },
    {
      id: 'nullish-api',
      type: 'nullish',
      name: 'APIレスポンスの補完',
      description: 'APIレスポンスなどで値がnull/undefinedのときのデフォルト値設定',
      example: `const data = { name: null };\nconst userName = data.name ?? 'ゲスト';\nconsole.log(userName); // 'ゲスト'`,
      correctUsage: "data.name ?? 'ゲスト'",
      incorrectUsage: "data.name || 'ゲスト' // nameが空文字の場合も'ゲスト'になる",
      explanation: "APIレスポンスでnull/undefinedの場合のみデフォルト値を使いたいときに便利。",
      keyPoints: ['APIレスポンスの補完', '空文字や0はそのまま']
    },
    {
      id: 'nullish-nested',
      type: 'nullish',
      name: 'ネストした値の補完',
      description: 'Optional Chainingと組み合わせて使う例',
      example: `const user = { profile: undefined };\nconst name = user.profile?.name ?? 'NoName';\nconsole.log(name); // 'NoName'`,
      correctUsage: "user.profile?.name ?? 'NoName'",
      incorrectUsage: "user.profile.name ?? 'NoName' // profileがundefinedでエラー",
      explanation: "Optional Chainingと組み合わせることで、ネストした値の安全な補完ができる。",
      keyPoints: ['Optional Chainingと相性が良い', 'ネストした値の補完']
    }
  ]
};

export const typeGuardData = {
  id: 'type-guard',
  title: 'Type Guard（型ガード）',
  description: '型ガード（Type Guard）は、TypeScriptで変数の型を特定の型に絞り込むテクニックです。typeofやinstanceof、in演算子、カスタム関数などで型を判別し、安全に処理を記述できます。',
  keyPoints: [
    'typeofやinstanceof、in演算子で型を判別',
    'カスタム型ガード関数（value is 型）も利用可能',
    'Union型や複数型の分岐に便利',
    '型安全で堅牢なコードが書ける'
  ],
  examples: [
    {
      id: 'typeguard-typeof',
      type: 'typeguard',
      name: 'typeofによる型ガード',
      description: 'typeof演算子でプリミティブ型を判別し、型を絞り込む',
      example: `function showLength(value: number | string) {\n  if (typeof value === 'string') {\n    console.log(value.length); // string型\n  } else {\n    console.log(value.toFixed(2)); // number型\n  }\n}`,
      correctUsage: "typeof value === 'string'",
      incorrectUsage: "value.length // number型のときエラー",
      explanation: "typeofで型を判別し、ブロック内で型が絞り込まれます。",
      keyPoints: ['typeofで型判別', 'ブロック内で型推論']
    },
    {
      id: 'typeguard-instanceof',
      type: 'typeguard',
      name: 'instanceofによる型ガード',
      description: 'クラスインスタンスの型をinstanceofで判別',
      example: `class Dog { bark() {} }\nclass Cat { meow() {} }\nfunction speak(pet: Dog | Cat) {\n  if (pet instanceof Dog) {\n    pet.bark();\n  } else {\n    pet.meow();\n  }\n}`,
      correctUsage: "pet instanceof Dog",
      incorrectUsage: "pet.bark() // Cat型のときエラー",
      explanation: "instanceofでクラスインスタンスの型を判別できます。",
      keyPoints: ['instanceofでクラス判別', '安全なメソッド呼び出し']
    },
    {
      id: 'typeguard-in',
      type: 'typeguard',
      name: 'in演算子による型ガード',
      description: 'オブジェクトのプロパティ有無で型を判別',
      example: `type A = { foo: string };\ntype B = { bar: number };\nfunction print(obj: A | B) {\n  if ('foo' in obj) {\n    console.log(obj.foo);\n  } else {\n    console.log(obj.bar);\n  }\n}`,
      correctUsage: "'foo' in obj",
      incorrectUsage: "obj.foo // B型のときエラー",
      explanation: "in演算子でプロパティの有無を判定し、型を絞り込めます。",
      keyPoints: ['in演算子でプロパティ判定', 'Union型の分岐']
    },
    {
      id: 'typeguard-custom',
      type: 'typeguard',
      name: 'カスタム型ガード関数',
      description: 'value is Type を返す関数で型を絞り込む',
      example: `function isString(value: any): value is string {\n  return typeof value === 'string';\n}\nfunction example(value: string | number) {\n  if (isString(value)) {\n    console.log(value.length);\n  } else {\n    console.log(value.toFixed(2));\n  }\n}`,
      correctUsage: "isString(value)",
      incorrectUsage: "value as string // 型安全でない",
      explanation: "カスタム型ガード関数で型安全に絞り込みができます。",
      keyPoints: ['value is 型', '型安全な分岐']
    }
  ]
};

export const keyofOperatorData = {
  id: 'keyof-operator',
  title: 'keyofオペレーター',
  description: 'keyofオペレーターは、指定した型のプロパティ名をUnion型として返す演算子です。型安全にオブジェクトのキーを扱う際や、ジェネリック関数・Mapped Typesでよく使われます。',
  keyPoints: [
    'keyof T でT型のプロパティ名をUnion型で取得',
    '型安全なキー指定が可能',
    'ジェネリック関数やMapped Typesで活用',
    'typeofと組み合わせて定義済みオブジェクトのキーも抽出可能'
  ],
  examples: [
    {
      id: 'keyof-basic',
      type: 'keyof',
      name: '基本構文',
      description: 'keyofで型のプロパティ名をUnion型として取得',
      example: `interface User {\n  name: string;\n  age: number;\n  email: string;\n}\ntype UserKey = keyof User; // 'name' | 'age' | 'email'`,
      correctUsage: "const key: UserKey = 'name';",
      incorrectUsage: "const key: UserKey = 'phone'; // 存在しないキーはエラー",
      explanation: "keyof Userは'name' | 'age' | 'email'型になります。",
      keyPoints: ['プロパティ名のUnion型', '型安全なキー指定']
    },
    {
      id: 'keyof-generic',
      type: 'keyof',
      name: 'ジェネリック関数での利用',
      description: 'K extends keyof T でkey引数の型安全性を保証',
      example: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nconst user: User = { name: 'Takuya', age: 36, email: 'test@example.com' };\nconst userName = getProperty(user, 'name'); // string型`,
      correctUsage: "getProperty(user, 'name') // OK",
      incorrectUsage: "getProperty(user, 'gender') // エラー: 存在しないキー",
      explanation: "K extends keyof T により、keyがTのプロパティ名であることを保証します。",
      keyPoints: ['K extends keyof T', 'T[K]で型を取得']
    },
    {
      id: 'keyof-typeof',
      type: 'keyof',
      name: 'typeofとの組み合わせ',
      description: 'keyof typeof object で定義済みオブジェクトのキーをUnion型に',
      example: `const COLORS = { red: '#f00', green: '#0f0', blue: '#00f' } as const;\ntype ColorKey = keyof typeof COLORS; // 'red' | 'green' | 'blue'`,
      correctUsage: "const key: ColorKey = 'red';",
      incorrectUsage: "const key: ColorKey = 'yellow'; // 存在しないキーはエラー",
      explanation: "typeofでオブジェクト型を取得し、keyofでキー名Union型を作れます。",
      keyPoints: ['typeofと組み合わせ', '定義済みオブジェクトのキー抽出']
    },
    {
      id: 'keyof-mapped',
      type: 'keyof',
      name: 'Mapped Typesでの利用',
      description: 'keyofとT[K]を使って型変換',
      example: `type ReadonlyUser<T> = {\n  readonly [K in keyof T]: T[K];\n}\ntype ReadonlyUserType = ReadonlyUser<User>;`,
      correctUsage: "[K in keyof T]: T[K]",
      incorrectUsage: "[K in T]: T[K] // keyofがないとエラー",
      explanation: "Mapped TypesでkeyofとT[K]を組み合わせて各プロパティ型を参照できます。",
      keyPoints: ['Mapped Types', 'keyofとT[K]の組み合わせ']
    }
  ]
};

export const indexSignatureData = {
  id: 'index-signature',
  title: 'インデックス型（Index Signature）',
  description: 'インデックス型（Index signature）は、オブジェクトのプロパティ名が固定されない場合に、キーと値の型をまとめて定義できるTypeScriptの機能です。APIレスポンスや可変設定など、動的なキーを持つオブジェクトに便利です。',
  keyPoints: [
    'インデックス型は[key: string]: 型 や [key: number]: 型 の形式で定義',
    'キーにはstringまたはnumberが指定可能',
    'numberキーも実際にはstringとして扱われる',
    '型安全な動的オブジェクト設計に役立つ'
  ],
  examples: [
    {
      id: 'indexsig-number',
      type: 'indexsig',
      name: 'numberキーのインデックス型',
      description: '数値キーで値の型を定義',
      example: `type SupportVersions = {\n  [env: number]: boolean;\n}\nlet versions: SupportVersions = {\n  102: false,\n  103: false,\n  104: true,\n  'v105': true // エラー: string型は許容されない\n}`,
      correctUsage: "versions[104] = true;",
      incorrectUsage: "versions['v105'] = true; // stringキーはエラー",
      explanation: "numberキーのみ許容され、stringキーは型エラーになります。",
      keyPoints: ['numberキー', 'stringキーは不可']
    },
    {
      id: 'indexsig-string',
      type: 'indexsig',
      name: 'stringキーのインデックス型',
      description: 'stringキーで値の型を定義',
      example: `type Label = {\n  [key: string]: string;\n}\nconst labels: Label = {\n  topTitle: 'トップページのタイトル',\n  feature1: '機能1説明'\n}`,
      correctUsage: "labels['topTitle'] = 'タイトル';",
      incorrectUsage: "labels[100] = true; // 値の型がstringでないとエラー",
      explanation: "すべてのプロパティがstringキーでstring値であることを保証します。",
      keyPoints: ['stringキー', '値の型がstring']
    },
    {
      id: 'indexsig-api',
      type: 'indexsig',
      name: 'APIレスポンスでの利用例',
      description: '動的なキーを持つAPIレスポンスの型定義',
      example: `type ApiResponse = {\n  [id: string]: { name: string; age: number }\n}\nconst data: ApiResponse = {\n  user1: { name: 'Takuya', age: 36 },\n  user2: { name: 'Yuki', age: 28 }\n}`,
      correctUsage: "data['user1'].name",
      incorrectUsage: "data[1] // 値の型が合わないとエラー",
      explanation: "APIレスポンスでキーが動的な場合に型安全に扱えます。",
      keyPoints: ['APIレスポンス', '動的キー']
    },
    {
      id: 'indexsig-caution',
      type: 'indexsig',
      name: '注意点と設計上のポイント',
      description: 'numberキーはstringにも代入できるが逆は不可',
      example: `type NumIndex = { [key: number]: string }\nconst obj: NumIndex = { 1: 'one', 2: 'two' }\nobj[3] = 'three';\nobj['4'] = 'four'; // OK（numberキーもstringに変換）\nobj['five'] = 5; // エラー: 値の型がstringでない`,
      correctUsage: "obj[4] = 'four'; // OK",
      incorrectUsage: "obj['five'] = 5; // 値の型がstringでないとエラー",
      explanation: "numberキーも内部的にはstringとして扱われますが、stringキー型にはnumberキーは代入できません。",
      keyPoints: ['number→stringはOK', 'string→numberは不可']
    }
  ]
};

export const readonlyData = {
  id: 'readonly',
  title: 'readonly修飾子',
  description: 'readonly修飾子は、プロパティの変更を禁止するためのものです。',
  keyPoints: [
    'プロパティの変更を禁止する',
    '変数の再代入を禁止する',
    '型をanyにする',
    'プロパティ名を変更する'
  ],
  examples: [
    {
      id: 'readonly-basic',
      type: 'readonly',
      name: '基本構文',
      description: 'readonly修飾子の基本的な使い方',
      example: 'type User = { readonly name: string };\nconst user: User = { name: "Takuya" };',
      correctUsage: 'type User = { readonly name: string };\nconst user: User = { name: "Takuya" };',
      incorrectUsage: 'type User = { readonly name: string };\nconst user: User = { name: "Takuya", age: 36 }; // プロパティが追加されている',
      explanation: 'readonlyはプロパティの変更を禁止します。',
      keyPoints: ['プロパティの変更禁止', '型をanyにする']
    },
    {
      id: 'readonly-vs-const',
      type: 'readonly',
      name: 'readonlyとconstの違い',
      description: 'readonlyは変数の再代入を禁止するが、constは再代入不可の定数',
      example: 'const user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可\nconst user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: const変数は再代入不可',
      correctUsage: 'const user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可',
      incorrectUsage: 'const user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: const変数は再代入不可',
      explanation: 'readonlyは変数の再代入を禁止するが、constは再代入不可の定数です。',
      keyPoints: ['変数の再代入禁止', '定数との違い']
    },
    {
      id: 'readonly-vs-let',
      type: 'readonly',
      name: 'readonlyとletの違い',
      description: 'readonlyは変数の再代入を禁止するが、letは再代入可能',
      example: 'let user: User = { name: "Takuya" };\nuser.name = "Yuki"; // OK: letは再代入可能\nconst user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可',
      correctUsage: 'let user: User = { name: "Takuya" };\nuser.name = "Yuki"; // OK: letは再代入可能',
      incorrectUsage: 'const user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可',
      explanation: 'readonlyは変数の再代入を禁止するが、letは再代入可能です。',
      keyPoints: ['変数の再代入禁止', '再代入可能との違い']
    },
    {
      id: 'readonly-vs-class',
      type: 'readonly',
      name: 'readonlyとクラスの違い',
      description: 'readonlyはプロパティの変更を禁止するが、クラスのプロパティは再代入可能',
      example: 'type User = { readonly name: string };\nconst user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可\nclass User { name: string; }\nconst user: User = new User();\nuser.name = "Yuki"; // OK: クラスのプロパティは再代入可能',
      correctUsage: 'type User = { readonly name: string };\nconst user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可',
      incorrectUsage: 'const user: User = { name: "Takuya" };\nuser.name = "Yuki"; // エラー: readonlyプロパティは変更不可',
      explanation: 'readonlyはプロパティの変更を禁止するが、クラスのプロパティは再代入可能です。',
      keyPoints: ['プロパティの変更禁止', 'クラスのプロパティとの違い']
    }
  ]
};

// TypeScript unknown型の学習データ
export const unknownTypeData = {
  id: 'unknown',
  title: 'unknown型',
  description: 'unknown型は「型が不明であることを明示的に示すための型」です。TypeScript 3.0から導入され、any型よりも安全に「何でも受け取れる」用途で使われます。',
  keyPoints: [
    'unknown型はどんな値でも代入できる',
    'any型と違い、プロパティアクセスや関数呼び出しは型チェックが必要',
    '型ガードや型アサーションで安全に扱う',
    'APIレスポンスや外部入力など「何が来るかわからない」ケースに最適',
    '型安全なプログラミングを促進する'
  ],
  examples: [
    {
      id: 'unknown-basic',
      type: 'any',
      name: 'unknown型の基本',
      description: 'どんな値でも代入できるが、直接操作はできない',
      example: 'let value: unknown;\nvalue = 123;\nvalue = "hello";\nvalue = { foo: "bar" };',
      correctUsage: 'let value: unknown; value = 123;',
      incorrectUsage: 'let value: unknown; value.toFixed(1); // エラー',
      explanation: 'unknown型はany型と同様にどんな値でも代入できますが、型チェックなしでプロパティやメソッドにアクセスするとエラーになります。',
      keyPoints: ['どんな値でも代入可能', '直接プロパティアクセス不可'],
      warnings: ['型チェックなしの操作はエラー']
    },
    {
      id: 'unknown-vs-any',
      type: 'any',
      name: 'any型との違い',
      description: 'any型は何でもできるが危険、unknown型は安全性が高い',
      example: 'let x: any = 123;\nx.toFixed(1); // OK（危険）\nlet y: unknown = 123;\ny.toFixed(1); // エラー（安全）',
      correctUsage: 'let y: unknown = 123; if (typeof y === "number") { y.toFixed(1); }',
      incorrectUsage: 'let y: unknown = 123; y.toFixed(1); // エラー',
      explanation: 'any型は型チェックを無効化するため危険ですが、unknown型は型チェックを強制するため安全です。',
      keyPoints: ['any型は型安全性が低い', 'unknown型は型安全性が高い'],
      warnings: ['any型の乱用は危険']
    },
    {
      id: 'unknown-typeof-guard',
      type: 'any',
      name: 'typeofによる型ガード',
      description: 'typeofで型を判定してから操作する',
      example: 'let y: unknown = 123;\nif (typeof y === "number") {\n  y.toFixed(1); // OK\n}',
      correctUsage: 'if (typeof y === "number") { y.toFixed(1); }',
      incorrectUsage: 'y.toFixed(1); // 型チェックなしはエラー',
      explanation: 'unknown型の値を使うには、typeofやinstanceofなどで型を判定する必要があります。',
      keyPoints: ['型ガード必須', 'typeofやinstanceofを活用'],
      warnings: ['型チェックを省略するとエラー']
    },
    {
      id: 'unknown-assertion',
      type: 'any',
      name: '型アサーション',
      description: 'asを使って型を明示的に指定する',
      example: '(y as number).toFixed(1);',
      correctUsage: '(y as number).toFixed(1);',
      incorrectUsage: 'y.toFixed(1); // 型チェックなしはエラー',
      explanation: '型アサーションを使うことで、unknown型の値を特定の型として扱うことができます。ただし、型の保証は自己責任です。',
      keyPoints: ['型アサーションで明示的に型指定'],
      warnings: ['誤ったアサーションは実行時エラーの原因']
    }
  ]
};

// TypeScript async/awaitの学習データ
export const asyncAwaitData = {
  id: 'async-await',
  title: '非同期のAsync/Await',
  description: 'async/awaitはPromiseベースの非同期処理を直感的・同期的に記述できる構文です。TypeScriptでも利用でき、戻り値の型も明確にできます。',
  keyPoints: [
    'async functionで関数の戻り値は必ずPromise<T>型になる',
    'awaitはPromiseの解決を「待つ」構文で、async関数内でのみ使用可能',
    '即時実行関数(async () => { ... })()でグローバルawaitも可能',
    'then/catchとの互換性があり、Promiseチェーンも利用可能',
    'エラー処理にはtry...catch、複数PromiseはPromise.all()が便利',
    '直列awaitはパフォーマンス低下に注意'
  ],
  examples: [
    {
      id: 'async-basic',
      type: 'any',
      name: '基本的なasync/await関数',
      description: 'async functionでPromiseを返す非同期関数を定義',
      example: 'async function asyncFunc(): Promise<string> {\n  const result = await fetchFromServer("111");\n  return `The result: ${result.success}`;\n}',
      correctUsage: 'async function asyncFunc(): Promise<string> {\n  const result = await fetchFromServer("111");\n  return `The result: ${result.success}`;\n}',
      incorrectUsage: 'function asyncFunc() {\n  const result = await fetchFromServer("111");\n  return `The result: ${result.success}`;\n}',
      explanation: 'async functionでなければawaitは使えません。async functionは常にPromiseを返します。',
      keyPoints: ['async functionでawaitが使える', '戻り値はPromise型'],
      warnings: ['asyncなしでawaitはエラー']
    },
    {
      id: 'await-outside-async',
      type: 'any',
      name: 'awaitの誤用例',
      description: 'async function外でawaitを使うとエラー',
      example: 'const result = await fetchFromServer("111");',
      correctUsage: '(async () => {\n  const result = await fetchFromServer("111");\n})();',
      incorrectUsage: 'const result = await fetchFromServer("111"); // エラー',
      explanation: 'awaitはasync function内、または即時実行async関数内でのみ使えます。',
      keyPoints: ['awaitはasync function内限定'],
      warnings: ['グローバルawaitは即時実行関数で']
    },
    {
      id: 'async-error-handling',
      type: 'any',
      name: 'エラー処理の例',
      description: 'try...catchでasync/awaitのエラーを捕捉',
      example: 'async function fetchData() {\n  try {\n    const res = await fetchFromServer("id");\n    return res;\n  } catch (e) {\n    console.error(e);\n  }\n}',
      correctUsage: 'try { await fetchFromServer("id"); } catch (e) { console.error(e); }',
      incorrectUsage: 'const res = await fetchFromServer("id"); // エラー未処理',
      explanation: 'async/awaitのエラーはtry...catchで捕捉できます。catchしないと未処理例外になります。',
      keyPoints: ['try...catchでエラー処理'],
      warnings: ['エラー未処理は危険']
    },
    {
      id: 'async-promise-all',
      type: 'any',
      name: 'Promise.allとの併用',
      description: '複数のPromiseを同時にawait',
      example: 'const [a, b] = await Promise.all([fetchFromServer("1"), fetchFromServer("2")]);',
      correctUsage: 'const [a, b] = await Promise.all([fetchFromServer("1"), fetchFromServer("2")]);',
      incorrectUsage: 'const a = await fetchFromServer("1");\nconst b = await fetchFromServer("2"); // 直列で遅い',
      explanation: '複数の非同期処理はPromise.allで並列実行が効率的です。',
      keyPoints: ['Promise.allで並列実行'],
      warnings: ['直列awaitはパフォーマンス低下']
    }
  ]
};

// TypeScript 型定義ファイル（.d.ts）の学習データ
export const typeDefinitionData = {
  id: 'type-definition',
  title: '型定義ファイル（.d.ts）',
  description: '型定義ファイル（.d.ts）は、JavaScriptライブラリをTypeScriptで型安全に使うための橋渡しとなるファイルです。@types経由での導入や自作も可能です。',
  keyPoints: [
    '@types/ライブラリ名 で多くの型定義がnpmに公開されている',
    '型定義が同梱されているライブラリもある',
    '型定義がない場合は自作.d.tsファイルで補える',
    '型定義を使うことでコンパイル時の安全性・保守性が向上',
    '自作型定義の詳細は別章で解説'
  ],
  examples: [
    {
      id: 'types-install',
      type: 'any',
      name: '@typesで型定義を導入',
      description: 'npmで型定義パッケージをインストール',
      example: 'npm install --save-dev @types/jquery',
      correctUsage: 'npm install --save-dev @types/jquery',
      incorrectUsage: 'npm install jquery-types',
      explanation: '@types/ライブラリ名 で多くの型定義が公開されています。',
      keyPoints: ['npmで型定義を追加'],
      warnings: ['スペルミスに注意']
    },
    {
      id: 'types-bundled',
      type: 'any',
      name: '型定義同梱ライブラリ',
      description: '一部のライブラリは型定義を同梱',
      example: 'npm install react',
      correctUsage: 'npm install react',
      incorrectUsage: 'npm install --save-dev @types/react',
      explanation: 'reactなど一部ライブラリは型定義が同梱されているため、@types/は不要です。',
      keyPoints: ['型定義同梱かどうか確認'],
      warnings: ['不要な@types/インストールに注意']
    },
    {
      id: 'types-custom',
      type: 'any',
      name: '自作型定義ファイル',
      description: '.d.tsファイルを自作して型安全に',
      example: '// lib/hello.js\nexports.hello = function(name) {\n  console.log(`Hello, ${name}`);\n}\n// lib/hello.d.ts\nexport function hello(name: string): void;',
      correctUsage: 'export function hello(name: string): void;',
      incorrectUsage: 'export function hello(name): void;',
      explanation: '型定義ファイルで引数や戻り値の型を明示できます。',
      keyPoints: ['.d.tsで型を明示'],
      warnings: ['型抜け・anyは避ける']
    },
    {
      id: 'types-error',
      type: 'any',
      name: '型定義がない場合のエラー',
      description: '型定義がないと型安全性が失われる',
      example: 'hello(); // 引数なしで呼び出し',
      correctUsage: 'hello("Taro");',
      incorrectUsage: 'hello(); // エラー',
      explanation: '型定義があれば引数なし呼び出しはエラーになります。',
      keyPoints: ['型定義で安全性向上'],
      warnings: ['型定義がないと型チェック不可']
    }
  ]
};

