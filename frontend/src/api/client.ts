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
      
      // ネットワークエラーやタイムアウトのチェック
      if (!response.ok) {
        // レスポンスがJSONかどうかを確認
        const contentType = response.headers.get('content-type');
        let errorMessage = `HTTP ${response.status}`;
        
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch {
            // JSONのパースに失敗した場合はデフォルトメッセージを使用
          }
        } else {
          // JSONでない場合はステータステキストを使用
          errorMessage = response.statusText || errorMessage;
        }
        
        return {
          success: false,
          error: errorMessage,
        };
      }

      // レスポンスがJSONかどうかを確認
      const contentType = response.headers.get('content-type');
      let data: T;
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          return {
            success: false,
            error: 'レスポンスの解析に失敗しました',
          };
        }
      } else {
        // JSONでない場合はテキストとして読み取る
        const text = await response.text();
        return {
          success: false,
          error: '予期しないレスポンス形式です',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      // ネットワークエラー、CORSエラー、タイムアウトなどの処理
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        return {
          success: false,
          error: 'サーバーに接続できません。APIサーバーが起動しているか確認してください。',
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : '予期しないエラーが発生しました',
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