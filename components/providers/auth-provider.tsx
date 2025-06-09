"use client"

import { createContext, useContext, ReactNode } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { AuthUser } from "@/lib/types"
import type { LoginFormValues, RegisterFormValues } from "@/lib/validations"
import { API_ROUTES, QUERY_KEYS, ROUTES } from "@/lib/constants"

interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  login: (data: LoginFormValues) => Promise<AuthUser>
  register: (data: RegisterFormValues) => Promise<AuthUser>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // Get current user
  const {
    data: user,
    isLoading,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH_USER,
    queryFn: async (): Promise<AuthUser> => {
      const res = await fetch(API_ROUTES.ME)
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized")
        }
        throw new Error("Failed to fetch user")
      }
      return res.json()
    },
    retry: false,
    refetchOnWindowFocus: false,
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues): Promise<AuthUser> => {
      const res = await fetch(API_ROUTES.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Login failed")
      }
      
      return res.json()
    },
    onSuccess: (user) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, user)
      toast.success("Welcome back!")
      router.push(ROUTES.DASHBOARD)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormValues): Promise<AuthUser> => {
      const res = await fetch(API_ROUTES.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Registration failed")
      }
      
      return res.json()
    },
    onSuccess: (user) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, user)
      toast.success("Account created successfully!")
      router.push(ROUTES.DASHBOARD)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      const res = await fetch(API_ROUTES.LOGOUT, {
        method: "POST",
      })
      
      if (!res.ok) {
        throw new Error("Logout failed")
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.AUTH_USER, null)
      queryClient.clear()
      toast.success("Logged out successfully")
      router.push(ROUTES.HOME)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const value: AuthContextType = {
    user: user || null,
    isLoading: isLoading || loginMutation.isPending || registerMutation.isPending,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}