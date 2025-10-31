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
  description:
    'Hooksは、関数コンポーネントからReactの状態管理や副作用、コンテクスト、パフォーマンス最適化といった機能を利用するための公式API群です。クラスを用いなくてもUIロジックを柔軟に組み立てられるように設計されています。',
  keyPoints: [
    'Reactの組み込みHooksは「state」「context」「ref」「effect」「performance」などのカテゴリにまとまっている',
    'Hooksはコンポーネントのトップレベルで同じ順序で呼び出す必要があり、条件分岐やループ内では使わない',
    '複数のHooksを組み合わせることでロジックを分割・再利用でき、必要に応じてカスタムフックも作成できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'stateフックでUIを更新する',
      description: 'stateカテゴリの代表であるuseStateを使って、ユーザー操作に応じた表示変更を行います。',
      example: `const [index, setIndex] = useState(0);
const artworks = getArtworks();
return (
  <>
    <button onClick={() => setIndex((i) => (i + 1) % artworks.length)}>次へ</button>
    <p>{artworks[index].title}</p>
  </>
);`,
      correctUsage: `const [value, setValue] = useState(initialValue);`,
      incorrectUsage: `const value = useState(initialValue); // 配列の分割代入が必要`,
      explanation: 'useStateは現在の値と更新関数を返し、更新するとコンポーネントが再レンダーされます。',
      keyPoints: ['useState', '現在値と更新関数', '再レンダー'],
      benefits: ['UIと状態を同期できる', 'ローカルな状態管理が容易']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'contextフックで共有データを読む',
      description: 'useContextは最も近いContext.Providerから供給された値を直接取得します。',
      example: `const ThemeContext = createContext('light');

const Toolbar = () => {
  const theme = useContext(ThemeContext);
  return <button className={theme}>テーマを適用</button>;
};`,
      correctUsage: `const value = useContext(MyContext);`,
      incorrectUsage: `const value = MyContext; // Contextオブジェクトそのものではなくフックで値を読む`,
      explanation: 'useContextを使うとpropsを渡し続けなくても、コンポーネントツリーのどこからでも共有データにアクセスできます。',
      keyPoints: ['useContext', 'Providerから値を取得', 'バケツリレー解消'],
      benefits: ['深いツリーでも共有データが扱える', 'コードの見通しが良くなる']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'effectフックで外部システムと同期する',
      description: 'useEffectはDOM描画のあとでチャット接続やイベント購読など外部システムとの同期を行います。',
      example: `useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);`,
      correctUsage: `useEffect(() => {
  // 外部との同期
  return () => {
    // クリーンアップ
  };
}, [依存値]);`,
      incorrectUsage: `useEffect(() => {
  doSomething();
}); // 依存配列を省略すると毎レンダーで実行される`,
      explanation: '依存配列に指定した値が変化したときのみ副作用が再実行され、戻り値の関数でリソースを解放できます。',
      keyPoints: ['useEffect', '依存配列', 'クリーンアップ'],
      benefits: ['外部APIやブラウザAPIと安全に同期できる', '不要な処理を抑えられる']
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
  description:
    'useStateはstateカテゴリの基本フックで、関数コンポーネントにローカルな状態を追加します。初回レンダー時に初期値を受け取り、レンダーごとに現在の値と更新関数を返します。',
  keyPoints: [
    'const [state, setState] = useState(initial) の形で現在値と更新関数を受け取る',
    'setStateには新しい値か、前回の値を受け取るアップデート関数を渡せる',
    '同じ値を設定するとReactは再レンダーをスキップして最適化する',
    '初期値の計算が高コストな場合は useState(() => initialise()) のように遅延初期化できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'state',
      name: 'ギャラリーの選択状態を管理する',
      description: '現在表示中の作品のインデックスをstateで管理し、ボタンで切り替えます。',
      example: `const artworks = getArtworks();
const [index, setIndex] = useState(0);
const artwork = artworks[index];
return (
  <>
    <button onClick={() => setIndex((i) => (i + 1) % artworks.length)}>次へ</button>
    <h2>{artwork.title}</h2>
  </>
);`,
      correctUsage: `const [value, setValue] = useState(initialValue);`,
      incorrectUsage: `const value = useState(initialValue); // 配列を分割代入する必要がある`,
      explanation: 'useStateは配列で現在値と更新関数を返し、ユーザー操作に合わせて再レンダーします。',
      keyPoints: ['配列の分割代入', '再レンダー', 'ローカルstate'],
      benefits: ['UIを現在の状態と同期', '簡潔に状態を追加']
    },
    {
      id: 'ex2',
      type: 'state',
      name: 'アップデート関数で前回の値に基づいて更新',
      description: 'クリック回数を安全に更新するため、setStateに関数を渡します。',
      example: `const [count, setCount] = useState(0);
return <button onClick={() => setCount((c) => c + 1)}>クリック数: {count}</button>;`,
      correctUsage: `setCount((prev) => prev + 1);`,
      incorrectUsage: `setCount(count++); // ミューテーションは避ける`,
      explanation: '更新関数は前回の値を受け取り、新しい値を返します。非同期やバッチ更新でも安全です。',
      keyPoints: ['アップデート関数', '安全なインクリメント', 'バッチ処理'],
      benefits: ['競合を防ぐ', '更新ロジックを明示']
    },
    {
      id: 'ex3',
      type: 'state',
      name: '高コストな初期値を遅延計算する',
      description: '初期化時のみ重い処理を走らせるため、初期値を返す関数を渡します。',
      example: `const [todos, setTodos] = useState(() => loadInitialTodos());`,
      correctUsage: `useState(() => expensiveComputation());`,
      incorrectUsage: `useState(expensiveComputation()); // 毎レンダーで呼ばれる`,
      explanation: '関数を渡すと初回レンダー時だけ評価されるため、パフォーマンスを保てます。',
      keyPoints: ['遅延初期化', 'パフォーマンス', '初回だけ評価'],
      benefits: ['初期化コストを最小化', '必要なときだけ処理']
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
  description:
    'useReducerは複雑な状態遷移や明示的な更新ロジックが必要なときに使うstateフックです。reducer関数に「現在の状態」と「アクション」を渡し、戻り値を次の状態として採用します。',
  keyPoints: [
    'const [state, dispatch] = useReducer(reducer, initialState) の形式で利用する',
    'reducerは(state, action) => newStateという純粋関数でなければならない',
    'dispatch(action)を呼ぶとReactがreducerを実行し、返り値で再レンダーされる',
    '第三引数initで初期化ロジックを切り出し、遅延初期化にも対応できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'カウンターを複数アクションで管理する',
      description: 'INCREMENTとDECREMENTアクションを受け取るreducerでカウントを制御します。',
      example: `type Action = { type: 'increment' } | { type: 'decrement' };
const reducer = (count: number, action: Action) => {
  switch (action.type) {
    case 'increment':
      return count + 1;
    case 'decrement':
      return count - 1;
    default:
      return count;
  }
};
const [count, dispatch] = useReducer(reducer, 0);`,
      correctUsage: `dispatch({ type: 'increment' });`,
      incorrectUsage: `count = count + 1; // stateを直接書き換えない`,
      explanation: 'dispatchを呼ぶとreducerが実行され、新しいcountが返ってコンポーネントが再レンダーされます。',
      keyPoints: ['dispatch', '純粋関数', 'アクション'],
      benefits: ['状態遷移を一箇所に集約', '分岐が多いロジックでも読みやすい']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'フォーム入力をまとめて更新する',
      description: '入力イベントでフィールド名と値をdispatchし、オブジェクト状態を更新します。',
      example: `type FormState = { name: string; email: string };
type FormAction = { type: 'update'; field: keyof FormState; value: string };
const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'update':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};
const [form, dispatch] = useReducer(reducer, { name: '', email: '' });`,
      correctUsage: `dispatch({ type: 'update', field: 'email', value: e.target.value });`,
      incorrectUsage: `form.email = e.target.value; // 直接代入はしない`,
      explanation: 'reducerが新しい状態を返すため、副作用なく複数フィールドを一元管理できます。',
      keyPoints: ['オブジェクト状態', '展開コピー', '単方向データフロー'],
      benefits: ['フォームの更新ロジックを統一', '入力項目が増えても拡張しやすい']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: '遅延初期化で重い処理を分離する',
      description: '第三引数initを使って初回レンダー時のみ実行する初期化処理を切り出します。',
      example: `const init = (savedCount: number) => ({ count: savedCount });
const reducer = (state: { count: number }, action: { type: 'reset' | 'tick' }) => {
  switch (action.type) {
    case 'tick':
      return { count: state.count + 1 };
    case 'reset':
      return init(0);
    default:
      return state;
  }
};
const [state, dispatch] = useReducer(reducer, loadFromStorage(), init);`,
      correctUsage: `useReducer(reducer, initialArg, init);`,
      incorrectUsage: `useReducer(reducer, init(initialArg)); // initが毎回走る`,
      explanation: 'init関数は初回にだけ呼ばれるため、ストレージからの読み込みや変換処理を安全に行えます。',
      keyPoints: ['init関数', '遅延初期化', '永続化データ'],
      benefits: ['初期化コストを局所化', '状態の復元がしやすい']
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
  description:
    'useCallbackはパフォーマンスカテゴリのフックで、依存値が変わらない限り同じ関数インスタンスを再利用します。メモ化された子コンポーネントにコールバックを渡すときなどに有効です。',
  keyPoints: [
    'useCallback(fn, dependencies) は依存配列が変わったときだけ新しい関数を返す',
    'メモ化しても関数の挙動は変わらないため、参照の安定化が必要な場面でのみ使う',
    'React.memoでラップした子コンポーネントにpropsとして渡すと再レンダーを抑えられる',
    '依存配列を正しく指定しないと古い値を閉じ込めてしまうため、使用する変数はすべて依存に含める'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'メモ化された子コンポーネントへコールバックを渡す',
      description: 'React.memoでラップしたButtonが、依存するstateが変わらない限り再レンダーされません。',
      example: `const IncrementButton = memo(({ onIncrement }: { onIncrement: () => void }) => (
  <button onClick={onIncrement}>+1</button>
));
const [count, setCount] = useState(0);
const handleIncrement = useCallback(() => setCount((c) => c + 1), []);
return (
  <>
    <IncrementButton onIncrement={handleIncrement} />
    <p>{count}</p>
  </>
);`,
      correctUsage: `const handle = useCallback(() => setCount((c) => c + 1), []);`,
      incorrectUsage: `const handle = () => setCount((c) => c + 1); // 毎レンダーで関数が再生成`,
      explanation: 'useCallbackでコールバックを安定させると、props比較で差分がなくなり再レンダーを抑えられます。',
      keyPoints: ['React.memo', '参照の安定化', '依存配列'],
      benefits: ['子コンポーネントの再レンダー削減', 'パフォーマンス向上']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'フォーム入力用のイベントハンドラをメモ化する',
      description: 'useCallbackを使ってonChangeを再利用できるようにし、コンポーネントの再レンダーを抑えます。',
      example: `const [text, setText] = useState('');
const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  setText(event.target.value);
}, []);
return <input value={text} onChange={handleChange} />;`,
      correctUsage: `const handleChange = useCallback((e) => setValue(e.target.value), []);`,
      incorrectUsage: `const handleChange = (e) => setValue(e.target.value); // 依存が同じでも毎回新しい関数`,
      explanation: '安定したコールバックを渡すことで、入力コンポーネントが余計な再レンダーを行わずに済みます。',
      keyPoints: ['イベントハンドラ', '依存配列', 'フォーム入力'],
      benefits: ['無駄な再レンダーを防止', 'コードの明確化']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: '依存値に応じた関数の再生成を制御する',
      description: '複数の依存を扱う場合でも、必要な値をすべて依存配列に列挙します。',
      example: `const [locale, setLocale] = useState('ja');
const format = useCallback(
  (value: number) => new Intl.NumberFormat(locale).format(value),
  [locale]
);`,
      correctUsage: `useCallback(() => formatWith(locale), [locale]);`,
      incorrectUsage: `useCallback(() => formatWith(locale), []); // localeが更新されても古い値を使う`,
      explanation: '依存配列にlocaleを含めることで、ロケールが変わったときだけ新しいフォーマッタを生成できます。',
      keyPoints: ['依存の漏れを防ぐ', 'Intl API', '適切な再生成'],
      benefits: ['最新の値を参照', 'バグの温床を排除']
    }
  ]
};

export const useMemoData: LearningSection = {
  id: 'useMemo',
  title: 'useMemo',
  description:
    'useMemoはパフォーマンスカテゴリのフックで、計算結果をメモ化し、依存している値が変わらない限り再計算を避けます。描画時に重い処理を何度も実行するのを防ぎます。',
  keyPoints: [
    'useMemo(() => compute(value), [dependencies]) でメモ化された結果を得る',
    '依存配列に含めた値が変わると再計算され、変わらなければ前回の結果が再利用される',
    '軽い計算には不要。重い処理や参照の安定化が必要な場合のみ使う',
    'useCallbackは関数をメモ化するのに対し、useMemoは値（配列・オブジェクト・数値など）をメモ化する'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'フィルタ結果をキャッシュする',
      description: '検索クエリが変わったときだけリストを再計算します。',
      example: `const [query, setQuery] = useState('');
const filteredItems = useMemo(() => {
  return items.filter((item) => item.name.includes(query));
}, [items, query]);`,
      correctUsage: `useMemo(() => expensive(items, query), [items, query]);`,
      incorrectUsage: `items.filter((item) => item.name.includes(query)); // 毎レンダーで再計算`,
      explanation: 'itemsかqueryに変化がない限り、前回のフィルタ結果が再利用されます。',
      keyPoints: ['依存配列', '重い計算', 'リストフィルタ'],
      benefits: ['不要な計算を削減', '大規模データでのレスポンス向上']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: '安定したオプション配列を渡す',
      description: '子コンポーネントに渡す配列をuseMemoで固定し、不要な再レンダーを避けます。',
      example: `const options = useMemo(() => [
  { id: 1, label: 'First' },
  { id: 2, label: 'Second' }
], []);`,
      correctUsage: `const memoOptions = useMemo(() => createOptions(), []);`,
      incorrectUsage: `const options = [{ id: 1 }, { id: 2 }]; // 毎回新しい参照になる`,
      explanation: 'useMemoで配列の参照を固定すると、React.memoなどの最適化が効果的に働きます。',
      keyPoints: ['参照の安定化', '子コンポーネント', 'React.memoとの併用'],
      benefits: ['無駄な再レンダーを抑制', 'props比較がシンプル']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: '派生データをまとめて計算する',
      description: '完了済みタスク数など、複数のstateから導かれる値をメモ化します。',
      example: `const completedCount = useMemo(() => {
  return tasks.filter((task) => task.completed).length;
}, [tasks]);`,
      correctUsage: `useMemo(() => deriveValue(data), [data]);`,
      incorrectUsage: `const completedCount = tasks.filter((t) => t.completed).length; // 毎回フィルタ`,
      explanation: '派生データをuseMemoでまとめて計算すると、複雑なUIでも描画コストを抑えられます。',
      keyPoints: ['派生データ', '依存関係', 'コスト削減'],
      benefits: ['レンダーを軽量化', 'データ処理を明示']
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

export const useEffectData: LearningSection = {
  id: 'useEffect',
  title: 'useEffect',
  description:
    'useEffectは、コンポーネントのレンダー結果がDOMへ反映された後に外部システムと同期するためのeffectフックです。ネットワーク、ブラウザAPI、イベント購読などReactの外にある副作用を記述します。',
  keyPoints: [
    'useEffect(setup, dependencies) のsetupはレンダー後に実行され、必要ならクリーンアップ関数を返す',
    '依存配列に指定した値が変化したときのみsetupが再実行される。省略すると毎レンダーで再実行される',
    'クリーンアップ関数はエフェクトの再実行前とコンポーネントのアンマウント時に呼ばれる',
    '外部の状態と同期する場合のみuseEffectを使い、計算やデータ整形はレンダー中に行う'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'チャット接続を管理する',
      description: '部屋IDが変わったときだけ接続を張り直し、終了時に切断します。',
      example: `useEffect(() => {
  const connection = createConnection(roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]);`,
      correctUsage: `return () => connection.disconnect(); // クリーンアップを返す`,
      incorrectUsage: `createConnection(roomId); // クリーンアップを返さないと接続が残る`,
      explanation: '依存配列にroomIdを指定すると部屋が変わったときだけエフェクトが再実行され、戻り値でリソースを解放できます。',
      keyPoints: ['依存配列', 'クリーンアップ', '外部接続'],
      benefits: ['リークを防ぐ', '必要な時だけ再接続']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'ドキュメントタイトルを同期する',
      description: 'カウンターが変わるたびにブラウザのタイトルを更新します。',
      example: `const [count, setCount] = useState(0);
useEffect(() => {
  document.title = \`Click count: \${count}\`;
}, [count]);`,
      correctUsage: `useEffect(() => { document.title = title; }, [title]);`,
      incorrectUsage: `document.title = title; // レンダー中に副作用を書かない`,
      explanation: '副作用をレンダー外に移動することで、描画ロジックとブラウザAPIの同期ロジックを分離できます。',
      keyPoints: ['ブラウザAPI', 'レンダー後', '依存値の変化'],
      benefits: ['UIとブラウザ状態を一致', '描画を妨げない']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'イベントリスナーを登録・解除する',
      description: 'スクロール位置を追跡するためにウィンドウイベントを購読し、クリーンアップで解除します。',
      example: `useEffect(() => {
  const onScroll = () => setY(window.scrollY);
  window.addEventListener('scroll', onScroll);
  return () => window.removeEventListener('scroll', onScroll);
}, []);`,
      correctUsage: `return () => window.removeEventListener('scroll', onScroll);`,
      incorrectUsage: `window.addEventListener('scroll', onScroll); // クリーンアップがない`,
      explanation: 'クリーンアップを返すことで、再レンダーやアンマウント時に不要なリスナーが残りません。',
      keyPoints: ['イベント購読', 'リスナー解除', '一度だけ実行'],
      benefits: ['副作用を安全に管理', 'メモリーリークを防ぐ']
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
  description:
    'useContextはcontextカテゴリのフックで、最も近いContext.Providerが提供する値を読み取ります。propsを手渡しで中継しなくても、ツリーの深い階層から共有データにアクセスできます。',
  keyPoints: [
    'createContext(defaultValue) でContextオブジェクトを作成し、Providerで値を供給する',
    'useContext(MyContext) を呼ぶと、ツリー上で最も近いProviderが渡したvalueを返す',
    'Providerのvalueが変わると、該当Contextを読むコンポーネントが再レンダーされる',
    'defaultValueはProviderが存在しない場合にのみ使われる。使用前提ならnullチェックやエラーを投げておくと安全'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'テーマ設定を参照する',
      description: 'アプリ全体のテーマをContextで供給し、ボタンで読み出します。',
      example: `const ThemeContext = createContext<'light' | 'dark'>('light');
const Toolbar = () => {
  const theme = useContext(ThemeContext);
  return <button className={theme}>テーマ: {theme}</button>;
};`,
      correctUsage: `const value = useContext(ThemeContext);`,
      incorrectUsage: `const value = ThemeContext; // Contextオブジェクトのままでは値が読めない`,
      explanation: 'useContextは最も近いProviderからテーマ値を取得し、UIに反映します。',
      keyPoints: ['Provider', '最も近い値', '共有状態'],
      benefits: ['バケツリレーを解消', 'テーマを一括管理']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: 'ネストしたProviderで値を上書きする',
      description: 'ネストしたProviderは親の値を上書きし、useContextは最も内側の値を受け取ります。',
      example: `<ThemeContext.Provider value="light">
  <Sidebar />
  <ThemeContext.Provider value="dark">
    <Content />
  </ThemeContext.Provider>
</ThemeContext.Provider>`,
      correctUsage: `<ThemeContext.Provider value={value}>...</ThemeContext.Provider>`,
      incorrectUsage: `<ThemeContext.Provider>...</ThemeContext.Provider> // valueが必須`,
      explanation: 'Contentはdark、Sidebarはlightを受け取り、それぞれのスタイルを適用できます。',
      keyPoints: ['ネストしたProvider', '上書き', 'スコープ'],
      benefits: ['部分的な上書きが可能', '柔軟なテーマ構成']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'カスタムフックでContextをラップする',
      description: 'Contextの値が必須の場合、カスタムフックでnullチェックを行い安全に提供します。',
      example: `const AuthContext = createContext<User | null>(null);
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('AuthContextがProviderでラップされていません');
  }
  return auth;
};`,
      correctUsage: `const auth = useAuth();`,
      incorrectUsage: `const auth = useContext(AuthContext)!; // 非null断言だけに頼るのは危険`,
      explanation: 'カスタムフックでガードすることで、Providerの付け忘れを早期に検知できます。',
      keyPoints: ['カスタムフック', '安全な取得', 'エラーハンドリング'],
      benefits: ['型安全を向上', '開発時に問題を早期発見']
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
  description:
    'useLayoutEffectはuseEffectと同じAPIを持つ副作用フックですが、DOMの更新後すぐ、ブラウザが画面を描画する前に同期的に実行されます。レイアウトの測定やチラつき防止など、描画前にDOMを調整したい場面で利用します。',
  keyPoints: [
    'useLayoutEffectは描画前にブロッキングされるため、重い処理を入れるとUIの表示が遅くなる',
    'レイアウト測定やスクロール位置の復元など、描画前にDOM情報を扱う必要がある場合に限定して使う',
    '通常はuseEffectを使い、ブラウザに描画が見えてしまう不具合がある場合のみuseLayoutEffectへ切り替える',
    'useLayoutEffectでもクリーンアップ関数を返すことでイベントリスナーやミューテーションを解除できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: 'ローカルストレージのテーマを描画前に適用する',
      description: '初回レンダーの直前にテーマを決定し、フラッシュを防ぎます。',
      example: `const [theme, setTheme] = useState('light');
useLayoutEffect(() => {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
}, []);`,
      correctUsage: `useLayoutEffect(() => { /* 描画前に同期 */ }, []);`,
      incorrectUsage: `useEffect(() => { setTheme(saved); }, []); // useEffectだと一瞬デフォルトが見える`,
      explanation: '描画前に状態を更新することで、初期レンダー時のチラつきを避けられます。',
      keyPoints: ['チラつき防止', '初期表示', '同期更新'],
      benefits: ['ユーザー体験向上', '初期描画が自然になる']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: '要素サイズを測定して位置を調整する',
      description: 'DOMノードの幅を取得し、それに応じたスタイルを設定します。',
      example: `const dialogRef = useRef<HTMLDivElement>(null);
useLayoutEffect(() => {
  const width = dialogRef.current?.offsetWidth ?? 0;
  dialogRef.current?.style.setProperty('--dialog-width', \`\${width}px\`);
});`,
      correctUsage: `useLayoutEffect(() => { /* DOM計測 */ });`,
      incorrectUsage: `useEffect(() => { const width = ref.current?.offsetWidth; }); // 描画後にレイアウトがズレる`,
      explanation: 'useLayoutEffectは描画前に走るため、計測した値で直ちにスタイルを更新できます。',
      keyPoints: ['DOM計測', '同期的更新', 'Refの活用'],
      benefits: ['レイアウトの整合性を保つ', '視覚的なズレを防ぐ']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'アニメーションの初期値をセットする',
      description: 'アニメーション開始前にtransformを調整し、初期フレームを整えます。',
      example: `const itemRef = useRef<HTMLDivElement>(null);
useLayoutEffect(() => {
  if (itemRef.current) {
    itemRef.current.style.transform = 'translateX(0)';
  }
}, []);`,
      correctUsage: `useLayoutEffect(() => { ref.current!.style.transform = 'translateX(0)'; }, []);`,
      incorrectUsage: `useEffect(() => { ref.current!.style.transform = 'translateX(0)'; }, []); // 描画後に一瞬ズレる`,
      explanation: '描画前にtransformを設定することで、アニメーション開始時のジャンプを防げます。',
      keyPoints: ['アニメーション初期化', '同期処理', '視覚的な一貫性'],
      benefits: ['滑らかなアニメーション', '初期フレームのチラつきを回避']
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
  description:
    'useRefはrefカテゴリのフックで、再レンダーを引き起こさずにデータやDOMノードへの参照を保持します。currentプロパティに格納された値を書き換えても、コンポーネントは再描画されません。',
  keyPoints: [
    'const ref = useRef(initialValue) で { current: initialValue } を返し、ref.currentに読み書きできる',
    'refはレンダー間で共有されるため、ミューテーションしてもコンポーネントは再レンダーされない',
    'DOM要素にref属性を渡すと、レンダー後にその要素がref.currentへ設定される',
    'forwardRefとuseImperativeHandleを併用すると、親コンポーネントに命令的なメソッドを公開できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'hook',
      name: '入力要素へフォーカスを移す',
      description: 'ボタンのクリックでテキストボックスにフォーカスを当てます。',
      example: `const inputRef = useRef<HTMLInputElement>(null);
return (
  <>
    <input ref={inputRef} type="text" />
    <button onClick={() => inputRef.current?.focus()}>フォーカス</button>
  </>
);`,
      correctUsage: `<input ref={inputRef} />`,
      incorrectUsage: `const inputRef = null; <input ref={inputRef} /> // useRefで作らない`,
      explanation: 'DOMノードの参照はref.currentに保存され、クリック時にfocus()を呼び出せます。',
      keyPoints: ['DOMアクセス', 'currentプロパティ', 'イベント操作'],
      benefits: ['命令的な操作が可能', '再レンダーせずにDOMへアクセス']
    },
    {
      id: 'ex2',
      type: 'hook',
      name: '前回の値を保持する',
      description: 'useRefで前回のpropsを保持し、描画間での差分を調べます。',
      example: `const prevCount = useRef<number | null>(null);
useEffect(() => {
  prevCount.current = count;
});
return <p>前回: {prevCount.current ?? 'なし'} / 現在: {count}</p>;`,
      correctUsage: `prev.current = value;`,
      incorrectUsage: `const prev = { current: value }; // レンダーごとに新しくなる`,
      explanation: 'refはレンダー間で変わらないため、前回の値を安全に保持できます。',
      keyPoints: ['レンダー間の共有', '前回値の比較', 'useEffectとの併用'],
      benefits: ['状態の履歴を追跡', '追加のstateを増やさずに済む']
    },
    {
      id: 'ex3',
      type: 'hook',
      name: 'useImperativeHandleで命令的APIを公開する',
      description: 'forwardRefした子コンポーネントからメソッドを公開し、親が呼び出せるようにします。',
      example: `type DialogHandles = { open: () => void; close: () => void };
const Dialog = forwardRef<DialogHandles>((_, ref) => {
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));
  return open ? <div role="dialog">内容</div> : null;
});
const dialogRef = useRef<DialogHandles>(null);
return <Dialog ref={dialogRef} />;`,
      correctUsage: `useImperativeHandle(ref, () => ({ open: () => setOpen(true) }));`,
      incorrectUsage: `ref.current = { open: () => setOpen(true) }; // 直接代入は避ける`,
      explanation: 'useImperativeHandleを使うと、内部実装は隠しつつ親に必要なコマンドだけを提供できます。',
      keyPoints: ['forwardRef', 'useImperativeHandle', '命令的ハンドル'],
      benefits: ['コンポーネント間の柔軟な連携', '実装詳細を隠蔽']
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
  description:
    'カスタムフックは「use」で始まる関数で、他のHooksを組み合わせた再利用可能なロジックをまとめます。状態管理や副作用のパターンを切り出し、複数コンポーネントから共有できます。',
  keyPoints: [
    'フックのルールを守るため、カスタムフック内でもトップレベルでHooksを呼び出す',
    '命名は必ずuseで始め、利用者にHookであることを伝える',
    '複数のHooksを組み合わせることで、状態と副作用、パフォーマンス最適化などを一括で扱える',
    'useDebugValueを使うとReact DevToolsでカスタムフックの内部状態を表示できる'
  ],
  examples: [
    {
      id: 'ex1',
      type: 'custom',
      name: 'オンライン状態を監視するuseOnlineStatus',
      description: 'オンライン・オフラインイベントを購読し、現在の接続状態を返します。',
      example: `const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return online;
};`,
      correctUsage: `const online = useOnlineStatus();`,
      incorrectUsage: `useOnlineStatus(); // 返り値を使わない`,
      explanation: 'Hook内でuseStateとuseEffectを組み合わせ、接続状態を再利用可能なAPIとして提供します。',
      keyPoints: ['状態と副作用の組み合わせ', 'イベント購読', '再利用性'],
      benefits: ['複数コンポーネントで同じロジックを共有', 'UIを接続状態と同期']
    },
    {
      id: 'ex2',
      type: 'custom',
      name: '入力欄を共通化するuseInput',
      description: '入力値とonChangeハンドラを返すカスタムフックです。',
      example: `const useInput = (initial = '') => {
  const [value, setValue] = useState(initial);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);
  useDebugValue(value);
  return { value, onChange, reset: () => setValue(initial) };
};`,
      correctUsage: `const { value, onChange } = useInput();`,
      incorrectUsage: `const input = useInput; // フックは呼び出して使う`,
      explanation: '状態・イベント・デバッグ表示をまとめることで、フォームの入力欄を簡潔に扱えます。',
      keyPoints: ['useState', 'useCallback', 'useDebugValue'],
      benefits: ['フォームロジックの共通化', '再利用時も読みやすい']
    },
    {
      id: 'ex3',
      type: 'custom',
      name: '外部データを取得するuseDataSource',
      description: 'フェッチ処理と状態をひとまとめにして、呼び出し側はデータの利用に集中できます。',
      example: `const useDataSource = (resourceId: string) => {
  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetchData(resourceId).then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, [resourceId]);
  return data;
};`,
      correctUsage: `const user = useDataSource('user:1');`,
      incorrectUsage: `useDataSource(resourceId); // 依存値を渡さない`,
      explanation: 'カスタムフックにまとめることで、データ取得とキャンセル処理を複数箇所で安全に再利用できます。',
      keyPoints: ['データ取得', 'クリーンアップ', '依存配列'],
      benefits: ['フェッチロジックを共有', 'UIコードを簡潔に保つ']
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

export const useMemoPractice: PracticeQuestion[] = [
  {
    id: 'q1',
    question: 'useMemoの主な用途はどれ？',
    code: '',
    options: ['値のメモ化', '関数のメモ化', '副作用の管理', '状態管理'],
    correctAnswer: 0,
    explanation: 'useMemoは重い計算結果や参照をメモ化するためのフックです。',
    type: 'hook'
  },
  {
    id: 'q2',
    question: 'useMemoの依存配列に指定した値が変化した場合、どうなる？',
    code: '',
    options: ['値が再計算される', '関数が再生成される', '副作用が発生する', '何も起きない'],
    correctAnswer: 0,
    explanation: '依存配列の値が変わると、useMemoでメモ化した値が再計算されます。',
    type: 'hook'
  },
  {
    id: 'q3',
    question: 'useMemoを使うと効果的なケースはどれ？',
    code: '',
    options: [
      '重い計算の結果をキャッシュしたいとき',
      '副作用を管理したいとき',
      'イベントハンドラを安定させたいとき',
      'コンポーネントをマウントしたいとき'
    ],
    correctAnswer: 0,
    explanation: '再計算コストが高い処理や、大きな配列・オブジェクトを毎回生成したくない場合にuseMemoが有効です。',
    type: 'hook'
  },
  {
    id: 'q4',
    question: 'useMemoとuseCallbackの違いは？',
    code: '',
    options: [
      'useMemoは値、useCallbackは関数をメモ化する',
      'どちらも値をメモ化する',
      'どちらも関数をメモ化する',
      '違いはない'
    ],
    correctAnswer: 0,
    explanation: 'useMemoは値をメモ化し、useCallbackは関数をメモ化します。用途を区別して使い分けます。',
    type: 'hook'
  }
];