<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import type { PageData } from './$types';
	import type { GalleryImage } from '$lib/types';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	const siteTitle = 'Lux in Tenebris - Konzertfotografie';
	const siteDescription = 'Professionelle Konzertfotografie im CVJM Jugendkultur & Musik e.V. Atmosphärische Live-Aufnahmen von Metal- und Rock-Konzerten.';
	const siteUrl = 'https://lux-in-tenebris.de';
	const ogImage = data.images[0]?.url || `${siteUrl}/og-image.jpg`;

	let images = $state<GalleryImage[]>(data.images);
	let hasMore = $state(data.hasMore);
	let loading = $state(false);
	let loadTrigger: HTMLElement;

	async function loadMore() {
		if (loading || !hasMore) return;

		loading = true;
		try {
			const response = await fetch(`/api/images?offset=${images.length}&limit=10`);
			const result = await response.json();

			if (result.images && result.images.length > 0) {
				images = [...images, ...result.images];
				hasMore = result.hasMore;
			} else {
				hasMore = false;
			}
		} catch (error) {
			console.error('Failed to load more images:', error);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					loadMore();
				}
			},
			{ rootMargin: '200px' }
		);

		if (loadTrigger) {
			observer.observe(loadTrigger);
		}

		return () => {
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<meta name="keywords" content="Konzertfotografie, Live-Fotografie, Metal, Rock, CVJM, Lux in Tenebris, Blast of Eternity, Konzertfotos" />
	<meta name="author" content="Markus Herhoffer" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={siteUrl} />
	<meta property="og:title" content={siteTitle} />
	<meta property="og:description" content={siteDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:locale" content="de_DE" />
	<meta property="og:site_name" content="Lux in Tenebris" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={siteUrl} />
	<meta name="twitter:title" content={siteTitle} />
	<meta name="twitter:description" content={siteDescription} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Additional Meta Tags -->
	<meta name="robots" content="index, follow" />
	<meta name="language" content="German" />
	<meta name="revisit-after" content="7 days" />
	<link rel="canonical" href={siteUrl} />

	<!-- Structured Data (JSON-LD) -->
	{@html `
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "CVJM Jugendkultur & Musik e.V.",
		"description": "${siteDescription}",
		"url": "${siteUrl}",
		"logo": "${siteUrl}/logo.png",
		"contactPoint": {
			"@type": "ContactPoint",
			"email": "info@blastofeternity.de",
			"contactType": "customer service"
		},
		"sameAs": []
	}
	<\/script>
	`}

	{@html `
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "ImageGallery",
		"name": "Lux in Tenebris - Konzertfotografie",
		"description": "${siteDescription}",
		"url": "${siteUrl}",
		"author": {
			"@type": "Person",
			"name": "Markus Herhoffer"
		}
	}
	<\/script>
	`}
</svelte:head>

<Gallery {images} />

{#if hasMore}
	<div bind:this={loadTrigger} class="h-20 w-full"></div>
{/if}
