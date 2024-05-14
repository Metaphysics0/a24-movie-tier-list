<script lang="ts">
	import { listFilterOptions } from '$lib/constants/listFilterOptions.js';
	import Header from '$lib/ui/Header.svelte';
	import MovieCard from '$lib/ui/MovieCard.svelte';
	import Select from '$lib/ui/form/Select.svelte';

	export let data;
</script>

<Header />

<Select options={listFilterOptions} />
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each data.movies as movie, index}
		<MovieCard {movie} index={index + 1} />
	{/each}
</div>
