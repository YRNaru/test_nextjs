// API関連の定数

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // ユーザー関連
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_AVATAR: '/users/avatar',
  
  // 投稿関連
  POSTS: '/posts',
  POST_DETAIL: (id: string) => `/posts/${id}`,
  POST_COMMENTS: (id: string) => `/posts/${id}/comments`,
  
  // 認証関連
  AUTH_LOGIN: '/auth/login',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_REGISTER: '/auth/register',
  
  // ファイル関連
  UPLOAD: '/upload',
  FILES: '/files',
} as const;

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const; 