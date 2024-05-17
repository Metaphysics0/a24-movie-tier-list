<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { normalizeMovieTitleForUrl } from '$lib/utils/string.util';

	export let parent: SvelteComponent;

	console.log('parent', parent);

	const modalStore = getModalStore();

	// @ts-ignore
	const movie = $modalStore[0].component.props.movie as TmdbSearchResult;

	function getWatchNowUrl() {
		const normalizedTitle = normalizeMovieTitleForUrl(movie.title);
		return `https://sudo-flix.lol/media/tmdb-movie-${movie.external_movie_ids?.imdb_id}-${normalizedTitle}`;
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
		<article>
			<p class="text-xl font-semibold">Overview:</p>
			{$modalStore[0].body ?? '(body missing)'}
		</article>
		{#if $modalStore[0].image}
			<img
				src={$modalStore[0].image}
				class="modal-image h-auto w-full"
				alt={$modalStore[0].title + ' image'}
			/>
		{/if}
		<div class="flex flex-col">
			<a
				class="btn mb-2 h-min w-max bg-[#f4c519] font-bold"
				on:click={() => console.log('i was clicked')}
				target="_blank"
				href={movie.imdb_link}
			>
				<span><Icon icon="ic:baseline-local-movies" /></span>
				<span>Imdb page</span>
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
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
		</footer>
	</div>
{/if}
