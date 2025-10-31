import { LearningSection, PracticeQuestion } from '@/types/react';

export const basicData: LearningSection = {
  id: 'basic',
  title: 'Reactの基本',
  description: 'Reactは、UIを構築するためのライブラリです。この節では、Reactアプリケーションの構成要素（HTMLの土台、JSX、描画処理）とその基礎的な仕組みについて学びます。',
  keyPoints: [
    'JSX（JavaScript XML）：HTMLのような構文をJavaScript内で使用できる',
    '単一ルート構造：Reactアプリは <div id="root"> に全て描画される',
    'ReactDOMによる描画：ReactDOM.createRoot().render() を用いて仮想DOMを実DOMへ描画'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'other',
      name: '描画の基本構造（index.tsx）',
      description: 'Reactアプリのエントリーポイントで、React要素を#rootに描画します。',
      example: `const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);\nroot.render(<App />);`,
      correctUsage: `// 正しい使用法\nroot.render(<App />);`,
      incorrectUsage: `// 誤った使用法\nroot.render(App); // JSXで渡す必要がある`,
      explanation: 'ReactDOM.createRoot()でルート要素を作成し、render()でReactコンポーネントを描画します。',
      keyPoints: ['ReactDOM.createRoot()', 'renderメソッド', '#rootへの描画'],
      benefits: ['仮想DOMを効率的に実DOMへ描画できる', 'アプリのエントリーポイントが明確']
    },
    {
      id: 'ex2',
      type: 'component',
      name: 'シンプルなJSX（App.tsx）',
      description: 'JSXを使ってシンプルなUIを記述します。',
      example: `const App = () => <h1>Hello, React!</h1>;\nexport default App;`,
      correctUsage: `// 正しい使用法\nconst App = () => <h1>Hello</h1>;`,
      incorrectUsage: `// 誤った使用法\nconst App = () => { return 'Hello'; }; // JSXで返す必要がある`,
      explanation: 'JSXはHTMLライクな構文で、ReactコンポーネントのUIを直感的に記述できます。',
      keyPoints: ['JSX構文', '関数コンポーネント', 'export default'],
      benefits: ['直感的なUI記述', '再利用性の高いUI部品を作れる']
    },
    {
      id: 'ex3',
      type: 'component',
      name: '複数要素を返すときはFragmentでラップ',
      description: '複数の要素を返す場合、<></>（Fragment）でラップします。',
      example: `const App = () => (\n  <>\n    <h1>タイトル</h1>\n    <p>説明文です。</p>\n  </>\n);`,
      correctUsage: `// 正しい使用法\nreturn (<>\n  <h1>タイトル</h1>\n  <p>説明文</p>\n</>);`,
      incorrectUsage: `// 誤った使用法\nreturn (<h1>タイトル</h1><p>説明文</p>); // ルート要素が複数でエラー`,
      explanation: 'Fragment（<></>）で囲むことで、余計なDOMノードを増やさずに複数要素を返せます。',
      keyPoints: ['Fragment', '複数要素の返却', '余計なDOMを増やさない'],
      benefits: ['余計なDOMノードを増やさずに複数要素を返せる', '柔軟なUI構成が可能']
    }
  ]
};

export const basicPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'ReactアプリをHTMLのどこに描画するのが一般的ですか？',
    code: '',
    options: ['<div id="root">', '<body>', '<main>', '<div id="app">'],
    correctAnswer: 0,
    explanation: 'Reactアプリは通常 <div id="root"> に描画されます。',
    type: 'other'
  },
  {
    id: 'q2',
    question: '複数の要素を返す場合に使うReactの仕組みはどれ？',
    code: '',
    options: ['Fragment', 'Section', 'Array', 'Component'],
    correctAnswer: 0,
    explanation: 'Fragment（<></>）で複数要素をラップできます。',
    type: 'component'
  },
  {
    id: 'q3',
    question: 'JSXの特徴として正しいものはどれ？',
    code: '',
    options: ['HTMLライクな構文をJavaScript内で使える', 'JavaScriptのみに限定される', 'CSS専用の記法', 'XMLファイルを直接読み込む'],
    correctAnswer: 0,
    explanation: 'JSXはHTMLライクな構文をJavaScript内で使える仕組みです。',
    type: 'component'
  },
  {
    id: 'q4',
    question: 'ReactDOM.createRoot()の主な役割は？',
    code: '',
    options: ['Reactアプリのルートを作成する', 'スタイルを適用する', 'API通信を行う', 'イベントをバインドする'],
    correctAnswer: 0,
    explanation: 'ReactDOM.createRoot()はReactアプリのルートを作成します。',
    type: 'other'
  }
];

export const componentData: LearningSection = {
  id: 'component',
  title: 'Component(コンポーネント)',
  description: 'ReactではUIをコンポーネント単位で分割して構築します。本節では、関数コンポーネントを定義して表示させる基本的な手順を、Hello.tsxという簡単な例を通じて説明しています。',
  keyPoints: [
    '関数ベースのコンポーネントを.tsxファイルで定義する',
    'コンポーネントは UI部品の再利用可能な単位',
    'イベントハンドラ（例：クリック時の処理）を関数の中で定義し、JSXに割り当てる',
    'コンポーネントはexport defaultで外部から利用可能にする',
    '.tsx内のJSX記述は戻り値として返すUI構造'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'component',
      name: 'Hello.tsx（クリックでアラート）',
      description: 'クリック時にアラートを表示するシンプルな関数コンポーネントの例です。',
      example: `const Hello = () => {\n  const onClick = () => alert('hello');\n  return <div onClick={onClick}>Hello, React</div>;\n};\nexport default Hello;`,
      correctUsage: `// 正しい使用法\n<Hello />`,
      incorrectUsage: `// 誤った使用法\nHello(); // ReactではJSXで呼び出す`,
      explanation: 'onClickイベントハンドラを定義し、JSXのdivに割り当てています。',
      keyPoints: ['関数コンポーネント', 'イベントハンドラ', 'export default'],
      benefits: ['シンプルなUI部品化', 'イベント処理の分離で保守性向上']
    },
    {
      id: 'ex2',
      type: 'other',
      name: 'index.tsxでHelloを表示',
      description: 'Helloコンポーネントをimportし、ReactDOM.renderで#rootに描画します。',
      example: `import ReactDOM from 'react-dom';\nimport Hello from './components/Hello';\n\nReactDOM.render(\n  <React.StrictMode>\n    <Hello />\n  </React.StrictMode>,\n  document.getElementById('root')\n);`,
      correctUsage: `// 正しい使用法\nReactDOM.render(<Hello />, ...);`,
      incorrectUsage: `// 誤った使用法\nReactDOM.render(Hello, ...); // JSXで渡す必要がある`,
      explanation: 'ReactDOM.renderでHelloコンポーネントを#rootに描画しています。',
      keyPoints: ['import', 'ReactDOM.render', 'React.StrictMode'],
      benefits: ['コンポーネントの再利用', 'アプリ全体の構成が明確']
    },
    {
      id: 'ex3',
      type: 'component',
      name: 'クリック処理を含む複数行JSX',
      description: '複数行のJSXとイベントハンドラを含む関数コンポーネントの例です。',
      example: `const Hello = () => {\n  const onClick = () => alert('clicked!');\n  return (\n    <section>\n      <h1 onClick={onClick}>Welcome</h1>\n      <p>Click the title above.</p>\n    </section>\n  );\n};`,
      correctUsage: `// 正しい使用法\nreturn (\n  <section>\n    <h1 onClick={onClick}>Welcome</h1>\n    <p>Click the title above.</p>\n  </section>\n);`,
      incorrectUsage: `// 誤った使用法\nreturn <h1 onClick={onClick}>Welcome</h1>\n<p>説明</p>; // ルート要素が複数でエラー`,
      explanation: '複数行のJSXを返す場合は()で囲み、イベントハンドラも割り当てられます。',
      keyPoints: ['複数行JSX', 'イベントハンドラ', 'section要素'],
      benefits: ['複雑なUIも部品化できる', '可読性・保守性の高い構造']
    }
  ]
};

export const componentPractice: PracticeQuestion[] = [
  {
    id: 'q1',
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
    id: 'q2',
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
    id: 'q3',
    question: 'コンポーネントを他ファイルで使えるようにするには？',
    code: '',
    options: [
      'export Hello;',
      'export default Hello;',
      'module.exports = Hello;',
      'import Hello from "./Hello";'
    ],
    correctAnswer: 1,
    explanation: 'export default Hello; で他ファイルからimportできるようになります。',
    type: 'component'
  },
  {
    id: 'q4',
    question: '関数コンポーネントの戻り値として正しいものはどれ？',
    code: '',
    options: [
      '文字列',
      '数値',
      'JSX',
      '配列'
    ],
    correctAnswer: 2,
    explanation: 'Reactの関数コンポーネントはJSXを返します。',
    type: 'component'
  }
];

