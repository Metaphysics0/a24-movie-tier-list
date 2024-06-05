import { OMDB_API_KEY } from '$env/static/private';
import { ONE_DAY_IN_SECONDS } from '$lib/constants/date.constants';
import { getStoredImdbMovieIdFromTmdbMovieId } from '$lib/constants/missing-movie-data';
import type { OmdbSearchResponse } from '$lib/types/omdb.types';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { redis } from '../cache/redis';

// mainly used for IMDB ratings.
// their free tier has a limit of 1000 free requests per day,
// so we cache the results
export class OmdbApi {
	async searchByTmbdMovieResponses(tmdbMovies: TmdbSearchResult[]) {
		try {
			const cachedResults = await this.getSearchByTmdbMovieResponsesResultFromCache(
				tmdbMovies.map((a) => a.id)
			);
			if (cachedResults) {
				console.log('Cache HIT for movie responses');
				return cachedResults;
			}

			const omdbDataResponses = await Promise.all(
				tmdbMovies.map((movieResp) => this.getOmdbDataFromTmdbMovie(movieResp))
			);
			await this.setSearchByTmdbMovieResponsesResultInCache(omdbDataResponses);

			return omdbDataResponses;
		} catch (error) {
			console.error('searchByTmbdMovieResponses failed', error);
		}
	}

	async searchById(id: string): Promise<OmdbSearchResponse | undefined> {
		try {
			const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`);
			return response.json();
		} catch (error) {
			console.error(`OMDB search failed for imdb id: ${id}`, error);
		}
	}

	async getOmdbDataFromTmdbMovie(
		tmdbMovie: TmdbSearchResult
	): Promise<GetOmdbDataFromTmdbMovieResponse> {
		const imdbId =
			tmdbMovie.external_movie_ids?.imdb_id || getStoredImdbMovieIdFromTmdbMovieId(tmdbMovie.id);
		if (!imdbId) {
			console.warn(
				`OmdbApi - tmdb movie: ${tmdbMovie.title} #(${tmdbMovie.id}) does not have an imdb id`
			);
			return {
				tmdbId: tmdbMovie.id,
				tmdbData: tmdbMovie,
				omdbData: undefined
			};
		}
		const omdbData = await this.searchById(imdbId);
		return {
			tmdbId: tmdbMovie.id,
			tmdbData: tmdbMovie,
			omdbData
		};
	}

	async getSearchByTmdbMovieResponsesResultFromCache(
		tmdbMovieIds: number[]
	): Promise<GetOmdbDataFromTmdbMovieResponse[] | undefined | null> {
		try {
			// const keys = await redis.find
			return redis.get<GetOmdbDataFromTmdbMovieResponse[]>(
				this.getCacheKeyForTmdbMovies(tmdbMovieIds)
			);
		} catch (error) {
			console.error('Error retrieving omdb search result from cache: ', error);
		}
	}

	async setSearchByTmdbMovieResponsesResultInCache(
		responses: GetOmdbDataFromTmdbMovieResponse[]
	): Promise<void> {
		try {
			console.log(`caching omdb search result for tmdb movies`);
			await redis.set<GetOmdbDataFromTmdbMovieResponse[]>(
				this.getCacheKeyForTmdbMovies(responses.map((a) => a.tmdbId)),
				responses,
				{
					ex: ONE_DAY_IN_SECONDS * 2
				}
			);
		} catch (error) {
			console.error(`Error caching omdb search result for tmdb movies`, error);
		}
	}

	private getCacheKeyForTmdbMovies(tmdbMovieIds: number[]): string {
		// Sort the movie IDs for consistent key generation
		const sortedIds = tmdbMovieIds.slice().sort();
		return `omdb_search_results:${sortedIds.join(',')}`;
	}
}

interface GetOmdbDataFromTmdbMovieResponse {
	tmdbId: number;
	omdbData: OmdbSearchResponse | undefined;
	tmdbData: TmdbSearchResult;
}
