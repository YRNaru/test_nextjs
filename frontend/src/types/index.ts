// 共通の型定義

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

// API関連の型定義
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ユーザー関連の型定義
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 登録フォームの型定義
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 登録リクエストの型定義
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// 登録レスポンスの型定義
export interface RegisterResponse {
  user: User;
  token: string;
}

// ログインフォームの型定義
export interface LoginFormData {
  email: string;
  password: string;
}

// ログインリクエストの型定義
export interface LoginRequest {
  email: string;
  password: string;
}

// ログインレスポンスの型定義
export interface LoginResponse {
  user: User;
  token: string;
}

// 投稿関連の型定義
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  publishedAt: Date;
  updatedAt: Date;
  tags?: string[];
} 