export const propsData: LearningSection = {
  id: 'props',
  title: 'Props（プロップス）',
  description: 'Reactでは、propsを使うことで、親コンポーネントから子コンポーネントに値を渡すことができます。本節では、propsの基本的な使い方、データの受け渡し方法、制約、および再利用性の向上について解説されています。',
  keyPoints: [
    'propsは読み取り専用の引数で、親→子の一方向にデータを渡す',
    'コンポーネント関数の引数オブジェクトがprops',
    'propsを使えば、同じコンポーネントで異なる表示内容を実現できる',
    '子からpropsの内容を変更しようとするとエラーになる',
    'childrenというpropsを使えば、タグ内の要素を受け取れる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'props',
      name: 'Textコンポーネントがcontentを受け取って表示',
      description: 'propsでcontentを受け取り、pタグで表示するシンプルな例です。',
      example: `const Text = (props: { content: string }) => {\n  const { content } = props;\n  return <p>{content}</p>;\n};`,
      correctUsage: `// 正しい使用法\n<Text content=\"Hello\" />`,
      incorrectUsage: `// 誤った使用法\n<Text /> // contentが必須なのでエラー`,
      explanation: 'propsオブジェクトからcontentを分割代入し、pタグで表示しています。',
      keyPoints: ['propsの受け取り', '分割代入', '表示'],
      benefits: ['親から柔軟にデータを受け取れる', '再利用性の高い部品化']
    },
    {
      id: 'ex2',
      type: 'props',
      name: 'MessageコンポーネントからTextを2回呼び出す',
      description: '親コンポーネントから異なるpropsを渡してTextを複数回利用しています。',
      example: `const Message = () => {\n  return (\n    <div>\n      <Text content=\"This is parent component\" />\n      <Text content=\"Message uses Text component\" />\n    </div>\n  );\n};`,
      correctUsage: `// 正しい使用法\n<Text content=\"A\" />\n<Text content=\"B\" />`,
      incorrectUsage: `// 誤った使用法\n<Text /> // contentがないとエラー`,
      explanation: '同じTextコンポーネントに異なるcontentを渡して再利用しています。',
      keyPoints: ['親→子のデータ渡し', '再利用', '異なるprops'],
      benefits: ['同じ部品で多様な表示が可能', '保守性・拡張性が高い']
    },
    {
      id: 'ex3',
      type: 'props',
      name: 'childrenを使った汎用的なContainer',
      description: 'children propsを使って、タグ内の要素を受け取る汎用コンポーネントの例です。',
      example: `const Container = (props: { title: string; children: React.ReactNode }) => {\n  return (\n    <div>\n      <h1>{props.title}</h1>\n      <div>{props.children}</div>\n    </div>\n  );\n};`,
      correctUsage: `// 正しい使用法\n<Container title=\"見出し\">\n  <p>本文</p>\n</Container>`,
      incorrectUsage: `// 誤った使用法\n<Container /> // title, childrenがないとエラー`,
      explanation: 'props.childrenでタグ内の要素を受け取って表示できます。',
      keyPoints: ['children', '汎用コンポーネント', 'propsの活用'],
      benefits: ['柔軟なレイアウト', '汎用的なコンポーネント設計が可能']
    }
  ]
};

export const propsPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: '親コンポーネントから子コンポーネントに値を渡す仕組みはどれ？',
    code: '',
    options: ['state', 'props', 'context', 'ref'],
    correctAnswer: 1,
    explanation: '親→子のデータ渡しにはpropsを使います。',
    type: 'props'
  },
  {
    id: 'q2',
    question: 'propsの特徴として正しいものはどれ？',
    code: '',
    options: ['親から子へ一方向', '子から親へ一方向', '双方向', 'どちらでもない'],
    correctAnswer: 0,
    explanation: 'propsは親から子への一方向データフローです。',
    type: 'props'
  },
  {
    id: 'q3',
    question: 'props.childrenの用途は？',
    code: '',
    options: ['タグ内の要素を受け取る', '親のstateを参照する', 'イベントをバインドする', 'CSSを適用する'],
    correctAnswer: 0,
    explanation: 'props.childrenはタグ内の要素を受け取るための特別なpropsです。',
    type: 'props'
  },
  {
    id: 'q4',
    question: '子コンポーネントからpropsを書き換えようとするとどうなる？',
    code: '',
    options: ['エラーになる', '自動的に親も更新される', '何も起きない', '再レンダリングされる'],
    correctAnswer: 0,
    explanation: 'propsは読み取り専用なので、子から書き換えようとするとエラーになります。',
    type: 'props'
  }
];

export const contextData: LearningSection = {
  id: 'context',
  title: 'Context(コンテキスト)',
  description: 'ReactのContextは、コンポーネント間でグローバルにデータを共有するための仕組みです。通常のpropsでは親から子への明示的な受け渡しが必要ですが、Contextを使うことで複数階層をまたいだデータ共有が可能になります。',
  keyPoints: [
    'createContext()でContextを作成し、デフォルト値を指定',
    '値を供給するには <Context.Provider value={...}> を使用',
    '値を参照するには<Context.Consumer>またはuseContext()フックを使う',
    'propsのバケツリレーを解消できる',
    'Providerはネスト可能で、最も近いProviderの値が参照される'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'context',
      name: 'Contextの作成とProviderで値を渡す',
      description: 'createContextとProviderで値を渡す基本例です。',
      example: `const TitleContext = React.createContext('');\nconst Page = () => {\n  const title = 'React Book';\n  return (\n    <TitleContext.Provider value={title}>\n      <Header />\n    </TitleContext.Provider>\n  );\n};`,
      correctUsage: `const TitleContext = React.createContext('');\n<TitleContext.Provider value={title}>...</TitleContext.Provider>`,
      incorrectUsage: `<TitleContext.Provider>...</TitleContext.Provider> // valueがない`,
      explanation: 'Providerでvalueを指定して値を供給します。',
      keyPoints: ['createContext', 'Provider', 'value'],
      benefits: ['複数階層でデータ共有', 'propsバケツリレー解消']
    },
    {
      id: 'ex2',
      type: 'context',
      name: 'Consumerで値を参照する',
      description: 'ConsumerでContextの値を参照する例です。',
      example: `const Title = () => (\n  <TitleContext.Consumer>\n    {(title) => <h1>{title}</h1>}\n  </TitleContext.Consumer>\n);`,
      correctUsage: `<TitleContext.Consumer>{value => ...}</TitleContext.Consumer>`,
      incorrectUsage: `<TitleContext.Consumer /> // 関数を渡さないと値が取得できない`,
      explanation: 'Consumerの子に関数を渡して値を参照します。',
      keyPoints: ['Consumer', '関数として値を受け取る'],
      benefits: ['柔軟な値の参照', 'クラスコンポーネントでも利用可']
    },
    {
      id: 'ex3',
      type: 'context',
      name: 'useContextフックで値を取得する',
      description: 'useContextフックでContextの値を直接取得する例です。',
      example: `const user = useContext(UserContext);`,
      correctUsage: `const value = useContext(MyContext);`,
      incorrectUsage: `const value = MyContext; // useContextで取得する`,
      explanation: 'useContextでContextの値を直接取得できます。',
      keyPoints: ['useContext', '直接取得', '関数コンポーネントで便利'],
      benefits: ['簡潔な記述', '関数コンポーネントで主流']
    }
  ]
};

export const contextPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'Contextを作成する関数はどれ？',
    code: '',
    options: ['createContext', 'useContext', 'createProvider', 'useProvider'],
    correctAnswer: 0,
    explanation: 'createContext()でContextを作成します。',
    type: 'context'
  },
  {
    id: 'q2',
    question: 'Contextの値を供給するために使うのは？',
    code: '',
    options: ['<Context.Provider>', '<Context.Consumer>', 'useContext()', '<Provider>'],
    correctAnswer: 0,
    explanation: 'Providerでvalueを指定して値を供給します。',
    type: 'context'
  },
  {
    id: 'q3',
    question: 'Contextの値を関数コンポーネントで取得する主流の方法は？',
    code: '',
    options: ['useContext()', '<Context.Consumer>', 'props', 'useState()'],
    correctAnswer: 0,
    explanation: 'useContext()フックで直接取得できます。',
    type: 'context'
  },
  {
    id: 'q4',
    question: 'Contextの主な利点はどれ？',
    code: '',
    options: ['複数階層でデータ共有', 'propsバケツリレーの解消', 'グローバルな状態管理', 'すべて正しい'],
    correctAnswer: 3,
    explanation: 'Contextは複数階層でデータ共有やpropsバケツリレー解消に役立ちます。',
    type: 'context'
  }
];

