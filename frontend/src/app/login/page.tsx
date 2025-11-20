import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export const metadata: Metadata = {
  title: "ログイン | Next.js 初心者講座",
  description: "アカウントにログインして、Next.js学習を続けましょう",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]">
      <div className="w-full max-w-[600px] bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl p-12 px-8 shadow-[0_4px_6px_var(--shadow-color)] md:p-8 md:px-6 md:rounded-xl">
        <div className="text-center mb-10 md:mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 md:text-3xl">
            ログイン
          </h1>
          <p className="text-base text-[var(--card-text-secondary)] leading-relaxed md:text-sm">
            アカウントにログインして、Next.js学習を続けましょう
          </p>
        </div>

        <div className="mb-8">
          <LoginForm />
        </div>

        <div className="text-center pt-6 border-t border-[var(--border-color)]">
          <p className="text-sm text-[var(--card-text-secondary)]">
            アカウントをお持ちでないですか？{" "}
            <Link
              href="/register"
              className="text-[#3498db] no-underline font-medium transition-colors duration-200 hover:text-[#2980b9] hover:underline"
            >
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
