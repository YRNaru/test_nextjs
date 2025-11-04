import { QuizCategory } from '@/components/Quiz';

export const quizCategories: QuizCategory[] = [
  {
    id: 'basic',
    title: 'Reactの基本',
    description: 'Reactの基本概念、コンポーネントの純粋性、createRootによる初期化などについて学びます。',
    questions: [
      {
        id: 'q1',
        category: 'Reactの基本',
        question: 'Reactアプリを初期化するために使うAPIはどれ？',
        code: '',
        options: ['createRoot', 'createElement', 'render', 'mount'],
        correctAnswer: 0,
        explanation: 'createRootはReact DOMのクライアントAPIで、Reactアプリのルートを作成します。',
        type: 'other'
      },
      {
        id: 'q2',
        category: 'Reactの基本',
        question: 'コンポーネントの重要な特性として正しいものはどれ？',
        code: '',
        options: ['純粋関数であるべき', '常に副作用を持つ', '毎回異なる結果を返す', 'グローバル変数を変更する'],
        correctAnswer: 0,
        explanation: 'コンポーネントは純粋関数として定義し、同じ入力に対して常に同じ出力を返すべきです。',
        type: 'component'
      },
      {
        id: 'q3',
        category: 'Reactの基本',
        question: 'コンポーネントを呼び出すのは誰？',
        code: '',
        options: ['React自身', '開発者が直接呼び出す', 'ブラウザ', 'JavaScriptエンジン'],
        correctAnswer: 0,
        explanation: 'コンポーネントはJSXで記述することで、Reactが必要なタイミングで呼び出します。',
        type: 'other'
      },
      {
        id: 'q4',
        category: 'Reactの基本',
        question: '複数の要素を返す場合に使うReactの仕組みはどれ？',
        code: '',
        options: ['Fragment', 'div要素', '配列', 'オブジェクト'],
        correctAnswer: 0,
        explanation: 'Fragment（<></>）を使うことで、余計なDOMノードを増やさずに複数要素を返せます。',
        type: 'component'
      }
    ]
  },
  {
    id: 'component',
    title: 'コンポーネント',
    description: '関数コンポーネントの定義、イベントハンドラ、JSXの使い方について学びます。',
    questions: [
      {
        id: 'q5',
        category: 'コンポーネント',
        question: 'Reactの関数コンポーネントの正しい定義方法はどれ？',
        code: '',
        options: [
          'function Hello() { return <div>Hello</div>; }',
          'const Hello = () => <div>Hello</div>;',
          'class Hello extends React.Component { render() { return <div>Hello</div>; } }',
          'Hello = () => <div>Hello</div>'
        ],
        correctAnswer: 1,
        explanation: 'Reactの関数コンポーネントはconst Hello = () => <div>Hello</div>; のように定義します。',
        type: 'component'
      },
      {
        id: 'q6',
        category: 'コンポーネント',
        question: 'onClickイベントハンドラの正しい割り当て方はどれ？',
        code: '',
        options: [
          '<div onclick={onClick}>クリック</div>',
          '<div onClick={onClick()}>クリック</div>',
          '<div onClick={onClick}>クリック</div>',
          '<div click={onClick}>クリック</div>'
        ],
        correctAnswer: 2,
        explanation: 'ReactではonClick={onClick}のようにキャメルケースで割り当てます。',
        type: 'event'
      },
      {
        id: 'q7',
        category: 'コンポーネント',
        question: 'コンポーネントを他ファイルで使えるようにするには？',
        code: '',
        options: ['export Hello;', 'export default Hello;', 'module.exports = Hello;', 'import Hello from "./Hello";'],
        correctAnswer: 1,
        explanation: 'export default Hello; で他ファイルからimportできるようになります。',
        type: 'component'
      },
      {
        id: 'q8',
        category: 'コンポーネント',
        question: '関数コンポーネントの戻り値として正しいものはどれ？',
        code: '',
        options: ['文字列', '数値', 'JSX', '配列'],
        correctAnswer: 2,
        explanation: 'Reactの関数コンポーネントはJSXを返します。',
        type: 'component'
      }
    ]
  },
  {
    id: 'props',
    title: 'Props（プロップス）',
    description: '親から子へのデータの受け渡し、propsの一方向フロー、childrenについて学びます。',
    questions: [
      {
        id: 'q9',
        category: 'Props',
        question: '親コンポーネントから子コンポーネントに値を渡す仕組みはどれ？',
        code: '',
        options: ['state', 'props', 'context', 'ref'],
        correctAnswer: 1,
        explanation: '親→子のデータ渡しにはpropsを使います。',
        type: 'props'
      },
      {
        id: 'q10',
        category: 'Props',
        question: 'propsの特徴として正しいものはどれ？',
        code: '',
        options: ['親から子へ一方向', '子から親へ一方向', '双方向', 'どちらでもない'],
        correctAnswer: 0,
        explanation: 'propsは親から子への一方向データフローです。',
        type: 'props'
      },
      {
        id: 'q11',
        category: 'Props',
        question: 'props.childrenの用途は？',
        code: '',
        options: ['タグ内の要素を受け取る', '親のstateを参照する', 'イベントをバインドする', 'CSSを適用する'],
        correctAnswer: 0,
        explanation: 'props.childrenはタグ内の要素を受け取るための特別なpropsです。',
        type: 'props'
      },
      {
        id: 'q12',
        category: 'Props',
        question: '子コンポーネントからpropsを書き換えようとするとどうなる？',
        code: '',
        options: ['エラーになる', '自動的に親も更新される', '何も起きない', '再レンダリングされる'],
        correctAnswer: 0,
        explanation: 'propsは読み取り専用なので、子から書き換えようとするとエラーになります。',
        type: 'props'
      }
    ]
  },
  {
    id: 'context',
    title: 'Context（コンテキスト）',
    description: 'Contextの作成、Provider、useContextフックの使い方について学びます。',
    questions: [
      {
        id: 'q13',
        category: 'Context',
        question: 'Contextを作成する関数はどれ？',
        code: '',
        options: ['createContext', 'useContext', 'createProvider', 'useProvider'],
        correctAnswer: 0,
        explanation: 'createContext()でContextを作成します。',
        type: 'context'
      },
      {
        id: 'q14',
        category: 'Context',
        question: 'Contextの値を供給するために使うのは？',
        code: '',
        options: ['<Context.Provider>', '<Context.Consumer>', 'useContext()', '<Provider>'],
        correctAnswer: 0,
        explanation: 'Providerでvalueを指定して値を供給します。',
        type: 'context'
      },
      {
        id: 'q15',
        category: 'Context',
        question: 'Contextの値を関数コンポーネントで取得する主流の方法は？',
        code: '',
        options: ['useContext()', '<Context.Consumer>', 'props', 'useState()'],
        correctAnswer: 0,
        explanation: 'useContext()フックで直接取得できます。',
        type: 'context'
      },
      {
        id: 'q16',
        category: 'Context',
        question: 'Contextの主な利点はどれ？',
        code: '',
        options: ['複数階層でデータ共有', 'propsバケツリレーの解消', 'グローバルな状態管理', 'すべて正しい'],
        correctAnswer: 3,
        explanation: 'Contextは複数階層でデータ共有やpropsバケツリレー解消に役立ちます。',
        type: 'context'
      }
    ]
  },
  {
    id: 'hooks',
    title: 'Hooks（フック）',
    description: 'React Hooksの基本概念、カテゴリ分類、使い方のルールについて学びます。',
    questions: [
      {
        id: 'q17',
        category: 'Hooks',
        question: 'useStateの主な用途は？',
        code: '',
        options: ['状態管理', '副作用処理', 'メモ化', 'DOM参照'],
        correctAnswer: 0,
        explanation: 'useStateは状態管理用のフックです。',
        type: 'hook'
      },
      {
        id: 'q18',
        category: 'Hooks',
        question: 'useEffectの主な用途は？',
        code: '',
        options: ['副作用処理', '状態管理', 'メモ化', 'イベント登録'],
        correctAnswer: 0,
        explanation: 'useEffectは副作用処理（データ取得、購読など）に使います。',
        type: 'hook'
      },
      {
        id: 'q19',
        category: 'Hooks',
        question: 'useCallbackやuseMemoの主な利点は？',
        code: '',
        options: ['パフォーマンス最適化', '状態管理', '副作用処理', '型定義'],
        correctAnswer: 0,
        explanation: 'useCallbackやuseMemoはメモ化によるパフォーマンス最適化に使います。',
        type: 'hook'
      },
      {
        id: 'q20',
        category: 'Hooks',
        question: 'Hooksを使う際のルールとして正しいものは？',
        code: '',
        options: ['関数コンポーネントのトップレベルでのみ使用', 'if文の中で使う', 'for文の中で使う', 'クラスコンポーネントで使う'],
        correctAnswer: 0,
        explanation: 'Hooksは関数コンポーネントのトップレベルでのみ使う必要があります。',
        type: 'hook'
      }
    ]
  },
  {
    id: 'useState',
    title: 'useState',
    description: 'useStateフックによる状態管理、更新関数の使い方について学びます。',
    questions: [
      {
        id: 'q21',
        category: 'useState',
        question: 'useStateの戻り値として正しいものはどれ？',
        code: '',
        options: ['状態変数のみ', '更新関数のみ', '[状態変数, 更新関数]の配列', 'オブジェクト'],
        correctAnswer: 2,
        explanation: 'useStateは[状態, 更新関数]の配列を返します。',
        type: 'state'
      },
      {
        id: 'q22',
        category: 'useState',
        question: '状態を更新する正しい方法はどれ？',
        code: '',
        options: ['count = 1', 'setCount(1)', 'useState(1)', 'count++'],
        correctAnswer: 1,
        explanation: 'setCount(新しい値)で状態を更新します。',
        type: 'state'
      },
      {
        id: 'q23',
        category: 'useState',
        question: '前回の状態に依存して状態を更新する安全な方法は？',
        code: '',
        options: ['setCount(count + 1)', 'setCount(prev => prev + 1)', 'count = count + 1', 'setCount(count++)'],
        correctAnswer: 1,
        explanation: 'setCount(prev => prev + 1)のように関数で更新すると安全です。',
        type: 'state'
      },
      {
        id: 'q24',
        category: 'useState',
        question: 'useStateの初期値として正しいものはどれ？',
        code: '',
        options: ['useState()', 'useState(0)', 'useState', 'useState(null)'],
        correctAnswer: 1,
        explanation: '初期値は必ず指定しましょう。',
        type: 'state'
      }
    ]
  },
  {
    id: 'useReducer',
    title: 'useReducer',
    description: 'useReducerによる複雑な状態管理、reducer関数、dispatchの使い方について学びます。',
    questions: [
      {
        id: 'q25',
        category: 'useReducer',
        question: 'useReducerの主な用途は？',
        code: '',
        options: ['複雑な状態管理', '副作用処理', 'メモ化', 'DOM参照'],
        correctAnswer: 0,
        explanation: 'useReducerは複雑な状態管理や明確な状態遷移に使います。',
        type: 'hook'
      },
      {
        id: 'q26',
        category: 'useReducer',
        question: 'reducer関数の特徴は？',
        code: '',
        options: ['純粋関数', '副作用を持つ', '非同期関数', 'グローバル変数を使う'],
        correctAnswer: 0,
        explanation: 'reducerは純粋関数であるべきです。',
        type: 'hook'
      },
      {
        id: 'q27',
        category: 'useReducer',
        question: 'dispatchの役割は？',
        code: '',
        options: ['状態を直接変更', 'アクションをreducerに送る', '副作用を発生させる', 'DOMを操作する'],
        correctAnswer: 1,
        explanation: 'dispatchはアクションをreducerに送って状態を更新します。',
        type: 'hook'
      },
      {
        id: 'q28',
        category: 'useReducer',
        question: 'useReducerがuseStateより適しているのはどんな場合？',
        code: '',
        options: ['状態遷移が複雑', '状態が単純', '副作用が多い', 'UIが小さい'],
        correctAnswer: 0,
        explanation: '状態遷移が複雑な場合はuseReducerが適しています。',
        type: 'hook'
      }
    ]
  },
  {
    id: 'useEffect',
    title: 'useEffect',
    description: 'useEffectによる副作用処理、依存配列、クリーンアップ関数について学びます。',
    questions: [
      {
        id: 'q29',
        category: 'useEffect',
        question: 'useEffectの主な用途はどれ？',
        code: '',
        options: ['副作用の管理', '状態管理', '値のメモ化', 'イベント登録'],
        correctAnswer: 0,
        explanation: 'useEffectは副作用（API通信、タイマー、DOM操作など）の管理に使います。',
        type: 'hook'
      },
      {
        id: 'q30',
        category: 'useEffect',
        question: 'useEffectのクリーンアップ関数はどのタイミングで実行される？',
        code: '',
        options: ['アンマウント時', 'マウント時', '依存配列の値が変わる直前', '常に実行されない'],
        correctAnswer: 0,
        explanation: 'クリーンアップ関数はアンマウント時や依存値が変わる直前に実行されます。',
        type: 'hook'
      },
      {
        id: 'q31',
        category: 'useEffect',
        question: 'useEffectの依存配列を[]（空配列）にした場合、どのタイミングで実行される？',
        code: '',
        options: ['初回マウント時のみ', '毎回描画時', '依存値が変わるたび', '実行されない'],
        correctAnswer: 0,
        explanation: '空配列[]の場合は初回マウント時のみ実行されます。',
        type: 'hook'
      },
      {
        id: 'q32',
        category: 'useEffect',
        question: '描画前に副作用を実行したい場合に使うべきフックは？',
        code: '',
        options: ['useLayoutEffect', 'useEffect', 'useMemo', 'useCallback'],
        correctAnswer: 0,
        explanation: '描画前に副作用を実行したい場合はuseLayoutEffectを使います。',
        type: 'hook'
      }
    ]
  },
  {
    id: 'useContext',
    title: 'useContext',
    description: 'useContextフックによるContext値の取得、Providerとの連携について学びます。',
    questions: [
      {
        id: 'q33',
        category: 'useContext',
        question: 'useContextの主な用途はどれ？',
        code: '',
        options: ['Contextの値を取得', '副作用の管理', '値のメモ化', 'イベント登録'],
        correctAnswer: 0,
        explanation: 'useContextはContextの値を取得するためのフックです。',
        type: 'hook'
      },
      {
        id: 'q34',
        category: 'useContext',
        question: 'useContextを使うと何が不要になる？',
        code: '',
        options: ['Context.Consumer', 'Provider', 'useEffect', 'useMemo'],
        correctAnswer: 0,
        explanation: 'useContextを使うことでContext.Consumerが不要になります。',
        type: 'hook'
      },
      {
        id: 'q35',
        category: 'useContext',
        question: 'Contextの値が変わるとどうなる？',
        code: '',
        options: ['参照しているコンポーネントが再レンダリングされる', '何も起きない', 'エラーになる', '再レンダリングされない'],
        correctAnswer: 0,
        explanation: 'Contextの値が変わると、それを参照しているコンポーネントが再レンダリングされます。',
        type: 'hook'
      },
      {
        id: 'q36',
        category: 'useContext',
        question: 'TypeScriptと併用する主な利点は？',
        code: '',
        options: ['型安全にデータアクセスできる', 'パフォーマンスが上がる', '副作用が減る', '何も変わらない'],
        correctAnswer: 0,
        explanation: '型定義を使うことで型安全にContextの値へアクセスできます。',
        type: 'hook'
      }
    ]
  },
  {
    id: 'performance',
    title: 'パフォーマンス最適化',
    description: 'useCallback、useMemoによるメモ化、パフォーマンス最適化について学びます。',
    questions: [
      {
        id: 'q37',
        category: 'パフォーマンス最適化',
        question: 'useCallbackの主な用途はどれ？',
        code: '',
        options: ['値のメモ化', '関数のメモ化', '副作用の管理', '状態管理'],
        correctAnswer: 1,
        explanation: 'useCallbackは「関数のメモ化」に使います。',
        type: 'hook'
      },
      {
        id: 'q38',
        category: 'パフォーマンス最適化',
        question: 'useMemoの主な用途はどれ？',
        code: '',
        options: ['値のメモ化', '関数のメモ化', '副作用の管理', '状態管理'],
        correctAnswer: 0,
        explanation: 'useMemoは「値のメモ化」に使います。',
        type: 'hook'
      },
      {
        id: 'q39',
        category: 'パフォーマンス最適化',
        question: 'useCallbackとuseMemoの違いは？',
        code: '',
        options: ['useCallbackは関数、useMemoは値をメモ化', 'どちらも値をメモ化', 'どちらも関数をメモ化', '違いはない'],
        correctAnswer: 0,
        explanation: 'useCallbackは「関数」、useMemoは「値」をメモ化します。',
        type: 'hook'
      },
      {
        id: 'q40',
        category: 'パフォーマンス最適化',
        question: 'useCallbackと一緒に使うと効果的なものはどれ？',
        code: '',
        options: ['React.memo', 'useState', 'useEffect', 'useRef'],
        correctAnswer: 0,
        explanation: 'React.memoと組み合わせることで、子コンポーネントの無駄な再描画を防げます。',
        type: 'hook'
      }
    ]
  },
  {
    id: 'useRef',
    title: 'useRef',
    description: 'useRefによるDOM参照、再レンダーを伴わない値の保持について学びます。',
    questions: [
      {
        id: 'q41',
        category: 'useRef',
        question: 'useRefの主な用途はどれ？',
        code: '',
        options: ['再描画せずに値やDOM要素を保持', '状態管理', '副作用の管理', '値のメモ化'],
        correctAnswer: 0,
        explanation: 'useRefは再描画せずに値やDOM要素を保持するためのフックです。',
        type: 'hook'
      },
      {
        id: 'q42',
        category: 'useRef',
        question: 'useRefで値や要素にアクセスするプロパティは？',
        code: '',
        options: ['.current', '.value', '.ref', '.data'],
        correctAnswer: 0,
        explanation: 'useRefで値や要素にアクセスするには.currentプロパティを使います。',
        type: 'hook'
      },
      {
        id: 'q43',
        category: 'useRef',
        question: 'DOM要素にアクセスしたい場合、どのようにrefを使う？',
        code: '',
        options: ['ref={myRef}', 'value={myRef}', 'onChange={myRef}', 'useState(myRef)'],
        correctAnswer: 0,
        explanation: 'DOM要素にアクセスするにはref={myRef}のように指定します。',
        type: 'hook'
      },
      {
        id: 'q44',
        category: 'useRef',
        question: 'useImperativeHandleの主な用途は？',
        code: '',
        options: ['親から子の関数やデータをref経由で呼び出す', '副作用の管理', '値のメモ化', '再レンダリングを強制する'],
        correctAnswer: 0,
        explanation: 'useImperativeHandleは親から子の関数やデータをref経由で呼び出すために使います。',
        type: 'hook'
      }
    ]
  },
  {
    id: 'customHook',
    title: 'カスタムフック',
    description: 'カスタムフックの作成、useで始まる命名規則、ロジックの再利用について学びます。',
    questions: [
      {
        id: 'q45',
        category: 'カスタムフック',
        question: 'カスタムフックの命名規則として正しいものは？',
        code: '',
        options: ['useで始める', 'customで始める', '任意の名前', 'Reactで始める'],
        correctAnswer: 0,
        explanation: 'カスタムフックはuseで始める必要があります。',
        type: 'custom'
      },
      {
        id: 'q46',
        category: 'カスタムフック',
        question: 'カスタムフックの主な利点はどれ？',
        code: '',
        options: ['ロジックの再利用', 'UIの装飾', 'API通信', '型定義の省略'],
        correctAnswer: 0,
        explanation: 'カスタムフックはロジックの再利用・共通化に役立ちます。',
        type: 'custom'
      },
      {
        id: 'q47',
        category: 'カスタムフック',
        question: 'カスタムフック内で呼び出してはいけない場所は？',
        code: '',
        options: ['条件分岐やループの中', 'トップレベル', 'return文の外', '関数の外'],
        correctAnswer: 0,
        explanation: 'フックは条件分岐やループの中で呼び出してはいけません。',
        type: 'custom'
      },
      {
        id: 'q48',
        category: 'カスタムフック',
        question: 'useDebugValueの主な用途は？',
        code: '',
        options: ['開発ツールで状態を可視化', 'API通信', '副作用の管理', 'UIの装飾'],
        correctAnswer: 0,
        explanation: 'useDebugValueはReact Developer Toolsで状態を可視化するために使います。',
        type: 'custom'
      }
    ]
  }
];
