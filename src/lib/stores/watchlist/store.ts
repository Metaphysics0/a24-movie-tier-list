import { type TmdbSearchResult } from '$lib/types/tmbd.types';

import { writable } from 'svelte/store';
import { WATCHLIST_LOCALSTORAGE_KEY } from './constants';

export const watchlistStore = writable<TmdbSearchResult[]>(getWatchlistFromLocalStorage());

export function setWatchlistItem(watchlistItem: TmdbSearchResult): void {
	try {
		watchlistStore.update((currentWatchlistItems) => {
			if (currentWatchlistItems.find((item) => item.id === watchlistItem.id)) {
				console.warn(`Movie: ${watchlistItem.title} is already in watchlist!`);
				return currentWatchlistItems;
			}
			return [...currentWatchlistItems, watchlistItem];
		});
	} catch (error) {
		console.error('Error setting watchlist item', error);
	}
}

export function removeWatchlistItem(watchlistItem: TmdbSearchResult): void {
	try {
		watchlistStore.update((currentWatchlistItems) => {
			if (currentWatchlistItems.find((item) => item.id === watchlistItem.id)) {
				console.warn(`Movie: ${watchlistItem.title} is already in watchlist!`);
				return currentWatchlistItems;
			}
			return [...currentWatchlistItems, watchlistItem];
		});
	} catch (error) {
		console.error('Error setting watchlist item', error);
	}
}

function getWatchlistFromLocalStorage(): TmdbSearchResult[] {
	try {
		const items = localStorage.getItem(WATCHLIST_LOCALSTORAGE_KEY);
		if (!items) return [];

		return JSON.parse(items);
	} catch (error) {
		console.warn('error getting watchlist from localstorage', error);
		return [];
	}
}