export const hooksData: LearningSection = {
  id: 'hooks',
  title: 'Hooks（フック）',
  description: 'React Hooksは、関数コンポーネント内で状態管理やライフサイクル処理を可能にする仕組みです。Hooksによりクラスコンポーネントでしかできなかったことが関数コンポーネントでも扱えるようになり、より簡潔かつ再利用性の高い記述が可能になります。',
  keyPoints: [
    'React公式Hooksは主に10種類以上あり、状態管理・副作用処理・最適化・DOM操作などをサポート',
    '複数のHooksを組み合わせてカスタムHooks（独自フック）を実装できる',
    'Hooksは関数コンポーネントのトップレベルでのみ使用（ルール違反するとエラー）'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: '状態の管理（useState, useReducer）',
      description: 'useStateやuseReducerで状態を管理する例です。',
      example: `const [count, setCount] = useState(0);`,
      correctUsage: `const [count, setCount] = useState(0);`,
      incorrectUsage: `const [count, setCount] = useState(); // 初期値がない`,
      explanation: 'useStateで状態変数と更新関数を取得します。',
      keyPoints: ['useState', 'useReducer', '状態管理'],
      benefits: ['状態管理が簡単', 'UIとデータの同期']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: '副作用処理（useEffect）',
      description: 'useEffectで副作用処理（マウント時の処理など）を行う例です。',
      example: `useEffect(() => {\n  console.log('Component mounted');\n}, []);`,
      correctUsage: `useEffect(() => { /* 副作用処理 */ }, []);`,
      incorrectUsage: `useEffect(() => { /* 副作用処理 */ }); // 依存配列がない`,
      explanation: 'useEffectは副作用処理を記述し、依存配列で発火タイミングを制御します。',
      keyPoints: ['useEffect', '副作用', '依存配列'],
      benefits: ['副作用の明示的管理', 'マウント・アンマウント処理']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'メモ化（useCallback, useMemo）',
      description: 'useCallbackやuseMemoで関数や値のメモ化を行う例です。',
      example: `const memoizedFn = useCallback(() => doSomething(), [dependency]);`,
      correctUsage: `const memoizedFn = useCallback(() => doSomething(), [dependency]);`,
      incorrectUsage: `const memoizedFn = () => doSomething(); // useCallbackなし`,
      explanation: 'useCallbackで関数、useMemoで値をメモ化し、無駄な再生成を防ぎます。',
      keyPoints: ['useCallback', 'useMemo', 'メモ化'],
      benefits: ['パフォーマンス最適化', '無駄な再生成防止']
    }
  ]
};

export const hooksPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useStateの主な用途は？',
    code: '',
    options: ['状態管理', '副作用処理', 'メモ化', 'DOM参照'],
    correctAnswer: 0,
    explanation: 'useStateは状態管理用のフックです。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useEffectの主な用途は？',
    code: '',
    options: ['副作用処理', '状態管理', 'メモ化', 'イベント登録'],
    correctAnswer: 0,
    explanation: 'useEffectは副作用処理（データ取得、購読など）に使います。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'useCallbackやuseMemoの主な利点は？',
    code: '',
    options: ['パフォーマンス最適化', '状態管理', '副作用処理', '型定義'],
    correctAnswer: 0,
    explanation: 'useCallbackやuseMemoはメモ化によるパフォーマンス最適化に使います。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'Hooksを使う際のルールとして正しいものは？',
    code: '',
    options: ['関数コンポーネントのトップレベルでのみ使用', 'if文の中で使う', 'for文の中で使う', 'クラスコンポーネントで使う'],
    correctAnswer: 0,
    explanation: 'Hooksは関数コンポーネントのトップレベルでのみ使う必要があります。',
    type: 'hook'
  }
];

export const useStateData: LearningSection = {
  id: 'useState',
  title: 'useState',
  description: 'useStateはReactの公式フックの1つで、関数コンポーネント内で状態を持たせるために使用されます。この章では、useStateの基本的な使い方、状態更新の仕方、再描画の挙動について説明されています。',
  keyPoints: [
    'useState()は状態とその更新関数を返す',
    '状態が更新されると、そのコンポーネントは自動的に再描画される',
    '更新関数には直接新しい値、または関数（前回の状態を元に更新）を渡せる',
    '状態の初期値はprops経由で受け取ることも可能'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'state',
      name: '単純なカウンター',
      description: 'useStateでカウント状態を管理する基本例です。',
      example: `const [count, setCount] = useState(0);`,
      correctUsage: `const [count, setCount] = useState(0);`,
      incorrectUsage: `const [count, setCount] = useState(); // 初期値がないと型推論できない`,
      explanation: 'useState(0)で初期値0のcount状態を作成します。',
      keyPoints: ['useState', '初期値', '状態変数'],
      benefits: ['状態管理が簡単', 'UIとデータの同期が容易']
    },
    {
      id: 'ex2',
      type: 'state',
      name: '値を直接渡して状態更新',
      description: 'setCountに新しい値を直接渡して状態を更新します。',
      example: `<button onClick={() => setCount(count + 1)}>+1</button>`,
      correctUsage: `<button onClick={() => setCount(count + 1)}>+1</button>`,
      incorrectUsage: `<button onClick={() => count = count + 1}>+1</button> // 直接代入は不可`,
      explanation: 'setCountに新しい値を渡すことで状態が更新され、再描画されます。',
      keyPoints: ['setCount', '直接値を渡す', '再描画'],
      benefits: ['直感的な状態更新', 'UIが自動で最新化']
    },
    {
      id: 'ex3',
      type: 'state',
      name: '関数で状態を更新（より安全）',
      description: 'setCountに関数を渡して前回の状態を元に更新します。',
      example: `<button onClick={() => setCount(prev => prev + 1)}>+1</button>`,
      correctUsage: `<button onClick={() => setCount(prev => prev + 1)}>+1</button>`,
      incorrectUsage: `<button onClick={() => setCount(count + 1)}>+1</button> // 非同期更新時は安全でない`,
      explanation: '前回の状態に依存する場合は関数で更新することで安全に状態を変更できます。',
      keyPoints: ['setCount', '関数で更新', '前回の状態'],
      benefits: ['非同期でも安全な状態更新', 'バグを防げる']
    }
  ]
};

export const useStatePractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useStateの戻り値として正しいものはどれ？',
    code: '',
    options: [
      '状態変数のみ',
      '更新関数のみ',
      '[状態変数, 更新関数]の配列',
      'オブジェクト'
    ],
    correctAnswer: 2,
    explanation: 'useStateは[状態, 更新関数]の配列を返します。',
    type: 'state'
  },
  {
    id: 'q2',
    question: '状態を更新する正しい方法はどれ？',
    code: '',
    options: [
      'count = 1',
      'setCount(1)',
      'useState(1)',
      'count++'
    ],
    correctAnswer: 1,
    explanation: 'setCount(新しい値)で状態を更新します。',
    type: 'state'
  },
  {
    id: 'q3',
    question: '前回の状態に依存して状態を更新する安全な方法は？',
    code: '',
    options: [
      'setCount(count + 1)',
      'setCount(prev => prev + 1)',
      'count = count + 1',
      'setCount(count++)'
    ],
    correctAnswer: 1,
    explanation: 'setCount(prev => prev + 1)のように関数で更新すると安全です。',
    type: 'state'
  },
  {
    id: 'q4',
    question: 'useStateの初期値として正しいものはどれ？',
    code: '',
    options: [
      'useState()',
      'useState(0)',
      'useState',
      'useState(null)'
    ],
    correctAnswer: 1,
    explanation: '初期値は必ず指定しましょう。',
    type: 'state'
  }
];

export const eventData: LearningSection = {
  id: 'event',
  title: 'イベント処理の基本',
  description: 'Reactでは、HTMLのイベント（クリック、変更、送信など）をJavaScriptの関数で制御できます。この節では、イベントハンドラの基本的な記述方法やイベントオブジェクトの活用方法について解説されています。',
  keyPoints: [
    'onClick、onChangeなどのイベント属性はキャメルケースで指定する（例：onClick）',
    '関数を渡すことで、イベント発生時に処理を実行できる',
    'e: React.MouseEvent<HTMLButtonElement> のようにイベントオブジェクトの型注釈が可能',
    'フォームのイベントでは、onSubmitやonChangeを使って入力や送信を制御',
    'イベント発生後の状態更新にはuseStateなどのHookと組み合わせることが一般的'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'event',
      name: 'クリックでカウントアップ',
      description: 'クリックイベントでカウントを増やす基本例です。',
      example: `const handleClick = () => setCount(count + 1);\n<button onClick={handleClick}>+1</button>`,
      correctUsage: `const handleClick = () => setCount(count + 1);\n<button onClick={handleClick}>+1</button>`,
      incorrectUsage: `<button onclick={handleClick}>+1</button> // 小文字はNG`,
      explanation: 'onClickはキャメルケースで指定し、関数を渡します。',
      keyPoints: ['onClick', '関数を渡す', '状態更新'],
      benefits: ['直感的なイベント記述', 'UIと状態の連携が容易']
    },
    {
      id: 'ex2',
      type: 'event',
      name: 'イベント引数の利用',
      description: 'イベントオブジェクトを受け取って利用する例です。',
      example: `const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {\n  console.log(e.currentTarget.textContent);\n};`,
      correctUsage: `const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {\n  // ...\n};`,
      incorrectUsage: `const handleClick = (event) => {\n  // 型注釈がないと型安全でない\n};`,
      explanation: 'イベントオブジェクトに型注釈を付けることで型安全に扱えます。',
      keyPoints: ['イベントオブジェクト', '型注釈', 'currentTarget'],
      benefits: ['型安全なイベント処理', '詳細な情報取得が可能']
    },
    {
      id: 'ex3',
      type: 'event',
      name: 'フォーム送信を制御',
      description: 'onSubmitイベントでフォーム送信を制御する例です。',
      example: `const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {\n  e.preventDefault();\n  alert('送信されました');\n};\n<form onSubmit={handleSubmit}>\n  <button type=\"submit\">送信</button>\n</form>`,
      correctUsage: `const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {\n  e.preventDefault();\n  // ...\n};`,
      incorrectUsage: `<form onsubmit={handleSubmit}>...</form> // 小文字はNG`,
      explanation: 'onSubmitはキャメルケースで指定し、e.preventDefault()で送信を制御します。',
      keyPoints: ['onSubmit', 'preventDefault', 'フォーム制御'],
      benefits: ['フォームの柔軟な制御', 'ユーザー体験の向上']
    }
  ]
};

