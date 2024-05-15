<script lang="ts">
	import { sortFilterOptions } from '$lib/constants/sort-filter-options.js';
	import Header from '$lib/ui/Header.svelte';
	import MovieCard from '$lib/ui/MovieCard.svelte';
	import Select from '$lib/ui/form/Select.svelte';
	import { getFilteredMovies } from '$lib/utils/form/get-filtered-movies.util.js';

	export let data;

	$: movies = data.movies;

	let activeSortFilter = sortFilterOptions[0].value;

	function handleFilterChange(e: Event) {
		const { value } = e.target as HTMLSelectElement;
		movies = getFilteredMovies(value, data.movies);

		// console.log('filter change', e.target?.value);
	}
</script>

<Header />

<div class="mb-10 ml-5">
	<strong class="mr-5 text-lg">Sort:</strong>
	<Select
		options={sortFilterOptions}
		bind:value={activeSortFilter}
		on:change={handleFilterChange}
	/>
</div>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each movies as movie, index}
		<MovieCard {movie} index={index + 1} />
	{/each}
</div>
