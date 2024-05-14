import { A24FilmPageParser } from '$lib/server/a24-film-page-parser';
import { TmdbApi } from '$lib/server/tmdb-api';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { movies, upcomingMovies } = await getMovies();

	return {
		movies,
		upcomingMovies
	};
};

async function getMovies() {
	const movieTitles = await new A24FilmPageParser().getMovieTitles();
	const movieResponses = (
		await Promise.all(movieTitles.map((movieTitle) => new TmdbApi().searchMovie(movieTitle!)))
	).filter(Boolean);

	return {
		movies: movieResponses.filter((movie) => !movie!.isUpcoming) as TmdbSearchResult[],
		upcomingMovies: movieResponses.filter((movie) => movie!.isUpcoming) as TmdbSearchResult[]
	};
}
