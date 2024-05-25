<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { setWatchlistItem, watchlistStore } from '$lib/stores/watchlist/store';

	export let movie: TmdbSearchResult;

	function likeMovie(e: Event): void {
		console.log('liked!');
	}

	function addMovieToWatchlist(e: Event): void {
		setWatchlistItem(movie);
	}

	watchlistStore.subscribe((movies) => {
		console.log('movies', movies);
	});

	const actions = [
		{
			iconClass: 'mdi:heart-outline',
			hoverIconClass: 'mdi:heart',
			isHoverActive: false,
			onClick: likeMovie
		},
		{
			iconClass: 'material-symbols:bookmark-outline',
			hoverIconClass: 'material-symbols:bookmark',
			isHoverActive: false,
			onClick: addMovieToWatchlist
		}
	];

	const toggleHover = ({ idx, isHoverActive }: { idx: number; isHoverActive: boolean }) => {
		actions[idx] = {
			...actions[idx],
			isHoverActive
		};
	};
</script>

<div
	class="absolute right-0 top-0 flex flex-col rounded-bl-md rounded-tr-md bg-white bg-opacity-90 p-1"
>
	{#each actions as action, idx}
		<button
			on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();
				action.onClick(e);
			}}
			tabindex="0"
			on:mouseover={() => toggleHover({ idx, isHoverActive: true })}
			on:focus={() => toggleHover({ idx, isHoverActive: true })}
			on:mouseleave={() => toggleHover({ idx, isHoverActive: false })}
		>
			<Icon
				class="text-3xl"
				icon={action.isHoverActive ? action.hoverIconClass : action.iconClass}
			/>
		</button>
	{/each}
</div>
