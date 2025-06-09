// Database model types
export interface User {
  id: string
  name: string | null
  email: string
  password: string
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface UserPublic {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: UserPublic
}

// Auth types
export interface AuthUser {
  id: string
  name: string | null
  email: string
  image: string | null
}

// API response types
export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface ApiError {
  error: string
  details?: unknown
}