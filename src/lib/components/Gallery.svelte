<script lang="ts">
	import type { GalleryImage } from '$lib/types';
	import GalleryCard from './GalleryCard.svelte';

	let { images }: { images: GalleryImage[] } = $props();
</script>

<div class="min-h-screen w-full bg-black px-6 py-12 md:px-16 md:py-20">
	<div class="mx-auto max-w-5xl">
		<!-- Header -->
		<header class="mb-20 md:mb-32">
			<h1
				class="font-['bebas-neue-pro'] whitespace-nowrap text-center text-3xl font-thin tracking-[0.35em] text-white md:text-5xl lg:text-6xl"
			>
				LUX<span class="relative -top-0.5 mx-1 text-white/30 md:-top-1 md:mx-1.5">☩</span>IN<span
					class="relative -top-0.5 mx-1 text-white/30 md:-top-1 md:mx-1.5">☩</span
				>TENEBRIS
			</h1>
			<p
				class="font-['bebas-neue-pro'] mt-4 text-center text-lg font-light tracking-[0.2em] text-white/70 md:mt-6 md:text-xl lg:text-2xl"
			>
				Konzertfotografie im CVJM Jugendkultur & Musik e.V.
			</p>
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
