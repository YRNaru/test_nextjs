import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export const metadata: Metadata = {
  title: "ログイン | Next.js 初心者講座",
  description: "アカウントにログインして、Next.js学習を続けましょう",
};

export default function LoginPage() {
  return (
    <div
      className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
      data-oid="3:r-7zp"
    >
      <div
        className="w-full max-w-[600px] bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl p-12 px-8 shadow-[0_4px_6px_var(--shadow-color)] md:p-8 md:px-6 md:rounded-xl"
        data-oid="jsnq1l3"
      >
        <div className="text-center mb-10 md:mb-8" data-oid="nk_fjj7">
          <h1
            className="text-4xl font-bold text-foreground mb-2 md:text-3xl"
            data-oid="9ss60mp"
          >
            ログイン
          </h1>
          <p
            className="text-base text-[var(--card-text-secondary)] leading-relaxed md:text-sm"
            data-oid="81g3t44"
          >
            アカウントにログインして、Next.js学習を続けましょう
          </p>
        </div>

        <div className="mb-8" data-oid="mvda-3u">
          <LoginForm data-oid="waadj5t" />
        </div>

        <div
          className="text-center pt-6 border-t border-[var(--border-color)]"
          data-oid="2s0-1iz"
        >
          <p
            className="text-sm text-[var(--card-text-secondary)]"
            data-oid="gpb.5wx"
          >
            アカウントをお持ちでないですか？{" "}
            <Link
              href="/register"
              className="text-[#3498db] no-underline font-medium transition-colors duration-200 hover:text-[#2980b9] hover:underline"
              data-oid="du7i:em"
            >
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
