<script lang="ts">
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { getYear } from '$lib/utils/date.utils';
	import { normalizeMovieTitleForUrl } from '$lib/utils/string.util';

	export let movie: TmdbSearchResult;
	export let index: number;

	function redirectToImdb() {
		window.open(
			window.location.href +
				`movie/tmdb-movie-${movie.id}-${normalizeMovieTitleForUrl(movie.title)}`
		);
	}
</script>

<div class="mx-auto mb-2 flex w-max max-w-64 flex-col items-center">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="card relative rounded-md transition-all ease-in hover:cursor-pointer hover:opacity-50"
		on:click={redirectToImdb}
	>
		<img
			src={movie.poster_path || movie.backdrop_path}
			alt={`${movie.title} poster`}
			class="max-w-64 rounded-md"
			loading="lazy"
		/>
	</div>
	<div class="absolute bg-slate-500 bg-opacity-10 p-2 text-xl font-bold text-white">{index}</div>

	<p class="text-center text-xl font-bold">
		{movie.title}
	</p>
	{#if movie.release_date}
		<p class="text-lg">({getYear(new Date(movie.release_date))})</p>
	{/if}
</div>
