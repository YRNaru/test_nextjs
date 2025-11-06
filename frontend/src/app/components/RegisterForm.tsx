'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/api/auth';
import { isValidEmail, isValidPassword, isRequired } from '@/utils/validation';
import { RegisterFormData } from '@/types';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

    // 名前のバリデーション
    if (!isRequired(formData.name)) {
      newErrors.name = '名前を入力してください';
    } else if (formData.name.length < 2) {
      newErrors.name = '名前は2文字以上で入力してください';
    } else if (formData.name.length > 50) {
      newErrors.name = '名前は50文字以内で入力してください';
    }

    // メールアドレスのバリデーション
    if (!isRequired(formData.email)) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    // パスワードのバリデーション
    if (!isRequired(formData.password)) {
      newErrors.password = 'パスワードを入力してください';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'パスワードは8文字以上で、英数字を含む必要があります';
    }

    // パスワード確認のバリデーション
    if (!isRequired(formData.confirmPassword)) {
      newErrors.confirmPassword = 'パスワード確認を入力してください';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'パスワードが一致しません';
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
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.confirmPassword,
      });

      if (response.success && response.data) {
        // トークンを保存
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', response.data.token);
          // カスタムイベントを発火して認証状態を更新
          window.dispatchEvent(new Event('auth-change'));
        }
        // 登録成功後にホームページへリダイレクト
        router.push('/');
        router.refresh();
      } else {
        setSubmitError(response.error || '登録に失敗しました');
      }
    } catch (error) {
      setSubmitError('予期しないエラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof RegisterFormData) => (
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
        <label htmlFor="name" className={styles.label}>
          名前 <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange('name')}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="山田太郎"
          disabled={isSubmitting}
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>

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
          placeholder="8文字以上、英数字を含む"
          disabled={isSubmitting}
        />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
        <p className={styles.hint}>
          パスワードは8文字以上で、英数字を含む必要があります
        </p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword" className={styles.label}>
          パスワード確認 <span className={styles.required}>*</span>
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
          placeholder="パスワードを再入力"
          disabled={isSubmitting}
        />
        {errors.confirmPassword && (
          <span className={styles.error}>{errors.confirmPassword}</span>
        )}
      </div>

      {submitError && (
        <div className={styles.submitError}>{submitError}</div>
      )}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? '登録中...' : 'アカウント登録'}
      </button>
    </form>
  );
}

