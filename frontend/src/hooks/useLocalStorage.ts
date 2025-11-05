'use client';

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // ローカルストレージから値を取得する関数
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }
      // JSONパースを試行
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      // 不正な値が保存されている場合はクリアする
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        console.error(`Error removing invalid localStorage key "${key}":`, e);
      }
      return initialValue;
    }
  });

  // 値をローカルストレージに保存する関数
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
} 