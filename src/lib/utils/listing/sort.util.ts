import { SortOptions } from '$lib/constants/sort-options';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';

export function getSortedMovies(sortValue: string, movies: TmdbSearchResult[]): TmdbSearchResult[] {
	if (!Object.values<string>(SortOptions).includes(sortValue)) {
		console.warn(`handleFilterChange - invalidValue ${sortValue}`);
		return movies;
	}

	switch (sortValue) {
		case SortOptions.TOP_RATED:
			return sortMovieOptions.byScore(movies);

		case SortOptions.DATE_RELEASED_NEW_TO_OLD:
			return movies.sort(
				(a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
			);

		case SortOptions.DATE_RELEASED_OLD_TO_NEW:
			return movies.sort(
				(a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
			);

		default:
			return movies;
	}
}

export const sortMovieOptions = {
	byScore(movies: TmdbSearchResult[]) {
		return movies.sort((a, b) => b.score - a.score);
	}
};
