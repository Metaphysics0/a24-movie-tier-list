import { FilterOptions } from '$lib/constants/filter-options';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { hasAllIntersectingElements } from '../array.util';

export function getFilteredMovies(
	filterOptions: string[],
	movies: TmdbSearchResult[]
): TmdbSearchResult[] {
	if (filterOptions.length === 0) return movies;

	const isValidFilter = hasAllIntersectingElements(
		Object.values<string>(FilterOptions),
		filterOptions
	);
	if (!isValidFilter) {
		console.warn(`handleFilterChange - has invalid filters ${JSON.stringify(filterOptions)}`);
		return movies;
	}

	// debugger;
	return movies.filter((movie) => movie.genres.some((genre) => filterOptions.includes(genre)));
}
