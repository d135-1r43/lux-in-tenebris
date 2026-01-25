<script lang="ts">
	import type { GalleryImage } from '$lib/types';
	import GalleryCard from './GalleryCard.svelte';

	let { images }: { images: GalleryImage[] } = $props();

	const instagramUrl = 'https://www.instagram.com/lux.in.tenebris.fotografie/';
</script>

<div class="min-h-screen w-full bg-black px-6 py-12 md:px-16 md:py-20">
	<div class="mx-auto max-w-5xl">
		<!-- Header -->
		<header class="mb-20 md:mb-32">
			<h1
				class="text-center font-['bebas-neue-pro'] text-3xl font-thin tracking-[0.35em] whitespace-nowrap text-white md:text-5xl lg:text-6xl"
			>
				LUX<span class="relative -top-0.5 mx-1 text-white/30 md:-top-1 md:mx-1.5">☩</span>IN<span
					class="relative -top-0.5 mx-1 text-white/30 md:-top-1 md:mx-1.5">☩</span
				>TENEBRIS
			</h1>
			<p
				class="mt-4 text-center font-['bebas-neue-pro'] text-lg font-light tracking-[0.2em] text-white/70 md:mt-6 md:text-xl lg:text-2xl"
			>
				Konzertfotografie im CVJM Jugendkultur & Musik e.V.
			</p>
			<div class="mt-6 flex justify-center md:mt-8">
				<a
					href={instagramUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Visit our Instagram"
					class="group block transition-opacity hover:opacity-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="h-6 w-6 text-white opacity-40 transition-opacity group-hover:opacity-90 md:h-7 md:w-7"
					>
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
					</svg>
				</a>
			</div>
		</header>

		<!-- Gallery -->
		<div>
			{#each images as image, i (image.id)}
				<GalleryCard {image} />
				{#if i < images.length - 1}
					<div class="my-16 text-center md:my-24">
						<span class="font-['bebas-neue-pro'] text-2xl text-white/20 md:text-3xl">☩</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
