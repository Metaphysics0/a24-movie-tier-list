import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { LocalStorageHelper, LocalStorageStores } from './localStorageHelper';

export function removeMovie({
	currentMovies,
	movieToRemove,
	localStorageStore
}: {
	currentMovies: TmdbSearchResult[];
	movieToRemove: TmdbSearchResult;
	localStorageStore: LocalStorageStores;
}): TmdbSearchResult[] {
	if (!currentMovies.find((item) => item.id === movieToRemove.id)) {
		console.warn(`Movie: ${movieToRemove.title} is already removed!`);
		return currentMovies;
	}
	const updatedMovieList = currentMovies.filter((item) => item.id !== movieToRemove.id);
	setMoviesInLocalStorage(localStorageStore, updatedMovieList);

	return updatedMovieList;
}

export function addMovie({
	currentMovies,
	movieToAdd,
	localStorageStore
}: {
	currentMovies: TmdbSearchResult[];
	movieToAdd: TmdbSearchResult;
	localStorageStore: LocalStorageStores;
}): TmdbSearchResult[] {
	if (currentMovies.find((item) => item.id === movieToAdd.id)) {
		console.warn(`Movie: ${movieToAdd.title} is already added!`);
		return currentMovies;
	}

	const updatedMovieList = [...currentMovies, movieToAdd];
	setMoviesInLocalStorage(localStorageStore, updatedMovieList);

	return updatedMovieList;
}

function setMoviesInLocalStorage(store: LocalStorageStores, items: TmdbSearchResult[]): void {
	if (store === LocalStorageStores.Watchlist) {
		LocalStorageHelper.setWatchlist(items);
	}
	if (store === LocalStorageStores.LikedMovies) {
		LocalStorageHelper.setLikedMovies(items);
	}

	console.warn(store, 'is not a valid localstorage store');
}

export function isMovieInList(
	movieList: TmdbSearchResult[],
	movieToCheck: TmdbSearchResult
): boolean {
	return !!movieList.find((movie) => movie.id === movieToCheck.id);
}
