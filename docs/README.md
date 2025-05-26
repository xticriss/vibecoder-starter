# LLM-Friendly Next.js Starter Documentation

Welcome to the comprehensive documentation for the LLM-Friendly Next.js Starter Template! These guides are designed to help you leverage AI assistants effectively in your development workflow.

## 📚 Documentation Overview

### 🎯 [Patterns Guide](./patterns.md)
Learn the core patterns and conventions used throughout the template:
- Component structure patterns
- Database and Prisma patterns
- Form handling patterns
- API route patterns
- UI component patterns
- Common coding patterns

### 💡 [Prompts Guide](./prompts.md)
Master the art of prompting AI assistants with proven templates:
- Component creation prompts
- Database operation prompts
- Feature development prompts
- Advanced feature prompts
- Tips for effective prompting

### 📋 [Template Reference](./template.md)
Complete reference for the template structure:
- Technology stack overview
- Project structure breakdown
- Configuration examples
- Setup instructions
- Code examples

## 🚀 Getting Started

1. **Start with Patterns**: Familiarize yourself with the [patterns](./patterns.md) to understand how code is structured
2. **Learn Effective Prompting**: Use the [prompts guide](./prompts.md) to generate consistent, high-quality code
3. **Reference the Template**: Check the [template reference](./template.md) for specific implementation details

## 💡 Best Practices for AI-Assisted Development

### 1. Provide Context
Always include relevant context when prompting:
```
"I'm using the Next.js starter with TypeScript, Tailwind, shadcn/ui, and Prisma. 
I need to create..."
```

### 2. Reference Patterns
Point to specific patterns from the documentation:
```
"Following the form pattern from my template, create a..."
```

### 3. Be Specific
The more specific your prompt, the better the output:
```
❌ "Create a form"
✅ "Create a contact form with name, email, and message fields using React Hook Form and Zod validation"
```

### 4. Iterate and Refine
Don't hesitate to ask for improvements:
```
"Refactor this to better follow the patterns from my template"
```

## 🔧 Common Tasks

### Creating a New Feature
1. Define your data model (Prisma schema)
2. Create API routes for CRUD operations
3. Add TanStack Query hooks
4. Build UI components
5. Implement forms with validation

### Adding a New Page
1. Create the page component in `app/`
2. Add any required API routes
3. Create supporting components
4. Add to navigation if needed

### Extending the Database
1. Update `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Run `npm run db:push`
4. Update queries and API routes

## 🎨 UI Development

The template uses shadcn/ui components. To add new components:
```bash
npx shadcn-ui@latest add [component-name]
```

Common components to add:
- `dialog` - For modals
- `select` - For dropdowns
- `textarea` - For multi-line input
- `toast` - For notifications (already included via sonner)
- `table` - For data tables

## 📦 Dependencies

Core dependencies and their purposes:
- **Next.js**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **Lucide React**: Primary icon library (React components)
- **Feather Icons**: Alternative icon library (SVG-based)
- **Prisma**: Database ORM
- **TanStack Query**: Data fetching and caching
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Sonner**: Toast notifications

## 🤝 Contributing

If you find ways to improve these docs or the template:
1. Fork the repository
2. Make your changes
3. Submit a pull request

Happy coding with AI assistance! 🚀