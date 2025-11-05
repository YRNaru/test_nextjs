'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/api/auth';
import { isValidEmail, isRequired } from '@/utils/validation';
import { LoginFormData } from '@/types';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoginFormData, string>> = {};

    // メールアドレスのバリデーション
    if (!isRequired(formData.email)) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    // パスワードのバリデーション
    if (!isRequired(formData.password)) {
      newErrors.password = 'パスワードを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

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
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', response.data.token);
          // カスタムイベントを発火して認証状態を更新
          window.dispatchEvent(new Event('auth-change'));
        }
        // ログイン成功後にホームページへリダイレクト
        router.push('/');
        router.refresh();
      } else {
        setSubmitError(response.error || 'ログインに失敗しました');
      }
    } catch (error) {
      setSubmitError('予期しないエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // エラーをクリア
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          メールアドレス <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange('email')}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="example@email.com"
          disabled={isSubmitting}
          autoComplete="email"
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          パスワード <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange('password')}
          className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          placeholder="パスワードを入力"
          disabled={isSubmitting}
          autoComplete="current-password"
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>

      {submitError && (
        <div className={styles.submitError}>{submitError}</div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
}

