"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/api/auth";
import { isValidEmail, isValidPassword, isRequired } from "@/utils/validation";
import { RegisterFormData } from "@/types";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    // 名前のバリデーション
    if (!isRequired(formData.name)) {
      newErrors.name = "名前を入力してください";
    } else if (formData.name.length < 2) {
      newErrors.name = "名前は2文字以上で入力してください";
    } else if (formData.name.length > 50) {
      newErrors.name = "名前は50文字以内で入力してください";
    }

    // メールアドレスのバリデーション
    if (!isRequired(formData.email)) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // パスワードのバリデーション
    if (!isRequired(formData.password)) {
      newErrors.password = "パスワードを入力してください";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "パスワードは8文字以上で、英数字を含む必要があります";
    }

    // パスワード確認のバリデーション
    if (!isRequired(formData.confirmPassword)) {
      newErrors.confirmPassword = "パスワード確認を入力してください";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません";
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
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
      });

      if (response.success && response.data) {
        // トークンを保存
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", response.data.token);
          // カスタムイベントを発火して認証状態を更新
          window.dispatchEvent(new Event("auth-change"));
        }
        // 登録成功後にホームページへリダイレクト
        router.push("/");
        router.refresh();
      } else {
        setSubmitError(response.error || "登録に失敗しました");
      }
    } catch {
      setSubmitError("予期しないエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange =
    (field: keyof RegisterFormData) =>
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
      data-oid="93kxni4"
    >
      <div className="flex flex-col gap-2" data-oid="8dmm234">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="p.ilskm"
        >
          名前{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="3q:2eob">
            *
          </span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange("name")}
          className={`px-4 py-3 text-base border-2 rounded-lg bg-card-background text-foreground transition-all duration-200 w-full box-border focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] disabled:opacity-60 disabled:cursor-not-allowed md:text-base ${errors.name ? "border-[#e74c3c] focus:border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]" : "border-[var(--border-color)]"}`}
          placeholder="山田太郎"
          disabled={isSubmitting}
          data-oid="8hhkshn"
        />

        {errors.name && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="npp.9z2">
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2" data-oid="bmv7v2e">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="go2ky18"
        >
          メールアドレス{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="7vcezbn">
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
          data-oid="_kaq9al"
        />

        {errors.email && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="47bpz:c">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2" data-oid=":0qrqxn">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="k3wumin"
        >
          パスワード{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="81uh9bg">
            *
          </span>
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange("password")}
          className={`px-4 py-3 text-base border-2 rounded-lg bg-card-background text-foreground transition-all duration-200 w-full box-border focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] disabled:opacity-60 disabled:cursor-not-allowed md:text-base ${errors.password ? "border-[#e74c3c] focus:border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]" : "border-[var(--border-color)]"}`}
          placeholder="8文字以上、英数字を含む"
          disabled={isSubmitting}
          data-oid="gst0-jd"
        />

        {errors.password && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="crrw0vx">
            {errors.password}
          </span>
        )}
        <p
          className="text-[var(--card-text-secondary)] text-sm -mt-1"
          data-oid="szq8lf-"
        >
          パスワードは8文字以上で、英数字を含む必要があります
        </p>
      </div>

      <div className="flex flex-col gap-2" data-oid="_:-nffj">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="r:m:lj2"
        >
          パスワード確認{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="jh-jw8c">
            *
          </span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
          className={`px-4 py-3 text-base border-2 rounded-lg bg-card-background text-foreground transition-all duration-200 w-full box-border focus:outline-none focus:border-[#3498db] focus:shadow-[0_0_0_3px_rgba(52,152,219,0.1)] disabled:opacity-60 disabled:cursor-not-allowed md:text-base ${errors.confirmPassword ? "border-[#e74c3c] focus:border-[#e74c3c] focus:shadow-[0_0_0_3px_rgba(231,76,60,0.1)]" : "border-[var(--border-color)]"}`}
          placeholder="パスワードを再入力"
          disabled={isSubmitting}
          data-oid="t1jo3z8"
        />

        {errors.confirmPassword && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="z722k3b">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      {submitError && (
        <div
          className="px-4 py-3 bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.3)] rounded-lg text-[#e74c3c] text-sm text-center"
          data-oid="y8phtjb"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        className="py-3.5 px-6 text-base font-semibold text-white bg-gradient-to-br from-[#3498db] to-[#2980b9] border-none rounded-lg cursor-pointer transition-all duration-200 mt-2 hover:from-[#2980b9] hover:to-[#21618c] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(52,152,219,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isSubmitting}
        data-oid="7wyae5_"
      >
        {isSubmitting ? "登録中..." : "アカウント登録"}
      </button>
    </form>
  );
}
