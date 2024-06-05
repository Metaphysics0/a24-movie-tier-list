<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { normalizeMovieTitleForUrl } from '$lib/utils/string.util';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();

	// @ts-ignore
	const movie = $modalStore[0].component.props.movie as TmdbSearchResult;
	console.log('MOVIEE', movie);

	function getWatchNowUrl() {
		const normalizedTitle = normalizeMovieTitleForUrl(movie.title);
		return `https://sudo-flix.lol/media/tmdb-movie-${movie.external_movie_ids?.imdb_id}-${normalizedTitle}`;
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-2xl font-bold">
			{$modalStore[0].title ?? '(title missing)'}
			{#if movie.omdbData?.Rated}
				<span class="ml-1 font-movieRating"> {movie.omdbData?.Rated} </span>
			{/if}
			{#if movie.genres}
				<span class="ml-1 text-sm"> {movie.genres.join(', ')} </span>
			{/if}

			{#if movie.omdbData?.Actors}
				<p class="text-sm font-medium">{movie.omdbData.Actors}</p>
			{/if}
		</header>
		<article>
			<p class="text-xl font-semibold">Overview:</p>
			{$modalStore[0].body ?? '(body missing)'}
		</article>
		{#if $modalStore[0].image}
			<img
				src={$modalStore[0].image}
				class="modal-image h-auto w-full rounded-md"
				alt={$modalStore[0].title + ' image'}
			/>
		{/if}
		<section class="flex flex-col">
			<strong class="mb-3 text-lg font-bold">Fun Links:</strong>
			<div class="flex">
				<a
					class="btn mr-2 h-min w-max bg-[#f4c519] font-bold"
					target="_blank"
					href={movie.imdb_link}
				>
					<span><Icon icon="ic:baseline-local-movies" /></span>
					<span>Imdb Page</span>
				</a>
				<a
					class="btn h-min w-max bg-[#535397] font-bold text-white"
					target="_blank"
					href={getWatchNowUrl()}
				>
					<span><Icon icon="ic:baseline-local-movies" /></span>
					<span>Watch Now</span>
				</a>
			</div>
		</section>
		<!-- <footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
		</footer> -->
	</div>
{/if}
