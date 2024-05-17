import { OMDB_API_KEY } from '$env/static/private';
import { ONE_DAY_IN_SECONDS } from '$lib/constants/date.constants';
import type { OmdbSearchResponse } from '$lib/types/omdb.types';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { kv } from '@vercel/kv';

// mainly used for IMDB ratings.
// their free tier has a limit of 1000 free requests per day,
// so we cache the results
export class OmdbApi {
	async searchById(id: string): Promise<OmdbSearchResponse | undefined> {
		try {
			const cachedSearchResult = await this.getSearchByIdResultFromCache(id);
			if (cachedSearchResult) {
				console.log(`Cache HIT for imdb movie: ${id}`);
				return cachedSearchResult;
			}

			const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`);
			const data = await response.json();
			await this.setSearchByIdResultInCache(id, data);
			return data;
		} catch (error) {
			console.error(`OMDB search failed for imdb id: ${id}`);
		}
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

	async getSearchByIdResultFromCache(id: string): Promise<OmdbSearchResponse | undefined | null> {
		try {
			return kv.get<OmdbSearchResponse>(this.getCacheKeyForMovieSearch(id));
		} catch (error) {
			console.error('Error retrieving omdb search result from cache: ', error);
		}
	}

	async setSearchByIdResultInCache(id: string, searchResult: OmdbSearchResponse): Promise<void> {
		try {
			console.log(`caching omdb search result for imdb movie id: ${id}`);
			await kv.set<OmdbSearchResponse>(this.getCacheKeyForMovieSearch(id), searchResult, {
				ex: ONE_DAY_IN_SECONDS
			});
		} catch (error) {
			console.error(`Error caching omdb search result for imdb movie: ${id}`, error);
		}
	}

	private getCacheKeyForMovieSearch(id: string): string {
		return `omdb_search_result_for_${id}`;
	}
}
