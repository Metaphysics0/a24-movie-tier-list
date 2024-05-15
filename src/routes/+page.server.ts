import { A24FilmPageParser } from '$lib/server/a24-film-page-parser';
import { TmdbApi } from '$lib/server/tmdb-api';
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

	const genreMapping = await tmdbApi.getGenreMappings();
	const movieResponses = await Promise.all(
		movieTitles.map((movieTitle) => tmdbApi.search(movieTitle!))
	);
	const filteredMovies = movieResponses.filter(Boolean) as TmdbSearchResult[];

	filteredMovies.forEach((movie) => {
		movie.genres = movie.genre_ids.map(
			(genreId) =>
				genreMapping.find((mapping) => mapping.id === genreId)?.name?.toLocaleLowerCase()!
		);
	});

	return {
		movies: filteredMovies.filter((movie) => !movie.isUpcoming),
		upcomingMovies: filteredMovies.filter((movie) => movie.isUpcoming)
	};
}
