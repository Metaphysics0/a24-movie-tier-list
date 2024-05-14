import { env } from '$env/dynamic/private';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import { getScore } from './score-calculator';

export class TmdbApi {
	async searchMovie(movieTitle: string): Promise<TmdbSearchResult | undefined> {
		const { title, year } = this.getDeconstructedMovieTitle(movieTitle);

		let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
			title
		)}&include_adult=false&language=en-US&page=1`;

		if (year) {
			url += `&year=${year}`;
		}

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`
			}
		};

		const response = await fetch(url, options);
		const data = await response.json();
		const results = data.results as TmdbSearchResult[];
		const searchResult = this.getMostRelevantSearchResult(results);

		if (!searchResult) {
			console.warn(`unable to find searchResult for ${movieTitle}`);
			return;
		}

		this.addImageUrlPrefixesToSearchResult(searchResult);
		this.addScoreToSearchResult(searchResult);
		this.addIsUpcomingToSearchResult(searchResult);
		return searchResult;
	}

	private getMostRelevantSearchResult(results: TmdbSearchResult[]): TmdbSearchResult | undefined {
		if (!results.length) return;

		if (results.length > 1) {
			const relevantResults = results.filter((movie) => {
				const releaseYear = new Date(movie.release_date).getFullYear();
				return releaseYear >= this.a24OldestMovieYear;
			});

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

		return results[0];
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

	private readonly tmdbImageUrlPrefix = 'https://image.tmdb.org/t/p/original';
	private readonly a24OldestMovieYear = 2013;
}
