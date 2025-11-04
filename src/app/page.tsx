'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ホームページにアクセスしたらマイページへリダイレクト
    router.push('/mypage');
  }, [router]);

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      color: 'var(--foreground)'
    }}>
      <p>リダイレクト中...</p>
    </div>
  );
}
