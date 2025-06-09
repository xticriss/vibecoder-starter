import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { User } from "./types"
import type { UserFormValues } from "./validations"
import { API_ROUTES, QUERY_KEYS } from "./constants"

// User queries
export function useUsers() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async (): Promise<User[]> => {
      const res = await fetch(API_ROUTES.USERS)
      if (!res.ok) throw new Error("Failed to fetch users")
      return res.json()
    },
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.USER(id),
    queryFn: async (): Promise<User> => {
      const res = await fetch(`${API_ROUTES.USERS}/${id}`)
      if (!res.ok) throw new Error("Failed to fetch user")
      return res.json()
    },
    enabled: !!id,
  })
}

// User mutations
export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userData: UserFormValues): Promise<User> => {
      const res = await fetch(API_ROUTES.USERS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!res.ok) throw new Error("Failed to create user")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
    },
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userData: Partial<UserFormValues>): Promise<User> => {
      const res = await fetch(`${API_ROUTES.USERS}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!res.ok) throw new Error("Failed to update user")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER(id) })
    },
  })
}