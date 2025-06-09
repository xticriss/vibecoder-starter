// API configuration
export const API_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

// API routes
export const API_ROUTES = {
  USERS: "/api/users",
  POSTS: "/api/posts",
} as const

// Query keys
export const QUERY_KEYS = {
  USERS: ["users"] as const,
  POSTS: ["posts"] as const,
  USER: (id: string) => ["users", id] as const,
  POST: (id: string) => ["posts", id] as const,
} as const