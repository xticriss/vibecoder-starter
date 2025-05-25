# Key Patterns for LLM-Assisted Development

> Quick reference guide for common patterns in our Next.js stack

## 🎯 Core Patterns

### Component Structure
```typescript
// Standard component pattern
"use client" // Only for client components

import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface ComponentNameProps {
  // Props interface
}

export function ComponentName({ className, ...props }: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* Component content */}
    </div>
  )
}
```

### Server Component Pattern
```typescript
// app/page.tsx - Server component
import { prisma } from "@/lib/db"

export default async function Page() {
  const data = await prisma.model.findMany() // Direct DB access
  
  return <div>{/* Render data */}</div>
}
```

## 🗄️ Database Patterns

### Basic Model Structure
```prisma
model ModelName {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Add your fields here
  title     String
  content   String?
  published Boolean  @default(false)
  
  // Relations
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```

### TanStack Query Hook Pattern
```typescript
// lib/queries.ts
export function useModelName() {
  return useQuery({
    queryKey: ["modelName"],
    queryFn: async () => {
      const res = await fetch("/api/modelName")
      if (\!res.ok) throw new Error("Failed to fetch")
      return res.json()
    },
  })
}

export function useCreateModelName() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateData) => {
      const res = await fetch("/api/modelName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (\!res.ok) throw new Error("Failed to create")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modelName"] })
    },
  })
}
```

## 📝 Form Patterns

### Zod Schema Pattern
```typescript
// lib/validations.ts
import { z } from "zod"

export const modelNameSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().optional(),
  published: z.boolean().default(false),
})

export type ModelNameFormData = z.infer<typeof modelNameSchema>
```

### Form Component Pattern
```typescript
// components/forms/model-form.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { modelNameSchema, type ModelNameFormData } from "@/lib/validations"
import { useCreateModelName } from "@/lib/queries"
import { toast } from "sonner"

export function ModelNameForm() {
  const createModel = useCreateModelName()
  
  const form = useForm<ModelNameFormData>({
    resolver: zodResolver(modelNameSchema),
    defaultValues: {
      title: "",
      content: "",
      published: false,
    },
  })

  async function onSubmit(data: ModelNameFormData) {
    try {
      await createModel.mutateAsync(data)
      toast.success("Created successfully\!")
      form.reset()
    } catch (error) {
      toast.error("Failed to create")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={createModel.isPending}>
          {createModel.isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  )
}
```

## 🔌 API Route Patterns

### GET Route Pattern
```typescript
// app/api/modelName/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const items = await prisma.modelName.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(items)
  } catch (error) {
    console.error("GET /api/modelName error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

### POST Route Pattern
```typescript
// app/api/modelName/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { modelNameSchema } from "@/lib/validations"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = modelNameSchema.parse(body)

    const item = await prisma.modelName.create({
      data: validatedData,
      include: { author: true },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("POST /api/modelName error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## 🎨 UI Component Patterns

### Card Layout Pattern
```typescript
// Standard card layout for displaying items
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ItemCard({ item }: { item: ItemType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{item.content}</p>
      </CardContent>
    </Card>
  )
}
```

### List with Loading States
```typescript
"use client"

import { useItems } from "@/lib/queries"
import { Card, CardContent } from "@/components/ui/card"

export function ItemsList() {
  const { data: items, isLoading, error } = useItems()

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-destructive">Failed to load items</div>
  }

  if (\!items?.length) {
    return <div className="text-center py-4 text-muted-foreground">No items found</div>
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## 🚀 Deployment Patterns

### Environment Validation
```typescript
// lib/env.ts
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).optional(),
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
```

### Database Connection
```typescript
// lib/db.ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV \!== "production") globalForPrisma.prisma = prisma
```

## 🎯 Common Patterns

### Error Handling
```typescript
try {
  // Your logic here
} catch (error) {
  console.error("Operation failed:", error)
  // Handle error appropriately
}
```

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false)

async function handleAction() {
  setIsLoading(true)
  try {
    // Async operation
  } finally {
    setIsLoading(false)
  }
}
```

### Conditional Rendering
```typescript
{condition ? (
  <ComponentA />
) : (
  <ComponentB />
)}

{condition && <Component />}
```

These patterns ensure consistency across your entire application and make it easy for LLMs to generate code that follows your established conventions.
EOF < /dev/null