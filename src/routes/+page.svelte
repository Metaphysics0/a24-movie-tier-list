<script lang="ts">
	import MovieCard from '$lib/ui/MovieCard.svelte';

	export let data;
</script>

<h1>A24 movie tier list yooo</h1>
<p>Currently in dev mode</p>

<h3>List:</h3>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each data.movieResponses.slice(0, 10) as movie}
		<MovieCard {movie} />
	{/each}
</div>
