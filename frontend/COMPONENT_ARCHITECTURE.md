# フロントエンド コンポーネントアーキテクチャ

このドキュメントは、Next.js プロジェクトのコンポーネント構造とベストプラクティスを説明します。

## 📊 現在の状態

✅ **すでにベストプラクティスに従った設計になっています**

このプロジェクトは、React/Next.js の推奨パターンに従い、適切にコンポーネントが分割されています。

## 📁 ディレクトリ構造

```
frontend/src/
├── api/                          # API クライアントと設定
│   ├── auth.ts                   # 認証API
│   ├── client.ts                 # HTTPクライアント
│   └── constants.ts              # API定数
│
├── app/                          # Next.js App Router
│   ├── components/               # アプリケーションコンポーネント
│   │   │
│   │   ├── header/              # 🔹 ヘッダー関連コンポーネント
│   │   │   ├── Navigation.tsx   # ナビゲーションリンク
│   │   │   ├── UserActions.tsx  # ログイン/ログアウト
│   │   │   ├── ThemeToggle.tsx  # テーマ切り替え
│   │   │   └── SidebarToggle.tsx # サイドバートグル
│   │   │
│   │   ├── sidebar/             # 🔹 サイドバー関連コンポーネント
│   │   │   ├── QuickNav.tsx     # クイックナビゲーション
│   │   │   ├── UsefulLinksCard.tsx # 便利なリンク
│   │   │   ├── ClockCard.tsx    # 現在時刻
│   │   │   ├── TodayTipCard.tsx # 今日のヒント
│   │   │   ├── LearningProgressCard.tsx # 学習進捗
│   │   │   └── BookmarksCard.tsx # ブックマーク
│   │   │
│   │   ├── footer/              # 🔹 フッター関連コンポーネント
│   │   │   └── FooterSection.tsx # フッターセクション
│   │   │
│   │   ├── ui/                  # 🔹 再利用可能なUIコンポーネント
│   │   │   ├── GradientCard.tsx # グラデーションカード
│   │   │   └── SectionHeader.tsx # セクションヘッダー
│   │   │
│   │   ├── layout/              # 🔹 レイアウトコンポーネント
│   │   │
│   │   ├── Header.tsx           # ヘッダーコンテナ
│   │   ├── Footer.tsx           # フッターコンテナ
│   │   ├── LeftSidebar.tsx      # 左サイドバーコンテナ
│   │   ├── RightSidebar.tsx     # 右サイドバーコンテナ
│   │   ├── MainContent.tsx      # メインコンテンツラッパー
│   │   ├── SidebarContext.tsx   # サイドバー状態管理
│   │   ├── ThemeProvider.tsx    # テーマ管理
│   │   ├── LoginForm.tsx        # ログインフォーム
│   │   ├── RegisterForm.tsx     # 登録フォーム
│   │   └── ScrollToTop.tsx      # スクロールトップボタン
│   │
│   └── [pages]/                 # 各ページ
│
├── components/                   # グローバル共有コンポーネント
│   ├── FeatureCard.tsx          # 機能カード
│   ├── GoogleLoginButton.tsx    # Googleログインボタン
│   └── Quiz.tsx                 # クイズコンポーネント
│
├── contexts/                     # React Context
│   └── AuthContext.tsx          # 認証コンテキスト
│
├── hooks/                        # カスタムフック
│   ├── useAuth.ts               # 認証フック
│   ├── useLocalStorage.ts       # ローカルストレージフック
│   ├── useScrollAnimation.ts    # スクロールアニメーションフック
│   └── useTheme.ts              # テーマフック
│
├── lib/                          # ライブラリとヘルパー
│   └── api.ts                   # API ヘルパー
│
├── types/                        # TypeScript型定義
│   ├── index.ts                 # 共通型
│   ├── react.ts                 # React関連型
│   └── typescript.ts            # TypeScript学習型
│
├── data/                         # 静的データ
│   ├── nextjs-data.ts
│   ├── quiz-data.ts
│   ├── react-data.ts
│   └── typescript-data.ts
│
└── utils/                        # ユーティリティ関数
    ├── format.ts                # フォーマット関数
    └── validation.ts            # バリデーション関数
```

## 🎯 コンポーネント設計原則

