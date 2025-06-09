// API configuration
export const API_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

// API routes
export const API_ROUTES = {
  // Auth routes
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  LOGOUT: "/api/auth/logout",
  ME: "/api/auth/me",
  // Content routes
  USERS: "/api/users",
  POSTS: "/api/posts",
} as const

// Query keys
export const QUERY_KEYS = {
  AUTH_USER: ["auth", "user"] as const,
  USERS: ["users"] as const,
  POSTS: ["posts"] as const,
  USER_POSTS: (userId: string) => ["posts", "user", userId] as const,
  USER: (id: string) => ["users", id] as const,
  POST: (id: string) => ["posts", id] as const,
} as const

// Route paths
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
} as const