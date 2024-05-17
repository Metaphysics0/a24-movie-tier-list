import type { TmdbSearchResult } from '$lib/types/tmbd.types';
import MovieInfoModal from '$lib/ui/modals/MovieInfoModal.svelte';
import type { ModalSettings } from '@skeletonlabs/skeleton';
import { getYear } from '../date.utils';

export function getMovieInfoModalSettings(movie: TmdbSearchResult): ModalSettings {
	return {
		type: 'component',
		title: getModalTitle(movie),
		body: movie.overview,
		image: movie.backdrop_path,
		component: { ref: MovieInfoModal, props: { movie } }
	};
}

function getModalTitle(movie: TmdbSearchResult): string {
	const baseTitle = `${movie.title} (${getYear(new Date(movie.release_date))})`;
	if (movie.omdbData?.Rated) {
		return baseTitle + `[${movie.omdbData.Rated}]`;
	}
	return baseTitle;
}
