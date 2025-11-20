import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "../components/RegisterForm";

export const metadata: Metadata = {
  title: "アカウント登録 | Next.js 初心者講座",
  description: "新しいアカウントを作成して、Next.js学習を始めましょう",
};

export default function RegisterPage() {
  return (
    <div
      className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
      data-oid="_l-tlo4"
    >
      <div
        className="w-full max-w-[600px] bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl p-12 px-8 shadow-[0_4px_6px_var(--shadow-color)] md:p-8 md:px-6 md:rounded-xl"
        data-oid="a7-o5:v"
      >
        <div className="text-center mb-10 md:mb-8" data-oid="m0_eli_">
          <h1
            className="text-4xl font-bold text-foreground mb-2 md:text-3xl"
            data-oid="ywc4qkj"
          >
            アカウント登録
          </h1>
          <p
            className="text-base text-[var(--card-text-secondary)] leading-relaxed md:text-sm"
            data-oid="73::ihe"
          >
            新しいアカウントを作成して、Next.js学習を始めましょう
          </p>
        </div>

        <div className="mb-8" data-oid="9:j9ox9">
          <RegisterForm data-oid="5w8lnwx" />
        </div>

        <div
          className="text-center pt-6 border-t border-[var(--border-color)]"
          data-oid="mx:ukm8"
        >
          <p
            className="text-sm text-[var(--card-text-secondary)]"
            data-oid="u1c.2xx"
          >
            既にアカウントをお持ちですか？{" "}
            <Link
              href="/login"
              className="text-[#3498db] no-underline font-medium transition-colors duration-200 hover:text-[#2980b9] hover:underline"
              data-oid="kvxcy.l"
            >
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