export const eventPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'Reactでクリックイベントを正しく指定する方法はどれ？',
    code: '',
    options: [
      '<button onclick={handleClick}>',
      '<button onClick={handleClick}>',
      '<button on_click={handleClick}>',
      '<button click={handleClick}>'
    ],
    correctAnswer: 1,
    explanation: 'ReactではonClickのようにキャメルケースで指定します。',
    type: 'event'
  },
  {
    id: 'q2',
    question: 'イベントオブジェクトの型注釈として正しいものはどれ？',
    code: '',
    options: [
      'e: MouseEvent',
      'e: React.MouseEvent<HTMLButtonElement>',
      'e: Event',
      'e: any'
    ],
    correctAnswer: 1,
    explanation: 'Reactのイベント型はReact.MouseEvent<要素型>で指定します。',
    type: 'event'
  },
  {
    id: 'q3',
    question: 'フォーム送信時にデフォルトの動作を防ぐには？',
    code: '',
    options: [
      'e.preventDefault()',
      'e.stopPropagation()',
      'return false',
      'e.cancel()'
    ],
    correctAnswer: 0,
    explanation: 'e.preventDefault()でデフォルトの送信を防げます。',
    type: 'event'
  },
  {
    id: 'q4',
    question: 'イベント発生後に状態を更新する一般的な方法は？',
    code: '',
    options: [
      'useState',
      'setState',
      'setCount(新しい値)',
      'count = 新しい値'
    ],
    correctAnswer: 2,
    explanation: 'setCount(新しい値)のように更新関数で状態を変更します。',
    type: 'event'
  }
];

export const inputEventData: LearningSection = {
  id: 'inputEvent',
  title: 'イベントで入力欄を操作する',
  description: 'この節では、Reactのイベントハンドリングを通して、テキスト入力欄（input要素）を操作する方法を学びます。具体的には、入力欄の値を取得・更新し、それに連動したUI表示を行う方法が説明されています。',
  keyPoints: [
    'onChangeイベントでユーザーの入力内容をリアルタイムで取得可能',
    'useStateで入力値を保持・更新し、入力内容を画面に反映できる',
    'useCallbackを使うことで無駄な再生成を防ぐ',
    'カスタムフック（例：useInput）で入力処理のロジックを共通化・再利用可能',
    'useDebugValueで開発ツールにフックの状態を表示することもできる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'event',
      name: '基本的な入力と表示',
      description: 'onChangeとuseStateで入力値を管理し、画面に反映する基本例です。',
      example: `const [text, setText] = useState('');\nconst onChange = (e: React.ChangeEvent<HTMLInputElement>) => {\n  setText(e.target.value);\n};\nreturn (\n  <>\n    <input type=\"text\" value={text} onChange={onChange} />\n    <p>入力内容: {text}</p>\n  </>\n);`,
      correctUsage: `<input type="text" value={text} onChange={onChange} />`,
      incorrectUsage: `<input type="text" value={text} onChange={e => text = e.target.value} /> // 直接代入はNG`,
      explanation: 'onChangeでsetTextを使い状態を更新し、入力内容を表示します。',
      keyPoints: ['onChange', 'useState', '入力値の管理'],
      benefits: ['入力値とUIの同期', 'ユーザー操作の即時反映']
    },
    {
      id: 'ex2',
      type: 'event',
      name: 'useCallbackで最適化したonChange',
      description: 'useCallbackでonChange関数の再生成を防ぐ例です。',
      example: `const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {\n  setText(e.target.value);\n}, []);`,
      correctUsage: `const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { setText(e.target.value); }, []);`,
      incorrectUsage: `const onChange = (e) => setText(e.target.value); // useCallbackなし`,
      explanation: 'useCallbackで依存配列を指定し、不要な再生成を防ぎます。',
      keyPoints: ['useCallback', '依存配列', 'パフォーマンス最適化'],
      benefits: ['無駄な再生成防止', 'パフォーマンス向上']
    },
    {
      id: 'ex3',
      type: 'event',
      name: 'カスタムフック（useInput）を使った例',
      description: 'カスタムフックで入力値管理ロジックを共通化した例です。',
      example: `const useInput = () => {\n  const [value, setValue] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {\n    setValue(e.target.value);\n  }, []);\n  return [value, onChange] as const;\n};\n\nconst Input = () => {\n  const [text, onChangeText] = useInput();
  return (\n    <>\n      <input type=\"text\" value={text} onChange={onChangeText} />\n      <p>{text}</p>\n    </>\n  );\n};`,
      correctUsage: `const [text, onChangeText] = useInput();
<input type="text" value={text} onChange={onChangeText} />`,
      incorrectUsage: `const [text, onChangeText] = useInput();
<input type="text" value={text} /> // onChangeがない`,
      explanation: 'カスタムフックでロジックを共通化し、再利用性を高めています。',
      keyPoints: ['カスタムフック', 'ロジック共通化', '再利用性'],
      benefits: ['複数入力欄で再利用可能', 'コードの簡潔化']
    }
  ]
};

export const inputEventPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'input要素の値をリアルタイムで取得するにはどのイベントを使う？',
    code: '',
    options: ['onClick', 'onChange', 'onInput', 'onSubmit'],
    correctAnswer: 1,
    explanation: 'onChangeイベントで入力値を取得します。',
    type: 'event'
  },
  {
    id: 'q2',
    question: '入力値を状態に反映する正しい方法はどれ？',
    code: '',
    options: [
      'text = e.target.value',
      'setText(e.target.value)',
      'useState(e.target.value)',
      'text.value = e.target.value'
    ],
    correctAnswer: 1,
    explanation: 'setTextで状態を更新します。',
    type: 'event'
  },
  {
    id: 'q3',
    question: 'onChangeハンドラの再生成を防ぐために使うフックは？',
    code: '',
    options: ['useEffect', 'useCallback', 'useMemo', 'useRef'],
    correctAnswer: 1,
    explanation: 'useCallbackで関数の再生成を防げます。',
    type: 'event'
  },
  {
    id: 'q4',
    question: 'カスタムフック（useInput）の主な利点は？',
    code: '',
    options: ['ロジックの共通化・再利用', 'UIの装飾', 'API通信', '型定義の省略'],
    correctAnswer: 0,
    explanation: 'カスタムフックでロジックを共通化・再利用できます。',
    type: 'event'
  }
];

