import { GetMoviesService } from '$lib/server/services/get-movies.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { movies, upcomingMovies } = await new GetMoviesService().call();

	return {
		movies,
		upcomingMovies
	};
};
