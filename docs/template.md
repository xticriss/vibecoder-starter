# LLM-Friendly Next.js Template

> Complete reference template for AI-assisted development

## 🚀 Stack Overview

- **Framework**: Next.js 15+ with App Router (TypeScript, SSR)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Turso (SQLite) + Prisma ORM
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: npm
- **Deployment**: Vercel

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── users/route.ts        # Example API route
│   ├── dashboard/                # Dashboard page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── forms/                   # Form components
│   └── providers/               # Context providers
├── lib/                         # Utilities and configs
│   ├── db.ts                    # Prisma client
│   ├── queries.ts               # TanStack Query hooks
│   ├── utils.ts                 # Utility functions
│   └── validations.ts           # Zod schemas
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Database seeding
├── scripts/                     # Utility scripts
│   ├── migrate.ts               # Database migration
│   └── seed.ts                  # Database seeding
└── types/                       # TypeScript definitions
```

## 🗄️ Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```

## 🎯 TanStack Query Patterns

```typescript
// lib/queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users")
      if (\!res.ok) throw new Error("Failed to fetch users")
      return res.json()
    },
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userData: { name: string; email: string }) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (\!res.ok) throw new Error("Failed to create user")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
```

## 📝 Form Component Pattern

```typescript
// components/forms/example-form.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

type FormValues = z.infer<typeof formSchema>

export function ExampleForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "" },
  })

  async function onSubmit(values: FormValues) {
    try {
      // Your submit logic here
      toast.success("Success\!")
      form.reset()
      onSuccess?.()
    } catch (error) {
      toast.error("Something went wrong")
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
                <Input placeholder="Enter your name" {...field} />
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
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## 🛠️ Environment Configuration

```bash
# .env.local
# For Turso: DATABASE_URL="libsql://your-db.turso.io?authToken=your-token"
# For local SQLite: DATABASE_URL="file:./prisma/dev.db"
DATABASE_URL="libsql://your-db.turso.io?authToken=your-token"
```

```typescript
// lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
```

## 📦 Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:push": "tsx scripts/migrate.ts",
    "db:studio": "prisma studio",
    "db:seed": "tsx scripts/seed.ts"
  }
}
```

## 🚀 Quick Setup

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your database URL

# 3. Setup database
npm run db:generate
npm run db:push
npm run db:seed # Optional

# 4. Install shadcn/ui components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input label form card

# 5. Start development
npm run dev
```

## 🎨 shadcn/ui Components

The template uses shadcn/ui for consistent, accessible components:

- **Button**: Primary interactive element
- **Card**: Container for grouped content
- **Form**: Form handling with React Hook Form integration
- **Input**: Text input fields
- **Label**: Form field labels
- **And more**: Add components as needed with `npx shadcn-ui@latest add [component]`

## 📄 API Route Pattern

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"

const schema = z.object({
  // Define your validation schema
})

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.model.findMany()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = schema.parse(body)
    
    const result = await prisma.model.create({
      data: validatedData,
    })
    
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## 🔧 Utility Functions

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

This template provides the complete foundation for LLM-assisted development with consistent patterns and best practices.
EOF < /dev/null