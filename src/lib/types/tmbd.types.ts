import type { OmdbSearchResponse } from './omdb.types';

export interface TmdbSearchResult {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	genres: string[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	score: number;
	isUpcoming: boolean;
	imdb_link?: string;
	external_movie_ids?: ExternalMovieIdsResponse | null;
	omdbData?: OmdbSearchResponse;
}

export interface TmdbGenreMappingItem {
	id: number;
	name: string;
}

export interface ExternalMovieIdsResponse {
	id: number;
	imdb_id: string | null;
	wikidata_id: string | null;
	facebook_id: string | null;
	instagram_id: string | null;
	twitter_id: string | null;
}
