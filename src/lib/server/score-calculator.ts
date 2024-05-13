import type { TmdbSearchResult } from '$lib/types/tmbd.types';

export function getScore(movie: TmdbSearchResult) {
	const weightedVoteCount = movie.vote_count * 10;
	const score = movie.popularity + movie.vote_average + weightedVoteCount;
	return score;
}
