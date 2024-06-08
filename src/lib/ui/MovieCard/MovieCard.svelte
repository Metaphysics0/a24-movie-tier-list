<script lang="ts">
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { getYear } from '$lib/utils/date.utils';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import RatingRow from './RatingRow.svelte';
	import { getMovieInfoModalSettings } from '$lib/utils/modals/movie-info-modal.util';
	import ActionIcons from './ActionButtons.svelte';

	export let movie: TmdbSearchResult;

	const modalStore = getModalStore();
</script>

<div class="mx-auto mb-2 flex w-max max-w-64 flex-col items-center">
	<button
		class="card relative rounded-md shadow-sm transition-all ease-in hover:cursor-pointer hover:opacity-90 hover:shadow-md active:shadow-sm"
		on:click={(e) => {
			e.preventDefault();
			modalStore.trigger(getMovieInfoModalSettings(movie));
		}}
	>
		<div class="max-w-64 rounded-md">
			<img
				src={movie.poster_path || movie?.omdbData?.Poster || movie.backdrop_path}
				alt={`${movie.title} poster`}
				class="max-w-64 rounded-md"
				loading="lazy"
			/>
		</div>
		<ActionIcons {movie} />
	</button>

	{#if movie.omdbData?.imdbRating}
		<RatingRow {movie} />
	{/if}
	<p class="flex items-center text-center text-xl font-bold">
		<span class="mr-2">
			{movie.title}
		</span>
		{#if movie.release_date}
			<span class="text-lg font-normal">({getYear(new Date(movie.release_date))})</span>
		{/if}
	</p>
</div>
