/**
 * Google OAuth ログインボタンコンポーネント
 */
'use client';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function GoogleLoginButton({ onSuccess, onError }: GoogleLoginButtonProps) {
  const { googleLogin } = useAuth();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  const handleSuccess = async (credentialResponse: any) => {
    try {
      await googleLogin(credentialResponse.credential);
      onSuccess?.();
      router.push('/mypage');
    } catch (error) {
      console.error('Google login failed:', error);
      onError?.(error);
    }
  };

  const handleError = () => {
    console.error('Google login error');
    onError?.(new Error('Google login failed'));
  };

  if (!clientId) {
    return (
      <div className="alert alert-warning">
        Google Client IDが設定されていません。
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="d-flex justify-content-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          size="large"
          text="continue_with"
          locale="ja"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

