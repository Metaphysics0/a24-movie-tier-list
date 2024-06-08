import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import MovieInfoModal from '$lib/ui/modals/MovieInfoModal.svelte';
import type { ModalSettings } from '@skeletonlabs/skeleton';
import { getMovieTitle } from '../tmdb/get-movie-title.util';

export function getMovieInfoModalSettings(movie: TmdbSearchResult): ModalSettings {
	return {
		type: 'component',
		title: getMovieTitle(movie),
		body: movie.overview,
		image: movie.backdrop_path,
		component: { ref: MovieInfoModal, props: { movie } }
	};
}
