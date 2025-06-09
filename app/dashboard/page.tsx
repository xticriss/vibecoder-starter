"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, BarChart3, Code2, Database, Zap, Sparkles, BookOpen, AlertCircle, Package, Rocket, Palette, Terminal } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Template Notice */}
      <Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Starter Template:</strong> Replace this dashboard with your actual application features.
        </AlertDescription>
      </Alert>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Template ready for AI-assisted development</p>
      </div>

      {/* Example Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Example metric</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">Example metric</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">Example metric</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Size</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground">Example metric</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Tech Stack */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Tech Stack
            </CardTitle>
            <CardDescription>Production-ready foundation for LLM-assisted development</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Rocket className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Next.js 15+ App Router</h4>
                    <p className="text-sm text-muted-foreground">
                      React Server Components and modern patterns
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Supabase + Prisma</h4>
                    <p className="text-sm text-muted-foreground">
                      PostgreSQL with type-safe ORM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">TanStack Query</h4>
                    <p className="text-sm text-muted-foreground">
                      Data fetching and caching
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Palette className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Tailwind + shadcn/ui</h4>
                    <p className="text-sm text-muted-foreground">
                      Beautiful, accessible components
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">TypeScript + Zod</h4>
                    <p className="text-sm text-muted-foreground">
                      Type safety and validation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">React Hook Form</h4>
                    <p className="text-sm text-muted-foreground">
                      Form handling with validation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Documentation
              </CardTitle>
              <CardDescription>Patterns and prompts for AI development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/docs/patterns" className="block">
                <Button variant="outline" className="w-full justify-between group">
                  <span>Code Patterns</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/docs/prompts" className="block">
                <Button variant="outline" className="w-full justify-between group">
                  <span>LLM Prompts</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI Development Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm font-medium mb-1">Component Creation:</p>
                <p className="text-xs text-muted-foreground italic">
                  "Create a UserProfile component using shadcn/ui Card with avatar and bio"
                </p>
              </div>
              
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm font-medium mb-1">Database Schema:</p>
                <p className="text-xs text-muted-foreground italic">
                  "Add a Product model with title, price, and category relationship"
                </p>
              </div>
              
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm font-medium mb-1">API Routes:</p>
                <p className="text-xs text-muted-foreground italic">
                  "Create CRUD API routes for products with Zod validation"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}