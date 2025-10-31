export type TopicKey = 'routing' | 'rendering' | 'typescript' | 'optimize';
export type SubRenderingKey = 'ssr' | 'csr' | 'ssg' | 'isr';

export interface TopicDetail {
  icon: string;
  title: string;
  summary: string;
  features: string[];
  useCases: string[];
  cautions: string[];
  notes: string[];
}

export const topicDetails: Record<TopicKey, TopicDetail> = {
  routing: {
    icon: "📁",
    title: "ファイルベースルーティング",
    summary: "File-based Routingは、Next.js 13以降のApp Routerで採用されているルーティングシステムです。ファイルシステムの構造に基づいて自動的にルートが生成される仕組みで、直感的で強力なルーティングシステムを提供します。",
    features: [
      "ファイル名 = URLパス: app/page.tsx → /",
      "フォルダ名 = URLセグメント: app/about/page.tsx → /about",
      "特殊ファイル: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx",
      "動的ルーティング: [param], [...param], [[...param]]",
      "ルートグループ: フォルダ名を()で囲むとURLに影響しない",
      "並列ルート: @folder構文で同じレイアウトレベルで複数ページを同時表示",
      "インターセプトルート: (.)folder構文で同じURLで異なるUIを表示"
    ],
    useCases: [
      "基本的なページ構造の構築",
      "動的コンテンツ（ブログ、商品詳細など）の実装",
      "モーダル、サイドバー、タブなどの複雑なUI",
      "認証・認可が必要なページの実装",
      "SEO最適化されたページ構造"
    ],
    cautions: [
      "ルートの優先順位を理解する必要がある（静的 > 動的 > キャッチオール）",
      "動的ルートは必要最小限に抑える",
      "パラメータの検証を適切に行う",
      "ファイル構造の整理が重要",
      "適切なエラーハンドリングの実装が必要"
    ],
    notes: [
      "page.tsx: ルートのUIを定義、各ルートに1つ必要",
      "layout.tsx: 複数のページで共有されるUI、子ページを{children}として受け取る",
      "loading.tsx: ページ読み込み中のUI、Suspense境界として機能",
      "error.tsx: エラー発生時のUI、errorとresetプロパティを受け取る",
      "not-found.tsx: 404エラーページ、notFound()関数と組み合わせて使用",
      "メタデータは静的・動的の両方で設定可能",
      "ルートの生成は静的生成、動的生成、ISRから選択可能",
      "ベストプラクティスとして、ファイル構造の整理、パフォーマンスの考慮、セキュリティの実装が重要"
    ]
  },
  rendering: {
    icon: "🖥️",
    title: "レンダリング",
    summary: "Next.jsでは用途に応じて様々なレンダリング手法（SSG/SSR/CSRなど）を選択できます。下のタブで切り替えて詳細を確認しましょう。",
    features: [],
    useCases: [],
    cautions: [],
    notes: []
  },
  typescript: {
    icon: "🔒",
    title: "TypeScript対応",
    summary: "Next.jsはTypeScriptを標準サポートしており、型安全な開発ができます。ts/tsxファイルを使うだけで型推論や型チェックが有効になります。",
    features: [
      "TypeScriptの型推論・型チェックが自動で有効",
      "型定義ファイル（.d.ts）もサポート",
      "型エラーはビルド時やエディタで即時検出",
      "型安全なAPI通信やProps管理が可能"
    ],
    useCases: [
      "大規模なプロジェクトやチーム開発",
      "バグを未然に防ぎたい場合",
      "型安全なAPI設計やコンポーネント設計"
    ],
    cautions: [
      "型定義が複雑になりすぎると学習コストが上がる",
      "外部ライブラリの型定義（@types/xxx）が必要な場合がある"
    ],
    notes: [
      "Next.jsプロジェクトでts/tsxファイルを作成するだけでTypeScriptが有効になります。"
    ]
  },
  optimize: {
    icon: "🚀",
    title: "自動最適化",
    summary: "Next.jsは画像やフォント、バンドルサイズなどを自動で最適化し、パフォーマンスやユーザー体験を向上させます。",
    features: [
      "next/imageによる画像の自動最適化・遅延読み込み",
      "next/fontによるフォントの最適化",
      "コード分割とバンドルの自動最適化",
      "静的ファイルのキャッシュ制御"
    ],
    useCases: [
      "画像やフォントを多用するWebサイト",
      "パフォーマンスやSEOを重視する場合",
      "グローバルに配信するサービス"
    ],
    cautions: [
      "画像最適化はVercelなど一部の環境でのみフル機能が利用可能",
      "自動最適化の挙動を理解しておくとトラブル時に役立つ"
    ],
    notes: [
      "next/imageやnext/fontは公式ドキュメントも参照してください。"
    ]
  }
};

