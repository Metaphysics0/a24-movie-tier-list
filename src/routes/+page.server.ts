import { A24FilmPageParser } from '$lib/server/a24-film-page-parser';
import { TmdbApi } from '$lib/server/tmdb-api';
import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const movieTitles = await new A24FilmPageParser().getMovieTitles();
	const movieResponses = (
		await Promise.all(movieTitles.map((movieTitle) => new TmdbApi().searchMovie(movieTitle!)))
	).filter(Boolean) as TmdbSearchResult[];

	return {
		movieTitles,
		movieResponses
	};
};
