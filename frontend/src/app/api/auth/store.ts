// 簡易的なユーザーストア（開発用）
// 注意: これは開発用の簡易実装です。本番環境ではデータベースを使用してください。
// Next.jsのAPI Routesは各リクエストで独立しているため、インメモリストアは開発中のみ機能します。

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // 実際のアプリケーションではハッシュ化が必要
  createdAt: string;
  updatedAt: string;
}

// インメモリストア（開発用）
const users: StoredUser[] = [];

export function findUserByEmail(email: string): StoredUser | undefined {
  return users.find(u => u.email === email);
}

export function findUserById(id: string): StoredUser | undefined {
  return users.find(u => u.id === id);
}

export function createUser(user: Omit<StoredUser, 'id' | 'createdAt' | 'updatedAt'>): StoredUser {
  const newUser: StoredUser = {
    ...user,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);
  return newUser;
}

export function getAllUsers(): StoredUser[] {
  return users;
}

