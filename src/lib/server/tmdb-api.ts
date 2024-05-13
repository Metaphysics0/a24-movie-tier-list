import { env } from '$env/dynamic/private';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';

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
		const searchResult = data?.results?.[0];

		if (!searchResult) {
			console.warn('unable to find searchResult');
			return;
		}

		this.addImageUrlPrefixToSearchResult(searchResult);
		return searchResult;
	}

	private addImageUrlPrefixToSearchResult(searchResult: TmdbSearchResult) {
		if (searchResult.backdrop_path) {
			searchResult.backdrop_path = this.imagePrefix + searchResult.backdrop_path;
		}

		if (searchResult.poster_path) {
			searchResult.poster_path = this.imagePrefix + searchResult.poster_path;
		}
		return searchResult;
	}

	// for when we have a title that looks like 'Woostock 2023'
	private getDeconstructedMovieTitle(movieTitle: string): {
		title: string;
		year?: string;
	} {
		const titleParts = movieTitle.split(' ');
		if (titleParts.length === 1) return { title: movieTitle };

		const year = titleParts.at(-1);
		return {
			title: titleParts.slice(0, -1).join(' '),
			year
		};
	}

	get imagePrefix() {
		return 'https://image.tmdb.org/t/p/original';
	}
}
