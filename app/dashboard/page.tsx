"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, BarChart3, Code2, Database, Zap, Sparkles, BookOpen, FileText, Terminal, Palette, Package, Rocket, AlertCircle } from "lucide-react"
import Link from "next/link"
import { FeatherIcon } from "@/components/ui/feather-icon"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Starter Template Notice - Remove this when building your actual product */}
      <Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>LLM Agent Notice:</strong> This is a starter template dashboard. Replace all content below with your actual product requirements and features.
        </AlertDescription>
      </Alert>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to Your LLM-Friendly Starter</h1>
        <p className="text-muted-foreground">A production-ready template optimized for AI-assisted development</p>
      </div>

      {/* Example Metrics - Replace with your actual metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Example metric</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
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
        {/* Tech Stack Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              What&apos;s Included in This Starter
            </CardTitle>
            <CardDescription>Everything you need to build modern web applications</CardDescription>
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
                      React Server Components, streaming, and edge-ready architecture
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Turso + Prisma ORM</h4>
                    <p className="text-sm text-muted-foreground">
                      Edge database with type-safe queries and migrations
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
                      Powerful data fetching with caching and synchronization
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
                    <h4 className="font-medium">Tailwind CSS + shadcn/ui</h4>
                    <p className="text-sm text-muted-foreground">
                      Beautiful, accessible, and customizable components
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
                      End-to-end type safety with runtime validation
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
                      Performant forms with built-in validation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Commands */}
            <div className="mt-6 rounded-lg border bg-muted/50 p-4">
              <h4 className="font-medium mb-3">Essential Commands</h4>
              <div className="grid gap-2 font-mono text-sm">
                <div className="flex items-center justify-between rounded bg-background px-3 py-2">
                  <code>npm run dev</code>
                  <span className="text-xs text-muted-foreground">Start development server</span>
                </div>
                <div className="flex items-center justify-between rounded bg-background px-3 py-2">
                  <code>npm run db:studio</code>
                  <span className="text-xs text-muted-foreground">Open Prisma Studio</span>
                </div>
                <div className="flex items-center justify-between rounded bg-background px-3 py-2">
                  <code>npm run build</code>
                  <span className="text-xs text-muted-foreground">Build for production</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation & Resources */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Documentation
              </CardTitle>
              <CardDescription>Learn patterns and best practices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/docs/patterns" className="block">
                <Button variant="outline" className="w-full justify-between group">
                  <span>Patterns Guide</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/docs/prompts" className="block">
                <Button variant="outline" className="w-full justify-between group">
                  <span>AI Prompts Guide</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Link href="/docs/template" className="block">
                <Button variant="outline" className="w-full justify-between group">
                  <span>Template Reference</span>
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
                  &quot;Create a user profile card with avatar, name, and bio using shadcn/ui&quot;
                </p>
              </div>
              
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm font-medium mb-1">Database Schema:</p>
                <p className="text-xs text-muted-foreground italic">
                  &quot;Add a products table with categories using many-to-many relationship&quot;
                </p>
              </div>
              
              <div className="rounded-lg border bg-muted/50 p-3">
                <p className="text-sm font-medium mb-1">API Routes:</p>
                <p className="text-xs text-muted-foreground italic">
                  &quot;Create CRUD API routes for products with proper error handling&quot;
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-primary">1.</span>
                  <span>Update the Prisma schema for your domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-primary">2.</span>
                  <span>Replace this dashboard with your features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-primary">3.</span>
                  <span>Customize theme and branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-primary">4.</span>
                  <span>Deploy to Vercel or your platform</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Feather Icons Demo Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FeatherIcon name="feather" size={20} className="text-primary" />
              Feather Icons Demo
            </CardTitle>
            <CardDescription>
              Explore the Feather Icons library with live examples. This section demonstrates how to use feather-icons in your components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Icon Sizes Demo */}
              <div>
                <h4 className="font-medium mb-3">Icon Sizes</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex flex-col items-center gap-2">
                    <FeatherIcon name="home" size={16} className="text-muted-foreground" />
                    <span className="text-xs">16px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FeatherIcon name="home" size={20} className="text-muted-foreground" />
                    <span className="text-xs">20px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FeatherIcon name="home" size={24} className="text-muted-foreground" />
                    <span className="text-xs">24px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FeatherIcon name="home" size={32} className="text-muted-foreground" />
                    <span className="text-xs">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FeatherIcon name="home" size={48} className="text-muted-foreground" />
                    <span className="text-xs">48px</span>
                  </div>
                </div>
              </div>

              {/* Common Icons Grid */}
              <div>
                <h4 className="font-medium mb-3">Common Icons</h4>
                <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                  {[
                    "user", "users", "mail", "message-circle", "calendar",
                    "clock", "bell", "settings", "search", "filter",
                    "edit", "trash-2", "download", "upload", "share-2",
                    "heart", "star", "bookmark", "folder", "file",
                    "image", "video", "camera", "mic", "headphones",
                    "play", "pause", "volume-2", "wifi", "bluetooth",
                    "battery", "cpu", "hard-drive", "server", "database",
                    "cloud", "lock", "unlock", "shield", "check",
                    "x", "plus", "minus", "arrow-up", "arrow-down",
                    "arrow-left", "arrow-right", "refresh-cw", "rotate-cw", "maximize"
                  ].map((icon) => (
                    <div
                      key={icon}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <FeatherIcon 
                        name={icon} 
                        size={20} 
                        className="text-muted-foreground group-hover:text-foreground transition-colors" 
                      />
                      <span className="text-xs text-center break-all">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Examples */}
              <div>
                <h4 className="font-medium mb-3">Colors & Styling</h4>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <FeatherIcon name="heart" size={24} className="text-red-500" />
                    <span className="text-sm">text-red-500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatherIcon name="star" size={24} className="text-yellow-500" />
                    <span className="text-sm">text-yellow-500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatherIcon name="check-circle" size={24} className="text-green-500" />
                    <span className="text-sm">text-green-500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatherIcon name="info" size={24} className="text-blue-500" />
                    <span className="text-sm">text-blue-500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FeatherIcon name="alert-triangle" size={24} className="text-amber-500" />
                    <span className="text-sm">text-amber-500</span>
                  </div>
                </div>
              </div>

              {/* Usage Example */}
              <div>
                <h4 className="font-medium mb-3">Usage Example</h4>
                <div className="rounded-lg bg-muted/50 p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`import { FeatherIcon } from "@/components/ui/feather-icon"

export function MyComponent() {
  return (
    <button className="flex items-center gap-2">
      <FeatherIcon name="download" size={20} />
      Download File
    </button>
  )
}`}</code>
                  </pre>
                </div>
              </div>

              {/* Interactive Demo */}
              <div>
                <h4 className="font-medium mb-3">Interactive Examples</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm">
                    <FeatherIcon name="mail" size={16} className="mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <FeatherIcon name="download" size={16} className="mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <FeatherIcon name="share-2" size={16} className="mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <FeatherIcon name="printer" size={16} className="mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}