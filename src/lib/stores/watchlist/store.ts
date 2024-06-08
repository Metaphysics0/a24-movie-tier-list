import { type TmdbSearchResult } from '$lib/types/tmbd.types';

import { writable } from 'svelte/store';
import { LocalStorageHelper, LocalStorageStores } from '../helpers/localStorageHelper';
import * as ListHelper from '../helpers/listHelper';

export const watchlistStore = writable<TmdbSearchResult[]>(LocalStorageHelper.getWatchlist());

export function addWatchlistItem(movieToAdd: TmdbSearchResult): void {
	try {
		watchlistStore.update((currentMovies) => {
			return ListHelper.addMovie({
				movieToAdd,
				currentMovies,
				localStorageStore: LocalStorageStores.Watchlist
			});
		});
	} catch (error) {
		console.error('Error setting watchlist item', error);
	}
}

export function removeWatchlistItem(movieToRemove: TmdbSearchResult): void {
	try {
		watchlistStore.update((currentMovies) => {
			return ListHelper.removeMovie({
				movieToRemove,
				currentMovies,
				localStorageStore: LocalStorageStores.Watchlist
			});
		});
	} catch (error) {
		console.error('Error setting watchlist item', error);
	}
}
