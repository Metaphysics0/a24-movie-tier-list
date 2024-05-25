import { type TmdbSearchResult } from '$lib/types/tmbd.types';

import { writable } from 'svelte/store';
import { LocalStorageHelper } from './localStorageHelper';

export const watchlistStore = writable<TmdbSearchResult[]>(LocalStorageHelper.getWatchlist());

export function setWatchlistItem(watchlistItem: TmdbSearchResult): void {
	try {
		watchlistStore.update((currentWatchlistItems) => {
			if (isItemInWatchlist(currentWatchlistItems, watchlistItem)) {
				console.warn(`Movie: ${watchlistItem.title} is already in watchlist!`);
				return currentWatchlistItems;
			}

			const watchlist = [...currentWatchlistItems, watchlistItem];
			LocalStorageHelper.setWatchlist(watchlist);
			return watchlist;
		});
	} catch (error) {
		console.error('Error setting watchlist item', error);
	}
}

export function removeWatchlistItem(watchlistItem: TmdbSearchResult): void {
	try {
		watchlistStore.update((currentWatchlistItems) => {
			if (!isItemInWatchlist(currentWatchlistItems, watchlistItem)) {
				console.warn(`Movie: ${watchlistItem.title} is already removed!`);
				return currentWatchlistItems;
			}
			const watchlist = currentWatchlistItems.filter((item) => item.id !== watchlistItem.id);
			LocalStorageHelper.setWatchlist(watchlist);
			return watchlist;
		});
	} catch (error) {
		console.error('Error setting watchlist item', error);
	}
}

export function isItemInWatchlist(
	watchlist: TmdbSearchResult[],
	watchlistItem: TmdbSearchResult
): boolean {
	return !!watchlist.find((movie) => movie.id === watchlistItem.id);
}
