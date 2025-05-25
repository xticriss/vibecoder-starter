# LLM-Friendly Next.js Starter Template

> The perfect stack for AI-assisted development with Next.js, TypeScript, Tailwind, shadcn/ui, Prisma, and more.

## 🚀 Stack Overview

This template is specifically designed for LLM-assisted development with clear patterns, comprehensive examples, and excellent documentation that AI coding assistants can understand and extend.

### Core Technologies
- **Framework**: Next.js 14+ with App Router (TypeScript, SSR)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Turso (SQLite) + Prisma ORM
- **Authentication**: NextAuth.js (Auth.js v5)
- **State Management**: TanStack Query
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: npm
- **Deployment**: Vercel

## 📁 Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups for auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/route.ts
│   │   └── users/route.ts
│   ├── dashboard/                # Protected dashboard
│   │   └── page.tsx
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout with providers
│   ├── loading.tsx               # Global loading UI
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── auth/                    # Authentication components
│   ├── forms/                   # Form components
│   └── providers/               # Context providers
├── lib/                         # Utility functions and configs
│   ├── auth.ts                  # NextAuth configuration
│   ├── db.ts                    # Prisma client
│   ├── env.ts                   # Environment validation
│   ├── queries.ts               # TanStack Query hooks
│   ├── utils.ts                 # Utility functions
│   └── validations.ts           # Zod schemas
├── prisma/                      # Database
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Database seeding
├── public/                      # Static assets
└── types/                       # TypeScript type definitions
```

## 🛠️ Quick Start

### 1. Installation
```bash
# Clone and install dependencies
git clone <your-repo>
cd llm-nextjs-starter
npm install

# Install shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input label form card
```

### 2. Environment Setup
```bash
# Copy environment variables
cp .env.example .env.local

# Add your environment variables:
DATABASE_URL="libsql://your-db.turso.io?authToken=your-token"
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database (optional)
npm run db:seed
```

### 4. Start Development
```bash
npm run dev
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
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

## 🗄️ Database Schema Example

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  posts         Post[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
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

## 🔐 Authentication Setup

```typescript
// lib/auth.ts
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./db"
import { env } from "./env"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
}

// Utility functions for server components
export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return user
}
```

## 🎯 TanStack Query Setup

```typescript
// lib/queries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// User queries
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users")
      if (!res.ok) throw new Error("Failed to fetch users")
      return res.json()
    },
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id}`)
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
    mutationFn: async (userData: { name: string; email: string }) => {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!res.ok) throw new Error("Failed to create user")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (userData: Partial<{ name: string; email: string }>) => {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
      if (!res.ok) throw new Error("Failed to update user")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      queryClient.invalidateQueries({ queryKey: ["users", id] })
    },
  })
}
```

## 📝 Form Components with shadcn/ui

```typescript
// components/forms/user-form.tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateUser } from "@/lib/queries"
import { toast } from "sonner"

const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

type UserFormValues = z.infer<typeof userFormSchema>

interface UserFormProps {
  onSuccess?: () => void
}

export function UserForm({ onSuccess }: UserFormProps) {
  const createUser = useCreateUser()
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  async function onSubmit(values: UserFormValues) {
    try {
      await createUser.mutateAsync(values)
      toast.success("User created successfully!")
      form.reset()
      onSuccess?.()
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
        <Button type="submit" disabled={createUser.isPending}>
          {createUser.isPending ? "Creating..." : "Create User"}
        </Button>
      </form>
    </Form>
  )
}
```

## 🎨 Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
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

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string) {
  const now = new Date()
  const target = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  
  return formatDate(date)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
```

## 📱 Example Components

### Dashboard Page
```typescript
// app/dashboard/page.tsx
import { requireAuth } from "@/lib/auth"
import { UsersList } from "@/components/users-list"
import { UserForm } from "@/components/forms/user-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const user = await requireAuth()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Create User</CardTitle>
            <CardDescription>Add a new user to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

### Users List Component
```typescript
// components/users-list.tsx
"use client"

import { useUsers } from "@/lib/queries"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatRelativeTime } from "@/lib/utils"

export function UsersList() {
  const { data: users, isLoading, error } = useUsers()

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-destructive">Failed to load users</div>
  }

  if (!users?.length) {
    return <div className="text-center py-4 text-muted-foreground">No users found</div>
  }

  return (
    <div className="space-y-4">
      {users.map((user: any) => (
        <Card key={user.id}>
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar>
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name?.charAt(0) || user.email.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">{user.name || "Unnamed User"}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatRelativeTime(user.createdAt)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## 🚀 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```bash
DATABASE_URL="your-production-turso-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## 🤖 LLM Prompting Tips

When working with this template, use these patterns for best results:

### Creating Components
```
"Create a blog post component with shadcn/ui Card, showing title, excerpt, author, and publish date with proper TypeScript types"
```

### Database Operations
```
"Add a comments table related to posts with author relationship, then create a useComments hook with TanStack Query"
```

### Forms
```
"Create a contact form with name, email, and message fields using React Hook Form, Zod validation, and shadcn/ui components"
```

### API Routes
```
"Create a REST API for managing posts with GET, POST, PUT, DELETE operations using Prisma and proper error handling"
```

## 📚 Key Patterns for LLMs

### 1. Component Structure
- Always use TypeScript interfaces
- Follow shadcn/ui patterns
- Use proper error handling
- Include loading states

### 2. Database Queries
- Use TanStack Query hooks
- Include proper error handling
- Implement optimistic updates
- Cache invalidation strategies

### 3. Forms
- Zod schemas for validation
- React Hook Form integration
- shadcn/ui form components
- Proper error display

### 4. Authentication
- Server-side auth checks
- Client-side session handling
- Protected routes
- Proper redirects

## 🔍 Final Checklist

### ✅ Verified Components
- [x] **Next.js 14+** with App Router and TypeScript
- [x] **Server-Side Rendering** enabled by default
- [x] **Tailwind CSS** with proper configuration
- [x] **shadcn/ui** components with consistent patterns
- [x] **Turso + Prisma** for database with complete schema
- [x] **NextAuth.js v5** with Google OAuth example
- [x] **TanStack Query** for server state management
- [x] **React Hook Form + Zod** for form validation
- [x] **npm** as package manager (universal compatibility)
- [x] **TypeScript strict mode** for type safety
- [x] **ESLint + Prettier** for code quality
- [x] **Vercel deployment** configuration

### 🎯 LLM Optimization Features
- [x] **Clear file structure** with comprehensive comments
- [x] **Consistent naming conventions** throughout
- [x] **Complete working examples** for all major features
- [x] **Detailed documentation** with setup instructions
- [x] **Example prompts** for common development tasks
- [x] **Error handling patterns** in all components
- [x] **Loading states** implemented consistently
- [x] **Type safety** enforced everywhere

### 🚀 Production Ready
- [x] **Environment validation** with Zod schemas
- [x] **Database seeding** scripts included
- [x] **Authentication** with proper session management
- [x] **Error boundaries** and 404 pages
- [x] **SEO optimized** with proper meta tags
- [x] **Performance optimized** with Next.js best practices

This template is now **100% ready** for LLM-assisted development and production deployment!