export const useReducerData: LearningSection = {
  id: 'useReducer',
  title: 'useReducer',
  description: 'useReducer は、Reactの状態管理フックで、useStateよりも複雑な状態管理や明確な状態遷移が必要なケースに適している。状態遷移をreducer関数として分離し、dispatch関数を使って状態を更新する構造。',
  keyPoints: [
    '状態更新のロジックをreducer関数で定義し、明確な状態遷移が可能',
    'UIとロジックの分離で保守性向上',
    'reducer関数が純粋関数なのでテストしやすい',
    'オブジェクトや配列など複雑な状態にも柔軟に対応'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'カウンター（複数アクション対応）',
      description: 'dispatchでINCREMENT, DECREMENT, DOUBLE, RESETなどのアクションを切り替え可能なカウンター。',
      example: `const initialState = 0;\nfunction reducer(state, action) {\n  switch(action) {\n    case 'INCREMENT': return state + 1;\n    case 'DECREMENT': return state - 1;\n    case 'DOUBLE': return state * 2;\n    case 'RESET': return 0;\n    default: return state;\n  }\n}\nconst [count, dispatch] = useReducer(reducer, initialState);`,
      correctUsage: `dispatch('INCREMENT');`,
      incorrectUsage: `count = count + 1; // 直接代入はNG`,
      explanation: 'dispatchでアクションを指定して状態を更新します。',
      keyPoints: ['dispatch', 'reducer', '複数アクション'],
      benefits: ['状態遷移が明確', '複雑なロジックも管理しやすい']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'フォーム入力の一括管理',
      description: '複数の入力フィールドをオブジェクトで一括管理する例。',
      example: `const initialState = { name: '', email: '' };\nfunction reducer(state, action) {\n  return { ...state, [action.name]: action.value };\n}\nconst [form, dispatch] = useReducer(reducer, initialState);`,
      correctUsage: `dispatch({ name: 'email', value: 'test@example.com' });`,
      incorrectUsage: `form.email = 'test@example.com'; // 直接代入はNG`,
      explanation: 'dispatchでフィールド名と値を指定して一括管理します。',
      keyPoints: ['オブジェクト状態', '一括管理', 'dispatch'],
      benefits: ['複数入力の効率管理', '保守性・拡張性が高い']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'トグルスイッチの状態管理',
      description: '複数トグルのON/OFF状態を配列で管理し、dispatchで制御。',
      example: `const initialState = [false, false, false];\nfunction reducer(state, action) {\n  switch(action.type) {\n    case 'TOGGLE':\n      return state.map((v, i) => i === action.index ? !v : v);\n    default: return state;\n  }\n}\nconst [toggles, dispatch] = useReducer(reducer, initialState);`,
      correctUsage: `dispatch({ type: 'TOGGLE', index: 1 });`,
      incorrectUsage: `toggles[1] = true; // 直接代入はNG`,
      explanation: 'dispatchでindexを指定してON/OFFを切り替えます。',
      keyPoints: ['配列状態', 'トグル', 'dispatch'],
      benefits: ['複数状態の一元管理', 'UIロジックの分離']
    }
  ]
};

export const useReducerPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useReducerの主な用途は？',
    code: '',
    options: ['複雑な状態管理', '副作用処理', 'メモ化', 'DOM参照'],
    correctAnswer: 0,
    explanation: 'useReducerは複雑な状態管理や明確な状態遷移に使います。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'reducer関数の特徴は？',
    code: '',
    options: ['純粋関数', '副作用を持つ', '非同期関数', 'グローバル変数を使う'],
    correctAnswer: 0,
    explanation: 'reducerは純粋関数であるべきです。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'dispatchの役割は？',
    code: '',
    options: ['状態を直接変更', 'アクションをreducerに送る', '副作用を発生させる', 'DOMを操作する'],
    correctAnswer: 1,
    explanation: 'dispatchはアクションをreducerに送って状態を更新します。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'useReducerがuseStateより適しているのはどんな場合？',
    code: '',
    options: ['状態遷移が複雑', '状態が単純', '副作用が多い', 'UIが小さい'],
    correctAnswer: 0,
    explanation: '状態遷移が複雑な場合はuseReducerが適しています。',
    type: 'hook'
  }
];

export const useCallbackData: LearningSection = {
  id: 'useCallback',
  title: 'useCallback',
  description: 'useCallback は、Reactのフックの1つで、関数の再生成を防ぎ、不要な再描画を抑制するために使う。特にメモ化された子コンポーネントに関数を渡す際に効果的。',
  keyPoints: [
    '関数の再生成を抑制: 親コンポーネントの再描画時に毎回新しい関数を生成しないようにできる',
    'パフォーマンス向上: 子コンポーネントの無駄な再描画を減らすことで描画効率が上がる',
    '依存配列により制御可能: 関数をいつ再生成するかを [] や [変数] で明示的に指定できる',
    'メモ化と相性が良い: React.memo や useMemo と併用することで再描画コントロールが強化される'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'メモ化されたボタンコンポーネント',
      description: 'DoubleButton に useCallback でメモ化した関数を渡すことで、親の再描画でもボタンは再描画されない。',
      example: `const DoubleButton = React.memo(({ onDouble }) => <button onClick={onDouble}>2倍</button>);
const [count, setCount] = useState(0);
const handleDouble = useCallback(() => setCount(c => c * 2), []);
return <DoubleButton onDouble={handleDouble} />;`,
      correctUsage: `const handleDouble = useCallback(() => setCount(c => c * 2), []);
<DoubleButton onDouble={handleDouble} />`,
      incorrectUsage: `const handleDouble = () => setCount(c => c * 2);
<DoubleButton onDouble={handleDouble} /> // useCallbackなしだと毎回再生成`,
      explanation: 'useCallbackで関数をメモ化することで、DoubleButtonはpropsが変わらない限り再描画されません。',
      keyPoints: ['useCallback', 'React.memo', 'propsの最適化'],
      benefits: ['無駄な再描画防止', 'パフォーマンス向上']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'カスタムフック内でのonChange処理の定義',
      description: 'useInput の中で useCallback を使って onChange 関数を定義。複数コンポーネントで再利用可能。',
      example: `const useInput = () => {
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => setValue(e.target.value), []);
  return [value, onChange] as const;
};
const [text, onChangeText] = useInput();
<input value={text} onChange={onChangeText} />`,
      correctUsage: `const onChange = useCallback((e) => setValue(e.target.value), []);`,
      incorrectUsage: `const onChange = (e) => setValue(e.target.value); // useCallbackなし`,
      explanation: 'useCallbackでonChangeをメモ化することで、useInputを使う全てのコンポーネントで無駄な再生成を防げます。',
      keyPoints: ['useCallback', 'カスタムフック', '再利用性'],
      benefits: ['ロジック共通化', 'パフォーマンス向上']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'クリック制限付きボタン',
      description: '上限回数に達したらアラートを表示するカウントボタン。依存配列に count と maximum を指定することで必要時のみ関数を更新。',
      example: `const [count, setCount] = useState(0);
const maximum = 5;
const handleClick = useCallback(() => {
  if (count < maximum) setCount(c => c + 1);
  else alert('上限です');
}, [count, maximum]);
<button onClick={handleClick}>カウント</button>`,
      correctUsage: `const handleClick = useCallback(() => {
  if (count < maximum) setCount(c => c + 1);
  else alert('上限です');
}, [count, maximum]);`,
      incorrectUsage: `const handleClick = () => {
  if (count < maximum) setCount(c => c + 1);
  else alert('上限です');
}; // useCallbackなし`,
      explanation: '依存配列に count, maximum を指定することで、必要な時だけ関数が再生成されます。',
      keyPoints: ['useCallback', '依存配列', '条件付きロジック'],
      benefits: ['無駄な再生成防止', '安全な状態管理']
    }
  ]
};

export const useMemoData: LearningSection = {
  id: 'useMemo',
  title: 'useMemo',
  description: 'useMemo は、Reactにおいて値の計算結果をメモ化（再利用）するためのフック。パフォーマンスの最適化を目的とし、不要な再計算を抑制する際に使用される。',
  keyPoints: [
    '値のメモ化: 関数の戻り値をキャッシュし、依存値が変わらない限り再計算を行わない',
    '再計算の抑制: 描画のたびに重たい計算を繰り返すことを防げる',
    '依存配列で更新を制御: 第二引数に渡す配列の値が変化した時のみ再実行',
    'useCallbackとの違い: useMemoは「値のメモ化」、useCallbackは「関数のメモ化」用'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'テキスト長合計の計算',
      description: '入力文字列のリストitemsの全要素の長さを合計する処理を、useMemoで包み、itemsが変更された時だけ再計算するようにする。',
      example: `const [items, setItems] = useState<string[]>([]);
const totalLength = useMemo(() => items.reduce((sum, item) => sum + item.length, 0), [items]);
return <div>合計文字数: {totalLength}</div>;`,
      correctUsage: `const totalLength = useMemo(() => items.reduce((sum, item) => sum + item.length, 0), [items]);`,
      incorrectUsage: `const totalLength = items.reduce((sum, item) => sum + item.length, 0); // useMemoなしで毎回再計算`,
      explanation: 'useMemoでitemsが変わった時だけ合計値を再計算し、無駄な再計算を防ぎます。',
      keyPoints: ['useMemo', '依存配列', '再計算抑制'],
      benefits: ['パフォーマンス最適化', '効率的な計算']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: '高負荷な計算処理の結果をキャッシュ',
      description: '大量データに対するフィルタやソート、集計など。例えば、複雑な検索フィルタロジックの実行結果をuseMemoで保持。',
      example: `const [query, setQuery] = useState('');
const filtered = useMemo(() => data.filter(item => item.name.includes(query)), [data, query]);
return <ul>{filtered.map(item => <li key={item.id}>{item.name}</li>)}</ul>;`,
      correctUsage: `const filtered = useMemo(() => data.filter(item => item.name.includes(query)), [data, query]);`,
      incorrectUsage: `const filtered = data.filter(item => item.name.includes(query)); // useMemoなしで毎回フィルタ`,
      explanation: 'useMemoでフィルタ結果をキャッシュし、dataやqueryが変わった時だけ再計算します。',
      keyPoints: ['useMemo', '高負荷処理', 'キャッシュ'],
      benefits: ['パフォーマンス向上', '無駄な処理削減']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'オブジェクト・配列のprops渡し最適化',
      description: '子コンポーネントに渡すオブジェクトや配列をuseMemoで固定化することで、propsの変更と誤認識されるのを防ぐ。',
      example: `const options = useMemo(() => [1, 2, 3], []);
return <Select options={options} />;`,
      correctUsage: `const options = useMemo(() => [1, 2, 3], []);
<Select options={options} />;`,
      incorrectUsage: `const options = [1, 2, 3];
<Select options={options} /> // useMemoなしだと毎回新しい配列`,
      explanation: 'useMemoで配列やオブジェクトをメモ化することで、propsの参照が変わらず、子コンポーネントの無駄な再描画を防げます。',
      keyPoints: ['useMemo', 'props最適化', '参照の固定化'],
      benefits: ['無駄な再描画防止', '効率的なprops渡し']
    }
  ]
};