export const subRenderingDetails: Record<SubRenderingKey, TopicDetail> = {
  ssg: {
    icon: "📦",
    title: "静的サイト生成（SSG）",
    summary: "SSG（Static Site Generation）は、ビルド時にあらかじめHTMLを生成し、静的ファイルとして配信するレンダリング手法です。",
    features: [
      "getStaticProps 関数を使ってビルド時にAPIなどからデータを取得。",
      "データは props としてページコンポーネントに渡される。",
      "生成されたHTMLファイルはサーバーに保存され、アクセス時はこれを直接返す。",
      "初期表示は非常に高速で、SEOにも有効。",
      "ユーザーの操作後は、React アプリとしてクライアントサイドで動的にデータ取得・表示更新も可能。"
    ],
    useCases: [
      "ブログ記事のような更新頻度が低いページ",
      "ビルド後に内容が変わらないページ",
      "初期描画の速さを重視する場合"
    ],
    cautions: [
      "ビルド時のデータが固定されるため、リアルタイム性が求められるコンテンツには不向き",
      "初期描画では古いデータが表示される可能性がある",
      "ユーザーごとに異なる表示（ログインユーザー用など）には不適"
    ],
    notes: [
      "getStaticProps を使わずに静的HTMLだけを返す「Static」ページも、用途や性質が似ていることから本書ではSSGに含めて解説"
    ]
  },
  ssr: {
    icon: "⚡",
    title: "サーバーサイドレンダリング（SSR）",
    summary: "SSR（Server Side Rendering）は、ページにアクセスがあるたびにサーバー側でデータを取得・HTMLを生成し、それをクライアントに返す方式。getServerSideProps 関数を使い、リクエストのたびに実行。サーバーで描画されたHTMLがレスポンスとして返される。",
    features: [
      "毎回サーバー側で最新データを取得するため、リアルタイム性が高い。",
      "SEOに強い：クローラーに完全なHTMLを提供できる。",
      "各ユーザーに応じた動的なHTML生成が可能（例：ログインユーザーの専用ページなど）。"
    ],
    useCases: [
      "最新データの表示が求められるページ（例：価格情報、ログインユーザーのマイページなど）。",
      "SEOが重要なページかつリアルタイム性が必要な場合。"
    ],
    cautions: [
      "毎回サーバー処理が必要になるため、パフォーマンス（レイテンシ）に課題がある。",
      "サーバー負荷が高まる：高トラフィック時にはスケーラビリティの課題。",
      "SSRを利用するにはNode.jsなどのサーバーサイドJavaScript実行環境が必須。",
      "クライアントとサーバーでJavaScriptロジックが分散する可能性がある"
    ],
    notes: []
  },
  csr: {
    icon: "🖥️",
    title: "クライアントサイドレンダリング（CSR）",
    summary: "CSR（Client Side Rendering）は、ビルド時にデータを取得せず、ブラウザ上で初期表示した後に非同期でデータを取得し、画面を更新する描画方式です。",
    features: [
      "HTMLは静的に用意され、必要なデータは後からクライアント側で取得",
      "初期表示の速度やSEOにはあまり向かない",
      "useEffect や useSWR を使ってデータ取得を行う",
      "基本的に SSG/SSR/ISRなどと組み合わせて使用する",
      "Reactが本来得意とするSPA的な挙動に近い"
    ],
    useCases: [
      "ユーザーごとに表示が異なるページ",
      "リアルタイム性が求められるページ",
      "SEOを必要としない内部向けアプリなど"
    ],
    cautions: [
      "初期表示時にはデータが揃っていないため、ローディングUIが必要",
      "検索エンジンに対するSEOは弱い傾向がある"
    ],
    notes: [
      "SSGで共通部分のHTMLをビルドし、個別部分はCSRで描画する併用例も多い",
      "ページ初期表示後にユーザー情報などをクライアントで取得して表示することで、初期表示が高速でキャッシュも活用できる",
      "動的データに対応しやすく、サーバー負荷が軽減される",
      "静的部分をCDNキャッシュできるので高速"
    ]
  },
  isr: {
    icon: "🔄",
    title: "インクリメンタル静的再生成（ISR）",
    summary: "ISR（Incremental Static Regeneration）は、SSG（静的サイト生成）の拡張版で、ビルド時に生成された静的ページに有効期限（寿命）を設定することで、一定時間後に自動的に再生成できる手法です。getStaticProps に revalidate を指定することで、一定時間ごとにバックグラウンドで新しいページが生成される。ユーザーには古いページが即時に返されるが、次回アクセス時には最新データが反映された新しいページが表示される。",
    features: [
      "SSGの高速性と、SSRのデータ鮮度のバランスを取った手法。",
      "アクセス時に古いHTMLが返されたとしても、バックグラウンドで再生成が走る。",
      "サーバーで毎回処理は不要なので、SSRより高速なレスポンスが可能。",
      "HTMLはキャッシュされるため、CDN経由での配信も有効。"
    ],
    useCases: [
      "ページの内容が定期的に更新されるが、毎回リアルタイムである必要はない場合。",
      "例：商品情報一覧ページ、記事のランキングなど。"
    ],
    cautions: [
      "有効期限中は古い内容が表示される可能性がある。",
      "データの一貫性（強整合性）が必要なケースには向かない。",
      "クライアント側で最新情報に置き換えるなどの補完が推奨される"
    ],
    notes: [
      "getStaticPropsでrevalidateを指定することで簡単にISRを実現できる。",
      "例: export const getStaticProps: GetStaticProps = async () => { return { props: { ... }, revalidate: 60 } }"
    ]
  }
};
