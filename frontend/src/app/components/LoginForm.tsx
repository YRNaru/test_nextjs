"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import { isValidEmail, isRequired } from "@/utils/validation";
import { LoginFormData } from "@/types";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    // メールアドレスのバリデーション
    if (!isRequired(formData.email)) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // パスワードのバリデーション
    if (!isRequired(formData.password)) {
      newErrors.password = "パスワードを入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (response.success && response.data) {
        // トークンを保存
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", response.data.token);
          // カスタムイベントを発火して認証状態を更新
          window.dispatchEvent(new Event("auth-change"));
        }
        // ログイン成功後にホームページへリダイレクト
        router.push("/");
        router.refresh();
      } else {
        setSubmitError(response.error || "ログインに失敗しました");
      }
    } catch {
      setSubmitError("予期しないエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof LoginFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // エラーをクリア
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-[500px] mx-auto md:max-w-full"
      data-oid="fieoqdd"
    >
      <div className="flex flex-col gap-2" data-oid=":54y0m:">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="06b0-r7"
        >
          メールアドレス{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="kewd8jw">
            *
          </span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange("email")}
          className={`px-4 py-3 text-base border-2 rounded-lg bg-card-background text-foreground transition-all duration-200 w-full box-border focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] disabled:opacity-60 disabled:cursor-not-allowed md:text-base ${errors.email ? "border-[#e74c3c] focus:border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]" : "border-[var(--border-color)]"}`}
          placeholder="example@email.com"
          disabled={isSubmitting}
          autoComplete="email"
          data-oid="qbwh9c9"
        />

        {errors.email && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="iz0a09z">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2" data-oid="0pg2o2x">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid=":wcv22k"
        >
          パスワード{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="1wew41d">
            *
          </span>
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange("password")}
          className={`px-4 py-3 text-base border-2 rounded-lg bg-card-background text-foreground transition-all duration-200 w-full box-border focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] disabled:opacity-60 disabled:cursor-not-allowed md:text-base ${errors.password ? "border-[#e74c3c] focus:border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]" : "border-[var(--border-color)]"}`}
          placeholder="パスワードを入力"
          disabled={isSubmitting}
          autoComplete="current-password"
          data-oid="-utbxc7"
        />

        {errors.password && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="kih4a5k">
            {errors.password}
          </span>
        )}
      </div>

      {submitError && (
        <div
          className="px-4 py-3 bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.3)] rounded-lg text-[#e74c3c] text-sm text-center"
          data-oid="ugk5m49"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        className="py-3.5 px-6 text-base font-semibold text-white bg-gradient-to-br from-[#3498db] to-[#2980b9] border-none rounded-lg cursor-pointer transition-all duration-200 mt-2 hover:from-[#2980b9] hover:to-[#21618c] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(52,152,219,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isSubmitting}
        data-oid="2he6oi:"
      >
        {isSubmitting ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  );
}
