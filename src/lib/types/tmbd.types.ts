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
	imdbLink?: string;
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