### 1. 単一責任の原則（SRP）

各コンポーネントは1つの明確な責任を持ちます。

#### ✅ 良い例（現在の実装）

```tsx
// header/Navigation.tsx
// → ナビゲーションリンクの表示のみを担当

// header/UserActions.tsx
// → ユーザーアクション（ログイン/ログアウト）のみを担当

// header/ThemeToggle.tsx
// → テーマ切り替えのみを担当
```

#### ❌ 悪い例

```tsx
// Header.tsx に全ての機能を詰め込む
// → ナビゲーション + ユーザーアクション + テーマ + サイドバー...
```

### 2. コンポーネント合成（Composition）

小さなコンポーネントを組み合わせて大きな機能を作ります。

```tsx
// Header.tsx（コンテナ）
<Header>
  <SidebarToggle side="left" />
  <Navigation />
  <UserActions />
  <ThemeToggle />
  <Logo />
  <SidebarToggle side="right" />
</Header>
```

### 3. Props による依存性注入

コンポーネントは必要なデータと関数をPropsとして受け取ります。

```tsx
interface SidebarToggleProps {
  side: "left" | "right";
  onClick?: () => void;
}

function SidebarToggle({ side, onClick }: SidebarToggleProps) {
  // ...
}
```

## 📦 コンポーネント階層

```
┌─────────────────────────────────────────┐
│            Root Layout                   │
├─────────────────────────────────────────┤
│                                          │
│  ┌────────────────────────────────┐    │
│  │          Header                 │    │
│  │  ┌──────┐ ┌───────┐ ┌───────┐ │    │
│  │  │Toggle│ │  Nav  │ │Actions│ │    │
│  │  └──────┘ └───────┘ └───────┘ │    │
│  └────────────────────────────────┘    │
│                                          │
│  ┌───┐  ┌─────────────────┐  ┌───┐    │
│  │ L │  │                 │  │ R │    │
│  │ e │  │  MainContent    │  │ i │    │
│  │ f │  │                 │  │ g │    │
│  │ t │  │   {children}    │  │ h │    │
│  │   │  │                 │  │ t │    │
│  │ S │  └─────────────────┘  │   │    │
│  │ i │                        │ S │    │
│  │ d │                        │ i │    │
│  │ e │                        │ d │    │
│  │ b │                        │ e │    │
│  │ a │                        │ b │    │
│  │ r │                        │ a │    │
│  │   │                        │ r │    │
│  └───┘                        └───┘    │
│                                          │
│  ┌────────────────────────────────┐    │
│  │          Footer                 │    │
│  │  ┌─────────┐ ┌─────────┐      │    │
│  │  │Section 1│ │Section 2│      │    │
│  │  └─────────┘ └─────────┘      │    │
│  └────────────────────────────────┘    │
│                                          │
└─────────────────────────────────────────┘
```

## 🔧 各コンポーネントの責任

### Layout Components（レイアウト）

#### **Header.tsx**
- 役割: ヘッダーコンテナ
- 責任: 子コンポーネントの配置とレイアウト
- 状態: なし（子に委譲）

#### **LeftSidebar.tsx / RightSidebar.tsx**
- 役割: サイドバーコンテナ
- 責任: カードコンポーネントの配置とアニメーション
- 状態: `SidebarContext` から開閉状態を取得

#### **MainContent.tsx**
- 役割: メインコンテンツラッパー
- 責任: サイドバーに応じたパディング調整
- 状態: サイドバー状態を監視

#### **Footer.tsx**
- 役割: フッターコンテナ
- 責任: フッターセクションの配置

### Header Components（ヘッダー）

#### **Navigation.tsx**
- 役割: ナビゲーションリンク
- 責任: ルーティングとアクティブ状態の表示

#### **UserActions.tsx**
- 役割: ユーザーアクション
- 責任: ログイン/ログアウトボタンの表示

#### **ThemeToggle.tsx**
- 役割: テーマ切り替え
- 責任: ダーク/ライトモードの切り替え

#### **SidebarToggle.tsx**
- 役割: サイドバー開閉ボタン
- 責任: サイドバーの表示/非表示制御

### Sidebar Components（サイドバー）

