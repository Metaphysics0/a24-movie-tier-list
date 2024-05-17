<script lang="ts">
	import Header from '$lib/ui/Header.svelte';
	import MovieCard from '$lib/ui/MovieCard.svelte';
	import ListFilters from '$lib/ui/ListFilters.svelte';

	export let data;

	const allMovies = data.movies;

	let movies = data.movies;

	console.log('FIRST MOVIE', movies[0]);
</script>

<Header />

<div class="mb-11 ml-10 flex items-center">
	<ListFilters bind:movies {allMovies} />
</div>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each movies as movie, index}
		<MovieCard {movie} index={index + 1} />
	{/each}
</div>
