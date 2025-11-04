import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types';
import { findUserById } from '../../auth/store';

export async function GET(request: NextRequest) {
  try {
    // 認証トークンからユーザーIDを取得（簡易実装）
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: '認証が必要です' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // トークンからユーザーIDを取得（簡易実装）
    // 実際のアプリケーションではJWTなどをデコードする
    let userId: string | null = null;
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      userId = decoded.split(':')[0];
    } catch {
      return NextResponse.json(
        { success: false, error: '無効なトークンです' },
        { status: 401 }
      );
    }

    // ユーザーを検索
    const user = findUserById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'ユーザーが見つかりません' },
        { status: 404 }
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

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { success: false, error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

