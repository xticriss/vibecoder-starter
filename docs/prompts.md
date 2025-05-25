# Effective Prompts for LLM-Assisted Development

> Proven prompts for generating high-quality code with our Next.js stack

## 🎯 Component Creation Prompts

### Basic Component
```
Create a [ComponentName] component using shadcn/ui components. It should:
- Accept [props] as props with TypeScript interfaces
- Use Tailwind classes for styling
- Follow the standard component pattern from my template
- Include proper error handling and loading states
```

### Form Component
```
Create a [FormName] form component with:
- React Hook Form + Zod validation
- Fields: [list fields with types]
- shadcn/ui form components (Form, FormField, Input, Button)
- Integration with use[Create/Update]Model hook
- Proper error handling and loading states
- TypeScript interfaces for all props and data
```

### List Component with Data Fetching
```
Create a [ItemName]List component that:
- Uses the use[Items] TanStack Query hook
- Displays items in shadcn/ui Card components
- Shows loading, error, and empty states
- Includes [specific fields] for each item
- Has proper TypeScript types
- Follows the list pattern from my template
```

## 🗄️ Database & API Prompts

### Database Model
```
Add a [ModelName] model to my Prisma schema with:
- Standard fields (id, createdAt, updatedAt)
- Custom fields: [list fields with types]
- Relationships: [describe relationships]
- Proper indexes and constraints
- Follow the model pattern from my template
```

### TanStack Query Hooks
```
Create TanStack Query hooks for [ModelName]:
- use[ModelName]s() for fetching all items
- use[ModelName](id) for fetching single item
- useCreate[ModelName]() for creating items
- useUpdate[ModelName](id) for updating items
- useDelete[ModelName](id) for deleting items
- Include proper error handling and cache invalidation
- Follow the query pattern from my template
```

### API Route
```
Create API routes for [ModelName] at /api/[modelName]:
- GET: Fetch all items with pagination and filtering
- POST: Create new item with validation
- Use Zod schemas for validation
- Proper error handling and status codes
- Follow the API route pattern from my template
```

## 🎨 UI & Layout Prompts

### Dashboard Page
```
Create a dashboard page that:
- Fetches data using server components
- Has a [specific layout] with shadcn/ui components
- Displays [data/metrics] using TanStack Query
- Includes [specific features]
- Has proper loading and error states
- Follows the page pattern from my template
```

### Modal/Dialog Component
```
Create a [ModalName] modal using shadcn/ui Dialog that:
- Contains a [FormName] form
- Handles [create/edit] functionality
- Closes on successful submission
- Shows loading states during submission
- Has proper TypeScript props
- Integrates with TanStack Query mutations
```

### Navigation Component
```
Create a navigation component that:
- Uses Next.js Link components
- Has [specific nav items]
- Uses shadcn/ui components for styling
- Has mobile-responsive design with Tailwind
- Follows the component pattern from my template
```

## 🔧 Feature Development Prompts

### CRUD Feature Set
```
Create a complete [FeatureName] feature with:
- Database model with [specific fields]
- API routes for all CRUD operations
- TanStack Query hooks for data fetching
- Form components for create/edit
- List component with actions
- Detail/view component
- Follow all patterns from my template
```

### Search & Filter Feature
```
Add search and filtering to [ExistingComponent]:
- Search input using shadcn/ui Input
- Filter dropdowns for [specific filters]
- URL state management with useSearchParams
- Backend API filtering support
- Debounced search with TanStack Query
- Clear filters functionality
- Loading states during search
```

### File Upload Feature
```
Add file upload capability to [ModelName]:
- File input using shadcn/ui components
- Image preview functionality
- Upload progress indicator
- Integration with [upload service]
- Database schema updates for file URLs
- Proper error handling and validation
- TypeScript types for file data
```

## 🚀 Advanced Feature Prompts

### Real-time Updates
```
Add real-time updates to [ComponentName]:
- WebSocket connection setup
- Real-time data synchronization
- TanStack Query cache updates
- Optimistic updates for better UX
- Connection status indicator
- Error handling and reconnection logic
```

### Data Export Feature
```
Create data export functionality for [ModelName]:
- Export button in the UI
- API endpoint for generating [CSV/PDF/Excel]
- Progress indicator for large exports
- Download functionality
- Proper error handling
```

### Advanced Search
```
Create advanced search for [ModelName]:
- Multi-field search form
- Date range pickers
- Autocomplete suggestions
- Search result highlighting
- Pagination and sorting
- Export search results
```

## 💡 Prompt Enhancement Tips

### Context Setting
Always start with:
```
I'm working with a Next.js 14 app using TypeScript, Tailwind, shadcn/ui, Prisma with Turso, and TanStack Query. Here's the relevant pattern from my template: [paste relevant section]
```

### Specificity Examples
```
❌ "Create a form"
✅ "Create a contact form with name, email, and message fields using React Hook Form, Zod validation, and shadcn/ui components, following the form pattern from my template"
```

### Error Handling Requests
Always include:
```
Include proper error handling, loading states, and TypeScript types. Follow the patterns established in my template.
```

### Integration Requirements
Specify connections:
```
This should integrate with my existing [database/state management] system and follow the [specific pattern] from my template.
```

## 🔄 Iteration Prompts

### Code Review
```
Review this [component/function] and suggest improvements based on:
- My template patterns and best practices
- TypeScript type safety
- Error handling completeness
- Performance optimizations
- Accessibility considerations
```

### Refactoring
```
Refactor this [code] to:
- Better follow the patterns from my template
- Improve TypeScript type safety
- Add missing error handling
- Optimize for performance
- Make it more reusable
```

### Testing
```
Create tests for this [component/function]:
- Unit tests with Jest and React Testing Library
- Test all user interactions and edge cases
- Mock external dependencies properly
- Follow testing best practices
- Include accessibility tests
```

## 📊 Data Visualization Prompts

### Chart Component
```
Create a [ChartType] chart component that:
- Uses [chart library] for visualization
- Displays [specific data]
- Has responsive design
- Includes loading and error states
- Exports chart as image/PDF
- Follows component patterns from my template
```

### Dashboard Metrics
```
Create metric cards for the dashboard showing:
- [List of metrics]
- Real-time updates using TanStack Query
- Trend indicators (up/down)
- Click-through to detailed views
- Loading skeletons while fetching
- Error state handling
```

These prompts are designed to work seamlessly with your established patterns and generate high-quality, consistent code that integrates perfectly with your Next.js application.
EOF < /dev/null