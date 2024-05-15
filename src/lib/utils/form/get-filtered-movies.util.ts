import { SortFilterOptions } from '$lib/constants/sort-filter-options';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';

export function getFilteredMovies(
	listFilterValue: string,
	movies: TmdbSearchResult[]
): TmdbSearchResult[] {
	if (!Object.values<string>(SortFilterOptions).includes(listFilterValue)) {
		console.warn(`handleFilterChange - invalidValue ${listFilterValue}`);
		return movies;
	}

	switch (listFilterValue) {
		case SortFilterOptions.TOP_RATED:
			return movies.sort((a, b) => b.score - a.score);

		case SortFilterOptions.DATE_RELEASED_NEW_TO_OLD:
			return movies.sort(
				(a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
			);

		case SortFilterOptions.DATE_RELEASED_OLD_TO_NEW:
			return movies.sort(
				(a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
			);

		default:
			return movies;
	}
}
