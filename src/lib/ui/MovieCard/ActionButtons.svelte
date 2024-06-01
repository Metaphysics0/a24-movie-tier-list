<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import {
		removeWatchlistItem,
		addWatchlistItem,
		watchlistStore
	} from '$lib/stores/watchlist/store';
	import type { ActionButton } from '$lib/types/action-buttons.types';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { isMovieInList } from '$lib/stores/helpers/listHelper';
	import {
		addLikedMovie,
		likedMoviesStore,
		removeLikedMovie
	} from '$lib/stores/liked-movies/store';
	import { LocalStorageStores } from '$lib/stores/helpers/localStorageHelper';
	import { css } from '$lib/utils/css.utils';

	const toastStore = getToastStore();

	export let movie: TmdbSearchResult;

	function toggleListItem(actionIndex: number, source: LocalStorageStores) {
		const localStoreMap = {
			[LocalStorageStores.Watchlist]: {
				addMovie: addWatchlistItem,
				removeMovie: removeWatchlistItem,
				store: $watchlistStore,
				label: 'watchlist'
			},
			[LocalStorageStores.LikedMovies]: {
				addMovie: addLikedMovie,
				removeMovie: removeLikedMovie,
				store: $likedMoviesStore,
				label: 'favorites'
			}
		};
		if (isMovieInList(localStoreMap[source].store, movie)) {
			actions[actionIndex].isActive = false;
			localStoreMap[source].removeMovie(movie);
			toastStore.trigger({ message: `Removed from ${localStoreMap[source].label} 😢` });
			return;
		}

		actions[actionIndex].isActive = true;
		localStoreMap[source].addMovie(movie);
		toastStore.trigger({ message: `Added to ${localStoreMap[source].label} 🙌🏼` });
	}

	const actions: ActionButton[] = [
		{
			iconClass: 'mdi:heart-outline',
			activeIconClass: 'mdi:heart',
			activeIconColorClass: 'text-red-500',
			hoverIconColorClass: 'text-red-400',
			isHovering: false,
			isActive: isMovieInList($likedMoviesStore, movie),
			tooltipText: 'Add to favorites',
			onClick(idx: number) {
				toggleListItem(idx, LocalStorageStores.LikedMovies);
			}
		},
		{
			iconClass: 'material-symbols:bookmark-outline',
			activeIconClass: 'material-symbols:bookmark',
			activeIconColorClass: 'text-amber-400',
			hoverIconColorClass: 'text-amber-300',
			isHovering: false,
			isActive: isMovieInList($watchlistStore, movie),
			tooltipText: 'Add to watchlist',
			onClick(idx: number) {
				toggleListItem(idx, LocalStorageStores.Watchlist);
			}
		}
	];

	const toggleHover = ({ idx, isHovering }: { idx: number; isHovering: boolean }) => {
		actions[idx] = {
			...actions[idx],
			isHovering
		};
	};
</script>

<div
	class="absolute right-0 top-0 z-50 flex flex-col rounded-bl-md rounded-tr-md bg-white bg-opacity-90 p-1"
>
	{#each actions as action, idx}
		<button
			on:click={(e) => {
				e.preventDefault();
				e.stopPropagation();
				action.onClick(idx);
			}}
			tabindex="0"
			on:mouseover={() => toggleHover({ idx, isHovering: true })}
			on:focus={() => toggleHover({ idx, isHovering: true })}
			on:mouseleave={() => toggleHover({ idx, isHovering: false })}
		>
			<Icon
				class="text-3xl {css(
					[
						action.isHovering && action.hoverIconColorClass,
						action.isActive && action.activeIconColorClass
					]
						.filter(Boolean)
						.join(' ')
				)}"
				icon={action.isActive ? action.activeIconClass : action.iconClass}
			/>
		</button>
	{/each}
</div>
