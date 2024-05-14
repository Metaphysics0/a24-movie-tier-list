<script lang="ts">
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { getYear } from '$lib/utils/date.utils';

	export let movie: TmdbSearchResult;
	export let index: number;
</script>

<div class="mx-auto mb-2 flex w-max flex-col items-center">
	<div
		class="card relative rounded-md transition-all ease-in hover:cursor-pointer hover:opacity-50"
	>
		<img
			src={movie.poster_path || movie.backdrop_path}
			alt={`${movie.title} poster`}
			class="max-w-64 rounded-md"
		/>
	</div>
	<div class="absolute bg-slate-500 bg-opacity-10 p-2 text-xl font-bold text-white">{index}</div>

	<p class="text-xl font-bold">
		{movie.title}
	</p>
	{#if movie.release_date}
		<p class="text-lg">({getYear(new Date(movie.release_date))})</p>
	{/if}
</div>
