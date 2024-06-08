import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { getYear } from '../date.utils';

export function getMovieTitle(movie: TmdbSearchResult): string {
	return `${movie.title} (${getYear(new Date(movie.release_date))})`;
}
