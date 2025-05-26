# LLM-Friendly Next.js Starter Template

> A simplified, production-ready starter template for AI-assisted development with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Prisma.

## 🚀 Features

- **Next.js 15+** with App Router and Server Components
- **TypeScript** with strict mode for type safety
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **Lucide React + Feather Icons** for comprehensive icon libraries
- **Turso + Prisma** for edge-ready database with type-safe ORM
- **TanStack Query** for powerful data fetching
- **React Hook Form + Zod** for form handling and validation

## 📦 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Turso database account (free tier available) or use local SQLite

### Installation

1. Clone the repository:
```bash
git clone <your-repo>
cd vibecoder-starter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Then edit `.env` with your database URL:
- For Turso: `DATABASE_URL="libsql://your-db.turso.io?authToken=your-token"`
- For local SQLite: `DATABASE_URL="file:./prisma/dev.db"`

4. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed # Optional: seed with sample data
```

5. Start the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your app!

## 📚 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── providers/        # Context providers
├── lib/                   # Utilities and configurations
│   ├── db.ts             # Prisma client
│   ├── queries.ts        # TanStack Query hooks
│   ├── utils.ts          # Utility functions
│   └── validations.ts    # Zod schemas
├── prisma/               # Database schema
├── scripts/              # Database scripts
└── types/                # TypeScript type definitions
```

## 🛠️ Available Scripts

```json
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format code with Prettier
npm run type-check # Check TypeScript types
npm run db:generate # Generate Prisma client
npm run db:push    # Push schema to database
npm run db:studio  # Open Prisma Studio
npm run db:seed    # Seed database with sample data
```

## 🗄️ Database Schema

The template includes two simple models to get you started:

```prisma
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

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `DATABASE_URL` environment variable
4. Deploy!

## 📖 Documentation

This template includes comprehensive documentation for AI-assisted development:

- **[Patterns Guide](/docs/patterns.md)** - Common code patterns and conventions
- **[Prompts Guide](/docs/prompts.md)** - Effective prompts for generating code
- **[Template Reference](/docs/template.md)** - Complete template structure and examples

## 🤖 LLM Development Tips

This template is optimized for AI-assisted development. When prompting your AI assistant:

### Creating Components
```
"Create a blog post list component with shadcn/ui Card, showing title, excerpt, and publish date"
```

### Database Operations
```
"Add a categories table with many-to-many relationship to posts"
```

### Forms
```
"Create a contact form with name, email, and message fields using React Hook Form and Zod validation"
```

### API Routes
```
"Create an API route to handle post publishing with proper error handling"
```

For more detailed prompts and patterns, check out the [documentation](/docs).

## 📝 License

MIT License - feel free to use this template for your projects!