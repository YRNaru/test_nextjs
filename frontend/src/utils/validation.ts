// メールアドレスのバリデーション
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// パスワードのバリデーション
export function isValidPassword(password: string): boolean {
  // 8文字以上、英数字を含む
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// URLのバリデーション
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 必須フィールドのバリデーション
export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

// 最小文字数のバリデーション
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

// 最大文字数のバリデーション
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
} 