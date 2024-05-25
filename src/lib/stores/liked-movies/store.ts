import { type TmdbSearchResult } from '$lib/types/tmbd.types';

import { writable } from 'svelte/store';
import { LocalStorageHelper, LocalStorageStores } from '../helpers/localStorageHelper';
import * as ListHelper from '../helpers/listHelper';

export const likedMoviesStore = writable<TmdbSearchResult[]>(LocalStorageHelper.getLikedMovies());

export function addLikedMovie(movieToAdd: TmdbSearchResult): void {
	try {
		likedMoviesStore.update((currentMovies) => {
			return ListHelper.addMovie({
				movieToAdd,
				currentMovies,
				localStorageStore: LocalStorageStores.LikedMovies
			});
		});
	} catch (error) {
		console.error('Error setting liked movie ', error);
	}
}

export function removeLikedMovie(movieToRemove: TmdbSearchResult): void {
	try {
		likedMoviesStore.update((currentMovies) => {
			return ListHelper.removeMovie({
				movieToRemove,
				currentMovies,
				localStorageStore: LocalStorageStores.LikedMovies
			});
		});
	} catch (error) {
		console.error('Error setting liked movie', error);
	}
}
