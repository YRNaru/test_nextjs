'use client';

import { useState, useEffect, useCallback } from 'react';
import { logout } from '@/api/auth';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();

    // localStorageの変更を監視
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken') {
        checkAuth();
      }
    };

    // カスタムイベントで同一ウィンドウ内の変更も監視
    const handleCustomStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleCustomStorageChange);
    };
  }, [checkAuth]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // トークンを削除
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        // カスタムイベントを発火して状態を更新
        window.dispatchEvent(new Event('auth-change'));
      }
      setIsAuthenticated(false);
      router.push('/');
      router.refresh();
    }
  };

  return {
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  };
}

