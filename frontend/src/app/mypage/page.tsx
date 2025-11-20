"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getCurrentUser } from "@/api/auth";
import { User } from "@/types";
import Link from "next/link";

export default function MyPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // 未ログインの場合はログインページへリダイレクト
        router.push("/login");
        return;
      }

      // ユーザー情報を取得
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const response = await getCurrentUser();

          if (response.success && response.data) {
            setUser(response.data);
          } else {
            setError(response.error || "ユーザー情報の取得に失敗しました");
          }
        } catch {
          setError("予期しないエラーが発生しました");
        } finally {
          setIsLoading(false);
        }
      };

      fetchUser();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLogout = async () => {
    await logout();
  };

  if (authLoading || isLoading) {
    return (
      <div
        className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
        data-oid="u52m3yl"
      >
        <div className="text-center p-12 text-foreground" data-oid="oxh.g5k">
          読み込み中...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // リダイレクト中
  }

  if (error) {
    return (
      <div
        className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
        data-oid="en6kbcr"
      >
        <div className="text-center p-12 text-[#e74c3c]" data-oid="hfnb86d">
          <p data-oid="jnc3bj2">{error}</p>
          <Link
            href="/login"
            className="inline-block mt-4 text-[#3498db] no-underline font-medium hover:underline"
            data-oid="_5_jvw7"
          >
            ログインページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
        data-oid="g8jcblj"
      >
        <div className="text-center p-12 text-[#e74c3c]" data-oid="wu8ieap">
          <p data-oid="0f3zmuj">ユーザー情報が見つかりません</p>
          <Link
            href="/login"
            className="inline-block mt-4 text-[#3498db] no-underline font-medium hover:underline"
            data-oid="gjlposo"
          >
            ログインページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  // 登録日をフォーマット
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]"
      data-oid="33oj318"
    >
      <div
        className="w-full max-w-[800px] bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl p-12 px-8 shadow-[0_4px_6px_var(--shadow-color)] md:p-8 md:px-6 md:rounded-xl"
        data-oid="v:vmkvd"
      >
        <div className="text-center mb-10" data-oid="035ent9">
          <h1
            className="text-4xl font-bold text-foreground mb-2 md:text-3xl"
            data-oid="r4cqwgg"
          >
            マイページ
          </h1>
          <p
            className="text-lg text-[var(--card-text-secondary)] md:text-base"
            data-oid="d3caixx"
          >
            アカウント情報
          </p>
        </div>

        <div className="mb-10" data-oid="wwy9xr:">
          <div className="flex justify-center mb-8" data-oid="1nv0b2_">
            <div
              className="w-30 h-30 rounded-full bg-gradient-to-br from-[#3498db] to-[#2980b9] flex items-center justify-center text-5xl font-bold text-white shadow-[0_4px_12px_rgba(52,152,219,0.3)] md:w-25 md:h-25 md:text-4xl"
              data-oid=".jv3qzf"
            >
              {(user.display_name || user.name || user.email)
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>

          <div className="flex flex-col gap-6" data-oid="xyxs11.">
            <div
              className="p-4 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)]"
              data-oid="4n4-ut."
            >
              <label
                className="block text-sm font-semibold text-[var(--card-text-secondary)] mb-2 uppercase tracking-wider"
                data-oid="_wr8rrn"
              >
                名前
              </label>
              <p
                className="text-lg font-medium text-foreground m-0 break-all"
                data-oid="iyl-915"
              >
                {user.display_name || user.name || "ユーザー"}
              </p>
            </div>

            <div
              className="p-4 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)]"
              data-oid="hvzzbm_"
            >
              <label
                className="block text-sm font-semibold text-[var(--card-text-secondary)] mb-2 uppercase tracking-wider"
                data-oid="k2f-qu9"
              >
                メールアドレス
              </label>
              <p
                className="text-lg font-medium text-foreground m-0 break-all"
                data-oid="cuqccur"
              >
                {user.email}
              </p>
            </div>

            <div
              className="p-4 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)]"
              data-oid="1gwiec5"
            >
              <label
                className="block text-sm font-semibold text-[var(--card-text-secondary)] mb-2 uppercase tracking-wider"
                data-oid="cddlg_i"
              >
                ユーザーID
              </label>
              <p
                className="text-lg font-medium text-foreground m-0 break-all"
                data-oid="ic97jyk"
              >
                {user.id}
              </p>
            </div>

            {user.createdAt && (
              <div
                className="p-4 bg-[var(--section-background)] rounded-lg border border-[var(--border-color)]"
                data-oid="9w9ba:q"
              >
                <label
                  className="block text-sm font-semibold text-[var(--card-text-secondary)] mb-2 uppercase tracking-wider"
                  data-oid="zzjcso6"
                >
                  登録日
                </label>
                <p
                  className="text-lg font-medium text-foreground m-0 break-all"
                  data-oid="b170h70"
                >
                  {formatDate(user.createdAt)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mb-8" data-oid="pijgx5n">
          <button
            onClick={handleLogout}
            className="py-3.5 px-8 text-base font-semibold text-white bg-gradient-to-br from-[#e74c3c] to-[#c0392b] border-none rounded-lg cursor-pointer transition-all duration-200 hover:from-[#c0392b] hover:to-[#a93226] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(231,76,60,0.3)] active:translate-y-0"
            data-oid="vfai:ho"
          >
            ログアウト
          </button>
        </div>

        <div
          className="flex flex-wrap gap-4 justify-center pt-8 border-t border-[var(--border-color)] md:flex-col"
          data-oid="12.nhjg"
        >
          <Link
            href="/about"
            className="text-[#3498db] no-underline font-medium transition-colors duration-200 px-4 py-2 rounded-md bg-[var(--section-background)] border border-[var(--border-color)] hover:text-[#2980b9] hover:bg-[var(--card-background)] hover:border-[#3498db] md:text-center"
            data-oid="lw9igm0"
          >
            詳細を見る →
          </Link>
          <Link
            href="/nextjs"
            className="text-[#3498db] no-underline font-medium transition-colors duration-200 px-4 py-2 rounded-md bg-[var(--section-background)] border border-[var(--border-color)] hover:text-[#2980b9] hover:bg-[var(--card-background)] hover:border-[#3498db] md:text-center"
            data-oid="3_5vyjk"
          >
            Next.js講座 →
          </Link>
          <Link
            href="/typescript"
            className="text-[#3498db] no-underline font-medium transition-colors duration-200 px-4 py-2 rounded-md bg-[var(--section-background)] border border-[var(--border-color)] hover:text-[#2980b9] hover:bg-[var(--card-background)] hover:border-[#3498db] md:text-center"
            data-oid="3wube-x"
          >
            TypeScript学習 →
          </Link>
          <Link
            href="/react"
            className="text-[#3498db] no-underline font-medium transition-colors duration-200 px-4 py-2 rounded-md bg-[var(--section-background)] border border-[var(--border-color)] hover:text-[#2980b9] hover:bg-[var(--card-background)] hover:border-[#3498db] md:text-center"
            data-oid="6c.i:9q"
          >
            React学習 →
          </Link>
          <Link
            href="/quiz"
            className="text-[#3498db] no-underline font-medium transition-colors duration-200 px-4 py-2 rounded-md bg-[var(--section-background)] border border-[var(--border-color)] hover:text-[#2980b9] hover:bg-[var(--card-background)] hover:border-[#3498db] md:text-center"
            data-oid="b9vkt-4"
          >
            🧪 クイズに挑戦 →
          </Link>
        </div>
      </div>
    </div>
  );
}
