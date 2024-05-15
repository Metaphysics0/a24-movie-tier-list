import type { CheckboxOption } from '$lib/types/form.types';
import { humanize } from '$lib/utils/string.util';

export enum FilterOptions {
	ALL_GENRES = 'all_genres',
	HORROR = 'horror',
	COMEDY = 'comedy',
	DRAMA = 'drama'
}

export const filterOptions: CheckboxOption[] = [
	...Object.entries(FilterOptions).map(([key, value]) => ({
		label: humanize(key),
		value
	}))
];
