# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application using:
- **Svelte 5** (with modern runes syntax like `$props()`)
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** for styling
- **Node.js adapter** for deployment
- **pnpm** as the package manager

## Development Commands

```bash
# Start development server
npm run dev
# or with auto-open browser
npm run dev -- --open

# Type checking (run before commits)
npm run check

# Type checking in watch mode
npm run check:watch

# Linting (runs Prettier + ESLint)
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── lib/            # Shared utilities and components
│   ├── assets/     # Static assets (favicon, images)
│   └── index.ts    # Library exports
├── routes/         # File-based routing (SvelteKit convention)
│   ├── +layout.svelte  # Root layout wrapping all pages
│   ├── +page.svelte    # Index route (/)
│   └── layout.css      # Global styles
├── app.d.ts        # TypeScript type definitions for App namespace
└── app.html        # HTML template shell

static/             # Publicly served files (robots.txt, etc.)
```

## Key Architectural Patterns

### SvelteKit Routing
- File-based routing: files in `src/routes/` become routes
- `+page.svelte` creates a page at that route
- `+layout.svelte` wraps child routes (uses `{@render children()}`)
- `+server.ts` files create API endpoints
- `+page.server.ts` for server-side data loading

### Svelte 5 Syntax
This project uses Svelte 5's runes:
- `$props()` instead of `export let`
- `$state()` for reactive state
- `$derived()` for computed values
- `{@render children()}` instead of `<slot>`

### Import Aliases
- `$lib` maps to `src/lib/` (e.g., `import { x } from '$lib/utils'`)
- `$app` provides SvelteKit runtime modules (navigation, stores, etc.)

### TypeScript Configuration
- Strict mode enabled
- `rewriteRelativeImportExtensions` allows `.ts` imports
- Generated types in `.svelte-kit/tsconfig.json` (don't edit directly)
- Use `src/app.d.ts` to extend App namespace types (Locals, PageData, Error, etc.)

### Styling
- Tailwind CSS 4 configured via Vite plugin (no separate config file needed)
- Global styles in `src/routes/layout.css`
- Component-scoped styles use `<style>` blocks in `.svelte` files

## Build Output
- Production build outputs to `.svelte-kit/` and `/build`
- Uses `@sveltejs/adapter-node` for Node.js deployment
- Preview with `npm run preview` after building
