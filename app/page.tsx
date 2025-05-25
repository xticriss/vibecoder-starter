import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code2, Database, Palette, Sparkles, Zap, Layers } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            LLM-Friendly Next.js Starter
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            The perfect stack for AI-assisted development with Next.js, TypeScript, Tailwind, shadcn/ui, Prisma, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Built for Modern Development</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Code2 className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Next.js 15 + TypeScript</CardTitle>
              <CardDescription>
                Latest App Router with server components and strict TypeScript for type safety
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Palette className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Tailwind CSS + shadcn/ui</CardTitle>
              <CardDescription>
                Beautiful, accessible components with consistent styling patterns
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Database className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Turso + Prisma</CardTitle>
              <CardDescription>
                Edge-ready SQLite database with type-safe ORM and migrations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>TanStack Query</CardTitle>
              <CardDescription>
                Powerful data fetching with caching, synchronization, and optimistic updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Layers className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Form Validation</CardTitle>
              <CardDescription>
                React Hook Form with Zod schemas for type-safe form handling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>AI-Optimized</CardTitle>
              <CardDescription>
                Clear patterns and comprehensive examples for LLM-assisted development
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Build?</h2>
            <p className="mb-8 text-muted-foreground">
              Start building your next project with our production-ready template
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}