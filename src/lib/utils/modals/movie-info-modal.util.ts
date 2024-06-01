import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import MovieInfoModal from '$lib/ui/modals/MovieInfoModal.svelte';
import type { ModalSettings } from '@skeletonlabs/skeleton';
import { getYear } from '../date.utils';

export function getMovieInfoModalSettings(movie: TmdbSearchResult): ModalSettings {
	return {
		type: 'component',
		title: getMovieTitle(movie),
		body: movie.overview,
		image: movie.backdrop_path,
		component: { ref: MovieInfoModal, props: { movie } }
	};
}

function getMovieTitle(movie: TmdbSearchResult): string {
	return `${movie.title} (${getYear(new Date(movie.release_date))})`;
}