#### **左サイドバー**
- **QuickNav.tsx**: クイックナビゲーション（ページリンク集）
- **UsefulLinksCard.tsx**: 便利な外部リンク集

#### **右サイドバー**
- **ClockCard.tsx**: 現在時刻と日付の表示
- **TodayTipCard.tsx**: ランダムなヒントの表示
- **LearningProgressCard.tsx**: 学習進捗の可視化
- **BookmarksCard.tsx**: ブックマークリスト

### UI Components（再利用可能）

#### **GradientCard.tsx**
- 役割: 汎用グラデーションカード
- 再利用性: 高
- Props: `children`, `gradient`, `border`

#### **SectionHeader.tsx**
- 役割: セクション見出し
- 再利用性: 高
- Props: `icon`, `title`, `gradient`

### Footer Components（フッター）

#### **FooterSection.tsx**
- 役割: フッターの1セクション
- 再利用性: 高
- Props: `icon`, `title`, `gradient`, `children`

## 🎨 デザインパターン

### 1. Container/Presentational Pattern

**Container（ロジック担当）:**
```tsx
// Header.tsx
export default function Header() {
  // ロジックと状態管理
  return (
    <header>
      <Navigation />
      <UserActions />
    </header>
  );
}
```

**Presentational（表示担当）:**
```tsx
// header/Navigation.tsx
export default function Navigation() {
  // 表示のみ
  return <nav>{/* リンク */}</nav>;
}
```

### 2. Compound Components Pattern

関連するコンポーネントをグループ化:

```tsx
<Sidebar>
  <Sidebar.Header />
  <Sidebar.Nav />
  <Sidebar.Footer />
</Sidebar>
```

### 3. Render Props / Children Pattern

柔軟な構成:

```tsx
<GradientCard>
  {/* 任意のコンテンツ */}
</GradientCard>
```

## 📝 命名規則

### ファイルとコンポーネント

- **コンポーネント**: `PascalCase.tsx` (例: `UserActions.tsx`)
- **ユーティリティ**: `camelCase.ts` (例: `formatDate.ts`)
- **定数**: `UPPER_SNAKE_CASE` (例: `API_BASE_URL`)
- **カスタムフック**: `useXxx.ts` (例: `useAuth.ts`)
- **Context**: `XxxContext.tsx` (例: `AuthContext.tsx`)
- **Provider**: `XxxProvider.tsx` (例: `ThemeProvider.tsx`)

### Props インターフェース

```tsx
// コンポーネント名 + Props
interface UserActionsProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}
```

### イベントハンドラー

```tsx
// on + 動詞 (Props)
onClick: () => void
onSubmit: (data: FormData) => void

// handle + 動詞 (実装)
const handleClick = () => { ... }
const handleSubmit = (data: FormData) => { ... }
```

## 🔄 状態管理戦略

### Context API

グローバル状態は Context で管理:

```tsx
// SidebarContext.tsx
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ ... }}>
      {children}
    </SidebarContext.Provider>
  );
}
```

### Custom Hooks

Context の使用を簡単に:

```tsx
// useSidebar hook
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}

// 使用例
const { leftSidebarOpen, toggleLeftSidebar } = useSidebar();
```

### ローカル状態

コンポーネント固有の状態は `useState`:

```tsx
function ClockCard() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  // ...
}
```

## ⚡ パフォーマンス最適化

### 1. React.memo

不要な再レンダリングを防止:

```tsx
import { memo } from "react";

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  return <div>{/* 重い計算 */}</div>;
});
```

### 2. useCallback

関数の再生成を防止:

```tsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []); // 依存配列が空 = 関数は1回だけ作成
```

### 3. useMemo

計算結果をキャッシュ:

```tsx
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

### 4. Dynamic Import

コード分割:

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // サーバーサイドレンダリングを無効化
});
```

## 🎯 TypeScript ベストプラクティス

### Props の型定義

```tsx
// ✅ 良い例
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false
}: ButtonProps) {
  // ...
}
```

### 型の再利用

```tsx
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

// コンポーネントで使用
import { User, UserRole } from "@/types";
```

### Generics の活用

```tsx
interface CardProps<T> {
  data: T;
  renderItem: (item: T) => ReactNode;
}

function Card<T>({ data, renderItem }: CardProps<T>) {
  return <div>{renderItem(data)}</div>;
}
```

