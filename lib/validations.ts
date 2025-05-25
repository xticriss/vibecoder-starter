import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  published: z.boolean().default(false),
})

export type UserFormValues = z.infer<typeof userSchema>
export type PostFormValues = z.infer<typeof postSchema>