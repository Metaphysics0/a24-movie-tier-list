import type { SelectOption } from '$lib/types/form.types';

export enum SortOptions {
	TOP_RATED = 'top_rated',
	DATE_RELEASED_NEW_TO_OLD = 'date_released_gtl'
}

export let sortOptions: SelectOption[] = [
	{ label: 'New Releases', value: SortOptions.DATE_RELEASED_NEW_TO_OLD },
	{ label: 'Top Rated', value: SortOptions.TOP_RATED }
];
