import { ApiResponse } from '@/types';
import { API_BASE_URL, HTTP_METHODS } from './constants';

interface RequestOptions {
  method?: keyof typeof HTTP_METHODS;
  headers?: Record<string, string>;
  body?: unknown;
  cache?: RequestCache;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      cache = 'default'
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // 認証トークンがあれば追加
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers: requestHeaders,
      cache,
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `HTTP ${response.status}`,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // GET リクエスト
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  // POST リクエスト
  async post<T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  // PUT リクエスト
  async put<T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  // PATCH リクエスト
  async patch<T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  // DELETE リクエスト
  async delete<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// シングルトンインスタンス
export const apiClient = new ApiClient(API_BASE_URL); 