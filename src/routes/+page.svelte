<script lang="ts">
	import MovieCard from '$lib/ui/MovieCard/MovieCard.svelte';
	import ListFilters from '$lib/ui/forms/ListFilters.svelte';

	export let data;

	const allMovies = data.movies;

	let movies = data.movies;
</script>

<div class="mb-11 ml-0 flex items-center md:ml-10 lg:ml-10">
	<ListFilters bind:movies {allMovies} />
</div>

<section
	class="col-span-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
>
	{#each movies as movie}
		<MovieCard {movie} />
	{/each}
</section>
