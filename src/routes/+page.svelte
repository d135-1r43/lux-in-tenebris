<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Gallery images={data.images} />
