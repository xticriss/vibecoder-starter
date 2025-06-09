import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { UserPublic } from "./types"
import type { ProfileFormValues } from "./validations"
import { API_ROUTES, QUERY_KEYS } from "./constants"

// Profile queries
export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: async (): Promise<UserPublic> => {
      const res = await fetch(API_ROUTES.USERS)
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Authentication required")
        }
        throw new Error("Failed to fetch profile")
      }
      return res.json()
    },
  })
}

// Profile mutations
export function useUpdateProfile() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (profileData: ProfileFormValues): Promise<UserPublic> => {
      const res = await fetch(API_ROUTES.USERS, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to update profile")
      }
      
      return res.json()
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(QUERY_KEYS.USERS, updatedUser)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH_USER })
      toast.success("Profile updated successfully!")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}