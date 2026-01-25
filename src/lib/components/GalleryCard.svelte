<script lang="ts">
	import type { GalleryImage } from '$lib/types';
	import { generateSrcset, generateSizes, DIRECTUS_BASE_URL } from '$lib/utils';

	let { image }: { image: GalleryImage } = $props();

	// Extract file ID from URL (format: https://directus.../assets/{id})
	const fileId = $derived(image.url.split('/assets/')[1]);
	const srcset = $derived(generateSrcset(fileId, image.width, DIRECTUS_BASE_URL));
	const sizes = generateSizes();
</script>

<div class="group">
	<!-- Image -->
	<div class="overflow-hidden border-2 border-white/30">
		<img
			src={image.url}
			{srcset}
			{sizes}
			width={image.width}
			height={image.height}
			alt="{image.band} at {image.festival} ({image.year})"
			class="w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
			loading="lazy"
			decoding="async"
		/>
	</div>

	<!-- Caption below image -->
	<div class="mt-4 md:mt-6">
		<div class="space-y-1">
			<p
				class="font-['bebas-neue-pro'] text-lg font-thin tracking-[0.25em] text-white/90 md:text-xl"
			>
				{image.festival}
			</p>
			<p
				class="font-['bebas-neue-pro'] text-3xl font-extralight tracking-[0.15em] text-white md:text-4xl"
			>
				{image.band}
			</p>
			<p
				class="font-['bebas-neue-pro'] text-lg font-thin tracking-[0.3em] text-white/40 tabular-nums md:text-xl"
			>
				{image.year}
			</p>
		</div>
	</div>
</div>
