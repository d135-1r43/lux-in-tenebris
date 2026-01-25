import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type {
	DirectusResponse,
	DirectusPortfolioItem,
	DirectusFile,
	GalleryImage
} from '$lib/types';

const DIRECTUS_BASE_URL = 'https://directus.herhoffer.net';
const LUX_IN_TENEBRIS_FOLDER = '45c69124-0ec6-4031-81a6-e0e78a2a33ad';

async function fetchFileDetails(fileId: string, fetchFn: typeof fetch): Promise<DirectusFile> {
	const response = await fetchFn(`${DIRECTUS_BASE_URL}/files/${fileId}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch file ${fileId}: ${response.statusText}`);
	}
	const result = await response.json();
	return result.data;
}

function transformToGalleryImage(item: DirectusPortfolioItem, file: DirectusFile): GalleryImage {
	const width = file.width || 1200;
	const height = file.height || 800;
	const year = new Date(item.date).getFullYear();

	return {
		id: item.id,
		url: `${DIRECTUS_BASE_URL}/assets/${file.id}`,
		width,
		height,
		festival: item.location || 'CVJM',
		band: item.band_name,
		year,
		aspectRatio: width / height
	};
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	const offset = parseInt(url.searchParams.get('offset') || '0');
	const limit = parseInt(url.searchParams.get('limit') || '10');

	try {
		const params = new URLSearchParams({
			fields: 'id,photo,band_name,location,date,caption',
			limit: limit.toString(),
			offset: offset.toString(),
			sort: '-date'
		});

		const directusUrl = `${DIRECTUS_BASE_URL}/items/portfolio_images?${params.toString()}`;

		const response = await fetch(directusUrl, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch images from Directus: ${response.statusText}`);
		}

		const result: DirectusResponse = await response.json();

		// Fetch file details for each portfolio item and filter by folder
		const imagesPromises = result.data.map(async (item) => {
			try {
				const file = await fetchFileDetails(item.photo, fetch);

				// Only include images from the Lux in Tenebris folder
				if (file.folder === LUX_IN_TENEBRIS_FOLDER) {
					return transformToGalleryImage(item, file);
				}
				return null;
			} catch (err) {
				console.error(`Failed to fetch file details for ${item.photo}:`, err);
				return null;
			}
		});

		const imagesResults = await Promise.all(imagesPromises);
		const images: GalleryImage[] = imagesResults.filter((img): img is GalleryImage => img !== null);

		return json({
			images,
			hasMore: result.data.length === limit
		});
	} catch (err) {
		console.error('Error loading gallery images:', err);
		return json({ error: 'Failed to load images' }, { status: 500 });
	}
};
