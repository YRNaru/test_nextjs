/**
 * Google OAuth ログインボタンコンポーネント
 */
"use client";

import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function GoogleLoginButton({ onSuccess, onError }: GoogleLoginButtonProps) {
  const { googleLogin } = useAuth();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("認証情報が取得できませんでした");
      }

      await googleLogin(credentialResponse.credential);
      onSuccess?.();
      router.push("/mypage");
    } catch (error) {
      console.error("Google login failed:", error);
      const errorMessage = error instanceof Error ? error : new Error("Google login failed");
      onError?.(errorMessage);
    }
  };

  const handleError = () => {
    console.error("Google login error");
    onError?.(new Error("Google login failed"));
  };

  if (!clientId) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>エラー</AlertTitle>
        <AlertDescription>Google Client IDが設定されていません。</AlertDescription>
      </Alert>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center"
      >
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          size="large"
          text="continue_with"
          locale="ja"
        />
      </motion.div>
    </GoogleOAuthProvider>
  );
}
