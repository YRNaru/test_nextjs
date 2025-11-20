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
      data-oid="biv3uiv"
    >
      <div
        className="w-full max-w-[600px] bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl p-12 px-8 shadow-[0_4px_6px_var(--shadow-color)] md:p-8 md:px-6 md:rounded-xl"
        data-oid="kpmkjq-"
      >
        <div className="text-center mb-10 md:mb-8" data-oid="wrhxsu-">
          <h1
            className="text-4xl font-bold text-foreground mb-2 md:text-3xl"
            data-oid=":0bk-qb"
          >
            アカウント登録
          </h1>
          <p
            className="text-base text-[var(--card-text-secondary)] leading-relaxed md:text-sm"
            data-oid="j1c.76_"
          >
            新しいアカウントを作成して、Next.js学習を始めましょう
          </p>
        </div>

        <div className="mb-8" data-oid="1siso4x">
          <RegisterForm data-oid="4u89dyl" />
        </div>

        <div
          className="text-center pt-6 border-t border-[var(--border-color)]"
          data-oid="946wnmg"
        >
          <p
            className="text-sm text-[var(--card-text-secondary)]"
            data-oid="89q4azt"
          >
            既にアカウントをお持ちですか？{" "}
            <Link
              href="/login"
              className="text-[#3498db] no-underline font-medium transition-colors duration-200 hover:text-[#2980b9] hover:underline"
              data-oid="0_e71tu"
            >
              ログイン
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
