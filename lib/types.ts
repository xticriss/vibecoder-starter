// Database model types
export interface User {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date
}

export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  createdAt: Date
  updatedAt: Date
  authorId: string
  author?: User
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