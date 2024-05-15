import { FilterOptions } from '$lib/constants/filter-options';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';

export function getFilteredMovies(
	filterValue: string,
	movies: TmdbSearchResult[]
): TmdbSearchResult[] {
	if (!Object.values<string>(FilterOptions).includes(filterValue)) {
		console.warn(`handleFilterChange - invalidValue ${filterValue}`);
		return movies;
	}

	switch (filterValue) {
		case FilterOptions.ALL_GENRES:
			return movies;

		case FilterOptions.HORROR:
			return movies.filter((movie) => movie.genres.includes('horror'));

		case FilterOptions.DRAMA:
			return movies.filter((movie) => movie.genres.includes('drama'));

		default:
			return movies;
	}
}
