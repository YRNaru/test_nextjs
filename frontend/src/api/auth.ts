import { ApiResponse, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * アカウント登録（バックエンドのDjango APIに直接リクエスト）
 */
export async function register(
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        password_confirm: data.passwordConfirm,
        display_name: data.name,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.error || 'アカウント登録に失敗しました',
      };
    }

    return {
      success: true,
      data: {
        user: {
          ...responseData.user,
          name: responseData.user.display_name || responseData.user.email?.split('@')[0],
        },
        token: responseData.tokens.access,
      },
    };
  } catch (error) {
    console.error('Register error:', error);
    return {
      success: false,
      error: '通信エラーが発生しました',
    };
  }
}

/**
 * ログイン（バックエンドのDjango APIに直接リクエスト）
 */
export async function login(
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: responseData.detail || responseData.error || 'ログインに失敗しました',
      };
    }

    // レスポンス形式の検証
    if (!responseData.tokens || !responseData.tokens.access) {
      console.error('Invalid response format:', responseData);
      return {
        success: false,
        error: 'サーバーからの応答が不正です',
      };
    }

    return {
      success: true,
      data: {
        user: {
          ...responseData.user,
          name: responseData.user.display_name || responseData.user.email?.split('@')[0],
        },
        token: responseData.tokens.access,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: '通信エラーが発生しました',
    };
  }
}

/**
 * ログアウト
 */
export async function logout(): Promise<ApiResponse<void>> {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/api/auth/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'ログアウトに失敗しました',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: '通信エラーが発生しました',
    };
  }
}

/**
 * 現在のユーザー情報を取得
 */
export async function getCurrentUser(): Promise<ApiResponse<User>> {
  try {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/api/users/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: 'ユーザー情報の取得に失敗しました',
      };
    }

    return {
      success: true,
      data: {
        ...responseData,
        name: responseData.display_name || responseData.email?.split('@')[0],
      },
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return {
      success: false,
      error: '通信エラーが発生しました',
    };
  }
}

