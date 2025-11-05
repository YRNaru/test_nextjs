import { apiClient } from './client';
import { API_ENDPOINTS } from './constants';
import { ApiResponse, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, User } from '@/types';

/**
 * アカウント登録
 */
export async function register(
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> {
  return apiClient.post<RegisterResponse>(API_ENDPOINTS.AUTH_REGISTER, data);
}

/**
 * ログイン
 */
export async function login(
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  return apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH_LOGIN, data);
}

/**
 * ログアウト
 */
export async function logout(): Promise<ApiResponse<void>> {
  return apiClient.post(API_ENDPOINTS.AUTH_LOGOUT, {});
}

/**
 * 現在のユーザー情報を取得
 */
export async function getCurrentUser(): Promise<ApiResponse<User>> {
  return apiClient.get<User>(API_ENDPOINTS.USER_PROFILE);
}

