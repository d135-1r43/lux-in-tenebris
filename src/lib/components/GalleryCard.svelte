<script lang="ts">
	import type { GalleryImage } from '$lib/types';

	let { image }: { image: GalleryImage } = $props();
</script>

<div class="group">
	<!-- Image -->
	<div class="overflow-hidden border-2 border-white/30">
		<img
			src={image.url}
			alt="{image.band} at {image.festival} ({image.year})"
			class="w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02]"
			loading="lazy"
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
				class="font-['bebas-neue-pro'] text-lg font-thin tracking-[0.3em] tabular-nums text-white/40 md:text-xl"
			>
				{image.year}
			</p>
		</div>
	</div>
</div>
