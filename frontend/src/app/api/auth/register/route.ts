import { NextRequest, NextResponse } from 'next/server';
import { RegisterRequest, RegisterResponse, User } from '@/types';
import { findUserByEmail, createUser } from '../store';

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const { name, email, password } = body;

    // バリデーション
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'すべてのフィールドが必要です' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // パスワードの長さチェック
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'パスワードは8文字以上である必要があります' },
        { status: 400 }
      );
    }

    // 既存ユーザーのチェック
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'このメールアドレスは既に登録されています' },
        { status: 409 }
      );
    }

    // 新しいユーザーを作成
    const newUser = createUser({
      name,
      email,
      password, // 実際のアプリケーションではハッシュ化が必要
    });

    // レスポンス用のユーザー情報（パスワードを除外）
    const userResponse: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: new Date(newUser.createdAt),
      updatedAt: new Date(newUser.updatedAt),
    };

    // 簡易的なトークン生成（実際のアプリケーションではJWTなどを使用）
    const token = Buffer.from(`${newUser.id}:${Date.now()}`).toString('base64');

    const response: RegisterResponse = {
      user: userResponse,
      token,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

