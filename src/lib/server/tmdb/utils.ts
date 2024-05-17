import type { TmdbSearchResult } from '$lib/types/tmbd.types';

export function getScore(movie: TmdbSearchResult): number {
	try {
		const weightedVoteCount = movie.vote_count * 10;
		const score = movie.popularity + movie.vote_average + weightedVoteCount;
		return Number(score);
	} catch (error) {
		console.warn(`error getting score for ${movie.title}`, error);
		return 0;
	}
}