export const useCallbackPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useCallbackの主な用途はどれ？',
    code: '',
    options: [
      '値のメモ化',
      '関数のメモ化',
      '副作用の管理',
      '状態管理'
    ],
    correctAnswer: 1,
    explanation: 'useCallbackは「関数のメモ化」に使います。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useCallbackの依存配列に指定した値が変化した場合、どうなる？',
    code: '',
    options: [
      '関数が再生成される',
      '値が再計算される',
      '副作用が発生する',
      '何も起きない'
    ],
    correctAnswer: 0,
    explanation: '依存配列の値が変わると、useCallbackでメモ化した関数が再生成されます。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'useCallbackと一緒に使うと効果的なものはどれ？',
    code: '',
    options: [
      'React.memo',
      'useState',
      'useEffect',
      'useRef'
    ],
    correctAnswer: 0,
    explanation: 'React.memoと組み合わせることで、子コンポーネントの無駄な再描画を防げます。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'useCallbackとuseMemoの違いは？',
    code: '',
    options: [
      'useCallbackは関数、useMemoは値をメモ化',
      'どちらも値をメモ化',
      'どちらも関数をメモ化',
      '違いはない'
    ],
    correctAnswer: 0,
    explanation: 'useCallbackは「関数」、useMemoは「値」をメモ化します。',
    type: 'hook'
  }
];

export const useMemoPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useMemoの主な用途はどれ？',
    code: '',
    options: [
      '値のメモ化',
      '関数のメモ化',
      '副作用の管理',
      '状態管理'
    ],
    correctAnswer: 0,
    explanation: 'useMemoは「値のメモ化」に使います。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useMemoの依存配列に指定した値が変化した場合、どうなる？',
    code: '',
    options: [
      '値が再計算される',
      '関数が再生成される',
      '副作用が発生する',
      '何も起きない'
    ],
    correctAnswer: 0,
    explanation: '依存配列の値が変わると、useMemoでメモ化した値が再計算されます。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'useMemoを使うと効果的なケースはどれ？',
    code: '',
    options: [
      '重い計算処理の結果をキャッシュしたいとき',
      '副作用を管理したいとき',
      'イベントハンドラを最適化したいとき',
      '状態を管理したいとき'
    ],
    correctAnswer: 0,
    explanation: '重い計算処理や配列・オブジェクトのprops最適化などにuseMemoが有効です。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'useMemoとuseCallbackの違いは？',
    code: '',
    options: [
      'useMemoは値、useCallbackは関数をメモ化',
      'どちらも値をメモ化',
      'どちらも関数をメモ化',
      '違いはない'
    ],
    correctAnswer: 0,
    explanation: 'useMemoは「値」、useCallbackは「関数」をメモ化します。',
    type: 'hook'
  }
];

export const useEffectData: LearningSection = {
  id: 'useEffect',
  title: 'useEffect',
  description: 'useEffectは、コンポーネントの描画後に実行すべき副作用（データ取得、タイマー処理、ログ出力など）を記述するためのReactフック。副作用のタイミングや依存を制御し、Reactの描画ロジックと分離するのが目的。',
  keyPoints: [
    '副作用の管理: DOM操作、API通信、タイマーなど「描画とは直接関係のない処理」を実行',
    '実行タイミング: 描画後に実行される。描画前に実行したい場合はuseLayoutEffectを使用',
    '依存配列による制御: 第二引数に依存値の配列を渡すことで、特定のstateやprops変更時のみ実行できる',
    'クリーンアップ可能: 副作用の終了処理（例：タイマー解除）を戻り値の関数として記述できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: '時計表示（Clock.tsx）',
      description: 'setIntervalで1秒ごとに時間を更新し表示。useEffect内でタイマーを設定し、アンマウント時に解除。',
      example: `const [time, setTime] = useState(new Date());
useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);
return <div>{time.toLocaleTimeString()}</div>;`,
      correctUsage: `useEffect(() => {
  const timer = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(timer);
}, []);`,
      incorrectUsage: `useEffect(() => {
  setInterval(() => setTime(new Date()), 1000);
}, []); // クリーンアップがない`,
      explanation: '副作用でタイマーを設定し、クリーンアップ関数で解除しています。',
      keyPoints: ['setInterval', 'クリーンアップ', 'アンマウント時'],
      benefits: ['リソースリーク防止', '安全な副作用管理']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'localStorageからの読込',
      description: '初期描画時に、localStorageに保存されている「言語設定（locale）」を読み取り、状態に反映。',
      example: `const [locale, setLocale] = useState('ja');
useEffect(() => {
  const saved = localStorage.getItem('locale');
  if (saved) setLocale(saved);
}, []);`,
      correctUsage: `useEffect(() => {
  const saved = localStorage.getItem('locale');
  if (saved) setLocale(saved);
}, []);`,
      incorrectUsage: `const saved = localStorage.getItem('locale');
setLocale(saved); // useEffect外で実行すると毎回呼ばれる`,
      explanation: '初回マウント時のみlocalStorageから値を取得し、状態に反映します。',
      keyPoints: ['localStorage', '初期描画時', '依存配列[]'],
      benefits: ['初期化処理の最適化', '無駄な再取得防止']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'localStorageへの保存',
      description: 'localeが変更されるたびに、その値をlocalStorageへ保存。依存配列に[locale]を指定して最適化。',
      example: `const [locale, setLocale] = useState('ja');
useEffect(() => {
  localStorage.setItem('locale', locale);
}, [locale]);`,
      correctUsage: `useEffect(() => {
  localStorage.setItem('locale', locale);
}, [locale]);`,
      incorrectUsage: `useEffect(() => {
  localStorage.setItem('locale', locale);
}); // 依存配列がない`,
      explanation: '依存配列[locale]で、localeが変わった時だけ保存処理が実行されます。',
      keyPoints: ['localStorage', '依存配列', '最適化'],
      benefits: ['無駄な処理防止', 'パフォーマンス向上']
    }
  ]
};

export const useEffectPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useEffectの主な用途はどれ？',
    code: '',
    options: [
      '副作用の管理',
      '状態管理',
      '値のメモ化',
      'イベント登録'
    ],
    correctAnswer: 0,
    explanation: 'useEffectは副作用（API通信、タイマー、DOM操作など）の管理に使います。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useEffectのクリーンアップ関数はどのタイミングで実行される？',
    code: '',
    options: [
      'アンマウント時',
      'マウント時',
      '依存配列の値が変わる直前',
      '常に実行されない'
    ],
    correctAnswer: 0,
    explanation: 'クリーンアップ関数はアンマウント時や依存値が変わる直前に実行されます。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'useEffectの依存配列を[]（空配列）にした場合、どのタイミングで実行される？',
    code: '',
    options: [
      '初回マウント時のみ',
      '毎回描画時',
      '依存値が変わるたび',
      '実行されない'
    ],
    correctAnswer: 0,
    explanation: '空配列[]の場合は初回マウント時のみ実行されます。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: '描画前に副作用を実行したい場合に使うべきフックは？',
    code: '',
    options: [
      'useLayoutEffect',
      'useEffect',
      'useMemo',
      'useCallback'
    ],
    correctAnswer: 0,
    explanation: '描画前に副作用を実行したい場合はuseLayoutEffectを使います。',
    type: 'hook'
  }
];

