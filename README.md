# Lux in Tenebris

A simple and clean, black background photo gallery showcasing high-quality concert photos from CVJM Jugendkultur & Musik e.V.

Built with SvelteKit and Tailwind CSS for a minimal, elegant viewing experience that puts the photos front and center.

## Tech Stack

- **SvelteKit** - Modern web framework
- **Svelte 5** - Using the latest runes syntax
- **Tailwind CSS 4** - Utility-first styling
- **TypeScript** - Type safety

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
npm run dev
# or open browser automatically
npm run dev -- --open
```

## Gallery Structure

The gallery features:

- **Minimalistic design** with black background and elegant Bebas Neue Pro typography
- **Single column layout** with centered, max-width constrained presentation
- **Uniform typography** using different font weights for visual hierarchy
- **Stylistic elements** including ✛ symbols as decorative accents
- **Image metadata** below each photo: festival/club name, band name, and year
- **Mock data**: Currently uses placecats.com for demonstration purposes

### Components

- `Gallery.svelte` - Main gallery container with responsive layout
- `GalleryCard.svelte` - Individual image card with overlay captions
- `gallery-data.ts` - Image data and metadata
- `types.ts` - TypeScript interfaces for type safety

## Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The project uses `@sveltejs/adapter-node` for Node.js deployment.
