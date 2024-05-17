<script lang="ts">
	import { filterOptions } from '$lib/constants/filter-options';
	import { sortOptions } from '$lib/constants/sort-options';
	import type { TmdbSearchResult } from '$lib/types/tmbd.types';
	import { getFilteredMovies } from '$lib/utils/listing/filter.util';
	import { getSortedMovies } from '$lib/utils/listing/sort.util';
	import Checkbox from './inputs/Checkbox.svelte';
	import Select from './inputs/Select.svelte';

	export let movies: TmdbSearchResult[];

	export let allMovies: TmdbSearchResult[];

	function onSortOptionChange(e: Event) {
		const { value } = e.target as HTMLSelectElement;
		movies = getSortedMovies(value, allMovies);
	}

	let activeFilterOptions: string[] = [];
	function onFilterOptionChange(e: Event) {
		const { value } = e.target as HTMLInputElement;
		const { checked } = e.currentTarget as HTMLInputElement;

		if (checked) {
			activeFilterOptions.push(value);
		} else {
			activeFilterOptions = activeFilterOptions.filter(
				(activeFilterOption) => activeFilterOption !== value
			);
		}

		movies = getFilteredMovies(activeFilterOptions, allMovies);
	}
</script>

<div class="mr-10">
	<Select label="Sort:" options={sortOptions} on:change={onSortOptionChange} />
</div>
<div class="flex flex-col items-stretch">
	<strong class="mb-2 mr-5 text-lg">Filters:</strong>
	<div class="flex">
		{#each filterOptions as filterOption}
			<Checkbox
				on:change={onFilterOptionChange}
				label={filterOption.label.toLocaleLowerCase()}
				value={filterOption.value}
				cssClasses="mr-4"
			/>
		{/each}
	</div>
</div>