export const useContextData: LearningSection = {
  id: 'useContext',
  title: 'useContext',
  description: 'useContextは、ReactのContextオブジェクトから値を取得するためのフック。親から子へ逐次propsを渡さずに、コンポーネント間で状態やデータを共有できる。',
  keyPoints: [
    'コンシューマー不要: Context.Consumerを使わず、シンプルに値を取得できる',
    'コンポーネントの分離: 深いツリー構造でもpropsを渡さずにデータを参照でき、可読性が向上',
    '再レンダリングのトリガー: Contextの値が変わると、それを参照するコンポーネントが再レンダリングされる',
    '型安全に利用可能: TypeScriptと併用して型定義することで安全にデータアクセスできる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'ユーザー情報の共有（UserContext）',
      description: 'createContextでUser型のContextを作成し、子孫コンポーネントからuseContextでユーザー情報を取得。',
      example: `type User = { name: string };
const UserContext = React.createContext<User | null>(null);
const Profile = () => {
  const user = useContext(UserContext);
  return <div>{user ? user.name : '未ログイン'}</div>;
};`,
      correctUsage: `const user = useContext(UserContext);`,
      incorrectUsage: `const user = UserContext; // useContextを使わないと値が取得できない`,
      explanation: 'useContextでContextの値を直接取得できます。',
      keyPoints: ['createContext', 'useContext', '型定義'],
      benefits: ['propsバケツリレー解消', '型安全なデータ共有']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'タイトルの共有表示（TitleContext）',
      description: 'Providerでtitle文字列をセットし、TitleコンポーネントでuseContextを使って表示。',
      example: `const TitleContext = React.createContext('');
const Title = () => {
  const title = useContext(TitleContext);
  return <h1>{title}</h1>;
};`,
      correctUsage: `const title = useContext(TitleContext);`,
      incorrectUsage: `const title = TitleContext; // useContextを使わないと値が取得できない`,
      explanation: 'useContextでProviderの値を取得し、表示できます。',
      keyPoints: ['Provider', 'useContext', '値の取得'],
      benefits: ['柔軟なデータ共有', '可読性向上']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: '認証情報の管理（AuthContext）',
      description: 'ログイン中のユーザー情報・ログイン/ログアウト処理などをまとめてContextで管理し、useContextでどこからでも参照可能。',
      example: `type Auth = { user: string | null; login: () => void; logout: () => void };
const AuthContext = React.createContext<Auth | undefined>(undefined);
const LoginButton = () => {
  const auth = useContext(AuthContext);
  return <button onClick={auth?.login}>ログイン</button>;
};`,
      correctUsage: `const auth = useContext(AuthContext);`,
      incorrectUsage: `const auth = AuthContext; // useContextを使わないと値が取得できない`,
      explanation: '認証情報や操作関数もContext経由で取得できます。',
      keyPoints: ['認証', 'useContext', '関数の共有'],
      benefits: ['グローバルな状態管理', 'どこからでも参照可能']
    }
  ]
};

export const useContextPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useContextの主な用途はどれ？',
    code: '',
    options: [
      'Contextの値を取得',
      '副作用の管理',
      '値のメモ化',
      'イベント登録'
    ],
    correctAnswer: 0,
    explanation: 'useContextはContextの値を取得するためのフックです。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useContextを使うと何が不要になる？',
    code: '',
    options: [
      'Context.Consumer',
      'Provider',
      'useEffect',
      'useMemo'
    ],
    correctAnswer: 0,
    explanation: 'useContextを使うことでContext.Consumerが不要になります。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'Contextの値が変わるとどうなる？',
    code: '',
    options: [
      '参照しているコンポーネントが再レンダリングされる',
      '何も起きない',
      'エラーになる',
      '再レンダリングされない'
    ],
    correctAnswer: 0,
    explanation: 'Contextの値が変わると、それを参照しているコンポーネントが再レンダリングされます。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'TypeScriptと併用する主な利点は？',
    code: '',
    options: [
      '型安全にデータアクセスできる',
      'パフォーマンスが上がる',
      '副作用が減る',
      '何も変わらない'
    ],
    correctAnswer: 0,
    explanation: '型定義を使うことで型安全にContextの値へアクセスできます。',
    type: 'hook'
  }
];

export const useLayoutEffectData: LearningSection = {
  id: 'useLayoutEffect',
  title: 'useLayoutEffect',
  description: 'useLayoutEffect は useEffect とほぼ同じAPIを持つ副作用フックだが、実行タイミングが異なる。DOMの更新直後、ブラウザが画面に描画する前に同期的に実行されるため、レイアウト操作やチラつき防止に向いている。',
  keyPoints: [
    '同期的な実行: useEffectは描画後に非同期実行、useLayoutEffectは描画前に同期実行される',
    'チラつき防止に有効: 初期描画前に状態やスタイルを調整できるため、一時的な不自然な表示を防げる',
    '重い処理には注意: 同期的にブロックされるため、長い処理を行うとUI描画が遅れるリスクがある',
    '使い方はuseEffectと同じ: useLayoutEffect(() => {...}, [依存配列]) のように記述する'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'localStorageの読み込みによる初期値反映',
      description: 'ロケール（locale）をlocalStorageから読み込む処理をuseEffectで行うと、一瞬だけデフォルトのen-USが表示されてチラつく。useLayoutEffectで実行すれば、描画前に値が反映されるためチラつき防止になる。',
      example: `const [locale, setLocale] = useState('en-US');
useLayoutEffect(() => {
  const saved = localStorage.getItem('locale');
  if (saved) setLocale(saved);
}, []);`,
      correctUsage: `useLayoutEffect(() => {
  const saved = localStorage.getItem('locale');
  if (saved) setLocale(saved);
}, []);`,
      incorrectUsage: `useEffect(() => {
  const saved = localStorage.getItem('locale');
  if (saved) setLocale(saved);
}, []); // useEffectだとチラつく`,
      explanation: 'useLayoutEffectで描画前に値を反映することでチラつきを防げます。',
      keyPoints: ['localStorage', 'チラつき防止', '描画前'],
      benefits: ['ユーザー体験向上', '自然な初期表示']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: '要素サイズの測定とスタイル適用',
      description: '描画直前に要素サイズを取得し、それに応じてCSSを調整する場面。useLayoutEffectで同期的にDOMを扱う必要がある。',
      example: `const ref = useRef<HTMLDivElement>(null);
useLayoutEffect(() => {
  if (ref.current) {
    const width = ref.current.offsetWidth;
    // 取得したwidthでスタイル調整
  }
}, []);`,
      correctUsage: `useLayoutEffect(() => {
  if (ref.current) {
    const width = ref.current.offsetWidth;
    // ...
  }
}, []);`,
      incorrectUsage: `useEffect(() => {
  if (ref.current) {
    const width = ref.current.offsetWidth;
    // ...
  }
}, []); // useEffectだと描画後で遅い`,
      explanation: '要素サイズ取得やレイアウト調整はuseLayoutEffectで行うと安全です。',
      keyPoints: ['要素サイズ', 'DOM操作', '同期実行'],
      benefits: ['正確なレイアウト', 'チラつき防止']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'アニメーション前のレイアウト調整',
      description: 'アニメーションを始める前に、初期位置やスタイルを確定させるための処理に使われる。',
      example: `const ref = useRef<HTMLDivElement>(null);
useLayoutEffect(() => {
  if (ref.current) {
    ref.current.style.transform = 'translateX(0)';
  }
}, []);`,
      correctUsage: `useLayoutEffect(() => {
  if (ref.current) {
    ref.current.style.transform = 'translateX(0)';
  }
}, []);`,
      incorrectUsage: `useEffect(() => {
  if (ref.current) {
    ref.current.style.transform = 'translateX(0)';
  }
}, []); // useEffectだとタイミングが遅い`,
      explanation: 'アニメーション前のレイアウト確定はuseLayoutEffectで行うとスムーズです。',
      keyPoints: ['アニメーション', 'レイアウト調整', '同期実行'],
      benefits: ['滑らかなアニメーション', 'チラつき防止']
    }
  ]
};

export const useLayoutEffectPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useLayoutEffectの主な用途はどれ？',
    code: '',
    options: [
      '描画前のDOM操作やレイアウト調整',
      '副作用の管理',
      '値のメモ化',
      'イベント登録'
    ],
    correctAnswer: 0,
    explanation: 'useLayoutEffectは描画前のDOM操作やレイアウト調整に使います。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useEffectとの主な違いは？',
    code: '',
    options: [
      '実行タイミング',
      'API',
      '依存配列の書き方',
      '違いはない'
    ],
    correctAnswer: 0,
    explanation: 'useLayoutEffectは描画前に同期的、useEffectは描画後に非同期で実行されます。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'useLayoutEffectで重い処理を行うとどうなる？',
    code: '',
    options: [
      'UI描画が遅れる',
      'パフォーマンスが上がる',
      '何も起きない',
      '副作用が減る'
    ],
    correctAnswer: 0,
    explanation: '同期的にブロックされるため、重い処理はUI描画遅延の原因になります。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: '通常はどちらを使うべき？',
    code: '',
    options: [
      'useEffect',
      'useLayoutEffect',
      'どちらでもよい',
      '必ず両方使う'
    ],
    correctAnswer: 0,
    explanation: '通常はuseEffectを使い、チラつき防止やレイアウト調整が必要な場合のみuseLayoutEffectを使います。',
    type: 'hook'
  }
];

