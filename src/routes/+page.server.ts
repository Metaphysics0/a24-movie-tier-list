import { A24FilmPageParser } from '$lib/server/a24-film-page-parser';
import { TmdbApi } from '$lib/server/tmdb/api';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { movies, upcomingMovies } = await getMovies();

	return {
		movies,
		upcomingMovies
	};
};

async function getMovies() {
	const movieTitles = await new A24FilmPageParser().getMovieTitles();
	const tmdbApi = new TmdbApi();
	const movieResponses = await tmdbApi.searchMovies(movieTitles);

	return {
		movies: movieResponses.filter((movie) => !movie.isUpcoming),
		upcomingMovies: movieResponses.filter((movie) => movie.isUpcoming)
	};
}