## 🧪 テスト戦略

### 単体テスト（Jest + React Testing Library）

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### E2Eテスト（Playwright）

```typescript
// e2e/navigation.spec.ts
import { test, expect } from "@playwright/test";

test("should navigate to about page", async ({ page }) => {
  await page.goto("/");
  await page.click('text=About');
  await expect(page).toHaveURL("/about");
});
```

## 📚 新規コンポーネント作成ガイド

### ステップ1: 配置場所を決定

**質問チェックリスト:**
- [ ] このコンポーネントはどこで使われる？
- [ ] 再利用される可能性は？
- [ ] 特定のレイアウト部分に属する？

**決定フロー:**
```
再利用性が高い？
├─ Yes → app/components/ui/
└─ No
    └─ レイアウト関連？
        ├─ Yes → app/components/[section]/
        └─ No → そのページ内
```

### ステップ2: ファイルを作成

```tsx
// app/components/ui/Badge.tsx
"use client"; // 必要な場合のみ

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
}

export default function Badge({ 
  children, 
  variant = "info",
  size = "md" 
}: BadgeProps) {
  const variantStyles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span 
      className={`
        inline-flex items-center rounded-full font-medium
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
    >
      {children}
    </span>
  );
}
```

### ステップ3: 使用例を作成

```tsx
// 使用例
import Badge from "@/app/components/ui/Badge";

export default function Page() {
  return (
    <div>
      <Badge variant="success">完了</Badge>
      <Badge variant="warning" size="sm">保留中</Badge>
      <Badge variant="error">エラー</Badge>
    </div>
  );
}
```

## 🎨 スタイリングガイドライン

### Tailwind CSS の使用

#### クラス名の構成順序

```tsx
<div className="
  {/* Layout */}
  flex items-center justify-between
  
  {/* Sizing */}
  w-full h-10 px-4 py-2
  
  {/* Typography */}
  text-sm font-bold
  
  {/* Colors */}
  bg-blue-500 text-white
  
  {/* Borders */}
  border border-gray-300 rounded-lg
  
  {/* Effects */}
  shadow-lg
  
  {/* Transitions */}
  transition-all duration-300
  
  {/* Responsive */}
  md:w-auto md:px-6
  
  {/* States */}
  hover:bg-blue-600 focus:ring-2
" />
```

#### 動的スタイル

```tsx
// ✅ 良い例
const buttonClass = `
  px-4 py-2 rounded-lg font-semibold
  ${variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}
  ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
`;

// ❌ 悪い例（文字列連結は避ける）
const buttonClass = "px-4 py-2 " + (variant === "primary" ? "bg-blue-500" : "bg-gray-200");
```

#### clsx / classnames の使用

```tsx
import clsx from "clsx";

const buttonClass = clsx(
  "px-4 py-2 rounded-lg font-semibold",
  {
    "bg-blue-500 text-white": variant === "primary",
    "bg-gray-200 text-gray-800": variant === "secondary",
    "opacity-50 cursor-not-allowed": disabled,
  }
);
```

## 🚀 まとめ

### ✅ プロジェクトの強み

1. **適切な分離**: コンポーネントが責任ごとに分割されている
2. **明確な構造**: ディレクトリ構成が直感的
3. **再利用性**: UI コンポーネントが抽出されている
4. **型安全性**: TypeScript による型定義
5. **状態管理**: Context と Custom Hooks の適切な使用
6. **モダンな技術**: Next.js 14 App Router の活用

### 📈 さらなる改善案（オプション）

1. **テストの追加**
   - Jest + React Testing Library
   - Playwright for E2E

2. **Storybook の導入**
   - コンポーネントカタログ作成
   - ビジュアルテスト

3. **ドキュメント自動生成**
   - JSDoc コメント
   - TypeDoc

4. **CI/CD パイプライン**
   - 自動テスト
   - Lint チェック
   - ビルド検証

5. **パフォーマンスモニタリング**
   - Web Vitals
   - Bundle Analyzer

---

**作成日**: 2024年11月29日  
**バージョン**: 1.0.0  
**対象**: Next.js 14 + TypeScript + Tailwind CSS

