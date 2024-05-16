import { OMDB_API_KEY } from '$env/static/private';
import type { OmdbSearchResponse } from '$lib/types/omdb.types';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';

// mainly used for IMDB ratings.
// their free tier has a limit of 1000 free requests per day
export class OmdbApi {
	async searchById(id: string): Promise<OmdbSearchResponse | undefined> {
		const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`);
		return response.json();
	}

	async getOmdbDataFromTmdbMovie(tmdbMovie: TmdbSearchResult): Promise<{
		tmdbId: number;
		omdbData: OmdbSearchResponse | undefined;
	}> {
		const imdbId = tmdbMovie.external_movie_ids?.imdb_id;
		if (!imdbId) {
			console.warn(`OmdbApi - tmdb movie: ${tmdbMovie.title} does not have an imdb id`);
			return {
				tmdbId: tmdbMovie.id,
				omdbData: undefined
			};
		}
		const omdbData = await this.searchById(imdbId);
		return {
			tmdbId: tmdbMovie.id,
			omdbData
		};
	}
}
