<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="w-full bg-black py-8 md:py-12">
	<div class="mx-auto max-w-5xl px-6 md:px-16">
		<div class="flex flex-col items-center space-y-3 text-center md:space-y-4">
			<p class="font-['bebas-neue-pro'] text-sm font-thin tracking-[0.2em] text-white/40 md:text-base">
				© {currentYear} CVJM Jugendkultur & Musik e.V.
			</p>
			<a
				href="/impressum"
				class="font-['bebas-neue-pro'] text-sm font-thin tracking-[0.15em] text-white/60 transition-colors hover:text-white/90 md:text-base"
			>
				Impressum
			</a>
		</div>
	</div>
</footer>
