import { env } from '$env/dynamic/private';
import type {
	ExternalMovieIdsResponse,
	TmdbGenreMappingItem,
	TmdbSearchResult
} from '$lib/types/tmbd.types';
import { logger } from '$lib/utils/logger.util';
import { doStringsMatchIgnoreCase } from '$lib/utils/string.util';
import { TmdbApiEndpointPaths } from './api-endpoints.enum';
import { TMDB_GENRES } from './constants';
import { getScore, isTooManyRequestsErrorResponse } from './utils';

export class TmdbApi {
	async searchMovies(movieTitles: string[]): Promise<TmdbSearchResult[]> {
		try {
			const movieResponses = await Promise.all(
				movieTitles.map((movieTitle) => this.search(movieTitle!))
			);

			const movies = movieResponses.filter(Boolean) as TmdbSearchResult[];
			this.addGenresToMovies(movies);

			return movies;
		} catch (error) {
			console.error('error searching movies', error);
			return [];
		}
	}

	private async search(movieTitle: string): Promise<TmdbSearchResult | undefined> {
		try {
			const movieResponse = await this.searchMovie(movieTitle);
			const externalMovieIds = await this.getExternalMovieIds(movieResponse!.id);

			return {
				...movieResponse!,
				external_movie_ids: externalMovieIds,
				imdb_link: externalMovieIds?.imdb_id ? this.getImdbLinkfromId(externalMovieIds.imdb_id) : ''
			};
		} catch (error) {
			console.error(`Error getting search results for: ${movieTitle}`, error);
			return;
		}
	}

	private addGenresToMovies(movies: TmdbSearchResult[]): void {
		movies.forEach((movie) => {
			movie.genres = movie.genre_ids.map(
				(genreId) =>
					TMDB_GENRES.find((tmdbGenres) => tmdbGenres.id === genreId)?.name?.toLocaleLowerCase()!
			);
		});
	}

	private async searchMovie(movieTitle: string): Promise<TmdbSearchResult | undefined> {
		const { title, year } = this.getDeconstructedMovieTitle(movieTitle);

		let url = `${TmdbApiEndpointPaths.SEARCH_MOVIE}?query=${encodeURIComponent(
			title
		)}&include_adult=false&language=en-US&page=1`;

		if (year) url += `&year=${year}`;

		const response = await fetch(url, { headers: this.requestHeaders });
		const data = await response.json();
		const results = data?.results as TmdbSearchResult[];
		const searchResult = this.getMostRelevantSearchResult(results, title, year);

		if (!searchResult) {
			console.warn(`unable to find searchResult for ${movieTitle}`);
			return;
		}

		this.addImageUrlPrefixesToSearchResult(searchResult);
		this.addScoreToSearchResult(searchResult);
		this.addIsUpcomingToSearchResult(searchResult);
		return searchResult;
	}

	//  not used
	private async getGenres(): Promise<TmdbGenreMappingItem[]> {
		try {
			const response = await fetch(TmdbApiEndpointPaths.GET_GENRES, {
				headers: this.requestHeaders
			});
			const data = await response.json();
			return data.genres;
		} catch (error) {
			console.error('error getting genre mappings', error);
			return [];
		}
	}

	// like imdb id
	private async getExternalMovieIds(
		movieId: string | number
	): Promise<ExternalMovieIdsResponse | null> {
		try {
			const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/external_ids`, {
				headers: this.requestHeaders
			});
			const data = await response.json();
			if (isTooManyRequestsErrorResponse(data)) throw new Error(data);
			return data;
		} catch (error) {
			logger.warn(
				`TmdbApi - getExternalMovieIds - Error getting external movie ids from movie: #${movieId}`,
				error
			);
			return null;
		}
	}

	private getImdbLinkfromId(id: string): string {
		return `https://www.imdb.com/title/${id}`;
	}

	private getMostRelevantSearchResult(
		results: TmdbSearchResult[],
		movieTitle: string,
		releaseYear?: string
	): TmdbSearchResult | undefined {
		if (!results?.length) return;
		if (results.length === 1) return results[0];

		const relevantResults = results.filter((movie) => {
			const withMatchingTitle = doStringsMatchIgnoreCase(movie.original_title, movieTitle);

			const withRelevantReleaseYear = releaseYear
				? new Date(movie.release_date).getFullYear() === Number(releaseYear)
				: new Date(movie.release_date).getFullYear() >= this.a24OldestMovieYear;
			return withRelevantReleaseYear && withMatchingTitle;
		});

		if (relevantResults.length === 0) return results[0];

		const sortedMovies = relevantResults.sort((movieA, movieB) => {
			// Check if release years match
			const releaseYearA = new Date(movieA.release_date).getFullYear();
			const releaseYearB = new Date(movieB.release_date).getFullYear();

			// Sort by year (newer first)
			if (releaseYearA !== releaseYearB) return releaseYearB - releaseYearA;

			// If release dates are equal, sort by popularity (highest first)
			if (movieA.popularity > movieB.popularity) return -1;
			else if (movieA.popularity < movieB.popularity) return 1;

			// If release dates and popularity are equal, sort by presence of poster path (with poster first)
			return movieA.poster_path ? -1 : 1;
		});
		return sortedMovies[0];
	}

	private addImageUrlPrefixesToSearchResult(searchResult: TmdbSearchResult) {
		if (searchResult.backdrop_path) {
			searchResult.backdrop_path = this.tmdbImageUrlPrefix + searchResult.backdrop_path;
		}

		if (searchResult.poster_path) {
			searchResult.poster_path = this.tmdbImageUrlPrefix + searchResult.poster_path;
		}
		return searchResult;
	}

	private addScoreToSearchResult(searchResult: TmdbSearchResult) {
		searchResult.score = getScore(searchResult);
	}

	private addIsUpcomingToSearchResult(searchResult: TmdbSearchResult) {
		const isUpcoming = new Date(searchResult.release_date) > new Date();
		searchResult.isUpcoming = isUpcoming;
	}

	// for when we have a title that looks like 'Woostock 2023'
	private getDeconstructedMovieTitle(movieTitle: string): {
		title: string;
		year?: string;
	} {
		const titleParts = movieTitle.split(' ');
		if (titleParts.length === 1) return { title: movieTitle };

		const year = titleParts.at(-1);
		const isValidYear = !isNaN(Number(year));
		if (isValidYear) {
			return {
				title: titleParts.slice(0, -1).join(' '),
				year
			};
		}

		return { title: movieTitle };
	}

	private get requestHeaders() {
		return {
			accept: 'application/json',
			Authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`
		};
	}

	private readonly tmdbImageUrlPrefix = 'https://image.tmdb.org/t/p/original';
	private readonly a24OldestMovieYear = 2013;
}
