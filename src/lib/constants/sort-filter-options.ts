import type { SelectOption } from '$lib/types/form.types';

export enum SortFilterOptions {
	TOP_RATED = 'top_rated',
	DATE_RELEASED_NEW_TO_OLD = 'date_released_gtl',
	DATE_RELEASED_OLD_TO_NEW = 'date_released_ltg'
}

export let sortFilterOptions: SelectOption[] = [
	{ label: 'Top Rated', value: SortFilterOptions.TOP_RATED },
	{ label: 'Date Released (Newest to old)', value: SortFilterOptions.DATE_RELEASED_NEW_TO_OLD },
	{ label: 'Date Released (Oldest to new)', value: SortFilterOptions.DATE_RELEASED_OLD_TO_NEW }
];
