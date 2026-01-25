import type { ImageTransformConfig } from '$lib/types';

/**
 * Directus base URL for asset transformations
 */
export const DIRECTUS_BASE_URL = 'https://directus.herhoffer.net';

/**
 * Breakpoint configurations for responsive images
 * Covers mobile (1x), tablet (1x/2x), desktop (1x/2x/3x DPI)
 */
export const SRCSET_CONFIGS: ImageTransformConfig[] = [
	{ width: 400, quality: 85, fit: 'inside', format: 'auto', withoutEnlargement: true },
	{ width: 600, quality: 85, fit: 'inside', format: 'auto', withoutEnlargement: true },
	{ width: 900, quality: 80, fit: 'inside', format: 'auto', withoutEnlargement: true },
	{ width: 1200, quality: 75, fit: 'inside', format: 'auto', withoutEnlargement: true },
	{ width: 1800, quality: 75, fit: 'inside', format: 'auto', withoutEnlargement: true },
	{ width: 2400, quality: 75, fit: 'inside', format: 'auto', withoutEnlargement: true }
];

/**
 * Builds a Directus asset URL with transformation parameters
 *
 * @param baseUrl - Base URL of the Directus instance
 * @param fileId - UUID of the file in Directus
 * @param config - Transformation configuration (width, quality, format, etc.)
 * @returns Fully qualified asset URL with query parameters
 *
 * @example
 * buildTransformUrl('https://directus.example.com', 'abc-123', { width: 800, quality: 85 })
 * // Returns: 'https://directus.example.com/assets/abc-123?width=800&quality=85&fit=inside&format=auto&withoutEnlargement=true'
 */
export function buildTransformUrl(
	baseUrl: string,
	fileId: string,
	config: ImageTransformConfig
): string {
	const params = new URLSearchParams();

	params.set('width', config.width.toString());
	params.set('quality', config.quality.toString());

	if (config.fit) {
		params.set('fit', config.fit);
	}

	if (config.format) {
		params.set('format', config.format);
	}

	if (config.withoutEnlargement) {
		params.set('withoutEnlargement', 'true');
	}

	return `${baseUrl}/assets/${fileId}?${params.toString()}`;
}

/**
 * Generates a srcset string for responsive images
 * Filters out variants larger than the original image to prevent upscaling
 *
 * @param fileId - UUID of the file in Directus
 * @param originalWidth - Original width of the image in pixels
 * @param baseUrl - Base URL of the Directus instance (defaults to DIRECTUS_BASE_URL)
 * @returns srcset string suitable for <img srcset="...">
 *
 * @example
 * generateSrcset('abc-123', 3000, 'https://directus.example.com')
 * // Returns: 'https://...?width=400&... 400w, https://...?width=600&... 600w, ...'
 */
export function generateSrcset(
	fileId: string,
	originalWidth: number,
	baseUrl: string = DIRECTUS_BASE_URL
): string {
	// Filter out sizes larger than original to prevent upscaling
	const applicableConfigs = SRCSET_CONFIGS.filter((config) => config.width <= originalWidth);

	// Generate srcset entries: "url widthDescriptor"
	const srcsetEntries = applicableConfigs.map((config) => {
		const url = buildTransformUrl(baseUrl, fileId, config);
		return `${url} ${config.width}w`;
	});

	return srcsetEntries.join(', ');
}

/**
 * Generates the sizes attribute for responsive images
 * Based on Tailwind container constraints and responsive padding
 *
 * @returns sizes string suitable for <img sizes="...">
 *
 * Container constraints:
 * - Mobile (≤768px): 100vw - 48px padding (24px each side)
 * - Desktop (>768px): 100vw - 128px padding (64px each side), max 1024px (5xl)
 *
 * @example
 * generateSizes()
 * // Returns: '(max-width: 768px) calc(100vw - 48px), min(calc(100vw - 128px), 1024px)'
 */
export function generateSizes(): string {
	return '(max-width: 768px) calc(100vw - 48px), min(calc(100vw - 128px), 1024px)';
}
