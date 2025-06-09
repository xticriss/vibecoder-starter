"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { userSchema, type UserFormValues } from "@/lib/validations"
import { useCreateUser } from "@/lib/queries"
import { toast } from "sonner"

interface UserFormProps {
  onSuccess?: () => void
}

export function UserForm({ onSuccess }: UserFormProps) {
  const createUser = useCreateUser()
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "" },
  })

  async function onSubmit(data: UserFormValues) {
    try {
      await createUser.mutateAsync(data)
      toast.success("User created successfully!")
      form.reset()
      onSuccess?()
    } catch (error) {
      toast.error("Failed to create user")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createUser.isPending}>
          {createUser.isPending ? "Creating..." : "Create User"}
        </Button>
      </form>
    </Form>
  )
}