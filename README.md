# LLM-Friendly Next.js Starter

A minimal, production-ready starter optimized for AI-assisted development.

## Stack

- **Next.js 15** + TypeScript + App Router
- **Supabase** + Prisma (PostgreSQL)
- **Tailwind CSS** + shadcn/ui
- **TanStack Query** + React Hook Form + Zod

## Quick Setup

```bash
# 1. Install and setup
npm install
cp .env.example .env

# 2. Configure environment (edit .env)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-long"

# 3. Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# 4. Start development
npm run dev
```

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard page
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   └── forms/         # Form components
├── lib/               # Core utilities
│   ├── db.ts          # Prisma client
│   ├── queries.ts     # TanStack Query hooks
│   ├── utils.ts       # Utilities
│   └── validations.ts # Zod schemas
└── prisma/            # Database schema
```

## Authentication

Ready-to-use JWT authentication with secure patterns:

- **Login/Register**: Complete forms with validation
- **Protected routes**: Middleware-based route protection
- **User sessions**: Secure httpOnly cookie storage
- **Profile management**: User profile updates
- **Password security**: bcrypt hashing

## Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String   # bcrypt hashed
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  posts     Post[]   # User-owned content
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

## Scripts

```bash
npm run dev         # Development server
npm run build       # Production build
npm run db:generate # Generate Prisma client
npm run db:push     # Push schema to database
npm run db:studio   # Open Prisma Studio
npm run db:seed     # Seed database
```

## LLM Development Context

When prompting AI assistants, include this context:

```
I'm using Next.js 15 with TypeScript, Supabase + Prisma, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, Zod validation, and JWT authentication. Follow the patterns from my template.
```

## Authentication Examples

- **Login**: `/login` - Complete login form
- **Register**: `/register` - User registration
- **Dashboard**: `/dashboard` - Protected route (requires auth)
- **Profile**: `/profile` - User profile management

## Documentation

- **[Patterns](/docs/patterns.md)** - Code patterns and conventions
- **[Prompts](/docs/prompts.md)** - Effective prompts for common tasks

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables:
   - `DATABASE_URL` (your Supabase connection string)
   - `JWT_SECRET` (secure random string, 32+ characters)
4. Deploy

## Troubleshooting

### Database Connection
- Verify `DATABASE_URL` format: `postgresql://user:pass@host:port/db`
- Check Supabase project is active and accessible
- Ensure your IP is allowlisted in Supabase

### Build Errors
- Run `npm run type-check` to identify TypeScript errors
- Clear `.next` folder if getting stale build errors
- Verify all required environment variables are set

### Common Issues
- **Prisma errors**: Run `npm run db:generate` after schema changes
- **Import errors**: Check file paths use `@/` prefix for src imports
- **Type errors**: Ensure all components import proper types from `@/lib/types`

MIT License