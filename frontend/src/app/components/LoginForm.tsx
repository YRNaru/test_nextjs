"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { login } from "@/api/auth";
import { isValidEmail, isRequired } from "@/utils/validation";
import { LoginFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    if (!isRequired(formData.email)) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

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
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", response.data.token);
          window.dispatchEvent(new Event("auth-change"));
        }
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

  const handleChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full max-w-[500px] mx-auto md:max-w-full"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          メールアドレス
          <span className="text-destructive">*</span>
        </Label>
        <Input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange("email")}
          className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          placeholder="example@email.com"
          disabled={isSubmitting}
          autoComplete="email"
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive"
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex flex-col gap-2"
      >
        <Label htmlFor="password" className="flex items-center gap-2">
          <Lock className="w-4 h-4" />
          パスワード
          <span className="text-destructive">*</span>
        </Label>
        <Input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange("password")}
          className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
          placeholder="パスワードを入力"
          disabled={isSubmitting}
          autoComplete="current-password"
        />
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-destructive"
          >
            {errors.password}
          </motion.p>
        )}
      </motion.div>

      {submitError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "ログイン中..." : "ログイン"}
        </Button>
      </motion.div>
    </motion.form>
  );
}
