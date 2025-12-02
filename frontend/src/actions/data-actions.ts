'use server';

import { revalidateTag } from 'next/cache';

/**
 * Server Action: データの取得と再検証
 * Next.js 16の新しいAPI署名に対応
 */
export async function fetchUserData(userId: string) {
  try {
    // ユーザーデータの取得処理
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      next: {
        tags: ['user-data'],
      },
    });

    if (!response.ok) {
      throw new Error('ユーザーデータの取得に失敗しました');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'データの取得に失敗しました',
    };
  }
}

/**
 * Server Action: タグの再検証
 * Next.js 16では第2引数（profile）が必須
 */
export async function invalidateUserData(tag: string) {
  try {
    // Next.js 16の新しいAPI署名
    revalidateTag(tag, 'default');
    
    return {
      success: true,
      message: `タグ "${tag}" を再検証しました`,
    };
  } catch (error) {
    console.error('Error revalidating tag:', error);
    return {
      success: false,
      error: '再検証に失敗しました',
    };
  }
}

/**
 * Server Action: データの更新
 */
export async function updateUserProfile(userId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const bio = formData.get('bio') as string;

  if (!name) {
    return {
      success: false,
      error: '名前は必須です',
    };
  }

  try {
    // プロフィールの更新処理
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, bio }),
    });

    if (!response.ok) {
      throw new Error('プロフィールの更新に失敗しました');
    }

    // キャッシュの再検証
    revalidateTag('user-data', 'default');

    return {
      success: true,
      message: 'プロフィールを更新しました',
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'プロフィールの更新に失敗しました',
    };
  }
}

/**
 * Server Action: 複数タグの再検証
 */
export async function invalidateMultipleTags(tags: string[]) {
  try {
    for (const tag of tags) {
      revalidateTag(tag, 'default');
    }

    return {
      success: true,
      message: `${tags.length}個のタグを再検証しました`,
    };
  } catch (error) {
    console.error('Error revalidating multiple tags:', error);
    return {
      success: false,
      error: '再検証に失敗しました',
    };
  }
}

