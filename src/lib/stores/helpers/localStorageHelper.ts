import type { TmdbSearchResult } from '$lib/types/tmbd.types';

export enum LocalStorageStores {
	LikedMovies = 'a24-liked-movies',
	Watchlist = 'a24-watchlist'
}

export class LocalStorageHelper {
	static getWatchlist(): TmdbSearchResult[] {
		return this.getArrayFromLocalStorage(this.WATCHLIST_LOCALSTORAGE_KEY);
	}
	static setWatchlist(items: TmdbSearchResult[]): void {
		localStorage.setItem(this.WATCHLIST_LOCALSTORAGE_KEY, JSON.stringify(items));
	}
	static getLikedMovies(): TmdbSearchResult[] {
		return this.getArrayFromLocalStorage(this.LIKED_MOVIES_LOCALSTORAGE_KEY);
	}
	static setLikedMovies(items: TmdbSearchResult[]): void {
		localStorage.setItem(this.LIKED_MOVIES_LOCALSTORAGE_KEY, JSON.stringify(items));
	}

	private static getArrayFromLocalStorage(key: string) {
		try {
			const items = localStorage.getItem(key);
			if (!items) return [];
			return JSON.parse(items);
		} catch (error) {
			console.warn(`error getting ${key} from localstorage`, error);
			return [];
		}
	}

	private static readonly WATCHLIST_LOCALSTORAGE_KEY = LocalStorageStores.Watchlist;
	private static readonly LIKED_MOVIES_LOCALSTORAGE_KEY = LocalStorageStores.LikedMovies;
}
