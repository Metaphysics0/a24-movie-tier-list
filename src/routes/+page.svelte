<script lang="ts">
	import { filterOptions } from '$lib/constants/filter-options';
	import { sortOptions } from '$lib/constants/sort-options.js';
	import Header from '$lib/ui/Header.svelte';
	import MovieCard from '$lib/ui/MovieCard.svelte';
	import Checkbox from '$lib/ui/form/Checkbox.svelte';
	import Select from '$lib/ui/form/Select.svelte';
	import { getSortedMovies } from '$lib/utils/form/get-sorted-movies.util.js';

	export let data;

	$: movies = data.movies;

	let activeSortFilter = sortOptions[0].value;

	function handleSortOptionChange(e: Event) {
		const { value } = e.target as HTMLSelectElement;
		movies = getSortedMovies(value, data.movies);
	}

	function handleFilterOptionChange(e: Event) {
		const { value } = e.target as HTMLSelectElement;
	}
</script>

<Header />

<div class="mb-10 ml-5">
	<div>
		<strong class="mr-5 text-lg">Sort:</strong>
		<Select
			options={sortOptions}
			bind:value={activeSortFilter}
			on:change={handleSortOptionChange}
		/>
	</div>
	<div class="flex items-center">
		<strong class="mr-5 text-lg">Filter:</strong>
		{#each filterOptions as filterOption}
			<div class="mr-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label
					>{filterOption.label.toLocaleLowerCase()}:
					<Checkbox value={filterOption.value} />
				</label>
			</div>
		{/each}
	</div>
</div>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each movies as movie, index}
		<MovieCard {movie} index={index + 1} />
	{/each}
</div>
