import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { WATCHLIST_LOCALSTORAGE_KEY } from './constants';

export class LocalStorageHelper {
	static getWatchlist(): TmdbSearchResult[] {
		try {
			const items = localStorage.getItem(WATCHLIST_LOCALSTORAGE_KEY);
			if (!items) return [];
			return JSON.parse(items);
		} catch (error) {
			console.warn('error getting watchlist from localstorage', error);
			return [];
		}
	}

	static setWatchlist(items: TmdbSearchResult[]): void {
		try {
			localStorage.setItem(WATCHLIST_LOCALSTORAGE_KEY, JSON.stringify(items));
		} catch (error) {
			console.warn(`error adding watchlist item to localStorage:`, error);
		}
	}
}
