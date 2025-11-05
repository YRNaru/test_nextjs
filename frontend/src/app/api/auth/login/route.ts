import { NextRequest, NextResponse } from 'next/server';
import { LoginRequest, LoginResponse, User } from '@/types';
import { findUserByEmail } from '../store';

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // バリデーション
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'メールアドレスとパスワードが必要です' },
        { status: 400 }
      );
    }

    // ユーザーを検索
    const user = findUserByEmail(email);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // パスワードの検証（実際のアプリケーションではハッシュ化されたパスワードを比較）
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'メールアドレスまたはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // レスポンス用のユーザー情報（パスワードを除外）
    const userResponse: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    };

    // 簡易的なトークン生成（実際のアプリケーションではJWTなどを使用）
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    const response: LoginResponse = {
      user: userResponse,
      token,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

