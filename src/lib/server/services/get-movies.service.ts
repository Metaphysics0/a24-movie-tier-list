import { ONE_DAY_IN_SECONDS } from '$lib/constants/date.constants';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { logger } from '$lib/utils/logger.util';
import { redis } from '../cache/redis';
import { OmdbApi } from '../omdb/api';
import { A24FilmPageParser } from '../scraper/a24-films-page.scraper';
import { TmdbApi } from '../tmdb/api';

export class GetMoviesService {
	async call(): Promise<GetMoviesResponse> {
		try {
			const cachedMovies = await this.getMoviesFromCache();
			if (cachedMovies) {
				logger.info('GetMoviesService - Cache HIT for get movies response');
				return cachedMovies;
			}
			const movies = await this.getMovies();
			await this.setMoviesInCache(movies);

			return movies;
		} catch (error) {
			logger.error('GetMoviesService - failed', JSON.stringify(error));
			return {
				movies: [],
				upcomingMovies: []
			};
		}
	}

	private async getMovies(): Promise<GetMoviesResponse> {
		const movieTitles = await new A24FilmPageParser().getMovieTitles();

		const tmdbMovieResponses = await new TmdbApi().searchMovies(movieTitles);
		const omdbResponses =
			(await new OmdbApi().searchByTmbdMovieResponses(tmdbMovieResponses)) || [];

		omdbResponses.forEach(({ omdbData, tmdbId }) => {
			const tmdbMovieIndex = tmdbMovieResponses.findIndex((movie) => movie.id === tmdbId);
			if (tmdbMovieIndex === -1) return;
			tmdbMovieResponses.splice(tmdbMovieIndex, 1, {
				...tmdbMovieResponses[tmdbMovieIndex],
				omdbData
			});
		});

		return {
			movies: tmdbMovieResponses.filter((movie) => !movie.isUpcoming),
			upcomingMovies: tmdbMovieResponses.filter((movie) => movie.isUpcoming)
		};
	}

	private getMoviesFromCache(): Promise<GetMoviesResponse | null> {
		return redis.get<GetMoviesResponse>(this.cacheKey);
	}

	private async setMoviesInCache(getMoviesResponse: GetMoviesResponse): Promise<void> {
		if (!getMoviesResponse) return;

		logger.info('GetMoviesService - setting response in cache');
		await redis.set(this.cacheKey, getMoviesResponse, {
			ex: ONE_DAY_IN_SECONDS
		});
	}

	private get cacheKey() {
		return 'get_movies_response';
	}
}

interface GetMoviesResponse {
	movies: TmdbSearchResult[];
	upcomingMovies: TmdbSearchResult[];
}
