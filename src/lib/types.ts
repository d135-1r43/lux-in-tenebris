export interface GalleryImage {
	id: string;
	url: string;
	width: number;
	height: number;
	festival: string;
	band: string;
	year: number;
	aspectRatio: number;
}

export interface ImageTransformConfig {
	width: number;
	quality: number;
	fit?: 'cover' | 'contain' | 'inside' | 'outside';
	format?: 'auto' | 'jpg' | 'png' | 'webp';
	withoutEnlargement?: boolean;
}

// Directus API types
export interface DirectusPortfolioItem {
	id: string;
	photo: string; // UUID of the photo file
	band_name: string;
	location: string | null;
	date: string;
	caption: string | null;
}

export interface DirectusFile {
	id: string;
	filename_download: string;
	width: number;
	height: number;
	folder: string;
}

export interface DirectusResponse {
	data: DirectusPortfolioItem[];
}
