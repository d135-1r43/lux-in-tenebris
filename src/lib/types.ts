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

// Directus API types
export interface DirectusPortfolioItem {
	id: string;
	image: string; // UUID of the image file
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
