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
- **Stylistic elements** including ☩ symbols as decorative dividers
- **Image metadata** below each photo: festival/club name, band name, and year
- **Directus CMS**: Fetches concert photos from Directus portfolio_images collection

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

## Docker

Build the Docker image locally:

```bash
docker build -t lux-in-tenebris .
```

Run the container:

```bash
docker run -p 3000:3000 lux-in-tenebris
```

The application will be available at http://localhost:3000

### GitHub Container Registry

The Docker image is automatically built and pushed to GitHub Container Registry on every push to the main branch and on version tags.

Pull the latest image:

```bash
docker pull ghcr.io/markusherhoffer/lux-in-tenebris:latest
```

Run from GHCR:

```bash
docker run -p 3000:3000 ghcr.io/markusherhoffer/lux-in-tenebris:latest
```

### Portainer Deployment

Deploy to production using Docker Compose:

```bash
cd portainer
docker-compose up -d
```

The `portainer/docker-compose.yml` configuration:
- Uses versioned tag (e.g., `v1.0.0`)
- Connects to `nginx-proxy-manager` external network
- Exposes port 3000
- Auto-restart enabled