export const useRefData: LearningSection = {
  id: 'useRef',
  title: 'useRef',
  description: 'useRefは、コンポーネント内で再描画を伴わずに値を保持したり、DOM要素に直接アクセスするためのReactフックです。',
  keyPoints: [
    '再描画されない: useStateやuseReducerと異なり、値が更新されてもコンポーネントの再レンダリングは起きない',
    'データの保持: 状態とは別の、描画に関係ない一時的なデータの保存に使える',
    'DOMの参照: inputやdivなどのDOM要素にアクセスできる',
    '.currentプロパティ: refオブジェクトの.currentで値や要素にアクセス',
    'useImperativeHandle: 親から子の関数やデータをref経由で呼び出せる（forwardRefと併用）'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: '画像アップローダー',
      description: 'inputImageRefを使って非表示の<input type="file">をプログラム的にクリック。fileRefで選択されたファイル情報を保持し、アップロード操作に利用。',
      example: `const inputImageRef = useRef<HTMLInputElement>(null);
const fileRef = useRef<File | null>(null);
const handleClick = () => inputImageRef.current?.click();
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  fileRef.current = e.target.files?.[0] || null;
};
return <>
  <button onClick={handleClick}>画像選択</button>
  <input type="file" ref={inputImageRef} style={{ display: 'none' }} onChange={handleChange} />
</>;`,
      correctUsage: `const inputImageRef = useRef<HTMLInputElement>(null);
<input type="file" ref={inputImageRef} />`,
      incorrectUsage: `const inputImageRef = null;
<input type="file" ref={inputImageRef} /> // useRefを使わない`,
      explanation: 'refでDOM要素やファイル情報を保持し、再描画せずにアクセスできます。',
      keyPoints: ['ref', 'DOMアクセス', '再描画なし'],
      benefits: ['パフォーマンス向上', '柔軟なDOM操作']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'useImperativeHandleとforwardRefの利用',
      description: '子コンポーネントで定義したshowMessage関数を、親コンポーネントから呼び出せるようにする。ChildはforwardRefでrefを受け取り、useImperativeHandleで公開する関数を定義する。',
      example: `const Child = React.forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showMessage: () => alert('Hello from child!')
  }));
  return <div>Child</div>;
});
const parentRef = useRef<{ showMessage: () => void }>(null);
<Child ref={parentRef} />;
// 親から parentRef.current?.showMessage() で呼び出し`,
      correctUsage: `useImperativeHandle(ref, () => ({ showMessage: () => ... }));`,
      incorrectUsage: `ref.current.showMessage = () => ...; // useImperativeHandleを使わない`,
      explanation: 'useImperativeHandleで親から子の関数をref経由で公開できます。',
      keyPoints: ['useImperativeHandle', 'forwardRef', '関数公開'],
      benefits: ['柔軟なAPI設計', '親子間の連携']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: '1回だけ副作用を実行したいケース',
      description: 'useEffectの実行状態をuseRefで保持し、初回実行済みかを制御する用途に活用される。',
      example: `const didRun = useRef(false);
useEffect(() => {
  if (!didRun.current) {
    // 初回だけ実行したい処理
    didRun.current = true;
  }
}, []);`,
      correctUsage: `const didRun = useRef(false);
if (!didRun.current) { ... }`,
      incorrectUsage: `let didRun = false;
if (!didRun) { ... } // useRefを使わないと再描画で値がリセット`,
      explanation: 'useRefで値を保持すれば、再描画でも値がリセットされません。',
      keyPoints: ['useRef', '副作用制御', '値の保持'],
      benefits: ['安定した副作用管理', '再描画に強い']
    }
  ]
};

export const useRefPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useRefの主な用途はどれ？',
    code: '',
    options: [
      '再描画せずに値やDOM要素を保持',
      '状態管理',
      '副作用の管理',
      '値のメモ化'
    ],
    correctAnswer: 0,
    explanation: 'useRefは再描画せずに値やDOM要素を保持するためのフックです。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useRefで値や要素にアクセスするプロパティは？',
    code: '',
    options: [
      '.current',
      '.value',
      '.ref',
      '.data'
    ],
    correctAnswer: 0,
    explanation: 'useRefで値や要素にアクセスするには.currentプロパティを使います。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'DOM要素にアクセスしたい場合、どのようにrefを使う？',
    code: '',
    options: [
      'ref={myRef}',
      'value={myRef}',
      'onChange={myRef}',
      'useState(myRef)'
    ],
    correctAnswer: 0,
    explanation: 'DOM要素にアクセスするにはref={myRef}のように指定します。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'useImperativeHandleの主な用途は？',
    code: '',
    options: [
      '親から子の関数やデータをref経由で呼び出す',
      '副作用の管理',
      '値のメモ化',
      '再レンダリングを強制する'
    ],
    correctAnswer: 0,
    explanation: 'useImperativeHandleは親から子の関数やデータをref経由で呼び出すために使います。',
    type: 'hook'
  }
];

export const customHookData: LearningSection = {
  id: 'customHook',
  title: 'カスタムフック',
  description: 'Reactでは公式のフックだけでなく、自作の「カスタムフック」を作成することで、複雑なロジックを再利用可能にし、コードの可読性や保守性を高めることができる。複数のフックを組み合わせた処理を、トップレベルの関数として定義するのが基本的なスタイル。',
  keyPoints: [
    'フック名は use で始める（例: useInput）',
    'useState, useCallback など既存のフックを組み合わせられる',
    '他のコンポーネントで再利用できる共通ロジックを切り出せる',
    '条件分岐やループの中でフックを呼び出すことはできない（Reactのルール）',
    'useDebugValue を使うと、開発ツールで状態を可視化できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'custom',
      name: 'useInput フック',
      description: '入力値の状態管理とonChangeロジックをまとめたカスタムフック。',
      example: "const useInput = () => {\n  const [state, setState] = useState('');\n  const onChange = useCallback((e) => setState(e.target.value), []);\n  useDebugValue('Input: ' + state);\n  return [state, onChange] as const;\n};",
      correctUsage: "const [text, onChangeText] = useInput();\n<input type='text' value={text} onChange={onChangeText} />",
      incorrectUsage: "const [text, onChangeText] = useInput();\n<input type='text' value={text} /> // onChangeがない",
      explanation: 'useInputで入力値とonChangeをまとめて管理し、再利用性を高めています。',
      keyPoints: ['useInput', 'useState', 'useCallback', 'useDebugValue'],
      benefits: ['ロジック共通化', '再利用性向上']
    },
    {
      id: 'ex2',
      type: 'custom',
      name: 'Input コンポーネントでの利用',
      description: 'useInputを使って、シンプルな入力コンポーネントを実装。',
      example: "const [text, onChangeText] = useInput();\n<input type='text' value={text} onChange={onChangeText} />",
      correctUsage: "<input type='text' value={text} onChange={onChangeText} />",
      incorrectUsage: "<input type='text' value={text} /> // onChangeがない",
      explanation: 'カスタムフックでロジックを共通化し、複数コンポーネントで再利用できます。',
      keyPoints: ['カスタムフック', '再利用', 'onChange'],
      benefits: ['コードの簡潔化', '保守性向上']
    },
    {
      id: 'ex3',
      type: 'custom',
      name: 'useDebugValue の活用',
      description: 'React Developer ToolsのComponentsタブで useDebugValue に渡した情報が表示される。',
      example: "const useInput = () => {\n  const [state, setState] = useState('');\n  useDebugValue('Input: ' + state);\n  return [state, (e) => setState(e.target.value)] as const;\n};",
      correctUsage: "useDebugValue('Input: ' + state);",
      incorrectUsage: '// useDebugValueを使わない',
      explanation: 'useDebugValueを使うことで、開発ツールでカスタムフックの状態を可視化できます。',
      keyPoints: ['useDebugValue', '開発効率', 'デバッグ'],
      benefits: ['状態の可視化', 'デバッグ効率向上']
    }
  ]
};

export const customHookPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'カスタムフックの命名規則として正しいものは？',
    code: '',
    options: [
      'useで始める',
      'customで始める',
      '任意の名前',
      'Reactで始める'
    ],
    correctAnswer: 0,
    explanation: 'カスタムフックはuseで始める必要があります。',
    type: 'custom'
  },
  {
    id: 'q2',
    question: 'カスタムフックの主な利点はどれ？',
    code: '',
    options: [
      'ロジックの再利用',
      'UIの装飾',
      'API通信',
      '型定義の省略'
    ],
    correctAnswer: 0,
    explanation: 'カスタムフックはロジックの再利用・共通化に役立ちます。',
    type: 'custom'
  },
  {
    id: 'q3',
    question: 'カスタムフック内で呼び出してはいけない場所は？',
    code: '',
    options: [
      '条件分岐やループの中',
      'トップレベル',
      'return文の外',
      '関数の外'
    ],
    correctAnswer: 0,
    explanation: 'フックは条件分岐やループの中で呼び出してはいけません。',
    type: 'custom'
  },
  {
    id: 'q4',
    question: 'useDebugValueの主な用途は？',
    code: '',
    options: [
      '開発ツールで状態を可視化',
      'API通信',
      '副作用の管理',
      'UIの装飾'
    ],
    correctAnswer: 0,
    explanation: 'useDebugValueはReact Developer Toolsで状態を可視化するために使います。',
    type: 'custom'
  }
];