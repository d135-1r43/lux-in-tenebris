# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a concert photo gallery for CVJM Jugendkultur & Musik e.V. with a clean, minimalist design on a black background.

**Tech Stack:**
- **Svelte 5** (with modern runes syntax like `$props()`)
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** for styling
- **Node.js adapter** for deployment
- **pnpm** as the package manager

**Design:**
- Black background for photo focus
- Adobe Font: **Bebas Neue Pro** (Project ID: `auh6rjy`)

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
│   ├── components/ # Svelte components
│   │   ├── Gallery.svelte      # Main gallery container
│   │   └── GalleryCard.svelte  # Individual image card
│   ├── gallery-data.ts  # Mock image data
│   ├── types.ts         # TypeScript interfaces
│   └── index.ts         # Library exports
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

### Typography - Bebas Neue Pro
The project uses Adobe Fonts (Project ID: `auh6rjy`).

**Font family CSS:**
```css
font-family: bebas-neue-pro, sans-serif;
```

**Available weights:**
- Thin: `font-weight: 100` (normal and italic)
- Light: `font-weight: 200` (normal and italic)
- Regular: `font-weight: 400` (normal and italic)
- Middle: `font-weight: 500` (normal and italic)
- Bold: `font-weight: 600` (normal and italic)

## Gallery Components

### Component Architecture

**Gallery.svelte** - Main container component
- Accepts `images` array via `$props()`
- Single column layout (max-width 5xl, centered)
- Generous vertical spacing between items (16-24 units)
- Consistent presentation across all screen sizes

**GalleryCard.svelte** - Individual image card
- Accepts `image` object via `$props()`
- Displays image with aspect ratio preservation
- Caption below image with uniform font sizing:
  - Band name (font-weight 200/light, 2xl-3xl, white)
  - Festival/club name (font-weight 100/thin, 2xl-3xl, 40% opacity)
  - Year (font-weight 100/thin, 2xl-3xl, 50% opacity)
  - ✛ symbols as stylistic accents (30% and 20% opacity)
- Subtle hover effect (scale 105%)

### Data Structure

**types.ts** - `GalleryImage` interface
```typescript
{
  id: string;
  url: string;
  width: number;
  height: number;
  festival: string;
  band: string;
  year: number;
  aspectRatio: number;
}
```

**gallery-data.ts** - Mock data (deprecated)
- Legacy file with placecats.com mock data
- Replaced by Directus CMS integration
- Images now fetched server-side from Directus

### Layout Behavior
- Black background (`bg-black`) throughout
- Single column, centered layout with max-width constraint
- Uniform typography using different font weights for hierarchy
- ☩ symbols as decorative dividers
- Smooth scroll behavior and hover effects

## Directus CMS Integration

### Overview
The gallery fetches concert photos from a Directus headless CMS instance.

**Base URL**: `https://directus.herhoffer.net`
**Collection**: `portfolio_images`
**Folder**: Lux in Tenebris (`45c69124-0ec6-4031-81a6-e0e78a2a33ad`)

### Data Loading
**File**: `src/routes/+page.server.ts`

Server-side data loading using SvelteKit's load function:
- Fetches from publicly accessible Directus REST API
- Filters images by Lux in Tenebris folder UUID
- Sorts by date (descending)
- Transforms Directus schema to GalleryImage interface
- Returns up to 100 images

### Directus Schema
```typescript
{
  id: string;              // UUID
  image: {
    filename_download: string;
    width?: number;
    height?: number;
  };
  band_name: string;       // Band name (e.g., "Lux in Tenebris")
  location: string | null; // Festival/venue name
  date: string;            // ISO date (YYYY-MM-DD)
  caption: string | null;  // Optional caption
}
```

### Data Transformation
Directus items are transformed to GalleryImage format:
- `image.filename_download` → full asset URL
- `location` → `festival` (defaults to "CVJM" if null)
- `band_name` → `band`
- `date` → `year` (extracted from date string)

**Note**: The Directus API is publicly accessible and does not require authentication.

## Build Output
- Production build outputs to `.svelte-kit/` and `/build`
- Uses `@sveltejs/adapter-node` for Node.js deployment
- Preview with `npm run preview` after building

## Docker & Deployment

### Dockerfile
Multi-stage build using Node.js 22 Alpine:
- **Build stage**: Installs pnpm, dependencies, and builds the application
- **Production stage**: Runs the built app with production dependencies only
- Exposes port 3000
- Uses `.dockerignore` to exclude unnecessary files

### GitHub Actions CI/CD
**Workflow**: `.github/workflows/docker-build-push.yml`

Automatically builds and pushes Docker images to GitHub Container Registry (GHCR):
- **Triggers**: Push to `main` branch, version tags (`v*`), or manual dispatch
- **Registry**: `ghcr.io`
- **Tagging strategy**:
  - Branch names (e.g., `main`)
  - Semantic versions from tags (e.g., `v1.2.3` → `1.2.3`, `1.2`, `1`)
  - Git SHA with branch prefix
  - `latest` tag for default branch
- **Cache**: Uses GitHub Actions cache for faster builds
- **Permissions**: Requires `contents: read` and `packages: write`

### Running the Container
```bash
# Build locally
docker build -t lux-in-tenebris .

# Run locally
docker run -p 3000:3000 lux-in-tenebris

# Pull from GHCR
docker pull ghcr.io/[username]/lux-in-tenebris:latest

# Run from GHCR
docker run -p 3000:3000 ghcr.io/[username]/lux-in-tenebris:latest
```
