# LLM Prompts for Next.js Development

Effective prompts for generating code with this starter template.

## Context Template

Always start with this context:

```
I'm using Next.js 15 with TypeScript, Supabase + Prisma, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, and Zod validation. Follow the patterns from my template.
```

## Component Creation

### Basic Component
```
Create a [ComponentName] component that:
- Uses shadcn/ui components
- Has proper TypeScript interfaces
- Uses Tailwind for styling
- Includes loading and error states
```

### Form Component
```
Create a [FormName] form with:
- React Hook Form + Zod validation
- Fields: [list fields and types]
- shadcn/ui form components
- Integration with TanStack Query mutation
- Toast notifications for success/error
```

### List Component
```
Create a [ItemName]List component that:
- Uses TanStack Query for data fetching
- Displays items in shadcn/ui Cards
- Shows loading, error, and empty states
- Includes [specific fields] for each item
```

## Database Operations

### Prisma Model
```
Add a [ModelName] model to my Prisma schema with:
- Standard fields (id, createdAt, updatedAt)
- Custom fields: [list fields with types]
- Relationships: [describe relationships]
- Proper constraints and indexes
```

### TanStack Query Hooks
```
Create TanStack Query hooks for [ModelName]:
- use[ModelName]s() for fetching all
- use[ModelName](id) for fetching one
- useCreate[ModelName]() for creating
- useUpdate[ModelName](id) for updating
- useDelete[ModelName](id) for deleting
- Include proper error handling and cache invalidation
```

### API Routes
```
Create API routes for [ModelName] at /api/[modelName]:
- GET: Fetch all with pagination
- POST: Create with validation
- PUT: Update existing
- DELETE: Remove item
- Use Zod schemas for validation
- Proper error handling and status codes
```

## Page Creation

### Dashboard Page
```
Create a [PageName] page that:
- Uses server components for initial data
- Has [specific layout] with shadcn/ui
- Displays [data/metrics] using TanStack Query
- Includes proper loading states
```

### CRUD Page
```
Create a complete CRUD interface for [ModelName]:
- List view with search and pagination
- Create/edit modal with form validation
- Delete confirmation dialog
- Real-time updates with TanStack Query
```

## Common Patterns

### Authentication
```
Add authentication to [component/page]:
- Check user session
- Redirect to login if unauthorized
- Show different content for authenticated users
- Use proper TypeScript types
```

### Search & Filter
```
Add search and filtering to [ListComponent]:
- Search input with debouncing
- Filter dropdowns for [specific filters]
- URL state management
- Backend API filtering support
```

### Error Handling
```
Add comprehensive error handling to [component]:
- Try-catch blocks for async operations
- User-friendly error messages
- Toast notifications
- Loading states during operations
```

## Tips for Better Results

1. **Be specific** about fields, types, and relationships
2. **Include context** about existing patterns
3. **Request error handling** and loading states
4. **Ask for TypeScript types** and proper validation
5. **Specify UI requirements** (layout, styling, interactions)