'use server';

import { revalidatePath } from 'next/cache';

/**
 * Server Action: フォームデータを処理
 * Next.js 16の'use server'ディレクティブを使用
 */
export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // バリデーション
  if (!name || !email || !message) {
    return {
      success: false,
      error: 'すべてのフィールドを入力してください',
    };
  }

  if (!email.includes('@')) {
    return {
      success: false,
      error: '有効なメールアドレスを入力してください',
    };
  }

  try {
    // ここで実際のデータ処理を行う（例：データベースへの保存、メール送信など）
    console.log('Contact form submitted:', { name, email, message });

    // キャッシュの再検証
    revalidatePath('/contact', 'default');

    return {
      success: true,
      message: 'お問い合わせを受け付けました',
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: 'サーバーエラーが発生しました',
    };
  }
}

/**
 * Server Action: ニュースレターの購読
 */
export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return {
      success: false,
      error: '有効なメールアドレスを入力してください',
    };
  }

  try {
    // ニュースレターの購読処理
    console.log('Newsletter subscription:', { email });

    return {
      success: true,
      message: 'ニュースレターを購読しました',
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      error: 'サーバーエラーが発生しました',
    };
  }
}

/**
 * Server Action: データの再検証
 */
export async function revalidateData(path: string) {
  try {
    revalidatePath(path, 'default');
    return {
      success: true,
      message: 'データを更新しました',
    };
  } catch (error) {
    console.error('Error revalidating data:', error);
    return {
      success: false,
      error: 'データの更新に失敗しました',
    };
  }
}

