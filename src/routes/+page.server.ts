import { OmdbApi } from '$lib/server/omdb/api';
import { A24FilmPageParser } from '$lib/server/scraper/a24-films-page.scraper';
import { TmdbApi } from '$lib/server/tmdb/api';
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
	const tmdbMovieResponses = await new TmdbApi().searchMovies(movieTitles);
	// const omdbDataResponses = await Promise.all(
	// 	tmdbMovieResponses.map((movieResp) => new OmdbApi().getOmdbDataFromTmdbMovie(movieResp))
	// );

	// omdbDataResponses.forEach(({ omdbData, tmdbId }) => {
	// 	const tmdbMovieIndex = tmdbMovieResponses.findIndex((movie) => movie.id === tmdbId);
	// 	if (tmdbMovieIndex === -1) return;
	// 	tmdbMovieResponses.splice(tmdbMovieIndex, 1, {
	// 		...tmdbMovieResponses[tmdbMovieIndex],
	// 		omdbData
	// 	});
	// });

	return {
		movies: tmdbMovieResponses.filter((movie) => !movie.isUpcoming),
		upcomingMovies: tmdbMovieResponses.filter((movie) => movie.isUpcoming)
	};
}
