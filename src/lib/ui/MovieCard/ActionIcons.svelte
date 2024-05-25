<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import {
		isItemInWatchlist,
		removeWatchlistItem,
		setWatchlistItem,
		watchlistStore
	} from '$lib/stores/watchlist/store';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { ActionButton } from '$lib/types/action-buttons.types';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let movie: TmdbSearchResult;

	let currentWatchlist: TmdbSearchResult[] = [];
	watchlistStore.subscribe((movies) => {
		currentWatchlist = movies;
	});

	function likeMovie(e: Event): void {
		console.log('liked!');
	}

	function addOrRemoveItemFromWatchlist(e: Event, idx: number): void {
		if (isItemInWatchlist(currentWatchlist, movie)) {
			actions[idx].isActive = false;
			removeWatchlistItem(movie);
			toastStore.trigger({ message: 'Removed from watchlist' });
			return;
		}

		actions[idx].isActive = true;
		setWatchlistItem(movie);
		toastStore.trigger({ message: 'Added to watchlist' });
	}

	const actions: ActionButton[] = [
		{
			iconClass: 'mdi:heart-outline',
			activeIconClass: 'mdi:heart',
			activeIconColorClass: 'text-red-500',
			isHovering: false,
			isActive: false,
			tooltipText: 'Add to favorites',
			onClick: likeMovie
		},
		{
			iconClass: 'material-symbols:bookmark-outline',
			activeIconClass: 'material-symbols:bookmark',
			activeIconColorClass: 'text-amber-400',
			isHovering: false,
			isActive: isItemInWatchlist(currentWatchlist, movie),
			tooltipText: 'Add to watchlist',
			onClick: addOrRemoveItemFromWatchlist
		}
	];

	const tooltipConfig: Omit<PopupSettings, 'target'> = {
		event: 'hover',
		placement: 'right'
	};

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
				action.onClick(e, idx);
			}}
			tabindex="0"
			on:mouseover={() => toggleHover({ idx, isHovering: true })}
			on:focus={() => toggleHover({ idx, isHovering: true })}
			on:mouseleave={() => toggleHover({ idx, isHovering: action.isActive })}
			use:popup={{ ...tooltipConfig, target: `tooltip-${idx}` }}
		>
			<Icon
				class="text-3xl {action.isHovering || action.isActive ? action.activeIconColorClass : ''}"
				icon={action.isHovering || action.isActive ? action.activeIconClass : action.iconClass}
			/>
		</button>

		<div class="card variant-filled-secondary z-40 w-max p-4" data-popup="tooltip-{idx}">
			<p>{action.tooltipText}</p>
			<div class="variant-filled-secondary arrow" />
		</div>
	{/each}
</div>
