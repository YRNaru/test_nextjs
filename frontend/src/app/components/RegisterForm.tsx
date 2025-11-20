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
      data-oid="zw45iuu"
    >
      <div className="flex flex-col gap-2" data-oid="u39_rz-">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="7szi92s"
        >
          名前{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="eu6qb.b">
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
          data-oid="m.t_:02"
        />

        {errors.name && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="r9b3biq">
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2" data-oid="3_yg6-u">
        <label
          htmlFor="email"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="rhfn-.0"
        >
          メールアドレス{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="m9wpy24">
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
          data-oid="7vt32o3"
        />

        {errors.email && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="fkino_k">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2" data-oid="micxt0_">
        <label
          htmlFor="password"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid=".7d25ci"
        >
          パスワード{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="q_65mbd">
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
          data-oid="at6ucty"
        />

        {errors.password && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="4d4rzob">
            {errors.password}
          </span>
        )}
        <p
          className="text-[var(--card-text-secondary)] text-sm -mt-1"
          data-oid="uk2yn6b"
        >
          パスワードは8文字以上で、英数字を含む必要があります
        </p>
      </div>

      <div className="flex flex-col gap-2" data-oid="o6th44b">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-foreground flex items-center gap-1"
          data-oid="_jca1hz"
        >
          パスワード確認{" "}
          <span className="text-[#e74c3c] font-semibold" data-oid="40:nj:v">
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
          data-oid="cylo-fa"
        />

        {errors.confirmPassword && (
          <span className="text-[#e74c3c] text-sm -mt-1" data-oid="zxyyvcr">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      {submitError && (
        <div
          className="px-4 py-3 bg-[rgba(231,76,60,0.1)] border border-[rgba(231,76,60,0.3)] rounded-lg text-[#e74c3c] text-sm text-center"
          data-oid="xyq2_0g"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        className="py-3.5 px-6 text-base font-semibold text-white bg-gradient-to-br from-[#3498db] to-[#2980b9] border-none rounded-lg cursor-pointer transition-all duration-200 mt-2 hover:from-[#2980b9] hover:to-[#21618c] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(52,152,219,0.3)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        disabled={isSubmitting}
        data-oid="upths.z"
      >
        {isSubmitting ? "登録中..." : "アカウント登録"}
      </button>
    </form>
  );
}
