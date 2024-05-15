import type { SelectOption } from '$lib/types/form.types';

export enum SortOptions {
	TOP_RATED = 'top_rated',
	DATE_RELEASED_NEW_TO_OLD = 'date_released_gtl',
	DATE_RELEASED_OLD_TO_NEW = 'date_released_ltg'
}

export let sortOptions: SelectOption[] = [
	{ label: 'Top Rated', value: SortOptions.TOP_RATED },
	{ label: 'Date Released (Newest to old)', value: SortOptions.DATE_RELEASED_NEW_TO_OLD },
	{ label: 'Date Released (Oldest to new)', value: SortOptions.DATE_RELEASED_OLD_TO_NEW }
];
